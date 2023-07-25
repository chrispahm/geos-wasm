// Import tape for testing
import test from 'tape'

// Import the GEOS module
import initGeosJs from '../../build/package/geos.esm.js'
const geos = await initGeosJs()

// Test the GEOSCoveredBy function
test('GEOSCoveredBy', function (t) {
  // Define some WKT strings for testing
  const wkt1 = 'POLYGON ((0 0, 1 0, 1 1, 0 1, 0 0))'
  const wkt2 = 'POLYGON ((-1 -1, 2 -1, 2 2, -1 2, -1 -1))'
  const wkt3 = 'POINT (0.5 0.5)'
  const wkt4 = 'POINT (2 2)'

  // Create a reader and a writer for WKT
  const reader = geos.GEOSWKTReader_create()
  const writer = geos.GEOSWKTWriter_create()

  // Convert WKT strings to GEOS geometries
  const geomPtr1 = geos.GEOSWKTReader_read(reader, wkt1)
  const geomPtr2 = geos.GEOSWKTReader_read(reader, wkt2)
  const geomPtr3 = geos.GEOSWKTReader_read(reader, wkt3)
  const geomPtr4 = geos.GEOSWKTReader_read(reader, wkt4)

  // Check if geomPtr1 is covered by geomPtr2
  const result1 = geos.GEOSCoveredBy(geomPtr1, geomPtr2)
  t.equal(result1, 1, 'geomPtr1 is covered by geomPtr2')

  // Check if geomPtr3 is covered by geomPtr1
  const result2 = geos.GEOSCoveredBy(geomPtr3, geomPtr1)
  t.equal(result2, 1, 'geomPtr3 is covered by geomPtr1')

  // Check if geomPtr4 is covered by geomPtr2
  const result3 = geos.GEOSCoveredBy(geomPtr4, geomPtr2)
  t.equal(result3, 1, 'geomPtr4 is covered by geomPtr2')

  // Check if geomPtr4 is covered by geomPtr3
  const result4 = geos.GEOSCoveredBy(geomPtr4, geomPtr3)
  t.equal(result4, 0, 'geomPtr4 is not covered by geomPtr3')

  // Free all memory
  geos.GEOSWKTReader_destroy(reader)
  geos.GEOSWKTWriter_destroy(writer)
  geos.GEOSGeom_destroy(geomPtr1)
  geos.GEOSGeom_destroy(geomPtr2)
  geos.GEOSGeom_destroy(geomPtr3)
  geos.GEOSGeom_destroy(geomPtr4)
  // End the test case
  t.end()
})
