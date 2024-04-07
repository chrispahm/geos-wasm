// Import tape for testing
import test from 'tape'

// Import the GEOS module
import initGeosJs from '../../build/package/geos.esm.js'

// Initialize the GEOS module
const geos = await initGeosJs()

// Create a test case for the GEOSInterpolate function
test('GEOSInterpolate', async (t) => {
  // Create a reader and a writer for WKT
  const reader = geos.GEOSWKTReader_create()
  const writer = geos.GEOSWKTWriter_create()
  // Set rounding precision for the writer
  geos.GEOSWKTWriter_setRoundingPrecision(writer, 1)

  // Create a WKT string for a line
  const wkt = 'LINESTRING (10 0, 10 10)'

  // Convert the WKT string to a GEOS geometry pointer
  const size = wkt.length + 1
  const wktPtr = geos.Module._malloc(size)
  geos.Module.stringToUTF8(wkt, wktPtr, size)
  const geomPtr = geos.GEOSWKTReader_read(reader, wktPtr)
  geos.Module._free(wktPtr)

  // Distance from start of line to created point
  const distance = 2.5

  // Call the GEOSInterpolate function and get the result pointer
  const resultPtr = geos.GEOSInterpolate(geomPtr, distance)

  // Convert the result pointer to a WKT string
  const resultWktPtr = geos.GEOSWKTWriter_write(writer, resultPtr)
  const resultWkt = geos.Module.UTF8ToString(resultWktPtr)
  geos.GEOSFree(resultWktPtr)

  // Check if the result is correct
  t.equal(resultWkt, 'POINT (10 2.5)', 'The interpolated point is correct')

  // Free the memory allocated by the pointers
  geos.GEOSGeom_destroy(geomPtr)
  geos.GEOSGeom_destroy(resultPtr)
  geos.GEOSWKTReader_destroy(reader)
  geos.GEOSWKTWriter_destroy(writer)

  // End the test case
  t.end()
})
