// Import tape for testing
import test from 'tape'

// Import the GEOS module
import initGeosJs from '../../build/package/geos.esm.js'

// Initialize the GEOS module
initGeosJs().then(geos => {
  // Create a WKT reader and writer
  const reader = geos.GEOSWKTReader_create()
  const writer = geos.GEOSWKTWriter_create()
  // Set the writer to output in 0 decimal places
  geos.GEOSWKTWriter_setRoundingPrecision(writer, 0)
  // Define a test case with a WKT string and a tolerance value
  const testCase = {
    wkt: 'POLYGON ((0 0, 0 1, 1 1, 1 0, 0 0), (0.1 0.1, 0.1 0.9, 0.9 0.9, 0.9 0.1, 0.1 0.1))',
    tolerance: 0.1
  }

  // Convert the WKT string to a GEOS geometry pointer
  const geomPtr = geos.GEOSWKTReader_read(reader, testCase.wkt)

  // Simplify the geometry using the GEOSSimplify function and the tolerance value
  const simplifiedPtr = geos.GEOSSimplify(geomPtr, testCase.tolerance)

  // Convert the simplified geometry pointer to a WKT string
  const simplifiedWkt = geos.GEOSWKTWriter_write(writer, simplifiedPtr)

  // Define the expected WKT string after simplification
  const expectedWkt = 'POLYGON ((0 0, 0 1, 1 1, 1 0, 0 0), (0 0, 0 1, 1 1, 1 0, 0 0))'

  // Use tape to test if the simplified WKT string matches the expected WKT string
  test('GEOSSimplify', t => {
    t.plan(1)
    t.equal(simplifiedWkt, expectedWkt, 'The simplified geometry should match the expected geometry')
    t.end()
  })

  // Free all memory by destroying the reader and writer and the geometries
  geos.GEOSWKTReader_destroy(reader)
  geos.GEOSWKTWriter_destroy(writer)
  geos.GEOSGeom_destroy(geomPtr)
  geos.GEOSGeom_destroy(simplifiedPtr)
})
