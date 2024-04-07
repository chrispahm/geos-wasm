// Import tape for testing
import test from 'tape'

// Import geos module
import initGeosJs from '../../build/package/geos.esm.js'
const geos = await initGeosJs()

// Test GEOSMaximumInscribedCircle function
test('GEOSMaximumInscribedCircle', async (t) => {
  // Create a reader and a writer for WKT conversion
  const reader = geos.GEOSWKTReader_create()
  const writer = geos.GEOSWKTWriter_create()
  // Set rounding precision for the writer
  geos.GEOSWKTWriter_setRoundingPrecision(writer, 2)
  // Create an L shaped polygon geometry from a WKT string
  const wkt = 'POLYGON ((0 0, 0 10, 10 10, 10 5, 5 5, 5 0, 0 0))'
  const size = wkt.length + 1
  const wktPtr = geos.Module._malloc(size)
  geos.Module.stringToUTF8(wkt, wktPtr, size)
  const geomPtr = geos.GEOSWKTReader_read(reader, wktPtr)
  geos.Module._free(wktPtr)

  // Set a tolerance distance
  const tolerance = 0.0

  // Call GEOSMaximumInscribedCircle function
  const resultPtr = geos.GEOSMaximumInscribedCircle(geomPtr, tolerance)
  // The result should be a linestring, with the first point being the center of the circle
  // and the second point being a point on the circle
  const center = geos.GEOSGeomGetPointN(resultPtr, 0)
  const centerWktPtr = geos.GEOSWKTWriter_write(writer, center)
  const centerWkt = geos.Module.UTF8ToString(centerWktPtr)
  geos.GEOSFree(centerWktPtr)
  // We can identify the radius of the circle by calculating the distance between the center and the second point
  const distancePtr = geos.Module._malloc(8)
  geos.GEOSDistance(center, geos.GEOSGeomGetPointN(resultPtr, 1), distancePtr)
  const radius = geos.Module.getValue(distancePtr, 'double')

  // Convert the result to a WKT string
  const resultWktPtr = geos.GEOSWKTWriter_write(writer, resultPtr)
  const resultWkt = geos.Module.UTF8ToString(resultWktPtr)
  geos.GEOSFree(resultWktPtr)

  // Check if the result is valid
  t.equal(resultWkt, 'LINESTRING (2.93 7.07, 0 7.07)', 'GEOSMaximumInscribedCircle returns a valid pointer')
  t.equal(centerWkt, 'POINT (2.93 7.07)', 'GEOSMaximumInscribedCircle returns correct center')
  t.equal(radius, 2.928932188134524, 'GEOSMaximumInscribedCircle returns correct radius')
  // Free all memory by destroying the reader and writer
  geos.GEOSWKTReader_destroy(reader)
  geos.GEOSWKTWriter_destroy(writer)

  // Free all memory by destroying the geometries
  geos.GEOSGeom_destroy(geomPtr)
  geos.GEOSGeom_destroy(resultPtr)
  geos.GEOSFree(distancePtr)

  // End the test
  t.end()
})
