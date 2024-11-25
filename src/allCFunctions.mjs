import addGeosFunctions from './addGeosFunctions.mjs'

/**
 * @module geos
 */

export const geos = {
  Module: {
    /**
     * Allocates memory on the Emscripten heap.
     * @param {number} size - The size of the memory to allocate.
     * @returns {number} The pointer to the allocated memory.
     * @alias module:geos
     * @see https://emscripten.org/docs/api_reference/preamble.js.html#_malloc
     * @example
     * const wktPtr = geos.Module._malloc(wkt.length + 1)
     */
    _malloc: null,
    /**
     * Reads a value from the Emscripten heap.
     * @param {number} ptr - The pointer to the value.
     * @param {string} type - The type of the value.
     * @returns {number} The value.
     * @alias module:geos
     * @see https://emscripten.org/docs/api_reference/preamble.js.html#getValue
     * @example
     * const area = geos.Module.getValue(areaPtr, 'double')
     * console.log(area) // area = 1
     */
    getValue: null,
    /**
     * Writes a value to the Emscripten heap.
     * @param {number} ptr - The pointer to the value.
     * @param {string} type - The type of the value.
     * @param {number} value - The value.
     * @alias module:geos
     * @see https://emscripten.org/docs/api_reference/preamble.js.html#setValue
     * @example
     * geos.Module.setValue(areaPtr, 'double', 0)
     */
    setValue: null,
    /**
     * Reads a null-terminated string from the Emscripten heap.
     * @param {number} ptr - The pointer to the string.
     * @returns {string} The string.
     * @alias module:geos
     * @see https://emscripten.org/docs/api_reference/preamble.js.html#UTF8ToString
     * @example
     * const wkt = geos.Module.UTF8ToString(wktPtr)
     */
    UTF8ToString: null,
    /**
     * Writes a string to the Emscripten heap.
     * @param {string} str - The string.
     * @param {number} ptr - The pointer to the string.
     * @param {number} [maxLength] - The maximum length of the string.
     * @alias module:geos
     * @see https://emscripten.org/docs/api_reference/preamble.js.html#stringToUTF8
     * @example
     * geos.Module.stringToUTF8(wkt, wktPtr)
     */
    stringToUTF8: null
  }
}

export function initCFunctions (config = {}) {
  const { autoInit = true, errorHandler = null, noticeHandler = null } = config

  if (geos.initGEOS) return
  const Module = geos.Module
  geos._ctx = null

  // Add the GEOS functions to the Module using side effects
  addGeosFunctions(Module, geos)

  const lastGEOSError = null
  // Define a function to handle errors and notices
  const errorHandlerPtr = geos.Module.addFunction((arg) => {
    const message = geos.Module.UTF8ToString(arg)
    if (errorHandler) errorHandler(message)
    else {
      throw new Error(message)
    }
  }, 'vii')

  const noticeHandlerPtr = geos.Module.addFunction((arg) => {
    const message = geos.Module.UTF8ToString(arg)
    if (message) {
      if (noticeHandler) noticeHandler(message)
      else console.log(message)
    }
  }, 'vii')

  // Define the initGEOS and finishGEOS functions for startup and cleanup
  /**
   * Cleans up GEOS and releases any allocated resources.
   * @returns {void}
   * @see https://libgeos.org/doxygen/geos__c_8h.html#a9a6f9f0b3a4c1a2e7c1d0e4e1b3a2c5d
   * @alias module:geos
   * @example
   * import initGeosJs from 'geos-wasm'
   * const geos = await initGeosJs()
   * geos.finishGEOS()
   * // GEOS is now cleaned up and cannot be used until initialized again
   */
  geos.finishGEOS = () => {
    geos.GEOS_finish_r(geos._ctx)
    geos._ctx = null
  }

  /**
   * Initializes GEOS and allocates any required resources.
   * @returns {void}
   * @throws {Error} If GEOS has already been initialized.
   * @see https://libgeos.org/doxygen/geos__c_8h.html#a9a6f9f0b3a4c1a2e7c1d0e4e1b3a2c5d
   * @alias module:geos
   * @example
   * import initGeosJs from 'geos-wasm'
   * const geos = require('geos')
   * geos.finishGEOS()
   * // GEOS is now cleaned up and cannot be used until initialized again
   * geos.initGEOS()
   */
  geos.initGEOS = () => {
    if (geos._ctx === null) {
      geos._ctx = geos.GEOS_init_r()
      geos.GEOSContext_setErrorMessageHandler_r(geos._ctx, errorHandlerPtr)
      geos.GEOSContext_setNoticeMessageHandler_r(geos._ctx, noticeHandlerPtr)
    } else {
      throw new Error(
        'GEOS has already been initialized. Call finishGEOS before re-initializing.'
      )
    }
  }

  // Create non reentrant versions of the functions
  Object.keys(geos).forEach((property) => {
    if (typeof geos[property] === 'function' && property.endsWith('_r')) {
      const nonReFunctionName = property.slice(0, -2)
      geos[nonReFunctionName] = (...args) => {
        const result = geos[property](geos._ctx, ...args)
        if (lastGEOSError) {
          // console.log(lastGEOSError)
          // lastGEOSError = null
          // const e = new Error(lastGEOSError)
          // throw e
        }
        return result
      }
    }
  })

  // add single GEOSGeomTypes to geos object
  Object.keys(geos.GEOSGeomTypes).forEach((property) => {
    geos[property] = geos.GEOSGeomTypes[property]
  })

  // Define a GEOS context handle
  if (autoInit) {
    geos.initGEOS()
  }
}
