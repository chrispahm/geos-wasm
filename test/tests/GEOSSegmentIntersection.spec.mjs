// Import tape for testing
import test from 'tape'

// Import the geos module
import initGeosJs from '../../build/package/geos.esm.js'
const geos = await initGeosJs()

const geomToWkt = (geomPtr) => {
  const writer = geos.GEOSWKTWriter_create()
  // Set output precision to 0
  geos.GEOSWKTWriter_setRoundingPrecision(writer, 0)
  const wkt = geos.GEOSWKTWriter_write(writer, geomPtr)
  geos.GEOSWKTWriter_destroy(writer)
  return wkt
}

// Define a test case for GEOSSegmentIntersection
test('GEOSSegmentIntersection', (t) => {
  // Create two empty pointers where the x and y coordinates (double) of the segments will be stored
  const cxPtr = geos.Module._malloc(4)
  const cyPtr = geos.Module._malloc(4)

  // Compute the intersection point of the segments
  geos.GEOSSegmentIntersection(0, 0, 10, 10, 0, 10, 10, 0, cxPtr, cyPtr)
  // create a point from the intersection
  const cx = geos.Module.getValue(cxPtr, 'double')
  const cy = geos.Module.getValue(cyPtr, 'double')
  const intersectionPtr = geos.GEOSGeom_createPointFromXY(cx, cy)

  // Convert the intersection point to WKT
  const intersectionWkt = geomToWkt(intersectionPtr)

  // Check if the intersection point is correct
  t.equal(intersectionWkt, 'POINT (5 5)', 'The intersection point is correct')

  // Free the memory allocated for the geometries
  geos.GEOSGeom_destroy(intersectionPtr)
  geos.GEOSFree(cxPtr)
  geos.GEOSFree(cyPtr)
  // End the test case
  t.end()
})
