// Import tape for testing
import test from 'tape'

// Import the geos module
import initGeosJs from '../../build/package/geos.esm.js'
const geos = await initGeosJs()

// Define some test cases with WKT inputs and expected outputs
const testCases = [
  {
    input: [
      'POLYGON ((0 0, 1 0, 1 1, 0 1, 0 0))',
      'POLYGON ((1 0, 2 0, 2 1, 1 1, 1 0))'
    ],
    output: 'POLYGON ((0 0, 0 1, 1 1, 2 1, 2 0, 1 0, 0 0))',
    description: 'Two adjacent squares'
  }
]

// Run the tests using tape
test('GEOSCoverageUnion', (t) => {
  // Create a reader and a writer for WKT
  const reader = geos.GEOSWKTReader_create()
  const writer = geos.GEOSWKTWriter_create()
  // Set the writer output precision to 0
  geos.GEOSWKTWriter_setRoundingPrecision(writer, 0)

  // Loop through the test cases
  for (const testCase of testCases) {
    // Convert the input WKT strings to GEOS geometries
    const inputGeoms = testCase.input.map(wkt => {
      const size = wkt.length + 1
      const wktPtr = geos.Module._malloc(size)
      geos.Module.stringToUTF8(wkt, wktPtr, size)
      const geom = geos.GEOSWKTReader_read(reader, wktPtr)
      geos.Module._free(wktPtr)
      return geom
    })

    // Create a list of geometries
    const geomPtrs = new Int32Array(inputGeoms)
    // copy the array to the heap
    const geomVecPtr = geos.Module._malloc(geomPtrs.length * geomPtrs.BYTES_PER_ELEMENT)
    geos.Module.HEAP32.set(geomPtrs, geomVecPtr >> 2)

    // Create a GEOS geometry collection from the array of pointers
    const collectionPtr = geos.GEOSGeom_createCollection(6, geomVecPtr, geomPtrs.length)

    // Call the GEOSCoverageUnion function with the input geometries
    const outputGeomPtr = geos.GEOSCoverageUnion(collectionPtr)

    // Convert the output GEOS geometry to a WKT string
    const outputWktPtr = geos.GEOSWKTWriter_write(writer, outputGeomPtr)
    const outputWkt = geos.Module.UTF8ToString(outputWktPtr)
    geos.GEOSFree(outputWktPtr)

    // Compare the output WKT with the expected output WKT
    t.equal(outputWkt, testCase.output)

    // Free the memory allocated for the input and output geometries
    for (const inputGeom of inputGeoms) {
      geos.GEOSGeom_destroy(inputGeom)
    }
    geos.GEOSGeom_destroy(outputGeomPtr)
  }

  // End the test
  t.end()
})
