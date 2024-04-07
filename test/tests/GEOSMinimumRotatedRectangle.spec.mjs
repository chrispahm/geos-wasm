// Import tape for testing
import test from 'tape'

// Import geos module
import initGeosJs from '../../build/package/geos.esm.js'
const geos = await initGeosJs()

// Test GEOSMinimumRotatedRectangle function
test('GEOSMinimumRotatedRectangle', async t => {
  // Create a reader and a writer for WKT
  const reader = geos.GEOSWKTReader_create()
  const writer = geos.GEOSWKTWriter_create()
  geos.GEOSWKTWriter_setRoundingPrecision(writer, 0)
  // Create a WKT string for a polygon
  const wkt = 'POLYGON ((0 0, 1 0, 1 1, 0 1, 0 0))'

  // Convert the WKT string to a GEOS geometry
  const size = wkt.length + 1
  const wktPtr = geos.Module._malloc(size)
  geos.Module.stringToUTF8(wkt, wktPtr, size)
  const geomPtr = geos.GEOSWKTReader_read(reader, wktPtr)
  geos.Module._free(wktPtr)

  // Call the GEOSMinimumRotatedRectangle function
  const resultPtr = geos.GEOSMinimumRotatedRectangle(geomPtr)

  // Convert the result geometry to a WKT string
  const resultWktPtr = geos.GEOSWKTWriter_write(writer, resultPtr)
  const resultWkt = geos.Module.UTF8ToString(resultWktPtr)
  geos.GEOSFree(resultWktPtr)

  // Check if the result is correct
  t.equal(resultWkt, 'POLYGON ((0 0, 0 1, 1 1, 1 0, 0 0))', 'should return the minimum rotated rectangle')

  // Free the memory
  geos.GEOSGeom_destroy(geomPtr)
  geos.GEOSGeom_destroy(resultPtr)
  geos.GEOSWKTReader_destroy(reader)
  geos.GEOSWKTWriter_destroy(writer)

  // End the test
  t.end()
})
