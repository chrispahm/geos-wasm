// Import tape for testing
import test from 'tape'

// Import the module with the function
import initGeosJs from '../../build/package/geos.esm.js'

// Initialize the module and get the geos object
const geos = await initGeosJs()

// Create a reader and a writer for WKT conversion
const reader = geos.GEOSWKTReader_create()
const writer = geos.GEOSWKTWriter_create()

// Create a test case with a WKT string and its expected reversed WKT string
const testCase = {
  wkt: 'POLYGON ((0 0, 1 0, 1 1, 0 1, 0 0))',
  reversedWkt: 'POLYGON ((0 0, 0 1, 1 1, 1 0, 0 0))'
}

// Create a test with tape
test('GEOSReverse should reverse the order of coordinates in a geometry', (t) => {
  // Convert the WKT string to a GEOS geometry using the reader
  const geomPtr = geos.GEOSWKTReader_read(reader, testCase.wkt)

  // Apply the GEOSReverse function to the geometry and get a new geometry pointer
  const reversedGeomPtr = geos.GEOSReverse(geomPtr)

  // Convert the reversed geometry to a WKT string using the writer
  // Set output precision to 0
  geos.GEOSWKTWriter_setRoundingPrecision(writer, 0)
  const reversedWkt = geos.GEOSWKTWriter_write(writer, reversedGeomPtr)

  // Compare the reversed WKT string with the expected one using tape assertions
  t.equal(reversedWkt, testCase.reversedWkt, 'The reversed WKT string should match the expected one')

  // Free the memory by destroying the reader, writer and geometries
  geos.GEOSWKTReader_destroy(reader)
  geos.GEOSWKTWriter_destroy(writer)
  geos.GEOSGeom_destroy(geomPtr)
  geos.GEOSGeom_destroy(reversedGeomPtr)

  // End the test
  t.end()
})
