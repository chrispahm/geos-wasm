// Import tape for testing
import test from 'tape'

// Import the geos module
import initGeosJs from '../../build/package/geos.esm.js'
const geos = await initGeosJs()

// Define a helper function to create a GEOS geometry from a WKT string
const createGeomFromWKT = (wkt) => {
  const reader = geos.GEOSWKTReader_create()
  const size = wkt.length + 1
  const wktPtr = geos.Module._malloc(size)
  geos.Module.stringToUTF8(wkt, wktPtr, size)
  const geomPtr = geos.GEOSWKTReader_read(reader, wktPtr)
  geos.Module._free(wktPtr)
  geos.GEOSWKTReader_destroy(reader)
  return geomPtr
}

// Define some test cases with WKT strings and expected number of interior rings
const testCases = [
  {
    wkt: 'POLYGON ((0 0, 1 0, 1 1, 0 1, 0 0))', // A simple polygon with no holes
    expected: 0
  },
  {
    wkt: 'POLYGON ((0 0, 10 0, 10 10, 0 10, 0 0), (1 1, 2 1, 2 2, 1 2, 1 1), (8 8, 9 8, 9 9, 8 9, 8 8))', // A polygon with two holes
    expected: 2
  }
]

// Run the tests using tape
test('GEOSGetNumInteriorRings', (t) => {
  // Loop through the test cases
  for (const testCase of testCases) {
    // Create a GEOS geometry from the WKT string
    const geomPtr = createGeomFromWKT(testCase.wkt)

    // Call the GEOS function to get the number of interior rings
    const numInteriorRings = geos.GEOSGetNumInteriorRings(geomPtr)

    // Check if the result matches the expected value
    t.equal(numInteriorRings, testCase.expected, `GEOSGetNumInteriorRings(${testCase.wkt}) should return ${testCase.expected}`)

    // Destroy the GEOS geometry to free memory
    geos.GEOSGeom_destroy(geomPtr)
  }

  // End the test
  t.end()
})
