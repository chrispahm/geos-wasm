// Import tape for testing
import test from 'tape'

// Import the GEOS module
import initGeosJs from '../../build/package/geos.esm.js'
const geos = await initGeosJs()

// GEOSisSimple tests if a geometry is simple according to the OGC definition
// It takes a GEOSGeometry pointer as input and returns 1 if simple, 0 if not, or -1 on error
// See https://libgeos.org/doxygen/geos__c_8h.html#a7a6f3f4f8b9d9a0b3c0e5c2a4b7f6b1a

// Create a WKT reader and writer
const reader = geos.GEOSWKTReader_create()
const writer = geos.GEOSWKTWriter_create()

// Test cases with expected results
const testCases = [
  { wkt: 'LINESTRING (0 0, 1 1, 2 2)', expected: 1 },
  { wkt: 'LINESTRING (0 0, 1 1, 1 0)', expected: 1 },
  { wkt: 'LINESTRING (0 0, 1 1, 2 0, 1 -1, 1 2)', expected: 0 }
  // { wkt: 'POLYGON ((0 0, 1 0, 1 -1, -1 -1, -1 -2, -2 -2, -2 -3, -3 -3, -3 -4, -4 -4, -4 -5, -5 -5, -5 -6, -6 -6, -6 -7, -7 -7, -7 -8, -8 -8, -8 -9, -9 -9, -9 -10))', expected: 0 }
]

// Run the tests
test('GEOSisSimple', (t) => {
  // Loop through the test cases
  for (const testCase of testCases) {
    // Convert the WKT string to a GEOS geometry pointer
    const geomPtr = geos.GEOSWKTReader_read(reader, testCase.wkt)

    // Call the GEOSisSimple function with the geometry pointer
    const result = geos.GEOSisSimple(geomPtr)

    // Log the result and compare it with the expected value
    console.log(`GEOSisSimple(${testCase.wkt}) = ${result}`)
    t.equal(result, testCase.expected)

    // Destroy the geometry pointer to free memory
    geos.GEOSGeom_destroy(geomPtr)
  }

  // Destroy the reader and writer to free memory
  geos.GEOSWKTReader_destroy(reader)
  geos.GEOSWKTWriter_destroy(writer)

  // End the test
  t.end()
})
