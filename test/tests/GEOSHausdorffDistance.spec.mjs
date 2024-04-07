// Import tape for testing
import test from 'tape'

// Import the GEOS module
import initGeosJs from '../../build/package/geos.esm.js'
const geos = await initGeosJs()

// Define a helper function to convert a WKT string to a GEOS geometry pointer
const wktToGeom = (reader, wkt) => {
  const size = wkt.length + 1
  const wktPtr = geos.Module._malloc(size)
  geos.Module.stringToUTF8(wkt, wktPtr, size)
  const geomPtr = geos.GEOSWKTReader_read(reader, wktPtr)
  geos.Module._free(wktPtr)
  return geomPtr
}

// Define some test cases
const testCases = [
  {
    name: 'Two identical points',
    wkt1: 'POINT (0 0)',
    wkt2: 'POINT (0 0)',
    expected: 0
  },
  {
    name: 'Two different points',
    wkt1: 'POINT (0 0)',
    wkt2: 'POINT (1 1)',
    expected: Math.sqrt(2)
  },
  {
    name: 'Point and line',
    wkt1: 'POINT (0 0)',
    wkt2: 'LINESTRING (1 0, 1 1)',
    expected: Math.sqrt(2)
  },
  {
    name: 'Line and polygon',
    wkt1: 'LINESTRING (0 0, 2 0)',
    wkt2: 'POLYGON ((1 -1, 3 -1, 3 1, 1 1, 1 -1))',
    expected: Math.sqrt(2)
  }
]

// Run the tests using tape
test('GEOSHausdorffDistance', (t) => {
  t.plan(testCases.length * 2)

  // Create a reader and a writer for WKT
  const reader = geos.GEOSWKTReader_create()
  const writer = geos.GEOSWKTWriter_create()

  // Loop over the test cases
  for (const testCase of testCases) {
    // Convert the WKT strings to GEOS geometries
    const geomPtr1 = wktToGeom(reader, testCase.wkt1)
    const geomPtr2 = wktToGeom(reader, testCase.wkt2)

    // Create a pointer for the result
    const resultPtr = geos.Module._malloc(8) // double is 8 bytes

    // Call the GEOS function
    const retcode = geos.GEOSHausdorffDistance(geomPtr1, geomPtr2, resultPtr)

    // Read the result value
    const result = geos.Module.getValue(resultPtr, 'double')

    // Free the memory
    geos.GEOSGeom_destroy(geomPtr1)
    geos.GEOSGeom_destroy(geomPtr2)
    geos.GEOSFree(resultPtr)

    // Check the return code and the result value
    t.equal(retcode, 1, 'GEOS function should return 1')
    t.equal(result, testCase.expected, 'Hausdorff distance should match expected value')
  }

  // Destroy the reader and writer
  geos.GEOSWKTReader_destroy(reader)
  geos.GEOSWKTWriter_destroy(writer)
  // End the test
  t.end()
})
