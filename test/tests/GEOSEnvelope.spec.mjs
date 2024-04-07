// Import tape for testing
import test from 'tape'

// Import the geos module
import initGeosJs from '../../build/package/geos.esm.js'
const geos = await initGeosJs()

// A helper function to convert a WKT string to a GEOS geometry
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

// A helper function to convert a GEOS geometry to a WKT string
const geomToWkt = (geomPtr) => {
  const writer = geos.GEOSWKTWriter_create()
  geos.GEOSWKTWriter_setRoundingPrecision(writer, 0)
  const wktPtr = geos.GEOSWKTWriter_write(writer, geomPtr)
  const wkt = geos.Module.UTF8ToString(wktPtr)
  geos.GEOSFree(wktPtr)
  geos.GEOSWKTWriter_destroy(writer)
  return wkt
}

// A test case for the GEOSEnvelope function
test('GEOSEnvelope', (t) => {
  // Create a polygon geometry from a WKT string
  const polygon = wktToGeom('POLYGON ((0 0, 1 0, 1 1, 0 1, 0 0))')

  // Compute the envelope of the polygon using GEOSEnvelope
  const envelope = geos.GEOSEnvelope(polygon)

  // Convert the envelope geometry to a WKT string
  const envelopeWkt = geomToWkt(envelope)

  // Check if the envelope WKT matches the expected value
  t.equal(envelopeWkt, 'POLYGON ((0 0, 1 0, 1 1, 0 1, 0 0))', 'The envelope of the polygon is correct')

  // Destroy the geometries to free memory
  geos.GEOSGeom_destroy(polygon)
  geos.GEOSGeom_destroy(envelope)

  // End the test
  t.end()
})
