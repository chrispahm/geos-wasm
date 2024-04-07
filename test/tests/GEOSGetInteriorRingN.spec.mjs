// Import tape for testing
import test from 'tape'

// Import the geos module
import initGeosJs from '../../build/package/geos.esm.js'
const geos = await initGeosJs()

// Define a helper function to convert a WKT string to a GEOS geometry
const wktToGeom = (wkt) => {
  const reader = geos.GEOSWKTReader_create()
  const size = wkt.length + 1
  const wktPtr = geos.Module._malloc(size)
  geos.Module.stringToUTF8(wkt, wktPtr, size)
  const geomPtr = geos.GEOSWKTReader_read(reader, wktPtr)
  geos.Module._free(wktPtr)
  geos.GEOSWKTReader_destroy(reader)
  return geomPtr
}

// Define a helper function to convert a GEOS geometry to a WKT string
const geomToWkt = (geomPtr) => {
  const writer = geos.GEOSWKTWriter_create()
  geos.GEOSWKTWriter_setRoundingPrecision(writer, 0)
  const wktPtr = geos.GEOSWKTWriter_write(writer, geomPtr)
  const wkt = geos.Module.UTF8ToString(wktPtr)
  geos.GEOSFree(wktPtr)
  geos.GEOSWKTWriter_destroy(writer)
  return wkt
}

// Define a test case for GEOSGetInteriorRingN
test('GEOSGetInteriorRingN', (t) => {
  // Create a polygon with one interior ring
  const wkt = 'POLYGON ((0 0, 10 0, 10 10, 0 10, 0 0), (1 1, 2 1, 2 2, 1 2, 1 1))'

  // Convert it to a GEOS geometry
  const geomPtr = wktToGeom(wkt)

  // Get the number of interior rings
  const numRings = geos.GEOSGetNumInteriorRings(geomPtr)

  // Check that it is equal to one
  t.equal(numRings, 1, 'The polygon has one interior ring')

  // Get the first interior ring as a GEOS geometry
  const ringPtr = geos.GEOSGetInteriorRingN(geomPtr, 0)

  // Convert it to a WKT string
  const ringWkt = geomToWkt(ringPtr)

  // Check that it is equal to the expected WKT string
  t.equal(ringWkt, 'LINEARRING (1 1, 2 1, 2 2, 1 2, 1 1)', 'The interior ring is correct')

  // Destroy the geometries
  // Note: Do not destroy ringPtr returned by GEOSGetInteriorRingN,
  //       it is a pointer to internal storage and must NOT be destroyed directly.
  geos.GEOSGeom_destroy(geomPtr)

  // End the test case
  t.end()
})
