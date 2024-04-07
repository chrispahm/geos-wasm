// Import tape for testing
import test from 'tape'

// Import the geos module
import initGeosJs from '../../build/package/geos.esm.js'

// Initialize the geos module
const geos = await initGeosJs()

// Define a helper function to convert a WKT string to a GEOS geometry pointer
function wktToGeom (wkt) {
  // Create a reader
  const reader = geos.GEOSWKTReader_create()
  // Read the WKT string and get the geometry pointer
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

// Define a helper function to convert a GEOS geometry pointer to a WKT string
function geomToWkt (geomPtr) {
  // Create a writer
  const writer = geos.GEOSWKTWriter_create()
  // Set rounding precision for the writer
  geos.GEOSWKTWriter_setRoundingPrecision(writer, 0)
  // Write the geometry pointer and get the WKT string
  const wktPtr = geos.GEOSWKTWriter_write(writer, geomPtr)
  const wkt = geos.Module.UTF8ToString(wktPtr)
  geos.GEOSFree(wktPtr)
  // Destroy the writer
  geos.GEOSWKTWriter_destroy(writer)
  // Return the WKT string
  return wkt
}

// Define a test case for the GEOSIntersection function
test('GEOSIntersection', (t) => {
  // Define some WKT strings for testing
  const wkt1 = 'POLYGON ((0 0, 0 10, 10 10, 10 0, 0 0))'
  const wkt2 = 'POLYGON ((5 5, 5 15, 15 15, 15 5, 5 5))'

  // Define the expected WKT string for the intersection of wkt1 and wkt2
  const expectedWkt = 'POLYGON ((10 10, 10 5, 5 5, 5 10, 10 10))'

  // Convert the WKT strings to geometry pointers
  const geom1 = wktToGeom(wkt1)
  const geom2 = wktToGeom(wkt2)

  // Call the GEOSIntersection function and get the result pointer
  const resultPtr = geos.GEOSIntersection(geom1, geom2)

  // Convert the result pointer to a WKT string
  const resultWkt = geomToWkt(resultPtr)

  // Compare the result WKT string with the expected WKT string
  t.equal(resultWkt, expectedWkt, 'The intersection of two polygons is correct')

  // Destroy the geometries and free the pointers
  geos.GEOSGeom_destroy(geom1)
  geos.GEOSGeom_destroy(geom2)
  geos.GEOSGeom_destroy(resultPtr)

  // End the test case
  t.end()
})
