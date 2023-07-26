// Import tape for testing
import test from 'tape'

// Import the GEOS module
import initGeosJs from '../../build/package/geos.esm.js'
const geos = await initGeosJs()

// Create a WKT reader and writer
const reader = geos.GEOSWKTReader_create()
const writer = geos.GEOSWKTWriter_create()

// Define a test polygon in WKT format
const wkt = 'POLYGON ((0 0, 1 0, 1 1, 0 1, 0 0))'

// Convert the WKT string to a GEOS geometry
const geomPtr = geos.GEOSWKTReader_read(reader, wkt)

// Test the GEOSSetSRID function
test('GEOSSetSRID', (t) => {
  // Set the SRID of the geometry to 4326 (WGS84)
  geos.GEOSSetSRID(geomPtr, 4326)

  // Check if the SRID of the geometry is 4326
  const srid = geos.GEOSGetSRID(geomPtr)
  t.equal(srid, 4326, 'The SRID of the geometry should be 4326')

  // End the test
  t.end()

  // Free the memory allocated by the geometry, reader and writer
  geos.GEOSGeom_destroy(geomPtr)
  geos.GEOSWKTReader_destroy(reader)
  geos.GEOSWKTWriter_destroy(writer)
})
