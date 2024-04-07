// Import tape for testing
import test from 'tape'

// Import the geos module
import initGeosJs from '../../build/package/geos.esm.js'
const geos = await initGeosJs()

// Helper function to create a geometry from a WKT string
function createGeom (wkt) {
  const reader = geos.GEOSWKTReader_create()
  const size = wkt.length + 1
  const wktPtr = geos.Module._malloc(size)
  geos.Module.stringToUTF8(wkt, wktPtr, size)
  const geomPtr = geos.GEOSWKTReader_read(reader, wktPtr)
  geos.Module._free(wktPtr)
  geos.GEOSWKTReader_destroy(reader)
  return geomPtr
}

// Helper function to free a geometry
function freeGeom (geomPtr) {
  geos.GEOSGeom_destroy(geomPtr)
}

// Test cases for GEOSIntersects
test('GEOSIntersects', (t) => {
  // Create some geometries to test
  const pointOutside = createGeom('POINT (10 10)')
  const point = createGeom('POINT (0 0)')
  const line = createGeom('LINESTRING (0 0, 1 1)')
  const polygon = createGeom('POLYGON ((0 0, 1 0, 1 1, 0 1, 0 0))')
  const multipoint = createGeom('MULTIPOINT ((0 0), (1 1))')
  const multilinestring = createGeom('MULTILINESTRING ((0 0, 1 1), (2 2, 3 3))')
  const multipolygon = createGeom('MULTIPOLYGON (((0 0, 1 0, 1 1, 0 1, 0 0)), ((2 2, 3 2, 3 3, 2 3, 2 2)))')

  // Test if point intersects line
  t.equal(geos.GEOSIntersects(point, line), 1, 'point intersects line')

  // Test if point intersects polygon
  t.equal(geos.GEOSIntersects(point, polygon), 1, 'point intersects polygon')

  // Test if point intersects multipoint
  t.equal(geos.GEOSIntersects(point, multipoint), 1, 'point intersects multipoint')

  // Test if point intersects multilinestring
  t.equal(geos.GEOSIntersects(point, multilinestring), 1, 'point intersects multilinestring')

  // Test if point intersects multipolygon
  t.equal(geos.GEOSIntersects(point, multipolygon), 1, 'point intersects multipolygon')

  // Test if line intersects polygon
  t.equal(geos.GEOSIntersects(line, polygon), 1, 'line intersects polygon')

  // Test if line intersects multipoint
  t.equal(geos.GEOSIntersects(line, multipoint), 1, 'line intersects multipoint')

  // Test if line intersects multilinestring
  t.equal(geos.GEOSIntersects(line, multilinestring), 1, 'line intersects multilinestring')

  // Test if line intersects multipolygon
  t.equal(geos.GEOSIntersects(line, multipolygon), 1, 'line intersects multipolygon')

  // Test if polygon intersects multipoint
  t.equal(geos.GEOSIntersects(polygon, multipoint), 1, 'polygon intersects multipoint')

  // Test if polygon intersects multilinestring
  t.equal(geos.GEOSIntersects(polygon, multilinestring), 1, 'polygon intersects multilinestring')

  // Test if polygon intersects multipolygon
  t.equal(geos.GEOSIntersects(polygon, multipolygon), 1, 'polygon intersects multipolygon')

  // Test if mulipolygon intersects point oustide
  t.equal(geos.GEOSIntersects(multipolygon, pointOutside), 0, 'multipolygon does not intersect point outside')

  // Free the geometries
  freeGeom(point)
  freeGeom(line)
  freeGeom(polygon)
  freeGeom(multipoint)
  freeGeom(multilinestring)
  freeGeom(multipolygon)

  // End the test
  t.end()
})
