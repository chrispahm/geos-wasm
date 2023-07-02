import buffer from './allJsFunctions/Buffer_simple.mjs';
// import buffer from './allJsFunctions/Buffer.mjs';
import geomToWKT from './allJsFunctions/GeomToWKT.mjs';
import geomFromWKT from './allJsFunctions/GeomFromWKT.mjs';
import fromGeoJSON from './allJsFunctions/GeoJSONReader.mjs';
import toGeoJSON from './allJsFunctions/GeoJSONWriter.mjs';

export default {
  buffer,
  geomToWKT,
  geomFromWKT,
  fromGeoJSON,
  toGeoJSON,
};