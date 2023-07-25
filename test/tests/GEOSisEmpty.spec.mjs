// Import tape for testing
import test from 'tape'

// Import the GEOS module
import initGeosJs from '../../build/package/geos.esm.js'
const geos = await initGeosJs()

// Define a helper function to convert a WKT string to a GEOS geometry
function wktToGeom (wkt) {
  const reader = geos.GEOSWKTReader_create()
  const geomPtr = geos.GEOSWKTReader_read(reader, wkt)
  geos.GEOSWKTReader_destroy(reader)
  return geomPtr
}

// Define a test case for the GEOSisEmpty function
test('GEOSisEmpty', (t) => {
  // Create some geometries from WKT strings
  const emptyPoint = wktToGeom('POINT EMPTY')
  const point = wktToGeom('POINT (0 0)')
  const emptyLineString = wktToGeom('LINESTRING EMPTY')
  const lineString = wktToGeom('LINESTRING (0 0, 1 1)')
  const emptyPolygon = wktToGeom('POLYGON EMPTY')
  const polygon = wktToGeom('POLYGON ((0 0, 1 0, 1 1, 0 1, 0 0))')

  // Test if the geometries are empty or not
  t.equal(geos.GEOSisEmpty(emptyPoint), 1, 'empty point is empty')
  t.equal(geos.GEOSisEmpty(point), 0, 'point is not empty')
  t.equal(geos.GEOSisEmpty(emptyLineString), 1, 'empty line string is empty')
  t.equal(geos.GEOSisEmpty(lineString), 0, 'line string is not empty')
  t.equal(geos.GEOSisEmpty(emptyPolygon), 1, 'empty polygon is empty')
  t.equal(geos.GEOSisEmpty(polygon), 0, 'polygon is not empty')

  // Destroy the geometries
  geos.GEOSGeom_destroy(emptyPoint)
  geos.GEOSGeom_destroy(point)
  geos.GEOSGeom_destroy(emptyLineString)
  geos.GEOSGeom_destroy(lineString)
  geos.GEOSGeom_destroy(emptyPolygon)
  geos.GEOSGeom_destroy(polygon)

  // End the test
  t.end()
})
