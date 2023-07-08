export const GEOSFunctions = {
  Module: {},
};

export function initCFunctions() {
  if (GEOSFunctions.initGEOS) return;
  const Module = GEOSFunctions.Module;
  
  Module.ccall('initGEOS', null, ['string', 'string'], ['GEOS_INIT_NOTICE=NO', 'GEOS_ENABLE_TESTS=NO']);

  GEOSFunctions.initGEOS = Module.cwrap('initGEOS', null, ['string', 'string']);
  GEOSFunctions.GEOSGeomFromWKB_buf = Module.cwrap('GEOSGeomFromWKB_buf', 'number', ['number', 'number']);
  GEOSFunctions.GEOSGeomToWKB_buf = Module.cwrap('GEOSGeomToWKB_buf', 'number', ['number', 'number']);
  GEOSFunctions.GEOSGeomToWKT = Module.cwrap('GEOSGeomToWKT', 'number', ['number']);
  GEOSFunctions.GEOSGeomFromWKT = Module.cwrap('GEOSGeomFromWKT', 'number', ['number']);
  GEOSFunctions.GEOSBuffer = Module.cwrap('GEOSBuffer', 'number', ['number', 'number', 'number']);
  GEOSFunctions.GEOSBufferWithParams = Module.cwrap('GEOSBufferWithParams', 'number', ['number', 'number', 'number']);
  GEOSFunctions.GEOSBufferParams_create = Module.cwrap('GEOSBufferParams_create', 'number', [null]);
  GEOSFunctions.GEOSBufferParams_destroy = Module.cwrap('GEOSBufferParams_create', 'number', ['number']);
  GEOSFunctions.GEOSBufferParams_setEndCapStyle = Module.cwrap('GEOSBufferParams_setEndCapStyle', null, ["number"]);
  GEOSFunctions.GEOSBufferParams_setJoinStyle = Module.cwrap('GEOSBufferParams_setJoinStyle', null, ["number"]);
  GEOSFunctions.GEOSBufferParams_setMitreLimit = Module.cwrap('GEOSBufferParams_setMitreLimit', null, ["number"]);
  GEOSFunctions.GEOSBufferParams_setQuadrantSegments = Module.cwrap('GEOSBufferParams_setQuadrantSegments', null, ["number"]);
  GEOSFunctions.GEOSBufferParams_setSingleSided = Module.cwrap('GEOSBufferParams_setSingleSided', null, ["boolean"]);
  GEOSFunctions.GEOSFree = Module.cwrap('GEOSFree', null, ['number']);
  GEOSFunctions.GEOSGeom_destroy = Module.cwrap('GEOSGeom_destroy', null, ['number']);  
}