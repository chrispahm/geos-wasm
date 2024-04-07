// Import the module
import initGeosJs from '../../build/package/geos.esm.js'

// Import tape for testing
import test from 'tape'
const geos = await initGeosJs()

// Test if the offset curve function works as expected
test('GEOSOffsetCurve', (t) => {
  // Create a reader and a writer
  const reader = geos.GEOSWKTReader_create()
  const writer = geos.GEOSWKTWriter_create()
  // Set the writer rounding precision to 0
  geos.GEOSWKTWriter_setRoundingPrecision(writer, 0)
  // Define a WKT string to convert to a GEOS geometry
  const wkt = 'LINESTRING (0 0, 0 1, 1 1, 1 0, 0 0)'

  // Convert the WKT string to a GEOS geometry pointer
  const size = wkt.length + 1
  const wktPtr = geos.Module._malloc(size)
  geos.Module.stringToUTF8(wkt, wktPtr, size)
  const geomPtr = geos.GEOSWKTReader_read(reader, wktPtr)
  geos.Module._free(wktPtr)

  // Define the parameters for the offset curve function
  const width = 1 // The offset distance
  const quadsegs = 8 // The number of quadrant segments
  const joinStyle = 2 // The join style (2 = flat)
  const mitreLimit = 5 // The mitre limit

  // Call the offset curve function and get the result geometry pointer
  const offsetPtr = geos.GEOSOffsetCurve(geomPtr, width, quadsegs, joinStyle, mitreLimit)

  // Convert the result geometry pointer to a WKT string
  const offsetWktPtr = geos.GEOSWKTWriter_write(writer, offsetPtr)
  const offsetWkt = geos.Module.UTF8ToString(offsetWktPtr)
  geos.GEOSFree(offsetWktPtr)

  // The expected WKT string for the offset curve
  const expectedWkt = 'LINESTRING (-1 2, 2 2, 2 -1)'

  // Compare the actual and expected WKT strings
  t.equal(offsetWkt, expectedWkt)

  // Free the memory by destroying the reader, writer and geometries
  geos.GEOSWKTReader_destroy(reader)
  geos.GEOSWKTWriter_destroy(writer)
  geos.GEOSGeom_destroy(geomPtr)
  geos.GEOSGeom_destroy(offsetPtr)
  // End the test
  t.end()
})
