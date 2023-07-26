// Import tape for testing
import test from 'tape'

// Import the geos module
import initGeosJs from '../../build/package/geos.esm.js'

// Define some WKT strings to test
const wkt1 = 'POLYGON ((0 0, 1 0, 1 1, 0 1, 0 0))'
const wkt2 = 'POLYGON ((0 0, 2 0, 2 2, 0 2, 0 0))'
const wkt3 = 'POLYGON ((0 0, 1 0, 1 1, 0.5 1.5, 0 1, 0 0))'

// Define a helper function to create a GEOS geometry from a WKT string
const createGeom = async (wkt) => {
  const geos = await initGeosJs()
  const reader = geos.GEOSWKTReader_create()
  const geomPtr = geos.GEOSWKTReader_read(reader, wkt)
  geos.GEOSWKTReader_destroy(reader)
  return { geos, geomPtr }
}

// Define a helper function to destroy a GEOS geometry
const destroyGeom = ({ geos, geomPtr }) => {
  geos.GEOSGeom_destroy(geomPtr)
}

// Define a helper function to compare two GEOS geometries for equality
const compareGeoms = ({ geos, geomPtr: g1 }, { geos: _, geomPtr: g2 }) => {
  return geos.GEOSEquals(g1, g2) === 1
}

// Define the test cases
test('GEOSEquals', async (t) => {
  // Create the geometries to test
  const geom1 = await createGeom(wkt1)
  const geom2 = await createGeom(wkt2)
  const geom3 = await createGeom(wkt3)

  // Test that GEOSEquals returns true for identical geometries
  t.ok(compareGeoms(geom1, geom1), 'GEOSEquals returns true for identical geometries')

  // Test that GEOSEquals returns false for different geometries
  t.notOk(compareGeoms(geom1, geom2), 'GEOSEquals returns false for different geometries')
  t.notOk(compareGeoms(geom1, geom3), 'GEOSEquals returns false for different geometries')
  t.notOk(compareGeoms(geom2, geom3), 'GEOSEquals returns false for different geometries')

  // Destroy the geometries
  destroyGeom(geom1)
  destroyGeom(geom2)
  destroyGeom(geom3)

  // End the test
  t.end()
})
