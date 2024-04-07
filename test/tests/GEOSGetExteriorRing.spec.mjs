// Import tape for testing
import test from 'tape'

// Import the GEOS module
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

// Define a test case for the GEOSGetExteriorRing function
test('GEOSGetExteriorRing', (t) => {
  // Create a polygon geometry from a WKT string
  const polygon = wktToGeom('POLYGON ((0 0, 1 0, 1 1, 0 1, 0 0))')

  // Get the exterior ring of the polygon using the GEOS function
  const ringPtr = geos.GEOSGetExteriorRing(polygon)

  // Convert the ring geometry to a WKT string
  const ringWkt = geomToWkt(ringPtr)

  // Check if the ring WKT matches the expected value
  t.equal(ringWkt, 'LINEARRING (0 0, 1 0, 1 1, 0 1, 0 0)', 'The exterior ring of the polygon is correct')

  // Destroy the polygon geometry
  geos.GEOSGeom_destroy(polygon)

  // End the test case
  t.end()
})
