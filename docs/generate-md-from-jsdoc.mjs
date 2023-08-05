import jsdoc2md from 'jsdoc-to-markdown'
import fs from 'fs'
import path from 'path'

/* input and output paths */
const inputFile = '../src/allCFunctions.mjs'
const outputDir = './functions/'

/* create output directory if it doesn't exist */
if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir)

/* get template data */
const templateData = jsdoc2md.getTemplateDataSync({ files: inputFile, configure: '../jsdoc.conf' })

/* reduce templateData to an array of class names */
const functionNames = templateData.reduce((functionNames, identifier) => {
  if (identifier.kind === 'member' || identifier.kind === 'function') functionNames.push(identifier.name)
  return functionNames
}, [])

// sort function names alphabetically
functionNames.sort()

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

for (const functionName of Object.keys(similarNames)) {
  // create a single documentation file for each group of similar names
  let output = ''
  similarNames[functionName].forEach(similarName => {
    const template = `{{#identifier name="${similarName}"}}{{>docs}}{{/identifier}}`
    // console.log(`rendering ${similarName}, template: ${template}`)
    output += jsdoc2md.renderSync({ data: templateData, template })
    // add a horizontal rule between each function
    output += '\n---\n'
  })
  fs.writeFileSync(path.resolve(outputDir, `${functionName}.md`), output)
}

fs.writeFileSync('allFunctions.json', JSON.stringify(Object.keys(similarNames).map(functionName => ({
  text: functionName.replace('geos.', ''),
  link: `${outputDir.substring(1)}${functionName}.md`
}))))
