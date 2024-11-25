// This test is based on the following GEOS CAPI test:
// https://github.com/libgeos/geos/blob/3.12.0/tests/unit/capi/GEOSGeom_getCoordSeqTest.cpp
import test from 'tape'
import initGeosJs from '../../build/package/geos.esm.js'

const geos = await initGeosJs()

test('1: get coordseq from linestring', (t) => {
  const wkt = 'LINESTRING (1 2, 4 5, 9 -2)'
  const size = wkt.length + 1
  const wktPtr = geos.Module._malloc(size)
  geos.Module.stringToUTF8(wkt, wktPtr, size)
  const input_ = geos.GEOSGeomFromWKT(wktPtr)
  geos.Module._free(wktPtr)
  const seq = geos.GEOSGeom_getCoordSeq(input_)

  const xPtr = geos.Module._malloc(8)
  const yPtr = geos.Module._malloc(8)
  geos.GEOSCoordSeq_getXY(seq, 2, xPtr, yPtr)
  const x = geos.Module.getValue(xPtr, 'double')
  const y = geos.Module.getValue(yPtr, 'double')
  geos.Module._free(xPtr)
  geos.Module._free(yPtr)

  t.equal(x, 9)
  t.equal(y, -2)

  t.end()
})

test('2: test error on getting coordseq from polygon', (t) => {
  const wkt = 'POLYGON ((1 1, 2 1, 2 2, 1 1))'
  const size = wkt.length + 1
  const wktPtr = geos.Module._malloc(size)
  geos.Module.stringToUTF8(wkt, wktPtr, size)
  const input_ = geos.GEOSGeomFromWKT(wktPtr)
  t.throws(() => geos.GEOSGeom_getCoordSeq(input_), 'IllegalArgumentException: Geometry must be a Point or LineString')

  t.end()
})

test('3: get coordseq from point', (t) => {
  const wkt = 'POINT (3 8)'
  const size = wkt.length + 1
  const wktPtr = geos.Module._malloc(size)
  geos.Module.stringToUTF8(wkt, wktPtr, size)
  const input_ = geos.GEOSGeomFromWKT(wktPtr)
  const seq = geos.GEOSGeom_getCoordSeq(input_)

  const xPtr = geos.Module._malloc(8)
  const yPtr = geos.Module._malloc(8)
  geos.GEOSCoordSeq_getXY(seq, 0, xPtr, yPtr)
  const x = geos.Module.getValue(xPtr, 'double')
  const y = geos.Module.getValue(yPtr, 'double')
  geos.Module._free(xPtr)
  geos.Module._free(yPtr)

  t.equal(x, 3)
  t.equal(y, 8)

  t.end()
})
