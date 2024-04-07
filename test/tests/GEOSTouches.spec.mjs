// Import the module with the function
import initGeosJs from '../../build/package/geos.esm.js'

// Import the Tape test framework
import test from 'tape'
const geos = await initGeosJs()

// Convert a WKT string to a GEOS geometry
function wktToGeom (wkt) {
  const reader = geos.GEOSWKTReader_create()
  const size = wkt.length + 1
  const wktPtr = geos.Module._malloc(size)
  geos.Module.stringToUTF8(wkt, wktPtr, size)
  const geomPtr = geos.GEOSWKTReader_read(reader, wktPtr)
  geos.Module._free(wktPtr)
  geos.GEOSWKTReader_destroy(reader)
  return geomPtr
}

// Test the GEOSTouches function with different geometries
test('GEOSTouches test', function (t) {
  // Plan the number of assertions
  t.plan(4)

  // Create some geometries from WKT strings
  const polygon1 = wktToGeom('POLYGON ((0 0, 1 0, 1 1, 0 1, 0 0))')
  const polygon2 = wktToGeom('POLYGON ((1 0, 2 0, 2 1, 1 1, 1 0))')
  const polygon3 = wktToGeom('POLYGON ((0.5 -0.5, 1.5 -0.5, 1.5 -1.5, 0.5 -1.5, 0.5 -0.5))')
  const line = wktToGeom('LINESTRING (0.5 -0.5, 1.5 -0.5)')

  // Test if two polygons touch
  let result = geos.GEOSTouches(polygon1, polygon2)

  // Check the result with an assertion
  t.equal(result, 1, 'polygon1 touches polygon2')

  // Test if a polygon and a line touch
  result = geos.GEOSTouches(polygon3, line)

  // Check the result with an assertion
  t.equal(result, 1, 'polygon3 touches line')

  // Test if two polygons do not touch
  result = geos.GEOSTouches(polygon1, polygon3)

  // Check the result with an assertion
  t.equal(result, 0, 'polygon1 does not touch polygon3')

  // Test if a polygon and a line do not touch
  result = geos.GEOSTouches(polygon2, line)

  // Check the result with an assertion
  t.equal(result, 0, 'polygon2 does not touch line')

  // Destroy the geometries and free the memory
  geos.GEOSGeom_destroy(polygon1)
  geos.GEOSGeom_destroy(polygon2)
  geos.GEOSGeom_destroy(polygon3)
  geos.GEOSGeom_destroy(line)
})
