import { GEOSFunctions } from "../allCFunctions.mjs";

export default function fromGeoJSON(geojson) {
  if (typeof geojson === 'object') {
    geojson = JSON.stringify(geojson);
  } else if (typeof geojson !== 'string') {
    console.error('Invalid geojson');
    return null;
  }
  const geojsonPtr = GEOSFunctions.Module._malloc(geojson.length + 1);
  GEOSFunctions.Module.stringToUTF8(geojson, geojsonPtr, geojson.length + 1)
  const readerPtr = GEOSFunctions.GEOSGeoJSONReader_create();
  const geomPtr = GEOSFunctions.GEOSGeoJSONReader_readGeometry(readerPtr, geojsonPtr);
  GEOSFunctions.GEOSGeoJSONReader_destroy(readerPtr);
  GEOSFunctions.GEOSFree(geojsonPtr);
  return geomPtr;
}