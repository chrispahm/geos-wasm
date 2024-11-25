// Import tape for testing
import test from 'tape'

// Import the GEOS module
import initGeosJs from '../../build/package/geos.esm.js'
const geos = await initGeosJs()

// Create a WKT reader and writer
const reader = geos.GEOSWKTReader_create()

// Create a WKB writer
const wkbWriter = geos.GEOSWKBWriter_create()

// Set the byte order and flavor of the WKB writer
// geos.GEOSWKBWriter_setByteOrder(wkbWriter, geos.GEOS_WKB_NDR) // Little endian
// geos.GEOSWKBWriter_setFlavor(wkbWriter, geos.GEOS_WKB_ISO) // ISO WKB

// Set the include SRID flag of the WKB writer
geos.GEOSWKBWriter_setIncludeSRID(wkbWriter, 1) // Include SRID

// Define a test polygon with SRID 4326
const wkt = 'POLYGON ((0 0, 1 0, 1 1, 0 1, 0 0))'

// Read the WKT string into a GEOS geometry
const size = wkt.length + 1
const wktPtr = geos.Module._malloc(size)
geos.Module.stringToUTF8(wkt, wktPtr, size)
const geomPtr = geos.GEOSWKTReader_read(reader, wktPtr)
geos.Module._free(wktPtr)

// Write the GEOS geometry into a WKB buffer
const wkbSizePtr = geos.Module._malloc(4) // Allocate memory for the size of the buffer
const wkbBufferPtr = geos.GEOSWKBWriter_write(wkbWriter, geomPtr, wkbSizePtr) // Write the buffer and get its pointer
const wkbSize = geos.Module.getValue(wkbSizePtr, 'i32') // Get the size of the buffer

// Convert the WKB buffer into a Uint8Array
const wkbBuffer = new Uint8Array(geos.Module.HEAPU8.buffer, wkbBufferPtr, wkbSize)

// Free the memory allocated for the WKB buffer and size
geos.GEOSFree(wkbBufferPtr)
geos.GEOSFree(wkbSizePtr)

// Write a test case to check if the WKB buffer is correct
test('GEOSWKBWriter', (t) => {
  t.plan(1)

  // Define the expected WKB buffer as a Uint8Array
  const expectedWkbBuffer = new Uint8Array([
    96, 95, 1, 0, 104, 95, 1, 0, 0, 5, 0, 0,
    27, 0, 0, 0, 6, 0, 0, 0, 0, 0, 0, 0,
    255, 255, 255, 255, 1, 0, 4, 0, 0, 0, 0, 240,
    19, 0, 0, 0, 96, 95, 1, 0, 104, 95, 1, 0,
    0, 0, 0, 0, 27, 0, 0, 0, 6, 0, 0, 0,
    0, 0, 0, 0, 255, 255, 255, 255, 1, 0, 4, 0,
    0, 0, 0, 240, 27, 0, 0, 0, 48, 147, 2, 0,
    168, 147, 2, 0, 240, 147, 2, 0, 3
  ])

  // Compare the actual and expected WKB buffers
  t.deepEqual(wkbBuffer, expectedWkbBuffer, 'WKB buffer is correct')
  t.end()
})
