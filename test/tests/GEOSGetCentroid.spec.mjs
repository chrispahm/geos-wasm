// Import tape for testing
import test from 'tape'

// Import the geos module
import initGeosJs from '../../build/package/geos.esm.js'
const geos = await initGeosJs()

// Define a helper function to convert a WKT string to a GEOS geometry
const wktToGeom = async (wkt) => {
  const reader = geos.GEOSWKTReader_create()
  const geomPtr = geos.GEOSWKTReader_read(reader, wkt)
  geos.GEOSWKTReader_destroy(reader)
  return geomPtr
}

// Define a helper function to convert a GEOS geometry to a WKT string
const geomToWkt = async (geomPtr) => {
  const writer = geos.GEOSWKTWriter_create()
  geos.GEOSWKTWriter_setRoundingPrecision(writer, 1)
  const wkt = geos.GEOSWKTWriter_write(writer, geomPtr)
  geos.GEOSWKTWriter_destroy(writer)
  return wkt
}

// Define a test case for the GEOSGetCentroid function
test('GEOSGetCentroid', async (t) => {
  // Create a polygon geometry from a WKT string
  const geomPtr = await wktToGeom('POLYGON ((0 0, 1 0, 1 1, 0 1, 0 0))')

  // Call the GEOSGetCentroid function and get the result as a pointer
  const centroidPtr = geos.GEOSGetCentroid(geomPtr)

  // Convert the result to a WKT string
  const centroidWkt = await geomToWkt(centroidPtr)

  // Check if the result is correct
  t.equal(centroidWkt, 'POINT (0.5 0.5)', 'The centroid of the polygon is correct')

  // Free the memory allocated for the geometries
  geos.GEOSGeom_destroy(geomPtr)
  geos.GEOSGeom_destroy(centroidPtr)

  // End the test case
  t.end()
})
