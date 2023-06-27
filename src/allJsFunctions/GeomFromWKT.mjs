import { GEOSFunctions } from "../allCFunctions.mjs";

export default function GEOSGeomFromWKT(wkt) {
  const wktPtr = GEOSFunctions.Module._malloc(wkt.length + 1);
  GEOSFunctions.Module.stringToUTF8(wkt, wktPtr, wkt.length + 1)
  const geomPtr = GEOSFunctions.GEOSGeomFromWKT(wktPtr);
  GEOSFunctions.GEOSFree(wktPtr);
  return geomPtr;
}