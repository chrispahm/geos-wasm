// This test is based on the following GEOS CAPI test:
// https://github.com/libgeos/geos/blob/3.12.0/tests/unit/capi/GEOSGeom_createCollectionTest.cpp
import test from 'tape'
import initGeosJs from '../../build/package/geos.esm.js'

const geos = await initGeosJs()
const handle_ = geos.GEOS_init_r()
const geomSize = 3

const read = (wkt) => {
  const reader = geos.GEOSWKTReader_create_r(handle_)
  const size = wkt.length + 1
  const wktPtr = geos.Module._malloc(size)
  geos.Module.stringToUTF8(wkt, wktPtr, size)
  const geom_ = geos.GEOSWKTReader_read_r(handle_, reader, wktPtr)
  geos.Module._free(wktPtr)
  geos.GEOSWKTReader_destroy_r(handle_, reader)
  return geom_
}

test('1: Create collection from constant length C-array', (t) => {
  const geoms = new Uint32Array(geomSize)
  geoms[0] = geos.GEOSGeom_createEmptyPoint_r(handle_)
  geoms[1] = geos.GEOSGeom_createEmptyPoint_r(handle_)
  geoms[2] = geos.GEOSGeom_createEmptyPoint_r(handle_)
  // takes ownership of individual geometries
  const geomsPtr = geos.Module._malloc(geomSize * 4)
  geos.Module.HEAPU32.set(geoms, geomsPtr / 4)
  const geom_ = geos.GEOSGeom_createCollection_r(handle_, 4, geomsPtr, geomSize) // geos.GEOS_MULTIPOINT
  geos.Module._free(geomsPtr)
  t.equal(geos.GEOSGetNumGeometries_r(handle_, geom_), geomSize)

  t.end()
})

test('2: Create collection from constant length std::array', (t) => {
  const geoms = new Uint32Array([
    geos.GEOSGeom_createEmptyLineString_r(handle_),
    geos.GEOSGeom_createEmptyLineString_r(handle_),
    geos.GEOSGeom_createEmptyLineString_r(handle_)
  ])
  // takes ownership of individual geometries
  const geomsPtr = geos.Module._malloc(geomSize * 4)
  geos.Module.HEAPU32.set(geoms, geomsPtr / 4)
  const geom_ = geos.GEOSGeom_createCollection_r(
    handle_, 5, // GEOS_MULTILINESTRING
    geomsPtr, geoms.length
  )
  geos.Module._free(geomsPtr)
  t.equal(geos.GEOSGetNumGeometries_r(handle_, geom_), geomSize)

  t.end()
})

test('3: Create collection from dynamic length std::vector of geometries', (t) => {
  const geoms = []
  geoms.push(geos.GEOSGeom_createEmptyPolygon_r(handle_))
  geoms.push(geos.GEOSGeom_createEmptyPolygon_r(handle_))
  geoms.push(geos.GEOSGeom_createEmptyPolygon_r(handle_))
  geoms.push(geos.GEOSGeom_createEmptyPolygon_r(handle_))
  geoms.push(geos.GEOSGeom_createEmptyPolygon_r(handle_))
  // takes ownership of individual geometries
  const geomsPtr = geos.Module._malloc(geoms.length * 4)
  const geomsArr = new Uint32Array(geoms)
  geos.Module.HEAPU32.set(geomsArr, geomsPtr / 4)
  const geom_ = geos.GEOSGeom_createCollection_r(
    handle_, 6, // geos.GEOS_MULTIPOLYGON
    geomsPtr, geoms.length
  )
  t.equal(geos.GEOSGetNumGeometries_r(handle_, geom_), geoms.length)

  t.end()
})

test('4: Error on invalid collection type, ownership is still transferred', (t) => {
  const geoms = []
  geoms.push(geos.GEOSGeom_createEmptyPolygon_r(handle_))
  // takes ownership of individual geometries
  const geomsPtr = geos.Module._malloc(geoms.length * 4)
  const geomsArr = new Uint32Array(geoms)
  geos.Module.HEAPU32.set(geomsArr, geomsPtr / 4)
  let geom_ = geos.GEOSGeom_createCollection_r(
    handle_, 12345,
    geomsPtr, geoms.length
  )
  t.ok(geom_ === 0)

  geom_ = geos.GEOSGeom_createEmptyCollection_r(handle_, 12345)
  t.ok(geom_ === 0)

  t.end()
})

test('5: Release empty collection', (t) => {
  const wkt = 'MULTIPOLYGON EMPTY'
  const geom_ = read(wkt)
  t.ok(geom_ !== 0)

  const ngeomsPtr = geos.Module._malloc(4)
  const geoms_ = geos.GEOSGeom_releaseCollection_r(handle_, geom_, ngeomsPtr)
  const ngeoms_ = geos.Module.getValue(ngeomsPtr, 'i32')
  t.ok(geoms_ === 0)
  t.ok(ngeoms_ === 0)

  t.end()
})

test('6: Release generic collection', (t) => {
  const wkt = 'GEOMETRYCOLLECTION(POINT(0 0), POINT(1 1))'
  const geom_ = read(wkt)
  t.ok(geom_ !== 0)

  const ngeomsPtr = geos.Module._malloc(4)
  const geoms_ = geos.GEOSGeom_releaseCollection_r(handle_, geom_, ngeomsPtr)
  const ngeoms_ = geos.Module.getValue(ngeomsPtr, 'i32')
  geos.Module._free(ngeomsPtr)
  t.ok(geoms_ !== 0)
  t.ok(ngeoms_ === 2)

  const geomsArr = new Uint32Array(ngeoms_)
  const view = new Uint32Array(geos.Module.HEAPU32.buffer, geoms_, ngeoms_)
  for (let i = 0; i < ngeoms_; i++) {
    geomsArr[i] = view[i]
  }

  for (let i = 0; i < ngeoms_; i++) {
    t.ok(geos.GEOSGeomTypeId_r(handle_, geomsArr[i]) === 0) // geos.GEOS_POINT
    geos.GEOSGeom_destroy_r(handle_, geomsArr[i])
  }

  t.end()
})

test('7: Release typed collection', (t) => {
  const wkt = 'MULTIPOINT((0 0), (1 1))'
  const geom_ = read(wkt)
  t.ok(geom_ !== 0)

  const ngeomsPtr = geos.Module._malloc(4)
  const geoms_ = geos.GEOSGeom_releaseCollection_r(handle_, geom_, ngeomsPtr)
  const ngeoms_ = geos.Module.getValue(ngeomsPtr, 'i32')
  geos.Module._free(ngeomsPtr)
  t.ok(geoms_ !== 0)
  t.ok(ngeoms_ === 2)

  const geomsArr = new Uint32Array(ngeoms_)
  const view = new Uint32Array(geos.Module.HEAPU32.buffer, geoms_, ngeoms_)
  for (let i = 0; i < ngeoms_; i++) {
    geomsArr[i] = view[i]
  }

  for (let i = 0; i < ngeoms_; i++) {
    t.ok(geos.GEOSGeomTypeId_r(handle_, geomsArr[i]) === 0) // geos.GEOS_POINT
    geos.GEOSGeom_destroy_r(handle_, geomsArr[i])
  }

  t.end()
})
