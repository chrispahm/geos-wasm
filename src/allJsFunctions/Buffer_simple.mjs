import { GEOSFunctions } from "../allCFunctions.mjs";
// import { geojsonToPointers, pointersToGeojson } from "../helpers/geojson.mjs";
import fromGeoJSON from './GeoJSONReader.mjs';
import toGeoJSON from './GeoJSONWriter.mjs';

export default function buffer(geojson, radius, options = {}) {
  const {
    quadrantSegments = 8,
    endCapStyle,
    joinStyle,
    mitreLimit,
    singleSided
  } = options;

  const isBufferWithParams = endCapStyle || joinStyle || mitreLimit || singleSided;
  let bufferParamsPtr;
  if (isBufferWithParams) {
    bufferParamsPtr = GEOSFunctions.GEOSBufferParams_create();
    if (endCapStyle) {
      GEOSFunctions.GEOSBufferParams_setEndCapStyle(bufferParamsPtr, endCapStyle);
    }
    if (joinStyle) {
      GEOSFunctions.GEOSBufferParams_setJoinStyle(bufferParamsPtr, joinStyle);
    }
    if (mitreLimit) {
      GEOSFunctions.GEOSBufferParams_setMitreLimit(bufferParamsPtr, mitreLimit);
    }
    if (quadrantSegments) {
      GEOSFunctions.GEOSBufferParams_setQuadrantSegments(bufferParamsPtr, quadrantSegments);
    }
    if (singleSided) {
      GEOSFunctions.GEOSBufferParams_setSingleSided(bufferParamsPtr, singleSided);
    }
  }
  // create a GEOS object from the GeoJSON
  const geomPtr = fromGeoJSON(geojson);
  // create a buffer
  let bufferPtr = null
  if (isBufferWithParams) {
    bufferPtr = GEOSFunctions.GEOSBufferWithParams(geomPtr, bufferParamsPtr, radius);
  } else {
    bufferPtr = GEOSFunctions.GEOSBuffer(geomPtr, radius, quadrantSegments);
  }
  // destroy the bufferParamsPtr if it exists
  if (bufferParamsPtr) {
    GEOSFunctions.GEOSBufferParams_destroy(bufferParamsPtr);
  }
  // update the original GeoJSON with the new geometry
  const bufferGeojson = toGeoJSON(bufferPtr);
  return bufferGeojson;
}