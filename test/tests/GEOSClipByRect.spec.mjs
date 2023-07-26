// Import tape for testing
import test from 'tape'

// Import the GEOS module
import initGeosJs from '../../build/package/geos.esm.js'
const geos = await initGeosJs()

// Define a test case for the GEOSClipByRect function
test('GEOSClipByRect', (t) => {
  // Create a reader and a writer for WKT
  const reader = geos.GEOSWKTReader_create()
  const writer = geos.GEOSWKTWriter_create()
  // Set the writer output precision to 0
  geos.GEOSWKTWriter_setRoundingPrecision(writer, 0)

  // Create a polygon geometry from a WKT string
  const polygon = geos.GEOSWKTReader_read(reader, 'POLYGON ((0 0, 10 0, 10 10, 0 10, 0 0))')

  // Clip the polygon by a rectangle with xmin = 2, ymin = 2, xmax = 8, ymax = 8
  const clipped = geos.GEOSClipByRect(polygon, 2, 2, 8, 8)

  // Convert the clipped geometry to a WKT string
  const clippedWkt = geos.GEOSWKTWriter_write(writer, clipped)

  // Assert that the clipped geometry is equal to the expected WKT string
  t.equal(clippedWkt, 'POLYGON ((2 2, 2 8, 8 8, 8 2, 2 2))')

  // Destroy the geometries
  geos.GEOSGeom_destroy(polygon)
  geos.GEOSGeom_destroy(clipped)
  // Destroy the reader and writer
  geos.GEOSWKTReader_destroy(reader)
  geos.GEOSWKTWriter_destroy(writer)
  // End the test case
  t.end()
})
