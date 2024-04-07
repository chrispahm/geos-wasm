// Import tape and geos
import test from 'tape'
import initGeosJs from '../../build/package/geos.esm.js'

// Initialize geos asynchronously
initGeosJs().then(geos => {
  // Create a test case for GEOSConvexHull
  test('GEOSConvexHull', t => {
    // Create a reader and a writer for WKT conversion
    const reader = geos.GEOSWKTReader_create()
    const writer = geos.GEOSWKTWriter_create()
    // Set the writer output precision to 0
    geos.GEOSWKTWriter_setRoundingPrecision(writer, 0)

    // Create a WKT string for a polygon with a hole
    const wkt = 'POLYGON ((0 0, 10 0, 10 10, 0 10, 0 0), (2 2, 8 2, 8 8, 2 8, 2 2))'

    // Convert the WKT string to a GEOS geometry pointer
    const size = wkt.length + 1
    const wktPtr = geos.Module._malloc(size)
    geos.Module.stringToUTF8(wkt, wktPtr, size)
    const geomPtr = geos.GEOSWKTReader_read(reader, wktPtr)
    geos.Module._free(wktPtr)

    // Call the GEOSConvexHull function with the geometry pointer as the argument
    // The function returns another geometry pointer for the convex hull
    const hullPtr = geos.GEOSConvexHull(geomPtr)

    // Convert the convex hull pointer to a WKT string
    const hullWktPtr = geos.GEOSWKTWriter_write(writer, hullPtr)
    const hullWkt = geos.Module.UTF8ToString(hullWktPtr)
    geos.GEOSFree(hullWktPtr)

    // Assert that the convex hull WKT string is equal to the expected value
    t.equal(hullWkt, 'POLYGON ((0 0, 0 10, 10 10, 10 0, 0 0))')

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
