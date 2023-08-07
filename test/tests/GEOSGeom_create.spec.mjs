// This test is based on the following GEOS CAPI test:
// https://github.com/libgeos/geos/blob/3.12.0/tests/unit/capi/GEOSGeom_createTest.cpp
import test from 'tape'
import initGeosJs from '../../build/package/geos.esm.js'

const geos = await initGeosJs()
const handle_ = geos.GEOS_init_r()

test('1: EMPTY point', (t) => {
  let geom1_ = geos.GEOSGeom_createEmptyPoint_r(handle_)
  t.ok(geos.GEOSisEmpty_r(handle_, geom1_) !== 0)
  t.equal(geos.GEOSGeomTypeId_r(handle_, geom1_), 0) // geos.GEOS_POINT
  geos.GEOSGeom_destroy(geom1_)
  geom1_ = null
  t.end()
})

test('2: EMPTY linestring', (t) => {
  let geom1_ = geos.GEOSGeom_createEmptyLineString_r(handle_)
  t.ok(geos.GEOSisEmpty_r(handle_, geom1_) !== 0)
  t.equal(geos.GEOSGeomTypeId_r(handle_, geom1_), 1) // geos.GEOS_LINESTRING
  geos.GEOSGeom_destroy(geom1_)
  geom1_ = null
  t.end()
})

test('3: EMPTY polygon', (t) => {
  let geom1_ = geos.GEOSGeom_createEmptyPolygon_r(handle_)
  t.ok(geos.GEOSisEmpty_r(handle_, geom1_) !== 0)
  t.equal(geos.GEOSGeomTypeId_r(handle_, geom1_), 3) // geos.GEOS_POLYGON
  geos.GEOSGeom_destroy(geom1_)
  geom1_ = null
  t.end()
})

test('4: EMPTY multipoint', (t) => {
  let geom1_ = geos.GEOSGeom_createEmptyCollection_r(handle_, 4) // geos.GEOS_MULTIPOINT
  t.ok(geos.GEOSisEmpty_r(handle_, geom1_) !== 0)
  t.equal(geos.GEOSGeomTypeId_r(handle_, geom1_), 4) // geos.GEOS_MULTIPOINT
  geos.GEOSGeom_destroy(geom1_)
  geom1_ = null
  t.end()
})

test('5: EMPTY multilinestring', (t) => {
  let geom1_ = geos.GEOSGeom_createEmptyCollection_r(handle_, 5) // geos.GEOS_MULTILINESTRING
  t.ok(geos.GEOSisEmpty_r(handle_, geom1_) !== 0)
  t.equal(geos.GEOSGeomTypeId_r(handle_, geom1_), 5) // geos.GEOS_MULTILINESTRING
  geos.GEOSGeom_destroy(geom1_)
  geom1_ = null
  t.end()
})

test('6: EMPTY multipolygon', (t) => {
  let geom1_ = geos.GEOSGeom_createEmptyCollection_r(handle_, 6) // geos.GEOS_MULTIPOLYGON
  t.ok(geos.GEOSisEmpty_r(handle_, geom1_) !== 0)
  t.equal(geos.GEOSGeomTypeId_r(handle_, geom1_), 6) // geos.GEOS_MULTIPOLYGON
  geos.GEOSGeom_destroy(geom1_)
  geom1_ = null
  t.end()
})

test('7: EMPTY collection', (t) => {
  let geom1_ = geos.GEOSGeom_createEmptyCollection_r(handle_, 7) // geos.GEOS_GEOMETRYCOLLECTION
  t.ok(geos.GEOSisEmpty_r(handle_, geom1_) !== 0)
  t.equal(geos.GEOSGeomTypeId_r(handle_, geom1_), 7) // geos.GEOS_GEOMETRYCOLLECTION
  geos.GEOSGeom_destroy(geom1_)
  geom1_ = null
  t.end()
})
