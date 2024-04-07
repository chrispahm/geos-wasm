// Import tape for testing
import test from 'tape'

// Import the geos module
import initGeosJs from '../../build/package/geos.esm.js'
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
  geos.GEOSWKTWriter_setRoundingPrecision(writer, 0)
  const wktPtr = geos.GEOSWKTWriter_write(writer, geomPtr)
  const wkt = geos.Module.UTF8ToString(wktPtr)
  geos.GEOSFree(wktPtr)
  geos.GEOSWKTWriter_destroy(writer)
  return wkt
}

// Create a helper function to free a GEOS geometry
function freeGeom (geomPtr) {
  geos.GEOSGeom_destroy(geomPtr)
}

// Create a test case for GEOSPolygonize
test('GEOSPolygonize', function (t) {
  // Create an array of input geometries as WKT strings
  const inputWkts = [
    'LINESTRING (0 0, 4 0)',
    'LINESTRING (4 0, 4 4)',
    'LINESTRING (4 4, 0 4)',
    'LINESTRING (0 4, 0 0)',
    'LINESTRING (1 1, 3 1)',
    'LINESTRING (3 1, 3 3)',
    'LINESTRING (3 3, 1 3)',
    'LINESTRING (1 3, 1 1)'
  ]

  // Convert the input geometries to GEOS geometries
  const inputGeoms = inputWkts.map(wktToGeom)

  // Create a list of geometries
  const geomPtrs = new Int32Array(inputGeoms)
  // copy the array to the heap
  const geomVecPtr = geos.Module._malloc(geomPtrs.length * geomPtrs.BYTES_PER_ELEMENT)
  geos.Module.HEAP32.set(geomPtrs, geomVecPtr >> 2)

  // Call the GEOSPolygonize function with the input geometries
  const outputGeomPtr = geos.GEOSPolygonize(geomVecPtr, inputGeoms.length)

  // Convert the output geometry to a WKT string
  const outputWkt = geomToWkt(outputGeomPtr)

  // Free the input and output geometries
  inputGeoms.forEach(freeGeom)
  freeGeom(outputGeomPtr)

  // Check if the output geometry is a valid multipolygon
  t.ok(outputWkt.startsWith('GEOMETRYCOLLECTION'), 'output is a geometry collection')

  // Check if the output geometry has two polygons
  t.equal(outputWkt.match(/\(\(/g).length, 2, 'output has two polygons')

  console.log('outputWkt', outputWkt)

  // End the test case
  t.end()
})
