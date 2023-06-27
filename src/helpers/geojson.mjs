import { stringify, parse } from "wkt";
import GEOSGeomFromWKT from "../allJsFunctions/GeomFromWKT.mjs";
import GEOSGeomToWKT from "../allJsFunctions/GeomToWKT.mjs";

export function geojsonToPointers(geojson) {
  const pointers = [];
  // check if it's a feature collection
  if (geojson.type === "FeatureCollection" || geojson.type === "GeometryCollection") {
    // iterate over each feature
    geojson.features.forEach((feature) => {
      pointers.push(geometryToPointer(feature.geometry));
    });
  } else {
    // it's a single feature or geometry
    pointers.push(geometryToPointer(geojson));
  }
  return pointers;
}

export function pointersToGeojson(pointers, geojson) {
  pointers.forEach((pointer, i) => {
    if (geojson.features) {
      geojson.features[i] = pointerToFeature(pointer, geojson.features[i]);
    } else if (geojson.geometries) {
      geojson.geometries[i] = pointerToFeature(pointer, geojson.geometries[i]);
    } else {
      geojson = pointerToFeature(pointer, geojson);
    }
  });
  return geojson;
}

function geometryToPointer(geometry) {
  // convert feature to WKT
  const wkt = stringify(geometry);
  const geomPtr = GEOSGeomFromWKT(wkt);
  return geomPtr;
}

function pointerToFeature(pointer, feature) {
  // read WKT from pointer
  const wkt = GEOSGeomToWKT(pointer);
  // convert WKT to GeoJSON
  const geometry = parse(wkt);
  // update the original GeoJSON with the new geometry
  if (feature.geometry) {
    // it's a feature, we only update the geometry
    feature.geometry = geometry;
  } else {
    // it's a geometry, we update the whole object
    feature = geometry;
  }
  return feature;
}