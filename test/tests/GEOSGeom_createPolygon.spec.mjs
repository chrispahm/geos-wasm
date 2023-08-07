// This test is based on the following GEOS CAPI test:
// https://github.com/libgeos/geos/blob/3.12.0/tests/unit/capi/GEOSGeom_createPolygonTest.cpp
import test from 'tape'
import initGeosJs from '../../build/package/geos.esm.js'

const geos = await initGeosJs()

test('1: create hole polygon', (t) => {
  const shellSeq = geos.GEOSCoordSeq_create(5, 2)
  const holeSeq = geos.GEOSCoordSeq_create(5, 2)

  const shellCoords = [0, 0, 0, 10, 10, 10, 10, 0, 0, 0]
  const holeCoords = [5, 5, 5, 6, 6, 6, 6, 5, 5, 5]
  for (let i = 0; i < 5; i++) {
    geos.GEOSCoordSeq_setXY(shellSeq, i, shellCoords[2 * i], shellCoords[2 * i + 1])
    geos.GEOSCoordSeq_setXY(holeSeq, i, holeCoords[2 * i], holeCoords[2 * i + 1])
  }

  const shell = geos.GEOSGeom_createLinearRing(shellSeq)
  const hole = geos.GEOSGeom_createLinearRing(holeSeq)
  const holes = new Uint32Array([hole])
  const holesPtr = geos.Module._malloc(holes.length * 4)
  geos.Module.HEAPU32.set(holes, holesPtr / 4)

  const polygon = geos.GEOSGeom_createPolygon(shell, holesPtr, 1)
  const wkt = 'POLYGON((0 0, 0 10, 10 10, 10 0, 0 0),(5 5, 5 6, 6 6, 6 5, 5 5))'
  const size = wkt.length + 1
  const wktPtr = geos.Module._malloc(size)
  geos.Module.stringToUTF8(wkt, wktPtr, size)
  const expected = geos.GEOSGeomFromWKT(wktPtr)
  geos.Module._free(wktPtr)

  // const w = geos.GEOSWKTWriter_create()
  // console.log(geos.GEOSWKTWriter_write(w, polygon))
  // console.log(geos.GEOSWKTWriter_write(w, expected))

  t.equal(geos.GEOSEqualsExact(polygon, expected, 0), 1)

  geos.GEOSGeom_destroy(polygon)
  geos.GEOSGeom_destroy(expected)
  // WARNING! The GEOSGeom_createPolygon takes ownership of the
  // GEOSGeometry, but not the containing array!
  // maybe this should be changed...
  geos.Module._free(holesPtr)

  t.end()
})

test('2: test error on wrong input type (linestring) for shell', (t) => {
  const shellSeq = geos.GEOSCoordSeq_create(5, 2)

  const shellCoords = [0, 0, 0, 10, 10, 10, 10, 0, 0, 0]
  for (let i = 0; i < 5; i++) {
    geos.GEOSCoordSeq_setXY(shellSeq, i, shellCoords[2 * i], shellCoords[2 * i + 1])
  }

  const shell = geos.GEOSGeom_createLineString(shellSeq)
  const holes = null
  const nholes = 0

  // Returns null on exception, wrong input type for shell
  const polygon = geos.GEOSGeom_createPolygon(shell, holes, nholes)
  console.log('polygon', polygon)
  t.ok(polygon === 0)

  // Shouldn't need this
  if (polygon) {
    geos.GEOSGeom_destroy(polygon)
  }

  t.end()
})

test('3: test error on wrong input type (null) for shell', (t) => {
  const shell = null
  const holes = null

  // Returns null on exception, wrong input type for shell
  let polygon = geos.GEOSGeom_createPolygon(shell, holes, 0)
  t.ok(polygon === 0)

  // Returns null on exception, wrong input type for shell
  polygon = geos.GEOSGeom_createPolygon(shell, holes, 1)
  t.ok(polygon === 0)

  // Shouldn't need this
  if (polygon) {
    geos.GEOSGeom_destroy(polygon)
  }

  t.end()
})
