// This test is based on the following GEOS CAPI test:
// https://github.com/libgeos/geos/blob/3.12.0/tests/unit/capi/GEOSNearestPointsTest.cpp
import test from 'tape'
import initGeosJs from '../../build/package/geos.esm.js'

const geos = await initGeosJs()

const checkNearestPoints = (t, wkt1, wkt2, x1, y1, x2, y2) => {
  const wkt1Size = wkt1.length + 1
  const wkt1Ptr = geos.Module._malloc(wkt1Size)
  geos.Module.stringToUTF8(wkt1, wkt1Ptr, wkt1Size)
  const geom1_ = geos.GEOSGeomFromWKT(wkt1Ptr)
  geos.Module._free(wkt1Ptr)
  t.ok(geom1_ !== null)

  const wkt2Size = wkt2.length + 1
  const wkt2Ptr = geos.Module._malloc(wkt2Size)
  geos.Module.stringToUTF8(wkt2, wkt2Ptr, wkt2Size)
  const geom2_ = geos.GEOSGeomFromWKT(wkt2Ptr)
  geos.Module._free(wkt2Ptr)
  t.ok(geom2_ !== null)
  const coords_ = geos.GEOSNearestPoints(geom1_, geom2_)

  const sizePtr = geos.Module._malloc(4)
  geos.GEOSCoordSeq_getSize(coords_, sizePtr)
  const size = geos.Module.getValue(sizePtr, 'i32')
  geos.Module._free(sizePtr)
  t.equal(size, 2, 'CoordSeq size')

  const oxPtr = geos.Module._malloc(8)
  const oyPtr = geos.Module._malloc(8)

  // Point in geom1_
  geos.GEOSCoordSeq_getOrdinate(coords_, 0, 0, oxPtr)
  geos.GEOSCoordSeq_getOrdinate(coords_, 0, 1, oyPtr)
  let ox = geos.Module.getValue(oxPtr, 'double')
  let oy = geos.Module.getValue(oyPtr, 'double')
  t.equal(ox, x1, 'P1 x')
  t.equal(oy, y1, 'P1 y')

  // Point in geom1_
  geos.GEOSCoordSeq_getOrdinate(coords_, 1, 0, oxPtr)
  geos.GEOSCoordSeq_getOrdinate(coords_, 1, 1, oyPtr)
  ox = geos.Module.getValue(oxPtr, 'double')
  oy = geos.Module.getValue(oyPtr, 'double')
  t.equal(ox, x2, 'P2 x')
  t.equal(oy, y2, 'P2 y')

  geos.Module._free(oxPtr)
  geos.Module._free(oyPtr)

  geos.GEOSCoordSeq_destroy(coords_)
}

const checkNearestPointsNull = (t, wkt1, wkt2) => {
  const wkt1Size = wkt1.length + 1
  const wkt1Ptr = geos.Module._malloc(wkt1Size)
  geos.Module.stringToUTF8(wkt1, wkt1Ptr, wkt1Size)
  const geom1_ = geos.GEOSGeomFromWKT(wkt1Ptr)
  t.ok(geom1_ !== 0)
  const wkt2Size = wkt2.length + 1
  const wkt2Ptr = geos.Module._malloc(wkt2Size)
  geos.Module.stringToUTF8(wkt1, wkt2Ptr, wkt2Size)
  const geom2_ = geos.GEOSGeomFromWKT(wkt2Ptr)
  t.ok(geom2_ !== 0)
  const coords_ = geos.GEOSNearestPoints(geom1_, geom2_)

  t.ok(coords_ === 0)
}

test('1', (t) => {
  checkNearestPointsNull(t, 'POLYGON EMPTY', 'POLYGON EMPTY')
  t.end()
})

test('2', (t) => {
  checkNearestPoints(
    t,
    'POLYGON((1 1,1 5,5 5,5 1,1 1))',
    'POLYGON((8 8, 9 9, 9 10, 8 8))',
    5, 5, 8, 8
  )
  t.end()
})

test('3', (t) => {
  checkNearestPoints(
    t,
    'POLYGON((1 1,1 5,5 5,5 1,1 1))',
    'POINT(2 2)',
    2, 2, 2, 2
  )
  t.end()
})

test('4', (t) => {
  checkNearestPoints(
    t,
    'LINESTRING(1 5,5 5,5 1,1 1)',
    'POINT(2 2)',
    2, 1, 2, 2
  )
  t.end()
})

test('5', (t) => {
  checkNearestPoints(
    t,
    'LINESTRING(0 0,10 10)',
    'LINESTRING(0 10,10 0)',
    5, 5, 5, 5
  )
  t.end()
})

test('6', (t) => {
  checkNearestPoints(
    t,
    'POLYGON((0 0,10 0,10 10,0 10,0 0))',
    'LINESTRING(8 5,12 5)',
    /* But could also be the intersection point... */
    8, 5, 8, 5
  )
  t.end()
})
