// Import tape for testing
import test from 'tape'

// Import the GEOS module
import initGeosJs from '../../build/package/geos.esm.js'
const geos = await initGeosJs()

// Define a helper function to convert a WKT string to a GEOS geometry
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

// Define some test cases for GEOSCovers
const testCases = [
  {
    name: 'GEOSCovers should return true when the first geometry covers the second',
    g1: 'POLYGON ((0 0, 10 0, 10 10, 0 10, 0 0))',
    g2: 'POLYGON ((2 2, 8 2, 8 8, 2 8, 2 2))',
    expected: 1 // true
  },
  {
    name: 'GEOSCovers should return false when the first geometry does not cover the second',
    g1: 'POLYGON ((0 0, 10 0, 10 10, 0 10, 0 0))',
    g2: 'POLYGON ((5 5, 15 5, 15 15, 5 15, 5 5))',
    expected: 0 // false
  }
]

// Run the tests
testCases.forEach((testCase) => {
  // Convert the WKT strings to GEOS geometries
  const g1Ptr = wktToGeom(testCase.g1)
  const g2Ptr = wktToGeom(testCase.g2)

  // Call the GEOSCovers function and get the result
  const result = geos.GEOSCovers(g1Ptr, g2Ptr)

  // Test if the result matches the expected value
  test(testCase.name, (t) => {
    t.equal(result, testCase.expected)
    t.end()
  })

  // Free the memory allocated for the geometries
  geos.GEOSGeom_destroy(g1Ptr)
  geos.GEOSGeom_destroy(g2Ptr)
})
