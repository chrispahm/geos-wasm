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
  geos.GEOSNormalize(geomPtr)
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

// https://github.com/libgeos/geos/blob/3.12.0/tests/unit/capi/GEOSPolygonizeTest.cpp
test('GEOSPolygonize_getCutEdges - 1', function (t) {
  const wkts = [
    'LINESTRING(1 3, 3 3, 3 1, 1 1, 1 3)',
    'LINESTRING(1 3, 3 3, 3 1, 1 1, 1 3)'
  ]

  const geoms = wkts.map(wktToGeom)
  const geomPtrs = new Int32Array(geoms)
  const geomVecPtr = geos.Module._malloc(geomPtrs.length * geomPtrs.BYTES_PER_ELEMENT)
  geos.Module.HEAP32.set(geomPtrs, geomVecPtr >> 2)

  const gPtr = geos.GEOSPolygonizer_getCutEdges(geomVecPtr, geoms.length)

  t.ok(gPtr !== 0)
  t.equal(geos.GEOSGetNumGeometries(gPtr), 2)

  freeGeom(gPtr)
  geoms.forEach(freeGeom)

  t.end()
})

test('GEOSPolygonize_getCutEdges - 2', function (t) {
  // Example from JTS Developer's Guide, Chapter 6 - Polygonization
  const wkts = [
    'LINESTRING(0 0, 10 10)', // isolated edge
    'LINESTRING(185 221, 100 100)', // dangling edge
    'LINESTRING(185 221, 88 275, 180 316)',
    'LINESTRING(185 221, 292 281, 180 316)',
    'LINESTRING(189 98, 83 187, 185 221)',
    'LINESTRING(189 98, 325 168, 185 221)'
  ]

  const geoms = wkts.map(wktToGeom)
  const geomPtrs = new Int32Array(geoms)
  const geomVecPtr = geos.Module._malloc(geomPtrs.length * geomPtrs.BYTES_PER_ELEMENT)
  geos.Module.HEAP32.set(geomPtrs, geomVecPtr >> 2)

  const gPtr = geos.GEOSPolygonizer_getCutEdges(geomVecPtr, geoms.length)

  t.ok(gPtr !== 0)
  t.equal(geos.GEOSGetNumGeometries(gPtr), 0)

  freeGeom(gPtr)
  geoms.forEach(freeGeom)

  t.end()
})

test('GEOSPolygonize_valid - 3', function (t) {
  // Example from JTS Developer's Guide, Chapter 6 - Polygonization
  const wkts = [
    'LINESTRING (100 100, 100 300, 300 300, 300 100, 100 100)',
    'LINESTRING (150 150, 150 250, 250 250, 250 150, 150 150)'
  ]

  const geoms = wkts.map(wktToGeom)
  const geomPtrs = new Int32Array(geoms)
  const geomVecPtr = geos.Module._malloc(geomPtrs.length * geomPtrs.BYTES_PER_ELEMENT)
  geos.Module.HEAP32.set(geomPtrs, geomVecPtr >> 2)

  // GEOSPolygonize gives us a collection of two polygons
  let gPtr = geos.GEOSPolygonize(geomVecPtr, geoms.length)
  t.ok(gPtr !== 0)
  t.equal(geos.GEOSGetNumGeometries(gPtr), 2)
  t.equal(geos.GEOSGeomTypeId(gPtr), 7) // GEOS_GEOMETRYCOLLECTION
  freeGeom(gPtr)

  // GEOSPolygonize_valid gives us a single polygon with a hole
  gPtr = geos.GEOSPolygonize_valid(geomVecPtr, geoms.length)
  t.ok(gPtr !== 0)
  t.equal(geos.GEOSGetNumGeometries(gPtr), 1)
  t.equal(geos.GEOSGeomTypeId(gPtr), 3) // GEOS_POLYGON
  freeGeom(gPtr)
  geoms.forEach(freeGeom)

  t.end()
})

test('GEOSPolygonize_valid - 4', function (t) {
  const wkts = [
    'LINESTRING (0 0, 1 1)'
  ]

  const geoms = wkts.map(wktToGeom)
  const geomPtrs = new Int32Array(geoms)
  const geomVecPtr = geos.Module._malloc(geomPtrs.length * geomPtrs.BYTES_PER_ELEMENT)
  geos.Module.HEAP32.set(geomPtrs, geomVecPtr >> 2)

  const gPtr = geos.GEOSPolygonize_valid(geomVecPtr, geoms.length)

  t.ok(gPtr !== 0)
  t.equal(geos.GEOSGetNumGeometries(gPtr), 0)
  t.equal(geos.GEOSGeomTypeId(gPtr), 7) // GEOS_GEOMETRYCOLLECTION

  freeGeom(gPtr)
  geoms.forEach(freeGeom)

  t.end()
})

test('GEOSPolygonize_valid - 5', function (t) {
  const wkts = [
    'LINESTRING (0 0, 1 0, 1 1, 0 1, 0 0)',
    'LINESTRING (1 1, 2 1, 2 2, 1 2, 1 1)'
  ]

  const geoms = wkts.map(wktToGeom)
  const geomPtrs = new Int32Array(geoms)
  const geomVecPtr = geos.Module._malloc(geomPtrs.length * geomPtrs.BYTES_PER_ELEMENT)
  geos.Module.HEAP32.set(geomPtrs, geomVecPtr >> 2)

  const gPtr = geos.GEOSPolygonize_valid(geomVecPtr, geoms.length)

  t.ok(gPtr !== 0)
  t.equal(geos.GEOSGetNumGeometries(gPtr), 2)
  t.equal(geos.GEOSGeomTypeId(gPtr), 6) // GEOS_MULTIPOLYGON

  freeGeom(gPtr)
  geoms.forEach(freeGeom)

  t.end()
})

test('GEOSPolygonize_full - 6', function (t) {
  const geom1Ptr = wktToGeom('MULTILINESTRING ((0 0, 1 0, 1 1, 0 1, 0 0),  (0 0, 0.5 0.5),  (1 1, 2 2, 1 2, 2 1, 1 1))')
  const cutsPtr = geos.Module._malloc(4)
  geos.Module.setValue(cutsPtr, 0, 'i32')
  const danglesPtr = geos.Module._malloc(4)
  geos.Module.setValue(danglesPtr, 0, 'i32')
  const invalidRingsPtr = geos.Module._malloc(4)
  geos.Module.setValue(invalidRingsPtr, 0, 'i32')

  const result = geos.GEOSPolygonize_full(geom1Ptr, cutsPtr, danglesPtr, invalidRingsPtr)
  const cuts = geos.Module.getValue(cutsPtr, 'i32')
  const dangles = geos.Module.getValue(danglesPtr, 'i32')
  const invalidRings = geos.Module.getValue(invalidRingsPtr, 'i32')
  geos.Module._free(cutsPtr)
  geos.Module._free(danglesPtr)
  geos.Module._free(invalidRingsPtr)

  const expected = wktToGeom('GEOMETRYCOLLECTION(POLYGON ((0 0, 1 0, 1 1, 0 1, 0 0)))')
  const expectedCuts = wktToGeom('GEOMETRYCOLLECTION EMPTY')
  const expectedDangles = wktToGeom('GEOMETRYCOLLECTION(LINESTRING (0 0, 0.5 0.5))')
  const expectedInvalidRings = wktToGeom('GEOMETRYCOLLECTION(LINESTRING (1 1, 2 2, 1 2, 2 1, 1 1))')

  t.equal(geomToWkt(result), geomToWkt(expected))
  t.equal(geomToWkt(cuts), geomToWkt(expectedCuts))
  t.equal(geomToWkt(dangles), geomToWkt(expectedDangles))
  t.equal(geomToWkt(invalidRings), geomToWkt(expectedInvalidRings))

  freeGeom(geom1Ptr)
  freeGeom(result)
  freeGeom(expected)

  freeGeom(cuts)
  freeGeom(dangles)
  freeGeom(invalidRings)

  freeGeom(expectedCuts)
  freeGeom(expectedDangles)
  freeGeom(expectedInvalidRings)

  t.end()
})
