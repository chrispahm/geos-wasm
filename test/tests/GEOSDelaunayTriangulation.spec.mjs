// Import tape for testing
import test from 'tape'

// Import the GEOS module
import initGeosJs from '../../build/package/geos.esm.js'
const geos = await initGeosJs()

// A helper function to convert a WKT string to a GEOS geometry pointer
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

// A helper function to convert a GEOS geometry pointer to a WKT string
const geomToWkt = (geomPtr) => {
  const writer = geos.GEOSWKTWriter_create()
  geos.GEOSWKTWriter_setRoundingPrecision(writer, 0)
  const wktPtr = geos.GEOSWKTWriter_write(writer, geomPtr)
  const wkt = geos.Module.UTF8ToString(wktPtr)
  geos.GEOSFree(wktPtr)
  geos.GEOSWKTWriter_destroy(writer)
  return wkt
}

// A helper function to free a GEOS geometry pointer
const freeGeom = (geomPtr) => {
  geos.GEOSGeom_destroy(geomPtr)
}

// A test case for the GEOSDelaunayTriangulation function
test('GEOSDelaunayTriangulation', (t) => {
  // Create a polygon geometry from a WKT string
  const polygon = wktToGeom('POLYGON ((0 0, 1 0, 1 1, 0 1, 0 0))')

  // Call the GEOSDelaunayTriangulation function with a tolerance of 0 and a flag of 2 (TIN output)
  const tinPtr = geos.GEOSDelaunayTriangulation(polygon, 0, 2)

  // Convert the output geometry pointer to a WKT string
  const tinWkt = geomToWkt(tinPtr)

  // Free the input and output geometries
  freeGeom(polygon)
  freeGeom(tinPtr)

  // Check if the output is as expected
  t.equal(
    tinWkt,
    'MULTILINESTRING ((0 1, 1 1), (0 0, 0 1), (0 0, 1 0), (1 0, 1 1), (0 1, 1 0))',
    'The output TIN of the Delaunay triangulation'
  )

  // End the test
  t.end()
})
