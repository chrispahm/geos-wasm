// Import tape for testing
import test from 'tape'

// Import the geos module
import initGeosJs from '../../build/package/geos.esm.js'
const geos = await initGeosJs()

// Define a helper function to convert a WKT string to a GEOS geometry
const wktToGeom = (wkt) => {
  const reader = geos.GEOSWKTReader_create()
  const geomPtr = geos.GEOSWKTReader_read(reader, wkt)
  geos.GEOSWKTReader_destroy(reader)
  return geomPtr
}

// Define a helper function to convert a GEOS geometry to a WKT string
const geomToWkt = (geomPtr) => {
  const writer = geos.GEOSWKTWriter_create()
  // Set the output precision to 0
  geos.GEOSWKTWriter_setRoundingPrecision(writer, 0)
  const wkt = geos.GEOSWKTWriter_write(writer, geomPtr)
  geos.GEOSWKTWriter_destroy(writer)
  return wkt
}

// Define some test cases with input and expected output WKT strings
const testCases = [
  {
    input: [
      'POLYGON ((0 0, 1 0, 1 1, 0 1, 0 0))',
      'POLYGON ((0.5 0.5, 1.5 0.5, 1.5 1.5, 0.5 1.5, 0.5 0.5))'
    ],
    output: 'POLYGON ((1 0, 0 0, 0 1, 0 1, 0 2, 2 2, 2 0, 1 0, 1 0))',
    description: 'union of two overlapping squares'
  },
  {
    input: [
      'LINESTRING (0 0, 2 2)',
      'LINESTRING (2 -2, -2 -2)'
    ],
    output: 'MULTILINESTRING ((0 0, 2 2), (2 -2, -2 -2))',
    description: 'union of two crossing lines'
  }
]

// Run the tests using tape
test('GEOSUnion', (t) => {
  // Loop over the test cases
  for (const testCase of testCases) {
    // Convert the input WKT strings to GEOS geometries
    const inputGeoms = testCase.input.map(wktToGeom)

    // Call the GEOSUnion function on the input geometries
    const outputGeomPtr = geos.GEOSUnion(inputGeoms[0], inputGeoms[1])

    // Convert the output GEOS geometry to a WKT string
    const outputWkt = geomToWkt(outputGeomPtr)

    // Compare the output WKT string with the expected one
    t.equal(outputWkt, testCase.output, testCase.description)

    // Free the memory allocated for the geometries
    inputGeoms.forEach((geomPtr) => geos.GEOSGeom_destroy(geomPtr))
    geos.GEOSGeom_destroy(outputGeomPtr)
  }

  // End the test
  t.end()
})
