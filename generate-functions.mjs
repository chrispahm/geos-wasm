import { JSDOM } from 'jsdom'
import { writeFileSync } from 'fs'
import process from 'process'

const generateGeosFunctions = (html) => {
  // Read and parse HTML file
  const dom = new JSDOM(html)
  const document = dom.window.document

  const enums = []
  const typedefs = []
  const functions = []

  // Find all function entries
  document.querySelectorAll('.memitem').forEach((element) => {
    const itemObj = {}

    // Get function name
    const titleEl = element.previousElementSibling
    itemObj.nameOriginal = titleEl.textContent.trim().split(' ')[1]
    // remove parantheses
    itemObj.name = itemObj.nameOriginal.replace(/\(.*\)/, '').trim()

    // Get signature
    const memproto = element.querySelector('.memproto')
    if (memproto) {
      itemObj.signature = memproto.textContent.trim()
    }

    // Get return type
    const signature = memproto?.querySelector(
      'table > tbody > tr > td.memname'
    )
    if (signature) {
      // return type is the first element
      const segments = signature.textContent.trim().split(' ')
      if (segments[0] === 'typedef') {
        console.log('typedef', segments)

        if (segments[1] === 'struct') {
          itemObj.type = 'typedef'
        } else {
          itemObj.type = 'callback'
        }
      } else if (segments[0] === 'enum') {
        itemObj.type = 'enum'
      } else {
        itemObj.type = 'function'
        itemObj.returnType = segments[0]?.trim()
      }
    }

    // Get description
    const memdoc = element.querySelector('.memdoc')
    const description = memdoc?.querySelector('p')?.textContent.trim()
    if (description) {
      itemObj.description = description.replace(/\n/g, '\n   * ')
    }
    // Get depricated
    const deprecated = memdoc?.querySelector('.deprecated > dd')?.textContent.trim()
    if (deprecated) {
      itemObj.deprecated = deprecated
    }

    // Get parameters
    const params = []
    element
      ?.querySelectorAll('.memproto > table > tbody > tr')
      .forEach((param, i) => {
        const paramName = param
          .querySelector('.paramname em')
          ?.textContent.trim()
        const paramDescription = memdoc
          ?.querySelector(`.params tbody tr:nth-child(${i + 1}) td:last-child`)
          ?.textContent.trim()
        // get the paramtype, which is always the td element with the class paramtype in the
        // tr element of the current index i in the memname table
        const paramTypeEl = param.querySelector('td.paramtype')
        // check if there's an a element in the paramtype element
        const a = paramTypeEl?.querySelector('a')
        const paramType = a
          ? a.textContent.trim()
          : paramTypeEl?.textContent.trim()

        if (paramName) {
          params.push({
            name: paramName,
            description: paramDescription,
            type: paramType
          })
        }
      })
    if (params.length > 0) {
      itemObj.parameters = params
    }

    // Get return value
    const returns = memdoc
      ?.querySelector('.section.return')
      ?.textContent.replace('Returns', '')
      .trim()
    if (returns) {
      itemObj.returns = returns
    } else if (itemObj.returnType) {
      itemObj.returns = itemObj.returnType
    }

    // Get see also links
    const seeAlso = []
    memdoc?.querySelectorAll('.section.see a').forEach((link) => {
      seeAlso.push(link.textContent.trim())
    })
    if (seeAlso.length > 0) {
      itemObj.see_also = seeAlso
    }

    // Get Since version
    const since = memdoc?.querySelector('.since > dd')?.textContent.trim()
    if (since) {
      // get major, minor, and patch if they exist
      const [major, minor, patch] = since.split('.')
      itemObj.since = {
        major: parseInt(major),
        minor: parseInt(minor),
        patch: parseInt(patch),
        version: since
      }
    }

    if (itemObj.type === 'function') {
      functions.push(itemObj)
    } else if (itemObj.type === 'typedef' || itemObj.type === 'callback') {
      typedefs.push(itemObj)
    } else if (itemObj.type === 'enum') {
      enums.push(processEnum(element, itemObj))
    }
  })

  function processEnum (element, itemObj) {
    const enumerator = {}
    let index = 0

    // Find all enum rows in the fieldtable
    element.querySelectorAll('.fieldtable tr').forEach((row) => {
      const fieldname = row.querySelector('.fieldname')
      const fielddoc = row.querySelector('.fielddoc')

      if (fieldname && fielddoc) {
        const name = fieldname.textContent.trim()
        const description = fielddoc.textContent.trim()

        // Create the enum entry
        enumerator[name] = {
          value: index,
          description
        }
        index++
      }
    })

    // Only add the enumerator if we found entries
    if (Object.keys(enumerator).length > 0) {
      itemObj.enumerator = enumerator
    }

    return itemObj
  }

  // Process reentrant functions and functions with only see_also
  for (const func of functions) {
    if (func.name.endsWith('_r') && func.see_also) {
      const baseFunc = functions.find((f) => f.name === func.see_also[0])
      if (baseFunc) {
        func.description = baseFunc.description
        // func.parameters = [...(baseFunc.parameters ? baseFunc.parameters : [])];
        func.returns = baseFunc.returns

        // If it's a reentrant function (_r suffix)
        // if (func.name.endsWith("_r")) {
        //   func.parameters.unshift({
        //     name: "context",
        //     description: "A pointer to the GEOS context handle.",
        //     type: "GEOSContextHandle_t",
        //   });
        // }
      }
    }
  }

  const typeMapping = {
    // Basic types
    void: 'null',
    int: 'number',
    double: 'number',
    'unsigned int': 'number',
    char: 'number',
    unsigned: 'number',
    size_t: 'number',
    const: 'number',
    'const char': 'number',

    // Pointer types
    'char *': 'StringPointer',
    'char*': 'StringPointer',
    'const char *': 'StringPointer',
    'double *': 'NumberPointer',
    'const double *': 'NumberPointer',
    'unsigned int *': 'NumberPointer',
    'size_t *': 'NumberPointer',

    // Generic pointer types
    'void *': 'Pointer',
    'void*': 'Pointer',
    'const void *': 'Pointer',
    'const unsigned char *': 'Pointer',

    // Special pointer types
    'char **': 'Pointer' // pointer to string pointer
  }

  // Generate allCfunctions.mjs
  const generateOutput = () => {
    const lines = [
      '// This file is automatically generated',
      '',
      '// typedefs',
      `/**
 * A pointer to a char * string. 
 * Can be created using const ptr = geos.Module.stringToNewUTF8(someString)
 * Can be converted to JS using const str = geos.Module.UTF8ToString(ptr)
 * @typedef {number} StringPointer
 */`,
      '',
      `/**
 * A pointer to a double *, int *, or unsigned int *.
 * Can be created using const ptr = geos.Module._malloc(8)
 * Can be converted to JS using const value = geos.Module.getValue(ptr, 'double')
 * Must be freed using geos.Module._free(ptr)
 * @typedef {number} NumberPointer
 */`,
      '',
      `/**
 * A pointer to an array (double *).
 * Can be create using the following JS code:
 * const values = new Float64Array(N * dim)
 * for (let i = 0; i < values.length; i++) {
 *   values[i] = i
 * }
 * const valuesPtr = geos.Module._malloc(N * dim * 8)
 * geos.Module.HEAPF64.set(values, valuesPtr / 8)
 * Can be converted to JS using the following JS code:
 * const view = new Float64Array(geos.Module.HEAPF64.buffer, valuesPtr, N * dim * 8)
 * @typedef {number} ArrayPointer
 */`,
      '',
      `/**
* A generic pointer type.
* @typedef {(StringPointer|NumberPointer)} Pointer
*/`
    ]

    // Generate typedefs first
    typedefs.forEach((typedef) => {
      lines.push('/**')
      if (typedef.description) {
        lines.push(` * ${typedef.description}`)
      }

      if (typedef.type === 'callback') {
        // It's a callback function
        lines.push(' * This callback is displayed as a global member.')
        lines.push(` * @callback ${typedef.name}`)
        typedef.parameters?.forEach((param) => {
          lines.push(` * @param {number} ${param.name} ${param.description}`)
        })
        if (typedef.returns) {
          lines.push(` * @returns {number} ${typedef.returns}`)
        }
      } else {
        // It's a struct or simple typedef
        lines.push(` * @typedef {number} ${typedef.name}`)
      }

      lines.push(' */')
      lines.push('')
    })

    lines.push('export default function addGEOSFunctions(Module, geos) {')

    lines.push('  // enums')

    // generate enums
    enums.forEach((enumObj) => {
      lines.push('  /**')
      lines.push(`   * ${enumObj.description}`)
      // Add see also references if they exist
      if (enumObj.see_also) {
        enumObj.see_also.forEach((ref) => {
          lines.push(`   * @see ${ref}`)
        })
      }

      lines.push('   * @readonly')
      lines.push('   * @alias module:geos')
      lines.push('   * @enum {number}')
      lines.push('   */')

      const enumName = enumObj.name
      lines.push(`  geos.${enumName} = {`)

      // Add enum values with their descriptions
      Object.entries(enumObj.enumerator).forEach(([key, data]) => {
        lines.push(`    /** ${data.description} */`)
        lines.push(`    ${key}: ${data.value},`)
      })

      lines.push('  };')
      lines.push('')
    })

    lines.push('  // functions')
    const functionsToWrite = functions.filter((func) => func.name === 'GEOS_init_r')
    const otherFunctions = functions.filter((func) => func.name !== 'GEOS_init_r')
    // script receives a number n as a parameter, add n more other functions to the list
    const n = process.argv[2] || 0
    for (let i = 0; i < n; i++) {
      functionsToWrite.push(otherFunctions[i])
      if (i === n - 1) {
        console.log(otherFunctions[i].name)
      }
    }
    console.log('Number of functions:', functions.length)

    functions.forEach((func) => {
    // functions.forEach((func) => {
      if (func.type === 'function') {
        // IMPORTANT: skip initGEOS and initGEOS_r functions,
        // they seem to auto initialized once the Module is loaded
        // and cause a crash upon load
        if (func.name === 'initGEOS' || func.name === 'initGEOS_r') {
          return
        }
        lines.push('  /**')
        if (func.description) {
          lines.push(`   * ${func.description}`)
        }
        if (func.parameters) {
          func.parameters.forEach((param) => {
            let mappedType = param.type.startsWith('GEOS')
              ? param.type.replace(/[^a-zA-Z _]/g, '')
              : typeMapping[param.type]
            if (param.description?.startsWith('array')) {
              mappedType = 'ArrayPointer'
            }
            lines.push(
              `   * @param {${mappedType}} ${param.name} - ${param.description}`
            )
          })
        }
        if (func.returns) {
          lines.push(
            `   * @returns {${func.returnType.startsWith('GEOS') ? func.returnType.replace(/[^a-zA-Z _]/g, '') : typeMapping[func.returnType]}} ${func.returns}`
          )
        }
        if (func.deprecated) {
          lines.push(`   * @deprecated ${func.deprecated}`)
        }
        lines.push('   * @alias module:geos')
        lines.push('   */')

        if (func.name.endsWith('_r')) {
          const paramTypes = func.parameters?.map((p) => 'number') || []

          const returnType = func.returnType.includes('void')
            ? 'null'
            : 'number'
          lines.push(
            `  geos.${func.name} = Module.cwrap('${func.name}', '${returnType}', ${JSON.stringify(paramTypes)})`
          )
        } else {
          lines.push(`  geos.${func.name} = null`)
        }
        lines.push('')
      }
    })
    lines.push('  return geos;')
    lines.push('};')
    return lines.join('\n')
  }

  // print uniqe param types from all functions
  const uniqueParamTypes = new Set()
  functions.forEach((func) => {
    func.parameters?.forEach((param) => {
      if (!param.type.startsWith('GEOS')) {
        uniqueParamTypes.add(param.type)
      }
    })
    func.returnType &&
      !func.returnType.startsWith('GEOS') &&
      uniqueParamTypes.add(func.returnType)
  })

  // write all _r functions to a GEOS_EMCC_FLAGS.mk to import for make
  // write GEOS_EMCC_FLAGS.mk
  writeFileSync(
    'GEOS_EMCC_FLAGS.mk',
    `GEOS_EMCC_FLAGS += -s EXPORTED_FUNCTIONS="[\\
  '_free',\\
  '_malloc',\\
` + functions
      .filter((func) => func.name.endsWith('_r') && func.name !== 'initGEOS_r')
      .map((func) => `  '_${func.name}'`)
      .join(',\\\n') +
      '\\\n]"'
  )

  // write allCfunctions.mjs
  writeFileSync('src/addGeosFunctions.mjs', generateOutput())
}

// Usage example
try {
  // const htmlFilePath = join(__dirname, "geos_c.html");
  // const html = readFileSync(htmlFilePath, "utf-8");
  const url = 'https://libgeos.org/doxygen/geos__c_8h.html'
  const html = await fetch(url).then((res) => res.text())
  generateGeosFunctions(html)
  // console.log('Successfully generated allCfunctions.mjs')
} catch (error) {
  console.error('Error generating functions:', error)
}
