// Import tape for testing
import test from 'tape'

// Import geos module
import initGeosJs from '../../build/package/geos.esm.js'
const geos = await initGeosJs()

// Define a helper function to create a GEOS geometry from a WKT string
const wktToGeom = (wkt) => {
  const reader = geos.GEOSWKTReader_create()
  const geomPtr = geos.GEOSWKTReader_read(reader, wkt)
  geos.GEOSWKTReader_destroy(reader)
  return geomPtr
}

// Define a helper function to create a WKT string from a GEOS geometry
const geomToWkt = (geomPtr) => {
  const writer = geos.GEOSWKTWriter_create()
  const wkt = geos.GEOSWKTWriter_write(writer, geomPtr)
  geos.GEOSWKTWriter_destroy(writer)
  return wkt
}

// Define some sample geometries
const obstacles = wktToGeom('MULTILINESTRING ((10 100, 60 180, 130 150, 190 160), (20 50, 70 70, 90 20, 110 40), (160 30, 100 100, 180 100))')
const boundary = wktToGeom('POLYGON ((0 -10, -10 -10, -10 -20, -20 -20, -20 -30, -30 -30, -30 -40, -40 -40, -40 -50, -50 -50, -50 -60, -60 -60, -60 -70, -70 -70, -70 -80, -80 -80, -80 -90, -90 -90, -90 -100, -100 -100, -100 190, 190 190, 190 -10, 0 -10))')
const tolerance = 0.1

// Test the GEOSLargestEmptyCircle function
test('GEOSLargestEmptyCircle', (t) => {
  // Call the function with the sample geometries and tolerance
  const result = geos.GEOSLargestEmptyCircle(obstacles, boundary, tolerance)

  // Convert the first element to WKT and check if it matches the expected center point
  const centerWkt = geomToWkt(result)
  t.equal(centerWkt, 'LINESTRING (-99.964599609375 -99.964599609375, 20 50)')

  // Free the memory allocated by the function
  geos.GEOSGeom_destroy(result)

  // Free the memory allocated by the sample geometries
  geos.GEOSGeom_destroy(obstacles)
  geos.GEOSGeom_destroy(boundary)

  // End the test
  t.end()
})
