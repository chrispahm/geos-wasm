// Import tape for testing
import test from 'tape'

// Import the GEOS module
import initGeosJs from '../../build/package/geos.esm.js'

function strip (s) {
  return s.split('').filter(function (x) {
    const n = x.charCodeAt(0)

    return n > 31 && n < 127
  }).join('')
}

// Create a test case
test('GEOSWKBReader', async (t) => {
  // Initialize the GEOS module
  const geos = await initGeosJs()

  // Create a WKT reader
  const wktReader = geos.GEOSWKTReader_create()
  // Create a WKB reader
  const reader = geos.GEOSWKBReader_create()

  // Create a WKB writer
  const writer = geos.GEOSWKBWriter_create()

  // Set the writer to output in hex format
  geos.GEOSWKBWriter_setOutputDimension(writer, 3)
  geos.GEOSWKBWriter_setByteOrder(writer, 'GEOS_WKB_XDR')
  geos.GEOSWKBWriter_setIncludeSRID(writer, 1)

  // Create a WKT string for a polygon
  const wkt = 'POLYGON ((0 0, 1 0, 1 1, 0 1, 0 0))'

  // Convert the WKT string to a GEOS geometry
  const size = wkt.length + 1
  const wktPtr = geos.Module._malloc(size)
  geos.Module.stringToUTF8(wkt, wktPtr, size)
  const geomPtr = geos.GEOSWKTReader_read(wktReader, wktPtr)
  geos.Module._free(wktPtr)

  // Set the SRID of the geometry
  geos.GEOSSetSRID(geomPtr, 4326)

  // Convert the GEOS geometry to a WKB hex string
  const wkbHex = strip(geos.GEOSWKBWriter_writeHEX(writer, geomPtr))

  // Expected WKB hex string for the polygon
  const expectedWkbHex =
    '0020000003000010E60000000100000005000000000000000000000000000000003FF000000000000000000000000000003FF00000000000003FF000000000000000000000000000003FF000000000000000000000000000000000000000000000'

  // Assert that the WKB hex string includes the expected WKB hex string
  t.ok(wkbHex.includes(expectedWkbHex), 'WKB hex string includes expected WKB hex string')

  // Convert the WKB hex string back to a GEOS geometry
  const geomPtr2 = geos.GEOSWKBReader_readHEX(reader, expectedWkbHex, expectedWkbHex.length)

  // Assert that the geometries are equal
  t.ok(geos.GEOSEquals(geomPtr, geomPtr2), 'Geometries are equal')

  // Free the memory allocated by the geometries
  geos.GEOSGeom_destroy(geomPtr)
  geos.GEOSGeom_destroy(geomPtr2)

  // Destroy the reader and writer objects
  geos.GEOSWKTReader_destroy(wktReader)
  geos.GEOSWKBReader_destroy(reader)
  geos.GEOSWKBWriter_destroy(writer)

  // End the test case
  t.end()
})
