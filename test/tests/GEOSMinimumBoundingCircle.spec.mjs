// Import tape for testing
import test from 'tape'

// Import initGeosJs to load the module
import initGeosJs from '../../build/package/geos.esm.js'

// Define a helper function to create a pointer with a given byte length
const createPtr = (geos, byteLength) => {
  // Allocate memory using Module._malloc
  const ptr = geos.Module._malloc(byteLength)
  // Return the pointer
  return ptr
}

// Define a helper function to free a pointer
const freePtr = (geos, ptr) => {
  // Free memory using Module._free
  geos.GEOSFree(ptr)
}

// Define a helper function to read a double value from a pointer
const readDouble = (geos, ptr) => {
  // Read the value using Module.getValue with 'double' type
  return geos.Module.getValue(ptr, 'double')
}

// Define a helper function to convert a WKT string to a GEOS geometry
const wktToGeom = (geos, wkt) => {
  // Create a WKT reader using GEOSWKTReader_create
  const reader = geos.GEOSWKTReader_create()
  // Check if reader creation was successful
  if (reader === null) {
    throw new Error('Failed to create WKT reader')
  }
  // Read the WKT string using GEOSWKTReader_read
  const size = wkt.length + 1
  const wktPtr = geos.Module._malloc(size)
  geos.Module.stringToUTF8(wkt, wktPtr, size)
  const geomPtr = geos.GEOSWKTReader_read(reader, wktPtr)
  geos.Module._free(wktPtr)
  // Check if reading was successful
  if (geomPtr === null) {
    throw new Error('Failed to read WKT string')
  }
  // Destroy the reader using GEOSWKTReader_destroy
  geos.GEOSWKTReader_destroy(reader)
  // Return the geometry pointer
  return geomPtr
}

// Define an async function to run the tests
const runTests = async () => {
  // Load the module using initGeosJs and assign it to geos variable
  const geos = await initGeosJs()

  // Define some test cases with input WKT strings and expected output values
  const testCases = [
    {
      input: 'POINT (0.5 -0.5)',
      expectedRadius: 0
    },
    {
      input: 'LINESTRING (-1 -1, -1 -2)',
      expectedRadius: 0.5
    },
    {
      input: 'POLYGON ((0 -2, -2 -2, -2 0, 0 0, 0 -2))',
      expectedRadius: 1.4142135623730951
    },
    {
      input: 'MULTIPOINT ((-1 -1), (1 1))',
      expectedRadius: 1.4142135623730951
    },
    {
      input: 'GEOMETRYCOLLECTION (POINT (0 0), LINESTRING (1 1, 2 2))',
      expectedRadius: 1.4142135623730951
    }
  ]

  // Loop through the test cases
  for (const testCase of testCases) {
    // Get the input and expected output values from the test case
    const { input, expectedRadius } = testCase
    console.log('input', input)

    // Convert the input WKT string to a GEOS geometry using wktToGeom
    const inputGeom = wktToGeom(geos, input)

    // Create pointers for the output values using createPtr
    const centerPtr = geos.GEOSGeom_createEmptyPoint()
    const radiusPtr = createPtr(geos, 8)

    // Call the GEOSMinimumBoundingCircle function with the input and output pointers
    const result = geos.GEOSMinimumBoundingCircle(inputGeom, radiusPtr, centerPtr)

    // Check if the function call was successful
    if (result === 0) {
      throw new Error('Failed to call GEOSMinimumBoundingCircle')
    }

    // const actualCenter = geomToWkt(geos, centerPtr)
    const actualRadius = readDouble(geos, radiusPtr)

    // Free the output pointers using freePtr
    freePtr(geos, centerPtr)
    freePtr(geos, radiusPtr)

    // Destroy the input geometry using GEOSGeom_destroy
    geos.GEOSGeom_destroy(inputGeom)

    // Run a tape test to compare the actual and expected output values
    test(`GEOSMinimumBoundingCircle for ${input}`, t => {
      t.equal(actualRadius, expectedRadius, 'radius should match')
      t.end()
    })
  }
}

// Call the runTests function
runTests()
