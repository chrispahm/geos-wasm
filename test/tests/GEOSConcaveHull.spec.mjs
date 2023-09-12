// Import tape and geos
import test from 'tape'
import initGeosJs from '../../build/package/geos.esm.js'

// Initialize geos asynchronously
initGeosJs().then(geos => {
  // Create a test case for GEOSConvexHull
  test('GEOSConcaveHull', t => {
    // Create a reader and a writer for WKT conversion
    const reader = geos.GEOSWKTReader_create()
    const writer = geos.GEOSWKTWriter_create()
    // Set the writer output precision to 0
    geos.GEOSWKTWriter_setRoundingPrecision(writer, 0)

    // Create a WKT string for a polygon with a hole
    const wkt = 'POLYGON ((0 0, 10 0, 10 10, 0 10, 0 0), (2 2, 8 2, 8 8, 2 8, 2 2))'

    // Convert the WKT string to a GEOS geometry pointer
    const geomPtr = geos.GEOSWKTReader_read(reader, wkt)

    // Call the GEOSConvexHull function with the geometry pointer as the argument
    // The function returns another geometry pointer for the convex hull
    const hullPtr = geos.GEOSConcaveHull(geomPtr)

    // Convert the convex hull pointer to a WKT string
    const hullWkt = geos.GEOSWKTWriter_write(writer, hullPtr)

    // Assert that the concave hull WKT string is equal to the expected value
    t.equal(hullWkt, 'POLYGON ((2 8, 0 10, 8 8, 10 10, 10 0, 8 2, 0 0, 2 2, 2 8))')

    // Free the memory allocated for the pointers
    geos.GEOSGeom_destroy(geomPtr)
    geos.GEOSGeom_destroy(hullPtr)
    geos.GEOSFree(hullWkt)

    // Destroy the reader and writer objects
    geos.GEOSWKTReader_destroy(reader)
    geos.GEOSWKTWriter_destroy(writer)

    // End the test case
    t.end()
  })
})
