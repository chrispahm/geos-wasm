// Import tape for testing
import test from 'tape'

// Import the geos module
import initGeosJs from '../../build/package/geos.esm.js'
const geos = await initGeosJs()

// Define some WKT strings
// Note: SRID is not specified in the WKT as GEOS currently does not support EWKT
const wktStrings = [
  'POLYGON ((0 0, 1 0, 1 1, 0 1, 0 0))', // SRID = 0 (default)
  'POINT (30 10)', // SRID = 4326 (WGS84)
  'LINESTRING (0 0, 1 1)' // SRID = 3857 (Web Mercator)
]

// Test the GEOSGetSRID function for each WKT string
test('GEOSGetSRID', t => {
  t.plan(wktStrings.length) // Plan the number of assertions

  // Create a reader and a writer for WKT conversion
  const reader = geos.GEOSWKTReader_create()
  const writer = geos.GEOSWKTWriter_create()

  const expectedSRIDs = [0, 4326, 3857]

  for (let i = 0; i < wktStrings.length; i++) {
    // Read the WKT string and get a geometry pointer
    const size = wktStrings[i].length + 1
    const wktPtr = geos.Module._malloc(size)
    geos.Module.stringToUTF8(wktStrings[i], wktPtr, size)
    const geomPtr = geos.GEOSWKTReader_read(reader, wktPtr)
    geos.Module._free(wktPtr)
    // Set the SRID of the geometry
    geos.GEOSSetSRID(geomPtr, expectedSRIDs[i])

    // Get the SRID of the geometry
    const srid = geos.GEOSGetSRID(geomPtr)

    // Compare the SRID with the expected value
    t.equal(srid, expectedSRIDs[i], `SRID of ${wktStrings[i]} should be ${expectedSRIDs[i]}`)

    // Destroy the geometry pointer
    geos.GEOSGeom_destroy(geomPtr)
  }

  // Destroy the reader and writer
  geos.GEOSWKTReader_destroy(reader)
  geos.GEOSWKTWriter_destroy(writer)
})
