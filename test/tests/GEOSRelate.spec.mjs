// Import tape for testing
import test from 'tape'

// Import the geos module
import initGeosJs from '../../build/package/geos.esm.js'
const geos = await initGeosJs()

// A helper function to convert a WKT string to a GEOS geometry
const wktToGeom = (wkt) => {
  const reader = geos.GEOSWKTReader_create()
  const geomPtr = geos.GEOSWKTReader_read(reader, wkt)
  geos.GEOSWKTReader_destroy(reader)
  return geomPtr
}

// A test case for GEOSRelate
test('GEOSRelate', (t) => {
  // Create two geometries from WKT strings
  const geom1 = wktToGeom('POLYGON ((0 0, 1 0, 1 1, 0 1, 0 0))')
  const geom2 = wktToGeom('POINT (0.5 0.5)')

  // Call the GEOSRelate function with the geometries and the matrix pointer
  const result = geos.GEOSRelate(geom1, geom2)

  // Check if the matrix is correct
  t.equal(result, '0F2FF1FF2', 'GEOSRelate should return the correct intersection matrix')

  // Free the memory allocated for the geometries and the matrix pointer
  geos.GEOSGeom_destroy(geom1)
  geos.GEOSGeom_destroy(geom2)

  // End the test
  t.end()
})
