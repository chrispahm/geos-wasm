// import tape and geos
import test from 'tape'
import initGeosJs from '../../build/package/geos.esm.js'
const geos = await initGeosJs()

// create a reader and a writer for WKT conversion
const reader = geos.GEOSWKTReader_create()
const writer = geos.GEOSWKTWriter_create()

// create some geometries from WKT strings
const wkt1 = 'POLYGON ((0 0, 1 0, 1 1, 0 1, 0 0))'
const wkt2 = 'POLYGON ((0.5 0.5, 1.5 0.5, 1.5 1.5, 0.5 1.5, 0.5 0.5))'
const wkt3 = 'POINT (0.75 0.75)'
const geomPtr1 = geos.GEOSWKTReader_read(reader, wkt1)
const geomPtr2 = geos.GEOSWKTReader_read(reader, wkt2)
const geomPtr3 = geos.GEOSWKTReader_read(reader, wkt3)

// test the GEOSWithin function
test('GEOSWithin', function (t) {
  // plan the number of assertions
  t.plan(4)

  // check the return type of GEOSWithin
  t.equal(typeof geos.GEOSWithin, 'function', 'GEOSWithin is a function')

  // check the expected results of GEOSWithin
  t.equal(geos.GEOSWithin(geomPtr1, geomPtr2), 0, 'geom1 is not within geom2')
  t.equal(geos.GEOSWithin(geomPtr2, geomPtr1), 0, 'geom2 is not within geom1')
  t.equal(geos.GEOSWithin(geomPtr3, geomPtr1), 1, 'geom3 is within geom1')

  // free the memory
  geos.GEOSWKTReader_destroy(reader)
  geos.GEOSWKTWriter_destroy(writer)
  geos.GEOSGeom_destroy(geomPtr1)
  geos.GEOSGeom_destroy(geomPtr2)
  geos.GEOSGeom_destroy(geomPtr3)
})
