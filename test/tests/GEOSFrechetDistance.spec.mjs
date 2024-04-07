// Import tape for testing
import test from 'tape'

// Import the GEOS module
import initGeosJs from '../../build/package/geos.esm.js'

// Define a helper function to convert a WKT string to a GEOS geometry
const wktToGeom = (geos, wkt) => {
  const reader = geos.GEOSWKTReader_create()
  const size = wkt.length + 1
  const wktPtr = geos.Module._malloc(size)
  geos.Module.stringToUTF8(wkt, wktPtr, size)
  const geomPtr = geos.GEOSWKTReader_read(reader, wktPtr)
  geos.Module._free(wktPtr)
  geos.GEOSWKTReader_destroy(reader)
  return geomPtr
}

// Define a helper function to create a pointer and set its value
const createPtr = (geos, type) => {
  const byteLength = type === 'double' ? 8 : 4
  const ptr = geos.Module._malloc(byteLength)
  geos.Module.setValue(ptr, 0, type)
  return ptr
}

// Define a helper function to free a pointer
const freePtr = (geos, ptr) => {
  geos.GEOSFree(ptr)
}

// Define some test cases for the GEOSFrechetDistance function
const testCases = [
  {
    g1: 'LINESTRING (0 0, 100 0)',
    g2: 'LINESTRING (0 0, 50 50, 100 0)',
    expected: Math.sqrt(2) * 50,
    description: 'Case 1'
  },
  {
    g1: 'LINESTRING (0 0, 100 0)',
    g2: 'LINESTRING (0 0, 50 50, 100 0)',
    expected: Math.sqrt(2) * 50,
    description: 'Case 2'
  },
  {
    g1: 'LINESTRING (0.5 -1.5, -1.5 -1.5)',
    g2: 'LINESTRING (-1.5 -1.5, -1.5 -2.5)',
    expected: 2,
    description: 'Case with non-zero coordinates'
  }
]

// Initialize the GEOS module and run the tests
initGeosJs().then(geos => {
  // Loop through the test cases
  for (const testCase of testCases) {
    // Convert the WKT strings to GEOS geometries
    const g1Ptr = wktToGeom(geos, testCase.g1)
    const g2Ptr = wktToGeom(geos, testCase.g2)

    // Create a pointer for the densifyFrac parameter
    const densifyFracPtr = createPtr(geos, 'double')

    // Create a pointer for the output parameter
    const outputPtr = createPtr(geos, 'double')

    // Call the GEOSFrechetDistance function
    const result = geos.GEOSFrechetDistance(g1Ptr, g2Ptr, outputPtr)

    // Read the output value from the pointer
    const outputValue = geos.Module.getValue(outputPtr, 'double')

    // Free the pointers and geometries
    freePtr(geos, densifyFracPtr)
    freePtr(geos, outputPtr)
    geos.GEOSGeom_destroy(g1Ptr)
    geos.GEOSGeom_destroy(g2Ptr)

    // Run the tape test with the expected and actual values
    test(testCase.description, t => {
      t.equal(result, 1) // Check if the function returned 1 === true
      t.equal(outputValue.toFixed(6), testCase.expected.toFixed(6)) // Check if the output value matches the expected value with some tolerance
      t.end()
    })
  }
})
