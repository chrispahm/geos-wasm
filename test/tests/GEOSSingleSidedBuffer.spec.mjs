import initGeosJs from '../../build/package/geos.esm.js'

import test from 'tape'
const geos = await initGeosJs()

test('GEOSSingleSidedBuffer', function (t) {
  const reader = geos.GEOSWKTReader_create()
  const wkt = 'LINESTRING(0 0, 10 10, 20 20)'
  const geomPtr = geos.GEOSWKTReader_read(reader, wkt)

  // Create the offset geometry, using an offset of .5, with 8 segments per quadrant,
  // join style of 1 (round), a mitre limit of 5, and a single-sided buffer
  const bufferPtr = geos.GEOSSingleSidedBuffer(geomPtr, 0.5, 8, 1, 5, 1)

  const writer = geos.GEOSWKTWriter_create()
  const bufferWkt = geos.GEOSWKTWriter_write(writer, bufferPtr)

  // Test the result
  t.equal(bufferWkt, 'LINESTRING (-0.3535533905932737 0.3535533905932737, 19.6464466094067269 20.3535533905932731)')
  t.end()

  // Cleanup
  geos.GEOSWKTReader_destroy(reader)
  geos.GEOSWKTWriter_destroy(writer)
  geos.GEOSGeom_destroy(geomPtr)
  geos.GEOSGeom_destroy(bufferPtr)
})
