// Import tape for testing
import test from 'tape'

// Import the geos module
import initGeosJs from '../../build/package/geos.esm.js'

// Initialize the geos module
const geos = await initGeosJs()

// Define a test case for GEOSBoundary
test('GEOSBoundary', async (t) => {
  // Create a reader and a writer for WKT
  const reader = geos.GEOSWKTReader_create()
  const writer = geos.GEOSWKTWriter_create()
  // Set the writer output precision to 0
  geos.GEOSWKTWriter_setRoundingPrecision(writer, 0)

  // Create a polygon geometry from WKT
  const wkt = 'POLYGON ((0 0, 1 0, 1 1, 0 1, 0 0))'
  const size = wkt.length + 1
  const wktPtr = geos.Module._malloc(size)
  geos.Module.stringToUTF8(wkt, wktPtr, size)
  const geomPtr = geos.GEOSWKTReader_read(reader, wktPtr)
  geos.Module._free(wktPtr)

  // Get the boundary of the polygon
  const boundaryPtr = geos.GEOSBoundary(geomPtr)

  // Convert the boundary to WKT
  const boundaryWktPtr = geos.GEOSWKTWriter_write(writer, boundaryPtr)
  const boundaryWkt = geos.Module.UTF8ToString(boundaryWktPtr)
  geos.GEOSFree(boundaryWktPtr)

  // Expect the boundary to be a linestring
  t.equal(boundaryWkt, 'LINESTRING (0 0, 1 0, 1 1, 0 1, 0 0)', 'boundary is correct')

  // Free the memory
  geos.GEOSGeom_destroy(boundaryPtr)
  geos.GEOSGeom_destroy(geomPtr)
  geos.GEOSWKTReader_destroy(reader)
  geos.GEOSWKTWriter_destroy(writer)

  // End the test case
  t.end()
})
