// Import tape for testing
import test from 'tape'

// Import the GEOS module
import initGeosJs from '../../build/package/geos.esm.js'
const geos = await initGeosJs()

// Define some WKT strings to test
const wkt1 = 'POLYGON ((0 0, 1 0, 1 1, 0 1, 0 0))'
const wkt2 = 'POLYGON ((0.5 0.5, 1.5 0.5, 1.5 1.5, 0.5 1.5, 0.5 0.5))'
const wkt3 = 'POLYGON ((2 2, 3 2, 3 3, 2 3, 2 2))'

// Create a reader and a writer for WKT
const reader = geos.GEOSWKTReader_create()
const writer = geos.GEOSWKTWriter_create()

// Convert the WKT strings to GEOS geometries
const geom1 = geos.GEOSWKTReader_read(reader, wkt1)
const geom2 = geos.GEOSWKTReader_read(reader, wkt2)
const geom3 = geos.GEOSWKTReader_read(reader, wkt3)

// Test the GEOSOverlaps function
test('GEOSOverlaps', t => {
  // Check if geom1 overlaps geom2 (should be 1 = true)
  t.equal(geos.GEOSOverlaps(geom1, geom2), 1, 'geom1 overlaps geom2')

  // Check if geom2 overlaps geom3 (should be 0 = false)
  t.equal(geos.GEOSOverlaps(geom2, geom3), 0, 'geom2 does not overlap geom3')

  // Check if geom3 overlaps geom1 (should be 0 = false)
  t.equal(geos.GEOSOverlaps(geom3, geom1), 0, 'geom3 does not overlap geom1')

  // Free the memory allocated by the geometries
  geos.GEOSGeom_destroy(geom1)
  geos.GEOSGeom_destroy(geom2)
  geos.GEOSGeom_destroy(geom3)

  // Destroy the reader and writer
  geos.GEOSWKTReader_destroy(reader)
  geos.GEOSWKTWriter_destroy(writer)

  // End the test
  t.end()
})
