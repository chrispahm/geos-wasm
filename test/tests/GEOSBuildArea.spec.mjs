// Import tape for testing
import test from 'tape'

// Import geos module
import initGeosJs from '../../build/package/geos.esm.js'
const geos = await initGeosJs()

// Test GEOSBuildArea function
test('GEOSBuildArea', async (t) => {
  // Create a reader and a writer for WKT conversion
  const reader = geos.GEOSWKTReader_create()
  const writer = geos.GEOSWKTWriter_create()
  // Set the writer output precision to 0
  geos.GEOSWKTWriter_setRoundingPrecision(writer, 0)

  // Create some example geometries from WKT strings
  const wkt1 = 'POLYGON ((0 0, 1 0, 1 1, 0 1, 0 0))'
  const wkt2 = 'POLYGON ((0.5 -0.5, 1.5 -0.5, 1.5 0.5, 0.5 0.5, 0.5 -0.5))'
  const wkt3 = 'POLYGON ((-1 -1, -1 -2, -2 -2, -2 -1, -1 -1))'

  // Read the WKT strings into GEOS geometries
  const geomPtr1 = geos.GEOSWKTReader_read(reader, wkt1)
  const geomPtr2 = geos.GEOSWKTReader_read(reader, wkt2)
  const geomPtr3 = geos.GEOSWKTReader_read(reader, wkt3)

  // Create a list of geometries
  const geomPtrs = new Int32Array([geomPtr1, geomPtr2, geomPtr3])
  // copy the array to the heap
  const geomVecPtr = geos.Module._malloc(geomPtrs.length * geomPtrs.BYTES_PER_ELEMENT)
  geos.Module.HEAP32.set(geomPtrs, geomVecPtr >> 2)

  // Create a GEOS geometry collection from the array of pointers
  const collectionPtr = geos.GEOSGeom_createCollection(6, geomVecPtr, geomPtrs.length)

  // Apply the GEOSBuildArea function to the collection
  const areaPtr = geos.GEOSBuildArea(collectionPtr)

  // Write the result geometry to a WKT string
  const areaWkt = geos.GEOSWKTWriter_write(writer, areaPtr)

  // Expected WKT string for the result geometry
  const expectedWkt = 'MULTIPOLYGON (((-1 -2, -2 -2, -2 -1, -1 -1, -1 -2)), ((0 0, 0 1, 1 1, 1 0, 2 0, 2 0, 0 0, 0 0, 0 0)))'

  // Assert that the result WKT matches the expected WKT
  t.equal(areaWkt, expectedWkt)

  // Free all memory by destroying the reader and writer and all geometries
  geos.GEOSWKTReader_destroy(reader)
  geos.GEOSWKTWriter_destroy(writer)

  geos.GEOSGeom_destroy(areaPtr)
  geos.GEOSGeom_destroy(collectionPtr)
  geos.GEOSFree(geomVecPtr)
  // End the test case
  t.end()
})
