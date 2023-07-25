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

// Define some test cases for GEOSCovers
const testCases = [
  {
    name: 'GEOSDisjoint should return true if no point of either geometry touchess or is within the other.',
    g1: 'POLYGON((0 0, 0 1, 1 1, 1 0, 0 0))',
    g2: 'POLYGON((2 2, 2 8, 8 8, 8 2, 2 2))',
    expected: 1 // true
  },
  {
    name: 'GEOSDisjoint should return false if a point of either geometry touchess or is within the other.',
    g1: 'POLYGON ((0 0, 0 5, 5 5, 5 0, 0 0))',
    g2: 'POLYGON ((3 3, 3 7, 7 7, 7 3, 3 3))',
    expected: 0 // false
  }]

// Run the tests
testCases.forEach((testCase) => {
  // Convert the WKT strings to GEOS geometries
  const g1Ptr = wktToGeom(testCase.g1)
  const g2Ptr = wktToGeom(testCase.g2)

  // Call the GEOSCovers function and get the result
  const result = geos.GEOSDisjoint(g1Ptr, g2Ptr)

  // Test if the result matches the expected value
  test(testCase.name, (t) => {
    t.equal(result, testCase.expected)
    t.end()
  })

  // Free the memory allocated for the geometries
  geos.GEOSGeom_destroy(g1Ptr)
  geos.GEOSGeom_destroy(g2Ptr)
})
