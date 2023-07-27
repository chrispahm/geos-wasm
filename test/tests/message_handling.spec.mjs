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
  const geomPtr = geos.GEOSWKTReader_read_r(ctx, reader, wkt)
  t.equal(geomPtr, 0)
  t.end()
})
