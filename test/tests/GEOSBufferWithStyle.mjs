// Import tape for testing
import tape from 'tape'

// Import the geos module
import initGeosJs from '../../build/package/geos.esm.js'
const geos = await initGeosJs()

// Define a helper function to convert a GEOS geometry pointer to a WKT string
const geomToWkt = (writer, geomPtr) => {
  const wktPtr = geos.GEOSWKTWriter_write(writer, geomPtr)
  const wkt = geos.Module.UTF8ToString(wktPtr)
  geos.GEOSFree(wktPtr)
  return wkt
}

// Define a helper function to get the area of a GEOS geometry
const getArea = (geomPtr) => {
  const ptr = geos.Module._malloc(8) // allocate 8 bytes for a double
  geos.GEOSArea(geomPtr, ptr) // write the area to the pointer
  const area = geos.Module.getValue(ptr, 'double') // read the value from the pointer
  geos.GEOSFree(ptr) // free the memory
  return area
}

// Define some constants for the buffer styles
const GEOSBUF_CAP_ROUND = geos.GEOSBufCapStyles.GEOSBUF_CAP_ROUND
const GEOSBUF_CAP_FLAT = geos.GEOSBufCapStyles.GEOSBUF_CAP_FLAT
const GEOSBUF_CAP_SQUARE = geos.GEOSBufCapStyles.GEOSBUF_CAP_SQUARE
const GEOSBUF_JOIN_ROUND = geos.GEOSBufJoinStyles.GEOSBUF_JOIN_ROUND
const GEOSBUF_JOIN_MITRE = geos.GEOSBufJoinStyles.GEOSBUF_JOIN_MITRE
const GEOSBUF_JOIN_BEVEL = geos.GEOSBufJoinStyles.GEOSBUF_JOIN_BEVEL

// Define a test case for the GEOSBufferWithStyle function
tape('GEOSBufferWithStyle', (t) => {
  // Create WKT readers and writers
  const reader = geos.GEOSWKTReader_create()
  const writer = geos.GEOSWKTWriter_create()

  // Create a polygon geometry from a WKT string
  const wkt = 'POLYGON ((0 0, 1 0, 1 1, 0 1, 0 0))'
  const size = wkt.length + 1
  const wktPtr = geos.Module._malloc(size)
  geos.Module.stringToUTF8(wkt, wktPtr, size)
  const geomPtr = geos.GEOSWKTReader_read(reader, wktPtr)
  geos.Module._free(wktPtr)

  // Buffer the polygon with different styles and parameters
  const buffer1 = geos.GEOSBufferWithStyle(geomPtr, 0.5, 8, GEOSBUF_CAP_ROUND, GEOSBUF_JOIN_ROUND, 5.0)
  const buffer2 = geos.GEOSBufferWithStyle(geomPtr, -0.2, 4, GEOSBUF_CAP_FLAT, GEOSBUF_JOIN_MITRE, 2.0)
  const buffer3 = geos.GEOSBufferWithStyle(geomPtr, -0.4, -1, GEOSBUF_CAP_SQUARE, GEOSBUF_JOIN_BEVEL, -1.0)

  // Convert the buffered geometries to WKT strings
  const wkt1 = geomToWkt(writer, buffer1)
  const wkt2 = geomToWkt(writer, buffer2)
  const wkt3 = geomToWkt(writer, buffer3)

  // Get the areas of the buffered geometries
  const area1 = getArea(buffer1)
  const area2 = getArea(buffer2)
  const area3 = getArea(buffer3)

  // Assert that the buffered geometries are valid and have expected properties
  t.ok(geos.GEOSisValid(buffer1), 'buffer1 is valid')
  t.ok(geos.GEOSisValid(buffer2), 'buffer2 is valid')
  t.ok(geos.GEOSisValid(buffer3), 'buffer3 is valid')
  t.equal(wkt1.slice(0, 7), 'POLYGON', 'buffer1 is a polygon')
  t.equal(wkt2.slice(0, 7), 'POLYGON', 'buffer2 is a polygon')
  t.equal(wkt3.slice(0, 7), 'POLYGON', 'buffer3 is a polygon')
  t.ok(area1 > area2 && area2 > area3 && area3 > 0, 'areas are decreasing and positive')

  // Destroy the geometries to free memory
  geos.GEOSGeom_destroy(geomPtr)
  geos.GEOSGeom_destroy(buffer1)
  geos.GEOSGeom_destroy(buffer2)
  geos.GEOSGeom_destroy(buffer3)
  geos.GEOSWKTReader_destroy(reader)
  geos.GEOSWKTWriter_destroy(writer)

  // End the test case
  t.end()
})
