// This test is using the following GEOS C++ API test GeoJSON examples:
// https://github.com/libgeos/geos/blob/3.12.0/tests/unit/io/GeoJSONReaderTest.cpp
import test from 'tape'
import initGeosJs from '../../build/package/geos.esm.js'
import { geojsonToGeosGeom, geosGeomToGeojson } from '../../build/package/helpers/geos.helpers.esm.js'

const geos = await initGeosJs()

// A helper function to convert a GEOS geometry pointer to a WKT string
const geomToWkt = (geomPtr) => {
  const writer = geos.GEOSWKTWriter_create()
  geos.GEOSWKTWriter_setRoundingPrecision(writer, 0)
  const wktPtr = geos.GEOSWKTWriter_write(writer, geomPtr)
  const wkt = geos.Module.UTF8ToString(wktPtr)
  geos.GEOSFree(wktPtr)
  geos.GEOSWKTWriter_destroy(writer)
  return wkt
}

test('1: Read/Write a GeoJSON Point', (t) => {
  const geojson = JSON.parse('{"type":"Point","coordinates":[-117.0,33.0]}')
  const geom = geojsonToGeosGeom(geojson, geos)
  t.equal(geomToWkt(geom), 'POINT (-117 33)')
  const json = geosGeomToGeojson(geom, geos)
  t.equal(JSON.stringify(json), JSON.stringify(geojson))
  t.end()
})

test('2: Read/Write a GeoJSON LineString', (t) => {
  const geojson = JSON.parse('{"type":"LineString","coordinates":[[102.0,0.0],[103.0,1.0],[104.0,0.0],[105.0,1.0]]}')
  const geom = geojsonToGeosGeom(geojson, geos)
  t.equal(geomToWkt(geom), 'LINESTRING (102 0, 103 1, 104 0, 105 1)')
  const json = geosGeomToGeojson(geom, geos)
  t.equal(JSON.stringify(json), JSON.stringify(geojson))
  t.end()
})

test('3: Read/Write a GeoJSON Polygon with only an outer ring', (t) => {
  const geojson = JSON.parse('{"type":"Polygon","coordinates":[[[30,10],[40,40],[20,40],[10,20],[30,10]]]}')
  const geom = geojsonToGeosGeom(geojson, geos)
  t.equal(geomToWkt(geom), 'POLYGON ((30 10, 40 40, 20 40, 10 20, 30 10))')
  const json = geosGeomToGeojson(geom, geos)
  t.equal(JSON.stringify(json), JSON.stringify(geojson))
  t.end()
})

test('4: Read/Write a GeoJSON Point with an outer ring and an inner ring', (t) => {
  const geojson = JSON.parse('{"type":"Polygon","coordinates":[[[35,10],[45,45],[15,40],[10,20],[35,10]],[[20,30],[35,35],[30,20],[20,30]]]}')
  const geom = geojsonToGeosGeom(geojson, geos)
  t.equal(geomToWkt(geom), 'POLYGON ((35 10, 45 45, 15 40, 10 20, 35 10), (20 30, 35 35, 30 20, 20 30))')
  const json = geosGeomToGeojson(geom, geos)
  t.equal(JSON.stringify(json), JSON.stringify(geojson))
  t.end()
})

test('5: Read/Write a GeoJSON MultiPoint', (t) => {
  const geojson = JSON.parse('{"type":"MultiPoint","coordinates":[[10, 40], [40, 30], [20, 20], [30, 10]]}')
  const geom = geojsonToGeosGeom(geojson, geos)
  t.equal(geomToWkt(geom), 'MULTIPOINT ((10 40), (40 30), (20 20), (30 10))')
  const json = geosGeomToGeojson(geom, geos)
  t.equal(JSON.stringify(json), JSON.stringify(geojson))
  t.end()
})

test('6: Read/Write a GeoJSON MultiLineString', (t) => {
  const geojson = JSON.parse('{"type":"MultiLineString","coordinates":[[[10, 10], [20, 20], [10, 40]],[[40, 40], [30, 30], [40, 20], [30, 10]]]}')
  const geom = geojsonToGeosGeom(geojson, geos)
  t.equal(geomToWkt(geom), 'MULTILINESTRING ((10 10, 20 20, 10 40), (40 40, 30 30, 40 20, 30 10))')
  const json = geosGeomToGeojson(geom, geos)
  t.equal(JSON.stringify(json), JSON.stringify(geojson))
  t.end()
})

test('7: Read/Write a GeoJSON MultiPolygon', (t) => {
  const geojson = JSON.parse('{"type": "MultiPolygon", "coordinates": [[[[40, 40], [20, 45], [45, 30], [40, 40]]], [[[20, 35], [10, 30], [10, 10], [30, 5], [45, 20], [20, 35]], [[30, 20], [20, 15], [20, 25], [30, 20]]]]}')
  const geom = geojsonToGeosGeom(geojson, geos)
  t.equal(geomToWkt(geom), 'MULTIPOLYGON (((40 40, 20 45, 45 30, 40 40)), ((20 35, 10 30, 10 10, 30 5, 45 20, 20 35), (30 20, 20 15, 20 25, 30 20)))')
  const json = geosGeomToGeojson(geom, geos)
  t.equal(JSON.stringify(json), JSON.stringify(geojson))
  t.end()
})

test('8: Read/Write a GeoJSON GeometryCollection', (t) => {
  const geojson = JSON.parse('{"type": "GeometryCollection","geometries": [{"type": "Point","coordinates": [40, 10]},{"type": "LineString","coordinates": [[10, 10], [20, 20], [10, 40]]},{"type": "Polygon","coordinates": [[[40, 40], [20, 45], [45, 30], [40, 40]]]}]}')
  const geom = geojsonToGeosGeom(geojson, geos)
  t.equal(geomToWkt(geom), 'GEOMETRYCOLLECTION (POINT (40 10), LINESTRING (10 10, 20 20, 10 40), POLYGON ((40 40, 20 45, 45 30, 40 40)))')
  const json = geosGeomToGeojson(geom, geos)
  t.equal(JSON.stringify(json), JSON.stringify(geojson))
  t.end()
})

test('9: Read/Write a GeoJSON Feature with a Point and no properties', (t) => {
  const geojson = JSON.parse('{"type":"Feature","geometry":{"type":"Point","coordinates":[-117.0,33.0]}}')
  const geom = geojsonToGeosGeom(geojson, geos)
  t.equal(geomToWkt(geom), 'POINT (-117 33)')
  const json = geosGeomToGeojson(geom, geos)
  t.equal(JSON.stringify(json), JSON.stringify(geojson.geometry))
  t.end()
})

test('10: Read/Write a GeoJSON FeatureCollection with two Feature with Points and no properties', (t) => {
  const geojson = JSON.parse('{"type":"FeatureCollection","features":[{"type":"Feature","geometry":{"type":"Point","coordinates":[-117.0,33.0]}},{"type":"Feature","geometry":{"type":"Point","coordinates":[-122.0,45.0]}}]}')
  const geom = geojsonToGeosGeom(geojson, geos)
  t.equal(geomToWkt(geom), 'GEOMETRYCOLLECTION (POINT (-117 33), POINT (-122 45))')
  const json = geosGeomToGeojson(geom, geos)
  t.equal(JSON.stringify(json), JSON.stringify({
    type: 'GeometryCollection',
    geometries: geojson.features.map(f => f.geometry)
  }))
  t.end()
})

test('11: Read/Write a GeoJSON empty Point', (t) => {
  const geojson = JSON.parse('{"type":"LineString","coordinates":[]}')
  const geom = geojsonToGeosGeom(geojson, geos)
  t.equal(geomToWkt(geom), 'LINESTRING EMPTY')
  const json = geosGeomToGeojson(geom, geos)
  t.equal(JSON.stringify(json), JSON.stringify(geojson))
  t.end()
})

test('12: Read/Write a GeoJSON empty LineString', (t) => {
  const geojson = JSON.parse('{"type":"LineString","coordinates":[]}')
  const geom = geojsonToGeosGeom(geojson, geos)
  t.equal(geomToWkt(geom), 'LINESTRING EMPTY')
  const json = geosGeomToGeojson(geom, geos)
  t.equal(JSON.stringify(json), JSON.stringify(geojson))
  t.end()
})

test('13: Read/Write a GeoJSON empty Polygon', (t) => {
  const geojson = JSON.parse('{"type":"Polygon","coordinates":[]}')
  const geom = geojsonToGeosGeom(geojson, geos)
  t.equal(geomToWkt(geom), 'POLYGON EMPTY')
  const json = geosGeomToGeojson(geom, geos)
  t.equal(JSON.stringify(json), JSON.stringify(geojson))
  t.end()
})

test('14: Read/Write a GeoJSON empty MultiPoint', (t) => {
  const geojson = JSON.parse('{"type":"MultiPoint","coordinates":[]}')
  const geom = geojsonToGeosGeom(geojson, geos)
  t.equal(geomToWkt(geom), 'MULTIPOINT EMPTY')
  const json = geosGeomToGeojson(geom, geos)
  t.equal(JSON.stringify(json), JSON.stringify(geojson))
  t.end()
})

test('15: Read/Write a GeoJSON empty MultiLineString', (t) => {
  const geojson = JSON.parse('{"type":"MultiLineString","coordinates":[]}')
  const geom = geojsonToGeosGeom(geojson, geos)
  t.equal(geomToWkt(geom), 'MULTILINESTRING EMPTY')
  const json = geosGeomToGeojson(geom, geos)
  t.equal(JSON.stringify(json), JSON.stringify(geojson))
  t.end()
})

test('16: Read/Write a GeoJSON empty MultiPolygon', (t) => {
  const geojson = JSON.parse('{"type": "MultiPolygon", "coordinates": []}')
  const geom = geojsonToGeosGeom(geojson, geos)
  t.equal(geomToWkt(geom), 'MULTIPOLYGON EMPTY')
  const json = geosGeomToGeojson(geom, geos)
  t.equal(JSON.stringify(json), JSON.stringify(geojson))
  t.end()
})

test('17: Read/Write an empty GeometryCollection', (t) => {
  const geojson = JSON.parse('{"type": "GeometryCollection","geometries": []}')
  const geom = geojsonToGeosGeom(geojson, geos)
  t.equal(geomToWkt(geom), 'GEOMETRYCOLLECTION EMPTY')
  const json = geosGeomToGeojson(geom, geos)
  t.equal(JSON.stringify(json), JSON.stringify(geojson))
  t.end()
})

test('18: Read/Write a GeoJSON Point with Z-Values', (t) => {
  const geojson = JSON.parse('{"type":"GeometryCollection","geometries":[{"type":"Point","coordinates":[0,3,0]},{"type":"LineString","coordinates":[[2,0],[1,0]]}]}')
  const geom = geojsonToGeosGeom(geojson, geos)
  t.equal(geomToWkt(geom), 'GEOMETRYCOLLECTION Z (POINT Z (0 3 0), LINESTRING (2 0, 1 0))')
  const json = geosGeomToGeojson(geom, geos)
  t.equal(JSON.stringify(json), JSON.stringify(geojson))
  t.end()
})

test('19: Read/Write a GeoJSON LineString with Z-Values', (t) => {
  const geojson = JSON.parse('{"type":"GeometryCollection","geometries":[{"type":"Point","coordinates":[0,3]},{"type":"LineString","coordinates":[[2,0,0],[1,0,0]]}]}')
  const geom = geojsonToGeosGeom(geojson, geos)
  t.equal(geomToWkt(geom), 'GEOMETRYCOLLECTION Z (POINT (0 3), LINESTRING Z (2 0 0, 1 0 0))')
  const json = geosGeomToGeojson(geom, geos)
  t.equal(JSON.stringify(json), JSON.stringify(geojson))
  t.end()
})

test('20: Read/Write a GeoJSON Polygon with Z-Values', (t) => {
  const geojson = JSON.parse('{"type":"Polygon","coordinates":[[[30,10,5],[40,40,5],[20,40,5],[10,20,5],[30,10,5]]]}')
  const geom = geojsonToGeosGeom(geojson, geos)
  t.equal(geomToWkt(geom), 'POLYGON Z ((30 10 5, 40 40 5, 20 40 5, 10 20 5, 30 10 5))')
  const json = geosGeomToGeojson(geom, geos)
  t.equal(JSON.stringify(json), JSON.stringify(geojson))
  t.end()
})
test('21: Read/Write a GeoJSON MultiPoint with Z-Values', (t) => {
  const geojson = JSON.parse('{"type":"MultiPoint","coordinates":[[10, 40, 5], [40, 30, 5], [20, 20, 5], [30, 10, 5]]}')
  const geom = geojsonToGeosGeom(geojson, geos)
  t.equal(geomToWkt(geom), 'MULTIPOINT Z ((10 40 5), (40 30 5), (20 20 5), (30 10 5))')
  const json = geosGeomToGeojson(geom, geos)
  t.equal(JSON.stringify(json), JSON.stringify(geojson))
  t.end()
})

test('22: Read/Write a GeoJSON MultiLineString with Z-Values', (t) => {
  const geojson = JSON.parse('{"type":"MultiLineString","coordinates":[[[10, 10, 5], [20, 20, 5], [10, 40, 5]],[[40, 40, 5], [30, 30, 5], [40, 20, 5], [30, 10, 5]]]}')
  const geom = geojsonToGeosGeom(geojson, geos)
  t.equal(geomToWkt(geom), 'MULTILINESTRING Z ((10 10 5, 20 20 5, 10 40 5), (40 40 5, 30 30 5, 40 20 5, 30 10 5))')
  const json = geosGeomToGeojson(geom, geos)
  t.equal(JSON.stringify(json), JSON.stringify(geojson))
  t.end()
})

test('23: Read/Write a GeoJSON MultiPolygon with Z-Values', (t) => {
  const geojson = JSON.parse('{"type": "MultiPolygon", "coordinates": [[[[40, 40, 5], [20, 45, 5], [45, 30, 5], [40, 40, 5]]], [[[20, 35, 5], [10, 30, 5], [10, 10, 5], [30, 5, 5], [45, 20, 5], [20, 35, 5]], [[30, 20, 5], [20, 15, 5], [20, 25, 5], [30, 20, 5]]]]}')
  const geom = geojsonToGeosGeom(geojson, geos)
  t.equal(geomToWkt(geom), 'MULTIPOLYGON Z (((40 40 5, 20 45 5, 45 30 5, 40 40 5)), ((20 35 5, 10 30 5, 10 10 5, 30 5 5, 45 20 5, 20 35 5), (30 20 5, 20 15 5, 20 25 5, 30 20 5)))')
  const json = geosGeomToGeojson(geom, geos)
  t.equal(JSON.stringify(json), JSON.stringify(geojson))
  t.end()
})

test('24: Read/Write a GeoJSON GeometryCollection with Z-Values', (t) => {
  const geojson = JSON.parse('{"type": "GeometryCollection","geometries": [{"type": "Point","coordinates": [40, 10, 5]},{"type": "LineString","coordinates": [[10, 10, 5], [20, 20, 5], [10, 40, 5]]},{"type": "Polygon","coordinates": [[[40, 40, 5], [20, 45, 5], [45, 30, 5], [40, 40, 5]]]}]}')
  const geom = geojsonToGeosGeom(geojson, geos)
  t.equal(geomToWkt(geom), 'GEOMETRYCOLLECTION Z (POINT Z (40 10 5), LINESTRING Z (10 10 5, 20 20 5, 10 40 5), POLYGON Z ((40 40 5, 20 45 5, 45 30 5, 40 40 5)))')
  const json = geosGeomToGeojson(geom, geos)
  t.equal(JSON.stringify(json), JSON.stringify(geojson))
  t.end()
})
