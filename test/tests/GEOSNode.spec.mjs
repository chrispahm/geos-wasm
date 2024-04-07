// Import tape and initGeosJs
import test from 'tape'
import initGeosJs from '../../build/package/geos.esm.js'
// Load the geos module
const geos = await initGeosJs()

// Create a reader and a writer for WKT conversion
const reader = geos.GEOSWKTReader_create()
const writer = geos.GEOSWKTWriter_create()

// Define a helper function to convert a WKT string to a GEOS geometry pointer
const wktToGeom = (wkt) => {
  const size = wkt.length + 1
  const wktPtr = geos.Module._malloc(size)
  geos.Module.stringToUTF8(wkt, wktPtr, size)
  const geomPtr = geos.GEOSWKTReader_read(reader, wktPtr)
  geos.Module._free(wktPtr)
  return geomPtr
}

// Set the rounding precision of the writer to 0
geos.GEOSWKTWriter_setRoundingPrecision(writer, 0)

// Create an async wrapper function to use await
function runTests () {
  return new Promise((resolve, reject) => {
    const finishedPromises = []
    // Test GEOSNode with a simple polygon
    test('GEOSNode with a simple polygon', (t) => {
    // Plan one assertion
      t.plan(1)

      // Create a WKT string for a simple polygon
      const wkt = 'POLYGON ((0 0, 1 0, 1 1, 0 1, 0 0))'

      // Convert the WKT string to a GEOS geometry
      const geomPtr = wktToGeom(wkt)

      // Apply GEOSNode to the geometry
      const nodePtr = geos.GEOSNode(geomPtr)

      // Convert the result to a WKT string
      const nodeWktPtr = geos.GEOSWKTWriter_write(writer, nodePtr)
      const nodeWkt = geos.Module.UTF8ToString(nodeWktPtr)
      geos.GEOSFree(nodeWktPtr)

      // Check if the result is equal to the input
      t.equal(nodeWkt, 'MULTILINESTRING ((0 0, 1 0, 1 1, 0 1, 0 0))', 'GEOSNode should return the same polygon')

      // Free the memory
      geos.GEOSGeom_destroy(geomPtr)
      geos.GEOSGeom_destroy(nodePtr)

      finishedPromises.push(true)
      if (finishedPromises.length === 3) resolve()
    })

    // Test GEOSNode with a polygon with self-intersections
    test('GEOSNode with a polygon with self-intersections', (t) => {
    // Plan one assertion
      t.plan(1)

      // Create a WKT string for a polygon with self-intersections
      const wkt = 'POLYGON ((0 0, 1 0, 1 1, 0 1, 0 0), (0.5 0.5, 0.5 1.5, 1.5 1.5, 1.5 0.5, 0.5 0.5))'

      // Convert the WKT string to a GEOS geometry
      const geomPtr = wktToGeom(wkt)

      // Apply GEOSNode to the geometry
      const nodePtr = geos.GEOSNode(geomPtr)

      // Check if the result is a valid geometry
      t.ok(geos.GEOSisValid(nodePtr), 'GEOSNode should return a valid geometry')

      // Free the memory
      geos.GEOSGeom_destroy(geomPtr)
      geos.GEOSGeom_destroy(nodePtr)

      finishedPromises.push(true)
      if (finishedPromises.length === 3) resolve()
    })

    // Test GEOSNode with a linestring
    test('GEOSNode with a linestring', (t) => {
    // Plan one assertion
      t.plan(1)

      // Create a WKT string for a linestring
      const wkt = 'LINESTRING (0 0, 1 1, 2 0, 1 -1, 0 0)'

      // Convert the WKT string to a GEOS geometry
      const geomPtr = wktToGeom(wkt)

      // Apply GEOSNode to the geometry
      const nodePtr = geos.GEOSNode(geomPtr)

      // Convert the result to a WKT string
      const nodeWktPtr = geos.GEOSWKTWriter_write(writer, nodePtr)
      const nodeWkt = geos.Module.UTF8ToString(nodeWktPtr)
      geos.GEOSFree(nodeWktPtr)

      // Check if the result is a multilinestring with four segments
      t.equal(nodeWkt, 'MULTILINESTRING ((0 0, 1 1, 2 0, 1 -1, 0 0))', 'GEOSNode should return a multilinestring with four segments')

      // Free the memory
      geos.GEOSGeom_destroy(geomPtr)
      geos.GEOSGeom_destroy(nodePtr)

      finishedPromises.push(true)
      if (finishedPromises.length === 3) resolve()
    })
  })
}

// Run the tests
runTests().then(() => {
  // Destroy the reader and writer
  geos.GEOSWKTReader_destroy(reader)
  geos.GEOSWKTWriter_destroy(writer)
})
