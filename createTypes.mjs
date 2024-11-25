import jsdoc2md from 'jsdoc-to-markdown'
import fs from 'fs'

/* input and output paths */
const inputFile = './src/allCFunctions.mjs'
const functionsFile = './src/addGeosFunctions.mjs'
const outputDir = './build/package'
const helpersDir = './build/package/helpers'
/* create output directory if it doesn't exist */
if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir)

/* get template data */
const templateData = await jsdoc2md.getTemplateData({
  files: [inputFile, functionsFile],
  configure: './jsdoc.conf'
})

function createFunctionString (identifier, returnType, functionName, params) {
  let functionString = '/**' + '\n'
  if (identifier.description) {
    functionString +=
      `  * ${identifier.description.replace(/\n/g, '\n* ')}` + '\n'
  }
  identifier.params?.forEach((param) => {
    functionString += `  * @param ${param.name} - ${param.description}` + '\n'
  })
  if (identifier.returns?.[0]?.description) {
    functionString +=
      `  * @returns ${returnType} - ${identifier.returns[0].description}` +
      '\n'
  }
  if (identifier.see) {
    functionString += `  * @see ${identifier.see[0]}` + '\n'
  }
  functionString += '  */' + '\n'
  functionString += `  ${functionName}(${params.join(', ')}): ${returnType};`
  return functionString
}
// Create a TypeScript interface property for each function as a string, in the format
// function(param1: string, param2: number): number;
const allFunctionsTypes = templateData
  .map((identifier) => {
    if (
      (identifier.kind === 'member' || identifier.kind === 'function') &&
      identifier.name.includes('GEOS')
    ) {
      const params =
        identifier.params?.map((param) => {
          return `${param.name}: ${param.type.names[0]}`
        }) || []

      const returnType = identifier.returns?.[0]?.type?.names[0] || 'void'
      // remove geos. from the function name
      const functionName = identifier.name.replace('geos.', '')
      const functionString = createFunctionString(
        identifier,
        returnType,
        functionName,
        params
      )
      return functionString
    }
    return ''
  })
  .filter(Boolean)

const allModuleFunctions = templateData
  .map((identifier) => {
    if (identifier.kind === 'member' && !identifier.name.includes('GEOS')) {
      const params =
        identifier.params?.map((param) => {
          return `${param.name}: ${param.type.names[0]}`
        }) || []

      const returnType = identifier.returns?.[0]?.type?.names[0] || 'void'
      // remove geos. from the function name
      const functionName = identifier.name.replace('geos.', '')
      const functionString = createFunctionString(
        identifier,
        returnType,
        functionName,
        params
      )
      return functionString
    }
    return ''
  })
  .filter(Boolean)

// All typedefs
const allTypedefs = templateData.map((identifier) => {
  if (identifier.kind === 'typedef') {
    return `type ${identifier.name} = ${identifier.type.names[0]}`
  }
  return ''
}).filter(Boolean)

// All callbacks
const allCallbacks = templateData.map((identifier) => {
  if (identifier.kind === 'callback') {
    const params = identifier.params.map((param) => {
      return `${param.name}: ${param.type.names[0]}`
    })

    return `type ${identifier.name} = (${params.join(', ')}) => void`
  }
  return ''
}).filter(Boolean)

// All enums
const allEnums = templateData.map((identifier) => {
  if (identifier.kind === 'enum') {
    const values = identifier.properties.map((prop, i) => {
      return `${prop.name} = ${prop.defaultvalue}${i === identifier.properties.length - 1 ? '' : ','}`
    })

    return `export enum ${identifier.name.replace('geos.', '')} {
  ${values.join('\n  ')}
}`
  }
  return ''
}).filter(Boolean)

const output = `
interface Module {
  ${allModuleFunctions.join('\n  ')}
}

${allTypedefs.join('\n')}

${allCallbacks.join('\n')}

${allEnums.join('\n')}

interface geos {
  ${templateData.filter((identifier) => identifier.kind === 'enum').map(({ name }) => `${name.replace('geos.', '')}: typeof ${name.replace('geos.', '')}`).join('\n  ')}
  ${allFunctionsTypes.join('\n  ')}
  Module: Module;
}

interface Config {
  /** 
    * If autoInit is true, the GEOS library will be initialized when the geos object is created.
    * @default true
  */ 
  autoInit?: boolean;
  errorHandler?: (message: string) => void;
  noticeHandler?: (message: string) => void;
}

declare module 'geos-wasm' {
  export default function initGeosJs(config?: Config): Promise<geos>;
}`

fs.writeFileSync(`${outputDir}/geos.esm.d.ts`, output)

// and for the helper module
const helperTemplateData = await jsdoc2md.getTemplateData({
  files: './src/helpers/*.mjs',
  configure: './jsdoc.conf'
})

const helperFunctions = helperTemplateData
  .map((identifier) => {
    if (identifier.kind === 'function') {
      const params =
        identifier.params?.map((param) => {
          return `${param.name}: ${param.type.names[0]}`
        }) || []

      const returnType = identifier.returns?.[0]?.type?.names[0] || 'void'
      const functionName = 'export function ' + identifier.name
      const functionString = createFunctionString(
        identifier,
        returnType,
        functionName,
        params
      )
      return functionString
    }
    return ''
  })
  .filter(Boolean)

const helperOutput = `// <reference types="geojson">
${helperFunctions.join('\n ')}

export default {
  geojsonToGeosGeom,
  geosGeomToGeojson
}
`

fs.writeFileSync(`${helpersDir}/geos.helpers.esm.d.ts`, helperOutput)
