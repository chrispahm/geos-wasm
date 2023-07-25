// Import tape for testing
import test from 'tape'

// Import the geos module
import initGeosJs from '../../build/package/geos.esm.js'
const geos = await initGeosJs()

// Define some WKT strings to test
const wktPoint = 'POINT (0 0)'
const wktLine = 'LINESTRING (0 0, 1 1)'
const wktPolygon = 'POLYGON ((0 0, 1 0, 1 1, 0 1, 0 0))'
const wktMultiPoint = 'MULTIPOINT ((0 0), (1 1))'
const wktMultiLine = 'MULTILINESTRING ((0 0, 1 1), (2 2, 3 3))'
const wktMultiPolygon = 'MULTIPOLYGON (((0 0, 1 0, 1 1, 0 1, 0 0)), ((2 2, 3 2, 3 3, 2 3, 2 2)))'

// Define a helper function to convert a WKT string to a GEOS geometry
function wktToGeom (wkt) {
  const reader = geos.GEOSWKTReader_create()
  const geomPtr = geos.GEOSWKTReader_read(reader, wkt)
  geos.GEOSWKTReader_destroy(reader)
  return geomPtr
}

// Define a test suite for the GEOSGetNumGeometries function
test('GEOSGetNumGeometries', t => {
  // Test point geometry
  let geomPtr = wktToGeom(wktPoint)
  t.equal(geos.GEOSGetNumGeometries(geomPtr), 1, 'point has one geometry')
  geos.GEOSGeom_destroy(geomPtr)

  // Test line geometry
  geomPtr = wktToGeom(wktLine)
  t.equal(geos.GEOSGetNumGeometries(geomPtr), 1, 'line has one geometry')
  geos.GEOSGeom_destroy(geomPtr)

  // Test polygon geometry
  geomPtr = wktToGeom(wktPolygon)
  t.equal(geos.GEOSGetNumGeometries(geomPtr), 1, 'polygon has one geometry')
  geos.GEOSGeom_destroy(geomPtr)

  // Test multipoint geometry
  geomPtr = wktToGeom(wktMultiPoint)
  t.equal(geos.GEOSGetNumGeometries(geomPtr), 2, 'multipoint has two geometries')
  geos.GEOSGeom_destroy(geomPtr)

  // Test multiline geometry
  geomPtr = wktToGeom(wktMultiLine)
  t.equal(geos.GEOSGetNumGeometries(geomPtr), 2, 'multiline has two geometries')
  geos.GEOSGeom_destroy(geomPtr)

  // Test multipolygon geometry
  geomPtr = wktToGeom(wktMultiPolygon)
  t.equal(geos.GEOSGetNumGeometries(geomPtr), 2, 'multipolygon has two geometries')
  geos.GEOSGeom_destroy(geomPtr)

  // End the test suite
  t.end()
})
