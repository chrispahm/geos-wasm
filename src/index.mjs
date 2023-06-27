import { initCFunctions, GEOSFunctions } from './allCFunctions.mjs';
import allJsFunctions from './allJsFunctions.mjs';
import CModule from '../build/package/geos.js';

let geosJsPromise;

export default function initGeosJs(
  config = {},
) {
  if (geosJsPromise) return geosJsPromise;
  geosJsPromise = new Promise((resolve, reject) => {
    const Module = GEOSFunctions.Module;

    Module.print = function p(text) {
      console.debug(`geos stdout: ${text}`);
    };

    Module.printErr = function p(text) {
      console.error(`geos stderr: ${text}`);
    };

    Module.onRuntimeInitialized = function onRuntimeInitialized() {
      try {
        initCFunctions();        
      } catch (error) {
        console.log('error initializing geos.js', error);
      }
    };

    Module.destroy = function destroy() {
      /* Clean up the global context */
      GEOSFunctions.finishGEOS();
    }

    CModule(GEOSFunctions.Module).then(() => {
      resolve(allJsFunctions);
    });
  });
  return geosJsPromise;
}