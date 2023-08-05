import { initCFunctions, geos } from './allCFunctions.mjs'
import CModule from '../build/package/geos.js'

let geosJsPromise

export default function initGeosJs (config = {}) {
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
        initCFunctions(config)
      } catch (error) {
        console.log('error initializing geos.js', error)
      }
    }

    Module.destroy = function destroy () {
      /* Clean up the global context */
      geos.finishGEOS()
    }

    CModule(geos.Module).then((res) => {
      resolve(geos)
    })
  })

  return geosJsPromise
}
