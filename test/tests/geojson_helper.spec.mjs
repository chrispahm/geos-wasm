// This test is using the following GEOS C++ API test GeoJSON examples:
// https://github.com/libgeos/geos/blob/3.12.0/tests/unit/io/GeoJSONReaderTest.cpp
import test from 'tape'
// import initGeosJs from '../../build/package/geos.esm.js'
import initGeosJs from '../../src/index.mjs'
import { jsonGeomToGeosGeom, geosGeomToJsonGeom } from '../../src/helpers/geojson.mjs'

const geos = await initGeosJs()

// A helper function to convert a GEOS geometry pointer to a WKT string
const geomToWkt = (geomPtr) => {
  const writer = geos.GEOSWKTWriter_create()
  geos.GEOSWKTWriter_setRoundingPrecision(writer, 0)
  const wkt = geos.GEOSWKTWriter_write(writer, geomPtr)
  geos.GEOSWKTWriter_destroy(writer)
  return wkt
}

test('1: Read/Write a GeoJSON Point', (t) => {
  const geojson = JSON.parse('{"type":"Point","coordinates":[-117.0,33.0]}')
  const geom = jsonGeomToGeosGeom(geojson)
  t.equal(geomToWkt(geom), 'POINT (-117 33)')
  const json = geosGeomToJsonGeom(geom)
  t.equal(JSON.stringify(json), JSON.stringify(geojson))
  t.end()
})

test('2: Read/Write a GeoJSON LineString', (t) => {
  const geojson = JSON.parse('{"type":"LineString","coordinates":[[102.0,0.0],[103.0,1.0],[104.0,0.0],[105.0,1.0]]}')
  const geom = jsonGeomToGeosGeom(geojson)
  t.equal(geomToWkt(geom), 'LINESTRING (102 0, 103 1, 104 0, 105 1)')
  const json = geosGeomToJsonGeom(geom)
  t.equal(JSON.stringify(json), JSON.stringify(geojson))
  t.end()
})

test('3: Read/Write a GeoJSON Polygon with only an outer ring', (t) => {
  const geojson = JSON.parse('{"type":"Polygon","coordinates":[[[30,10],[40,40],[20,40],[10,20],[30,10]]]}')
  const geom = jsonGeomToGeosGeom(geojson)
  t.equal(geomToWkt(geom), 'POLYGON ((30 10, 40 40, 20 40, 10 20, 30 10))')
  const json = geosGeomToJsonGeom(geom)
  t.equal(JSON.stringify(json), JSON.stringify(geojson))
  t.end()
})

test('4: Read/Write a GeoJSON Point with an outer ring and an inner ring', (t) => {
  const geojson = JSON.parse('{"type":"Polygon","coordinates":[[[35,10],[45,45],[15,40],[10,20],[35,10]],[[20,30],[35,35],[30,20],[20,30]]]}')
  const geom = jsonGeomToGeosGeom(geojson)
  t.equal(geomToWkt(geom), 'POLYGON ((35 10, 45 45, 15 40, 10 20, 35 10), (20 30, 35 35, 30 20, 20 30))')
  const json = geosGeomToJsonGeom(geom)
  t.equal(JSON.stringify(json), JSON.stringify(geojson))
  t.end()
})

test('5: Read/Write a GeoJSON MultiPoint', (t) => {
  const geojson = JSON.parse('{"type":"MultiPoint","coordinates":[[10, 40], [40, 30], [20, 20], [30, 10]]}')
  const geom = jsonGeomToGeosGeom(geojson)
  t.equal(geomToWkt(geom), 'MULTIPOINT ((10 40), (40 30), (20 20), (30 10))')
  const json = geosGeomToJsonGeom(geom)
  t.equal(JSON.stringify(json), JSON.stringify(geojson))
  t.end()
})

test('6: Read/Write a GeoJSON MultiLineString', (t) => {
  const geojson = JSON.parse('{"type":"MultiLineString","coordinates":[[[10, 10], [20, 20], [10, 40]],[[40, 40], [30, 30], [40, 20], [30, 10]]]}')
  const geom = jsonGeomToGeosGeom(geojson)
  t.equal(geomToWkt(geom), 'MULTILINESTRING ((10 10, 20 20, 10 40), (40 40, 30 30, 40 20, 30 10))')
  const json = geosGeomToJsonGeom(geom)
  t.equal(JSON.stringify(json), JSON.stringify(geojson))
  t.end()
})

test('7: Read/Write a GeoJSON MultiPolygon', (t) => {
  const geojson = JSON.parse('{"type": "MultiPolygon", "coordinates": [[[[40, 40], [20, 45], [45, 30], [40, 40]]], [[[20, 35], [10, 30], [10, 10], [30, 5], [45, 20], [20, 35]], [[30, 20], [20, 15], [20, 25], [30, 20]]]]}')
  const geom = jsonGeomToGeosGeom(geojson)
  t.equal(geomToWkt(geom), 'MULTIPOLYGON (((40 40, 20 45, 45 30, 40 40)), ((20 35, 10 30, 10 10, 30 5, 45 20, 20 35), (30 20, 20 15, 20 25, 30 20)))')
  const json = geosGeomToJsonGeom(geom)
  t.equal(JSON.stringify(json), JSON.stringify(geojson))
  t.end()
})

test('8: Read/Write a GeoJSON GeometryCollection', (t) => {
  const geojson = JSON.parse('{"type": "GeometryCollection","geometries": [{"type": "Point","coordinates": [40, 10]},{"type": "LineString","coordinates": [[10, 10], [20, 20], [10, 40]]},{"type": "Polygon","coordinates": [[[40, 40], [20, 45], [45, 30], [40, 40]]]}]}')
  const geom = jsonGeomToGeosGeom(geojson)
  t.equal(geomToWkt(geom), 'GEOMETRYCOLLECTION (POINT (40 10), LINESTRING (10 10, 20 20, 10 40), POLYGON ((40 40, 20 45, 45 30, 40 40)))')
  const json = geosGeomToJsonGeom(geom)
  t.equal(JSON.stringify(json), JSON.stringify(geojson))
  t.end()
})

test('9: Read/Write a GeoJSON Feature with a Point and no properties', (t) => {
  const geojson = JSON.parse('{"type":"Feature","geometry":{"type":"Point","coordinates":[-117.0,33.0]}}')
  const geom = jsonGeomToGeosGeom(geojson)
  t.equal(geomToWkt(geom), 'POINT (-117 33)')
  const json = geosGeomToJsonGeom(geom)
  t.equal(JSON.stringify(json), JSON.stringify(geojson.geometry))
  t.end()
})

test('10: Read/Write a GeoJSON FeatureCollection with two Feature with Points and no properties', (t) => {
  const geojson = JSON.parse('{"type":"FeatureCollection","features":[{"type":"Feature","geometry":{"type":"Point","coordinates":[-117.0,33.0]}},{"type":"Feature","geometry":{"type":"Point","coordinates":[-122.0,45.0]}}]}')
  const geom = jsonGeomToGeosGeom(geojson)
  t.equal(geomToWkt(geom), 'GEOMETRYCOLLECTION (POINT (-117 33), POINT (-122 45))')
  const json = geosGeomToJsonGeom(geom)
  t.equal(JSON.stringify(json), JSON.stringify({
    type: 'GeometryCollection',
    geometries: geojson.features.map(f => f.geometry)
  }))
  t.end()
})

test('11: Read/Write a GeoJSON empty Point', (t) => {
  const geojson = JSON.parse('{"type":"LineString","coordinates":[]}')
  const geom = jsonGeomToGeosGeom(geojson)
  t.equal(geomToWkt(geom), 'LINESTRING EMPTY')
  const json = geosGeomToJsonGeom(geom)
  t.equal(JSON.stringify(json), JSON.stringify(geojson))
  t.end()
})

test('12: Read/Write a GeoJSON empty LineString', (t) => {
  const geojson = JSON.parse('{"type":"LineString","coordinates":[]}')
  const geom = jsonGeomToGeosGeom(geojson)
  t.equal(geomToWkt(geom), 'LINESTRING EMPTY')
  const json = geosGeomToJsonGeom(geom)
  t.equal(JSON.stringify(json), JSON.stringify(geojson))
  t.end()
})

test('13: Read/Write a GeoJSON empty Polygon', (t) => {
  const geojson = JSON.parse('{"type":"Polygon","coordinates":[]}')
  const geom = jsonGeomToGeosGeom(geojson)
  t.equal(geomToWkt(geom), 'POLYGON EMPTY')
  const json = geosGeomToJsonGeom(geom)
  t.equal(JSON.stringify(json), JSON.stringify(geojson))
  t.end()
})

test('14: Read/Write a GeoJSON empty MultiPoint', (t) => {
  const geojson = JSON.parse('{"type":"MultiPoint","coordinates":[]}')
  const geom = jsonGeomToGeosGeom(geojson)
  t.equal(geomToWkt(geom), 'MULTIPOINT EMPTY')
  const json = geosGeomToJsonGeom(geom)
  t.equal(JSON.stringify(json), JSON.stringify(geojson))
  t.end()
})

test('15: Read/Write a GeoJSON empty MultiLineString', (t) => {
  const geojson = JSON.parse('{"type":"MultiLineString","coordinates":[]}')
  const geom = jsonGeomToGeosGeom(geojson)
  t.equal(geomToWkt(geom), 'MULTILINESTRING EMPTY')
  const json = geosGeomToJsonGeom(geom)
  t.equal(JSON.stringify(json), JSON.stringify(geojson))
  t.end()
})

test('16: Read/Write a GeoJSON empty MultiPolygon', (t) => {
  const geojson = JSON.parse('{"type": "MultiPolygon", "coordinates": []}')
  const geom = jsonGeomToGeosGeom(geojson)
  t.equal(geomToWkt(geom), 'MULTIPOLYGON EMPTY')
  const json = geosGeomToJsonGeom(geom)
  t.equal(JSON.stringify(json), JSON.stringify(geojson))
  t.end()
})

test('17: Read/Write an empty GeometryCollection', (t) => {
  const geojson = JSON.parse('{"type": "GeometryCollection","geometries": []}')
  const geom = jsonGeomToGeosGeom(geojson)
  t.equal(geomToWkt(geom), 'GEOMETRYCOLLECTION EMPTY')
  const json = geosGeomToJsonGeom(geom)
  t.equal(JSON.stringify(json), JSON.stringify(geojson))
  t.end()
})

// TODO: 18-30
