import { geos } from '../allCFunctions.mjs'

export function jsonGeomToGeosGeom (geojson) {
  // assume only 2d (x, y) geometries
  switch (geojson.type) {
    case 'FeatureCollection':
    case 'GeometryCollection':
      if (geojson.features.length === 0) {
        return geos.GEOSGeom_createEmptyCollection()
      } else {
        const geoms = []
        // iterate over each feature
        geojson.features.forEach((feature) => {
          geoms.push(jsonGeomToGeosGeom(feature.geometry))
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
    case 'Point':
      if (geojson.coordinates.length === 0) {
        return geos.GEOSGeom_createEmptyPoint()
      } else {
        return geos.GEOSGeom_createPointFromXY(geojson.coordinates[0], geojson.coordinates[1])
      }
    case 'LineString':
      if (geojson.coordinates.length === 0) {
        return geos.GEOSGeom_createEmptyLineString()
      } else {
        const seq = jsonCoordsToGeosCoordSeq(geojson.coordinates)
        return geos.GEOSGeom_createLinsString(seq)
      }
    case 'Polygon':
      if (geojson.coordinates.length === 0) {
        return geos.GEOSGeom_createEmptyPolygon()
      } else {
        const shellSeq = jsonCoordsToGeosCoordSeq(geojson.coordinates[0])
        const shell = geos.GEOSGeom_createLinearRing(shellSeq)
        const holes = []
        if (geojson.coordinates.length > 1) {
          for (let i = 1; i < geojson.coordinates.length; i++) {
            const holeSeq = jsonCoordsToGeosCoordSeq(geojson.coordinates[i])
            holes.push(geos.GEOSGeom_createLinearRing(holeSeq))
          }
        }
        let holesPtr = null
        if (holes.length > 0) {
          const holesArr = new Uint32Array(holes)
          holesPtr = geos.Module._malloc(holes.length * 4)
          geos.Module.HEAPU32.set(holesArr, holesPtr / 4)
        }
        const polyPtr = geos.GEOSGeom_createPolygon(shell, holesPtr, holes.length)
        if (holes.length > 0) {
          geos.Module._free(holesPtr)
        }
        return polyPtr
      }
    case 'MultiPoint':
      if (geojson.coordinates.length === 0) {
        return geos.GEOSGeom_createEmptyMultiPoint()
      } else {
        const points = []
        for (let i = 0; i < geojson.coordinates.length; i++) {
          points.push(geos.GEOSGeom_createPointFromXY(geojson.coordinates[i][0], geojson.coordinates[i][1]))
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
        return geos.GEOSGeom_createEmptyMultiLineString()
      } else {
        const lines = []
        for (let i = 0; i < geojson.coordinates.length; i++) {
          const seq = jsonCoordsToGeosCoordSeq(geojson.coordinates[i])
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
        return geos.GEOSGeom_createEmptyMultiPolygon()
      } else {
        const polygons = []
        for (let i = 0; i < geojson.coordinates.length; i++) {
          const shellSeq = jsonCoordsToGeosCoordSeq(geojson.coordinates[i][0])
          const shell = geos.GEOSGeom_createLinearRing(shellSeq)
          const holes = []
          if (geojson.coordinates[i].length > 1) {
            for (let j = 1; j < geojson.coordinates[i].length; j++) {
              const holeSeq = jsonCoordsToGeosCoordSeq(geojson.coordinates[i][j])
              holes.push(geos.GEOSGeom_createLinearRing(holeSeq))
            }
          }
          let holesPtr = null
          if (holes.length > 0) {
            const holesArr = new Uint32Array(holes)
            holesPtr = geos.Module._malloc(holes.length * 4)
            geos.Module.HEAPU32.set(holesArr, holesPtr / 4)
          }
          const polyPtr = geos.GEOSGeom_createPolygon(shell, holesPtr, holes.length)
          if (holes.length > 0) {
            geos.Module._free(holesPtr)
          }
          polygons.push(polyPtr)
        }
        const polygonsPtr = geos.Module._malloc(polygons.length * 4)
        const polygonsArr = new Uint32Array(polygons)
        geos.Module.HEAPU32.set(polygonsArr, polygonsPtr / 4)
        const multiPolyPtr = geos.GEOSGeom_createCollection(
          6, // geos.GEOS_MULTIPOLYGON
          polygonsPtr,
          polygons.length
        )
        geos.Module._free(polygonsPtr)
        return multiPolyPtr
      }
    default:
      return null
  }
}

export function geosGeomToJsonGeom (geomPtr) {
  if (!geomPtr) {
    return null
  }
  const geomType = geos.GEOSGeomTypeId(geomPtr)
  switch (geomType) {
    case 0: // geos.GEOS_POINT
    {
      const seq = geos.GEOSGeom_getCoordSeq(geomPtr)
      const xPtr = geos.Module._malloc(8)
      const yPtr = geos.Module._malloc(8)
      geos.GEOSCoordSeq_getXY(seq, 0, xPtr, yPtr)
      const x = geos.Module.getValue(xPtr, 'double')
      const y = geos.Module.getValue(yPtr, 'double')
      geos.Module._free(xPtr)
      geos.Module._free(yPtr)
      const pointJson = {
        type: 'Point',
        coordinates: [x, y]
      }
      return pointJson
    }
    case 1: // geos.GEOS_LINESTRING
    {
      const seq = geos.GEOSGeom_getCoordSeq(geomPtr)
      const coords = geosCoordSeqToJsonCoords(seq)
      const lineJson = {
        type: 'LineString',
        coordinates: coords
      }
      return lineJson
    }
    // case 2: // geos.GEOS_LINEARRING ... should not happen
    case 3: // geos.GEOS_POLYGON
    {
      const coords = []
      const shell = geos.GEOSGetExteriorRing(geomPtr)
      const shellSeq = geos.GEOSGeom_getCoordSeq(shell)
      coords.push(geosCoordSeqToJsonCoords(shellSeq))
      const numRings = geos.GEOSGetNumInteriorRings(geomPtr)
      for (let i = 0; i < numRings; i++) {
        const hole = geos.GEOSGetInteriorRingN(geomPtr, i)
        const holeSeq = geos.GEOSGeom_getCoordSeq(hole)
        coords.push(geosCoordSeqToJsonCoords(holeSeq))
      }
      const polyJson = {
        type: 'Polygon',
        coordinates: coords
      }
      return polyJson
    }
    case 4: // geos.GEOS_MULTIPOINT
    {
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
    case 5: // geos.GEOS_MULTILINESTRING
    {
      const coords = []
      const numLines = geos.GEOSGetNumGeometries(geomPtr)
      for (let i = 0; i < numLines; i++) {
        const line = geos.GEOSGetGeometryN(geomPtr, i)
        const seq = geos.GEOSGeom_getCoordSeq(line)
        coords.push(geosCoordSeqToJsonCoords(seq))
      }
      const multiLineJson = {
        type: 'MultiLineString',
        coordinates: coords
      }
      return multiLineJson
    }
    case 6: // geos.GEOS_MULTIPOLYGON
    {
      const coords = []
      const numPolys = geos.GEOSGetNumGeometries(geomPtr)
      for (let i = 0; i < numPolys; i++) {
        const poly = geos.GEOSGetGeometryN(geomPtr, i)
        const polyCoords = []
        const shell = geos.GEOSGetExteriorRing(poly)
        const shellSeq = geos.GEOSGeom_getCoordSeq(shell)
        polyCoords.push(geosCoordSeqToJsonCoords(shellSeq))
        const numRings = geos.GEOSGetNumInteriorRings(poly)
        for (let j = 0; j < numRings; j++) {
          const hole = geos.GEOSGetInteriorRingN(poly, j)
          const holeSeq = geos.GEOSGeom_getCoordSeq(hole)
          polyCoords.push(geosCoordSeqToJsonCoords(holeSeq))
        }
        coords.push(polyCoords)
      }
      const multiPolyJson = {
        type: 'MultiPolygon',
        coordinates: coords
      }
      return multiPolyJson
    }
    case 7: // geos.GEOS_GEOMETRYCOLLECTION
    {
      const geoms = []
      const numGeoms = geos.GEOSGetNumGeometries(geomPtr)
      for (let i = 0; i < numGeoms; i++) {
        const geom = geos.GEOSGetGeometryN(geomPtr, i)
        geoms.push(geosGeomToJsonGeom(geom))
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

function jsonCoordsToGeosCoordSeq (coords) {
  if (!coords || coords.length === 0) {
    return null
  }
  const N = coords.length
  const dim = 2 // coords[0].length
  const coordArr = new Float64Array(coords.flat())
  const coordPtr = geos.Module._malloc(N * dim * 8)
  geos.Module.HEAPF64.set(coordArr, coordPtr / 8)
  const seqPtr = geos.GEOSCoordSeq_copyFromBuffer(coordPtr, N, false, false)
  geos.Module._free(coordPtr)
  return seqPtr
}

function geosCoordSeqToJsonCoords (seqPtr) {
  if (!seqPtr) {
    return null
  }
  const sizePtr = geos.Module._malloc(4)
  geos.GEOSCoordSeq_getSize(seqPtr, sizePtr)
  const size = geos.Module.getValue(sizePtr, 'i32')
  geos.Module._free(sizePtr)
  const coords = []
  const coordsPtr = geos.Module._malloc(size * 2 * 8)
  geos.GEOSCoordSeq_copyToBuffer(seqPtr, coordsPtr, false, false)
  const view = new Float64Array(geos.Module.HEAPF64.buffer, coordsPtr, size * 2)
  for (let i = 0; i < size; i++) {
    coords.push(view[i], view[i + 1])
  }
  geos.Module._free(coordsPtr)
  return coords
}
