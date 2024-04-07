// Import tape for testing
import test from 'tape'

// Import the geos module
import initGeosJs from '../../build/package/geos.esm.js'
const geos = await initGeosJs()

// Define a helper function to create a geometry from a WKT string
const createGeom = (wkt) => {
  const reader = geos.GEOSWKTReader_create()
  const size = wkt.length + 1
  const wktPtr = geos.Module._malloc(size)
  geos.Module.stringToUTF8(wkt, wktPtr, size)
  const geomPtr = geos.GEOSWKTReader_read(reader, wktPtr)
  geos.Module._free(wktPtr)
  geos.GEOSWKTReader_destroy(reader)
  return geomPtr
}

// Define a helper function to free a geometry pointer
const freeGeom = (geomPtr) => {
  geos.GEOSGeom_destroy(geomPtr)
}

// Define some test cases with WKT strings and expected validity results
const testCases = [
  {
    wkt: 'POLYGON ((0 0, 1 0, 1 1, 0 1, 0 0))',
    valid: true
  },
  {
    wkt: 'POLYGON ((0 0, 1 0, 1 1, -1 -1, 0 0))',
    valid: false
  }
]

// Initialize the geos module and run the tests
// Loop through the test cases
test('GEOSisValid', (t) => {
  t.plan(testCases.length)

  for (const testCase of testCases) {
  // Create a geometry from the WKT string
    const geomPtr = createGeom(testCase.wkt)

    // Call the GEOSisValid function with the geometry and the result pointer
    let result
    try {
      result = geos.GEOSisValid(geomPtr)
    } catch (error) {
      result = 0
    }

    // Convert the result to a boolean
    const isValid = result === 1
    t.equal(isValid, testCase.valid, `GEOSisValid returns ${testCase.valid}`)

    // Free the geometry pointer
    freeGeom(geomPtr)
  }
  t.end()
})
