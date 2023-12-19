// This test is based on the following GEOS CAPI test:
// https://github.com/libgeos/geos/blob/3.12.0/tests/unit/capi/GEOSGeom_createLineStringTest.cpp
import test from 'tape'
import initGeosJs from '../../build/package/geos.esm.js'

const geos = await initGeosJs()

test('1: create linestring', (t) => {
  const seq = geos.GEOSCoordSeq_create(3, 2)

  geos.GEOSCoordSeq_setXY(seq, 0, 1, 2)
  geos.GEOSCoordSeq_setXY(seq, 1, 4, 5)
  geos.GEOSCoordSeq_setXY(seq, 2, 9, -2)

  const result = geos.GEOSGeom_createLineString(seq)
  const wkt = 'LINESTRING (1 2, 4 5, 9 -2)'
  const size = wkt.length + 1
  const wktPtr = geos.Module._malloc(size)
  geos.Module.stringToUTF8(wkt, wktPtr, size)
  const expected = geos.GEOSGeomFromWKT(wktPtr)
  geos.Module._free(wktPtr)

  t.equal(geos.GEOSEqualsExact(result, expected, 0), 1)

  geos.GEOSGeom_destroy(result)
  geos.GEOSGeom_destroy(expected)

  t.end()
})
