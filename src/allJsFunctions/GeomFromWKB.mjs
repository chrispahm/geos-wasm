import { GEOSFunctions } from "../allCFunctions.mjs";

export default function GEOSGeomFromWKB(wkb) {
  const wkbPtr = GEOSFunctions.Module._malloc(wkb.length);
  GEOSFunctions.Module.HEAPU8.set(wkb, wkbPtr);
  const geomPtr = GEOSFunctions.GEOSGeomFromWKB_buf(wkbPtr, wkb.length);
  GEOSFunctions.GEOSFree(wkbPtr);
  // GEOSFunctions.Module._free(wkbPtr);
  return geomPtr;
}