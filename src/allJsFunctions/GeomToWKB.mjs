import { GEOSFunctions } from "../allCFunctions.mjs";

export default function GeosGeomToWKB(geomPtr) {
  // create a pointer that stores the GEOSGeomToWKB_buf length 
  const wkbPtrLength = GEOSFunctions.Module._malloc(4);
  const wkbPtr = GEOSFunctions.GEOSGeomToWKB_buf(geomPtr, wkbPtrLength);
  const wkb = new Uint8Array(
    GEOSFunctions.Module.HEAPU8.buffer,
    wkbPtr,
    wkbPtrLength
  );  
  GEOSFunctions.GEOSFree(wkbPtr);
  GEOSFunctions.GEOSFree(wkbPtrLength);
  // GEOSFunctions.Module._free(wkbPtr);
  GEOSFunctions.GEOSGeom_destroy(geomPtr);
  return Buffer.from(wkb);
}
