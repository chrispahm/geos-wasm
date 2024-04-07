// Import tape for testing
import test from 'tape'

// Import the geos module
import initGeosJs from '../../build/package/geos.esm.js'

// Initialize the geos module
const geos = await initGeosJs()

// Create a function to convert a WKT string to a GEOS geometry
const wktToGeom = (wkt) => {
  // Create a reader
  const reader = geos.GEOSWKTReader_create()
  // Read the WKT string and get a geometry pointer
  const size = wkt.length + 1
  const wktPtr = geos.Module._malloc(size)
  geos.Module.stringToUTF8(wkt, wktPtr, size)
  const geomPtr = geos.GEOSWKTReader_read(reader, wktPtr)
  geos.Module._free(wktPtr)
  // Destroy the reader
  geos.GEOSWKTReader_destroy(reader)
  // Return the geometry pointer
  return geomPtr
}

// Create a test for the GEOSPrepare function
test('GEOSPrepare', (t) => {
  // Create some WKT strings for testing
  const wkt1 = 'POLYGON ((0 0, 1 0, 1 1, 0 1, 0 0))'
  const wkt2 = 'POLYGON ((0.5 0.5, 1.5 0.5, 1.5 1.5, 0.5 1.5, 0.5 0.5))'

  // Convert the WKT strings to GEOS geometries
  const geom1 = wktToGeom(wkt1)
  const geom2 = wktToGeom(wkt2)

  // Prepare the first geometry using GEOSPrepare
  const prepGeom1 = geos.GEOSPrepare(geom1)

  // Check if the prepared geometry intersects with the second geometry using GEOSPreparedIntersects
  t.true(geos.GEOSPreparedIntersects(prepGeom1, geom2), 'The prepared geometry intersects with the second geometry')

  // Destroy the prepared geometry using GEOSPreparedGeom_destroy
  geos.GEOSPreparedGeom_destroy(prepGeom1)

  // Destroy the geometries
  geos.GEOSGeom_destroy(geom1)
  geos.GEOSGeom_destroy(geom2)

  // End the test
  t.end()
})
