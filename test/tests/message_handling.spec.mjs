import test from 'tape'
import initGeosJs from '../../build/package/geos.esm.js'
const geos = await initGeosJs()

test('Test custom message handlers', async (t) => {
  const ctx = geos.GEOS_init_r()
  // define an error handler
  const errorHandler = geos.Module.addFunction((arg, bla) => {
    const message = geos.Module.UTF8ToString(arg)
    console.error('errorHandler', message)
  }, 'vii')

  geos.GEOSContext_setErrorMessageHandler_r(ctx, errorHandler)

  // provoke an error
  const reader = geos.GEOSWKTReader_create_r(ctx)
  const wkt = 'POLYGON((0 0,0 10,10 10,10 0,0 0)'
  const size = wkt.length + 1
  const wktPtr = geos.Module._malloc(size)
  geos.Module.stringToUTF8(wkt, wktPtr, size)
  const geomPtr = geos.GEOSWKTReader_read_r(ctx, reader, wktPtr)
  geos.Module._free(wktPtr)
  t.equal(geomPtr, 0, 'Line before should read: ParseException...')

  // provoke the same error with the non-r variant
  t.throws(() => geos.GEOSWKTReader_read(reader, wktPtr), 'Line before should read: ParseException: Expected word but encountered end of stream')

  // free memory
  geos.GEOSWKTReader_destroy_r(ctx, reader)
  geos.GEOSGeom_destroy_r(ctx, geomPtr)
  geos.GEOS_finish_r(ctx)

  t.end()
})
