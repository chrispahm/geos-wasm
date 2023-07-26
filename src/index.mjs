import { initCFunctions, geos } from './allCFunctions.mjs'
import CModule from '../build/package/geos.js'

let geosJsPromise

export default function initGeosJs (
  config = {}
) {
  if (geosJsPromise) return geosJsPromise
  geosJsPromise = new Promise((resolve) => {
    const Module = geos.Module

    Module.print = function p (text) {
      console.debug(`geos stdout: ${text}`)
    }

    Module.printErr = function p (text) {
      console.error(`geos stderr: ${text}`)
    }

    Module.onRuntimeInitialized = function onRuntimeInitialized () {
      try {
        initCFunctions()
      } catch (error) {
        console.log('error initializing geos.js', error)
      }
    }

    Module.destroy = function destroy () {
      /* Clean up the global context */
      geos.finishGEOS()
    }
    /*
    Module.locateFile = function locateFile (fileName) {
      let path = fileName
      if (config.paths && config.paths.wasm) {
        path = config.paths.wasm
      }
      let prefix = ''
      if (config.path) {
        prefix = config.path
        if (prefix.slice(-1) !== '/') prefix += '/'
      } else if (isNode) {
        prefix = 'node_modules/geos-wasm/dist/package/'
      }
      let output = prefix + path
      if (!isNode && output.substring(0, 4) !== 'http' && output[0] !== '/') output = `/${output}`

      if (isNode) {
        output = fileUrl(output)
      }

      return output
    }
*/
    CModule(geos.Module).then((res) => {
      resolve(geos)
    })
  })

  return geosJsPromise
}
