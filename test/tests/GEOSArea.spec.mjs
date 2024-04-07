import test from 'tape'
import initGeosJs from '../../build/package/geos.esm.js'

test('calculate area of a polygon', async (t) => {
  t.plan(1)

  const geos = await initGeosJs()

  const reader = geos.GEOSWKTReader_create()
  const wkt = 'POLYGON((0 0,0 10,10 10,10 0,0 0))'
  const size = wkt.length + 1
  const wktPtr = geos.Module._malloc(size)
  geos.Module.stringToUTF8(wkt, wktPtr, size)
  const geomPtr = geos.GEOSWKTReader_read(reader, wktPtr)
  geos.Module._free(wktPtr)
  const areaPtr = geos.Module._malloc(8)
  geos.GEOSArea(geomPtr, areaPtr)
  const area = geos.Module.getValue(areaPtr, 'double')

  t.equal(area, 100)

  geos.GEOSWKTReader_destroy(reader)
  geos.GEOSGeom_destroy(geomPtr)
  geos.GEOSFree(areaPtr)
  // End the test case
  t.end()
})
