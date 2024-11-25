/**
 * Convert GEOS geometry pointer to GeoJSON object.
 * @name geosGeomToGeojson
 * @kind function
 * @param {number} geomPtr - The GEOS geometry pointer.
 * @param {geos} geos - The GEOS module object.
 * @returns {GeoJSON} A GeoJSON object.
 * @example
 * import initGeosJs from 'geos-wasm'
 * import { geojsonToGeosGeom } from 'geos-wasm/helpers'
 * const geos = await initGeosJs()
 * const reader = geos.GEOSWKTReader_create()
 * const wkt = 'POLYGON ((0 0, 1 0, 1 1, 0 1, 0 0))'
 * const size = wkt.length + 1
 * const wktPtr = geos.Module._malloc(size)
 * geos.Module.stringToUTF8(wkt, wktPtr, size)
 * const geomPtr = geos.GEOSWKTReader_read(reader, wktPtr)
 * geos.Module._free(wktPtr)
 * const json = geosGeomToGeojson(geomPtr, geos)
 * console.log(JSON.stringify(json))
 * // => {"type":"Polygon","coordinates":[[[0,0],[1,0],[1,1],[0,1],[0,0]]]}
 * @alias module:geos-helpers
 */
export default function geosGeomToGeojson (geomPtr, geos) {
  if (!geomPtr) {
    throw new Error('No GEOS geometry pointer provided')
  }
  if (!geos) {
    throw new Error('No GEOS module object provided')
  }

  function geosCoordSeqToGeojsonCoords (seqPtr) {
    if (!seqPtr) {
      return null
    }
    const sizePtr = geos.Module._malloc(4)
    geos.GEOSCoordSeq_getSize(seqPtr, sizePtr)
    const size = geos.Module.getValue(sizePtr, 'i32')
    geos.Module._free(sizePtr)
    if (size === 0) {
      return []
    }
    const coords = []
    const coordsPtr = geos.Module._malloc(size * 2 * 8)
    geos.GEOSCoordSeq_copyToBuffer(seqPtr, coordsPtr, false, false)
    const view = new Float64Array(
      geos.Module.HEAPF64.buffer,
      coordsPtr,
      size * 2
    )
    for (let i = 0; i < size * 2; i = i + 2) {
      coords.push([view[i], view[i + 1]])
    }
    geos.Module._free(coordsPtr)
    return coords
  }

  if (!geomPtr) {
    return null
  }
  const geomType = geos.GEOSGeomTypeId(geomPtr)
  switch (geomType) {
    case geos.GEOS_POINT: {
      const seq = geos.GEOSGeom_getCoordSeq(geomPtr)
      const coords = []
      const sizePtr = geos.Module._malloc(4)
      geos.GEOSCoordSeq_getSize(seq, sizePtr)
      const size = geos.Module.getValue(sizePtr, 'i32')
      geos.Module._free(sizePtr)
      if (size === 1) {
        const xPtr = geos.Module._malloc(8)
        const yPtr = geos.Module._malloc(8)
        geos.GEOSCoordSeq_getXY(seq, 0, xPtr, yPtr)
        const x = geos.Module.getValue(xPtr, 'double')
        const y = geos.Module.getValue(yPtr, 'double')
        geos.Module._free(xPtr)
        geos.Module._free(yPtr)
        coords.push(x, y)
      }
      const pointJson = {
        type: 'Point',
        coordinates: coords
      }
      return pointJson
    }
    case geos.GEOS_LINESTRING: {
      const seq = geos.GEOSGeom_getCoordSeq(geomPtr)
      const coords = geosCoordSeqToGeojsonCoords(seq)
      const lineJson = {
        type: 'LineString',
        coordinates: coords
      }
      return lineJson
    }
    // case geos.GEOS_LINEARRING : // ... should not happen
    case geos.GEOS_POLYGON: {
      const coords = []
      const shell = geos.GEOSGetExteriorRing(geomPtr)
      if (shell !== 0) {
        const shellSeq = geos.GEOSGeom_getCoordSeq(shell)
        const sizePtr = geos.Module._malloc(4)
        geos.GEOSCoordSeq_getSize(shellSeq, sizePtr)
        const size = geos.Module.getValue(sizePtr, 'i32')
        geos.Module._free(sizePtr)
        if (size > 0) {
          coords.push(geosCoordSeqToGeojsonCoords(shellSeq))
          const numRings = geos.GEOSGetNumInteriorRings(geomPtr)
          for (let i = 0; i < numRings; i++) {
            const hole = geos.GEOSGetInteriorRingN(geomPtr, i)
            const holeSeq = geos.GEOSGeom_getCoordSeq(hole)
            coords.push(geosCoordSeqToGeojsonCoords(holeSeq))
          }
        }
      }
      const polyJson = {
        type: 'Polygon',
        coordinates: coords
      }
      return polyJson
    }
    case geos.GEOS_MULTIPOINT: {
      const coords = []
      const numPoints = geos.GEOSGetNumGeometries(geomPtr)
      for (let i = 0; i < numPoints; i++) {
        const point = geos.GEOSGetGeometryN(geomPtr, i)
        const seq = geos.GEOSGeom_getCoordSeq(point)
        const xPtr = geos.Module._malloc(8)
        const yPtr = geos.Module._malloc(8)
        geos.GEOSCoordSeq_getXY(seq, 0, xPtr, yPtr)
        const x = geos.Module.getValue(xPtr, 'double')
        const y = geos.Module.getValue(yPtr, 'double')
        geos.Module._free(xPtr)
        geos.Module._free(yPtr)
        coords.push([x, y])
      }
      const multiPointJson = {
        type: 'MultiPoint',
        coordinates: coords
      }
      return multiPointJson
    }
    case geos.GEOS_MULTILINESTRING: {
      const coords = []
      const numLines = geos.GEOSGetNumGeometries(geomPtr)
      for (let i = 0; i < numLines; i++) {
        const line = geos.GEOSGetGeometryN(geomPtr, i)
        const seq = geos.GEOSGeom_getCoordSeq(line)
        coords.push(geosCoordSeqToGeojsonCoords(seq))
      }
      const multiLineJson = {
        type: 'MultiLineString',
        coordinates: coords
      }
      return multiLineJson
    }
    case geos.GEOS_MULTIPOLYGON: {
      const coords = []
      const numPolys = geos.GEOSGetNumGeometries(geomPtr)
      for (let i = 0; i < numPolys; i++) {
        const poly = geos.GEOSGetGeometryN(geomPtr, i)
        const polyCoords = []
        const shell = geos.GEOSGetExteriorRing(poly)
        const shellSeq = geos.GEOSGeom_getCoordSeq(shell)
        polyCoords.push(geosCoordSeqToGeojsonCoords(shellSeq))
        const numRings = geos.GEOSGetNumInteriorRings(poly)
        for (let j = 0; j < numRings; j++) {
          const hole = geos.GEOSGetInteriorRingN(poly, j)
          const holeSeq = geos.GEOSGeom_getCoordSeq(hole)
          polyCoords.push(geosCoordSeqToGeojsonCoords(holeSeq))
        }
        coords.push(polyCoords)
      }
      const multiPolyJson = {
        type: 'MultiPolygon',
        coordinates: coords
      }
      return multiPolyJson
    }
    case geos.GEOS_GEOMETRYCOLLECTION: {
      const geoms = []
      const numGeoms = geos.GEOSGetNumGeometries(geomPtr)
      for (let i = 0; i < numGeoms; i++) {
        const geom = geos.GEOSGetGeometryN(geomPtr, i)
        geoms.push(geosGeomToGeojson(geom, geos))
      }
      const geomCollJson = {
        type: 'GeometryCollection',
        geometries: geoms
      }
      return geomCollJson
    }
    default:
      return null
  }
}
