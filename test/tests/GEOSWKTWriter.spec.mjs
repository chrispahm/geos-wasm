// Import tape for testing
import test from 'tape'

// Import the geos module
import initGeosJs from '../../build/package/geos.esm.js'
const geos = await initGeosJs()

// Create a WKT reader and writer
const reader = geos.GEOSWKTReader_create()
const writer = geos.GEOSWKTWriter_create()

// Test the GEOSWKTWriter_write function
test('GEOSWKTWriter_write', (t) => {
  // Create a WKT string and a geometry pointer
  const wkt = 'POLYGON ((0 0, 1 0, 1 1, 0 1, 0 0))'
  const geomPtr = geos.GEOSWKTReader_read(reader, wkt)

  // Set precision to 0 digits
  geos.GEOSWKTWriter_setRoundingPrecision(writer, 0)
  // Write the geometry to a WKT string using the writer
  const wkt2 = geos.GEOSWKTWriter_write(writer, geomPtr)

  // Check that the output WKT string is equal to the input one
  t.equal(wkt2, wkt, 'Output WKT matches input WKT')

  // Free the memory
  geos.GEOSGeom_destroy(geomPtr)
  t.end()
})

// Test the GEOSWKTWriter_setTrim function
test('GEOSWKTWriter_setTrim', (t) => {
  // Create a WKT string and a geometry pointer
  const wkt = 'POINT (1.0000000000000000 2.0000000000000000)'
  const geomPtr = geos.GEOSWKTReader_read(reader, wkt)

  // Set the trim flag to true on the writer
  geos.GEOSWKTWriter_setTrim(writer, true)

  // Write the geometry to a WKT string using the writer
  const wkt2 = geos.GEOSWKTWriter_write(writer, geomPtr)

  // Check that the output WKT string is trimmed of trailing zeros
  t.equal(wkt2, 'POINT (1 2)', 'Output WKT is trimmed')

  // Free the memory
  geos.GEOSGeom_destroy(geomPtr)
  t.end()
})

// Test the GEOSWKTWriter_setRoundingPrecision function
test('GEOSWKTWriter_setRoundingPrecision', (t) => {
  // Create a WKT string and a geometry pointer
  const wkt = 'POINT (1.2345678901234567 2.3456789012345678)'
  const geomPtr = geos.GEOSWKTReader_read(reader, wkt)

  // Set the rounding precision to 4 on the writer
  geos.GEOSWKTWriter_setRoundingPrecision(writer, 4)

  // Write the geometry to a WKT string using the writer
  const wkt2 = geos.GEOSWKTWriter_write(writer, geomPtr)

  // Check that the output WKT string is rounded to three decimal places
  t.equal(wkt2, 'POINT (1.235 2.346)', 'Output WKT is rounded')

  // Free the memory
  geos.GEOSGeom_destroy(geomPtr)
  t.end()
})

// Test the GEOSWKTWriter_setOutputDimension function
test('GEOSWKTWriter_setOutputDimension', (t) => {
  // Create a WKT string and a geometry pointer with Z dimension
  const wkt = 'POINT Z (1.0 2.0 3.0)'
  const geomPtr = geos.GEOSWKTReader_read(reader, wkt)

  // Set the output dimension to two on the writer
  geos.GEOSWKTWriter_setOutputDimension(writer, 2)

  // Write the geometry to a WKT string using the writer
  const wkt2 = geos.GEOSWKTWriter_write(writer, geomPtr)

  // Check that the output WKT string does not have Z dimension
  t.equal(wkt2, 'POINT (1 2)', 'Output WKT has no Z dimension')

  // Free the memory
  geos.GEOSGeom_destroy(geomPtr)
  t.end()
})

// Destroy the reader and writer
geos.GEOSWKTReader_destroy(reader)
geos.GEOSWKTWriter_destroy(writer)
