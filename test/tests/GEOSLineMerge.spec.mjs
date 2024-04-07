// Import tape for testing
import test from 'tape'

// Import the GEOS module
import initGeosJs from '../../build/package/geos.esm.js'

// Initialize the GEOS module
const geos = await initGeosJs()

// Define a function to convert a WKT string to a GEOS geometry
const wktToGeom = (wkt) => {
  // Create a WKT reader
  const reader = geos.GEOSWKTReader_create()
  // Read the WKT string and get a geometry pointer
  const size = wkt.length + 1
  const wktPtr = geos.Module._malloc(size)
  geos.Module.stringToUTF8(wkt, wktPtr, size)
  const geomPtr = geos.GEOSWKTReader_read(reader, wktPtr)
  geos.Module._free(wktPtr)
  // Destroy the reader
  geos.GEOSWKTReader_destroy(reader)
  // Return the geometry pointer
  return geomPtr
}

// Define a function to convert a GEOS geometry to a WKT string
const geomToWkt = (geomPtr) => {
  // Create a WKT writer
  const writer = geos.GEOSWKTWriter_create()
  // Set rounding precision for the writer
  geos.GEOSWKTWriter_setRoundingPrecision(writer, 0)
  // Write the geometry pointer and get a WKT string
  const wktPtr = geos.GEOSWKTWriter_write(writer, geomPtr)
  const wkt = geos.Module.UTF8ToString(wktPtr)
  geos.GEOSFree(wktPtr)
  // Destroy the writer
  geos.GEOSWKTWriter_destroy(writer)
  // Return the WKT string
  return wkt
}

// Define a test case for GEOSLineMerge
test('GEOSLineMerge', (t) => {
  // Define some input and expected output WKT strings
  const inputWkt = 'MULTILINESTRING((0 0, 1 1), (1 1, 2 2), (3 3, 4 4), (4 4, 5 5))'
  const outputWkt = 'MULTILINESTRING ((0 0, 1 1, 2 2), (3 3, 4 4, 5 5))'

  // Convert the input WKT string to a GEOS geometry pointer
  const inputGeom = wktToGeom(inputWkt)

  // Call GEOSLineMerge on the input geometry pointer and get an output geometry pointer
  const outputGeom = geos.GEOSLineMerge(inputGeom)

  // Convert the output geometry pointer to a WKT string
  const resultWkt = geomToWkt(outputGeom)

  // Compare the result WKT string with the expected output WKT string
  t.equal(resultWkt, outputWkt, 'GEOSLineMerge returns the expected result')

  // Destroy the input and output geometries
  geos.GEOSGeom_destroy(inputGeom)
  geos.GEOSGeom_destroy(outputGeom)

  // End the test case
  t.end()
})
