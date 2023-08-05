import test from 'tape'
import initGeosJs from '../../build/package/geos.esm.js'

test('README example: Calculate area of a polygon', async (t) => {
  t.plan(1)

  const geos = await initGeosJs()

  const reader = geos.GEOSWKTReader_create()
  const wkt = 'POLYGON ((0 0, 1 0, 1 1, 0 1, 0 0))'
  const geomPtr = geos.GEOSWKTReader_read(reader, wkt)
  const areaPtr = geos.Module._malloc(8)
  geos.GEOSArea(geomPtr, areaPtr)
  const area = geos.Module.getValue(areaPtr, 'double')

  t.equal(area, 1, 'Area should be 1')

  geos.GEOSWKTReader_destroy(reader)
  geos.GEOSGeom_destroy(geomPtr)
  geos.GEOSFree(areaPtr)
  // End the test case
  t.end()
})
