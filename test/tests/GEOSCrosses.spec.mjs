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

// Define a helper function to free a GEOS geometry
function freeGeom (geomPtr) {
  geos.GEOSGeom_destroy(geomPtr)
}

// Define some test cases with WKT inputs and expected outputs
const testCases = [
  {
    name: 'Line crosses polygon',
    g1: 'LINESTRING (0.5 0.5, 1.5 1.5)',
    g2: 'POLYGON ((0 0, 1 0, 1 1, 0 1, 0 0))',
    expected: 1 // true
  },
  {
    name: 'Line does not cross polygon',
    g1: 'LINESTRING (0.5 0.5, 0 0)',
    g2: 'POLYGON ((0 0, 1 0, 1 1, 0 1, 0 0))',
    expected: 0 // false
  }
]

// Run the tests using tape
test('GEOSCrosses', (t) => {
  // Loop through the test cases
  for (const testCase of testCases) {
    // Convert the WKT inputs to GEOS geometries
    const g1 = wktToGeom(testCase.g1)
    const g2 = wktToGeom(testCase.g2)

    // Call the GEOSCrosses function and check the result
    const result = geos.GEOSCrosses(g1, g2)
    t.equal(result, testCase.expected, testCase.name)

    // Free the GEOS geometries
    freeGeom(g1)
    freeGeom(g2)
  }

  // End the test
  t.end()
})
