// Import the geos module
import initGeosJs from '../../build/package/geos.esm.js'

// Import tape for testing
import test from 'tape'
const geos = await initGeosJs()

// Create a helper function to convert a WKT string to a GEOS geometry
function wktToGeom (wkt) {
  const reader = geos.GEOSWKTReader_create()
  const size = wkt.length + 1
  const wktPtr = geos.Module._malloc(size)
  geos.Module.stringToUTF8(wkt, wktPtr, size)
  const geomPtr = geos.GEOSWKTReader_read(reader, wktPtr)
  geos.Module._free(wktPtr)
  geos.GEOSWKTReader_destroy(reader)
  return geomPtr
}

// Create a helper function to convert a GEOS geometry to a WKT string
function geomToWkt (geomPtr) {
  const writer = geos.GEOSWKTWriter_create()
  // Setzen Sie die Ausgabepräzision auf 0
  geos.GEOSWKTWriter_setRoundingPrecision(writer, 0)
  const wktPtr = geos.GEOSWKTWriter_write(writer, geomPtr)
  const wkt = geos.Module.UTF8ToString(wktPtr)
  geos.GEOSFree(wktPtr)
  geos.GEOSWKTWriter_destroy(writer)
  return wkt
}

// Create a few geometries for testing purposes, wkt3 intersects with wkt1
const wkt1 = 'POLYGON ((0 0, 1 0, 1 1, 0 1, 0 0))'
const wkt2 = 'POLYGON ((2 2, 3 2, 3 3, 2 3, 2 2))'
const wkt3 = 'POLYGON ((0.5 0.5, 1.5 0.5, 1.5 1.5, 0.5 1.5, 0.5 0.5))'
const geom1 = wktToGeom(wkt1)
const geom2 = wktToGeom(wkt2)
const geom3 = wktToGeom(wkt3)

// Create a test case for GEOSSTRtree
test('GEOSSTRtree test', function (t) {
  // Create a new index with a node capacity of 2
  const tree = geos.GEOSSTRtree_create(2)

  // Add two geometries to the index, the parameters are (index, geometry, item),
  // and only the item will be inserted into the the tree.
  // We use the geometry pointer as an item, but it doesn't have to be.
  geos.GEOSSTRtree_insert(tree, geom1, geom1)
  geos.GEOSSTRtree_insert(tree, geom2, geom2)

  // Define a callback function that will be called for each item that intersects with the query geometry
  function queryCallback (itemPtr, userdata) {
    // Convert the item pointer to a WKT string
    const wkt = geomToWkt(itemPtr)
    // Test if the item is the expected one
    t.ok(wkt === wkt1, 'itemPtr is expected')
    // Free all memory
    geos.GEOSSTRtree_destroy(tree)
    geos.GEOSGeom_destroy(geom1)
    geos.GEOSGeom_destroy(geom2)
    geos.GEOSGeom_destroy(geom3)
    // Remove custom callback function from C table
    geos.Module.removeFunction(queryCallbackPtr)
    // End the test case
    t.end()
  }

  // Create a pointer to the JS callback function
  const queryCallbackPtr = geos.Module.addFunction(queryCallback, 'vii')

  // Query the index with a geometry that intersects with the first item
  geos.GEOSSTRtree_query(tree, geom3, queryCallbackPtr)
})
