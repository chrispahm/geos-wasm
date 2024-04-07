// Import tape for testing
import test from 'tape'

// Import the geos module
import initGeosJs from '../../build/package/geos.esm.js'
const geos = await initGeosJs()

// Define a helper function to convert a WKT string to a GEOS geometry
const wktToGeom = (wkt) => {
  // Create a reader
  const reader = geos.GEOSWKTReader_create()
  // Read the WKT string and get a pointer to the geometry
  const size = wkt.length + 1
  const wktPtr = geos.Module._malloc(size)
  geos.Module.stringToUTF8(wkt, wktPtr, size)
  const geomPtr = geos.GEOSWKTReader_read(reader, wktPtr)
  geos.Module._free(wktPtr)
  // Destroy the reader
  geos.GEOSWKTReader_destroy(reader)
  // Return the pointer
  return geomPtr
}

// Define some test cases with WKT strings and expected results
const testCases = [
  {
    wkt: 'POINT (0 0)',
    hasZ: false,
    description: 'A point without Z coordinate'
  },
  {
    wkt: 'POINT Z (0 0 0)',
    hasZ: true,
    description: 'A point with Z coordinate'
  },
  {
    wkt: 'LINESTRING (0 0, 1 1)',
    hasZ: false,
    description: 'A linestring without Z coordinates'
  },
  {
    wkt: 'LINESTRING Z (0 0 0, 1 1 1)',
    hasZ: true,
    description: 'A linestring with Z coordinates'
  }
]

// Run the tests using tape
test('GEOSHasZ', (t) => {
  // Loop through the test cases
  for (const testCase of testCases) {
    // Convert the WKT string to a GEOS geometry pointer
    const geomPtr = wktToGeom(testCase.wkt)
    // Call the GEOSHasZ function and get the result as an integer (0 or 1)
    const result = geos.GEOSHasZ(geomPtr)
    // Convert the result to a boolean
    const hasZ = Boolean(result)
    // Check if the result matches the expected value
    t.equal(hasZ, testCase.hasZ, testCase.description)
    // Free the geometry pointer
    geos.GEOSGeom_destroy(geomPtr)
  }
  // End the test
  t.end()
})
