// Import tape for testing
import test from 'tape'

// Import the GEOS module
import initGeosJs from '../../build/package/geos.esm.js'

// Initialize the GEOS module
const geos = await initGeosJs()

// Define a function to convert a WKT string to a GEOS geometry
function wktToGeom (wkt) {
  // Create a reader
  const reader = geos.GEOSWKTReader_create()
  // Read the WKT string
  const size = wkt.length + 1
  const wktPtr = geos.Module._malloc(size)
  geos.Module.stringToUTF8(wkt, wktPtr, size)
  const geomPtr = geos.GEOSWKTReader_read(reader, wktPtr)
  geos.Module._free(wktPtr)
  // Destroy the reader
  geos.GEOSWKTReader_destroy(reader)
  // Return the geometry pointer
  return geomPtr
}

// Define some test cases with WKT strings and expected results
const testCases = [
  { wkt: 'LINESTRING (0 0, 1 0, 1 1)', expected: 0 },
  { wkt: 'LINESTRING (0 0, 1 0, 1 1, 0 0)', expected: 1 }
]

// Run the tests using tape
test('GEOSisClosed', (t) => {
  // Loop through the test cases
  for (const { wkt, expected } of testCases) {
    // Convert the WKT string to a GEOS geometry
    const geomPtr = wktToGeom(wkt)
    // Test if the geometry is closed using the isClosed function
    const actual = geos.GEOSisClosed(geomPtr)

    // Compare the actual result with the expected result
    t.equal(actual, expected, `GEOSisClosed(${wkt}) should be ${expected}`)
    // Destroy the geometry
    geos.GEOSGeom_destroy(geomPtr)
  }

  // End the test
  t.end()
})
