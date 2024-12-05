/**
 * Convert GeoJSON object to GEOS geometry pointer.
 * @name geojsonToGeosGeom
 * @kind function
 * @param {GeoJSON} geojson - The GeoJSON object.
 * @param {geos} geos - The GEOS module object.
 * @returns {number} A pointer to GEOS geometry.
 * @example
 * import initGeosJs from 'geos-wasm'
 * import { geojsonToGeosGeom } from 'geos-wasm/helpers'
 * const geos = await initGeosJs()
 * const json = JSON.parse('{"type":"Polygon","coordinates":[[[0,0],[1,0],[1,1],[0,1],[0,0]]]}')
 * const geomPtr = geojsonToGeosGeom(json, geos)
 * const writer = geos.GEOSWKTWriter_create()
 * const wkt = geos.GEOSWKTWriter_write(writer, geomPtr)
 * console.log(wkt)
 * // => POLYGON ((0 0, 1 0, 1 1, 0 1, 0 0))
 * @alias module:geos-helpers
 */
export default function geojsonToGeosGeom (geojson, geos) {
  if (!geojson) {
    throw new Error('No GeoJSON object provided')
  }
  if (!geos) {
    throw new Error('No GEOS module object provided')
  }

  function geojsonCoordsToGeosCoordSeq (coords) {
    if (!coords || coords.length === 0) {
      return null
    }
    const N = coords.length
    const dim = coords[0].length
    const coordArr = new Float64Array(coords.flat())
    const coordPtr = geos.Module._malloc(N * dim * 8)
    geos.Module.HEAPF64.set(coordArr, coordPtr / 8)
    const seqPtr = geos.GEOSCoordSeq_copyFromBuffer(coordPtr, N, dim > 2, false)
    geos.Module._free(coordPtr)
    return seqPtr
  }

  switch (geojson.type) {
    case 'Feature':
      return geojsonToGeosGeom(geojson.geometry, geos)
    case 'FeatureCollection':
      if (geojson.features.length === 0) {
        return geos.GEOSGeom_createEmptyCollection(geos.GEOS_GEOMETRYCOLLECTION)
      } else {
        const geoms = []
        // iterate over each feature
        geojson.features.forEach((feature) => {
          geoms.push(geojsonToGeosGeom(feature.geometry, geos))
        })
        const geomsPtr = geos.Module._malloc(geoms.length * 4)
        const geomsArr = new Uint32Array(geoms)
        geos.Module.HEAPU32.set(geomsArr, geomsPtr / 4)
        const multiGeomsPtr = geos.GEOSGeom_createCollection(
          7, // geos.GEOS_GEOMETRYCOLLECTION
          geomsPtr,
          geoms.length
        )
        geos.Module._free(geomsPtr)
        return multiGeomsPtr
      }
    case 'GeometryCollection':
      if (geojson.geometries.length === 0) {
        return geos.GEOSGeom_createEmptyCollection(geos.GEOS_GEOMETRYCOLLECTION)
      } else {
        const geoms = []
        // iterate over each feature
        geojson.geometries.forEach((feature) => {
          geoms.push(geojsonToGeosGeom(feature, geos))
        })
        const geomsPtr = geos.Module._malloc(geoms.length * 4)
        const geomsArr = new Uint32Array(geoms)
        geos.Module.HEAPU32.set(geomsArr, geomsPtr / 4)
        const multiGeomsPtr = geos.GEOSGeom_createCollection(
          geos.GEOS_GEOMETRYCOLLECTION,
          geomsPtr,
          geoms.length
        )
        geos.Module._free(geomsPtr)
        return multiGeomsPtr
      }
    case 'Point':
      if (geojson.coordinates.length === 0) {
        return geos.GEOSGeom_createEmptyPoint()
      } else if (geojson.coordinates.length === 2) {
        return geos.GEOSGeom_createPointFromXY(
          geojson.coordinates[0],
          geojson.coordinates[1]
        )
      } else {
        const seq = geojsonCoordsToGeosCoordSeq([geojson.coordinates])
        return geos.GEOSGeom_createPoint(seq)
      }
    case 'LineString':
      if (geojson.coordinates.length === 0) {
        return geos.GEOSGeom_createEmptyLineString()
      } else {
        const seq = geojsonCoordsToGeosCoordSeq(geojson.coordinates)
        return geos.GEOSGeom_createLineString(seq)
      }
    case 'Polygon':
      if (geojson.coordinates.length === 0) {
        return geos.GEOSGeom_createEmptyPolygon()
      } else {
        const shellSeq = geojsonCoordsToGeosCoordSeq(geojson.coordinates[0])
        const shell = geos.GEOSGeom_createLinearRing(shellSeq)
        const holes = []
        if (geojson.coordinates.length > 1) {
          for (let i = 1; i < geojson.coordinates.length; i++) {
            const holeSeq = geojsonCoordsToGeosCoordSeq(geojson.coordinates[i])
            holes.push(geos.GEOSGeom_createLinearRing(holeSeq))
          }
        }
        let holesPtr = null
        if (holes.length > 0) {
          const holesArr = new Uint32Array(holes)
          holesPtr = geos.Module._malloc(holes.length * 4)
          geos.Module.HEAPU32.set(holesArr, holesPtr / 4)
        }
        const polyPtr = geos.GEOSGeom_createPolygon(
          shell,
          holesPtr,
          holes.length
        )
        if (holes.length > 0) {
          geos.Module._free(holesPtr)
        }
        return polyPtr
      }
    case 'MultiPoint':
      if (geojson.coordinates.length === 0) {
        return geos.GEOSGeom_createEmptyCollection(geos.GEOS_MULTIPOINT)
      } else {
        const points = []
        for (let i = 0; i < geojson.coordinates.length; i++) {
          if (geojson.coordinates[i].length === 2) {
            points.push(
              geos.GEOSGeom_createPointFromXY(
                geojson.coordinates[i][0],
                geojson.coordinates[i][1]
              )
            )
          } else {
            const seq = geojsonCoordsToGeosCoordSeq([geojson.coordinates[i]])
            points.push(geos.GEOSGeom_createPoint(seq))
          }
        }
        const pointsPtr = geos.Module._malloc(points.length * 4)
        const pointsArr = new Uint32Array(points)
        geos.Module.HEAPU32.set(pointsArr, pointsPtr / 4)
        const multiPointPtr = geos.GEOSGeom_createCollection(
          4, // geos.GEOS_MULTIPOINT
          pointsPtr,
          points.length
        )
        geos.Module._free(pointsPtr)
        return multiPointPtr
      }
    case 'MultiLineString':
      if (geojson.coordinates.length === 0) {
        return geos.GEOSGeom_createEmptyCollection(geos.GEOS_MULTILINESTRING)
      } else {
        const lines = []
        for (let i = 0; i < geojson.coordinates.length; i++) {
          const seq = geojsonCoordsToGeosCoordSeq(geojson.coordinates[i])
          lines.push(geos.GEOSGeom_createLineString(seq))
        }
        const linesPtr = geos.Module._malloc(lines.length * 4)
        const linesArr = new Uint32Array(lines)
        geos.Module.HEAPU32.set(linesArr, linesPtr / 4)
        const multiLinePtr = geos.GEOSGeom_createCollection(
          5, // geos.GEOS_MULTILINESTRING
          linesPtr,
          lines.length
        )
        geos.Module._free(linesPtr)
        return multiLinePtr
      }
    case 'MultiPolygon':
      if (geojson.coordinates.length === 0) {
        return geos.GEOSGeom_createEmptyCollection(geos.GEOS_MULTIPOLYGON)
      } else {
        const polygons = []
        for (let i = 0; i < geojson.coordinates.length; i++) {
          const shellSeq = geojsonCoordsToGeosCoordSeq(
            geojson.coordinates[i][0]
          )
          const shell = geos.GEOSGeom_createLinearRing(shellSeq)
          const holes = []
          if (geojson.coordinates[i].length > 1) {
            for (let j = 1; j < geojson.coordinates[i].length; j++) {
              const holeSeq = geojsonCoordsToGeosCoordSeq(
                geojson.coordinates[i][j]
              )
              holes.push(geos.GEOSGeom_createLinearRing(holeSeq))
            }
          }
          let holesPtr = null
          if (holes.length > 0) {
            const holesArr = new Uint32Array(holes)
            holesPtr = geos.Module._malloc(holes.length * 4)
            geos.Module.HEAPU32.set(holesArr, holesPtr / 4)
          }
          const polyPtr = geos.GEOSGeom_createPolygon(
            shell,
            holesPtr,
            holes.length
          )
          if (holes.length > 0) {
            geos.Module._free(holesPtr)
          }
          polygons.push(polyPtr)
        }
        const polygonsPtr = geos.Module._malloc(polygons.length * 4)
        const polygonsArr = new Uint32Array(polygons)
        geos.Module.HEAPU32.set(polygonsArr, polygonsPtr / 4)
        const multiPolyPtr = geos.GEOSGeom_createCollection(
          geos.GEOS_MULTIPOLYGON,
          polygonsPtr,
          polygons.length
        )
        geos.Module._free(polygonsPtr)
        return multiPolyPtr
      }
    default:
      throw new Error('Unsupported GeoJSON type: ' + geojson.type + '. Are you sure this is valid GeoJSON?')
  }
}
