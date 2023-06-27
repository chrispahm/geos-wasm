import { GEOSFunctions } from "../allCFunctions.mjs";
import { geojsonToPointers, pointersToGeojson } from "../helpers/geojson.mjs";

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
  // geojsonToPointers always returns an array of pointers  
  const geomPtrs = geojsonToPointers(geojson);
  // create a buffer for each geometry
  const bufferPtrs = geomPtrs.map((geomPtr) => {
    if (isBufferWithParams) {
      return GEOSFunctions.GEOSBufferWithParams(geomPtr, bufferParamsPtr, radius);
    }
    return GEOSFunctions.GEOSBuffer(geomPtr, radius, quadrantSegments);  
  });
  // destroy the bufferParamsPtr if it exists
  if (bufferParamsPtr) {
    GEOSFunctions.GEOSBufferParams_destroy(bufferParamsPtr);
  }
  // update the original GeoJSON with the new geometry
  const bufferGeojson = pointersToGeojson(bufferPtrs, geojson);
  return bufferGeojson;
}