// Import tape for testing
import test from 'tape'

// Import the geos module
import initGeosJs from '../../build/package/geos.esm.js'
const geos = await initGeosJs()

// Define some test cases for GEOSContains
const testCases = [
  {
    name: 'Polygon contains point',
    geom1: 'POLYGON ((0 0, 1 0, 1 1, 0 1, 0 0))',
    geom2: 'POINT (0.5 0.5)',
    expected: 1 // true
  },
  {
    name: 'Polygon does not contain point',
    geom1: 'POLYGON ((0 0, 1 0, 1 1, 0 1, 0 0))',
    geom2: 'POINT (2 2)',
    expected: 0 // false
  },
  {
    name: 'Polygon contains line',
    geom1: 'POLYGON ((0 0, 3 0, 3 3, 0 3, 0 0))',
    geom2: 'LINESTRING (1 1, 2 2)',
    expected: 1 // true
  }
]

// Run the tests using tape
test('GEOSContains', (t) => {
  // Create a reader and a writer for WKT
  const reader = geos.GEOSWKTReader_create()
  const writer = geos.GEOSWKTWriter_create()
  // Set the writer output precision to 0
  geos.GEOSWKTWriter_setRoundingPrecision(writer, 0)

  // Loop through the test cases
  for (const testCase of testCases) {
    // Create the geometries from the WKT strings
    const geom1 = geos.GEOSWKTReader_read(reader, testCase.geom1)
    const geom2 = geos.GEOSWKTReader_read(reader, testCase.geom2)

    // Call the GEOSContains function and get the result
    const result = geos.GEOSContains(geom1, geom2)

    // Compare the result with the expected value
    t.equal(result, testCase.expected, testCase.name)

    // Destroy the geometries to free memory
    geos.GEOSGeom_destroy(geom1)
    geos.GEOSGeom_destroy(geom2)
  }

  // Destroy the reader and writer
  geos.GEOSWKTReader_destroy(reader)
  geos.GEOSWKTWriter_destroy(writer)

  // End the test
  t.end()
})
