import jsdoc2md from 'jsdoc-to-markdown'
import fs from 'fs'
import path from 'path'

/* input and output paths */
const inputFiles = [
  '../src/allCFunctions.mjs',
  '../src/addGeosFunctions.mjs',
  '../src/helpers/geojsonToGeosGeom.mjs',
  '../src/helpers/geosGeomToGeojson.mjs'
]
const outputDir = './functions/'
const typedefsEnumsDir = './typedefs-enums/'

/* create output directory if it doesn't exist */
if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir)
if (!fs.existsSync(typedefsEnumsDir)) fs.mkdirSync(typedefsEnumsDir)

/* get template data */
const templateData = await jsdoc2md.getTemplateData({ files: inputFiles, configure: '../jsdoc.conf' })

const typedefs = []
const enums = []
/* reduce templateData to an array of class names */
const functionNames = templateData.reduce((functionNames, identifier) => {
  if (identifier.kind === 'typedef') {
    typedefs.push(identifier)
    console.log(identifier)
  }
  if (identifier.kind === 'enum') {
    enums.push(identifier)
  }
  if (identifier.scope !== 'global' &&
    (identifier.kind === 'member' || identifier.kind === 'function')) {
    if (identifier.name.startsWith('GEOS')) {
      identifier.id = `module:geos.${identifier.name}`
      identifier.memberof = 'module:geos'
      // console.log(identifier)
    } else {
      functionNames.push(identifier.name)
    }
  } else if (identifier.kind === 'member' && identifier.memberof === 'module:geos' && identifier.params) {
    functionNames.push(identifier.name)
  }
  return functionNames
}, [])

const globalFunctionNames = templateData.reduce((globalFunctionNames, identifier) => {
  if (identifier.scope === 'global' && identifier.kind === 'function') {
    globalFunctionNames.push(identifier.name)
  }
  return globalFunctionNames
}, [])

// sort function names alphabetically
functionNames.sort()

globalFunctionNames.sort()

// group functions by similar name
// e.g. GeosBuffer -> GEOSBufferParams_setEndCapStyle, GEOSBufferParams_setJoinStyle, GEOSBufferParams_setMitreLimit etc.
// for each function name, we check if its name is fully contained in another function name
// if so, we add it to the other function name's array of similar names

const similarNames = functionNames.reduce((similarNames, functionName) => {
  let functionBase = functionName.includes('_') && functionName.includes('GEOS') ? functionName.split('_')[0] : functionName
  if (functionBase === 'geos.GEOS') functionBase = functionName
  if (!functionBase.includes('geos.')) {
    functionBase = 'geos.Module'
  }

  if (functionName.startsWith('geos.GEOSGeom')) functionBase = 'geos.GEOSGeom'
  // skip if this function name has already been used
  if (similarNames.used && similarNames.used.includes(functionName)) return similarNames
  let matches = functionNames.filter(name => name.includes(functionBase))
  if (functionBase === 'geos.Module') {
    matches = functionNames.filter(name => !name.includes('geos.') && name !== functionName)
  }
  if (!similarNames.used) similarNames.used = []
  if (matches && matches.length) {
    if (!similarNames[functionBase]) similarNames[functionBase] = [functionName]
    // add all matches
    similarNames[functionBase] = [...new Set(similarNames[functionBase].concat(matches))]
    similarNames.used = [...new Set(similarNames.used.concat([functionName, ...matches]))]
  }
  return similarNames
}, {})

// remove used from similarNames
delete similarNames.used

// add global functions to similarNames
globalFunctionNames.forEach(globalFunctionName => {
  if (!similarNames[globalFunctionName]) similarNames[globalFunctionName] = [globalFunctionName]
})

// write all typedefs and enums to a single file
let output = '# Typedefs and Enums\n\n## Typedefs\n\n'
for (const typedef of typedefs) {
  const template = `{{#identifier name="${typedef.name}"}}{{>docs}}{{/identifier}}`
  output += await jsdoc2md.render({ data: templateData, template })
  output += '\n---\n'
}
output += '\n## Enums\n\n'
for (const enumType of enums) {
  const template = `{{#identifier name="${enumType.name}"}}{{>docs}}{{/identifier}}`
  output += await jsdoc2md.render({ data: templateData, template })
  output += '\n---\n'
}
fs.writeFileSync(path.resolve(typedefsEnumsDir, 'typedefs-enums.md'), output)

// write functions to files
for (const functionName of Object.keys(similarNames)) {
  // create a single documentation file for each group of similar names
  let output = ''
  for (const similarName of similarNames[functionName]) {
    const template = `{{#identifier name="${similarName}"}}{{>docs}}{{/identifier}}`
    // console.log(`rendering ${similarName}, template: ${template}`)
    const rendered = await jsdoc2md.render({ data: templateData, template })
    // replace links to typedefs and enums (#(.*)) with links to /geos-wasm/typedefs-enums/typedefs-enums.html#(.*)
    output += rendered.replace(/\(#(.*?)\)/g, '(/typedefs-enums/typedefs-enums.html#$1)')
    // add a horizontal rule between each function
    output += '\n---\n'
  }

  fs.writeFileSync(path.resolve(outputDir, `${functionName}.md`), output)
}

fs.writeFileSync('allFunctions.json', JSON.stringify(Object.keys(similarNames).map(functionName => ({
  text: functionName.replace('geos.', ''),
  link: `${outputDir.substring(1)}${functionName}.md`
})), null, 2))
