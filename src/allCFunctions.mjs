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
  const {
    autoInit = true,
    errorHandler = null,
    noticeHandler = null
  } = config

  if (geos.initGEOS) return
  const Module = geos.Module
  geos._ctx = null

  /**
 * Sets the notice handler for a GEOS context.
 * @param {number} context - A pointer to the GEOS context handle.
 * @param {number} handler - The notice handler function pointer.
 * @returns {number} The previous notice handler function pointer.
 * @alias module:geos
  */
  geos.GEOSContext_setNoticeHandler_r = Module.cwrap('GEOSContext_setNoticeHandler_r', 'number', ['number', 'number'])

  /**
 * Sets the error handler for a GEOS context.
 * @param {number} context - A pointer to the GEOS context handle.
 * @param {number} handler - The error handler function pointer.
 * @returns {number} The previous error handler function pointer.
 * @alias module:geos
  */
  geos.GEOSContext_setErrorHandler_r = Module.cwrap('GEOSContext_setErrorHandler_r', 'number', ['number', 'number'])

  /**
 * Registers a callback function to be called when an interrupt request is detected.
 * @param {number} callback - The callback function pointer.
 * @alias module:geos
  */
  geos.GEOS_interruptRegisterCallback = null

  /**
 * Requests an interrupt of the current GEOS operation.
 * @alias module:geos
  */
  geos.GEOS_interruptRequest = null

  /**
 * Cancels an interrupt request of the current GEOS operation.
 * @alias module:geos
  */
  geos.GEOS_interruptCancel = null

  /**
 * Frees a GEOS object allocated by the library.
 * @param {number} obj - The GEOS object pointer.
 * @alias module:geos
  */
  geos.GEOSFree = null

  /**
 * Frees a GEOS object allocated by the library in a given context.
 * @param {number} context - A pointer to the GEOS context handle.
 * @param {number} obj - The GEOS object pointer.
 * @alias module:geos
  */
  geos.GEOSFree_r = Module.cwrap('GEOSFree_r', null, ['number', 'number'])

  /**
 * Tests if two geometries are disjoint.
 * @param {number} g1 - The first geometry pointer.
 * @param {number} g2 - The second geometry pointer.
 * @returns {number} = 1 if true, 0 if false, -1 on error.
 * @alias module:geos
  */
  geos.GEOSDisjoint = null

  /**
 * Tests if two geometries are disjoint in a given context.
 * @param {number} context - A pointer to the GEOS context handle.
 * @param {number} g1 - The first geometry pointer.
 * @param {number} g2 - The second geometry pointer.
 * @returns {number} = 1 if true, 0 if false, -1 on error.
 * @alias module:geos
  */
  geos.GEOSDisjoint_r = Module.cwrap('GEOSDisjoint_r', 'number', ['number', 'number', 'number'])

  /**
 * Tests if two geometries touch at one or more points.
 * @param {number} g1 - The first geometry pointer.
 * @param {number} g2 - The second geometry pointer.
 * @returns {number} = 1 if true, 0 if false, -1 on error.
 * @alias module:geos
  */
  geos.GEOSTouches = null

  /**
 * Tests if two geometries touch at one or more points in a given context.
 * @param {number} context - A pointer to the GEOS context handle.
 * @param {number} g1 - The first geometry pointer.
 * @param {number} g2 - The second geometry pointer.
 * @returns {number} = 1 if true, 0 if false, -1 on error.
 * @alias module:geos
  */
  geos.GEOSTouches_r = Module.cwrap('GEOSTouches_r', 'number', ['number', 'number', 'number'])

  /**
 * Tests if two geometries intersect in interior or boundary points.
 * @param {number} g1 - The first geometry pointer.
 * @param {number} g2 - The second geometry pointer.
 * @returns {number} = 1 if true, 0 if false, -1 on error.
 * @alias module:geos
  */
  geos.GEOSIntersects = null

  /**
 * Tests if two geometries intersect in interior or boundary points in a given context.
 * @param {number} context - A pointer to the GEOS context handle.
 * @param {number} g1 - The first geometry pointer.
 * @param {number} g2 - The second geometry pointer.
 * @returns {number} = 1 if true, 0 if false, -1 on error.
 * @alias module:geos
  */
  geos.GEOSIntersects_r = Module.cwrap('GEOSIntersects_r', 'number', ['number', 'number', 'number'])

  /**
 * Tests if two geometries cross.
 * @param {number} g1 - The first geometry pointer.
 * @param {number} g2 - The second geometry pointer.
 * @returns {number} = 1 if true, 0 if false, -1 on error.
 * @alias module:geos
  */
  geos.GEOSCrosses = null

  /**
 * Tests if two geometries cross in a given context.
 * @param {number} context - A pointer to the GEOS context handle.
 * @param {number} g1 - The first geometry pointer.
 * @param {number} g2 - The second geometry pointer.
 * @returns {number} = 1 if true, 0 if false, -1 on error.
 * @alias module:geos
  */
  geos.GEOSCrosses_r = Module.cwrap('GEOSCrosses_r', 'number', ['number', 'number', 'number'])

  /**
 * Tests if the first geometry is within the second geometry.
 * @param {number} g1 - The first geometry pointer.
 * @param {number} g2 - The second geometry pointer.
 * @returns {number} = 1 if true, 0 if false, -1 on error.
 * @alias module:geos
  */
  geos.GEOSWithin = null

  /**
 * Tests if the first geometry is within the second geometry in a given context.
 * @param {number} context - A pointer to the GEOS context handle.
 * @param {number} g1 - The first geometry pointer.
 * @param {number} g2 - The second geometry pointer.
 * @returns {number} = 1 if true, 0 if false, -1 on error.
 * @alias module:geos
  */
  geos.GEOSWithin_r = Module.cwrap('GEOSWithin_r', 'number', ['number', 'number', 'number'])

  /**
 * Tests if the first geometry contains the second geometry.
 * @param {number} g1 - The first geometry pointer.
 * @param {number} g2 - The second geometry pointer.
 * @returns {number} = 1 if true, 0 if false, -1 on error.
 * @alias module:geos
  */
  geos.GEOSContains = null

  /**
 * Tests if the first geometry contains the second geometry in a given context.
 * @param {number} context - A pointer to the GEOS context handle.
 * @param {number} g1 - The first geometry pointer.
 * @param {number} g2 - The second geometry pointer.
 * @returns {number} = 1 if true, 0 if false, -1 on error.
 * @alias module:geos
  */
  geos.GEOSContains_r = Module.cwrap('GEOSContains_r', 'number', ['number', 'number', 'number'])

  /**
 * Tests if two geometries overlap in their interior points.
 * @param {number} g1 - The first geometry pointer.
 * @param {number} g2 - The second geometry pointer.
 * @returns {number} = 1 if true, 0 if false, -1 on error.
 * @alias module:geos
  */
  geos.GEOSOverlaps = null

  /**
 * Tests whether two geometries overlap.
 * @param {number} handle - A pointer to the GEOS context handle.
 * @param {number} g1 - The first geometry.
 * @param {number} g2 - The second geometry.
 * @return {number} 1 if the geometries overlap, 0 if not, or -1 on error.
 * @alias module:geos
  */
  geos.GEOSOverlaps_r = Module.cwrap('GEOSOverlaps_r', 'number', ['number', 'number', 'number'])

  /**
 * Tests whether the first geometry covers the second geometry.
 * @param {number} g1 - The first geometry.
 * @param {number} g2 - The second geometry.
 * @return {number} 1 if the first geometry covers the second geometry, 0 if not, or -1 on error.
 * @alias module:geos
  */
  geos.GEOSCovers = null

  /**
 * Tests whether the first geometry covers the second geometry in a given context.
 * @param {number} handle - A pointer to the GEOS context handle.
 * @param {number} g1 - The first geometry.
 * @param {number} g2 - The second geometry.
 * @return {number} 1 if the first geometry covers the second geometry, 0 if not, or -1 on error.
 * @alias module:geos
  */
  geos.GEOSCovers_r = Module.cwrap('GEOSCovers_r', 'number', ['number', 'number', 'number'])

  /**
 * Tests whether the first geometry is covered by the second geometry.
 * @param {number} g1 - The first geometry.
 * @param {number} g2 - The second geometry.
 * @return {number} 1 if the first geometry is covered by the second geometry, 0 if not, or -1 on error.
 * @alias module:geos
  */
  geos.GEOSCoveredBy = null

  /**
 * Tests whether the first geometry is covered by the second geometry in a given context.
 * @param {number} handle - A pointer to the GEOS context handle.
 * @param {number} g1 - The first geometry.
 * @param {number} g2 - The second geometry.
 * @return {number} 1 if the first geometry is covered by the second geometry, 0 if not, or -1 on error.
 * @alias module:geos
  */
  geos.GEOSCoveredBy_r = Module.cwrap('GEOSCoveredBy_r', 'number', ['number', 'number', 'number'])

  /**
 * Tests whether two geometries are related according to a given DE-9IM intersection matrix pattern.
 * @param {number} g1 - A pointer to the first geometry
 * @param {number} g2 - A pointer to the second geometry
 * @param {string} pat - A string representing the DE-9IM pattern
 * @returns {number} 1 if the geometries are related, 0 if not, 2 on exception
 * @see https://libgeos.org/doxygen/geos__c_8h.html#a3a6f4e9a7f0b8c8d5b4a0c5f6c7e4d3f
 * @alias module:geos
  */
  geos.GEOSRelatePattern = null

  /**
 * Tests whether two geometries are related according to a given DE-9IM intersection matrix pattern in a thread-safe manner.
 * @param {number} handle - A GEOS context handle
 * @param {number} g1 - A pointer to the first geometry
 * @param {number} g2 - A pointer to the second geometry
 * @param {string} pat - A string representing the DE-9IM pattern
 * @returns {number} 1 if the geometries are related, 0 if not, 2 on exception
 * @see https://libgeos.org/doxygen/geos__c_8h.html#a3a6f4e9a7f0b8c8d5b4a0c5f6c7e4d3f
 * @alias module:geos
  */
  geos.GEOSRelatePattern_r = Module.cwrap('GEOSRelatePattern_r', 'number', ['number', 'number', 'number', 'string'])

  /**
 * Tests whether a DE-9IM intersection matrix matches a given pattern.
 * @param {string} mat - A string representing the DE-9IM matrix
 * @param {string} pat - A string representing the DE-9IM pattern
 * @returns {number} 1 if the matrix matches the pattern, 0 if not, 2 on exception
 * @see https://libgeos.org/doxygen/geos__c_8h.html#a3a6f4e9a7f0b8c8d5b4a0c5f6c7e4d3f
 * @alias module:geos
  */
  geos.GEOSRelatePatternMatch = null

  /**
 * Tests whether a DE-9IM intersection matrix matches a given pattern in a thread-safe manner.
 * @param {number} handle - A GEOS context handle
 * @param {string} mat - A string representing the DE-9IM matrix
 * @param {string} pat - A string representing the DE-9IM pattern
 * @returns {number} 1 if the matrix matches the pattern, 0 if not, 2 on exception
 * @see https://libgeos.org/doxygen/geos__c_8h.html#a3a6f4e9a7f0b8c8d5b4a0c5f6c7e4d3f
 * @alias module:geos
  */
  geos.GEOSRelatePatternMatch_r = Module.cwrap('GEOSRelatePatternMatch_r', 'number', ['number', 'string', 'string'])

  /**
 * Computes a DE-9IM intersection matrix for two geometries.
 * @param {number} g1 - A pointer to the first geometry
 * @param {number} g2 - A pointer to the second geometry
 * @returns {string} A string representing the DE-9IM matrix, or NULL on exception
 * @see https://libgeos.org/doxygen/geos__c_8h.html#a3a6f4e9a7f0b8c8d5b4a0c5f6c7e4d3f
 * @alias module:geos
  */
  geos.GEOSRelate = null

  /**
 * Computes the DE-9IM intersection matrix for two geometries.
 * @param {number} handle - A pointer to the GEOS context handle.
 * @param {number} g1 - The first geometry.
 * @param {number} g2 - The second geometry.
 * @return {string} The DE-9IM intersection matrix as a string, or null if an error occurred.
 * @see https://docs.rs/geos-sys/2.0.0/geos_sys/fn.GEOSRelate_r.html
 * @alias module:geos
  */
  geos.GEOSRelate_r = Module.cwrap('GEOSRelate_r', 'string', ['number', 'number', 'number'])

  /**
 * Computes the DE-9IM intersection matrix for two geometries using a specified Boundary Node Rule.
 * @param {number} handle - A pointer to the GEOS context handle.
 * @param {number} g1 - The first geometry.
 * @param {number} g2 - The second geometry.
 * @param {number} bnr - The Boundary Node Rule to use. One of: 1 (Mod2), 2 (EndPoint), 3 (MultiValentEndPoint), 4 (MonoValentEndPoint).
 * @return {string} The DE-9IM intersection matrix as a string, or null if an error occurred.
 * @see https://docs.rs/geos-sys/2.0.1/geos_sys/fn.GEOSRelateBoundaryNodeRule.html
 * @alias module:geos
  */
  geos.GEOSRelateBoundaryNodeRule = null

  /**
 * Computes the DE-9IM intersection matrix for two geometries using a specified Boundary Node Rule.
 * @param {number} handle - A pointer to the GEOS context handle.
 * @param {number} g1 - The first geometry.
 * @param {number} g2 - The second geometry.
 * @param {number} bnr - The Boundary Node Rule to use. One of: 1 (Mod2), 2 (EndPoint), 3 (MultiValentEndPoint), 4 (MonoValentEndPoint).
 * @return {string} The DE-9IM intersection matrix as a string, or null if an error occurred.
 * @see https://docs.rs/geos-sys/2.0.1/geos_sys/fn.GEOSRelateBoundaryNodeRule_r.html
 * @alias module:geos
  */
  geos.GEOSRelateBoundaryNodeRule_r = Module.cwrap('GEOSRelateBoundaryNodeRule_r', 'string', ['number', 'number', 'number', 'number'])

  /**
 * Tests whether a geometry is valid according to the OGC rules for geometry validity.
 * @param {number} geom - The geometry to test.
 * @return {number} 1 if the geometry is valid, 0 if it is invalid, or -1 if an error occurred.
 * @see https://docs.rs/geos-sys/1.0.10/geos_sys/fn.GEOSisValid.html
 * @alias module:geos
  */
  geos.GEOSisValid = null

  /**
 * Tests whether a geometry is valid according to the OGC rules for geometry validity.
 * @param {number} handle - A pointer to the GEOS context handle.
 * @param {number} geom - The geometry to test.
 * @return {number} 1 if the geometry is valid, 0 if it is invalid, or -1 if an error occurred.
 * @see https://docs.rs/geos-sys/1.0.10/geos_sys/fn.GEOSisValid_r.html
 * @alias module:geos
  */
  geos.GEOSisValid_r = Module.cwrap('GEOSisValid_r', 'number', ['number', 'number'])

  /**
 * Returns text stating if a geometry is valid, or if invalid a reason why.
 * @param {number} g - A pointer to a GEOSGeometry object
 * @returns {string} A null-terminated string describing the validity of the geometry
 * @see {@link https://libgeos.org/doxygen/geos__c_8h.html#a0f3a7b9f9c6b5a1d0c2f6c8e3a4d4b5e|GEOSisValidReason}
 * @alias module:geos
  */
  geos.GEOSisValidReason = null

  /**
 * Returns text stating if a geometry is valid, or if invalid a reason why. Thread-safe version.
 * @param {number} handle - A GEOS context handle
 * @param {number} g - A pointer to a GEOSGeometry object
 * @returns {string} A null-terminated string describing the validity of the geometry
 * @see {@link https://libgeos.org/doxygen/geos__c_8h.html#a0f3a7b9f9c6b5a1d0c2f6c8e3a4d4b5e|GEOSisValidReason_r}
 * @alias module:geos
  */
  geos.GEOSisValidReason_r = Module.cwrap('GEOSisValidReason_r', 'string', ['number', 'number'])

  /**
 * Returns a valid_detail row, containing a boolean stating if a geometry is valid,
 * a varchar stating a reason why it is invalid and a geometry pointing out where it is invalid.
 * @param {number} g - A pointer to a GEOSGeometry object
 * @param {number} flags - A bitfield for setting options. See {@link https://postgis.net/docs/ST_IsValidDetail.html|ST_IsValidDetail} for details.
 * @param {string} reason - A pointer to store the null-terminated string describing the validity of the geometry
 * @param {number} location - A pointer to store the GEOSGeometry object indicating the location of invalidity
 * @returns {number} 1 if the geometry is valid, 0 if it is invalid, or -1 on error
 * @see {@link https://libgeos.org/doxygen/geos__c_8h.html#a1f7b2d9e0a7d2e9d7e6f4a7a2f3e5b9d|GEOSisValidDetail}
 * @alias module:geos
  */
  geos.GEOSisValidDetail = null

  /**
 * Returns a valid_detail row, containing a boolean stating if a geometry is valid,
 * a varchar stating a reason why it is invalid and a geometry pointing out where it is invalid. Thread-safe version.
 * @param {number} handle - A GEOS context handle
 * @param {number} g - A pointer to a GEOSGeometry object
 * @param {number} flags - A bitfield for setting options. See {@link https://postgis.net/docs/ST_IsValidDetail.html|ST_IsValidDetail} for details.
 * @param {string} reason - A pointer to store the null-terminated string describing the validity of the geometry
 * @param {number} location - A pointer to store the GEOSGeometry object indicating the location of invalidity
 * @returns {number} 1 if the geometry is valid, 0 if it is invalid, or -1 on error
 * @see {@link https://libgeos.org/doxygen/geos__c_8h.html#a1f7b2d9e0a7d2e9d7e6f4a7a2f3e5b9d|GEOSisValidDetail_r}
 * @alias module:geos
  */
  geos.GEOSisValidDetail_r = Module.cwrap('GEOSisValidDetail_r', 'number', ['number', 'number', 'number', 'string', 'number'])

  /**
 * Tests whether two geometries are topologically equal.
 * @param {number} g1 - A pointer to a GEOSGeometry object
 * @param {number} g2 - A pointer to another GEOSGeometry object
 * @returns {number} 1 if they are equal, 0 if they are not, or -1 on error
 * @see {@link https://libgeos.org/doxygen/geos__c_8h.html#a5b6b7a4a8a0c5f0c1a2e3a9d9b4f6c7f|GEOSEquals}
 * @alias module:geos
  */
  geos.GEOSEquals = null

  /**
 * Tests whether two geometries are topologically equal.
 * @param {number} handle - A pointer to the GEOS context handle.
 * @param {number} g1 - The first geometry to compare.
 * @param {number} g2 - The second geometry to compare.
 * @return {number} 1 if equal, 0 if not, -1 on exception.
 * @alias module:geos
  */
  geos.GEOSEquals_r = Module.cwrap('GEOSEquals_r', 'number', ['number', 'number', 'number'])

  /**
 * Tests whether two geometries are exactly equal, up to a specified tolerance.
 * @param {number} g1 - The first geometry to compare.
 * @param {number} g2 - The second geometry to compare.
 * @param {number} tolerance - The maximum distance between any pair of points that are considered equal.
 * @return {number} 1 if equal, 0 if not, -1 on exception.
 * @alias module:geos
  */
  geos.GEOSEqualsExact = null

  /**
 * Tests whether two geometries are exactly equal, up to a specified tolerance.
 * @param {number} handle - A pointer to the GEOS context handle.
 * @param {number} g1 - The first geometry to compare.
 * @param {number} g2 - The second geometry to compare.
 * @param {number} tolerance - The maximum distance between any pair of points that are considered equal.
 * @return {number} 1 if equal, 0 if not, -1 on exception.
 * @alias module:geos
  */
  geos.GEOSEqualsExact_r = Module.cwrap('GEOSEqualsExact_r', 'number', ['number', 'number', 'number', 'number'])

  /**
 * Determine pointwise equivalence of two geometries by checking
 * that the structure, ordering, and values of all vertices are
 * identical in all dimensions. NaN values are considered to be
 * equal to other NaN values.
 *
* @param {number} g1 Input geometry
* @param {number} g2 Input geometry
* @returns {number} 1 on true, 0 on false, 2 on exception
*/
  geos.GEOSEqualsIdentical = null

  /**
* Determine pointwise equivalence of two geometries by checking
* that the structure, ordering, and values of all vertices are
* identical in all dimensions. NaN values are considered to be
* equal to other NaN values.
*
* @param {number} handle - A pointer to the GEOS context handle.
* @param {number} g1 Input geometry
* @param {number} g2 Input geometry
* @returns {number} 1 on true, 0 on false, 2 on exception
*/
  geos.GEOSEqualsIdentical_r = Module.cwrap('GEOSEqualsIdentical_r', 'number', ['number', 'number', 'number'])

  /**
 * Computes the distance between the closest points of two geometries.
 * @param {number} g1 - The first geometry to measure from.
 * @param {number} g2 - The second geometry to measure to.
 * @param {number} dist - A pointer to a double variable where the distance will be stored.
 * @return {number} 1 on success, 0 on exception.
 * @alias module:geos
  */
  geos.GEOSDistance = null

  /**
 * Computes the distance between the closest points of two geometries.
 * @param {number} handle - A pointer to the GEOS context handle.
 * @param {number} g1 - The first geometry to measure from.
 * @param {number} g2 - The second geometry to measure to.
 * @param {number} dist - A pointer to a double variable where the distance will be stored.
 * @return {number} 1 on success, 0 on exception.
 * @alias module:geos
  */
  geos.GEOSDistance_r = Module.cwrap('GEOSDistance_r', 'number', ['number', 'number', 'number', 'number'])

  /**
 * Computes the distance between two geometries using an indexed algorithm.
 * Useful when one or both geometries is very large.
 * @param {number} g1 - Input geometry pointer.
 * @param {number} g2 - Input geometry pointer.
 * @param {number} dist - Pointer to be filled in with distance result.
 * @return {number} 1 on success, 0 on exception.
 * @see geos::operation::distance::IndexedFacetDistance
 * @since 3.7
 * @alias module:geos
  */
  geos.GEOSDistanceIndexed = null

  /**
 * Computes the distance between two geometries using an indexed algorithm.
 * Useful when one or both geometries is very large.
 * This is a thread-safe version of GEOSDistanceIndexed.
 * @param {number} handle - The context handle.pointer
 * @param {number} g1 - Input geometry pointer.
 * @param {number} g2 - Input geometry pointer.
 * @param {number} dist - Pointer to be filled in with distance result.
 * @return {number} 1 on success, 0 on exception.
 * @see geos::operation::distance::IndexedFacetDistance
 * @since 3.7
 * @alias module:geos
  */
  geos.GEOSDistanceIndexed_r = Module.cwrap('GEOSDistanceIndexed_r', 'number', ['number', 'number', 'number', 'number'])

  /**
 * Computes the Hausdorff distance between two geometries.
 * The Hausdorff distance is a measure of how similar or dissimilar two geometries are.
 * It is the greatest distance between any point in one geometry and the closest point in the other geometry.
 * The smaller the Hausdorff distance, the more similar the geometries are.
 * @param {number} g1 - Input geometry pointer.
 * @param {number} g2 - Input geometry pointer.
 * @param {number} dist - Pointer to be filled in with distance result.
 * @return {number} 1 on success, 0 on exception.
 * @alias module:geos
  */
  geos.GEOSHausdorffDistance = null

  /**
 * Computes the Hausdorff distance between two geometries.
 * The Hausdorff distance is a measure of how similar or dissimilar two geometries are.
 * It is the greatest distance between any point in one geometry and the closest point in the other geometry.
 * The smaller the Hausdorff distance, the more similar the geometries are.
 * This is a thread-safe version of GEOSHausdorffDistance.
 * @param {number} handle - The context handle.pointer
 * @param {number} g1 - Input geometry pointer.
 * @param {number} g2 - Input geometry pointer.
 * @param {number} dist - Pointer to be filled in with distance result.
 * @return {number} 1 on success, 0 on exception.
 * @alias module:geos
  */
  geos.GEOSHausdorffDistance_r = Module.cwrap('GEOSHausdorffDistance_r', 'number', ['number', 'number', 'number', 'number'])

  /**
 * Computes an approximation to the Hausdorff distance between two geometries by densifying them before computing their discrete Hausdorff distance.
 * The densification fraction parameter controls how much densification occurs.
 * A fraction of 0.0 results in no densification, while a fraction of 1.0 results in effectively computing the exact Hausdorff distance.
 * The fraction is relative to the size of the input geometries: a fraction of 1.0 means that each input segment will be divided into a number of equal-length segments such that the minimum segment length in either input is equal to that length.
 * Increasing values of fraction reduce performance but increase accuracy of the calculated distance.
 * A reasonable fraction value is 0.25 (which corresponds to segmenting each input segment into quarters).
 * @param {number} g1 - Input geometry pointer.
 * @param {number} g2 - Input geometry pointer.
 * @param {number} densifyFrac - A fraction between 0 and 1 denoting the degree to which edges should be subdivided (smaller value means more subdivisions).
 * @param {number} dist - Pointer to be filled in with distance result.
 * @return {number} 1 on success, 0 on exception.
 * @alias module:geos
  */
  geos.GEOSHausdorffDistanceDensify = null

  /**
 * Computes the Hausdorff distance between two geometries, densifying them by a given fraction.
 * The Hausdorff distance is a measure of how similar or dissimilar two geometries are.
 * It is the greatest distance between any point in one geometry and the closest point in the other geometry.
 * Densifying the geometries involves inserting extra vertices along every line segment so that
 * the total length of the segments is increased by a given fraction.
 * @param {number} handle - A pointer to the GEOS context handle.
 * @param {number} g1 - The first geometry.
 * @param {number} g2 - The second geometry.
 * @param {number} densifyFrac - The fraction by which to densify each segment. Must be between 0 and 1.
 * @param {number} distance - A pointer to a double to store the computed distance.
 * @returns {number} 1 on success, 0 on exception.
 * @see https://libgeos.org/doxygen/classgeos_1_1algorithm_1_1distance_1_1DiscreteHausdorffDistance.html
 * @see https://gis.stackexchange.com/questions/253067/directed-hausdorff-distance-in-postgis
 * @alias module:geos
  */
  geos.GEOSHausdorffDistanceDensify_r = Module.cwrap('GEOSHausdorffDistanceDensify_r', 'number', ['number', 'number', 'number', 'number', 'number'])

  /**
 * Computes the Fréchet distance between two geometries.
 * The Fréchet distance is a measure of similarity between curves that takes into account
 * the location and ordering of the points along the curves.
 * It is defined as the minimum length of a leash that connects a dog and its owner who walk along their respective curves,
 * without backtracking, from one end to the other end.
 * @param {number} g1 - The first geometry.
 * @param {number} g2 - The second geometry.
 * @param {number} distance - A pointer to a double to store the computed distance.
 * @returns {number} 1 on success, 0 on exception.
 * @see https://en.wikipedia.org/wiki/Fr%C3%A9chet_distance
 * @see https://libgeos.org/doxygen/classgeos_1_1algorithm_1_1distance_1_1DiscreteFrechetDistance.html
 * @alias module:geos
  */
  geos.GEOSFrechetDistance = null

  /**
 * Computes the Fréchet distance between two geometries using a GEOS context handle.
 * The Fréchet distance is a measure of similarity between curves that takes into account
 * the location and ordering of the points along the curves.
 * It is defined as the minimum length of a leash that connects a dog and its owner who walk along their respective curves,
 * without backtracking, from one end to the other end.
 * @param {number} handle - A pointer to the GEOS context handle.
 * @param {number} g1 - The first geometry.
 * @param {number} g2 - The second geometry.
 * @param {number} distance - A pointer to a double to store the computed distance.
 * @returns {number} 1 on success, 0 on exception.
 * @see https://en.wikipedia.org/wiki/Fr%C3%A9chet_distance
 * @see https://libgeos.org/doxygen/classgeos_1_1algorithm_1_1distance_1_1DiscreteFrechetDistance.html
 * @alias module:geos
  */
  geos.GEOSFrechetDistance_r = Module.cwrap('GEOSFrechetDistance_r', 'number', ['number', 'number', 'number', 'number'])

  /**
 * Computes the Fréchet distance between two geometries, densifying them by a given fraction.
 * The Fréchet distance is a measure of similarity between curves that takes into account
 * the location and ordering of the points along the curves.
 * It is defined as the minimum length of a leash that connects a dog and its owner who walk along their respective curves,
 * without backtracking, from one end to the other end.
 * Densifying the geometries involves inserting extra vertices along every line segment so that
 * the total length of the segments is increased by a given fraction.
 * @param {number} g1 - The first geometry.
 * @param {number} g2 - The second geometry.
 * @param {number} densifyFrac - The fraction by which to densify each segment. Must be between 0 and 1.
 * @param {number} distance - A pointer to a double to store the computed distance.
 * @returns {number} 1 on success, 0 on exception.
 * @see https://en.wikipedia.org/wiki/Fr%C3%A9chet_distance
 * @see https://libgeos.org/doxygen/classgeos_1_1algorithm_1_1distance_1_1DiscreteFrechetDistance.html
 * @see https://r-spatial.github.io/sf/reference/geos_measures.html
 * @alias module:geos
  */
  geos.GEOSFrechetDistanceDensify = null

  /**
 * Computes the Fréchet distance between two geometries using a GEOS context handle, densifying them by a given fraction.
 * The Fréchet distance is a measure of similarity between curves that takes into account
 * the location and ordering of the points along the curves.
 * It is defined as the minimum length of a leash that connects a dog and its owner who walk along their respective curves,
 * without backtracking, from one end to the other end.
 * Densifying the geometries involves inserting extra vertices along every line segment so that
 * the total length of the segments is increased by a given fraction.
 * @param {number} handle - A pointer to the GEOS context handle.
 * @param {number} g1 - The first geometry.
 * @param {number} g2 - The second geometry.
 * @param {number} densifyFrac - The fraction by which to densify each segment. Must be between 0 and 1.
 * @param {number} distance - A pointer to a double to store the computed distance.
 * @returns {number} 1 on success, 0 on exception.
 * @see https://en.wikipedia.org/wiki/Fr%C3%A9chet_distance
 * @see https://libgeos.org/doxygen/classgeos_1_1algorithm_1_1distance_1_1DiscreteFrechetDistance.html
 * @see https://r-spatial.github.io/sf/reference/geos_measures.html
 * @alias module:geos
  */
  geos.GEOSFrechetDistanceDensify_r = Module.cwrap('GEOSFrechetDistanceDensify_r', 'number', ['number', 'number', 'number', 'number', 'number'])

  /**
 * Calculate the area of a geometry.
 * @param {number} g - A pointer to a GEOSGeometry object
 * @param {number} area - A pointer to be filled in with area result
 * @returns {number} 1 on success, 0 on exception
 * @see https://libgeos.org/doxygen/geos__c_8h.html#af5eec7e8796b756cf007fd21bb3a88ad
 * @alias module:geos
 * @example
 * const reader = geos.GEOSWKTReader_create()
 * const wkt = 'POLYGON((0 0,0 10,10 10,10 0,0 0))'
 * const g = geos.GEOSWKTReader_read(reader, wkt)
 * const area = geos.Module._malloc(8)
 * geos.GEOSArea(g, area)
 * const areaValue = geos.Module.getValue(area, 'double')
 * console.log(areaValue) // 100
  */
  geos.GEOSArea = null

  /**
 * Calculate the area of a geometry using a custom context handle.
 * @param {number} handle - A GEOSContextHandle_t object
 * @param {number} g - A pointer to a GEOSGeometry object
 * @param {number} area - A pointer to be filled in with area result
 * @returns {number} 1 on success, 0 on exception
 * @alias module:geos
  */
  geos.GEOSArea_r = Module.cwrap('GEOSArea_r', 'number', ['number', 'number', 'number'])

  /**
 * Calculate the length of a geometry.
 * @param {number} g - A pointer to a GEOSGeometry object
 * @param {number} length - A pointer to be filled in with length result
 * @returns {number} 1 on success, 0 on exception
 * @alias module:geos
  */
  geos.GEOSLength = null

  /**
 * Calculate the length of a geometry using a custom context handle.
 * @param {number} handle - A GEOSContextHandle_t object
 * @param {number} g - A pointer to a GEOSGeometry object
 * @param {number} length - A pointer to be filled in with length result
 * @returns {number} 1 on success, 0 on exception
 * @alias module:geos
  */
  geos.GEOSLength_r = Module.cwrap('GEOSLength_r', 'number', ['number', 'number', 'number'])

  /**
 * Compute the nearest points between two geometries.
 * @param {string} g1 - A JSON string representing a GEOSGeometry object
 * @param {string} g2 - A JSON string representing a GEOSGeometry object
 * @returns {string} A JSON string representing a GEOSGeometry object containing two points, or null on exception
 * @alias module:geos
  */
  geos.GEOSNearestPoints = null

  /**
 * Returns a GEOSCoordSequence of the nearest points between two geometries.
 * @param {number} handle - A pointer to the GEOS context handle.
 * @param {string} g1 - The first geometry as a WKT string.
 * @param {string} g2 - The second geometry as a WKT string.
 * @returns {string} A WKT string representing the GEOSCoordSequence of the nearest points.
 * @alias module:geos
  */
  geos.GEOSNearestPoints_r = Module.cwrap('GEOSNearestPoints_r', 'string', ['number', 'string', 'string'])

  /**
 * Returns a GEOSGeometry from a Well-Known Text (WKT) representation.
 * @param {number} wkt - The WKT representation of the geometry.
 * @returns {number} A pointer to the GEOSGeometry object.
 * @alias module:geos
  */
  geos.GEOSGeomFromWKT = null

  /**
 * Returns a GEOSGeometry from a Well-Known Text (WKT) representation.
 * @param {number} handle - A pointer to the GEOS context handle.
 * @param {number} wkt - The WKT representation of the geometry.
 * @returns {number} A pointer to the GEOSGeometry object.
 * @alias module:geos
  */
  geos.GEOSGeomFromWKT_r = Module.cwrap('GEOSGeomFromWKT_r', 'number', ['number', 'number'])

  /**
 * Returns a Well-Known Text (WKT) representation of a GEOSGeometry.
 * @param {number} geom - A pointer to the GEOSGeometry object.
 * @returns {number} A WKT representation of the geometry.
 * @alias module:geos
  */
  geos.GEOSGeomToWKT = null

  /**
 * Returns a Well-Known Text (WKT) representation of a GEOSGeometry.
 * @param {number} handle - A pointer to the GEOS context handle.
 * @param {number} geom - A pointer to the GEOSGeometry object.
 * @returns {number} A WKT representation of the geometry.
 * @alias module:geos
  */
  geos.GEOSGeomToWKT_r = Module.cwrap('GEOSGeomToWKT_r', 'number', ['number', 'number'])

  /**
 * Converts a GEOSGeometry to a WKB representation.
 * @param {number} g - The geometry pointer to convert.
 * @param {number} size - A pointer to a size_t where the size of the returned buffer will be stored.
 * @returns {number} A pointer to a buffer containing the WKB representation of the geometry, or NULL on exception. The caller is responsible for freeing the buffer with GEOSFree().
 * @alias module:geos
  */
  geos.GEOSGeomToWKB_buf = null

  /**
 * Converts a GEOSGeometry to a WKB representation using a context handle.
 * @param {number} handle - The context handle.pointer
 * @param {number} g - The geometry pointer to convert.
 * @param {number} size - A pointer to a size_t where the size of the returned buffer will be stored.
 * @returns {number} A pointer to a buffer containing the WKB representation of the geometry, or NULL on exception. The caller is responsible for freeing the buffer with GEOSFree_r().
 * @alias module:geos
  */
  geos.GEOSGeomToWKB_buf_r = Module.cwrap('GEOSGeomToWKB_buf_r', 'number', ['number', 'number', 'number'])

  /**
 * Converts a WKB representation to a GEOSGeometry.
 * @param {number} wkb - A pointer to a buffer containing the WKB representation of the geometry.
 * @param {number} size - The size of the buffer.
 * @returns {number} A pointer to a newly allocated GEOSGeometry, or NULL on exception. The caller is responsible for destroying it with GEOSGeom_destroy().
 * @alias module:geos
  */
  geos.GEOSGeomFromWKB_buf = null

  /**
 * Converts a WKB representation to a GEOSGeometry using a context handle.
 * @param {number} handle - The context handle.pointer
 * @param {number} wkb - A pointer to a buffer containing the WKB representation of the geometry.
 * @param {number} size - The size of the buffer.
 * @returns {number} A pointer to a newly allocated GEOSGeometry, or NULL on exception. The caller is responsible for destroying it with GEOSGeom_destroy_r().
 * @alias module:geos
  */
  geos.GEOSGeomFromWKB_buf_r = Module.cwrap('GEOSGeomFromWKB_buf_r', 'number', ['number', 'number', 'number'])

  /**
 * Converts a GEOSGeometry to a HEX-encoded WKB representation.
 * @param {number} g - The geometry pointer to convert.
 * @param {number} size - A pointer to a size_t where the length of the returned string will be stored.
 * @returns {string} A null-terminated string containing the HEX-encoded WKB representation of the geometry, or NULL on exception. The caller is responsible for freeing the string with GEOSFree().
 * @alias module:geos
  */
  geos.GEOSGeomToHEX_buf = null

  /**
 * Converts a geometry to a hexadecimal representation of its WKB.
 * @param {number} handle - A pointer to the GEOS context handle.
 * @param {number} g - The geometry to convert.
 * @param {number} size - A pointer to a size_t where the size of the returned buffer will be stored.
 * @returns {string} A null-terminated hexadecimal string, or NULL on exception. The caller is responsible for freeing it.
 * @alias module:geos
  */
  geos.GEOSGeomToHEX_buf_r = Module.cwrap('GEOSGeomToHEX_buf_r', 'string', ['number', 'number', 'number'])

  /**
 * Converts a hexadecimal representation of WKB to a geometry.
 * @param {string} hex - The hexadecimal string to convert.
 * @param {number} size - The size of the hexadecimal string.
 * @returns {number} A geometry, or NULL on exception. The caller is responsible for destroying it.
 * @alias module:geos
  */
  geos.GEOSGeomFromHEX_buf = null

  /**
 * Converts a hexadecimal representation of WKB to a geometry with a GEOS context handle.
 * @param {number} handle - A pointer to the GEOS context handle.
 * @param {string} hex - The hexadecimal string to convert.
 * @param {number} size - The size of the hexadecimal string.
 * @returns {number} A geometry, or NULL on exception. The caller is responsible for destroying it.
 * @alias module:geos
  */
  geos.GEOSGeomFromHEX_buf_r = Module.cwrap('GEOSGeomFromHEX_buf_r', 'number', ['number', 'string', 'number'])

  /**
 * Tests whether a geometry is empty.
 * @param {number} g - The geometry to test.
 * @returns {number} 1 if the geometry is empty, 0 if it is not, or 2 on exception.
 * @alias module:geos
  */
  geos.GEOSisEmpty = null

  /**
 * Tests whether a geometry is empty with a GEOS context handle.
 * @param {number} handle - A pointer to the GEOS context handle.
 * @param {number} g - The geometry to test.
 * @returns {number} 1 if the geometry is empty, 0 if it is not, or 2 on exception.
 * @alias module:geos
  */
  geos.GEOSisEmpty_r = Module.cwrap('GEOSisEmpty_r', 'number', ['number', 'number'])

  /**
 * Tests whether a geometry is simple.
 * A geometry is simple if it has no points of self-tangency, self-intersection or other anomalous points.
 * @param {number} g - a pointer to a GEOSGeometry object
 * @returns {number} 1 if the geometry is simple, 0 if not, or -1 on error
 * @alias module:geos
  */
  geos.GEOSisSimple = null

  /**
 * Tests whether a geometry is simple (thread-safe version).
 * A geometry is simple if it has no points of self-tangency, self-intersection or other anomalous points.
 * @param {number} handle - a pointer to a GEOS context handle
 * @param {number} g - a pointer to a GEOSGeometry object
 * @returns {number} 1 if the geometry is simple, 0 if not, or -1 on error
 * @alias module:geos
  */
  geos.GEOSisSimple_r = Module.cwrap('GEOSisSimple_r', 'number', ['number', 'number'])

  /**
 * Tests whether a geometry is a ring.
 * A ring is a closed and simple linestring.
 * @param {number} g - a pointer to a GEOSGeometry object
 * @returns {number} 1 if the geometry is a ring, 0 if not, or -1 on error
 * @alias module:geos
  */
  geos.GEOSisRing = null

  /**
 * Tests whether a geometry is a ring (thread-safe version).
 * A ring is a closed and simple linestring.
 * @param {number} handle - a pointer to a GEOS context handle
 * @param {number} g - a pointer to a GEOSGeometry object
 * @returns {number} 1 if the geometry is a ring, 0 if not, or -1 on error
 * @alias module:geos
  */
  geos.GEOSisRing_r = Module.cwrap('GEOSisRing_r', 'number', ['number', 'number'])

  /**
 * Returns the type name of a geometry as a string.
 * The possible values are: "Point", "LineString", "LinearRing", "Polygon", "MultiPoint", "MultiLineString", "MultiPolygon", "GeometryCollection".
 * @param {number} g - a pointer to a GEOSGeometry object
 * @returns {string} the type name of the geometry, or NULL on error
 * @alias module:geos
  */
  geos.GEOSGeomType = null

  /**
 * Returns the name of a geometry's type.
 * @param {number} handle - A pointer to the GEOS context handle.
 * @param {number} g - The geometry pointer to get the type name of.
 * @returns {string} The name of the geometry's type, or NULL on exception.
 * @see https://libgeos.org/doxygen/geos__c_8h.html#a9f3a3f0d6a8c7e9a0b4f2b7c6d0e5f1a
 * @alias module:geos
  */
  geos.GEOSGeomType_r = Module.cwrap('GEOSGeomType_r', 'string', ['number', 'number'])

  /**
 * Returns the type ID of a geometry.
 * @param {number} g - The geometry pointer to get the type ID of.
 * @returns {number} The type ID of the geometry, or -1 on exception.
 * @see https://libgeos.org/doxygen/geos__c_8h.html#a6e4b5f2c7d0b6a9a3e7b2d5f8d7f9e4c
 * @alias module:geos
  */
  geos.GEOSGeomTypeId = null

  /**
 * Returns the type ID of a geometry.
 * @param {number} handle - A pointer to the GEOS context handle.
 * @param {number} g - The geometry pointer to get the type ID of.
 * @returns {number} The type ID of the geometry, or -1 on exception.
 * @see https://libgeos.org/doxygen/geos__c_8h.html#a3b9d5a4f2e9b4a0c2e8a6f3b1c1d2e0b
 * @alias module:geos
  */
  geos.GEOSGeomTypeId_r = Module.cwrap('GEOSGeomTypeId_r', 'number', ['number', 'number'])

  /**
 * Computes an envelope (bounding box) of a geometry.
 * @param {number} g - The geometry pointer to compute the envelope of.
 * @returns {number} A newly allocated geometry pointer representing the envelope, or NULL on exception.
 * @see https://libgeos.org/doxygen/geos__c_8h.html#a3a5d7f5dcbdb489edddbb43374ece97c
 * @alias module:geos
  */
  geos.GEOSEnvelope = null

  /**
 * Computes an envelope (bounding box) of a geometry.
 * @param {number} handle - A pointer to the GEOS context handle.
 * @param {number} g - The geometry pointer to compute the envelope of.
 * @returns {number} A newly allocated geometry pointer representing the envelope, or NULL on exception.
 * @see https://libgeos.org/doxygen/geos__c_8h.html#a4b1b77abcf0b320bc625129ff5e6d1d6
 * @alias module:geos
  */
  geos.GEOSEnvelope_r = Module.cwrap('GEOSEnvelope_r', 'number', ['number', 'number'])

  /**
 * Computes a geometry that represents the point set intersection of the input geometries.
 * @param {number} g1 - A pointer to the first geometry.
 * @param {number} g2 - A pointer to the second geometry.
 * @returns {number} A pointer to the resulting geometry, or NULL if an exception was thrown.
 * @alias module:geos
  */
  geos.GEOSIntersection = null

  /**
 * Computes a geometry that represents the point set intersection of the input geometries.
 * @param {number} handle - A pointer to the GEOS context handle.
 * @param {number} g1 - A pointer to the first geometry.
 * @param {number} g2 - A pointer to the second geometry.
 * @returns {number} A pointer to the resulting geometry, or NULL if an exception was thrown.
 * @alias module:geos
  */
  geos.GEOSIntersection_r = Module.cwrap('GEOSIntersection_r', 'number', ['number', 'number', 'number'])

  /**
 * Computes a geometry that represents the point set intersection of the input geometries using a precision model.
 * @param {number} g1 - A pointer to the first geometry.
 * @param {number} g2 - A pointer to the second geometry.
 * @param {number} gridSize - The grid size for the precision model.
 * @returns {number} A pointer to the resulting geometry, or NULL if an exception was thrown.
 * @alias module:geos
  */
  geos.GEOSIntersectionPrec = null

  /**
* Computes a geometry that represents the point set intersection of the input geometries using a precision model.
* @param {number} handle - A pointer to the GEOS context handle.
* @param {number} g1 - A pointer to the first geometry.
* @param {number} g2 - A pointer to the second geometry.
* @param {number} gridSize - The grid size for the precision model.
* @returns {number} A pointer to the resulting geometry, or NULL if an exception was thrown.
* @alias module:geos
*/
  geos.GEOSIntersectionPrec_r = Module.cwrap('GEOSIntersectionPrec_r', 'number', ['number', 'number', 'number', 'number'])

  /**
 * Computes a geometry that represents the point set difference of the input geometries.
 * @param {number} ga - A pointer to the first geometry.
 * @param {number} gb - A pointer to the second geometry.
 * @returns {number} A pointer to the resulting geometry, or NULL if an exception was thrown.
 * @alias module:geos
  */
  geos.GEOSDifference = null

  /**
* Computes a geometry that represents the point set difference of the input geometries.
* @param {number} handle - A pointer to the GEOS context handle.
* @param {number} ga - A pointer to the first geometry.
* @param {number} gb - A pointer to the second geometry.
* @returns {number} A pointer to the resulting geometry, or NULL if an exception was thrown.
* @alias module:geos
*/
  geos.GEOSDifference_r = Module.cwrap('GEOSDifference_r', 'number', ['number', 'number', 'number'])

  /**
 * Computes a geometry that represents the point set difference of the input geometries using a precision model.
 * @param {number} ga - A pointer to the first geometry.
 * @param {number} gb - A pointer to the second geometry.
 * @param {number} gridSize - The grid size for the precision model.
 * @returns {number} A pointer to the resulting geometry, or NULL if an exception was thrown.
 * @alias module:geos
  */
  geos.GEOSDifferencePrec = null

  /**
* Computes a geometry that represents the point set difference of the input geometries using a precision model.
* @param {number} handle - A pointer to the GEOS context handle.
* @param {number} ga - A pointer to the first geometry.
* @param {number} gb - A pointer to the second geometry.
* @param {number} gridSize - The grid size for the precision model.
* @returns {number} A pointer to the resulting geometry, or NULL if an exception was thrown.
* @alias module:geos
*/
  geos.GEOSDifferencePrec_r = Module.cwrap('GEOSDifferencePrec_r', 'number', ['number', 'number', 'number', 'number'])

  /**
 * Computes a buffer area around this geometry having the given width and with a specified accuracy of approximation for circular arcs.
 * @param {number} g - A pointer to the input geometry.
 * @param {number} width - The width of the buffer area around this geometry. Negative values create a buffer inside this geometry.
 * @param {number} quadsegs - The number of segments used to approximate a quarter circle (defaults to 8).
 * @returns {number} A pointer to the resulting geometry, or NULL if an exception was thrown.
 * @alias module:geos
  */
  geos.GEOSBuffer = null

  /**
 * Creates a buffer around a geometry with a specified width, number of segments per quadrant, end cap style, join style and mitre limit.
 * @param {number} handle - A pointer to the GEOS context handle.
 * @param {number} g - The input geometry pointer.
 * @param {number} width - The buffer width.
 * @param {number} quadsegs - The number of segments per quadrant.
 * @param {number} endCapStyle - The end cap style. One of GEOSBUF_CAP_ROUND, GEOSBUF_CAP_FLAT or GEOSBUF_CAP_SQUARE.
 * @param {number} joinStyle - The join style. One of GEOSBUF_JOIN_ROUND, GEOSBUF_JOIN_MITRE or GEOSBUF_JOIN_BEVEL.
 * @param {number} mitreLimit - The mitre limit. A positive number or zero.
 * @returns {number} The buffered geometry pointer or NULL if an exception occurred.
 * @alias module:geos
  */
  geos.GEOSBuffer_r = Module.cwrap('GEOSBuffer_r', 'number', ['number', 'number', 'number', 'number'])

  /**
 * Creates a buffer around a geometry with a specified width, number of segments per quadrant, end cap style, join style and mitre limit.
 * @param {number} g - The input geometry pointer.
 * @param {number} width - The buffer width.
 * @param {number} quadsegs - The number of segments per quadrant.
 * @param {number} endCapStyle - The end cap style. One of GEOSBUF_CAP_ROUND, GEOSBUF_CAP_FLAT or GEOSBUF_CAP_SQUARE.
 * @param {number} joinStyle - The join style. One of GEOSBUF_JOIN_ROUND, GEOSBUF_JOIN_MITRE or GEOSBUF_JOIN_BEVEL.
 * @returns {number} The buffered geometry pointer or NULL if an exception occurred.
 * @alias module:geos
  */
  geos.GEOSBufferWithStyle = null

  /**
 * Creates a buffer around a geometry with a specified width, number of segments per quadrant, end cap style, join style and mitre limit using a given context handle.
 * @param {number} handle - A pointer to the GEOS context handle.
 * @param {number} g - The input geometry pointer.
 * @param {number} width - The buffer width.
 * @param {number} quadsegs - The number of segments per quadrant.
 * @param {number} endCapStyle - The end cap style. One of GEOSBUF_CAP_ROUND, GEOSBUF_CAP_FLAT or GEOSBUF_CAP_SQUARE.
 * @param {number} joinStyle - The join style. One of GEOSBUF_JOIN_ROUND, GEOSBUF_JOIN_MITRE or GEOSBUF_JOIN_BEVEL.
 * @param {number} mitreLimit - The mitre limit. A positive number or zero.
 * @returns {number} The buffered geometry pointer or NULL if an exception occurred.
 * @alias module:geos
  */
  geos.GEOSBufferWithStyle_r = Module.cwrap('GEOSBufferWithStyle_r', 'number', ['number', 'number', 'number', 'number', 'number', 'number'])

  /**
 * Creates a single-sided buffer around a geometry with a specified width, number of segments per quadrant, side (left or right), end cap style and join style using a given context handle.
 * A positive distance will create a buffer on the left side of the geometry (as viewed from the start point to the end point), while a negative distance will create a buffer on the right side.
 * A single-sided buffer is constructed by offsetting the input line by the buffer distance then forming a buffer around the offset line by the buffer distance (using round ends).
 * This produces a buffer polygon with one straight side which is parallel to the input line at the given offset distance.
 * If the input line is oriented counter-clockwise then the left side is inside the polygon; otherwise it is outside.
 * If the input line is not simple (i.e. it loops back on itself) then there may be multiple left sides and right sides; in this case it is not clearly defined which side should be buffered.
 * In this case the operation may either fail with an exception or return an approximate result which may not be valid.
 * This function does not support buffering MultiLineStrings (the result will be an empty polygon).
 * @param {number} g - The input geometry pointer.
 * @param {number} width - The buffer width.
 * @param {number} quadsegs - The number of segments per quadrant.
 * @param {number} joinStyle - The join style. One of 1 = GEOSBUF_JOIN_ROUND, 2 = GEOSBUF_JOIN_MITRE or 3 = GEOSBUF_JOIN_BEVEL.
 * @param {number} mitreLimit - The mitre limit. A positive number or zero.
 * @param {number} side - The side to buffer. 1 for left, -1 for right.
 * @returns {number} The single-sided buffered geometry pointer or NULL if an exception occurred.
 * @alias module:geos
  */
  geos.GEOSSingleSidedBuffer = null

  /**
 * Creates a single-sided buffer around a geometry with a specified width, number of segments per quadrant, side (left or right), end cap style and join style using a given context handle.
 * A positive distance will create a buffer on the left side of the geometry (as viewed from the start point to the end point), while a negative distance will create a buffer on the right side.
 * A single-sided buffer is constructed by offsetting the input line by the buffer distance then forming a buffer around the offset line by the buffer distance (using round ends).
 * This produces a buffer polygon with one straight side which is parallel to the input line at the given offset distance.
 * If the input line is oriented counter-clockwise then the left side is inside the polygon; otherwise it is outside.
 * If the input line is not simple (i.e. it loops back on itself) then there may be multiple left sides and right sides; in this case it is not clearly defined which side should be buffered.
 * In this case the operation may either fail with an exception or return an approximate result which may not be valid.
 * This function does not support buffering MultiLineStrings (the result will be an empty polygon).
 * @param {number} handle - A pointer to the GEOS context handle.
 * @param {number} g - The input geometry pointer.
 * @param {number} width - The buffer width.
 * @param {number} quadsegs - The number of segments per quadrant.
 * @param {number} side - The side to buffer. 1 for left, -1 for right.
 * @param {number} endCapStyle - The end cap style. One of 1 = GEOSBUF_CAP_ROUND, 2 = GEOSBUF_CAP_FLAT or 3 =GEOSBUF_CAP_SQUARE.
 * @param {number} joinStyle - The join style. One of 1 = GEOSBUF_JOIN_ROUND, 2 = GEOSBUF_JOIN_MITRE or 3 = GEOSBUF_JOIN_BEVEL.
 * @returns {number} The single-sided buffered geometry pointer or NULL if an exception occurred.
 * @alias module:geos
  */
  geos.GEOSSingleSidedBuffer_r = Module.cwrap('GEOSSingleSidedBuffer_r', 'number', ['number', 'number', 'number', 'number', 'number', 'number'])

  /**
 * Computes an offset curve from a geometry. An offset curve is a linear geometry which is offset a given distance from the input. If the offset distance is positive the curve lies on the left side of the input; if it is negative the curve is on the right side. The curve(s) have the same direction as the input line(s).
 * @param {number} geom - A pointer to a GEOSGeometry object.
 * @param {number} width - The offset distance.
 * @param {number} quadsegs - The number of quadrant segments used to approximate a quarter circle (defaults to 8).
 * @param {number} joinStyle - The join style for line joins (defaults to BufferParameters::JOIN_STYLE).
 * @param {number} mitreLimit - The mitre ratio limit (only applies for mitre join style, defaults to 5.0).
 * @returns {number} A pointer to a new GEOSGeometry object representing the offset curve, or NULL on exception.
 * @see https://libgeos.org/doxygen/geos__c_8h.html#a06557cad6153f56703b6875d4f21dc18
 * @alias module:geos
  */
  geos.GEOSOffsetCurve = null

  /**
 * Computes an offset curve from a geometry using a handle. An offset curve is a linear geometry which is offset a given distance from the input. If the offset distance is positive the curve lies on the left side of the input; if it is negative the curve is on the right side. The curve(s) have the same direction as the input line(s).
 * @param {number} handle - A pointer to a GEOSContextHandle_t object.
 * @param {number} geom - A pointer to a GEOSGeometry object.
 * @param {number} width - The offset distance.
 * @param {number} quadsegs - The number of quadrant segments used to approximate a quarter circle (defaults to 8).
 * @param {number} joinStyle - The join style for line joins (defaults to BufferParameters::JOIN_STYLE).
 * @param {number} mitreLimit - The mitre ratio limit (only applies for mitre join style, defaults to 5.0).
 * @returns {number} A pointer to a new GEOSGeometry object representing the offset curve, or NULL on exception.
 * @see https://libgeos.org/doxygen/classgeos_1_1operation_1_1buffer_1_1OffsetCurve.html
 * @alias module:geos
  */
  geos.GEOSOffsetCurve_r = Module.cwrap('GEOSOffsetCurve_r', 'number', ['number', 'number', 'number', 'number', 'number', 'number'])

  /**
 * Computes the convex hull of a geometry. The convex hull is the smallest convex geometry that contains all the points in the input geometry.
 * @param {number} geom - A pointer to a GEOSGeometry object.
 * @returns {number} A pointer to a new GEOSGeometry object representing the convex hull, or NULL on exception.
 * @see https://libgeos.org/doxygen/classgeos_1_1algorithm_1_1ConvexHull.html
 * @alias module:geos
  */
  geos.GEOSConvexHull = null

  /**
 * Computes the convex hull of a geometry using a handle. The convex hull is the smallest convex geometry that contains all the points in the input geometry.
 * @param {number} handle - A pointer to a GEOSContextHandle_t object.
 * @param {number} geom - A pointer to a GEOSGeometry object.
 * @returns {number} A pointer to a new GEOSGeometry object representing the convex hull, or NULL on exception.
 * @see https://libgeos.org/doxygen/classgeos_1_1algorithm_1_1ConvexHull.html
 * @alias module:geos
  */
  geos.GEOSConvexHull_r = Module.cwrap('GEOSConvexHull_r', 'number', ['number', 'number'])

  /**
   * Returns a "concave hull" of a geometry. A concave hull is a polygon which contains all the points of the input, but is a better approximation than the convex hull to the area occupied by the input. Frequently used to convert a multi-point into a polygonal area. that contains all the points in the input Geometry.
   *
   * A set of points has a sequence of hulls of increasing concaveness, determined by a numeric target parameter. The concave hull is constructed by removing the longest outer edges of the Delaunay Triangulation of the space between the polygons, until the target criterion parameter is reached. This can be expressed as a ratio between the lengths of the longest and shortest edges. 1 produces the convex hull; 0 produces a hull with maximum concaveness
   * @param {number} geom - A pointer to a GEOSGeometry object.
   * @param {number} ratio - The edge length ratio value, between 0 and 1.
   * @param {number} allowHoles - When non-zero, the polygonal output may contain holes.
   * @returns {number} A newly allocated geometry of the concave hull. NULL on exception.
   * @alias module:geos
   */
  geos.GEOSConcaveHull = null

  /**
   * Returns a "concave hull" of a geometry. A concave hull is a polygon which contains all the points of the input, but is a better approximation than the convex hull to the area occupied by the input. Frequently used to convert a multi-point into a polygonal area. that contains all the points in the input Geometry.
   *
   * A set of points has a sequence of hulls of increasing concaveness, determined by a numeric target parameter. The concave hull is constructed by removing the longest outer edges of the Delaunay Triangulation of the space between the polygons, until the target criterion parameter is reached. This can be expressed as a ratio between the lengths of the longest and shortest edges. 1 produces the convex hull; 0 produces a hull with maximum concaveness
   * @param {number} handle - A pointer to the GEOS context handle.
   * @param {number} geom - A pointer to a GEOSGeometry object.
   * @param {number} ratio - The edge length ratio value, between 0 and 1.
   * @param {number} allowHoles - When non-zero, the polygonal output may contain holes.
   * @returns {number} A newly allocated geometry of the concave hull. NULL on exception.
   * @alias module:geos
   */
  geos.GEOSConcaveHull_r = Module.cwrap('GEOSConcaveHull_r', 'number', ['number', 'number', 'number', 'number'])

  /**
 * Returns a "concave hull" of a geometry. A concave hull is a polygon which contains all the points of the input, but is a better approximation than the convex hull to the area occupied by the input. Frequently used to convert a multi-point into a polygonal area. that contains all the points in the input Geometry.
 *
 * A set of points has a sequence of hulls of increasing concaveness, determined by a numeric target parameter. The concave hull is constructed by removing the longest outer edges of the Delaunay Triangulation of the space between the polygons, until the specified maximm edge length is reached. A large value produces the convex hull, 0 produces the hull of maximim concaveness.
 * @param {number} geom - A pointer to a GEOSGeometry object.
 * @param {number} length - The maximum edge length (0 or greater).
 * @param {number} allowHoles - When non-zero, the polygonal output may contain holes.
 * @returns {number} A newly allocated geometry of the concave hull. NULL on exception.
 * @alias module:geos
 */
  geos.GEOSConcaveHullByLength = null

  /**
   * Returns a "concave hull" of a geometry. A concave hull is a polygon which contains all the points of the input, but is a better approximation than the convex hull to the area occupied by the input. Frequently used to convert a multi-point into a polygonal area. that contains all the points in the input Geometry.
   *
   * A set of points has a sequence of hulls of increasing concaveness, determined by a numeric target parameter. The concave hull is constructed by removing the longest outer edges of the Delaunay Triangulation of the space between the polygons, until the specified maximm edge length is reached. A large value produces the convex hull, 0 produces the hull of maximim concaveness.
   * @param {number} handle - A pointer to the GEOS context handle.
   * @param {number} geom - A pointer to a GEOSGeometry object.
   * @param {number} length - The maximum edge length (0 or greater).
   * @param {number} allowHoles - When non-zero, the polygonal output may contain holes.
   * @returns {number} A newly allocated geometry of the concave hull. NULL on exception.
   * @alias module:geos
   */
  geos.GEOSConcaveHullByLength_r = Module.cwrap('GEOSConcaveHullByLength_r', 'number', ['number', 'number', 'number', 'number'])

  /**
* Constructs a concave hull of a set of polygons, respecting the polygons as constraints.

* A concave hull is a (possibly) non-convex polygon containing all the input polygons. The computed hull "fills the gap" between the polygons, and does not intersect their interior. A set of polygons has a sequence of hulls of increasing concaveness, determined by a numeric target parameter.

* The concave hull is constructed by removing the longest outer edges of the Delaunay Triangulation of the space between the polygons, until the target criterion parameter is reached. The "Maximum Edge Length" parameter limits the length of the longest edge between polygons to be no larger than this value. This can be expressed as a ratio between the lengths of the longest and shortest edges.

* The input polygons must be a valid MultiPolygon (i.e. they must be non-overlapping).
* @param {number} geom - A pointer to a GEOSGeometry object.
* @param {number} lengthRatio - specifies the Maximum Edge Length as a fraction of the difference between the longest and shortest edge lengths between the polygons. This normalizes the Maximum Edge Length to be scale-free. A value of 1 produces the convex hull; a value of 0 produces the original polygons.
* @param {number} isTight - does the hull follow the outer boundaries of the input polygons.
* @param {number} isHolesAllowed - is the concave hull allowed to contain holes?
* @returns {number} A newly allocated geometry of the concave hull. NULL on exception.
* @alias module:geos
*/
  geos.GEOSConcaveHullOfPolygons = null

  /**
* Constructs a concave hull of a set of polygons, respecting the polygons as constraints.

* A concave hull is a (possibly) non-convex polygon containing all the input polygons. The computed hull "fills the gap" between the polygons, and does not intersect their interior. A set of polygons has a sequence of hulls of increasing concaveness, determined by a numeric target parameter.

* The concave hull is constructed by removing the longest outer edges of the Delaunay Triangulation of the space between the polygons, until the target criterion parameter is reached. The "Maximum Edge Length" parameter limits the length of the longest edge between polygons to be no larger than this value. This can be expressed as a ratio between the lengths of the longest and shortest edges.

* The input polygons must be a valid MultiPolygon (i.e. they must be non-overlapping).
* @param {number} handle - A pointer to the GEOS context handle.
* @param {number} geom - A pointer to a GEOSGeometry object.
* @param {number} lengthRatio - specifies the Maximum Edge Length as a fraction of the difference between the longest and shortest edge lengths between the polygons. This normalizes the Maximum Edge Length to be scale-free. A value of 1 produces the convex hull; a value of 0 produces the original polygons.
* @param {number} isTight - does the hull follow the outer boundaries of the input polygons.
* @param {number} isHolesAllowed - is the concave hull allowed to contain holes?
* @returns {number} A newly allocated geometry of the concave hull. NULL on exception.
* @alias module:geos
*/
  geos.GEOSConcaveHullOfPolygons_r = Module.cwrap('GEOSConcaveHullOfPolygons_r', 'number', ['number', 'number', 'number', 'number', 'number'])

  /**
 * Computes the minimum rotated rectangle (MRR) of a geometry. The MRR is similar to an envelope, but not necessarily aligned with coordinate axes. It has minimum area among all rectangles enclosing its input geometry.
 * @param {number} geom - A pointer to a GEOSGeometry object.
 * @returns {number} A pointer to a new GEOSGeometry object representing the MRR, or NULL on exception.
 * @alias module:geos
  */
  geos.GEOSMinimumRotatedRectangle = null

  /**
 * Computes the minimum-area rotated rectangle containing a geometry.
 * @param {number} handle - A pointer to the GEOS context handle.
 * @param {number} g - The pointer to the input geometry.
 * @returns {number} The pointer to the output geometry, or NULL on exception.
 * @alias module:geos
  */
  geos.GEOSMinimumRotatedRectangle_r = Module.cwrap('GEOSMinimumRotatedRectangle_r', 'number', ['number', 'number'])

  /**
 * Constructs the "maximum inscribed circle" (MIC) for a polygonal geometry, up to a specified tolerance. The MIC is determined by a point in the interior of the area which has the farthest distance from the area boundary, along with a boundary point at that distance. In the context of geography the center of the MIC is known as the "pole of inaccessibility". A cartographic use case is to determine a suitable point to place a map label within a polygon. The radius length of the MIC is a measure of how "narrow" a polygon is. It is the distance at which the negative buffer becomes empty. The class supports polygons with holes and multipolygons. The implementation uses a successive-approximation technique over a grid of square cells covering the area geometry. The grid is refined using a branch-and-bound algorithm. Point containment and distance are computed in a performant way by using spatial indexes. Returns a two-point linestring, with one point at the center of the inscribed circle and the other on the boundary of the inscribed circle.
 * @param {number} g - The pointer to the input geometry.
 * @param {number} tolerance - The distance tolerance for computing the center point.
 * @returns {number} The pointer to the output geometry, or NULL on exception.
 * @alias module:geos
  */
  geos.GEOSMaximumInscribedCircle = null

  /**
 * Constructs the "maximum inscribed circle" (MIC) for a polygonal geometry, up to a specified tolerance. The MIC is determined by a point in the interior of the area which has the farthest distance from the area boundary, along with a boundary point at that distance. In the context of geography the center of the MIC is known as the "pole of inaccessibility". A cartographic use case is to determine a suitable point to place a map label within a polygon. The radius length of the MIC is a measure of how "narrow" a polygon is. It is the distance at which the negative buffer becomes empty. The class supports polygons with holes and multipolygons. The implementation uses a successive-approximation technique over a grid of square cells covering the area geometry. The grid is refined using a branch-and-bound algorithm. Point containment and distance are computed in a performant way by using spatial indexes. Returns a two-point linestring, with one point at the center of the inscribed circle and the other on the boundary of the inscribed circle.
 * @param {number} handle - A pointer to the GEOS context handle.
 * @param {number} g - The pointer to the input geometry.
 * @param {number} tolerance - The distance tolerance for computing the center point.
 * @returns {number} The pointer to the output geometry, or NULL on exception.
 * @alias module:geos
  */
  geos.GEOSMaximumInscribedCircle_r = Module.cwrap('GEOSMaximumInscribedCircle_r', 'number', ['number', 'number', 'number'])

  /**
 * Constructs the "largest empty circle" (LEC) for a set of obstacle geometries and within a polygonal boundary, with accuracy to to a specified distance tolerance. The obstacles may be any collection of points, lines and polygons. The LEC is the largest circle whose interior does not intersect with any obstacle. and which has its center inside the given boundary. If no boundary is provided, the convex hull of the obstacles is used. The LEC center is the point in the interior of the boundary which has the farthest distance from the obstacles (up to the given distance tolerance). The LEC is determined by the center point and a point indicating the circle radius (which will lie on an obstacle).
 * To compute an LEC which lies wholly within a polygonal boundary, include the boundary of the polygon(s) as a linear obstacle.
 * The implementation uses a successive-approximation technique over a grid of square cells covering the obstacles and boundary. The grid is refined using a branch-and-bound algorithm. Point containment and distance are computed in a performant way by using spatial indexes.
 * Returns the LEC radius as a two-point linestring, with the start point at the center of the inscribed circle and the end on the boundary of the circle.
 *
 * @param {number} g - The pointer to the input obstacle geometry.
 * @param {number} boundary - The pointer to the input boundary geometry, or NULL if not provided.
 * @param {number} tolerance - The distance tolerance for computing the center point and radius.
 * @returns {number} The pointer to the output geometry, or NULL on exception.
 * @alias module:geos
  */
  geos.GEOSLargestEmptyCircle = null

  /**
 * Constructs the "largest empty circle" (LEC) for a set of obstacle geometries and within a polygonal boundary, with accuracy to to a specified distance tolerance. The obstacles may be any collection of points, lines and polygons. The LEC is the largest circle whose interior does not intersect with any obstacle. and which has its center inside the given boundary. If no boundary is provided, the convex hull of the obstacles is used. The LEC center is the point in the interior of the boundary which has the farthest distance from the obstacles (up to the given distance tolerance). The LEC is determined by the center point and a point indicating the circle radius (which will lie on an obstacle).
 * To compute an LEC which lies wholly within a polygonal boundary, include the boundary of the polygon(s) as a linear obstacle.
 * The implementation uses a successive-approximation technique over a grid of square cells covering the obstacles and boundary. The grid is refined using a branch-and-bound algorithm. Point containment and distance are computed in a performant way by using spatial indexes.
 * Returns the LEC radius as a two-point linestring, with the start point at the center of the inscribed circle and the end on the boundary of the circle.
 *
 * @param {number} handle - A pointer to the GEOS context handle.
 * @param {number} g - The pointer to the input obstacle geometry.
 * @param {number} boundary - The pointer to the input boundary geometry, or NULL if not provided.
 * @param {number} tolerance - The distance tolerance for computing the center point and radius.
 * @returns {number} The pointer to the output geometry, or NULL on exception.
 * @alias module:geos
  */
  geos.GEOSLargestEmptyCircle_r = Module.cwrap('GEOSLargestEmptyCircle_r', 'number', ['number', 'number', 'number', 'number'])

  /**
 * Computes the minimum width of a geometry.
 * The minimum width is the smallest distance between two parallel lines that contain the geometry.
 * @param {number} g - The input geometry pointer.
 * @returns {number} A pointer to a LineString containing two points defining the minimum width line segment, or NULL on exception.
 * @alias module:geos
  */
  geos.GEOSMinimumWidth = null

  /**
 * Computes the minimum width of a geometry in a reentrant way.
 * The minimum width is the smallest distance between two parallel lines that contain the geometry.
 * @param {number} handle - The context handle pointer to use for error reporting.
 * @param {number} g - The input geometry pointer.
 * @returns {number} A pointer to a LineString containing two points defining the minimum width line segment, or NULL on exception.
 * @alias module:geos
  */
  geos.GEOSMinimumWidth_r = Module.cwrap('GEOSMinimumWidth_r', 'number', ['number', 'number'])

  /**
 * Computes the minimum clearance line of a geometry.
 * The minimum clearance line is a line connecting two points in the geometry that have the minimum clearance distance between them.
 * @param {number} g - The input geometry pointer.
 * @returns {number} A pointer to a LineString containing two points defining the minimum clearance line segment, or NULL on exception or if no such line exists (e.g. for an empty or point geometry).
 * @alias module:geos
  */
  geos.GEOSMinimumClearanceLine = null

  /**
 * Computes the minimum clearance line of a geometry in a reentrant way.
 * The minimum clearance line is a line connecting two points in the geometry that have the minimum clearance distance between them.
 * @param {number} handle - The context handle pointer to use for error reporting.
 * @param {number} g - The input geometry pointer.
 * @returns {number} A pointer to a LineString containing two points defining the minimum clearance line segment, or NULL on exception or if no such line exists (e.g. for an empty or point geometry).
 * @alias module:geos
  */
  geos.GEOSMinimumClearanceLine_r = Module.cwrap('GEOSMinimumClearanceLine_r', 'number', ['number', 'number'])

  /**
 * Works from start of each coordinate sequence in the
 * geometry, retaining points that are further away from the
 * previous retained point than the tolerance value.
 *
 * Removing repeated points with a non-zero tolerance may
 * result in an invalid geometry being returned. Be sure
 * to check and repair validity.
 *
 * @returns {number} A geometry with all points within the tolerance of each other removed.
 * @param {number} g The geometry to filter
 * @param {number} tolerance Remove all points within this distance of each other. Use 0.0 to remove only exactly repeated points.
 *
 * @see GEOSMakeValidWithParams*
 */
  geos.GEOSRemoveRepeatedPoints = null

  /**
* Works from start of each coordinate sequence in the
* geometry, retaining points that are further away from the
* previous retained point than the tolerance value.
*
* Removing repeated points with a non-zero tolerance may
* result in an invalid geometry being returned. Be sure
* to check and repair validity.
*
* @returns {number} A geometry with all points within the tolerance of each other removed.
* @param {number} handle The context handle pointer to use for error reporting.
* @param {number} g The geometry to filter
* @param {number} tolerance Remove all points within this distance of each other. Use 0.0 to remove only exactly repeated points.
*
* @see GEOSMakeValidWithParams*
*/
  geos.GEOSRemoveRepeatedPoints_r = Module.cwrap('GEOSRemoveRepeatedPoints_r', 'number', ['number', 'number', 'number'])

  /**
 * Computes the minimum clearance distance of a geometry.
 * The minimum clearance distance is the smallest distance between any pair of points in the geometry.
 * @param {number} g - The input geometry pointer.
 * @param {number} dist - A pointer to store the result distance, or NULL if not needed.
 * @returns {number} 1 on success, 0 on exception or if no such distance exists (e.g. for an empty or point geometry).
 * @alias module:geos
  */
  geos.GEOSMinimumClearance = null

  /**
 * Computes the minimum clearance of a geometry.
 * The minimum clearance is the smallest amount by which
 * a vertex of a geometry can be moved to produce an invalid geometry.
 * @param {number} handle - A pointer to the GEOS context handle.
 * @param {number} g - The GEOS geometry to compute the clearance for.
 * @param {number} d - The output parameter for the clearance value.
 * @return {number} 1 on success, 0 on exception.
 * @see https://github.com/libgeos/geos/blob/main/capi/geos_c.h.in
 * @alias module:geos
  */
  geos.GEOSMinimumClearance_r = Module.cwrap('GEOSMinimumClearance_r', 'number', ['number', 'number', 'number'])

  /**
 * Computes the difference between two geometries.
 * The difference is the part of the first geometry that does not intersect with the second geometry.
 * @param {number} handle - A pointer to the GEOS context handle.
 * @param {number} g1 - The first GEOS geometry.
 * @param {number} g2 - The second GEOS geometry.
 * @return {number} A new GEOS geometry representing the difference, or NULL on exception.
 * @see https://libgeos.org/doxygen/geos__c_8h.html
 * @alias module:geos
  */
  geos.GEOSDifference = null

  /**
 * Computes the difference between two geometries using a reentrant API.
 * The difference is the part of the first geometry that does not intersect with the second geometry.
 * @param {number} handle - A pointer to the GEOS context handle.
 * @param {number} g1 - The first GEOS geometry.
 * @param {number} g2 - The second GEOS geometry.
 * @return {number} A new GEOS geometry representing the difference, or NULL on exception.
 * @see https://libgeos.org/doxygen/geos__c_8h.html
 * @alias module:geos
  */
  geos.GEOSDifference_r = Module.cwrap('GEOSDifference_r', 'number', ['number', 'number', 'number'])

  /**
 * Computes the difference between two geometries using a precision model grid size.
 * The difference is the part of the first geometry that does not intersect with the second geometry.
 * @param {number} handle - A pointer to the GEOS context handle.
 * @param {number} g1 - The first GEOS geometry.
 * @param {number} g2 - The second GEOS geometry.
 * @param {number} grid_size - The grid size for snapping vertices to a precision model grid.
 * @return {number} A new GEOS geometry representing the difference, or NULL on exception.
 * @alias module:geos
  */
  geos.GEOSDifferencePrec = null

  /**
 * Computes the difference between two geometries using a precision model grid size and a reentrant API.
 * The difference is the part of the first geometry that does not intersect with the second geometry.
 * @param {number} handle - A pointer to the GEOS context handle.
 * @param {number} g1 - The first GEOS geometry.
 * @param {number} g2 - The second GEOS geometry.
 * @param {number} grid_size - The grid size for snapping vertices to a precision model grid.
 * @return {number} A new GEOS geometry representing the difference, or NULL on exception.
 * @alias module:geos
  */
  geos.GEOSDifferencePrec_r = Module.cwrap('GEOSDifferencePrec_r', 'number', ['number', 'number', 'number', 'number'])

  /**
 * Computes the boundary of a geometry.
 * @param {number} g - A pointer to a GEOSGeometry object.
 * @returns {number} A pointer to a new GEOSGeometry object representing the boundary, or NULL on exception.
 * @alias module:geos
 * @see https://libgeos.org/doxygen/geos__c_8h.html
 * @example
 * const reader = geos.GEOSWKTReader_create()
 * const writer = geos.GEOSWKTWriter_create()
 * const geom = geos.GEOSWKTReader_read(reader, 'POLYGON((0 0, 0 1, 1 1, 1 0, 0 0))')
 * const boundary = geos.GEOSBoundary(geom)
 * const wkt = geos.GEOSWKTWriter_write(writer, boundary)
 * console.log(wkt) // 'LINESTRING (0 0, 0 1, 1 1, 1 0, 0 0)'
  */
  geos.GEOSBoundary = null

  /**
 * Computes the boundary of a geometry in a thread-safe manner.
 * @param {number} handle - A GEOSContextHandle_t object.
 * @param {number} g - A pointer to a GEOSGeometry object.
 * @returns {number} A pointer to a new GEOSGeometry object representing the boundary, or NULL on exception.
 * @alias module:geos
  */
  geos.GEOSBoundary_r = Module.cwrap('GEOSBoundary_r', 'number', ['number', 'number'])

  /**
 * Computes the symmetric difference of two geometries.
 * @param {number} g1 - A pointer to a GEOSGeometry object.
 * @param {number} g2 - A pointer to another GEOSGeometry object.
 * @returns {number} A pointer to a new GEOSGeometry object representing the symmetric difference, or NULL on exception.
 * @alias module:geos
  */
  geos.GEOSSymDifference = null

  /**
 * Computes the symmetric difference of two geometries in a thread-safe manner.
 * @param {number} handle - A GEOSContextHandle_t object.
 * @param {number} g1 - A pointer to a GEOSGeometry object.
 * @param {number} g2 - A pointer to another GEOSGeometry object.
 * @returns {number} A pointer to a new GEOSGeometry object representing the symmetric difference, or NULL on exception.
 * @alias module:geos
  */
  geos.GEOSSymDifference_r = Module.cwrap('GEOSSymDifference_r', 'number', ['number', 'number', 'number'])

  /**
 * Computes the symmetric difference of two geometries with precision control.
 * @param {number} g1 - A pointer to a GEOSGeometry object.
 * @param {number} g2 - A pointer to another GEOSGeometry object.
 * @param {number} gridSize - The size of the grid used for snapping coordinates. Must be positive and non-zero.
 * @returns {number} A pointer to a new GEOSGeometry object representing the symmetric difference, or NULL on exception or invalid input.
 * @alias module:geos
  */
  geos.GEOSSymDifferencePrec = null

  /**
 * Computes a symmetric difference of two geometries using a specified precision model.
 * @param {number} handle - A pointer to the GEOS context handle.
 * @param {number} g1 - A pointer to the first geometry.
 * @param {number} g2 - A pointer to the second geometry.
 * @param {number} gridsize - The precision grid size to use.
 * @returns {number} A pointer to the resulting geometry, or NULL on exception.
 * @alias module:geos
  */
  geos.GEOSSymDifferencePrec_r = Module.cwrap('GEOSSymDifferencePrec_r', 'number', ['number', 'number', 'number', 'number'])

  /**
 * Computes a union of two geometries.
 * @param {number} g1 - A pointer to the first geometry.
 * @param {number} g2 - A pointer to the second geometry.
 * @returns {number} A pointer to the resulting geometry, or NULL on exception.
 * @alias module:geos
  */
  geos.GEOSUnion = null

  /**
 * Computes a union of two geometries using a specified context handle.
 * @param {number} handle - A pointer to the GEOS context handle.
 * @param {number} g1 - A pointer to the first geometry.
 * @param {number} g2 - A pointer to the second geometry.
 * @returns {number} A pointer to the resulting geometry, or NULL on exception.
 * @alias module:geos
  */
  geos.GEOSUnion_r = Module.cwrap('GEOSUnion_r', 'number', ['number', 'number', 'number'])

  /**
 * Computes a union of two geometries using a specified precision model.
 * @param {number} g1 - A pointer to the first geometry.
 * @param {number} g2 - A pointer to the second geometry.
 * @param {number} gridsize - The precision grid size to use.
 * @returns {number} A pointer to the resulting geometry, or NULL on exception.
 * @alias module:geos
  */
  geos.GEOSUnionPrec = null

  /**
 * Computes a union of two geometries using a specified precision model and context handle.
 * @param {number} handle - A pointer to the GEOS context handle.
 * @param {number} g1 - A pointer to the first geometry.
 * @param {number} g2 - A pointer to the second geometry.
 * @param {number} gridsize - The precision grid size to use.
 * @returns {number} A pointer to the resulting geometry, or NULL on exception.
 * @alias module:geos
  */
  geos.GEOSUnionPrec_r = Module.cwrap('GEOSUnionPrec_r', 'number', ['number', 'number', 'number', 'number'])

  /**
 * Computes the union of all the input geometries.
 * @param {number} geom - A pointer to a GEOS geometry.
 * @returns {number} A pointer to a new GEOS geometry representing the union, or NULL on exception.
 * @see https://postgis.net/docs/ST_UnaryUnion.html
 * @alias module:geos
  */
  geos.GEOSUnaryUnion = null

  /**
 * Computes the union of all the input geometries using a GEOS context handle.
 * @param {number} handle - A pointer to a GEOS context handle.
 * @param {number} geom - A pointer to a GEOS geometry.
 * @returns {number} A pointer to a new GEOS geometry representing the union, or NULL on exception.
 * @see https://docs.rs/geos-sys/2.0.3/geos_sys/fn.GEOSUnaryUnion_r.html
 * @alias module:geos
  */
  geos.GEOSUnaryUnion_r = Module.cwrap('GEOSUnaryUnion_r', 'number', ['number', 'number'])

  /**
 * Computes the union of all the input geometries with a specified precision grid size.
 * @param {number} geom - A pointer to a GEOS geometry.
 * @param {number} gridSize - The size of the precision grid to use for snapping.
 * @returns {number} A pointer to a new GEOS geometry representing the union, or NULL on exception.
 * @see https://postgis.net/docs/ST_UnaryUnion.html
 * @alias module:geos
  */
  geos.GEOSUnaryUnionPrec = null

  /**
 * Computes the union of all the input geometries with a specified precision grid size using a GEOS context handle.
 * @param {number} handle - A pointer to a GEOS context handle.
 * @param {number} geom - A pointer to a GEOS geometry.
 * @param {number} gridSize - The size of the precision grid to use for snapping.
 * @returns {number} A pointer to a new GEOS geometry representing the union, or NULL on exception.
 * @see https://docs.rs/geos-sys/2.0.3/geos_sys/fn.GEOSUnaryUnionPrec_r.html
 * @alias module:geos
  */
  geos.GEOSUnaryUnionPrec_r = Module.cwrap('GEOSUnaryUnionPrec_r', 'number', ['number', 'number', 'number'])

  /**
* Optimized union algorithm for inputs that can be divided into subsets
* that do not intersect. If there is only one such subset, performance
* can be expected to be worse than GEOSUnionaryUnion.
* @param {number} handle - A pointer to a GEOS context handle.
* @param {number} g The input geometry
* @return {number} A newly allocated geometry of the union, or NULL on exception.
* Caller is responsible for freeing with GEOSGeom_destroy().
*/
  geos.GEOSDisjointSubsetUnion_r = Module.cwrap('GEOSDisjointSubsetUnion_r', 'number', ['number', 'number'])

  /**
* Optimized union algorithm for inputs that can be divided into subsets
* that do not intersect. If there is only one such subset, performance
* can be expected to be worse than GEOSUnionaryUnion.
* @param {number} g The input geometry
* @return {number} A newly allocated geometry of the union, or NULL on exception.
* Caller is responsible for freeing with GEOSGeom_destroy().
*/
  geos.GEOSDisjointSubsetUnion = null

  /**
 * Computes the union of all the input geometries using an optimized algorithm for coverages (collections of polygons that do not overlap).
 * @param {number} geom - A pointer to a GEOS geometry.
 * @returns {number} A pointer to a new GEOS geometry representing the union, or NULL on exception.
 * @see https://libgeos.org/doxygen/classgeos_1_1operation_1_1geounion_1_1CoverageUnionOp.html
 * @alias module:geos
  */
  geos.GEOSCoverageUnion = null

  /**
 * Computes the union of a collection of polygonal geometries that are correctly noded and do not overlap.
 * @param {number} handle - A pointer to the GEOS context handle.
 * @param {number} g - The pointer to a GEOS geometry collection.
 * @returns {number} The pointer to a GEOS geometry representing the union, or NULL on error.
 * @see https://libgeos.org/doxygen/classgeos_1_1operation_1_1geounion_1_1CascadedPolygonUnion.html
 * @alias module:geos
  */
  geos.GEOSCoverageUnion_r = Module.cwrap('GEOSCoverageUnion_r', 'number', ['number', 'number'])

  /**
* Analyze a coverage (represented as a collection of polygonal geometry
* with exactly matching edge geometry) to find places where the
* assumption of exactly matching edges is not met.
*
* @param {number} handle - A pointer to the GEOS context handle.
* @param {number} input The polygonal coverage to access,
*        stored in a geometry collection. All members must be POLYGON
*        or MULTIPOLYGON.
* @param {number} gapWidth The maximum width of gaps to detect.
* @param {number} invalidEdges When there are invalidities in the coverage,
*        this pointer
*        will be set with a geometry collection of the same length as
*        the input, with a MULTILINESTRING of the error edges for each
*        invalid polygon, or an EMPTY where the polygon is a valid
*        participant in the coverage. Pass NULL if you do not want
*        the invalid edges returned.
* @return {number} A value of 1 for a valid coverage, 0 for invalid and 2 for
*         an exception or error. Invalidity includes polygons that overlap,
*         that have gaps smaller than the gapWidth, or non-polygonal
*         entries in the input collection.
*/
  geos.GEOSCoverageIsValid_r = Module.cwrap('GEOSCoverageIsValid_r', 'number', ['number', 'number', 'number', 'number'])

  /**
* Analyze a coverage (represented as a collection of polygonal geometry
* with exactly matching edge geometry) to find places where the
* assumption of exactly matching edges is not met.
*
* @param {number} input The polygonal coverage to access,
*        stored in a geometry collection. All members must be POLYGON
*        or MULTIPOLYGON.
* @param {number} gapWidth The maximum width of gaps to detect.
* @param {number} invalidEdges When there are invalidities in the coverage,
*        this pointer
*        will be set with a geometry collection of the same length as
*        the input, with a MULTILINESTRING of the error edges for each
*        invalid polygon, or an EMPTY where the polygon is a valid
*        participant in the coverage. Pass NULL if you do not want
*        the invalid edges returned.
* @return {number} A value of 1 for a valid coverage, 0 for invalid and 2 for
*         an exception or error. Invalidity includes polygons that overlap,
*         that have gaps smaller than the gapWidth, or non-polygonal
*         entries in the input collection.
*/
  geos.GEOSCoverageIsValid = null

  /**
* Operates on a coverage (represented as a list of polygonal geometry
* with exactly matching edge geometry) to apply a Visvalingam–Whyatt
* simplification to the edges, reducing complexity in proportion with
* the provided tolerance, while retaining a valid coverage (no edges
* will cross or touch after the simplification).
* Geometries never disappear, but they may be simplified down to just
* a triangle. Also, some invalid geoms (such as Polygons which have too
* few non-repeated points) will be returned unchanged.
* If the input dataset is not a valid coverage due to overlaps,
* it will still be simplified, but invalid topology such as crossing
* edges will still be invalid.
*
* @param {number} handle - A pointer to the GEOS context handle.
* @param {number} input The polygonal coverage to access,
*        stored in a geometry collection. All members must be POLYGON
*        or MULTIPOLYGON.
* @param {number} tolerance A tolerance parameter in linear units.
* @param {number} preserveBoundary Use 1 to preserve the outside edges
*        of the coverage without simplification,
*        0 to allow them to be simplified.
* @return {number} A collection containing the simplified geometries, or null
*         on error.
*/
  geos.GEOSCoverageSimplifyVW_r = Module.cwrap('GEOSCoverageSimplifyVW_r', 'number', ['number', 'number', 'number', 'number'])

  /**
* Operates on a coverage (represented as a list of polygonal geometry
* with exactly matching edge geometry) to apply a Visvalingam–Whyatt
* simplification to the edges, reducing complexity in proportion with
* the provided tolerance, while retaining a valid coverage (no edges
* will cross or touch after the simplification).
* Geometries never disappear, but they may be simplified down to just
* a triangle. Also, some invalid geoms (such as Polygons which have too
* few non-repeated points) will be returned unchanged.
* If the input dataset is not a valid coverage due to overlaps,
* it will still be simplified, but invalid topology such as crossing
* edges will still be invalid.
*
* @param {number} input The polygonal coverage to access,
*        stored in a geometry collection. All members must be POLYGON
*        or MULTIPOLYGON.
* @param {number} tolerance A tolerance parameter in linear units.
* @param {number} preserveBoundary Use 1 to preserve the outside edges
*        of the coverage without simplification,
*        0 to allow them to be simplified.
* @return {number} A collection containing the simplified geometries, or null
*         on error.
*/
  geos.GEOSCoverageSimplifyVW = null

  /**
 * Computes a geometric shape that represents the points shared by two or more geometries.
 * @param {number} g - The pointer to a GEOS geometry.
 * @returns {number} The pointer to a GEOS geometry representing the noded version of the input, or NULL on error.
 * @see https://libgeos.org/doxygen/geos__c_8h.html
 * @alias module:geos
  */
  geos.GEOSNode = null

  /**
 * Computes a geometric shape that represents the points shared by two or more geometries.
 * @param {number} handle - A pointer to the GEOS context handle.
 * @param {number} g - The pointer to a GEOS geometry.
 * @returns {number} The pointer to a GEOS geometry representing the noded version of the input, or NULL on error.
 * @see https://libgeos.org/doxygen/geos__c_8h.html
 * @alias module:geos
  */
  geos.GEOSNode_r = Module.cwrap('GEOSNode_r', 'number', ['number', 'number'])

  /**
 * Computes the union of a collection of polygonal geometries using an optimized algorithm.
 * @param {number} g - The pointer to a GEOS geometry collection.
 * @returns {number} The pointer to a GEOS geometry representing the union, or NULL on error.
 * @see https://libgeos.org/doxygen/classgeos_1_1operation_1_1geounion_1_1CascadedPolygonUnion.html
 * @alias module:geos
  */
  geos.GEOSUnionCascaded = null

  /**
 * Computes the union of a collection of polygonal geometries using an optimized algorithm.
 * @param {number} handle - A pointer to the GEOS context handle.
 * @param {number} g - The pointer to a GEOS geometry collection.
 * @returns {number} The pointer to a GEOS geometry representing the union, or NULL on error.
 * @see https://libgeos.org/doxygen/classgeos_1_1operation_1_1geounion_1_1CascadedPolygonUnion.html
 * @alias module:geos
  */
  geos.GEOSUnionCascaded_r = Module.cwrap('GEOSUnionCascaded_r', 'number', ['number', 'number'])

  /**
 * Computes a point that lies on the surface of a geometry.
 * @param {number} g - A pointer to a GEOSGeometry object.
 * @returns {number} A pointer to a GEOSGeometry object representing a point on the surface of g, or null if an error occurs.
 * @alias module:geos
  */
  geos.GEOSPointOnSurface = null

  /**
 * Computes a point that lies on the surface of a geometry, using a thread-safe context handle.
 * @param {number} handle - A pointer to a GEOSContextHandle_t object.
 * @param {number} g - A pointer to a GEOSGeometry object.
 * @returns {number} A pointer to a GEOSGeometry object representing a point on the surface of g, or null if an error occurs.
 * @alias module:geos
  */
  geos.GEOSPointOnSurface_r = Module.cwrap('GEOSPointOnSurface_r', 'number', ['number', 'number'])

  /**
 * Clips a geometry by a rectangular extent.
 * @param {number} g - A pointer to a GEOSGeometry object.
 * @param {number} xmin - The minimum x-coordinate of the clipping rectangle.
 * @param {number} ymin - The minimum y-coordinate of the clipping rectangle.
 * @param {number} xmax - The maximum x-coordinate of the clipping rectangle.
 * @param {number} ymax - The maximum y-coordinate of the clipping rectangle.
 * @returns {number} The clipped geometry or NULL on exception Caller is responsible for freeing with GEOSGeom_destroy().
 * @alias module:geos
  */
  geos.GEOSClipByRect = null

  /**
 * Clips a geometry by a rectangular extent, using a thread-safe context handle.
 * @param {number} handle - A pointer to a GEOSContextHandle_t object.
 * @param {number} g - A pointer to a GEOSGeometry object.
 * @param {number} xmin - The minimum x-coordinate of the clipping rectangle.
 * @param {number} ymin - The minimum y-coordinate of the clipping rectangle.
 * @param {number} xmax - The maximum x-coordinate of the clipping rectangle.
 * @param {number} ymax - The maximum y-coordinate of the clipping rectangle.
 * @returns {number} The clipped geometry or NULL on exception Caller is responsible for freeing with GEOSGeom_destroy().
 * @alias module:geos
  */
  geos.GEOSClipByRect_r = Module.cwrap('GEOSClipByRect_r', 'number', ['number', 'number', 'number', 'number', 'number'])

  /**
 * Destroys a geometry object and frees its memory.
 * @param {number} g - A pointer to a GEOSGeometry object.
 * @alias module:geos
  */
  geos.GEOSGeom_destroy = null

  /**
 * Destroys a GEOS geometry object.
 * @param {number} handle - A pointer to the GEOS context handle.
 * @param {number} g - The GEOS geometry object to destroy.
 * @see https://libgeos.org/doxygen/geos__c_8h.html#a6a7f0c9b3f9a1d0f4e5c2a7b5b3e6a8d
 * @alias module:geos
  */
  geos.GEOSGeom_destroy_r = Module.cwrap('GEOSGeom_destroy_r', null, ['number', 'number'])

  /**
 * Returns the number of coordinates in a GEOS geometry object.
 * @param {number} g - The GEOS geometry object.
 * @returns {number} The number of coordinates, or -1 on exception.
 * @see https://libgeos.org/doxygen/geos__c_8h.html#a7b4e0c2f9d3f1a6d4b9a9c1d5e0f3a2e
 * @alias module:geos
  */
  geos.GEOSGetNumCoordinates = null

  /**
 * Returns the number of coordinates in a GEOS geometry object (thread-safe version).
 * @param {number} handle - A pointer to the GEOS context handle.
 * @param {number} g - The GEOS geometry object.
 * @returns {number} The number of coordinates, or -1 on exception.
 * @see https://libgeos.org/doxygen/geos__c_8h.html#a7b4e0c2f9d3f1a6d4b9a9c1d5e0f3a2e
 * @alias module:geos
  */
  geos.GEOSGetNumCoordinates_r = Module.cwrap('GEOSGetNumCoordinates_r', 'number', ['number', 'number'])

  /**
 * Normalizes a GEOS geometry object in place, so that it has a canonical form.
 * A normalized geometry has points in a LineString deduplicated, members of a collection sorted by type,
 * points in a polygon's rings or a single LinearRing start at the top-left-most point and go clockwise, etc.
 * This can be useful for unit testing or geometry deduplication.
 * @param {number} g - The GEOS geometry object to normalize.
 * @returns {number} 0 on success, or -1 on exception.
 * @see https://libgeos.org/doxygen/geos__c_8h.html#a5a7f0c9b3f9a1d0f4e5c2a7b5b3e6a8d
 * @alias module:geos
  */
  geos.GEOSNormalize = null

  /**
 * Normalizes a GEOS geometry object in place, so that it has a canonical form (thread-safe version).
 * A normalized geometry has points in a LineString deduplicated, members of a collection sorted by type,
 * points in a polygon's rings or a single LinearRing start at the top-left-most point and go clockwise, etc.
 * This can be useful for unit testing or geometry deduplication.
 * @param {number} handle - A pointer to the GEOS context handle.
 * @param {number} g - The GEOS geometry object to normalize.
 * @returns {number} 0 on success, or -1 on exception.
 * @see https://libgeos.org/doxygen/geos__c_8h.html#a5a7f0c9b3f9a1d0f4e5c2a7b5b3e6a8d
 * @alias module:geos
  */
  geos.GEOSNormalize_r = Module.cwrap('GEOSNormalize_r', 'number', ['number', 'number'])

  /**
 * Returns the number of interior rings in the polygon.
 * @param {number} g - A pointer to a GEOSGeometry object of type Polygon.
 * @returns {number} The number of interior rings in the polygon, or -1 on exception.
 * @alias module:geos
  */
  geos.GEOSGetNumInteriorRings = null

  /**
 * Returns the number of interior rings in the polygon (thread-safe version).
 * @param {number} handle - A GEOS context handle created with initGEOS_r().
 * @param {number} g - A pointer to a GEOSGeometry object of type Polygon.
 * @returns {number} The number of interior rings in the polygon, or -1 on exception.
 * @alias module:geos
  */
  geos.GEOSGetNumInteriorRings_r = Module.cwrap('GEOSGetNumInteriorRings_r', 'number', ['number', 'number'])

  /**
 * Returns the number of geometries in a collection.
 * @param {number} g - A pointer to a GEOSGeometry object of type GeometryCollection or its subclasses (MultiPoint, MultiLineString, MultiPolygon).
 * @returns {number} The number of geometries in the collection, or -1 on exception.
 * @alias module:geos
  */
  geos.GEOSGetNumGeometries = null

  /**
 * Returns the number of geometries in a collection (thread-safe version).
 * @param {number} handle - A GEOS context handle created with initGEOS_r().
 * @param {number} g - A pointer to a GEOSGeometry object of type GeometryCollection or its subclasses (MultiPoint, MultiLineString, MultiPolygon).
 * @returns {number} The number of geometries in the collection, or -1 on exception.
 * @alias module:geos
  */
  geos.GEOSGetNumGeometries_r = Module.cwrap('GEOSGetNumGeometries_r', 'number', ['number', 'number'])

  /**
 * Returns a geometry from a collection by index.
 * @param {number} g - A pointer to a GEOSGeometry object of type GeometryCollection or its subclasses (MultiPoint, MultiLineString, MultiPolygon).
 * @param {number} n - The index of the geometry to return, starting from 0.
 * @returns {number} A pointer to a newly allocated GEOSGeometry object corresponding to the geometry at index n. The caller is responsible for destroying it. Returns NULL on exception.
 * @alias module:geos
  */
  geos.GEOSGetGeometryN = null

  /**
 * Return the Nth geometry of a collection.
 * @param {number} handle - A pointer to the GEOS context handle.
 * @param {number} g - The input geometry, must be a collection.
 * @param {number} n - The index of the geometry to return, starting from 0.
 * @return {number} A geometry object. Caller must free with GEOSGeom_destroy().
 * NULL on exception or if n is out of range.
 * @alias module:geos
  */
  geos.GEOSGetGeometryN_r = Module.cwrap('GEOSGetGeometryN_r', 'number', ['number', 'number', 'number'])

  /**
 * Return the Nth point of a LineString.
 * @param {number} g - The input geometry, must be a LineString.
 * @param {number} n - The index of the point to return, starting from 0.
 * @return {number} A Point geometry. Caller must free with GEOSGeom_destroy().
 * NULL on exception or if n is out of range.
 * @alias module:geos
  */
  geos.GEOSGeomGetPointN = null

  /**
 * Return the Nth point of a LineString (thread-safe version).
 * @param {number} handle - A pointer to the GEOS context handle.
 * @param {number} g - The input geometry, must be a LineString.
 * @param {number} n - The index of the point to return, starting from 0.
 * @return {number} A Point geometry. Caller must free with GEOSGeom_destroy().
 * NULL on exception or if n is out of range.
 * @alias module:geos
  */
  geos.GEOSGeomGetPointN_r = Module.cwrap('GEOSGeomGetPointN_r', 'number', ['number', 'number', 'number'])

  /**
 * Return the first point of a LineString.
 * @param {number} g - The input geometry, must be a LineString.
 * @return {number} A Point geometry. Caller must free with GEOSGeom_destroy().
 * NULL on exception.
 * @alias module:geos
  */
  geos.GEOSGeomGetStartPoint = null

  /**
 * Returns the first point of a geometry.
 * @param {number} handle - A pointer to the GEOS context handle.
 * @param {number} g - The GEOS geometry pointer.
 * @returns {number} The GEOS geometry pointer of the start point, or null if the input is not a lineal geometry.
 * @see {@link https://libgeos.org/doxygen/geos__c_8h.html#a9b7a6c0f5f8a2f2d0e3a4b9e1c3f8d6c|GEOSGeomGetStartPoint_r}
 * @alias module:geos
  */
  geos.GEOSGeomGetStartPoint_r = Module.cwrap('GEOSGeomGetStartPoint_r', 'number', ['number', 'number'])

  /**
 * Returns the endpoint of a LineString geometry.
 * @param {number} geom - A pointer to a GEOSGeometry object.
 * @returns {number} A pointer to a newly allocated GEOSGeometry object representing the endpoint, or NULL on exception.
 * @see https://libgeos.org/doxygen/geos__c_8h.html#a9c6f7f5d3b9a0f1a0d4c1a4e2a0b6e8b
 * @alias module:geos
  */
  geos.GEOSGeomGetEndPoint = null

  /**
 * Returns the endpoint of a LineString geometry.
 * @param {number} handle - A GEOS context handle.
 * @param {number} geom - A pointer to a GEOSGeometry object.
 * @returns {number} A pointer to a newly allocated GEOSGeometry object representing the endpoint, or NULL on exception.
 * @see https://libgeos.org/doxygen/geos__c_8h.html#a9c6f7f5d3b9a0f1a0d4c1a4e2a0b6e8b
 * @alias module:geos
  */
  geos.GEOSGeomGetEndPoint_r = Module.cwrap('GEOSGeomGetEndPoint_r', 'number', ['number', 'number'])

  /**
 * Tests whether the input geometry is closed. A closed geometry is a linestring or multilinestring with the start and end points being the same.
 * Returns 1 if the geometry is closed, 0 otherwise.
 * @param {number} geom - A pointer to a GEOSGeometry object.
 * @returns {number} 1 or 0, or -1 on exception.
 * @see https://libgeos.org/doxygen/geos__c_8h.html#a5d3f7f2e7d5e7b2c3d9a3c9f2e8a6b4b
 * @alias module:geos
  */
  geos.GEOSisClosed = null

  /**
 * Tests whether the input geometry is closed. A closed geometry is a linestring or multilinestring with the start and end points being the same.
 * Returns 1 if the geometry is closed, 0 otherwise.
 * @param {number} handle - A GEOS context handle.
 * @param {number} geom - A pointer to a GEOSGeometry object.
 * @returns {number} 1 or 0, or -1 on exception.
 * @see https://libgeos.org/doxygen/geos__c_8h.html#a5d3f7f2e7d5e7b2c3d9a3c9f2e8a6b4b
 * @alias module:geos
  */
  geos.GEOSisClosed_r = Module.cwrap('GEOSisClosed_r', 'number', ['number', 'number'])

  /**
 * Computes the length of a geometry.
 * @param {number} geom - A pointer to a GEOSGeometry object.
 * @param {number} length - A pointer to a double value that will store the result.
 * @returns {number} 1 on success, 0 on exception.
 * @see https://libgeos.org/doxygen/geos__c_8h.html#a4e9f6a5bbec6edea7adba6ffac72fe48
 * @alias module:geos
  */
  geos.GEOSGeomGetLength = null

  /**
 * Computes the length of a geometry.
 * @param {number} handle - A pointer to the GEOS context handle.
 * @param {number} g - The GEOS geometry pointer.
 * @param {number} length - The output parameter for the length value.
 * @returns {number} 1 on success, 0 on exception.
 * @alias module:geos
  */
  geos.GEOSGeomGetLength_r = Module.cwrap('GEOSGeomGetLength_r', 'number', ['number', 'number', 'number'])

  /**
 * Returns the number of points in a geometry.
 * @param {number} g - The GEOS geometry pointer.
 * @returns {number} The number of points, or -1 on exception.
 * @alias module:geos
  */
  geos.GEOSGeomGetNumPoints = null

  /**
 * Returns the number of points in a geometry.
 * @param {number} handle - A pointer to the GEOS context handle.
 * @param {number} g - The GEOS geometry pointer.
 * @returns {number} The number of points, or -1 on exception.
 * @alias module:geos
  */
  geos.GEOSGeomGetNumPoints_r = Module.cwrap('GEOSGeomGetNumPoints_r', 'number', ['number', 'number'])

  /**
 * Returns the X coordinate of a point geometry.
 * @param {number} g - The GEOS geometry pointer. Must be a point geometry.
 * @param {number} x - The output parameter for the X coordinate value.
 * @returns {number} 1 on success, 0 on exception.
 * @alias module:geos
  */
  geos.GEOSGeomGetX = null

  /**
 * Returns the X coordinate of a point geometry.
 * @param {number} handle - A pointer to the GEOS context handle.
 * @param {number} g - The GEOS geometry pointer. Must be a point geometry.
 * @param {number} x - The output parameter for the X coordinate value.
 * @returns {number} 1 on success, 0 on exception.
 * @alias module:geos
  */
  geos.GEOSGeomGetX_r = Module.cwrap('GEOSGeomGetX_r', 'number', ['number', 'number', 'number'])

  /**
 * Returns the Y coordinate of a point geometry.
 * @param {number} g - A pointer to a GEOSGeometry object of type Point.
 * @param {number} value - A pointer to a double where the result will be stored.
 * @returns {number} 1 on success, 0 on exception.
 * @alias module:geos
  */
  geos.GEOSGeomGetY = null

  /**
 * Returns the Y coordinate of a point geometry in a thread-safe manner.
 * @param {number} handle - A GEOS context handle created by GEOS_init_r().
 * @param {number} g - A pointer to a GEOSGeometry object of type Point.
 * @param {number} value - A pointer to a double where the result will be stored.
 * @returns {number} 1 on success, 0 on exception.
 * @alias module:geos
  */
  geos.GEOSGeomGetY_r = Module.cwrap('GEOSGeomGetY_r', 'number', ['number', 'number', 'number'])

  /**
 * Returns the Z coordinate of a point geometry.
 * @param {number} g - A pointer to a GEOSGeometry object of type Point.
 * @param {number} value - A pointer to a double where the result will be stored.
 * @returns {number} 1 on success, 0 on exception.
 * @alias module:geos
  */
  geos.GEOSGeomGetZ = null

  /**
 * Returns the Z coordinate of a point geometry in a thread-safe manner.
 * @param {number} handle - A GEOS context handle created by GEOS_init_r().
 * @param {number} g - A pointer to a GEOSGeometry object of type Point.
 * @param {number} value - A pointer to a double where the result will be stored.
 * @returns {number} 1 on success, 0 on exception.
 * @alias module:geos
  */
  geos.GEOSGeomGetZ_r = Module.cwrap('GEOSGeomGetZ_r', 'number', ['number', 'number', 'number'])

  /**
* Returns the M coordinate, for a Point input, or an
* exception otherwise.
* @param {number} handle - A GEOS context handle created by GEOS_init_r().
* @param {number} g [in] Input Point geometry
* @param {number} m [out] Pointer to hold return value
* \returns 1 on success, 0 on exception
*/
  geos.GEOSGeomGetM_r = Module.cwrap('GEOSGeomGetM_r', 'number', ['number', 'number', 'number'])

  /**
* Returns the M coordinate, for a Point input, or an
* exception otherwise.
* @param {number} g [in] Input Point geometry
* @param {number} m [out] Pointer to hold return value
* \returns 1 on success, 0 on exception
*/
  geos.GEOSGeomGetM = null

  /**
 * Returns the exterior ring of a polygon geometry as a linear ring.
 * @param {number} g - A pointer to a GEOSGeometry object of type Polygon.
 * @returns {number} A pointer to a newly allocated GEOSGeometry object of type LinearRing, or NULL on exception. The caller is responsible for destroying it with GEOSGeom_destroy().
 * @alias module:geos
  */
  geos.GEOSGetExteriorRing = null

  /**
 * Returns the exterior ring of a polygon geometry.
 * @param {number} handle - A pointer to the GEOS context handle.
 * @param {number} g - The polygon geometry.
 * @returns {number} - The exterior ring geometry, or null if an error occurred.
 * @see https://libgeos.org/doxygen/geos__c_8h_source.html
 * @alias module:geos
  */
  geos.GEOSGetExteriorRing_r = Module.cwrap('GEOSGetExteriorRing_r', 'number', ['number', 'number'])

  /**
 * Returns the Nth interior ring of a polygon geometry.
 * Note: Returned object is a pointer to internal storage: it must NOT be destroyed directly.
 * @param {number} g - The polygon geometry.
 * @param {number} n - The index of the interior ring, starting from 0.
 * @returns {number} - The interior ring geometry, or null if an error occurred or the index is out of range.
 * @see https://libgeos.org/doxygen/geos__c_8h.html
 * @alias module:geos
  */
  geos.GEOSGetInteriorRingN = null

  /**
 * Returns the Nth interior ring of a polygon geometry.
 * @param {number} handle - A pointer to the GEOS context handle.
 * @param {number} g - The polygon geometry.
 * @param {number} n - The index of the interior ring, starting from 0.
 * @returns {number} - The interior ring geometry, or null if an error occurred or the index is out of range.
 * @see https://libgeos.org/doxygen/geos__c_8h_source.html
 * @alias module:geos
  */
  geos.GEOSGetInteriorRingN_r = Module.cwrap('GEOSGetInteriorRingN_r', 'number', ['number', 'number', 'number'])

  /**
 * Computes the centroid point of a geometry.
 * @param {number} g - The geometry to use.
 * @returns {number} - The centroid point geometry, or null if an error occurred or the input is empty.
 * @see https://libgeos.org/doxygen/classgeos_1_1algorithm_1_1Centroid.html
 * @alias module:geos
  */
  geos.GEOSGetCentroid = null

  /**
 * Computes the centroid point of a geometry.
 * @param {number} handle - A pointer to the GEOS context handle.
 * @param {number} g - The geometry to use.
 * @returns {number} - The centroid point geometry, or null if an error occurred or the input is empty.
 * @see https://libgeos.org/doxygen/classgeos_1_1algorithm_1_1Centroid.html
 * @alias module:geos
  */
  geos.GEOSGetCentroid_r = Module.cwrap('GEOSGetCentroid_r', 'number', ['number', 'number'])

  /**
 * Returns a geometry which represents the "minimum bounding circle", the smallest circle that contains the input.
 * @param {number} geom - A pointer to a GEOS geometry object.
 * @param {number} radius - A pointer to a double that will store the radius of the circle.
 * @param {number} center - A pointer to a GEOS geometry object that will store the center point of the circle.
 * @returns {number} A pointer to a GEOS geometry object representing the minimum bounding circle, or NULL on error.
 * @see https://libgeos.org/doxygen/geos__c_8h.html#af09ef325324bec3c1ccb981db52eec4f
 * @alias module:geos
  */
  geos.GEOSMinimumBoundingCircle = null

  /**
 * Returns a geometry which represents the "minimum bounding circle", the smallest circle that contains the input.
 * @param {number} handle - A pointer to a GEOS context handle.
 * @param {number} geom - A pointer to a GEOS geometry object.
 * @param {number} radius - A pointer to a double that will store the radius of the circle.
 * @param {number} center - A pointer to a GEOS geometry object that will store the center point of the circle.
 * @returns {number} A pointer to a GEOS geometry object representing the minimum bounding circle, or NULL on error.
 * @see https://libgeos.org/doxygen/geos__c_8h.html#af09ef325324bec3c1ccb981db52eec4f
 * @alias module:geos
  */
  geos.GEOSMinimumBoundingCircle_r = Module.cwrap('GEOSMinimumBoundingCircle_r', 'number', ['number', 'number', 'number', 'number'])

  /**
 * Creates a geometry collection of a specified type from an array of geometries.
 * @param {number} type - An integer representing the geometry type, such as 1 for POINT, 4 for MULTIPOINT, etc.
 * @param {number} geoms - A pointer to a list of GEOS geometry pointers.
 * @param {number} ngeoms - The number of geometries in the array.
 * @returns {number} A pointer to a GEOS geometry object representing the collection, or NULL on error.
 * @see https://libgeos.org/doxygen/geos__c_8h.html#a871ccb7efc6dd63162b3547fcd76c638
 * @alias module:geos
  */
  geos.GEOSGeom_createCollection = null

  /**
 * Creates a geometry collection of a specified type from an array of geometries using a thread-safe context handle.
 * @param {number} handle - A pointer to a GEOS context handle.
 * @param {number} type - An integer representing the geometry type, such as 1 for POINT, 4 for MULTIPOINT, etc.
 * @param {number} geoms - A pointer to an array of pointers to GEOS geometry objects.
 * @param {number} ngeoms - The number of geometries in the array.
 * @returns {number} A pointer to a GEOS geometry object representing the collection, or NULL on error.
 * @see https://geos.osgeo.org/doxygen/classgeos_1_1geom_1_1GeometryFactory.html#a0c8f6a2a9f5b7a3d7e5c7b0f8b6f9c0e
 * @alias module:geos
  */
  geos.GEOSGeom_createCollection_r = Module.cwrap('GEOSGeom_createCollection_r', 'number', ['number', 'number', 'number', 'number'])

  /**
 * Polygonizes a set of Geometries which contain linework that represents the edges of a planar graph.
 *
 * All types of Geometry are accepted as input; the constituent linework is extracted as the edges to be polygonized.
 *
 * The edges must be correctly noded; that is, they must only meet at their endpoints and not overlap anywhere. If your edges are not already noded, run them through GEOSUnaryUnion() first. Polygonization will accept incorrectly noded input but will not form polygons from non-noded edges, and reports them as errors.
 *
 * The Polygonizer reports the following kinds of errors:
 *
 * - Dangles - edges which have one or both ends which are not incident on another edge endpoint
 * - Cut Edges - edges which are connected at both ends but which do not form part of a polygon
 * - Invalid Ring Lines - edges which form rings which are invalid (e.g. the component lines contain a self-intersection)
 * Errors are reported to output parameters "cuts", "dangles" and "invalid" (if not-null). Formed polygons are returned as a collection. NULL is returned on exception. All returned geometries must be destroyed by caller.
 *
 * The GEOSPolygonize_valid() variant allows extracting only polygons which form a valid polygonal result. The set of extracted polygons is guaranteed to be edge-disjoint. This is useful when it is known that the input lines form a valid polygonal geometry (which may include holes or nested polygons).
 *
 * @param {number} geoms - A pointer to an array of pointers to GEOS geometry objects representing line segments.
 * @param {number} ngeoms - The number of geometries in the array.
 * @returns {number} A pointer to a GEOS geometry object representing the polygonized geometry, or NULL on error.
 * @see https://libgeos.org/doxygen/geos__c_8h.html#a9d98e448d3b846d591c726d1c0000d25
 * @alias module:geos
  */
  geos.GEOSPolygonize = null

  /**
 * Polygonizes a set of Geometries which contain linework that represents the edges of a planar graph.
 *
 * All types of Geometry are accepted as input; the constituent linework is extracted as the edges to be polygonized.
 *
 * The edges must be correctly noded; that is, they must only meet at their endpoints and not overlap anywhere. If your edges are not already noded, run them through GEOSUnaryUnion() first. Polygonization will accept incorrectly noded input but will not form polygons from non-noded edges, and reports them as errors.
 *
 * The Polygonizer reports the following kinds of errors:
 *
 * - Dangles - edges which have one or both ends which are not incident on another edge endpoint
 * - Cut Edges - edges which are connected at both ends but which do not form part of a polygon
 * - Invalid Ring Lines - edges which form rings which are invalid (e.g. the component lines contain a self-intersection)
 * Errors are reported to output parameters "cuts", "dangles" and "invalid" (if not-null). Formed polygons are returned as a collection. NULL is returned on exception. All returned geometries must be destroyed by caller.
 *
 * The GEOSPolygonize_valid() variant allows extracting only polygons which form a valid polygonal result. The set of extracted polygons is guaranteed to be edge-disjoint. This is useful when it is known that the input lines form a valid polygonal geometry (which may include holes or nested polygons).
 *
 * @param {number} handle - A pointer to the GEOS context handle.
 * @param {number} geoms - A pointer to an array of Geometrys containing the linework to polygonize.
 * @param {number} ngeoms - The number of Geometrys in the array.
 * @returns {number} A GeometryCollection containing the polygons formed by the polygonization.
 * @alias module:geos
  */
  geos.GEOSPolygonize_r = Module.cwrap('GEOSPolygonize_r', 'number', ['number', 'number', 'number'])

  /**
 * Polygonizes a set of valid Geometrys which contain linework that
 * represents the edges of a planar graph.
 * All types of Geometry are accepted as input; the constituent
 * linework is extracted as the edges to be polygonized.
 * The processed edges must be correctly noded; that is, they must only meet
 * at their endpoints. The Polygonizer will run on incorrectly noded input
 * but will not form polygons from non-noded edges,
 * and will report them as errors.
 *
 * @param {number} geoms - A pointer to an array of valid Geometrys containing the linework to polygonize.
 * @param {number} ngeoms - The number of valid Geometrys in the array.
 * @returns {number} A GeometryCollection containing the polygons formed by the polygonization.
 * @alias module:geos
  */
  geos.GEOSPolygonize_valid = null

  /**
 * Polygonizes a set of valid Geometrys which contain linework that
 * represents the edges of a planar graph, using a GEOS context handle.
 * All types of Geometry are accepted as input; the constituent
 * linework is extracted as the edges to be polygonized.
 * The processed edges must be correctly noded; that is, they must only meet
 * at their endpoints. The Polygonizer will run on incorrectly noded input
 * but will not form polygons from non-noded edges,
 * and will report them as errors.
 *
 * @param {number} handle - A pointer to the GEOS context handle.
 * @param {string} geoms - An array of valid Geometrys containing the linework to polygonize.
 * @param {number} ngeoms - The number of valid Geometrys in the array.
 * @returns {string} A GeometryCollection containing the polygons formed by the polygonization.
 * @alias module:geos
  */
  geos.GEOSPolygonize_valid_r = Module.cwrap('GEOSPolygonize_valid_r', 'string', ['number', 'string', 'number'])

  /**
 * Gets the list of line segments forming the boundary between
 * inside and outside portions of a set of Geometrys which contain linework that
 * represents the edges of a planar graph.
 *
 * @param {string} geoms - An array of Geometrys containing the linework to process.
 * @param {number} ngeoms - The number of Geometrys in the array.
 * @returns {string} A MultiLineString containing the boundary segments.
 * @alias module:geos
  */
  geos.GEOSPolygonizer_getCutEdges = null

  /**
 * Gets the list of line segments forming the boundary between
 * inside and outside portions of a set of Geometrys which contain linework that
 * represents the edges of a planar graph, using a GEOS context handle.
 *
 * @param {number} handle - A pointer to the GEOS context handle.
 * @param {string} geoms - An array of Geometrys containing the linework to process.
 * @param {number} ngeoms - The number of Geometrys in the array.
 * @returns {string} A MultiLineString containing the boundary segments.
 * @alias module:geos
  */
  geos.GEOSPolygonizer_getCutEdges_r = Module.cwrap('GEOSPolygonizer_getCutEdges_r', 'string', ['number', 'string', 'number'])

  /**
 * Polygonizes a set of Geometrys which contain linework that
 * represents the edges of a planar graph.
 * All types of Geometry are accepted as input; the constituent
 * linework is extracted as the edges to be polygonized.
 * The processed edges must be correctly noded; that is, they must only meet
 * at their endpoints. The Polygonizer will run on incorrectly noded input
 * but will not form polygons from non-noded edges, and will report them as errors.
 *
 * The Polygonizer reports the follow kinds of errors:
 *
 * - Dangles - edges which have one or both ends which are not incident on another edge endpoint
 * - Cut Edges - edges which are connected at both ends but which do not form part of a polygon
 * - Invalid Ring Lines - edges which form rings which are invalid
 *   (e.g. the component lines contain a self-intersection)
 *
 * The returned geometry is a collection containing valid polygonal geometry.
 *
 * @param {number} input - a pointer to an array of Geometrys
 * @param {number} cuts - if non-null, will be set to a pointer to a collection containing the cut edges found during polygonization
 * @param {number} dangles - if non-null, will be set to a pointer to a collection containing the dangle edges found during polygonization
 * @param {number} invalidRings - if non-null, will be set to a pointer to a collection containing the invalid ring lines found during polygonization
 * @returns {number} a pointer to a collection containing the polygons formed by the polygonization
 * @see https://libgeos.org/doxygen/geos__c_8h.html#a0f0a7f5c9a3b6d7f9b4d1c8e2a0d4f5a
 * @alias module:geos
  */
  geos.GEOSPolygonize_full = null

  /**
 * Polygonizes a set of Geometrys which contain linework that
 * represents the edges of a planar graph.
 * All types of Geometry are accepted as input; the constituent
 * linework is extracted as the edges to be polygonized.
 * The processed edges must be correctly noded; that is, they must only meet
 * at their endpoints. The Polygonizer will run on incorrectly noded input
 * but will not form polygons from non-noded edges, and will report them as errors.
 *
 * The Polygonizer reports the follow kinds of errors:
 *
 * - Dangles - edges which have one or both ends which are not incident on another edge endpoint
 * - Cut Edges - edges which are connected at both ends but which do not form part of a polygon
 * - Invalid Ring Lines - edges which form rings which are invalid
 *   (e.g. the component lines contain a self-intersection)
 *
 * The returned geometry is a collection containing valid polygonal geometry.
 *
 * @param {number} handle - a pointer to an opaque GEOS context handle object
 * @param {number} input - a pointer to an array of Geometrys
 * @param {number} cuts - if non-null, will be set to a pointer to a collection containing the cut edges found during polygonization
 * @param {number} dangles - if non-null, will be set to a pointer to a collection containing the dangle edges found during polygonization
 * @param {number} invalidRings - if non-null, will be set to a pointer to a collection containing the invalid ring lines found during polygonization
 * @returns {number} a pointer to a collection containing the polygons formed by the polygonization
 * @see https://libgeos.org/doxygen/geos__c_8h.html#a1b2a8f7c3b2b6d9a3a0b4c6e1d0f9e1f
 * @alias module:geos
  */
  geos.GEOSPolygonize_full_r = Module.cwrap('GEOSPolygonize_full_r', 'number', ['number', 'number', 'number', 'number', 'number'])

  /**
* Computes a boundary-respecting hull of a polygonal geometry,
* with hull shape determined by a target parameter
* specifying the fraction of the input vertices retained in the result.
* Larger values produce less concave results.
* A value of 1 produces the convex hull; a value of 0 produces the original geometry.
* An outer hull is computed if the parameter is positive,
* an inner hull is computed if it is negative.
*
* @param {number} g the polygonal geometry to process
* @param {number} isOuter indicates whether to compute an outer or inner hull (1 for outer hull, 0 for inner)
* @param {number} vertexNumFraction the target fraction of the count of input vertices to retain in result
* @returns {number} A newly allocated geometry of the concave hull. NULL on exception.
*
* Caller is responsible for freeing with GEOSGeom_destroy().
* @see geos::simplify::PolygonHullSimplifier
*/
  geos.GEOSPolygonHullSimplify = null

  /**
* Computes a boundary-respecting hull of a polygonal geometry,
* with hull shape determined by a target parameter
* specifying the fraction of the input vertices retained in the result.
* Larger values produce less concave results.
* A value of 1 produces the convex hull; a value of 0 produces the original geometry.
* An outer hull is computed if the parameter is positive,
* an inner hull is computed if it is negative.
*
* @param {number} handle - a pointer to an opaque GEOS context handle object
* @param {number} g the polygonal geometry to process
* @param {number} isOuter indicates whether to compute an outer or inner hull (1 for outer hull, 0 for inner)
* @param {number} vertexNumFraction the target fraction of the count of input vertices to retain in result
* @returns {number} A newly allocated geometry of the concave hull. NULL on exception.
*
* Caller is responsible for freeing with GEOSGeom_destroy().
* @see geos::simplify::PolygonHullSimplifier
*/
  geos.GEOSPolygonHullSimplify_r = Module.cwrap('GEOSPolygonHullSimplify_r', 'number', ['number', 'number', 'number', 'number'])

  /**
* Computes a topology-preserving simplified hull of a polygonal geometry,
* with hull shape determined by the parameter, controlled by a parameter
* mode, which is one defined in \ref GEOSPolygonHullParameterModes.
* Larger values compute less concave results and a value of 0
* produces the original geometry.
* Either outer or inner hulls can be computed.
*
* @param {number} g the polygonal geometry to process
* @param {number} isOuter indicates whether to compute an outer or inner hull (1 for outer hull, 0 for inner)
* @param {number} parameterMode the interpretation to apply to the parameter argument; see \ref GEOSPolygonHullParameterModes
* @param {number} parameter the target ratio of area difference to original area
* @returns {number} A newly allocated geometry of the concave hull. NULL on exception.
*
* Caller is responsible for freeing with GEOSGeom_destroy().
* @see geos::simplify::PolygonHullSimplifier
* @see GEOSPolygonHullParameterModes
* @see GEOSPolygonHullSimplify
*/
  geos.GEOSPolygonHullSimplifyMode = null

  /**
* Computes a topology-preserving simplified hull of a polygonal geometry,
* with hull shape determined by the parameter, controlled by a parameter
* mode, which is one defined in \ref GEOSPolygonHullParameterModes.
* Larger values compute less concave results and a value of 0
* produces the original geometry.
* Either outer or inner hulls can be computed.
*
* @param {number} handle - a pointer to an opaque GEOS context handle object
* @param {number} g the polygonal geometry to process
* @param {number} isOuter indicates whether to compute an outer or inner hull (1 for outer hull, 0 for inner)
* @param {number} parameterMode the interpretation to apply to the parameter argument; see \ref GEOSPolygonHullParameterModes
* @param {number} parameter the target ratio of area difference to original area
* @returns {number} A newly allocated geometry of the concave hull. NULL on exception.
*
* Caller is responsible for freeing with GEOSGeom_destroy().
* @see geos::simplify::PolygonHullSimplifier
* @see GEOSPolygonHullParameterModes
* @see GEOSPolygonHullSimplify
*/
  geos.GEOSPolygonHullSimplifyMode_r = Module.cwrap('GEOSPolygonHullSimplifyMode_r', 'number', ['number', 'number', 'number', 'number', 'number'])

  /**
 * Creates an areal geometry formed by constituent linework of given geometry.
 *
 * Returns null on exception or empty result.
 *
 * @param {number} g - a pointer to an input Geometry (linestring or multilinestring)
 * @returns {number} a pointer to a Geometry (polygon or multipolygon) representing the input's areal geometry
 * @see https://libgeos.org/doxygen/geos__c_8h.html#a0a8f4f9d7e3b9c1a2b6a0f1b5c4a7d0f
 * @alias module:geos
  */
  geos.GEOSBuildArea = null

  /**
 * Creates an areal geometry formed by constituent linework of given geometry.
 *
 * Returns null on exception or empty result.
 *
 * @param {number} handle - a pointer to an opaque GEOS context handle object
 * @param {number} g - a pointer to an input Geometry (linestring or multilinestring)
 * @returns {number} a pointer to a Geometry (polygon or multipolygon) representing the input's areal geometry
 * @see https://libgeos.org/doxygen/geos__c_8h.html#a3e6d7e2a4f9c5b6b2e0d1f3e8a9c1b3d
 * @alias module:geos
  */
  geos.GEOSBuildArea_r = Module.cwrap('GEOSBuildArea_r', 'number', ['number', 'number'])

  /**
 * Returns a geometry which is valid according to the GEOS
 * validity rules, and preserves as much as possible of the input geometry's extent,
 * dimension, and structure.
 *
 * The returned geometry may be a copy of the input, or a new geometry with different structure.
 *
 * The returned geometry will be valid, or null if an exception occurs.
 *
 * @param {number} g - a pointer to an input Geometry
 * @returns {number} a pointer to a valid Geometry, or null on exception
 * @see https://libgeos.org/doxygen/geos__c_8h.html#a0f0a7f5c9a3b6d7f9b4d1c8e2a0d4f5a
 * @alias module:geos
  */
  geos.GEOSMakeValid = null

  /**
 * Returns a geometry that is valid according to the GEOS library.
 * @param {number} handle - The GEOS context pointer handle.
 * @param {number} g - The input geometry pointer.
 * @returns {number} A pointer to a valid geometry, or NULL on exception.
 * @see https://libgeos.org/doxygen/classgeos_1_1operation_1_1valid_1_1MakeValidOp.html
 * @alias module:geos
  */
  geos.GEOSMakeValid_r = Module.cwrap('GEOSMakeValid_r', 'number', ['number', 'number'])

  /**
 * Merges a collection of linear components into maximal-length linestrings.
 * @param {number} g - The input geometry pointer, which must be a collection of linestrings or multilinestrings.
 * @returns {number} A pointer to a multilinestring containing the merged linestrings, or NULL on exception.
 * @see https://libgeos.org/doxygen/classgeos_1_1operation_1_1linemerge_1_1LineMerger.html
 * @alias module:geos
  */
  geos.GEOSLineMerge = null

  /**
 * Merges a collection of linear components into maximal-length linestrings, using a GEOS context handle.
 * @param {number} handle - The GEOS context pointer handle.
 * @param {number} g - The input geometry pointer, which must be a collection of linestrings or multilinestrings.
 * @returns {number} A pointer to a multilinestring containing the merged linestrings, or NULL on exception.
 * @see https://libgeos.org/doxygen/geos__c_8h_source.html
 * @alias module:geos
  */
  geos.GEOSLineMerge_r = Module.cwrap('GEOSLineMerge_r', 'number', ['number', 'number'])

  /**
 * Sews together a set of fully noded LineStrings
 * removing any cardinality 2 nodes in the linework
 * only if possible without changing order of points.
 * @param {number} handle - The GEOS context pointer handle.
 * @param {number} g The input linework
 * @returns {number} The merged linework
 * Caller is responsible for freeing with GEOSGeom_destroy().
 * @see geos::operation::linemerge::LineMerger
 */

  geos.GEOSLineMergeDirected_r = Module.cwrap('GEOSLineMergeDirected_r', 'number', ['number', 'number'])

  /**
* Sews together a set of fully noded LineStrings
* removing any cardinality 2 nodes in the linework
* only if possible without changing order of points.
* @param {number} g The input linework
* @returns {number} The merged linework
* Caller is responsible for freeing with GEOSGeom_destroy().
* @see geos::operation::linemerge::LineMerger
*/

  geos.GEOSLineMergeDirected = null

  /**
 *  Computes the line which is the section of the input LineString starting and
 *  ending at the given length fractions.
 *  @param {number} handle - The GEOS context pointer handle.
 *  @param {number} g The input LineString
 *  @param {number} start_fraction start fraction (0-1) along the length of g
 *  @param {number} end_fraction end fraction (0-1) along the length of g
 *  @return {number} selected substring.
 *  Caller is responsible for freeing with GEOSGeom_destroy()
 */
  geos.GEOSLineSubstring_r = Module.cwrap('GEOSLineSubstring_r', 'number', ['number', 'number', 'number', 'number'])

  /**
*  Computes the line which is the section of the input LineString starting and
*  ending at the given length fractions.
*  @param {number} g The input LineString
*  @param {number} start_fraction start fraction (0-1) along the length of g
*  @param {number} end_fraction end fraction (0-1) along the length of g
*  @return {number} selected substring.
*  Caller is responsible for freeing with GEOSGeom_destroy()
*/
  geos.GEOSLineSubstring = null

  /**
 * Reverses the order of the coordinates in a geometry.
 * @param {number} g - The input geometry pointer, which must be a point, linestring, linearring or polygon.
 * @returns {number} A pointer to a geometry with reversed coordinates, or NULL on exception.
 * @see https://libgeos.org/doxygen/classgeos_1_1geom_1_1Geometry.html
 * @alias module:geos
  */
  geos.GEOSReverse = null

  /**
 * Reverses the order of the coordinates in a geometry, using a GEOS context handle.
 * @param {number} handle - The GEOS context pointer handle.
 * @param {number} g - The input geometry pointer, which must be a point, linestring, linearring or polygon.
 * @returns {number} A pointer to a geometry with reversed coordinates, or NULL on exception.
 * @see https://libgeos.org/doxygen/geos__c_8h_source.html
 * @alias module:geos
  */
  geos.GEOSReverse_r = Module.cwrap('GEOSReverse_r', 'number', ['number', 'number'])

  /**
 * Returns the Spatial Reference System ID (SRID) of a geometry.
 * @param {number} g - A pointer to a GEOSGeometry object.
 * @returns {number} The SRID of the geometry, or 0 if not set.
 * @alias module:geos
  */
  geos.GEOSGetSRID = null

  /**
 * Returns the Spatial Reference System ID (SRID) of a geometry in a thread-safe manner.
 * @param {number} handle - A pointer to a GEOSContextHandle_t object.
 * @param {number} g - A pointer to a GEOSGeometry object.
 * @returns {number} The SRID of the geometry, or 0 if not set.
 * @alias module:geos
  */
  geos.GEOSGetSRID_r = Module.cwrap('GEOSGetSRID_r', 'number', ['number', 'number'])

  /**
 * Sets the Spatial Reference System ID (SRID) of a geometry.
 * @param {number} g - A pointer to a GEOSGeometry object.
 * @param {number} SRID - The SRID value to set.
 * @alias module:geos
  */
  geos.GEOSSetSRID = null

  /**
 * Sets the Spatial Reference System ID (SRID) of a geometry in a thread-safe manner.
 * @param {number} handle - A pointer to a GEOSContextHandle_t object.
 * @param {number} g - A pointer to a GEOSGeometry object.
 * @param {number} SRID - The SRID value to set.
 * @alias module:geos
  */
  geos.GEOSSetSRID_r = Module.cwrap('GEOSSetSRID_r', null, ['number', 'number', 'number'])

  /**
 * Returns the user data associated with a geometry as a string.
 * @param {string} g - A pointer to a GEOSGeometry object.
 * @returns {string} The user data of the geometry, or null if not set or not a string.
 * @alias module:geos
  */
  geos.GEOSGeom_getUserData = null

  /**
 * Get the user data pointer associated with a geometry.
 * @param {number} handle - A pointer to the GEOS context handle.
 * @param {string} g - The GEOS geometry object.
 * @returns {string} The user data pointer, or null if none is set.
 * @alias module:geos
  */
  geos.GEOSGeom_getUserData_r = Module.cwrap('GEOSGeom_getUserData_r', 'string', ['number', 'string'])

  /**
 * Set the user data pointer associated with a geometry.
 * The user is responsible for freeing the memory of the user data pointer.
 * @param {number} handle - A pointer to the GEOS context handle.
 * @param {number} g - The GEOS geometry object.
 * @param {string} userData - The user data pointer to be set.
 * @alias module:geos
  */
  geos.GEOSGeom_setUserData = null

  /**
 * Set the user data pointer associated with a geometry.
 * The user is responsible for freeing the memory of the user data pointer.
 * @param {number} handle - A pointer to the GEOS context handle.
 * @param {number} g - The GEOS geometry object.
 * @param {string} userData - The user data pointer to be set.
 * @alias module:geos
  */
  geos.GEOSGeom_setUserData_r = Module.cwrap('GEOSGeom_setUserData_r', null, ['number', 'number', 'string'])

  /**
 * Check if a geometry has a Z coordinate dimension.
 * @param {number} handle - A pointer to the GEOS context handle.
 * @param {number} g - The GEOS geometry object.
 * @returns {number} 1 if the geometry has Z dimension, 0 otherwise, or -1 on error.
 * @alias module:geos
  */
  geos.GEOSHasZ = null

  /**
 * Check if a geometry has a Z coordinate dimension.
 * @param {number} handle - A pointer to the GEOS context handle.
 * @param {number} g - The GEOS geometry object.
 * @returns {number} 1 if the geometry has Z dimension, 0 otherwise, or -1 on error.
 * @alias module:geos
  */
  geos.GEOSHasZ_r = Module.cwrap('GEOSHasZ_r', 'number', ['number', 'number'])

  /**
* Tests whether the input geometry has M coordinates.
* @param {number} handle - A pointer to the GEOS context handle.
* @param {number} g The geometry to test
* @return {number} 1 on true, 0 on false, 2 on exception
*/
  geos.GEOSHasM_r = Module.cwrap('GEOSHasM_r', 'number', ['number', 'number'])

  /**
* Tests whether the input geometry has M coordinates.
* @param {number} g The geometry to test
* @return {number} 1 on true, 0 on false, 2 on exception
*/
  geos.GEOSHasM = null
  /**
 * Get the output dimension of WKB geometries.
 * @return {number} The output dimension (2 or 3).
 * @alias module:geos
  */
  geos.GEOS_getWKBOutputDims = null

  /**
 * Get the output dimension of WKB geometries in a given context.
 * @param {number} handle - A pointer to the GEOS context handle.
 * @return {number} The output dimension (2 or 3).
 * @alias module:geos
  */
  geos.GEOS_getWKBOutputDims_r = Module.cwrap('GEOS_getWKBOutputDims_r', 'number', ['number'])

  /**
 * Set the output dimension of WKB geometries.
 * @param {number} newDims - The new output dimension (2 or 3).
 * @return {number} The previous output dimension.
 * @alias module:geos
  */
  geos.GEOS_setWKBOutputDims = null

  /**
 * Set the output dimension of WKB geometries in a given context.
 * @param {number} handle - A pointer to the GEOS context handle.
 * @param {number} newDims - The new output dimension (2 or 3).
 * @return {number} The previous output dimension.
 * @alias module:geos
  */
  geos.GEOS_setWKBOutputDims_r = Module.cwrap('GEOS_setWKBOutputDims_r', 'number', ['number', 'number'])

  /**
 * Get the byte order of WKB geometries.
 * @return {number} The byte order (0 for XDR, 1 for NDR).
 * @alias module:geos
  */
  geos.GEOS_getWKBByteOrder = null

  /**
 * Get the byte order used for WKB output.
 * @param {number} handle - A pointer to the GEOS context handle.
 * @returns {number} The byte order (GEOS_WKB_XDR or GEOS_WKB_NDR) or -1 on error.
 * @alias module:geos
  */
  geos.GEOS_getWKBByteOrder_r = Module.cwrap('GEOS_getWKBByteOrder_r', 'number', ['number'])

  /**
 * Set the byte order used for WKB output.
 * @param {number} byteOrder - The byte order (GEOS_WKB_XDR or GEOS_WKB_NDR).
 * @returns {number} 1 on success, 0 on error.
 * @alias module:geos
  */
  geos.GEOS_setWKBByteOrder = null

  /**
 * Set the byte order used for WKB output in a given context.
 * @param {number} handle - A pointer to the GEOS context handle.
 * @param {number} byteOrder - The byte order (GEOS_WKB_XDR or GEOS_WKB_NDR).
 * @returns {number} 1 on success, 0 on error.
 * @alias module:geos
  */
  geos.GEOS_setWKBByteOrder_r = Module.cwrap('GEOS_setWKBByteOrder_r', 'number', ['number', 'number'])

  /**
 * Create a coordinate sequence of a given size and dimension.
 * @param {number} size - The number of coordinates in the sequence.
 * @param {number} dims - The dimension of each coordinate (2 or 3).
 * @returns {number} A pointer to the created coordinate sequence or NULL on error.
 * @alias module:geos
  */
  geos.GEOSCoordSeq_create = null

  /**
 * Create a coordinate sequence of a given size and dimension in a given context.
 * @param {number} handle - A pointer to the GEOS context handle.
 * @param {number} size - The number of coordinates in the sequence.
 * @param {number} dims - The dimension of each coordinate (2 or 3).
 * @returns {number} A pointer to the created coordinate sequence or NULL on error.
 * @alias module:geos
  */
  geos.GEOSCoordSeq_create_r = Module.cwrap('GEOSCoordSeq_create_r', 'number', ['number', 'number', 'number'])

  /**
 * Set an ordinate value in a coordinate sequence.
 * @param {number} s - The coordinate sequence handle.
 * @param {number} idx - The index of the coordinate to alter, zero based.
 * @param {number} dim - The dimension to set (0=X, 1=Y, 2=Z, 3=M).
 * @param {number} val - The value to set the ordinate to.
 * @return {number} 1 on success, 0 on exception.
 * @alias module:geos
  */
  geos.GEOSCoordSeq_setOrdinate = null

  /**
 * Set an ordinate value in a coordinate sequence (thread-safe version).
 * @param {number} handle - A pointer to the GEOS context handle.
 * @param {number} s - The coordinate sequence handle.
 * @param {number} idx - The index of the coordinate to alter, zero based.
 * @param {number} dim - The dimension to set (0=X, 1=Y, 2=Z, 3=M).
 * @param {number} val - The value to set the ordinate to.
 * @return {number} 1 on success, 0 on exception.
 * @alias module:geos
  */
  geos.GEOSCoordSeq_setOrdinate_r = Module.cwrap('GEOSCoordSeq_setOrdinate_r', 'number', ['number', 'number', 'number', 'number', 'number'])

  /**
 * Set X ordinate values in a coordinate sequence.
 * @param {number} s - The coordinate sequence handle.
 * @param {number} idx - The index of the coordinate to alter, zero based.
 * @param {number} val - The value to set the ordinate to.
 * @return {number} 1 on success, 0 on exception.
 * @alias module:geos
  */
  geos.GEOSCoordSeq_setX = null

  /**
 * Set Y ordinate values in a coordinate sequence.
 * @param {number} s - The coordinate sequence handle.
 * @param {number} idx - The index of the coordinate to alter, zero based.
 * @param {number} val - The value to set the ordinate to.
 * @return {number} 1 on success, 0 on exception.
 * @alias module:geos
  */
  geos.GEOSCoordSeq_setY = null

  /**
 * Set Z ordinate values in a coordinate sequence.
 * @param {number} s - The coordinate sequence handle.
 * @param {number} idx - The index of the coordinate to alter, zero based.
 * @param {number} val - The value to set the ordinate to.
 * @return {number} 1 on success, 0 on exception.
 * @alias module:geos
  */
  geos.GEOSCoordSeq_setZ = null

  /**
 * Set X and Y ordinate values in a coordinate sequence.
 * @param {number} s - The coordinate sequence pointer
 * @param {number} idx - The index of the coordinate to alter, zero based
 * @param {number} x - The value to set the X ordinate to
 * @param {number} y - The value to set the Y ordinate to
 * @returns {number} 0 on exception, 1 otherwise
 * @since 2.2
 * @alias module:geos
  */
  geos.GEOSCoordSeq_setXY = null

  /**
 * Set X and Y ordinate values in a coordinate sequence (reentrant).
 * @param {number} handle - The context handle
pointer  * @param {number} s - The coordinate sequence pointer
 * @param {number} idx - The index of the coordinate to alter, zero based
 * @param {number} x - The value to set the X ordinate to
 * @param {number} y - The value to set the Y ordinate to
 * @returns {number} 0 on exception, 1 otherwise
 * @since 3.8.0
* @alias module:geos
*/
  geos.GEOSCoordSeq_setXY_r = Module.cwrap('GEOSCoordSeq_setXY_r', 'number', ['number', 'number', 'number', 'number', 'number'])

  /**
 * Set X, Y and Z ordinate values in a coordinate sequence.
 * @param {number} s - The coordinate sequence pointer
 * @param {number} idx - The index of the coordinate to alter, zero based
 * @param {number} x - The value to set the X ordinate to
 * @param {number} y - The value to set the Y ordinate to
 * @param {number} z - The value to set the Z ordinate to
 * @returns {number} 0 on exception, 1 otherwise
 * @since 2.2
 * @alias module:geos
  */
  geos.GEOSCoordSeq_setXYZ = null

  /**
 * Set X, Y and Z ordinate values in a coordinate sequence (reentrant).
 * @param {number} handle - The context handle pointer
 * @param {number} s - The coordinate sequence pointer
 * @param {number} idx - The index of the coordinate to alter, zero based
 * @param {number} x - The value to set the X ordinate to
 * @param {number} y - The value to set the Y ordinate to
 * @param {number} z - The value to set the Z ordinate to
 * @returns {number} 0 on exception, 1 otherwise
 * @since 3.8.0
 * @alias module:geos
  */
  geos.GEOSCoordSeq_setXYZ_r = Module.cwrap('GEOSCoordSeq_setXYZ_r', 'number', ['number', 'number', 'number', 'number', 'number', 'number'])

  /**
 * Clone a coordinate sequence.
 * @param {number} s - The coordinate sequence to clone pointer
 * @returns {number|null} A pointer to a new coordinate sequence object or null on exception.
 * @alias module:geos
  */
  geos.GEOSCoordSeq_clone = null

  /**
 * Clone a coordinate sequence.
 * @param {number} handle - A pointer to the GEOS context handle.
 * @param {number} s - The pointer to the coordinate sequence to clone.
 * @returns {number} The pointer to the cloned coordinate sequence, or null on error.
 * @see https://libgeos.org/doxygen/geos__c_8h.html#a4f2a6b1f8e9a1c0e3f9c6e7d5a3f6b5a
 * @alias module:geos
  */
  geos.GEOSCoordSeq_clone_r = Module.cwrap('GEOSCoordSeq_clone_r', 'number', ['number', 'number'])

  /**
 * Get an ordinate value from a coordinate sequence.
 * @param {number} s - The pointer to the coordinate sequence.
 * @param {number} idx - The index of the coordinate to get the ordinate from.
 * @param {number} dim - The dimension of the ordinate to get (0 for X, 1 for Y, 2 for Z, 3 for M).
 * @returns {number} The ordinate value, or NaN on error.
 * @see https://libgeos.org/doxygen/geos__c_8h.html#a9b7d0e4b5c8f2d7e4a9b0d6c3a9f1a7c
 * @alias module:geos
  */
  geos.GEOSCoordSeq_getOrdinate = null

  /**
 * Get an ordinate value from a coordinate sequence in a thread-safe way.
 * @param {number} handle - A pointer to the GEOS context handle.
 * @param {number} s - The pointer to the coordinate sequence.
 * @param {number} idx - The index of the coordinate to get the ordinate from.
 * @param {number} dim - The dimension of the ordinate to get (0 for X, 1 for Y, 2 for Z, 3 for M).
 * @param {number} val - The pointer to a double variable to store the ordinate value.
 * @returns {number} 1 on success, 0 on error.
 * @see https://libgeos.org/doxygen/geos__c_8h.html#a4f2a6b1f8e9a1c0e3f9c6e7d5a3f6b5a
 * @alias module:geos
  */
  geos.GEOSCoordSeq_getOrdinate_r = Module.cwrap('GEOSCoordSeq_getOrdinate_r', 'number', ['number', 'number', 'number', 'number', 'number'])

  /**
 * Get the X ordinate value from a coordinate sequence.
 * @param {number} s - The pointer to the coordinate sequence.
 * @param {number} idx - The index of the coordinate to get the X ordinate from.
 * @param {number} x - The pointer to a double variable to store the X ordinate value.
 * @returns {number} 1 on success, 0 on error.
 * @see https://libgeos.org/doxygen/geos__c_8h.html#a9b7d0e4b5c8f2d7e4a9b0d6c3a9f1a7c
 * @alias module:geos
  */
  geos.GEOSCoordSeq_getX = null

  /**
 * Get the Y ordinate value from a coordinate sequence.
 * @param {number} s - The pointer to the coordinate sequence.
 * @param {number} idx - The index of the coordinate to get the Y ordinate from.
 * @param {number} y - The pointer to a double variable to store the Y ordinate value.
 * @returns {number} 1 on success, 0 on error.
 * @see https://libgeos.org/doxygen/geos__c_8h.html#a9b7d0e4b5c8f2d7e4a9b0d6c3a9f1a7c
 * @alias module:geos
  */
  geos.GEOSCoordSeq_getY = null

  /**
 * Get the Z ordinate value of a coordinate in a sequence.
 * @param {number} s - The coordinate sequence handle.
 * @param {number} idx - The index of the coordinate to get, zero based.
 * @param {number} val - A pointer to a double where the ordinate value will be stored.
 * @returns {number} 1 on success, 0 on exception.
 * @alias module:geos
  */
  geos.GEOSCoordSeq_getZ = null

  /**
 * Get the X and Y ordinate values of a coordinate in a sequence.
 * @param {number} s - The coordinate sequence handle.
 * @param {number} idx - The index of the coordinate to get, zero based.
 * @param {number} x - A pointer to a double where the X ordinate value will be stored.
 * @param {number} y - A pointer to a double where the Y ordinate value will be stored.
 * @returns {number} 1 on success, 0 on exception.
 * @alias module:geos
  */
  geos.GEOSCoordSeq_getXY = null

  /**
 * Get the X and Y ordinate values of a coordinate in a sequence using a context handle.
 * @param {number} handle - The context handle.
 * @param {number} s - The coordinate sequence handle.
 * @param {number} idx - The index of the coordinate to get, zero based.
 * @param {number} x - A pointer to a double where the X ordinate value will be stored.
 * @param {number} y - A pointer to a double where the Y ordinate value will be stored.
 * @returns {number} 1 on success, 0 on exception.
 * @alias module:geos
  */
  geos.GEOSCoordSeq_getXY_r = Module.cwrap('GEOSCoordSeq_getXY_r', 'number', ['number', 'number', 'number', 'number', 'number'])

  /**
 * Get the X, Y and Z ordinate values of a coordinate in a sequence.
 * @param {number} s - The coordinate sequence handle.
 * @param {number} idx - The index of the coordinate to get, zero based.
 * @param {number} x - A pointer to a double where the X ordinate value will be stored.
 * @param {number} y - A pointer to a double where the Y ordinate value will be stored.
 * @param {number} z - A pointer to a double where the Z ordinate value will be stored.
 * @returns {number} 1 on success, 0 on exception.
 * @alias module:geos
  */
  geos.GEOSCoordSeq_getXYZ = null

  /**
 * Get the X, Y and Z ordinate values of a coordinate in a sequence using a context handle.
 * @param {number} handle - The context handle.
 * @param {number} s - The coordinate sequence handle.
 * @param {number} idx - The index of the coordinate to get, zero based.
 * @param {number} x - A pointer to a double where the X ordinate value will be stored.
 * @param {number} y - A pointer to a double where the Y ordinate value will be stored.
 * @param {number} z - A pointer to a double where the Z ordinate value will be stored.
 * @returns {number} 1 on success, 0 on exception.
 * @alias module:geos
  */
  geos.GEOSCoordSeq_getXYZ_r = Module.cwrap('GEOSCoordSeq_getXYZ_r', 'number', ['number', 'number', 'number', 'number', 'number', 'number'])

  /**
 * Get the size of a coordinate sequence.
 * @param {number} s - A pointer to a GEOSCoordSequence object.
 * @param {number} size - A pointer to an unsigned int to store the size.
 * @returns {number} 1 on success, 0 on exception.
 * @alias module:geos
  */
  geos.GEOSCoordSeq_getSize = null

  /**
 * Get the size of a coordinate sequence (thread-safe).
 * @param {number} handle - A GEOS context handle.
 * @param {number} s - A pointer to a GEOSCoordSequence object.
 * @param {number} size - A pointer to an unsigned int to store the size.
 * @returns {number} 1 on success, 0 on exception.
 * @alias module:geos
  */
  geos.GEOSCoordSeq_getSize_r = Module.cwrap('GEOSCoordSeq_getSize_r', 'number', ['number', 'number', 'number'])

  /**
 * Get the dimensions of a coordinate sequence.
 * @param {number} s - A pointer to a GEOSCoordSequence object.
 * @param {number} dims - A pointer to an unsigned int to store the dimensions.
 * @returns {number} 1 on success, 0 on exception.
 * @alias module:geos
  */
  geos.GEOSCoordSeq_getDimensions = null

  /**
 * Get the dimensions of a coordinate sequence (thread-safe).
 * @param {number} handle - A GEOS context handle.
 * @param {number} s - A pointer to a GEOSCoordSequence object.
 * @param {number} dims - A pointer to an unsigned int to store the dimensions.
 * @returns {number} 1 on success, 0 on exception.
 * @alias module:geos
  */
  geos.GEOSCoordSeq_getDimensions_r = Module.cwrap('GEOSCoordSeq_getDimensions_r', 'number', ['number', 'number', 'number'])

  /**
 * Check the orientation of a coordinate sequence. Closure of the sequence is assumed. Invalid (collapsed) or short (fewer than 4 points) sequences return false.
 * @param {number} s - A pointer to a GEOSCoordSequence object.
 * @param {number} is_ccw - A pointer to a char to store the result (1 for counter-clockwise, 0 for clockwise).
 * @returns {number} 1 on success, 0 on exception.
 * @alias module:geos
  */
  geos.GEOSCoordSeq_isCCW = null

  /**
 * Checks whether a coordinate sequence forms a counter-clockwise ring.
 * @param {number} handle - A pointer to the GEOS context handle.
 * @param {number} s - The coordinate sequence to check.
 * @param {number} is_ccw - A pointer to a char variable to store the result (1 if CCW, 0 otherwise).
 * @return {number} 1 on success, 0 on exception.
 * @alias module:geos
  */
  geos.GEOSCoordSeq_isCCW_r = Module.cwrap('GEOSCoordSeq_isCCW_r', 'number', ['number', 'number', 'number'])

  /**
 * Destroys a coordinate sequence.
 * @param {number} s - The coordinate sequence to destroy.
 * @alias module:geos
  */
  geos.GEOSCoordSeq_destroy = null

  /**
 * Destroys a coordinate sequence with a context handle.
 * @param {number} handle - A pointer to the GEOS context handle.
 * @param {number} s - The coordinate sequence to destroy.
 * @alias module:geos
  */
  geos.GEOSCoordSeq_destroy_r = Module.cwrap('GEOSCoordSeq_destroy_r', null, ['number', 'number'])

  /**
 * Returns the coordinate sequence of a geometry.
 * @param {number} g - The geometry to get the coordinate sequence from.
 * @return {number} A pointer to the coordinate sequence, or NULL on exception.
 * @alias module:geos
  */
  geos.GEOSGeom_getCoordSeq = null

  /**
 * Returns the coordinate sequence of a geometry with a context handle.
 * @param {number} handle - A pointer to the GEOS context handle.
 * @param {number} g - The geometry to get the coordinate sequence from.
 * @return {number} A pointer to the coordinate sequence, or NULL on exception.
 * @alias module:geos
  */
  geos.GEOSGeom_getCoordSeq_r = Module.cwrap('GEOSGeom_getCoordSeq_r', 'number', ['number', 'number'])

  /**
 * Creates a point geometry from a coordinate sequence.
 * @param {number} s The pointer to a coordinate sequence to use. Must have exactly one element.
 * @return {number} A pointer to a newly allocated point geometry. NULL on exception.
 * Caller is responsible for freeing with GEOSGeom_destroy().
 * @alias module:geos
  */
  geos.GEOSGeom_createPoint = null

  /**
 * Creates a point geometry from a coordinate sequence (reentrant).
 * @param {number} handle The context handle topointer  use.
 * @param {number} s The pointer to a coordinate sequence to use. Must have exactly one element.
 * @return {number} A pointer to a newly allocated point geometry. NULL on exception.
 * Caller is responsible for freeing with GEOSGeom_destroy_r().
 * @alias module:geos
  */
  geos.GEOSGeom_createPoint_r = Module.cwrap('GEOSGeom_createPoint_r', 'number', ['number', 'number'])

  /**
 * Creates a point geometry from a pair of coordinates.
 * @param {number} x The X coordinate
 * @param {number} y The Y coordinate
 * @return {number} A pointer to a newly allocated point geometry. NULL on exception.
 * Caller is responsible for freeing with GEOSGeom_destroy().
 *
 * @since 3.8
 * @alias module:geos
  */
  geos.GEOSGeom_createPointFromXY = null

  /**
 * Creates a point geometry from a pair of coordinates (reentrant).
 * @param {number} handle The context handle topointer  use.
 * @param {number} x The X coordinate
 * @param {number} y The Y coordinate
 * @return {number} A pointer to a newly allocated point geometry. NULL on exception.
 * Caller is responsible for freeing with GEOSGeom_destroy_r().
 *
 * @since 3.8
 * @alias module:geos
  */
  geos.GEOSGeom_createPointFromXY_r = Module.cwrap('GEOSGeom_createPointFromXY_r', 'number', ['number', 'number', 'number'])

  /**
 * Creates a linear ring geometry from a coordinate sequence.
 * A linear ring is a line string that is both closed and simple.
 * @param {number} s A pointer to the coordinate sequence to use. Must have at least four elements and be closed.
 * @return {number} A pointer to a newly allocated linear ring geometry. NULL on exception.
 * Caller is responsible for freeing with GEOSGeom_destroy().
 * @alias module:geos
  */
  geos.GEOSGeom_createLinearRing = null

  /**
 * Creates a linear ring geometry from a coordinate sequence.
 * @param {number} handle - The handle to the GEOS context.
 * @param {number} coordSeq - The pointer to the coordinate sequence.
 * @returns {number} The pointer to the created geometry or NULL on exception.
 * @alias module:geos
  */
  geos.GEOSGeom_createLinearRing_r = Module.cwrap('GEOSGeom_createLinearRing_r', 'number', ['number', 'number'])

  /**
 * Creates a line string geometry from a coordinate sequence.
 * @param {number} coordSeq - The pointer to the coordinate sequence.
 * @returns {number} The pointer to the created geometry or NULL on exception.
 * @alias module:geos
  */
  geos.GEOSGeom_createLineString = null

  /**
 * Creates a line string geometry from a coordinate sequence.
 * @param {number} handle - The handle to the GEOS context.
 * @param {number} coordSeq - The pointer to the coordinate sequence.
 * @returns {number} The pointer to the created geometry or NULL on exception.
 * @alias module:geos
  */
  geos.GEOSGeom_createLineString_r = Module.cwrap('GEOSGeom_createLineString_r', 'number', ['number', 'number'])

  /**
 * Creates a polygon geometry from an outer ring and an optional array of inner rings.
 * @param {number} outerRing - The pointer to the outer ring geometry.
 * @param {number} innerRings - The pointer to an array of inner ring geometries.
 * @param {number} numInnerRings - The number of inner rings in the array.
 * @returns {number} The pointer to the created geometry or NULL on exception.
 * @alias module:geos
  */
  geos.GEOSGeom_createPolygon = null

  /**
 * Creates a polygon geometry from an outer ring and an optional array of inner rings.
 * @param {number} handle - The handle to the GEOS context.
 * @param {number} outerRing - The pointer to the outer ring geometry.
 * @param {number} innerRings - The pointer to an array of inner ring geometries.
 * @param {number} numInnerRings - The number of inner rings in the array.
 * @returns {number} The pointer to the created geometry or NULL on exception.
 * @alias module:geos
  */
  geos.GEOSGeom_createPolygon_r = Module.cwrap('GEOSGeom_createPolygon_r', 'number', ['number', 'number', 'number', 'number'])

  /**

  /**
 * Create a rectangular polygon from bounding coordinates.
 * Will return a point geometry if width and height are 0.
 * @param {number} xmin Left bound of envelope
 * @param {number} ymin Lower bound of envelope
 * @param {number} xmax Right bound of envelope
 * @param {number} ymax Upper bound of envelope
 * @returns {number} The pointer to the created geometry or NULL on exception.
 * @alias module:geos
  */
  geos.GEOSGeom_createRectangle = null

  /**
 * Create a rectangular polygon from bounding coordinates.
 * Will return a point geometry if width and height are 0.
 * @param {number} handle - The handle to the GEOS context.
 * @param {number} xmin Left bound of envelope
 * @param {number} ymin Lower bound of envelope
 * @param {number} xmax Right bound of envelope
 * @param {number} ymax Upper bound of envelope
 * @returns {number} The pointer to the created geometry or NULL on exception.
 * @alias module:geos
  */
  geos.GEOSGeom_createRectangle_r = Module.cwrap('GEOSGeom_createRectangle_r', 'number', ['number', 'number', 'number', 'number', 'number'])

  /**
 * Clone a geometry object.
 * @param {number} handle - A pointer to the GEOS context handle.
 * @param {number} g - The pointer to the geometry object to clone.
 * @returns {number} The pointer to the cloned geometry object, or null on exception.
 * @alias module:geos
  */
  geos.GEOSGeom_clone_r = Module.cwrap('GEOSGeom_clone_r', 'number', ['number', 'number'])

  /**
 * Clone a geometry object with a different context handle.
 * @param {number} g - The pointer to the geometry object to clone.
 * @returns {number} The pointer to the cloned geometry object, or null on exception.
 * @alias module:geos
  */
  geos.GEOSGeom_clone = null

  /**
 * Set the precision of a geometry object.
 * @param {number} handle - A pointer to the GEOS context handle.
 * @param {number} g - The pointer to the geometry object to modify.
 * @param {number} precision - The precision value to set, or 0.0 for full precision.
 * @param {number} flags - The flags to control the behavior of the function. See https://libgeos.org/doxygen/geos__c_8h.html for details.
 * @returns {number} 1 on success, 0 on exception.
 * @alias module:geos
  */
  geos.GEOSGeom_setPrecision_r = Module.cwrap('GEOSGeom_setPrecision_r', 'number', ['number', 'number', 'number', 'number'])

  /**
 * Set the precision of a geometry object with a different context handle.
 * @param {number} g - The pointer to the geometry object to modify.
 * @param {number} precision - The precision value to set, or 0.0 for full precision.
 * @param {number} flags - The flags to control the behavior of the function. See https://libgeos.org/doxygen/geos__c_8h.html for details.
 * @returns {number} 1 on success, 0 on exception.
 * @alias module:geos
  */
  geos.GEOSGeom_setPrecision = null

  /**
 * Get the precision of a geometry object.
 * @param {number} g - The pointer to the geometry object to query.
 * @returns {number} The precision value of the geometry object, or NaN on exception.
 * @alias module:geos
  */
  geos.GEOSGeom_getPrecision = null

  /**
 * Get the precision model of a geometry.
 * @param {number} handle - A pointer to the GEOS context handle.
 * @param {number} g - The GEOS geometry pointer.
 * @returns {number} The precision model value, or 0 on exception.
 * @see {@link https://github.com/libgeos/geos/blob/main/capi/geos_c.h.in#L2239}
 * @alias module:geos
  */
  geos.GEOSGeom_getPrecision_r = Module.cwrap('GEOSGeom_getPrecision_r', 'number', ['number', 'number'])

  /**
 * Get the inherent dimension of a geometry object, which must be less than or equal to the coordinate dimension.
 * @param {number} g - The GEOS geometry pointer.
 * @returns {number} The inherent dimension of the geometry, or -1 on exception.
 * @see {@link https://libgeos.org/doxygen/geos__c_8h.html#a4a2a3f2b9c7d6f9f0c8e5b4a0d6c1e7d}
 * @alias module:geos
  */
  geos.GEOSGeom_getDimensions = null

  /**
 * Get the inherent dimension of a geometry object, which must be less than or equal to the coordinate dimension.
 * @param {number} handle - A pointer to the GEOS context handle.
 * @param {number} g - The GEOS geometry pointer.
 * @returns {number} The inherent dimension of the geometry, or -1 on exception.
 * @see {@link https://github.com/libgeos/geos/blob/main/capi/geos_c.h.in#L2245}
 * @alias module:geos
  */
  geos.GEOSGeom_getDimensions_r = Module.cwrap('GEOSGeom_getDimensions_r', 'number', ['number', 'number'])

  /**
 * Get the coordinate dimension of a geometry object.
 * @param {number} g - The GEOS geometry pointer.
 * @returns {number} The coordinate dimension of the geometry, or 0 on exception.
 * @see {@link https://libgeos.org/doxygen/geos__c_8h.html#a3f7a6b7f8b6a3e5d2e9e4a4f5d8a0b1c}
 * @alias module:geos
  */
  geos.GEOSGeom_getCoordinateDimension = null

  /**
 * Get the coordinate dimension of a geometry object.
 * @param {number} handle - A pointer to the GEOS context handle.
 * @param {number} g - The GEOS geometry pointer.
 * @returns {number} The coordinate dimension of the geometry, or 0 on exception.
 * @see {@link https://github.com/libgeos/geos/blob/main/capi/geos_c.h.in#L2251}
 * @alias module:geos
  */
  geos.GEOSGeom_getCoordinateDimension_r = Module.cwrap('GEOSGeom_getCoordinateDimension_r', 'number', ['number', 'number'])

  /**
 * Finds the minimum X value in the geometry.
 * @param {number} g - The pointer to the input geometry
 * @param {number} value - The pointer to place the result
 * @returns {number} 0 on exception
 * @since 3.7
 * @alias module:geos
  */
  geos.GEOSGeom_getXMin = null

  /**
 * Finds the minimum X value in the geometry (thread-safe version).
 * @param {number} handle - The pointer to the GEOS context
 * @param {number} g - The pointer to the input geometry
 * @param {number} value - The pointer to place the result
 * @returns {number} 0 on exception
 * @since 3.7
 * @alias module:geos
  */
  geos.GEOSGeom_getXMin_r = Module.cwrap('GEOSGeom_getXMin_r', 'number', ['number', 'number', 'number'])

  /**
 * Finds the minimum Y value in the geometry.
 * @param {number} g - The pointer to the input geometry
 * @param {number} value - The pointer to place the result
 * @returns {number} 0 on exception
 * @since 3.7
 * @alias module:geos
  */
  geos.GEOSGeom_getYMin = null

  /**
 * Finds the minimum Y value in the geometry (thread-safe version).
 * @param {number} handle - The pointer to the GEOS context
 * @param {number} g - The pointer to the input geometry
 * @param {number} value - The pointer to place the result
 * @returns {number} 0 on exception
 * @since 3.7
 * @alias module:geos
  */
  geos.GEOSGeom_getYMin_r = Module.cwrap('GEOSGeom_getYMin_r', 'number', ['number', 'number', 'number'])

  /**
 * Finds the maximum X value in the geometry.
 * @param {number} g - The pointer to the input geometry
 * @param {number} value - The pointer to place the result
 * @returns {number} 0 on exception
 * @since 3.7
 * @alias module:geos
  */
  geos.GEOSGeom_getXMax = null

  /**
 * Returns the maximum X coordinate of the geometry.
 * @param {number} handle - The GEOS context pointer handle.
 * @param {number} g - The input geometry pointer.
 * @param {number} value - The output value.
 * @returns {number} 1 on success, 0 on exception.
 * @see https://github.com/libgeos/geos/blob/main/capi/geos_c.h.in#L1652
 * @alias module:geos
  */
  geos.GEOSGeom_getXMax_r = Module.cwrap('GEOSGeom_getXMax_r', 'number', ['number', 'number', 'number'])

  /**
 * Returns the maximum Y coordinate of the geometry.
 * @param {number} g - The input geometry pointer.
 * @param {number} value - The output value.
 * @returns {number} 1 on success, 0 on exception.
 * @see https://libgeos.org/doxygen/geos__c_8h.html#a9c6f3a7b7d4a5f3a9e8f1c6b0b4e2d9f
 * @alias module:geos
  */
  geos.GEOSGeom_getYMax = null

  /**
 * Returns the maximum Y coordinate of the geometry.
 * @param {number} handle - The GEOS context pointer handle.
 * @param {number} g - The input geometry pointer.
 * @param {number} value - The output value.
 * @returns {number} 1 on success, 0 on exception.
 * @see https://github.com/libgeos/geos/blob/main/capi/geos_c.h.in#L1655
 * @alias module:geos
  */
  geos.GEOSGeom_getYMax_r = Module.cwrap('GEOSGeom_getYMax_r', 'number', ['number', 'number', 'number'])

  /**
 * Finds the extent (minimum and maximum X and Y value) of the geometry.
 * Raises an exception for empty geometry input.
 *
 * @param {number}[in] g Input geometry
 * @param {number}[out] xmin Pointer to place result for minimum X value
 * @param {number}[out] ymin Pointer to place result for minimum Y value
 * @param {number}[out] xmax Pointer to place result for maximum X value
 * @param {number}[out] ymax Pointer to place result for maximum Y value
 * \return 1 on success, 0 on exception
 */
  geos.GEOSGeom_getExtent = null

  /**
 * Finds the extent (minimum and maximum X and Y value) of the geometry.
 * Raises an exception for empty geometry input.
 *
 * @param {number} handle - The GEOS context pointer handle.
 * @param {number}[in] g Input geometry
 * @param {number}[out] xmin Pointer to place result for minimum X value
 * @param {number}[out] ymin Pointer to place result for minimum Y value
 * @param {number}[out] xmax Pointer to place result for maximum X value
 * @param {number}[out] ymax Pointer to place result for maximum Y value
 * \return 1 on success, 0 on exception
 */
  geos.GEOSGeom_getExtent = Module.cwrap('GEOSGeom_getExtent_r', 'number', ['number', 'number', 'number', 'number', 'number', 'number'])

  /**
 * Simplifies a Geometry using the standard Douglas-Peucker algorithm.
 * @param {number} g - The input geometry pointer.
 * @param {number} tolerance - The distance tolerance for the simplification.
 * All vertices in the simplified geometry will be within this distance of the original geometry.
 * The tolerance value must be non-negative. A tolerance value of zero is effectively a no-op.
 * @returns {number} A pointer to a new simplified geometry, or NULL if an exception occurs.
 * @see https://libgeos.org/doxygen/classgeos_1_1simplify_1_1DouglasPeuckerSimplifier.html
 * @alias module:geos
  */
  geos.GEOSSimplify = null

  /**
 * Simplifies a Geometry using the standard Douglas-Peucker algorithm.
 * @param {number} handle - The GEOS context pointer handle.
 * @param {number} g - The input geometry pointer.
 * @param {number} tolerance - The distance tolerance for the simplification.
 * All vertices in the simplified geometry will be within this distance of the original geometry.
 * The tolerance value must be non-negative. A tolerance value of zero is effectively a no-op.
 * @returns {number} A pointer to a new simplified geometry, or NULL if an exception occurs.
 * @see https://docs.rs/geos-sys/1.0.10/geos_sys/fn.GEOSSimplify_r.html
 * @alias module:geos
  */
  geos.GEOSSimplify_r = Module.cwrap('GEOSSimplify_r', 'number', ['number', 'number', 'number'])

  /**
 * Simplifies a geometry, ensuring that the result is a valid geometry having the same dimension and number of components as the input.
 * @param {number} geom - A pointer to a GEOSGeometry object.
 * @param {number} tolerance - The distance tolerance for the simplification.
 * @returns {number} A pointer to a simplified GEOSGeometry object, or NULL on error.
 * @see https://libgeos.org/doxygen/classgeos_1_1simplify_1_1TopologyPreservingSimplifier.html
 * @alias module:geos
  */
  geos.GEOSTopologyPreserveSimplify = null

  /**
 * Simplifies a geometry, ensuring that the result is a valid geometry having the same dimension and number of components as the input. Thread-safe version.
 * @param {number} handle - A pointer to a GEOSContextHandle object.
 * @param {number} geom - A pointer to a GEOSGeometry object.
 * @param {number} tolerance - The distance tolerance for the simplification.
 * @returns {number} A pointer to a simplified GEOSGeometry object, or NULL on error.
 * @see https://libgeos.org/doxygen/geos__c_8h.html
 * @alias module:geos
  */
  geos.GEOSTopologyPreserveSimplify_r = Module.cwrap('GEOSTopologyPreserveSimplify_r', 'number', ['number', 'number', 'number'])

  /**
 * Creates a new GEOSWKTReader object.
 * @returns {number} A pointer to a GEOSWKTReader object, or NULL on error.
 * @see https://libgeos.org/doxygen/geos__c_8h.html
 * @alias module:geos
  */
  geos.GEOSWKTReader_create = null

  /**
 * Creates a new GEOSWKTReader object. Thread-safe version.
 * @param {number} handle - A pointer to a GEOSContextHandle object.
 * @returns {number} A pointer to a GEOSWKTReader object, or NULL on error.
 * @see https://libgeos.org/doxygen/geos__c_8h.html
 * @alias module:geos
  */
  geos.GEOSWKTReader_create_r = Module.cwrap('GEOSWKTReader_create_r', 'number', ['number'])

  /**
 * Destroys a GEOSWKTReader object and releases its memory.
 * @param {number} reader - A pointer to a GEOSWKTReader object.
 * @alias module:geos
  */
  geos.GEOSWKTReader_destroy = null

  /**
 * Destroys a GEOSWKTReader object.
 * @param {number} handle - A pointer to the GEOS context handle.
 * @param {number} reader - The pointer to the GEOSWKTReader object.
 * @returns {null}
 * @see {@link https://libgeos.org/doxygen/geos__c_8h.html#a0a0f7c1b9f6a9f7c3c4d1b5a7b6f9e2e|GEOSWKTReader_destroy_r}
 * @alias module:geos
  */
  geos.GEOSWKTReader_destroy_r = Module.cwrap('GEOSWKTReader_destroy_r', null, ['number', 'number'])

  /**
 * Reads a WKT string and returns a GEOSGeometry object.
 * @param {string} wkt - The WKT string to read.
 * @returns {number} The pointer to the GEOSGeometry object or null if an error occurred.
 * @throws {ParseError} If the WKT string is invalid or cannot be parsed.
 * @see {@link https://libgeos.org/doxygen/geos__c_8h.html#a0a0f7c1b9f6a9f7c3c4d1b5a7b6f9e2e|GEOSWKTReader_read_r}
 * @alias module:geos
  */
  geos.GEOSWKTReader_read = null

  /**
 * Reads a WKT string and returns a GEOSGeometry object.
 * @param {number} handle - A pointer to the GEOS context handle.
 * @param {number} reader - The pointer to the GEOSWKTReader object.
 * @param {string} wkt - The WKT string to read.
 * @returns {number} The pointer to the GEOSGeometry object or null if an error occurred.
 * @throws {ParseError} If the WKT string is invalid or cannot be parsed.
 * @see {@link https://libgeos.org/doxygen/geos__c_8h.html#a0a0f7c1b9f6a9f7c3c4d1b5a7b6f9e2e|GEOSWKTReader_read_r}
 * @alias module:geos
  */
  geos.GEOSWKTReader_read_r = Module.cwrap('GEOSWKTReader_read_r', 'number', ['number', 'number', 'string'])

  /**
* Set the reader to automatically repair structural errors
* in the input (currently just unclosed rings) while reading.
* @param {number} handle - A pointer to the GEOS context handle.
* @param {number} reader A WKT reader object, caller retains ownership
* @param {number} doFix Set to 1 to repair, 0 for no repair (default).
*/
  geos.GEOSWKTReader_setFixStructure_r = Module.cwrap('GEOSWKTReader_setFixStructure_r', null, ['number', 'number', 'number'])

  /**
* Set the reader to automatically repair structural errors
* in the input (currently just unclosed rings) while reading.
* @param {number} reader A WKT reader object, caller retains ownership
* @param {number} doFix Set to 1 to repair, 0 for no repair (default).
*/
  geos.GEOSWKTReader_setFixStructure = null

  /**
 * Creates a GEOSWKTWriter object.
 * @returns {number} The pointer to the GEOSWKTWriter object or null if an error occurred.
 * @see {@link https://libgeos.org/doxygen/geos__c_8h.html#a0a0f7c1b9f6a9f7c3c4d1b5a7b6f9e2e|GEOSWKTWriter_create}
 * @alias module:geos
  */
  geos.GEOSWKTWriter_create = null

  /**
 * Creates a GEOSWKTWriter object.
 * @param {number} handle - A pointer to the GEOS context handle.
 * @returns {number} The pointer to the GEOSWKTWriter object or null if an error occurred.
 * @see {@link https://libgeos.org/doxygen/geos__c_8h.html#a0a0f7c1b9f6a9f7c3c4d1b5a7b6f9e2e|GEOSWKTWriter_create_r}
 * @alias module:geos
  */
  geos.GEOSWKTWriter_create_r = Module.cwrap('GEOSWKTWriter_create_r', 'number', ['number'])

  /**
 * Destroys a GEOSWKTWriter object.
 * @param {number} writer - The pointer to the GEOSWKTWriter object to be destroyed.
 * @alias module:geos
  */
  geos.GEOSWKTWriter_destroy = null

  /**
 * Destroys a GEOSWKTWriter object using a context handle.
 * @param {number} handle - The pointer to the GEOSContextHandle_t object.
 * @param {number} writer - The pointer to the GEOSWKTWriter object to be destroyed.
 * @alias module:geos
  */
  geos.GEOSWKTWriter_destroy_r = Module.cwrap('GEOSWKTWriter_destroy_r', null, ['number', 'number'])

  /**
 * Converts a GEOSGeometry object to a WKT string.
 * @param {number} writer - The pointer to the GEOSWKTWriter object.
 * @param {number} g - The pointer to the GEOSGeometry object to be converted.
 * @returns {string} The WKT representation of the geometry, or null on error.
 * @alias module:geos
  */
  geos.GEOSWKTWriter_write = null

  /**
 * Converts a GEOSGeometry object to a WKT string using a context handle.
 * @param {number} handle - The pointer to the GEOSContextHandle_t object.
 * @param {number} writer - The pointer to the GEOSWKTWriter object.
 * @param {number} g - The pointer to the GEOSGeometry object to be converted.
 * @returns {string} The WKT representation of the geometry, or null on error.
 * @alias module:geos
  */
  geos.GEOSWKTWriter_write_r = Module.cwrap('GEOSWKTWriter_write_r', 'string', ['number', 'number', 'number'])

  /**
 * Sets whether the output WKT string should be trimmed of unnecessary spaces.
 * @param {number} writer - The pointer to the GEOSWKTWriter object.
 * @param {number} trim - A boolean value indicating whether to trim or not. 1 for true, 0 for false.
 * @alias module:geos
  */
  geos.GEOSWKTWriter_setTrim = null

  /**
 * Sets the number trimming option on a GEOSWKTWriter.
 * With trim set to 1, the writer will strip trailing 0's from
 * the output coordinates. With 0, all coordinates will be
 * padded with 0's out to the rounding precision.
 * @param {number} handle - A pointer to the GEOS context handle.
 * @param {number} writer - The GEOSWKTWriter object.
 * @param {number} trim - The trimming option (0 or 1).
 * @alias module:geos
  */
  geos.GEOSWKTWriter_setTrim_r = Module.cwrap('GEOSWKTWriter_setTrim_r', null, ['number', 'number', 'number'])

  /**
 * Sets the number places after the decimal to output in WKT.
 * Default 16.
 * @param {number} writer - The GEOSWKTWriter object.
 * @param {number} precision - The number of decimal places.
 * @alias module:geos
  */
  geos.GEOSWKTWriter_setRoundingPrecision = null

  /**
 * Sets the number places after the decimal to output in WKT.
 * Default 16.
 * @param {number} handle - A pointer to the GEOS context handle.
 * @param {number} writer - The GEOSWKTWriter object.
 * @param {number} precision - The number of decimal places.
 * @alias module:geos
  */
  geos.GEOSWKTWriter_setRoundingPrecision_r = Module.cwrap('GEOSWKTWriter_setRoundingPrecision_r', null, ['number', 'number', 'number'])

  /**
 * Sets the output dimension on a GEOSWKTWriter.
 * If the specified dimension is 2, any input geometries
 * that have a higher dimension will be flattened to 2D
 * by dropping their z value. If the specified dimension is 3,
 * any input geometries that have a lower dimension will be
 * promoted to 3D by appending a z value of 0.
 * @param {number} writer - The GEOSWKTWriter object.
 * @param {number} dim - The output dimension (2 or 3).
 * @alias module:geos
  */
  geos.GEOSWKTWriter_setOutputDimension = null

  /**
 * Sets the output dimension on a GEOSWKTWriter.
 * If the specified dimension is 2, any input geometries
 * that have a higher dimension will be flattened to 2D
 * by dropping their z value. If the specified dimension is 3,
 * any input geometries that have a lower dimension will be
 * promoted to 3D by appending a z value of 0.
 * @param {number} handle - A pointer to the GEOS context handle.
 * @param {number} writer - The GEOSWKTWriter object.
 * @param {number} dim - The output dimension (2 or 3).
 * @alias module:geos
  */
  geos.GEOSWKTWriter_setOutputDimension_r = Module.cwrap('GEOSWKTWriter_setOutputDimension_r', null, ['number', 'number', 'number'])

  /**
 * Get the output dimension of a GEOSWKTWriter object.
 * @param {number} writer - A pointer to a GEOSWKTWriter object.
 * @return {number} The output dimension, either 2 or 3.
 * @see https://github.com/libgeos/geos/blob/main/capi/geos_c.h.in
 * @alias module:geos
  */
  geos.GEOSWKTWriter_getOutputDimension = null

  /**
 * Get the output dimension of a GEOSWKTWriter object (thread-safe version).
 * @param {number} handle - A GEOS context handle.
 * @param {number} writer - A pointer to a GEOSWKTWriter object.
 * @return {number} The output dimension, either 2 or 3.
 * @see https://github.com/libgeos/geos/blob/main/capi/geos_c.h.in
 * @alias module:geos
  */
  geos.GEOSWKTWriter_getOutputDimension_r = Module.cwrap('GEOSWKTWriter_getOutputDimension_r', 'number', ['number', 'number'])

  /**
 * Set whether to use the old-style 3D WKT representation (Z inside brackets).
 * @param {number} writer - A pointer to a GEOSWKTWriter object.
 * @param {number} useOld3D - A boolean value indicating whether to use the old-style 3D WKT representation.
 * @see https://github.com/libgeos/geos/blob/main/capi/geos_c.h.in
 * @alias module:geos
  */
  geos.GEOSWKTWriter_setOld3D = null

  /**
 * Set whether to use the old-style 3D WKT representation (Z inside brackets) (thread-safe version).
 * @param {number} handle - A GEOS context handle.
 * @param {number} writer - A pointer to a GEOSWKTWriter object.
 * @param {number} useOld3D - A boolean value indicating whether to use the old-style 3D WKT representation.
 * @see https://github.com/libgeos/geos/blob/main/capi/geos_c.h.in
 * @alias module:geos
  */
  geos.GEOSWKTWriter_setOld3D_r = Module.cwrap('GEOSWKTWriter_setOld3D_r', null, ['number', 'number', 'number'])

  /**
 * Create a new GEOSWKBReader object.
 * @return {number} A pointer to a newly allocated GEOSWKBReader object.
 * @see https://github.com/libgeos/geos/blob/main/capi/geos_c.h.in
 * @alias module:geos
  */
  geos.GEOSWKBReader_create = null

  /**
 * Creates a new WKB reader object.
 * @param {number} handle - The GEOS context pointer handle.
 * @returns {number} - The pointer to the WKB reader object.
 * @alias module:geos
  */
  geos.GEOSWKBReader_create_r = Module.cwrap('GEOSWKBReader_create_r', 'number', ['number'])

  /**
 * Destroys a WKB reader object.
 * @param {number} reader - The pointer to the WKB reader object.
 * @alias module:geos
  */
  geos.GEOSWKBReader_destroy = null

  /**
 * Destroys a WKB reader object using a context handle.
 * @param {number} handle - The GEOS context pointer handle.
 * @param {number} reader - The pointer to the WKB reader object.
 * @alias module:geos
  */
  geos.GEOSWKBReader_destroy_r = Module.cwrap('GEOSWKBReader_destroy_r', null, ['number', 'number'])

  /**
* Set the reader to automatically repair structural errors
* in the input (currently just unclosed rings) while reading.
* @param {number} handle - The GEOS context pointer handle.
* @param {number} reader A WKB reader object, caller retains ownership
* @param {number} doFix Set to 1 to repair, 0 for no repair (default).
*/
  geos.GEOSWKBReader_setFixStructure_r = Module.cwrap('GEOSWKBReader_setFixStructure_r', null, ['number', 'number', 'number'])

  /**
* Set the reader to automatically repair structural errors
* in the input (currently just unclosed rings) while reading.
* @param {number} reader A WKB reader object, caller retains ownership
* @param {number} doFix Set to 1 to repair, 0 for no repair (default).
*/
  geos.GEOSWKBReader_setFixStructure = null

  /**
 * Reads a geometry from a WKB byte buffer.
 * @param {number} reader - The pointer to the WKB reader object.
 * @param {string} wkb - The WKB byte buffer as a hex string.
 * @param {number} size - The size of the WKB byte buffer in bytes.
 * @returns {number} - The pointer to the geometry object, or null if an error occurred.
 * @alias module:geos
  */
  geos.GEOSWKBReader_read = null

  /**
 * Reads a geometry from a WKB byte buffer using a context handle.
 * @param {number} handle - The GEOS context pointer handle.
 * @param {number} reader - The pointer to the WKB reader object.
 * @param {string} wkb - The WKB byte buffer as a hex string.
 * @param {number} size - The size of the WKB byte buffer in bytes.
 * @returns {number} - The pointer to the geometry object, or null if an error occurred.
 * @alias module:geos
  */
  geos.GEOSWKBReader_read_r = Module.cwrap('GEOSWKBReader_read_r', 'number', ['number', 'number', 'number', 'number'])

  /**
 * Reads a geometry from a hexadecimal WKB representation.
 * @param {number} reader - A pointer to a GEOSWKBReader object.
 * @param {string} hex - A hexadecimal string representing the WKB of the geometry.
 * @param {number} size - The length of the hexadecimal string.
 * @returns {number} A pointer to a GEOSGeometry object, or null on error.
 * @alias module:geos
  */
  geos.GEOSWKBReader_readHEX = null

  /**
 * Reads a geometry from a hexadecimal WKB representation with a context handle.
 * @param {number} handle - A GEOSContextHandle_t object.
 * @param {number} reader - A pointer to a GEOSWKBReader object.
 * @param {string} hex - A hexadecimal string representing the WKB of the geometry.
 * @param {number} size - The length of the hexadecimal string.
 * @returns {number} A pointer to a GEOSGeometry object, or null on error.
 * @alias module:geos
  */
  geos.GEOSWKBReader_readHEX_r = Module.cwrap('GEOSWKBReader_readHEX_r', 'number', ['number', 'number', 'string', 'number'])

  /**
 * Creates a new GEOSWKBWriter object.
 * @returns {number} A pointer to a GEOSWKBWriter object, or null on error.
 * @alias module:geos
  */
  geos.GEOSWKBWriter_create = null

  /**
 * Creates a new GEOSWKBWriter object with a context handle.
 * @param {number} handle - A GEOSContextHandle_t object.
 * @returns {number} A pointer to a GEOSWKBWriter object, or null on error.
 * @alias module:geos
  */
  geos.GEOSWKBWriter_create_r = Module.cwrap('GEOSWKBWriter_create_r', 'number', ['number'])

  /**
 * Destroys a GEOSWKBWriter object.
 * @param {number} writer - A pointer to a GEOSWKBWriter object.
 * @alias module:geos
  */
  geos.GEOSWKBWriter_destroy = null

  /**
 * Destroys a GEOSWKBWriter object.
 * @param {number} handle - A pointer to the GEOS context handle.
 * @param {number} writer - The GEOSWKBWriter object to destroy.
 * @alias module:geos
  */
  geos.GEOSWKBWriter_destroy_r = Module.cwrap('GEOSWKBWriter_destroy_r', null, ['number', 'number'])

  /**
 * Writes a geometry as a WKB byte array.
 * @param {number} writer - The GEOSWKBWriter object to use.
 * @param {number} g - The GEOSGeometry object to write.
 * @returns {string} A WKB byte array as a string.
 * @alias module:geos
  */
  geos.GEOSWKBWriter_write = null

  /**
 * Writes a geometry as a WKB byte array with a context handle.
 * @param {number} handle - A pointer to the GEOS context handle.
 * @param {number} writer - The GEOSWKBWriter object to use.
 * @param {number} g - The GEOSGeometry object to write.
 * @param {number} size - A pointer to store the size of the output array.
 * @returns {string} A WKB byte array as a string.
 * @alias module:geos
  */
  geos.GEOSWKBWriter_write_r = Module.cwrap('GEOSWKBWriter_write_r', 'string', ['number', 'number', 'number', 'number'])

  /**
 * Writes a geometry as a WKB hex-encoded byte array.
 * @param {number} writer - The GEOSWKBWriter object to use.
 * @param {number} g - The GEOSGeometry object to write.
 * @param {number} size - A pointer to store the size of the output array.
 * @returns {string} A WKB hex-encoded byte array as a string.
 * @alias module:geos
  */
  geos.GEOSWKBWriter_writeHEX = null

  /**
 * Writes a geometry as a WKB hex-encoded byte array with a context handle.
 * @param {number} handle - A pointer to the GEOS context handle.
 * @param {number} writer - The GEOSWKBWriter object to use.
 * @param {number} g - The GEOSGeometry object to write.
 * @param {number} size - A pointer to store the size of the output array.
 * @returns {string} A WKB hex-encoded byte array as a string.
 * @alias module:geos
  */
  geos.GEOSWKBWriter_writeHEX_r = Module.cwrap('GEOSWKBWriter_writeHEX_r', 'string', ['number', 'number', 'number', 'number'])

  /**
 * Get the output dimension of a WKBWriter object.
 * @param {number} writer - A pointer to a GEOSWKBWriter object.
 * @return {number} The output dimension (2 or 3).
 * @alias module:geos
  */
  geos.GEOSWKBWriter_getOutputDimension = null

  /**
 * Get the output dimension of a WKBWriter object (thread-safe).
 * @param {number} handle - A pointer to a GEOS context handle.
 * @param {number} writer - A pointer to a GEOSWKBWriter object.
 * @return {number} The output dimension (2 or 3).
 * @alias module:geos
  */
  geos.GEOSWKBWriter_getOutputDimension_r = Module.cwrap('GEOSWKBWriter_getOutputDimension_r', 'number', ['number', 'number'])

  /**
 * Set the output dimension of a WKBWriter object.
 * @param {number} writer - A pointer to a GEOSWKBWriter object.
 * @param {number} newDimension - The new output dimension (2 or 3).
 * @alias module:geos
  */
  geos.GEOSWKBWriter_setOutputDimension = null

  /**
 * Set the output dimension of a WKBWriter object (thread-safe).
 * @param {number} handle - A pointer to a GEOS context handle.
 * @param {number} writer - A pointer to a GEOSWKBWriter object.
 * @param {number} newDimension - The new output dimension (2 or 3).
 * @alias module:geos
  */
  geos.GEOSWKBWriter_setOutputDimension_r = Module.cwrap('GEOSWKBWriter_setOutputDimension_r', null, ['number', 'number', 'number'])

  /**
 * Get the byte order of a WKBWriter object.
 * @param {number} writer - A pointer to a GEOSWKBWriter object.
 * @return {number} The byte order (0 for big endian, 1 for little endian).
 * @alias module:geos
  */
  geos.GEOSWKBWriter_getByteOrder = null

  /**
 * Returns the byte order used by the writer.
 * @param {number} handle - A pointer to the GEOS context handle.
 * @param {number} writer - The GEOSWKBWriter pointer.
 * @returns {number} The byte order (GEOS_WKB_XDR or GEOS_WKB_NDR).
 * @alias module:geos
  */
  geos.GEOSWKBWriter_getByteOrder_r = Module.cwrap('GEOSWKBWriter_getByteOrder_r', 'number', ['number', 'number'])

  /**
 * Sets the byte order for the writer.
 * @param {number} writer - The GEOSWKBWriter pointer.
 * @param {number} byteOrder - The byte order to use (GEOS_WKB_XDR or GEOS_WKB_NDR).
 * @alias module:geos
  */
  geos.GEOSWKBWriter_setByteOrder = null

  /**
 * Sets the byte order for the writer with a context handle.
 * @param {number} handle - A pointer to the GEOS context handle.
 * @param {number} writer - The GEOSWKBWriter pointer.
 * @param {number} byteOrder - The byte order to use (GEOS_WKB_XDR or GEOS_WKB_NDR).
 * @alias module:geos
  */
  geos.GEOSWKBWriter_setByteOrder_r = Module.cwrap('GEOSWKBWriter_setByteOrder_r', null, ['number', 'number', 'number'])

  /**
 * Returns whether the writer includes SRID values in output WKB.
 * @param {number} writer - The GEOSWKBWriter pointer.
 * @returns {number} 1 if SRID values are included, 0 otherwise.
 * @alias module:geos
  */
  geos.GEOSWKBWriter_getIncludeSRID = null

  /**
 * Returns whether the writer includes SRID values in output WKB with a context handle.
 * @param {number} handle - A pointer to the GEOS context handle.
 * @param {number} writer - The GEOSWKBWriter pointer.
 * @returns {number} 1 if SRID values are included, 0 otherwise.
 * @alias module:geos
  */
  geos.GEOSWKBWriter_getIncludeSRID_r = Module.cwrap('GEOSWKBWriter_getIncludeSRID_r', 'number', ['number', 'number'])

  /**
 * Sets whether output WKB should have an SRID header.
 * @param {number} writer - A GEOSWKBWriter pointer.
 * @param {number} writeSRID - A boolean value indicating whether to include SRID or not.
 * @alias module:geos
  */
  geos.GEOSWKBWriter_setIncludeSRID = null

  /**
 * Sets whether output WKB should have an SRID header, with a context handle.
 * @param {number} handle - A GEOSContextHandle pointer.
 * @param {number} writer - A GEOSWKBWriter pointer.
 * @param {number} writeSRID - A boolean value indicating whether to include SRID or not.
 * @alias module:geos
  */
  geos.GEOSWKBWriter_setIncludeSRID_r = Module.cwrap('GEOSWKBWriter_setIncludeSRID_r', null, ['number', 'number', 'number'])

  /**
 * Creates a prepared geometry from a regular geometry.
 * @param {number} g - A GEOSGeometry pointer.
 * @returns {number} A GEOSPreparedGeometry pointer, or NULL on exception.
 * @alias module:geos
  */
  geos.GEOSPrepare = null

  /**
 * Creates a prepared geometry from a regular geometry, with a context handle.
 * @param {number} handle - A GEOSContextHandle pointer.
 * @param {number} g - A GEOSGeometry pointer.
 * @returns {number} A GEOSPreparedGeometry pointer, or NULL on exception.
 * @alias module:geos
  */
  geos.GEOSPrepare_r = Module.cwrap('GEOSPrepare_r', 'number', ['number', 'number'])

  /**
 * Destroys a prepared geometry.
 * @param {number} g - A GEOSPreparedGeometry pointer.
 * @alias module:geos
  */
  geos.GEOSPreparedGeom_destroy = null

  /**
 * Destroys a prepared geometry object.
 * @param {number} handle - A pointer to the GEOS context handle.
 * @param {number} prepGeom - The pointer to the prepared geometry object to be destroyed.
 * @alias module:geos
  */
  geos.GEOSPreparedGeom_destroy_r = Module.cwrap('GEOSPreparedGeom_destroy_r', null, ['number', 'number'])

  /**
 * Tests whether a prepared geometry contains another geometry.
 * @param {number} handle - A pointer to the GEOS context handle.
 * @param {number} prepGeom1 - The pointer to the prepared geometry object that is the potential container.
 * @param {number} geom2 - The pointer to the geometry object that is the potential containee.
 * @returns {number} 1 if prepGeom1 contains geom2, 0 if not, or -1 on error.
 * @alias module:geos
  */
  geos.GEOSPreparedContains_r = Module.cwrap('GEOSPreparedContains_r', 'number', ['number', 'number', 'number'])

  /**
 * Tests whether a prepared geometry contains another geometry.
 * @param {number} prepGeom1 - The pointer to the prepared geometry object that is the potential container.
 * @param {number} geom2 - The pointer to the geometry object that is the potential containee.
 * @returns {number} 1 if prepGeom1 contains geom2, 0 if not, or -1 on error.
 * @alias module:geos
  */
  geos.GEOSPreparedContains = null

  /**
* Use a @ref GEOSPreparedGeometry do a high performance
* calculation of whether the provided point is contained.
* @param {number} handle - A pointer to the GEOS context handle.
* @param {number} pg1 The prepared geometry
* @param {number} x x coordinate of point to test
* @param {number} y y coordinate of point to test
* @returns {number} 1 on true, 0 on false, 2 on exception
* @see GEOSContains
*/
  geos.GEOSPreparedContainsXY_r = Module.cwrap('GEOSPreparedContainsXY_r', 'number', ['number', 'number', 'number', 'number'])

  /**
* Use a @ref GEOSPreparedGeometry do a high performance
* calculation of whether the provided point is contained.
* @param {number} pg1 The prepared geometry
* @param {number} x x coordinate of point to test
* @param {number} y y coordinate of point to test
* @returns {number} 1 on true, 0 on false, 2 on exception
* @see GEOSContains
*/
  geos.GEOSPreparedContainsXY = null

  /**
 * Tests whether a prepared geometry properly contains another geometry. Proper containment means that the test geometry is contained in the interior of the target geometry, and does not intersect its boundary.
 * @param {number} handle - A pointer to the GEOS context handle.
 * @param {number} prepGeom1 - The pointer to the prepared geometry object that is the potential container.
 * @param {number} geom2 - The pointer to the geometry object that is the potential containee.
 * @returns {number} 1 if prepGeom1 properly contains geom2, 0 if not, or -1 on error.
 * @alias module:geos
  */
  geos.GEOSPreparedContainsProperly_r = Module.cwrap('GEOSPreparedContainsProperly_r', 'number', ['number', 'number', 'number'])

  /**
 * Tests whether a prepared geometry properly contains another geometry. Proper containment means that the test geometry is contained in the interior of the target geometry, and does not intersect its boundary.
 * @param {number} prepGeom1 - The pointer to the prepared geometry object that is the potential container.
 * @param {number} geom2 - The pointer to the geometry object that is the potential containee.
 * @returns {number} 1 if prepGeom1 properly contains geom2, 0 if not, or -1 on error.
 * @alias module:geos
  */
  geos.GEOSPreparedContainsProperly = null

  /**
 * Tests whether a geometry is covered by another geometry.
 * @param {number} pg1 - A pointer to a prepared geometry.
 * @param {number} g2 - A pointer to a geometry.
 * @return {number} 1 if g2 is covered by pg1, 0 if not, -1 on exception.
 * @alias module:geos
  */
  geos.GEOSPreparedCoveredBy = null

  /**
 * Tests whether a geometry is covered by another geometry, using a GEOS context handle.
 * @param {number} handle - A GEOS context handle.
 * @param {number} pg1 - A pointer to a prepared geometry.
 * @param {number} g2 - A pointer to a geometry.
 * @return {number} 1 if g2 is covered by pg1, 0 if not, -1 on exception.
 * @alias module:geos
  */
  geos.GEOSPreparedCoveredBy_r = Module.cwrap('GEOSPreparedCoveredBy_r', 'number', ['number', 'number', 'number'])

  /**
 * Tests whether a geometry covers another geometry.
 * @param {number} pg1 - A pointer to a prepared geometry.
 * @param {number} g2 - A pointer to a geometry.
 * @return {number} 1 if pg1 covers g2, 0 if not, -1 on exception.
 * @alias module:geos
  */
  geos.GEOSPreparedCovers = null

  /**
 * Tests whether a geometry covers another geometry, using a GEOS context handle.
 * @param {number} handle - A GEOS context handle.
 * @param {number} pg1 - A pointer to a prepared geometry.
 * @param {number} g2 - A pointer to a geometry.
 * @return {number} 1 if pg1 covers g2, 0 if not, -1 on exception.
 * @alias module:geos
  */
  geos.GEOSPreparedCovers_r = Module.cwrap('GEOSPreparedCovers_r', 'number', ['number', 'number', 'number'])

  /**
 * Tests whether a geometry crosses another geometry.
 * @param {number} pg1 - A pointer to a prepared geometry.
 * @param {number} g2 - A pointer to a geometry.
 * @return {number} 1 if pg1 crosses g2, 0 if not, -1 on exception.
 * @alias module:geos
  */
  geos.GEOSPreparedCrosses = null

  /**
 * Computes whether the given geometries cross.
 * @param {number} handle - A pointer to the GEOS context handle.
 * @param {number} pg1 - The first prepared geometry.
 * @param {number} g2 - The second geometry.
 * @return {number} 1 if the geometries cross, 0 if they do not, or -1 on error.
 * @alias module:geos
  */
  geos.GEOSPreparedCrosses_r = Module.cwrap('GEOSPreparedCrosses_r', 'number', ['number', 'number', 'number'])

  /**
 * Computes whether the given geometries are disjoint.
 * @param {number} pg1 - The first prepared geometry.
 * @param {number} g2 - The second geometry.
 * @return {number} 1 if the geometries are disjoint, 0 if they are not, or -1 on error.
 * @alias module:geos
  */
  geos.GEOSPreparedDisjoint = null

  /**
 * Computes whether the given geometries are disjoint.
 * @param {number} handle - A pointer to the GEOS context handle.
 * @param {number} pg1 - The first prepared geometry.
 * @param {number} g2 - The second geometry.
 * @return {number} 1 if the geometries are disjoint, 0 if they are not, or -1 on error.
 * @alias module:geos
  */
  geos.GEOSPreparedDisjoint_r = Module.cwrap('GEOSPreparedDisjoint_r', 'number', ['number', 'number', 'number'])

  /**
 * Computes whether the given geometries intersect.
 * @param {number} pg1 - The first prepared geometry.
 * @param {number} g2 - The second geometry.
 * @return {number} 1 if the geometries intersect, 0 if they do not, or -1 on error.
 * @alias module:geos
  */
  geos.GEOSPreparedIntersects = null

  /**
 * Computes whether the given geometries intersect.
 * @param {number} handle - A pointer to the GEOS context handle.
 * @param {number} pg1 - The first prepared geometry.
 * @param {number} g2 - The second geometry.
 * @return {number} 1 if the geometries intersect, 0 if they do not, or -1 on error.
 * @alias module:geos
  */
  geos.GEOSPreparedIntersects_r = Module.cwrap('GEOSPreparedIntersects_r', 'number', ['number', 'number', 'number'])

  /**
* Use a @ref GEOSPreparedGeometry do a high performance
* calculation of whether the provided point intersects.
* @param {number} handle - A pointer to the GEOS context handle.
* @param {number} pg1 The prepared geometry
* @param {number} x x coordinate of point to test
* @param {number} y y coordinate of point to test
* @returns {number} 1 on true, 0 on false, 2 on exception
* @see GEOSIntersects
*/
  geos.GEOSPreparedIntersectsXY_r = Module.cwrap('GEOSPreparedIntersectsXY_r', 'number', ['number', 'number', 'number', 'number'])

  /**
* Use a @ref GEOSPreparedGeometry do a high performance
* calculation of whether the provided point intersects.
* @param {number} pg1 The prepared geometry
* @param {number} x x coordinate of point to test
* @param {number} y y coordinate of point to test
* @returns {number} 1 on true, 0 on false, 2 on exception
* @see GEOSIntersects
*/
  geos.GEOSPreparedIntersectsXY = null

  /**
 * Tests whether two geometries overlap.
 * @param {number} pg1 - A pointer to the first prepared geometry.
 * @param {number} g2 - A pointer to the second geometry.
 * @returns {number} 1 if the geometries overlap, 0 if not, -1 on exception.
 * @alias module:geos
  */
  geos.GEOSPreparedOverlaps = null

  /**
 * Tests whether two geometries overlap, using a context handle.
 * @param {number} handle - The context handle.pointer
 * @param {number} pg1 - A pointer to the first prepared geometry.
 * @param {number} g2 - A pointer to the second geometry.
 * @returns {number} 1 if the geometries overlap, 0 if not, -1 on exception.
 * @alias module:geos
  */
  geos.GEOSPreparedOverlaps_r = Module.cwrap('GEOSPreparedOverlaps_r', 'number', ['number', 'number', 'number'])

  /**
 * Tests whether two geometries touch at one or more points.
 * @param {number} pg1 - A pointer to the first prepared geometry.
 * @param {number} g2 - A pointer to the second geometry.
 * @returns {number} 1 if the geometries touch, 0 if not, -1 on exception.
 * @alias module:geos
  */
  geos.GEOSPreparedTouches = null

  /**
 * Tests whether two geometries touch at one or more points, using a context handle.
 * @param {number} handle - The context handle.pointer
 * @param {number} pg1 - A pointer to the first prepared geometry.
 * @param {number} g2 - A pointer to the second geometry.
 * @returns {number} 1 if the geometries touch, 0 if not, -1 on exception.
 * @alias module:geos
  */
  geos.GEOSPreparedTouches_r = Module.cwrap('GEOSPreparedTouches_r', 'number', ['number', 'number', 'number'])

  /**
 * Tests whether the first geometry is within the second geometry.
 * @param {number} pg1 - A pointer to the first prepared geometry.
 * @param {number} g2 - A pointer to the second geometry.
 * @returns {number} 1 if the first geometry is within the second geometry, 0 if not, -1 on exception.
 * @alias module:geos
  */
  geos.GEOSPreparedWithin = null

  /**
 * Tests whether a geometry is within another geometry.
 * @param {number} handle - The GEOS context pointer handle.
 * @param {number} pg1 - A pointer to the prepared geometry to test.
 * @param {number} g2 - A pointer to the geometry to test against.
 * @returns {number} 1 if pg1 is within g2, 0 otherwise, or -1 on error.
 * @alias module:geos
  */
  geos.GEOSPreparedWithin_r = Module.cwrap('GEOSPreparedWithin_r', 'number', ['number', 'number', 'number'])

  /**
 * Computes the nearest points of two geometries.
 * @param {number} pg1 - A pointer to the first prepared geometry.
 * @param {number} g2 - A pointer to the second geometry.
 * @returns {number} A pointer to a coordinate sequence containing the nearest points, or NULL on error.
 * @alias module:geos
  */
  geos.GEOSPreparedNearestPoints = null

  /**
 * Computes the nearest points of two geometries using a GEOS context handle.
 * @param {number} handle - The GEOS context pointer handle.
 * @param {number} pg1 - A pointer to the first prepared geometry.
 * @param {number} g2 - A pointer to the second geometry.
 * @returns {number} A pointer to a coordinate sequence containing the nearest points, or NULL on error.
 * @alias module:geos
  */
  geos.GEOSPreparedNearestPoints_r = Module.cwrap('GEOSPreparedNearestPoints_r', 'number', ['number', 'number', 'number'])

  /**
 * Computes the distance between two geometries using a prepared geometry for the first argument.
 * @param {number} pg1 - A pointer to the prepared geometry to compute the distance from.
 * @param {number} g2 - A pointer to the geometry to compute the distance to.
 * @param {number} dist - A pointer to a double variable to store the distance result.
 * @returns {number} 1 if the distance was computed successfully, 0 otherwise, or -1 on error.
 * @alias module:geos
  */
  geos.GEOSPreparedDistance = null

  /**
 * Computes the distance between two geometries using a prepared geometry for the first argument and a GEOS context handle.
 * @param {number} handle - The GEOS context pointer handle.
 * @param {number} pg1 - A pointer to the prepared geometry to compute the distance from.
 * @param {number} g2 - A pointer to the geometry to compute the distance to.
 * @param {number} dist - A pointer to a double variable to store the distance result.
 * @returns {number} 1 if the distance was computed successfully, 0 otherwise, or -1 on error.
 * @alias module:geos
  */
  geos.GEOSPreparedDistance_r = Module.cwrap('GEOSPreparedDistance_r', 'number', ['number', 'number', 'number', 'number'])

  /**
 * Creates a GEOS STRTree, a spatial index for quickly querying geometries by their bounding boxes.
 * @param {number} nodeCapacity - The maximum number of child nodes that a node may have. The minimum recommended capacity value is 4. If unsure, use a default node capacity of 10.
 * @returns {number} A pointer to the GEOS STRTree object.
 * @alias module:geos
  */
  geos.GEOSSTRtree_create = null

  /**
 * Creates a GEOS STRTree with a context handle, a spatial index for quickly querying geometries by their bounding boxes.
 * @param {number} handle - The context handle to use for error reporting and memory management.
 * @param {number} nodeCapacity - The maximum number of child nodes that a node may have. The minimum recommended capacity value is 4. If unsure, use a default node capacity of 10.
 * @returns {number} A pointer to the GEOS STRTree object.
 * @alias module:geos
  */
  geos.GEOSSTRtree_create_r = Module.cwrap('GEOSSTRtree_create_r', 'number', ['number', 'number'])

  /**
  * Construct an STRtree from items that have been inserted. Once constructed,
  * no more items may be inserted into the tree. Functions that require a
  * constructed tree will build it automatically, so there is no need to call
  * `GEOSSTRtree_build` unless it is desired to explicity construct the tree
  * in a certain section of code or using a certain thread.
  *
  * @param {number} handle - The context handle to use for error reporting and memory management.
  * @return {number} 1 on success, 0 on error
  */
  geos.GEOSSTRtree_build_r = Module.cwrap('GEOSSTRtree_build_r', 'number', ['number'])

  /**
* Construct an STRtree from items that have been inserted. Once constructed,
* no more items may be inserted into the tree. Functions that require a
* constructed tree will build it automatically, so there is no need to call
* `GEOSSTRtree_build` unless it is desired to explicity construct the tree
* in a certain section of code or using a certain thread.
*
* @return {number} 1 on success, 0 on error
*/
  geos.GEOSSTRtree_build = null

  /**
 * Inserts a geometry into a GEOS STRTree, along with an associated item that can be retrieved later.
 * @param {number} tree - A pointer to the GEOS STRTree object.
 * @param {number} g - A pointer to the GEOS geometry object to insert.
 * @param {number} item - A pointer to the item associated with the geometry. This can be any arbitrary data that can be cast to a void pointer.
 * @alias module:geos
  */
  geos.GEOSSTRtree_insert = null

  /**
 * Inserts a geometry into a GEOS STRTree with a context handle, along with an associated item that can be retrieved later.
 * @param {number} handle - The context handle to use for error reporting and memory management.
 * @param {number} tree - A pointer to the GEOS STRTree object.
 * @param {number} g - A pointer to the GEOS geometry object to insert.
 * @param {number} item - A pointer to the item associated with the geometry. This can be any arbitrary data that can be cast to a void pointer.
 * @alias module:geos
  */
  geos.GEOSSTRtree_insert_r = Module.cwrap('GEOSSTRtree_insert_r', null, ['number', 'number', 'number', 'number'])

  /**
 * Queries a GEOS STRTree for all geometries whose bounding boxes intersect with the given geometry's bounding box, and calls a callback function for each matching pair.
 * @param {number} tree - A pointer to the GEOS STRTree object.
 * @param {number} g - A pointer to the GEOS geometry object to query with.
 * @param {function} callback - A function that takes two void pointers as arguments: one for the item associated with the tree geometry, and one for the user data passed to this function. The callback function is called for each matching pair of geometries in the tree and the query geometry. The callback function should return 1 to continue the query or 0 to stop it.
 * @param {any} userdata - A pointer to any user data that needs to be passed to the callback function. This can be any arbitrary data that can be cast to a void pointer.
 * @alias module:geos
  */
  geos.GEOSSTRtree_query = null

  /**
 * Queries the tree for all items whose extents intersect the given geometry's envelope and applies an
 * item visitor function to them.
 * @param {number} handle - A pointer to the GEOS context handle.
 * @param {number} tree - The GEOSSTRtree to query.
 * @param {number} g - The GEOSGeometry whose envelope is used for querying.
 * @param {number} callback - The GEOSQueryCallback function to apply to the items found.
 * @param {number} userdata - An optional pointer to user data that is passed to the callback function.
 * @alias module:geos
  */
  geos.GEOSSTRtree_query_r = Module.cwrap('GEOSSTRtree_query_r', null, ['number', 'number', 'number', 'number', 'number'])

  /**
 * Returns the item whose extent is nearest to the given geometry's envelope.
 * @param {number} tree - The GEOSSTRtree to query.
 * @param {number} geom - The GEOSGeometry whose envelope is used for querying.
 * @returns {number} A pointer to the nearest item, or NULL if the tree is empty.
 * @alias module:geos
  */
  geos.GEOSSTRtree_nearest = null

  /**
 * Returns the item whose extent is nearest to the given geometry's envelope, using a custom distance function.
 * @param {number} handle - A pointer to the GEOS context handle.
 * @param {number} tree - The GEOSSTRtree to query.
 * @param {number} geom - The GEOSGeometry whose envelope is used for querying.
 * @returns {number} A pointer to the nearest item, or NULL if the tree is empty or an error occurred.
 * @alias module:geos
  */
  geos.GEOSSTRtree_nearest_r = Module.cwrap('GEOSSTRtree_nearest_r', 'number', ['number', 'number', 'number'])

  /**
 * Returns the item whose extent is nearest to the given item's envelope, using a custom distance function.
 * @param {number} tree - The GEOSSTRtree to query.
 * @param {any} item - The item whose envelope is used for querying.
 * @param {number} itemEnvelope - The GEOSGeometry representing the envelope of the item.
 * @param {function} distancefn - The GEOSDistanceCallback function to compute the distance between two items.
 * @param {any} userdata - An optional pointer to user data that is passed to the distance function.
 * @returns {any} A pointer to the nearest item, or NULL if the tree is empty or an error occurred.
 * @alias module:geos
  */
  geos.GEOSSTRtree_nearest_generic = null

  /**
 * Returns the item whose extent is nearest to the given item's envelope, using a custom distance function.
 * @param {number} handle - A pointer to the GEOS context handle.
 * @param {number} tree - The GEOSSTRtree to query.
 * @param {any} item - The item whose envelope is used for querying.
 * @param {number} itemEnvelope - The GEOSGeometry representing the envelope of the item.
 * @param {function} distancefn - The GEOSDistanceCallback function to compute the distance between two items.
 * @param {any} userdata - An optional pointer to user data that is passed to the distance function and the callback function.
 * @returns {any} A pointer to the nearest item, or NULL if the tree is empty or an error occurred.
 * @alias module:geos
  */
  geos.GEOSSTRtree_nearest_generic_r = Module.cwrap('GEOSSTRtree_nearest_generic_r', 'number', ['number', 'number', 'number', 'number', 'number', 'number'])

  /**
 * Iterates over every item in an STRtree.
 * @param {number} tree - A pointer to a GEOSSTRtree object.
 * @param {function} callback - A function to be called for each item in the tree.
 * @param {any} userdata - An optional user data to be passed to the callback function.
 * @alias module:geos
  */
  geos.GEOSSTRtree_iterate = null

  /**
 * Iterates over every item in an STRtree using a reentrant context handle.
 * @param {number} handle - A pointer to a GEOSpointer  context handle.
 * @param {number} tree - A pointer to a GEOSSTRtree object.
 * @param {function} callback - A function to be called for each item in the tree.
 * @param {any} userdata - An optional user data to be passed to the callback function.
 * @alias module:geos
  */
  geos.GEOSSTRtree_iterate_r = Module.cwrap('GEOSSTRtree_iterate_r', null, ['number', 'number', 'number'])

  /**
 * Removes an item from an STRtree that has a matching geometry and user data.
 * @param {number} tree - A pointer to a GEOSSTRtree object.
 * @param {number} g - A pointer to a GEOSGeometry object representing the envelope of the item to be removed.
 * @param {any} item - The user data of the item to be removed.
 * @returns {number} 1 if the item was found and removed, 0 otherwise.
 * @alias module:geos
  */
  geos.GEOSSTRtree_remove = null

  /**
 * Removes an item from an STRtree that has a matching geometry and user data using a reentrant context handle.
 * @param {number} handle - A pointer to a GEOSpointer  context handle.
 * @param {number} tree - A pointer to a GEOSSTRtree object.
 * @param {number} g - A pointer to a GEOSGeometry object representing the envelope of the item to be removed.
 * @param {any} item - The user data of the item to be removed.
 * @returns {number} 1 if the item was found and removed, 0 otherwise.
 * @alias module:geos
  */
  geos.GEOSSTRtree_remove_r = Module.cwrap('GEOSSTRtree_remove_r', 'number', ['number', 'number', 'number', 'number'])

  /**
 * Destroys an STRtree and frees its memory.
 * @param {number} tree - A pointer to a GEOSSTRtree object.
 * @alias module:geos
  */
  geos.GEOSSTRtree_destroy = null

  /**
 * Destroys a GEOSSTRtree spatial index.
 * @param {number} handle - A pointer to the GEOS context handle.
 * @param {number} tree - The GEOSSTRtree pointer to destroy.
 * @see https://libgeos.org/doxygen/geos__c_8h.html#a1323e
 * @alias module:geos
  */
  geos.GEOSSTRtree_destroy_r = Module.cwrap('GEOSSTRtree_destroy_r', null, ['number', 'number'])

  /**
 * Returns the distance of a point projected on a line from the origin of the line.
 * @param {number} line - The GEOSGeometry pointer of the lineal geometry.
 * @param {number} point - The GEOSGeometry pointer of the point geometry.
 * @returns {number} The distance of the projected point along the line, or -1 on exception.
 * @see https://libgeos.org/doxygen/geos__c_8h.html#a557
 * @alias module:geos
  */
  geos.GEOSProject = null

  /**
 * Returns the distance of a point projected on a line from the origin of the line, using a reentrant context.
 * @param {number} handle - A pointer to the GEOS context handle.
 * @param {number} line - The GEOSGeometry pointer of the lineal geometry.
 * @param {number} point - The GEOSGeometry pointer of the point geometry.
 * @returns {number} The distance of the projected point along the line, or -1 on exception.
 * @see https://libgeos.org/doxygen/geos__c_8h_source.html#l00557
 * @alias module:geos
  */
  geos.GEOSProject_r = Module.cwrap('GEOSProject_r', 'number', ['number', 'number', 'number'])

  /**
 * Measuring from start of line, return point that is distance the start. Line parameter must be a LineString. The returned point is not guaranteed to intersect the line due to limitations of floating point calculations.
 * @param {number} line - The GEOSGeometry pointer of the lineal geometry.
 * @param {number} distance - The distance along the linestring to interpolate.
 * @returns {number} A new GEOSGeometry pointer representing the interpolated point, or NULL on exception.
 * @see https://libgeos.org/doxygen/geos__c_8h.html#a1849
 * @alias module:geos
  */
  geos.GEOSInterpolate = null

  /**
 * Measuring from start of line, return point that is distance the start. Line parameter must be a LineString. The returned point is not guaranteed to intersect the line due to limitations of floating point calculations.
 * @param {number} handle - A pointer to the GEOS context handle.
 * @param {number} line - The GEOSGeometry pointer of the lineal geometry.
 * @param {number} distance - The distance along the linestring to interpolate.
 * @returns {number} A new GEOSGeometry pointer representing the interpolated point, or NULL on exception.
 * @see https://libgeos.org/doxygen/geos__c_8h.html#a1850
 * @alias module:geos
  */
  geos.GEOSInterpolate_r = Module.cwrap('GEOSInterpolate_r', 'number', ['number', 'number', 'number'])

  /**
 * Returns the distance of point p projected on line g from the origin of g,
 * which must be a lineal geometry. The distance is normalized to the length of g.
 * @param {number} g - A pointer to a GEOSGeometry object representing a lineal geometry.
 * @param {number} p - A pointer to a GEOSGeometry object representing a point.
 * @returns {number} The normalized distance of p projected on g, or -1 on error.
 * @see {@link https://docs.rs/geos-sys/1.0.13/geos_sys/fn.GEOSProjectNormalized.html}
 * @alias module:geos
  */
  geos.GEOSProjectNormalized = null

  /**
 * Returns the distance of point p projected on line g from the origin of g,
 * which must be a lineal geometry. The distance is normalized to the length of g.
 * This is a thread-safe variant of GEOSProjectNormalized that takes a GEOS context handle as an argument.
 * @param {number} handle - A pointer to a GEOSContextHandle_t object.
 * @param {number} g - A pointer to a GEOSGeometry object representing a lineal geometry.
 * @param {number} p - A pointer to a GEOSGeometry object representing a point.
 * @returns {number} The normalized distance of p projected on g, or -1 on error.
 * @see {@link https://github.com/libgeos/geos/blob/main/capi/geos_c.h.in}
 * @alias module:geos
  */
  geos.GEOSProjectNormalized_r = Module.cwrap('GEOSProjectNormalized_r', 'number', ['number', 'number', 'number'])

  /**
 * Returns the point along line g representing the given distance from the origin along the geometry.
 * The distance is normalized to the length of g, which must be a lineal geometry.
 * @param {number} g - A pointer to a GEOSGeometry object representing a lineal geometry.
 * @param {number} d - The normalized distance along the linestring to interpolate.
 * @returns {number} A pointer to a new GEOSGeometry object representing the interpolated point, or NULL on error.
 * @see {@link https://rdrr.io/cran/geos/man/geos_project.html}
 * @alias module:geos
  */
  geos.GEOSInterpolateNormalized = null

  /**
 * Returns the point along line g representing the given distance from the origin along the geometry.
 * The distance is normalized to the length of g, which must be a lineal geometry.
 * This is a thread-safe variant of GEOSInterpolateNormalized that takes a GEOS context handle as an argument.
 * @param {number} handle - A pointer to a GEOSContextHandle_t object.
 * @param {number} g - A pointer to a GEOSGeometry object representing a lineal geometry.
 * @param {number} d - The normalized distance along the linestring to interpolate.
 * @returns {number} A pointer to a new GEOSGeometry object representing the interpolated point, or NULL on error.
 * @see {@link https://github.com/libgeos/geos/blob/main/capi/geos_c.h.in}
 * @alias module:geos
  */
  geos.GEOSInterpolateNormalized_r = Module.cwrap('GEOSInterpolateNormalized_r', 'number', ['number', 'number', 'number'])

  /**
 * Returns a multipoint containing all distinct vertices of input geometry g,
 * which can be any kind of geometry.
 * @param {number} g - A pointer to a GEOSGeometry object representing any kind of geometry.
 * @returns {number} A pointer to a new GEOSGeometry object representing a multipoint, or NULL on error.
 * @alias module:geos
  */
  geos.GEOSGeom_extractUniquePoints = null

  /**
 * Extracts every unique point from a geometry.
 * @param {number} handle - A pointer to the GEOS context handle.
 * @param {number} g - The geometry to extract points from.
 * @returns {number} A geometry containing the unique points, or null on exception.
 * @alias module:geos
  */
  geos.GEOSGeom_extractUniquePoints_r = Module.cwrap('GEOSGeom_extractUniquePoints_r', 'number', ['number', 'number'])

  /**
* Calculate the
* [Hilbert code](https://en.wikipedia.org/wiki/Hilbert_curve)
* of the centroid of a geometry relative to an extent.
* This allows sorting geometries in a deterministic way, such that similar Hilbert codes are
* likely to be near each other in two-dimensional space.
* The caller must ensure that the geometry is contained within the extent.
* @param {number} handle - A pointer to the GEOS context handle.
* @param {number} geom [in] Input geometry, must be non-empty
* @param {number} extent [in] Extent within which to calculate the Hilbert code for geom
* @param {number} level [in] The level of precision of the Hilbert curve, up to 16
* @param {number} code [out] Pointer to be filled in with Hilbert code result
* @return 1 on success, 0 on exception.
*/
  geos.GEOSHilbertCode_r = Module.cwrap('GEOSHilbertCode_r', 'number', ['number', 'number', 'number', 'number', 'number'])

  /**
* Calculate the
* [Hilbert code](https://en.wikipedia.org/wiki/Hilbert_curve)
* of the centroid of a geometry relative to an extent.
* This allows sorting geometries in a deterministic way, such that similar Hilbert codes are
* likely to be near each other in two-dimensional space.
* The caller must ensure that the geometry is contained within the extent.
* @param {number} handle - A pointer to the GEOS context handle.
* @param {number} geom [in] Input geometry, must be non-empty
* @param {number} extent [in] Extent within which to calculate the Hilbert code for geom
* @param {number} level [in] The level of precision of the Hilbert curve, up to 16
* @param {number} code [out] Pointer to be filled in with Hilbert code result
* @return 1 on success, 0 on exception.
*/
  geos.GEOSHilbertCode = null

  /**
* Apply XY coordinate transform callback to all coordinates in a copy of
* input geometry.  If the callback returns an error, returned geometry will be
* NULL.  Z values, if present, are not modified by this function.
* @param {number} handle - A pointer to the GEOS context handle.
* @param {number} g [in] Input geometry
* @param {number} callback [in] a function to be executed for each coordinate in the
                geometry.  The callback takes 3 parameters: x and y coordinate
                values to be updated and a void userdata pointer.
* @param {number} userdata an optional pointer to pe passed to 'callback' as an argument
* @return {number} a copy of the input geometry with transformed coordinates.
* Caller must free with GEOSGeom_destroy().
*/
  geos.GEOSGeom_transformXY_r = Module.cwrap('GEOSGeom_transformXY_r', 'number', ['number', 'number', 'number', 'number'])

  /**
* Apply XY coordinate transform callback to all coordinates in a copy of
* input geometry.  If the callback returns an error, returned geometry will be
* NULL.  Z values, if present, are not modified by this function.
* @param {number} g [in] Input geometry
* @param {number} callback [in] a function to be executed for each coordinate in the
              geometry.  The callback takes 3 parameters: x and y coordinate
              values to be updated and a void userdata pointer.
* @param {number} userdata an optional pointer to pe passed to 'callback' as an argument
* @return {number} a copy of the input geometry with transformed coordinates.
* Caller must free with GEOSGeom_destroy().
*/
  geos.GEOSGeom_transformXY = null

  /**
 * Creates an empty geometry collection of a given type.
 * @param {number} type - The geometry type, one of GEOS_GEOMETRYCOLLECTION, GEOS_MULTIPOINT, GEOS_MULTILINESTRING, GEOS_MULTIPOLYGON.
 * @returns {number} An empty geometry collection, or null on exception.
 * @alias module:geos
  */
  geos.GEOSGeom_createEmptyCollection = null

  /**
 * Creates an empty geometry collection of a given type with a context handle.
 * @param {number} handle - A pointer to the GEOS context handle.
 * @param {number} type - The geometry type, one of GEOS_GEOMETRYCOLLECTION, GEOS_MULTIPOINT, GEOS_MULTILINESTRING, GEOS_MULTIPOLYGON.
 * @returns {number} An empty geometry collection, or null on exception.
 * @alias module:geos
  */
  geos.GEOSGeom_createEmptyCollection_r = Module.cwrap('GEOSGeom_createEmptyCollection_r', 'number', ['number', 'number'])

  /**
 * Creates an empty point geometry.
 * @returns {number} An empty point geometry, or null on exception.
 * @alias module:geos
  */
  geos.GEOSGeom_createEmptyPoint = null

  /**
 * Creates an empty point geometry with a context handle.
 * @param {number} handle - A pointer to the GEOS context handle.
 * @returns {number} An empty point geometry, or null on exception.
 * @alias module:geos
  */
  geos.GEOSGeom_createEmptyPoint_r = Module.cwrap('GEOSGeom_createEmptyPoint_r', 'number', ['number'])

  /**
 * Creates an empty line string geometry.
 * @return {number} A pointer to a newly allocated empty line string geometry. NULL on exception.
 * Caller is responsible for freeing with GEOSGeom_destroy().
 * @see https://libgeos.org/usage/c_api/#geosgeom_createemptylinestring
 * @alias module:geos
  */
  geos.GEOSGeom_createEmptyLineString = null

  /**
 * Creates an empty line string geometry using a reentrant context handle.
 * @param {number} handle - A GEOSContextHandle_t created by GEOS_init_r().
 * @return {number} A pointer to a newly allocated empty line string geometry. NULL on exception.
 * Caller is responsible for freeing with GEOSGeom_destroy_r().
 * @see https://libgeos.org/usage/c_api/#geosgeom_createemptylinestring_r
 * @alias module:geos
  */
  geos.GEOSGeom_createEmptyLineString_r = Module.cwrap('GEOSGeom_createEmptyLineString_r', 'number', ['number'])

  /**
 * Creates an empty polygon geometry.
 * @return {number} A pointer to a newly allocated empty polygon geometry. NULL on exception.
 * Caller is responsible for freeing with GEOSGeom_destroy().
 * @see https://libgeos.org/usage/c_api/#geosgeom_createemptypolygon
 * @alias module:geos
  */
  geos.GEOSGeom_createEmptyPolygon = null

  /**
 * Creates an empty polygon geometry using a reentrant context handle.
 * @param {number} handle - A GEOSContextHandle_t created by GEOS_init_r().
 * @return {number} A pointer to a newly allocated empty polygon geometry. NULL on exception.
 * Caller is responsible for freeing with GEOSGeom_destroy_r().
 * @see https://libgeos.org/usage/c_api/#geosgeom_createemptypolygon_r
 * @alias module:geos
  */
  geos.GEOSGeom_createEmptyPolygon_r = Module.cwrap('GEOSGeom_createEmptyPolygon_r', 'number', ['number'])

  /**
 * Computes the orientation index of the direction of the point q relative to a directed infinite line specified by p1-p2.
 * The index indicates whether the point lies to the LEFT or RIGHT of the line, or lies on it COLLINEAR.
 * The index also indicates the orientation of the triangle formed by the three points (COUNTERCLOCKWISE, CLOCKWISE, or STRAIGHT).
 * @param {number} ax - The x coordinate of p1.
 * @param {number} ay - The y coordinate of p1.
 * @param {number} bx - The x coordinate of p2.
 * @param {number} by - The y coordinate of p2.
 * @param {number} px - The x coordinate of q.
 * @param {number} py - The y coordinate of q.
 * @return {number} The orientation index: 1 (LEFT), 0 (COLLINEAR), or -1 (RIGHT).
 * @see https://libgeos.org/doxygen/classgeos_1_1algorithm_1_1Orientation.html#a5b9f8c4a7c6f0a3f3a4e7c8d6b9a5d7b
 * @alias module:geos
  */
  geos.GEOSOrientationIndex = null

  /**
 * Computes the orientation index of the direction of the point q relative to
 * the directed line segment p1-p2.
 * @param {number} handle - A pointer to the GEOS context handle.
 * @param {number} Ax - The x-coordinate of the first point of the line segment.
 * @param {number} Ay - The y-coordinate of the first point of the line segment.
 * @param {number} Bx - The x-coordinate of the second point of the line segment.
 * @param {number} By - The y-coordinate of the second point of the line segment.
 * @param {number} Px - The x-coordinate of the point to test.
 * @param {number} Py - The y-coordinate of the point to test.
 * @returns {number} -1 if q lies to the left of p1-p2, 0 if q is collinear with p1-p2, 1 if q lies to the right of p1-p2.
 * @see {@link https://libgeos.org/doxygen/geos__c_8h.html}
 * @alias module:geos
  */
  geos.GEOSOrientationIndex_r = Module.cwrap('GEOSOrientationIndex_r', 'number', ['number', 'number', 'number', 'number', 'number', 'number', 'number'])

  /**
 * Computes a geometry representing the shared paths between two linear geometries.
 * @param {number} handle - A pointer to the GEOS context handle.
 * @param {number} g1 - A pointer to the first geometry. Must be linear.
 * @param {number} g2 - A pointer to the second geometry. Must be linear.
 * @returns {number} A pointer to the geometry representing the shared paths between g1 and g2, or NULL on exception.
 * @see {@link https://libgeos.org/doxygen/geos__c_8h.html}
 * @alias module:geos
  */
  geos.GEOSSharedPaths = null

  /**
 * Computes a geometry representing the shared paths between two linear geometries using a GEOS context handle.
 * @param {number} handle - A pointer to the GEOS context handle.
 * @param {number} g1 - A pointer to the first geometry. Must be linear.
 * @param {number} g2 - A pointer to the second geometry. Must be linear.
 * @returns {number} A pointer to the geometry representing the shared paths between g1 and g2, or NULL on exception.
 * @see {@link https://libgeos.org/doxygen/geos__c_8h.html}
 * @alias module:geos
  */
  geos.GEOSSharedPaths_r = Module.cwrap('GEOSSharedPaths_r', 'number', ['number', 'number', 'number'])

  /**
 * Snaps two geometries together with a given tolerance.
 * @param {number} handle - A pointer to the GEOS context handle.
 * @param {number} g1 - A pointer to the first geometry to snap.
 * @param {number} g2 - A pointer to the second geometry to snap.
 * @param {number} tolerance - The snapping tolerance to use, in same units as input geometries.
 * @returns {number} A pointer to a new snapped geometry, or NULL on exception.
 * @see {@link https://libgeos.org/doxygen/geos__c_8h.html}
 * @alias module:geos
  */
  geos.GEOSSnap = null

  /**
 * Snaps two geometries together with a given tolerance using a GEOS context handle.
 * @param {number} handle - A pointer to the GEOS context handle.
 * @param {number} g1 - A pointer to the first geometry to snap.
 * @param {number} g2 - A pointer to the second geometry to snap.
 * @param {number} tolerance - The snapping tolerance to use, in same units as input geometries.
 * @returns {number} A pointer to a new snapped geometry, or NULL on exception.
 * @see {@link https://libgeos.org/doxygen/geos__c_8h.html}
 * @alias module:geos
  */
  geos.GEOSSnap_r = Module.cwrap('GEOSSnap_r', 'number', ['number', 'number', 'number', 'number'])

  /**
 * Create a new GEOSBufferParams object
 * @returns {number} A pointer to the newly allocated GEOSBufferParams object
 * @alias module:geos
  */
  geos.GEOSBufferParams_create = null

  /**
 * Create a new GEOSBufferParams object with a context handle
 * @param {number} handle The context handle
 * @returns {number} A pointer to the newly allocated GEOSBufferParams object
 * @alias module:geos
  */
  geos.GEOSBufferParams_create_r = Module.cwrap('GEOSBufferParams_create_r', 'number', ['number'])

  /**
 * Destroy a GEOSBufferParams object
 * @param {number} params A pointer to the GEOSBufferParams object to destroy
 * @alias module:geos
  */
  geos.GEOSBufferParams_destroy = null

  /**
 * Destroy a GEOSBufferParams object with a context handle
 * @param {number} handle The context handle
 * @param {number} params A pointer to the GEOSBufferParams object to destroy
 * @alias module:geos
  */
  geos.GEOSBufferParams_destroy_r = Module.cwrap('GEOSBufferParams_destroy_r', null, ['number', 'number'])

  /**
 * Set the end cap style for a GEOSBufferParams object
 * @param {number} params A pointer to the GEOSBufferParams object to modify
 * @param {number} style The end cap style, one of **GEOSBUF_CAP_ROUND**, **GEOSBUF_CAP_FLAT**, or **GEOSBUF_CAP_SQUARE**
 * @returns {number} 1 on success, 0 on failure
 * @alias module:geos
  */
  geos.GEOSBufferParams_setEndCapStyle = null

  /**
 * Sets the end cap style of the buffer parameters.
 * @param {number} handle - A pointer to the GEOS context handle.
 * @param {number} p - The pointer to the buffer parameters object.
 * @param {number} style - The end cap style code. Possible values are:
 *  - 1: round
 *  - 2: flat
 *  - 3: square
 * @returns {null}
 * @alias module:geos
  */
  geos.GEOSBufferParams_setEndCapStyle_r = Module.cwrap('GEOSBufferParams_setEndCapStyle_r', null, ['number', 'number', 'number'])

  /**
 * Sets the join style of the buffer parameters.
 * @param {number} p - The pointer to the buffer parameters object.
 * @param {number} joinStyle - The join style code. Possible values are:
 *  - 1: round
 *  - 2: mitre
 *  - 3: bevel
 * @returns {null}
 * @alias module:geos
  */
  geos.GEOSBufferParams_setJoinStyle = null

  /**
 * Sets the join style of the buffer parameters.
 * @param {number} handle - A pointer to the GEOS context handle.
 * @param {number} p - The pointer to the buffer parameters object.
 * @param {number} joinStyle - The join style code. Possible values are:
 *  - 1: round
 *  - 2: mitre
 *  - 3: bevel
 * @returns {null}
 * @alias module:geos
  */
  geos.GEOSBufferParams_setJoinStyle_r = Module.cwrap('GEOSBufferParams_setJoinStyle_r', null, ['number', 'number', 'number'])

  /**
 * Sets the mitre limit of the buffer parameters.
 * @param {number} p - The pointer to the buffer parameters object.
 * @param {number} mitreLimit - The mitre limit value. This is used for very sharp corners.
 * The mitre limit is the ratio of the distance from the corner to the end of the mitred offset corner.
 * When two line segments meet at a sharp angle, a miter join will extend the original geometry.
 * To prevent unreasonable geometry, the mitre limit allows controlling how far the miter join can extend from the original geometry.
 * If the limit is exceeded, the join will be beveled.
 * @returns {null}
 * @alias module:geos
  */
  geos.GEOSBufferParams_setMitreLimit = null

  /**
 * Sets the mitre limit of the buffer parameters.
 * @param {number} handle - A pointer to the GEOS context handle.
 * @param {number} p - The pointer to the buffer parameters object.
 * @param {number} mitreLimit - The mitre limit value. This is used for very sharp corners.
 * The mitre limit is the ratio of the distance from the corner to the end of the mitred offset corner.
 * When two line segments meet at a sharp angle, a miter join will extend the original geometry.
 * To prevent unreasonable geometry, the mitre limit allows controlling how far the miter join can extend from the original geometry.
 * If the limit is exceeded, the join will be beveled.
 * @returns {null}
 * @alias module:geos
  */
  geos.GEOSBufferParams_setMitreLimit_r = Module.cwrap('GEOSBufferParams_setMitreLimit_r', null, ['number', 'number', 'number'])

  /**
 * Sets the number of line segments used to approximate an angle fillet.
 * @param {number} p - A pointer to a GEOSBufferParams object.
 * @param {number} quadSegs - The number of segments in a fillet for a quadrant, must be >= 1.
 * @returns {null} - No return value.
 * @alias module:geos
  */
  geos.GEOSBufferParams_setQuadrantSegments = null

  /**
 * Sets the number of line segments used to approximate an angle fillet, with a context handle.
 * @param {number} handle - A pointer to a GEOSContextHandle object.
 * @param {number} p - A pointer to a GEOSBufferParams object.
 * @param {number} quadSegs - The number of segments in a fillet for a quadrant, must be >= 1.
 * @returns {null} - No return value.
 * @alias module:geos
  */
  geos.GEOSBufferParams_setQuadrantSegments_r = Module.cwrap('GEOSBufferParams_setQuadrantSegments_r', null, ['number', 'number', 'number'])

  /**
 * Sets whether the computed buffer should be single-sided.
 * A single-sided buffer is constructed on only one side of each input line.
 * The side is determined by the sign of the buffer distance:
 * - A positive distance indicates the left-hand side
 * - A negative distance indicates the right-hand side
 * The single-sided buffer of point geometries is the same as the regular buffer.
 * The End Cap Style for single-sided buffers is always ignored, and forced to the equivalent of CAP_FLAT.
 * @param {number} p - A pointer to a GEOSBufferParams object.
 * @param {number} singleSided - A boolean value indicating whether the buffer is single-sided or not.
 * @returns {null} - No return value.
 * @alias module:geos
  */
  geos.GEOSBufferParams_setSingleSided = null

  /**
 * Sets whether the computed buffer should be single-sided, with a context handle.
 * A single-sided buffer is constructed on only one side of each input line.
 * The side is determined by the sign of the buffer distance:
 * - A positive distance indicates the left-hand side
 * - A negative distance indicates the right-hand side
 * The single-sided buffer of point geometries is the same as the regular buffer.
 * The End Cap Style for single-sided buffers is always ignored, and forced to the equivalent of CAP_FLAT.
 * @param {number} handle - A pointer to a GEOSContextHandle object.
 * @param {number} p - A pointer to a GEOSBufferParams object.
 * @param {number} singleSided - A boolean value indicating whether the buffer is single-sided or not.
 * @returns {null} - No return value.
 * @alias module:geos
  */
  geos.GEOSBufferParams_setSingleSided_r = Module.cwrap('GEOSBufferParams_setSingleSided_r', null, ['number', 'number', 'number'])

  /**
 * Returns the buffer computed for a geometry for a given buffer distance and parameters.
 * @param {number} g - A pointer to a GEOSGeometry object representing the input geometry.
 * @param {number} p - A pointer to a GEOSBufferParams object containing the buffer parameters.
 * @param {number} width - The buffer distance.
 * @returns {number} - A pointer to a GEOSGeometry object representing the output geometry, or NULL if an exception occurred.
 * @alias module:geos
  */
  geos.GEOSBufferWithParams = null

  /**
 * Creates a buffer area around this geometry having the given width and with a specified accuracy of approximation for circular arcs.
 * @param {number} handle - The GEOS context pointer handle.
 * @param {number} g - The geometry pointer to buffer.
 * @param {number} p - A pointer to the buffer parameters.
 * @param {number} width - The width of the buffer area.
 * @returns {number} A pointer to the geometry representing the buffer area. Returns NULL on exception.
 * @alias module:geos
  */
  geos.GEOSBufferWithParams_r = Module.cwrap('GEOSBufferWithParams_r', 'number', ['number', 'number', 'number', 'number'])

  /**
 * Computes a Delaunay triangulation of the vertices of the given geometry.
 * @param {number} g - The geometry pointer whose vertices to triangulate.
 * @param {number} tolerance - The snapping tolerance to use for improved robustness. A tolerance of 0.0 specifies that no snapping will take place.
 * @param {number} onlyEdges - If non-zero, only the edges of the triangulation will be returned, forming a multilinestring. If zero, the triangles will be returned as a collection of polygons.
 * @returns {number} A pointer to the geometry representing the Delaunay triangulation. Returns NULL on exception.
 * @alias module:geos
  */
  geos.GEOSDelaunayTriangulation = null

  /**
 * Computes a Delaunay triangulation of the vertices of the given geometry using a GEOS context handle.
 * @param {number} handle - The GEOS context pointer handle.
 * @param {number} g - The geometry pointer whose vertices to triangulate.
 * @param {number} tolerance - The snapping tolerance to use for improved robustness. A tolerance of 0.0 specifies that no snapping will take place.
 * @param {number} onlyEdges - If non-zero, only the edges of the triangulation will be returned, forming a multilinestring. If zero, the triangles will be returned as a collection of polygons.
 * @returns {number} A pointer to the geometry representing the Delaunay triangulation. Returns NULL on exception.
 * @alias module:geos
  */
  geos.GEOSDelaunayTriangulation_r = Module.cwrap('GEOSDelaunayTriangulation_r', 'number', ['number', 'number', 'number', 'number'])

  /**
 * Computes a Voronoi diagram from the vertices of the given geometry.
 * @param {number} g - The geometry pointer whose vertices to use as sites for Voronoi diagram generation.
 * @param {number} env - A pointer to an optional clipping envelope (GEOSGeometry). If provided, only cells which lie in this envelope will be included in the result. This can be used to avoid constructing very large cells (such as those which are far away from all sites). If NULL, no clipping envelope is used.
 * @param {number} tolerance - The snapping tolerance to use for improved robustness. A tolerance of 0.0 specifies that no snapping will take place.
 * @param {number} onlyEdges - If non-zero, only the edges of the Voronoi diagram will be returned, forming a multilinestring. If zero, the cells will be returned as a collection of polygons.
 * @returns {number} A pointer to the geometry representing the Voronoi diagram. Returns NULL on exception.
 * @alias module:geos
  */
  geos.GEOSVoronoiDiagram = null

  /**
 * Computes a Voronoi diagram from the vertices of the given geometry using a GEOS context handle.
 * @param {number} handle - The GEOS context pointer handle.
 * @param {number} g - The geometry pointer whose vertices to use as sites for Voronoi diagram generation.
 * @param {number} env - A pointer to an optional clipping envelope (GEOSGeometry). If provided, only cells which lie in this envelope will be included in the result. This can be used to avoid constructing very large cells (such as those which are far away from all sites). If NULL, no clipping envelope is used.
 * @param {number} tolerance - The snapping tolerance to use for improved robustness. A tolerance of 0.0 specifies that no snapping will take place.
 * @param {number} onlyEdges - If non-zero, only the edges of the Voronoi diagram will be returned, forming a multilinestring. If zero, the cells will be returned as a collection of polygons.
 * @returns {number} A pointer to the geometry representing the Voronoi diagram. Returns NULL on exception.
 * @alias module:geos
  */
  geos.GEOSVoronoiDiagram_r = Module.cwrap('GEOSVoronoiDiagram_r', 'number', ['number', 'number', 'number', 'number', 'number'])

  /**
 * Computes the intersection point of two line segments, if there is one.
 * @param {number} p0x - The x-coordinate of the first endpoint of the first segment.
 * @param {number} p0y - The y-coordinate of the first endpoint of the first segment.
 * @param {number} p1x - The x-coordinate of the second endpoint of the first segment.
 * @param {number} p1y - The y-coordinate of the second endpoint of the first segment.
 * @param {number} q0x - The x-coordinate of the first endpoint of the second segment.
 * @param {number} q0y - The y-coordinate of the first endpoint of the second segment.
 * @param {number} q1x - The x-coordinate of the second endpoint of the second segment.
 * @param {number} q1y - The y-coordinate of the second endpoint of the second segment.
 * @param {number} rx - A pointer to a double where the x-coordinate of the intersection point will be stored, if any.
 * @param {number} ry - A pointer to a double where the y-coordinate of the intersection point will be stored, if any.
 * @returns {number} 1 if an intersection point is found, 0 if no intersection point is found, or -1 on error.
 * @alias module:geos
  */
  geos.GEOSSegmentIntersection = null

  /**
 * Computes the intersection point of two line segments, if there is one. This is a reentrant version that takes a GEOS context handle as an argument.
 * @param {number} handle - A pointer to the GEOS context handle.
 * @param {number} p0x - The x-coordinate of the first endpoint of the first segment.
 * @param {number} p0y - The y-coordinate of the first endpoint of the first segment.
 * @param {number} p1x - The x-coordinate of the second endpoint of the first segment.
 * @param {number} p1y - The y-coordinate of the second endpoint of the first segment.
 * @param {number} q0x - The x-coordinate of the first endpoint of the second segment.
 * @param {number} q0y - The y-coordinate of the first endpoint of the second segment.
 * @param {number} q1x - The x-coordinate of the second endpoint of the second segment.
 * @param {number} q1y - The y-coordinate of the second endpoint of the second segment.
 * @param {number} rx - A pointer to a double where the x-coordinate of the intersection point will be stored, if any.
 * @param {number} ry - A pointer to a double where the y-coordinate of the intersection point will be stored, if any.
 * @returns {number} 1 if an intersection point is found, 0 if no intersection point is found, or -1 on error.
 * @alias module:geos
  */
  geos.GEOSSegmentIntersection_r = Module.cwrap('GEOSSegmentIntersection_r', 'number', ['number', 'number', 'number', 'number', 'number', 'number', 'number', 'number', 'number', 'number', 'number'])

  /**
 * Creates and returns a new GEOS context handle. This function must be called before any other GEOS function in order to initialize thread-local storage and error handlers. Each thread must have its own GEOS context handle.
 * @returns {number} A GEOS context handle or null on error.
 * @alias module:geos
  */
  geos.GEOS_init_r = Module.cwrap('GEOS_init_r', 'number', [])

  /**
 * Sets a notice message handler for a given GEOS context. A notice message handler is a function that takes a string argument and does something with it, such as printing it to stdout or logging it somewhere. Notice messages are informative messages that do not indicate an error condition.
 * @param {number} handle - A pointer to the GEOS context handle.
 * @param {function(string):void} nf - A pointer to a notice message handler function.
 * @param {any} userData - A pointer to user data that will be passed to the notice message handler function.
 * @alias module:geos
  */
  geos.GEOSContext_setNoticeMessageHandler_r = Module.cwrap('GEOSContext_setNoticeMessageHandler_r', null, ['number', 'function(string):void', 'any'])

  /**
 * Sets an error message handler for a given GEOS context. An error message handler is a function that takes a string argument and does something with it, such as printing it to stderr or logging it somewhere. Error messages indicate that something went wrong during a GEOS operation.
 * @param {number} handle - A pointer to the GEOS context handle.
 * @param {function(string):void} ef - A pointer to an error message handler function.
 * @param {any} userData - A pointer to user data that will be passed to the error message handler function.
 * @alias module:geos
  */
  geos.GEOSContext_setErrorMessageHandler_r = Module.cwrap('GEOSContext_setErrorMessageHandler_r', null, ['number', 'function(string):void', 'any'])

  /**
 * Finish the use of GEOS library
 * @param {number} handle - The context returned by GEOS_init_r
 * @alias module:geos
  */
  geos.GEOS_finish_r = Module.cwrap('GEOS_finish_r', null, ['number'])

  /**
 * Return the version of GEOS as a string
 * @return {string} The version of GEOS
 * @alias module:geos
  */
  geos.GEOSversion = null

  /**
 * Return the JTS port of GEOS as a string
 * @return {string} The JTS port of GEOS
 * @alias module:geos
  */
  geos.GEOSjtsport = null

  /**
 * Set the X coordinate of a point in a CoordinateSequence
 * @param {number} handle - The context returned by GEOS_init_r
 * @param {number} s - The CoordinateSequence object
 * @param {number} idx - The index of the point to set
 * @param {number} val - The X coordinate value to set
 * @return {number} 1 on success, 0 on exception
 * @alias module:geos
  */
  geos.GEOSCoordSeq_setX_r = Module.cwrap('GEOSCoordSeq_setX_r', 'number', ['number', 'number', 'number', 'number'])

  /**
 * Set the Y coordinate of a point in a CoordinateSequence
 * @param {number} handle - The context returned by GEOS_init_r
 * @param {number} s - The CoordinateSequence object
 * @param {number} idx - The index of the point to set
 * @param {number} val - The Y coordinate value to set
 * @return {number} 1 on success, 0 on exception
 * @alias module:geos
  */
  geos.GEOSCoordSeq_setY_r = Module.cwrap('GEOSCoordSeq_setY_r', 'number', ['number', 'number', 'number', 'number'])

  /**
 * Sets the Z ordinate value for a given coordinate in a GEOSCoordSequence.
 * @param {number} handle - The GEOS context pointer handle.
 * @param {number} s - A pointer to the GEOSCoordSequence to modify.
 * @param {number} idx - The coordinate index.
 * @param {number} val - The Z ordinate value to set.
 * @returns {number} 1 on success, 0 on exception.
 * @alias module:geos
  */
  geos.GEOSCoordSeq_setZ_r = Module.cwrap('GEOSCoordSeq_setZ_r', 'number', ['number', 'number', 'number', 'number'])

  /**
 * Gets the X ordinate value for a given coordinate in a GEOSCoordSequence.
 * @param {number} handle - The GEOS context pointer handle.
 * @param {number} s - A pointer to the GEOSCoordSequence to query.
 * @param {number} idx - The coordinate index.
 * @param {number} val - A pointer to a double to store the X ordinate value.
 * @returns {number} 1 on success, 0 on exception.
 * @alias module:geos
  */
  geos.GEOSCoordSeq_getX_r = Module.cwrap('GEOSCoordSeq_getX_r', 'number', ['number', 'number', 'number', 'number'])

  /**
 * Gets the Y ordinate value for a given coordinate in a GEOSCoordSequence.
 * @param {number} handle - The GEOS context pointer handle.
 * @param {number} s - A pointer to the GEOSCoordSequence to query.
 * @param {number} idx - The coordinate index.
 * @param {number} val - A pointer to a double to store the Y ordinate value.
 * @returns {number} 1 on success, 0 on exception.
 * @alias module:geos
  */
  geos.GEOSCoordSeq_getY_r = Module.cwrap('GEOSCoordSeq_getY_r', 'number', ['number', 'number', 'number', 'number'])

  /**
 * Gets the Z ordinate value for a given coordinate in a GEOSCoordSequence. This is an alias for GEOSCoordSeq_getZ_r without the context handle parameter.
 * @param {number} s - A pointer to the GEOSCoordSequence to query.
 * @param {number} idx - The coordinate index.
 * @param {number} val - A pointer to a double to store the Z ordinate value.
 * @returns {number} 1 on success, 0 on exception.
 * @alias module:geos
  */
  geos.GEOSCoordSeq_getZ = null

  /**
 * Gets the Z ordinate value for a given coordinate in a GEOSCoordSequence. This is equivalent to GEOSCoordSeq_getZ_ with an additional context handle parameter.
 * @param {number} handle - The GEOS context pointer handle.
 * @param {number} s - A pointer to the GEOSCoordSequence to query.
 * @param {number} idx - The coordinate index.
 * @param {number} val - A pointer to a double to store the Z ordinate value.
 * @returns {number} 1 on success, 0 on exception.
 * @alias module:geos
  */
  geos.GEOSCoordSeq_getZ_r = Module.cwrap('GEOSCoordSeq_getZ_r', 'number', ['number', 'number', 'number', 'number'])

  /**
 * Computes the Constrained Delaunay Triangulation of a polygon geometry.
 * @param {number} g - A pointer to a GEOS geometry object representing the input polygon.
 * @returns {number} A pointer to a GEOS geometry object representing the triangulation, or NULL on error.
 * @see https://libgeos.org/doxygen/geos__c_8h.html#a0f6b9f4c2e8a3b1f7c2a5d0e3c6a7d9f
 * @alias module:geos
 */
  geos.GEOSConstrainedDelaunayTriangulation = null

  /**
 * Computes the Constrained Delaunay Triangulation of a polygon.
 * @param {number} handle - A pointer to a GEOS context handle.
 * @param {number} g - A pointer to a GEOS geometry object representing the polygon.
 * @returns {number} A pointer to a GEOS geometry object representing the triangulation, or NULL on error.
 * @see https://libgeos.org/doxygen/geos__c_8h.html#a4a9f3c0bfbf1f9c6b1a7b0e7a8d4d5c6
 * @alias module:geos
 */
  geos.GEOSConstrainedDelaunayTriangulation_r = Module.cwrap('GEOSConstrainedDelaunayTriangulation_r', 'number', ['number', 'number'])

  /**
 * Copies the coordinate values from the given arrays to a coordinate sequence.
 * @param {number} size - The number of coordinates in the arrays.
 * @param {number} xs - A pointer to an array of x values.
 * @param {number} ys - A pointer to an array of y values.
 * @param {number} zs - A pointer to an array of z values, or NULL if not needed.
 * @returns {number} A pointer to a GEOS coordinate sequence object, or NULL on error.
 * @see https://libgeos.org/doxygen/geos__c_8h.html#a4f7a1f9d0c2b0c119e6f9e2f60b112a9
 * @alias module:geos
 */
  geos.GEOSCoordSeq_copyFromArrays = null

  /**
 * Copies the ordinates of a coordinate sequence from arrays of x, y and optionally z values.
 * @param {number} ctx - A GEOS context handle.
 * @param {number} seq - A pointer to a GEOS coordinate sequence object.
 * @param {number} x - A pointer to an array of x values.
 * @param {number} y - A pointer to an array of y values.
 * @param {number} z - A pointer to an array of z values, or NULL if not present.
 * @returns {number} 1 on success, 0 on failure.
 * @see https://libgeos.org/doxygen/geos__c_8h.html#a9f4c6a5a7f2b9c0b1f6c0e1d0a1e4f5a
 * @alias module:geos
 */
  geos.GEOSCoordSeq_copyFromArrays_r = Module.cwrap('GEOSCoordSeq_copyFromArrays_r', 'number', ['number', 'number', 'number', 'number', 'number'])

  /**
 * Copies a coordinate sequence from a buffer of x, y values.
 * @param {number} size - The number of coordinates in the buffer.
 * @param {number} buf - A pointer to a buffer of double values, in x, y order.
 * @returns {number} A pointer to a GEOS coordinate sequence object, or NULL on error.
 * @see https://libgeos.org/doxygen/geos__c_8h.html#a6f4b0a3f8e9c7a9b5f3b2c1f0c3a1d6f
 * @alias module:geos
 */
  geos.GEOSCoordSeq_copyFromBuffer = null

  /**
 * Copies a coordinate sequence from a buffer of x,y,z values.
 * @param {number} ctx - A GEOS context handle.
 * @param {number} seq - A pointer to a GEOS coordinate sequence object.
 * @param {number} buf - A pointer to a buffer of double values.
 * @param {number} size - The number of coordinates in the buffer.
 * @returns {number} 1 on success, 0 on failure.
 * @see https://libgeos.org/doxygen/geos__c_8h.html#a7a9f0b9c5a4f3b8f1d6b2a0c6e8d7c7f
 * @alias module:geos
 */
  geos.GEOSCoordSeq_copyFromBuffer_r = Module.cwrap('GEOSCoordSeq_copyFromBuffer_r', 'number', ['number', 'number', 'number', 'number'])

  /**
 * Copies the coordinates of a coordinate sequence to two arrays.
 * @param {number} cs - A pointer to a GEOS coordinate sequence object.
 * @param {number} x - A pointer to an array of doubles to store the x-coordinates.
 * @param {number} y - A pointer to an array of doubles to store the y-coordinates.
 * @returns {number} 1 on success, 0 on failure.
 * @see https://libgeos.org/doxygen/geos__c_8h.html#a3f7a4b9a6d0e2b7c8f6f9e5b1f6d0a5c
 * @alias module:geos
 */
  geos.GEOSCoordSeq_copyToArrays = null

  /**
 * Copies the coordinates of a coordinate sequence to two arrays of doubles.
 * @param {number} ctx - A GEOS context handle.
 * @param {number} seq - A pointer to a GEOS coordinate sequence object.
 * @param {number} x - A pointer to an array of doubles to store the x coordinates.
 * @param {number} y - A pointer to an array of doubles to store the y coordinates.
 * @returns {number} 1 on success, 0 on failure.
 * @see https://libgeos.org/doxygen/geos__c_8h.html#a5f7a6d4f3f9a9c5e2b7a0b8f6c4e3d0c
 * @alias module:geos
 */
  geos.GEOSCoordSeq_copyToArrays_r = Module.cwrap('GEOSCoordSeq_copyToArrays_r', 'number', ['number', 'number', 'number', 'number'])

  /**
 * Copies the coordinates of a coordinate sequence to a user-supplied buffer.
 * @param {number} cs - A pointer to a GEOS coordinate sequence object.
 * @param {number} buf - A pointer to a buffer of double values, allocated by the caller.
 * @param {number} stride - The number of doubles per coordinate in the buffer.
 * @returns {number} 1 on success, 0 on error.
 * @see https://libgeos.org/doxygen/geos__c_8h.html#a9a6f2c8b0a3f4e4f2c9a7b1d5c2e9b7a
 * @alias module:geos
 */
  geos.GEOSCoordSeq_copyToBuffer = null

  /**
 * Copies the coordinates of a coordinate sequence to user-supplied buffers.
 * @param {number} ctx - A GEOS context handle.
 * @param {number} seq - A pointer to a GEOS coordinate sequence object.
 * @param {number} x - A pointer to a buffer for the x coordinates.
 * @param {number} y - A pointer to a buffer for the y coordinates.
 * @param {number} z - A pointer to a buffer for the z coordinates (optional).
 * @returns {number} 1 on success, 0 on failure.
 * @see https://libgeos.org/doxygen/geos__c_8h.html#a9f4a9f6b7a5d8a6c0f2b5e7e6a3f0c7d
 * @alias module:geos
 */
  geos.GEOSCoordSeq_copyToBuffer_r = Module.cwrap('GEOSCoordSeq_copyToBuffer_r', 'number', ['number', 'number', 'number', 'number', 'number'])

  /**
 * Returns a geometry with vertices added to make the lines no longer than a given distance.
 * @param {number} g - A pointer to a GEOS geometry object.
 * @param {number} tolerance - The maximum distance between vertices in the output geometry.
 * @returns {number} A pointer to a new GEOS geometry object, or NULL on error.
 * @see https://libgeos.org/doxygen/geos__c_8h.html#a6f0b2f9f1a0c7e4b8a5f2d3c1a7e5c9b
 * @alias module:geos
 */
  geos.GEOSDensify = null

  /**
 * Densifies a geometry by adding points along the segments so that the distance between any two consecutive points is less than or equal to a given tolerance.
 * @param {number} ctx - A GEOS context handle.
 * @param {number} geom - A pointer to a GEOS geometry object.
 * @param {number} tolerance - A positive distance value.
 * @returns {number} A pointer to a new GEOS geometry object representing the densified geometry, or NULL on error.
 * @see https://libgeos.org/doxygen/geos__c_8h.html#a6a9f4b9a8d1f2c0f0b3e5f6b7a0c5a2c
 * @alias module:geos
 */
  geos.GEOSDensify_r = Module.cwrap('GEOSDensify_r', 'number', ['number', 'number', 'number'])

  /**
 * Tests whether two geometries are within a specified distance of each other.
 * @param {number} g1 - A pointer to a GEOS geometry object.
 * @param {number} g2 - A pointer to another GEOS geometry object.
 * @param {number} distance - The distance threshold to test.
 * @returns {number} 1 if the geometries are within the distance of each other, 0 if not, or -1 on error.
 * @see [GEOS C header file](https://libgeos.org/doxygen/geos__c_8h_source.html)
 * @alias module:geos
 */
  geos.GEOSDistanceWithin = null

  /**
 * Checks if two geometries are within a given distance of each other.
 * @param {number} handle - A pointer to a GEOS context handle.
 * @param {number} g1 - A pointer to the first GEOS geometry object.
 * @param {number} g2 - A pointer to the second GEOS geometry object.
 * @param {number} distance - The distance threshold in units of the coordinate reference system.
 * @returns {number} A char value that is 1 if the geometries are within distance, 0 if not, or -1 on error.
 * @see https://libgeos.org/doxygen/geos__c_8h.html#a7a9b0f6a3d3f9f8a5d4e9e7b6f4a5c0d
 * @alias module:geos
 */
  geos.GEOSDistanceWithin_r = Module.cwrap('GEOSDistanceWithin_r', 'number', ['number', 'number', 'number', 'number'])

  /**
 * Creates a GeoJSON reader object.
 * @returns {number} A pointer to a GEOSGeoJSONReader object, or NULL on error.
 * @see https://libgeos.org/doxygen/geos__c_8h.html#a6a9f3f0b6c7a4a1d1f5c0e2b2a8f9b4d
 * @alias module:geos
 */
  geos.GEOSGeoJSONReader_create = null

  /**
 * Creates a GeoJSON reader object.
 * @param {number} ctx - A pointer to a GEOS context handle.
 * @returns {number} A pointer to a GEOS GeoJSON reader object, or NULL on error.
 * @see [GEOS C header file](https://libgeos.org/doxygen/geos__c_8h_source.html)
 * @alias module:geos
 */
  geos.GEOSGeoJSONReader_create_r = Module.cwrap('GEOSGeoJSONReader_create_r', 'number', ['number'])

  /**
 * Destroys a GeoJSON reader object and releases any allocated resources.
 * @param {number} reader - A pointer to a GEOSGeoJSONReader object.
 * @returns {void}
 * @see https://libgeos.org/doxygen/geos__c_8h.html#a0f7a9a6c0b4f1e5b7f2c3a1d3e4d8a9f
 * @alias module:geos
 */
  geos.GEOSGeoJSONReader_destroy = null

  /**
 * Destroys a GEOSGeoJSONReader object.
 * @param {number} ctx - A pointer to a GEOS context handle.
 * @param {number} reader - A pointer to a GEOSGeoJSONReader object.
 * @returns {void}
 * @see https://libgeos.org/doxygen/geos__c_8h.html#a7f9a4b0e2c9b3a1f1d7a9c6d3f0b5e8a
 * @alias module:geos
 */
  geos.GEOSGeoJSONReader_destroy_r = Module.cwrap('GEOSGeoJSONReader_destroy_r', null, ['number', 'number'])

  /**
 * Reads a geometry from a GeoJSON string.
 * @param {number} reader - A pointer to a GEOSGeoJSONReader object.
 * @param {string} geojson - A string containing a valid GeoJSON geometry object.
 * @returns {number} A pointer to a GEOS geometry object representing the GeoJSON geometry, or NULL on error.
 * @see https://libgeos.org/doxygen/geos__c_8h.html#a0f2a9b4a3b2b6d1c7f0a5e7f1c8f9d5a
 * @alias module:geos
 */
  geos.GEOSGeoJSONReader_readGeometry = null

  /**
* Reads a geometry from a GeoJSON string.
* @param {number} ctx - A pointer to a GEOS context handle.
* @param {number} reader - A pointer to a GEOSGeoJSONReader object.
* @param {string} geojson - A GeoJSON string representing a geometry.
* @returns {number} A pointer to a GEOS geometry object, or NULL on error or empty input.
* @see https://libgeos.org/doxygen/geos__c_8h.html#a9f6a1c0e8f5a3b4c7b3d0f7f2c9a4e8f
* @alias module:geos
*/
  geos.GEOSGeoJSONReader_readGeometry_r = Module.cwrap('GEOSGeoJSONReader_readGeometry_r', 'number', ['number', 'number', 'string'])

  /**
 * Creates a GeoJSON writer object.
 * @returns {number} A pointer to a GEOSGeoJSONWriter object, or NULL on error.
 * @see [GEOS C header file](https://libgeos.org/doxygen/geos__c_8h_source.html)
 * @alias module:geos
 */
  geos.GEOSGeoJSONWriter_create = null

  /**
 * Creates a GeoJSON writer object.
 * @param {number} handle - A pointer to a GEOS context handle.
 * @returns {number} A pointer to a GEOS GeoJSON writer object, or NULL on error.
 * @see [GEOS C header file](https://libgeos.org/doxygen/geos__c_8h_source.html)
 * @alias module:geos
 */
  geos.GEOSGeoJSONWriter_create_r = Module.cwrap('GEOSGeoJSONWriter_create_r', 'number', ['number'])

  /**
 * Destroys a GeoJSON writer object and releases any allocated resources.
 * @param {number} writer - A pointer to a GEOS GeoJSON writer object.
 * @returns {void}
 * @see https://libgeos.org/doxygen/geos__c_8h.html#a2f0a7c9f0a4a6b3e1f5d6d8c7a3e1b4c
 * @alias module:geos
 */
  geos.GEOSGeoJSONWriter_destroy = null

  /**
 * Destroys a GEOSGeoJSONWriter object and releases the memory associated with it.
 * @param {number} ctx - A pointer to a GEOS context handle.
 * @param {number} writer - A pointer to a GEOSGeoJSONWriter object.
 * @returns {void} No return value.
 * @see https://libgeos.org/doxygen/geos__c_8h.html#a3f0f5c2b0a6d1a9e7f9a4b6b1c4f3d5a
 * @alias module:geos
 */
  geos.GEOSGeoJSONWriter_destroy_r = Module.cwrap('GEOSGeoJSONWriter_destroy_r', null, ['number', 'number'])

  /**
 * Writes a geometry object to a GeoJSON string.
 * @param {number} writer - A pointer to a GEOSGeoJSONWriter object.
 * @param {number} g - A pointer to a GEOS geometry object.
 * @returns {string} A GeoJSON string representation of the geometry, or NULL on error.
 * @see https://libgeos.org/doxygen/geos__c_8h.html#a0a3f1f6b2a1f7d0b5a9c4d2c6b7e9e0a
 * @alias module:geos
 */
  geos.GEOSGeoJSONWriter_writeGeometry = null

  /**
 * Writes a geometry to a GeoJSON string.
 * @param {number} ctx - A GEOS context handle.
 * @param {number} writer - A pointer to a GEOSGeoJSONWriter object.
 * @param {number} geom - A pointer to a GEOS geometry object.
 * @returns {string} A GeoJSON string representation of the geometry, or NULL on error.
 * @see https://libgeos.org/doxygen/geos__c_8h.html#a9a6f9f0b3a4c1a2e7c1d0e4e1b3a2c5d
 * @alias module:geos
 */
  geos.GEOSGeoJSONWriter_writeGeometry_r = Module.cwrap('GEOSGeoJSONWriter_writeGeometry_r', 'string', ['number', 'number', 'number'])

  /**
 * Creates a GEOSMakeValidParams object, which can be used to control the behavior of the GEOSMakeValid function.
 * @returns {number} A pointer to a GEOSMakeValidParams object, or NULL on error.
 * @see https://libgeos.org/doxygen/geos__c_8h.html#a9a1f0e0b8a3f7d2b9c6f3f4d5a0b1c8e
 * @alias module:geos
 */
  geos.GEOSMakeValidParams_create = null

  /**
 * Creates a GEOSMakeValidParams object, which can be used to control the behaviour of the GEOSMakeValid function.
 * @param {number} ctx - A pointer to a GEOS context handle.
 * @returns {number} A pointer to a GEOSMakeValidParams object, or NULL on error.
 * @see https://libgeos.org/doxygen/geos__c_8h.html#a5f0c2a4a7b6f9a1e9b3f0a0c8d9d0f1d
 * @alias module:geos
 */
  geos.GEOSMakeValidParams_create_r = Module.cwrap('GEOSMakeValidParams_create_r', 'number', ['number'])

  /**
 * Destroys a GEOSMakeValidParams object.
 * @param {number} params - A pointer to a GEOSMakeValidParams object.
 * @returns {void}
 * @see [12](https://github.com/libgeos/geos)
 * @alias module:geos
 */
  geos.GEOSMakeValidParams_destroy = null

  /**
 * Destroys a GEOSMakeValidParams object.
 * @param {number} ctx - A pointer to a GEOS context handle.
 * @param {number} params - A pointer to a GEOSMakeValidParams object.
 * @returns {void}
 * @see https://libgeos.org/doxygen/geos__c_8h.html#a0c9f9a6f5c5e3b1f4b4a0d7f8b7c2a3c
 * @alias module:geos
 */
  geos.GEOSMakeValidParams_destroy_r = Module.cwrap('GEOSMakeValidParams_destroy_r', null, ['number', 'number'])

  /**
   * Attempts to make an invalid geometry valid without losing any of the input vertices.
   * @param {number} ctx - A GEOS context handle.
   * @param {number} params - A pointer to a GEOSMakeValidParams object.
   * @param {number} g - A pointer to a GEOS geometry object.
   * @returns {number} A pointer to a new GEOS geometry object representing the valid geometry, or NULL on error.
   * @see https://libgeos.org/doxygen/geos__c_8h.html#a4f1a0c3f6f0a7b9b9e2d9c2a6f7b0e8e
   * @alias module:geos
   */
  geos.GEOSMakeValidParams_setKeepCollapsed_r = Module.cwrap('GEOSMakeValidParams_setKeepCollapsed_r', 'number', ['number', 'number', 'number'])

  /**
   * Sets the method used to make a geometry valid.
   * @param {number} params - A pointer to a GEOSMakeValidParams object.
   * @param {number} method - An integer representing the method, such as 1 for MAKE_VALID_STRUCTURE_PRESERVING, 2 for MAKE_VALID_BUFFERED, etc.
   * @returns {number} A boolean value indicating success or failure.
   * @see https://libgeos.org/doxygen/geos__c_8h.html#a7a0f4e0c3b6a9f9e1d5c7b9a1d6f0c4e
   * @alias module:geos
   */
  geos.GEOSMakeValidParams_setMethod = null

  /**
   * Sets the method to use for making a geometry valid.
   * @param {number} ctx - A pointer to a GEOS context handle.
   * @param {number} params - A pointer to a GEOSMakeValidParams object.
   * @param {number} method - An integer representing the method, such as 1 for MAKE_VALID_STRUCTURE_PRESERVING, 2 for MAKE_VALID_BUFFERED, etc.
   * @returns {number} A boolean value indicating success or failure.
   * @see https://libgeos.org/doxygen/geos__c_8h.html#a9b0f7a7a3c5f0f8e1d4b6a9c3c3f1e9b
   * @alias module:geos
   */
  geos.GEOSMakeValidParams_setMethod_r = Module.cwrap('GEOSMakeValidParams_setMethod_r', 'number', ['number', 'number', 'number'])

  /**
   * Attempts to make an invalid geometry valid without losing any of the input vertices.
   * @param {number} g - A pointer to a GEOS geometry object.
   * @param {number} params - A pointer to a GEOSMakeValidParams object that specifies the options for the operation.
   * @returns {number} A pointer to a new GEOS geometry object representing the valid geometry, or NULL on error.
   * @see https://libgeos.org/doxygen/geos__c_8h.html#a3a1c0b9f6a5f7a4e0b7c9e9b1f3d8f7c
   * @alias module:geos
   */
  geos.GEOSMakeValidWithParams = null

  /**
   * Attempts to make an invalid geometry valid without losing any of the input vertices.
   * @param {number} ctx - A GEOS context handle.
   * @param {number} params - A pointer to a GEOSMakeValidParams object.
   * @param {number} g - A pointer to a GEOS geometry object.
   * @returns {number} A pointer to a new GEOS geometry object representing the valid geometry, or NULL on error.
   * @see https://libgeos.org/doxygen/geos__c_8h.html#a6f0e9a3b8f2c5b1b4a0d3c7a7f6f5a9d
   * @alias module:geos
   */
  geos.GEOSMakeValidWithParams_r = Module.cwrap('GEOSMakeValidWithParams_r', 'number', ['number', 'number', 'number'])

  /**
   * Tests whether the distance between a prepared geometry and another geometry is within a specified distance.
   * @param {number} prep - A pointer to a GEOS prepared geometry object.
   * @param {number} g2 - A pointer to a GEOS geometry object.
   * @param {number} dist - A double value representing the distance threshold.
   * @returns {number} 1 if the geometries are within the distance, 0 if not, or -1 on error.
   * @see https://libgeos.org/doxygen/geos__c_8h.html#a6f5a0b7f6f9e3a9c4b0b8a3c1a4d4e6d
   * @alias module:geos
   */
  geos.GEOSPreparedDistanceWithin = null

  /**
   * Computes the distance between a prepared geometry and another geometry, and checks if it is within a given tolerance.
   * @param {number} ctx - A GEOS context handle.
   * @param {number} prep - A pointer to a prepared GEOS geometry object.
   * @param {number} g - A pointer to a GEOS geometry object.
   * @param {number} tolerance - A non-negative distance value.
   * @returns {number} 1 if the geometries are within the given distance of each other, 0 if not, or -1 on error.
   * @see https://libgeos.org/doxygen/geos__c_8h.html#a3a9f7c0b6f9b2c6a0e3f4f5a7d8b9e5d
   * @alias module:geos
   */
  geos.GEOSPreparedDistanceWithin_r = Module.cwrap('GEOSPreparedDistanceWithin_r', 'number', ['number', 'number', 'number', 'number'])

  /**
   * Returns the output format of a WKB writer.
   * @param {number} writer - A pointer to a GEOS WKB writer object.
   * @returns {number} An integer representing the output format, such as 0 for WKB_ISO, 1 for WKB_SFSQL, or 2 for WKB_HEX.
   * @see https://libgeos.org/doxygen/geos__c_8h.html#a3f7a4c9b8b4f8e2f6d3a0e5c5b7b0a6f
   * @alias module:geos
   */
  geos.GEOSWKBWriter_getFlavor = null

  /**
   * Returns the output format of a WKB writer.
   * @param {number} handle - A GEOS context handle.
   * @param {number} writer - A pointer to a GEOS WKB writer object.
   * @returns {number} An integer representing the output format, such as 0 for WKB_ISO, 1 for WKB_SFSQL, or 2 for WKB_HEX. Returns -1 on error.
   * @see https://libgeos.org/doxygen/geos__c_8h.html#a0a7f9c4a6f5b8e0f3c8b9a2d1b6b4e3a
   * @alias module:geos
   */
  geos.GEOSWKBWriter_getFlavor_r = Module.cwrap('GEOSWKBWriter_getFlavor_r', 'number', ['number', 'number'])

  /**
   * Sets the output format of a WKB writer to either WKB or EWKB.
   * @param {number} writer - A pointer to a GEOS WKB writer object.
   * @param {number} flavor - An integer representing the output format, 1 for WKB, 2 for EWKB.
   * @returns {void}
   * @see https://libgeos.org/doxygen/geos__c_8h.html#a9a0e1f9fa62b0d657c4b18e01a276a94
   * @alias module:geos
   */
  geos.GEOSWKBWriter_setFlavor = null

  /**
   * Sets the output format of a WKB writer to either WKB or EWKB.
   * @param {number} handle - A GEOS context handle.
   * @param {number} writer - A pointer to a GEOS WKB writer object.
   * @param {number} flavor - An integer representing the output format, 1 for WKB, 2 for EWKB.
   * @returns {number} 1 on success, 0 on failure.
   * @see https://libgeos.org/doxygen/geos__c_8h.html#a7f9a6d3a5f2b0f1a4c6b4c2e3b9b8a9e
   * @alias module:geos
   */
  geos.GEOSWKBWriter_setFlavor_r = Module.cwrap('GEOSWKBWriter_setFlavor_r', 'number', ['number', 'number', 'number'])

  // Define a function to handle errors and notices
  const errorHandlerPtr = geos.Module.addFunction((arg) => {
    const message = geos.Module.UTF8ToString(arg)

    if (errorHandler) errorHandler(message)
    else console.error(message)
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
      throw new Error('GEOS has already been initialized. Call finishGEOS before re-initializing.')
    }
  }

  // Create non reentrant versions of the functions
  Object.keys(geos).forEach(property => {
    if (typeof geos[property] === 'function' && property.endsWith('_r')) {
      const nonReFunctionName = property.slice(0, -2)
      geos[nonReFunctionName] = (...args) => geos[property](geos._ctx, ...args)
    }
  })

  // Define a GEOS context handle
  if (autoInit) {
    geos.initGEOS()
  }
}
