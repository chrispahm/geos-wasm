// Import tape for testing
import test from 'tape'

// Import the GEOS module
import initGeosJs from '../../build/package/geos.esm.js'
const geos = await initGeosJs()

// Define the test cases for GEOSGetNumCoordinates
const testCases = [
  {
    name: 'Point',
    wkt: 'POINT (1 2)',
    expected: 1
  },
  {
    name: 'LineString',
    wkt: 'LINESTRING (0 0, 1 1, 2 3)',
    expected: 3
  },
  {
    name: 'Polygon',
    wkt: 'POLYGON ((0 0, 1 0, 1 1, 0 1, 0 0))',
    expected: 5
  }
]

// Run the tests using tape
test('GEOSGetNumCoordinates', async (t) => {
  t.plan(testCases.length)

  // Create a reader for WKT strings
  const reader = geos.GEOSWKTReader_create()

  for (const testCase of testCases) {
    // Convert the WKT string to a GEOS geometry
    const size = testCase.wkt.length + 1
    const wktPtr = geos.Module._malloc(size)
    geos.Module.stringToUTF8(testCase.wkt, wktPtr, size)
    const geomPtr = geos.GEOSWKTReader_read(reader, wktPtr)
    geos.Module._free(wktPtr)

    // Call the GEOSGetNumCoordinates function
    const actual = geos.GEOSGetNumCoordinates(geomPtr)

    // Compare the actual and expected results
    t.equal(actual, testCase.expected, `${testCase.name}: ${testCase.wkt}`)

    // Free the GEOS geometry
    geos.GEOSGeom_destroy(geomPtr)
  }
})
