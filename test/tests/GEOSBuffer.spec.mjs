// Import tape for testing
import test from 'tape'

// Import the geos module
import initGeosJs from '../../build/package/geos.esm.js'
const geos = await initGeosJs()

// Define a helper function to get the area of a GEOS geometry
const getArea = (geomPtr) => {
  const ptr = geos.Module._malloc(8) // allocate 8 bytes for a double
  geos.GEOSArea(geomPtr, ptr) // write the area to the pointer
  const area = geos.Module.getValue(ptr, 'double') // read the value from the pointer
  geos.GEOSFree(ptr) // free the memory
  return area
}

// Define a test case for GEOSBuffer
test('GEOSBuffer', async (t) => {
  // Create a reader and a writer for WKT
  const reader = geos.GEOSWKTReader_create()

  // Create a WKT string for a polygon
  const wkt = 'POLYGON ((0 0, 1 0, 1 1, 0 1, 0 0))'

  // Read the WKT string and get a geometry pointer
  const size = wkt.length + 1
  const wktPtr = geos.Module._malloc(size)
  geos.Module.stringToUTF8(wkt, wktPtr, size)
  const geomPtr = geos.GEOSWKTReader_read(reader, wktPtr)
  geos.Module._free(wktPtr)

  // Buffer the geometry by 0.5 units and get a new geometry pointer
  const bufferPtr = geos.GEOSBuffer(geomPtr, 0.5)

  // Check if the buffered geometry is valid and has the expected area
  t.ok(geos.GEOSisValid(bufferPtr), 'Buffered geometry is valid')

  // Create a pointer for the area result
  const areaPtr = geos.Module._malloc(8) // double is 8 bytes

  // Get the area of the buffered geometry and store it in the pointer
  geos.GEOSArea(bufferPtr, areaPtr)

  // Read the value of the pointer as a double
  const area = getArea(bufferPtr)

  // Check if the area is close to the expected value (3.5)
  t.ok(area === 3.5, 'Buffered geometry has correct area')

  // Free the memory allocated for the pointer
  geos.GEOSFree(areaPtr)

  // Destroy the geometries, reader and writer
  geos.GEOSGeom_destroy(geomPtr)
  geos.GEOSGeom_destroy(bufferPtr)
  geos.GEOSWKTReader_destroy(reader)

  // End the test case
  t.end()
})
