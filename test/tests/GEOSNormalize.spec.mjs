// Import tape for testing
import test from 'tape'

// Import the geos module
import initGeosJs from '../../build/package/geos.esm.js'
const geos = await initGeosJs()

// Create a test case for GEOSNormalize
test('GEOSNormalize', (t) => {
  // Create a reader and a writer for WKT
  const reader = geos.GEOSWKTReader_create()
  const writer = geos.GEOSWKTWriter_create()
  // Set the writer rounding precision to 0
  geos.GEOSWKTWriter_setRoundingPrecision(writer, 0)
  // Create a WKT string for a polygon with an invalid orientation
  const wkt = 'POLYGON ((0 0, 0 1, 1 1, 1 0, 0 0))'

  // Convert the WKT string to a GEOS geometry
  const size = wkt.length + 1
  const wktPtr = geos.Module._malloc(size)
  geos.Module.stringToUTF8(wkt, wktPtr, size)
  const geomPtr = geos.GEOSWKTReader_read(reader, wktPtr)
  geos.Module._free(wktPtr)

  // Normalize the geometry in place
  const result = geos.GEOSNormalize(geomPtr)

  // Check if the normalization was successful
  t.equal(result, 0, 'GEOSNormalize should return 0 on success')

  // Convert the normalized geometry to a WKT string
  const normalizedWktPtr = geos.GEOSWKTWriter_write(writer, geomPtr)
  const normalizedWkt = geos.Module.UTF8ToString(normalizedWktPtr)
  geos.GEOSFree(normalizedWktPtr)

  // Check if the normalized WKT string is correct
  t.equal(normalizedWkt, 'POLYGON ((0 0, 0 1, 1 1, 1 0, 0 0))', 'GEOSNormalize should correct the orientation of the polygon')

  // Free all memory by destroying the reader and writer and the geometry
  geos.GEOSWKTReader_destroy(reader)
  geos.GEOSWKTWriter_destroy(writer)
  geos.GEOSGeom_destroy(geomPtr)

  // End the test case
  t.end()
})
