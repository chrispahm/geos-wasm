import { GEOSFunctions } from "../allCFunctions.mjs";

export default function GEOSGeomToWKT(geomPtr) {
  const wktPtr = GEOSFunctions.GEOSGeomToWKT(geomPtr);
  const wkt = GEOSFunctions.Module.UTF8ToString(wktPtr);
  GEOSFunctions.GEOSFree(wktPtr);
  GEOSFunctions.GEOSGeom_destroy(geomPtr);
  return wkt;
}