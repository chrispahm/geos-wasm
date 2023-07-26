// import tape and initGeosJs
import initGeosJs from '../../build/package/geos.esm.js'
import test from 'tape'

// initialize geos
const geos = await initGeosJs()

// create a reader and a writer for WKT
const reader = geos.GEOSWKTReader_create()
const writer = geos.GEOSWKTWriter_create()

// create a helper function to convert WKT to GEOS geometry
const wktToGeom = (wkt) => {
  return geos.GEOSWKTReader_read(reader, wkt)
}

// create a helper function to get the length of a GEOS geometry
const getLength = (geomPtr) => {
  // create a pointer for the result
  const lengthPtr = geos.Module._malloc(8) // 8 bytes for double
  // call the GEOSLength function and check the return value
  const success = geos.GEOSLength(geomPtr, lengthPtr)
  if (success === 0) {
    // something went wrong, throw an error
    throw new Error('GEOSLength failed')
  }
  // read the value from the pointer
  const length = geos.Module.getValue(lengthPtr, 'double')
  // free the pointer
  geos.GEOSFree(lengthPtr)
  // return the length
  return length
}

// test cases for GEOSLength
test('GEOSLength', (t) => {
  // test a point geometry
  const pointWkt = 'POINT (0 0)'
  const pointGeom = wktToGeom(pointWkt)
  t.equal(getLength(pointGeom), 0, 'point has zero length')

  // test a line geometry
  const lineWkt = 'LINESTRING (0 0, 1 1)'
  const lineGeom = wktToGeom(lineWkt)
  t.equal(getLength(lineGeom), Math.sqrt(2), 'line has length equal to diagonal')

  // test a polygon geometry
  const polygonWkt = 'POLYGON ((0 0, 1 0, 1 1, 0 1, 0 0))'
  const polygonGeom = wktToGeom(polygonWkt)
  t.equal(getLength(polygonGeom), 4, 'polygon has length equal to perimeter')

  // free all geometries
  geos.GEOSGeom_destroy(pointGeom)
  geos.GEOSGeom_destroy(lineGeom)
  geos.GEOSGeom_destroy(polygonGeom)

  // destroy the reader and writer
  geos.GEOSWKTReader_destroy(reader)
  geos.GEOSWKTWriter_destroy(writer)

  // end the test
  t.end()
})
