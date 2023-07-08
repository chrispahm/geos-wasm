import { GEOSFunctions } from "../allCFunctions.mjs";

export default function GEOSGeomToGeoJSON(geomPtr, indent = -1) {
  const writerPtr = GEOSFunctions.GEOSGeoJSONWriter_create();
  const geojsonPtr = GEOSFunctions.GEOSGeoJSONWriter_writeGeometry(writerPtr, geomPtr, indent);
  const geojson = GEOSFunctions.Module.UTF8ToString(geojsonPtr);
  GEOSFunctions.GEOSGeoJSONWriter_destroy(writerPtr);
  GEOSFunctions.GEOSFree(geojsonPtr);
  GEOSFunctions.GEOSGeom_destroy(geomPtr);
  return JSON.parse(geojson);
}