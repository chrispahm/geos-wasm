// Import the geos module
import initGeosJs from '../../build/package/geos.esm.js'

// Import the tape module for testing
import test from 'tape'
const geos = await initGeosJs()

// A helper function to convert a WKT string to a GEOS geometry
const wktToGeom = (wkt) => {
  const reader = geos.GEOSWKTReader_create()
  const size = wkt.length + 1
  const wktPtr = geos.Module._malloc(size)
  geos.Module.stringToUTF8(wkt, wktPtr, size)
  const geomPtr = geos.GEOSWKTReader_read(reader, wktPtr)
  geos.Module._free(wktPtr)
  geos.GEOSWKTReader_destroy(reader)
  return geomPtr
}

// A helper function to convert a GEOS geometry to a WKT string
const geomToWkt = (geomPtr) => {
  const writer = geos.GEOSWKTWriter_create()
  geos.GEOSWKTWriter_setRoundingPrecision(writer, 0)
  const wktPtr = geos.GEOSWKTWriter_write(writer, geomPtr)
  const wkt = geos.Module.UTF8ToString(wktPtr)
  geos.GEOSFree(wktPtr)
  geos.GEOSWKTWriter_destroy(writer)
  return wkt
}

// A helper function to free a GEOS geometry
const freeGeom = (geomPtr) => {
  geos.GEOSGeom_destroy(geomPtr)
}

// A test case for GEOSMinimumWidth
test('GEOSMinimumWidth', (t) => {
  // Create a polygon geometry from a WKT string
  const polygon = wktToGeom('POLYGON ((0 0, 1 0, 1 1, 0 1, 0 0))')

  // Call GEOSMinimumWidth on the polygon and get the result as a WKT string
  const minWidth = geos.GEOSMinimumWidth(polygon)
  const minWidthWkt = geomToWkt(minWidth)

  // Free the geometries
  freeGeom(polygon)
  freeGeom(minWidth)

  // Check if the result is correct
  t.equal(minWidthWkt, 'LINESTRING (0 0, 1 0)', 'GEOSMinimumWidth returns the correct line')

  // End the test
  t.end()
})
