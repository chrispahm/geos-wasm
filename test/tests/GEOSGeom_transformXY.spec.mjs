// Import the geos module
import initGeosJs from '../../build/package/geos.esm.js'

// Import tape for testing
import test from 'tape'
const geos = await initGeosJs()

// Create a helper function to convert a WKT string to a GEOS geometry
function wktToGeom (wkt) {
  const reader = geos.GEOSWKTReader_create()
  const size = wkt.length + 1
  const wktPtr = geos.Module._malloc(size)
  geos.Module.stringToUTF8(wkt, wktPtr, size)
  const geomPtr = geos.GEOSWKTReader_read(reader, wktPtr)
  geos.Module._free(wktPtr)
  geos.GEOSWKTReader_destroy(reader)
  return geomPtr
}

// Create a helper function to convert a GEOS geometry to a WKT string
function geomToWkt (geomPtr) {
  const writer = geos.GEOSWKTWriter_create()
  // Setzen Sie die Ausgabepräzision auf 0
  geos.GEOSWKTWriter_setRoundingPrecision(writer, 0)
  const wktPtr = geos.GEOSWKTWriter_write(writer, geomPtr)
  const wkt = geos.Module.UTF8ToString(wktPtr)
  geos.GEOSFree(wktPtr)
  geos.GEOSWKTWriter_destroy(writer)
  return wkt
}

// Create a few geometries for testing purposes, wkt3 intersects with wkt1
const wkt1 = 'POLYGON ((0 0, 1 0, 1 1, 0 1, 0 0))'
const geom1 = wktToGeom(wkt1)

// Create a test case for GEOSSTRtree
test('GEOSGeom_transformXY test', function (t) {
  // Create a callback function that takes 3 arguments -> x and y coordinate values to be updated and a void userdata pointer
  function udf (coords) {
    // simple to use interface for the user
    // 1. receive an array of coordinates
    // 2. transform them
    // 3. return an array of coordinates
    return coords.map(coord => 42)
  }

  function _transformXYZ (xPtr, yPtr, zPtr) {
    const [x, y, z] = udf([
      geos.Module.getValue(xPtr, 'double'),
      geos.Module.getValue(yPtr, 'double'),
      geos.Module.getValue(zPtr, 'double')
    ])
    // Update the coordinates
    geos.Module.setValue(xPtr, x, 'double')
    geos.Module.setValue(yPtr, y, 'double')
    if (zPtr) {
      geos.Module.setValue(zPtr, z, 'double')
    }
    return 1
  }
  // Add the callback function to the C table
  const transformCallbackPtr = geos.Module.addFunction(_transformXYZ, 'iiii')
  // When the GEOSGeom_transformXYZ function will be released in GEOS 3.14, we can
  // use the same callback function, but need to update the function signature to
  // accept 3 arguments instead of 2.
  // const transformCallbackPtrXYZ = geos.Module.addFunction(_transformXYZ, 'iiiii')

  // Transform the geometry
  const updatedGeom1 = geos.GEOSGeom_transformXY(geom1, transformCallbackPtr)

  // Convert the transformed geometry to a WKT string
  const wkt = geomToWkt(updatedGeom1)
  t.ok(wkt === 'POLYGON ((42 42, 42 42, 42 42, 42 42, 42 42))', 'transformed geometry is expected')

  t.end()
})
