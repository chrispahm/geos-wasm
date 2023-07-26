// Import tape for testing
import tape from 'tape'

// Import the geos module
import initGeosJs from '../../build/package/geos.esm.js'
const geos = await initGeosJs()

// Create a reader and a writer for WKT conversion
const reader = geos.GEOSWKTReader_create()
const writer = geos.GEOSWKTWriter_create()

// Define some test cases with WKT strings and expected distances
const testCases = [
  {
    wkt1: 'POINT (0 0)',
    wkt2: 'POINT (1 1)',
    distance: Math.sqrt(2)
  },
  {
    wkt1: 'LINESTRING (0 0, 1 0)',
    wkt2: 'LINESTRING (0 1, 1 1)',
    distance: 1
  },
  {
    wkt1: 'POLYGON ((0 0, 1 0, 1 1, 0 1, 0 0))',
    wkt2: 'POLYGON ((2 2, 3 2, 3 3, 2 3, 2 2))',
    distance: Math.sqrt(2)
  }
]

// Run the tests using tape
tape('GEOSDistance', (t) => {
  // Loop over the test cases
  for (const { wkt1, wkt2, distance } of testCases) {
    // Convert the WKT strings to GEOS geometries
    const geomPtr1 = geos.GEOSWKTReader_read(reader, wkt1)
    const geomPtr2 = geos.GEOSWKTReader_read(reader, wkt2)

    // Create a pointer for the distance result
    const distPtr = geos.Module._malloc(8) // double is 8 bytes

    // Call the GEOSDistance function with the geometries and the pointer
    const result = geos.GEOSDistance(geomPtr1, geomPtr2, distPtr)

    // Check if the result is successful
    t.equal(result, 1, 'GEOSDistance returns 1 on success')

    // Read the value of the pointer as a double
    const dist = geos.Module.getValue(distPtr, 'double')

    // Check if the distance matches the expected value
    t.equal(dist, distance, `GEOSDistance returns ${distance} for ${wkt1} and ${wkt2}`)

    // Free the memory allocated for the geometries and the pointer
    geos.GEOSGeom_destroy(geomPtr1)
    geos.GEOSGeom_destroy(geomPtr2)
    geos.GEOSFree(distPtr)
  }

  // Destroy the reader and the writer
  geos.GEOSWKTReader_destroy(reader)
  geos.GEOSWKTWriter_destroy(writer)

  // End the tape test
  t.end()
})
