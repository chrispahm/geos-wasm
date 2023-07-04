import { GEOSFunctions } from "../allCFunctions.mjs";

export default function GeosGeomToWKB(geomPtr) {
  // create a pointer that stores the GEOSGeomToWKB_buf length 
  const wkbPtrLength = GEOSFunctions.Module._malloc(4);
  // set it to 0
  GEOSFunctions.Module.setValue(wkbPtrLength, 0, 'i32');
  // get the wkbPtr and store its length in wkbPtrLength
  const wkbPtr = GEOSFunctions.GEOSGeomToWKB_buf(geomPtr, wkbPtrLength);
  // get the actual length from wkbPtrLength
  const size = GEOSFunctions.Module.getValue(wkbPtrLength, 'i32');
  // create a Uint8Array from the wkbPtr and the size
  const wkbView = new Uint8Array(
    GEOSFunctions.Module.HEAPU8.buffer,
    wkbPtr,
    size
  );    
  const wkb = new Uint8Array(wkbView);

  // free the memory
  GEOSFunctions.GEOSFree(wkbPtr);
  GEOSFunctions.GEOSFree(wkbPtrLength);
  const buffer = Buffer.from(wkb);
  return buffer;
}
