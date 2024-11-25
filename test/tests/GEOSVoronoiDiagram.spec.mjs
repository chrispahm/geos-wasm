// Import tape for testing
import test from 'tape'

// Import the geos module
import initGeosJs from '../../build/package/geos.esm.js'
const geos = await initGeosJs()

// Define a helper function to convert a WKT string to a GEOS geometry
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

// Define a helper function to convert a GEOS geometry to a WKT string
function geomToWkt (geomPtr) {
  const writer = geos.GEOSWKTWriter_create()
  // Set the output precision to 0
  geos.GEOSWKTWriter_setRoundingPrecision(writer, 0)
  const wktPtr = geos.GEOSWKTWriter_write(writer, geomPtr)
  const wkt = geos.Module.UTF8ToString(wktPtr)
  geos.GEOSFree(wktPtr)
  geos.GEOSWKTWriter_destroy(writer)
  return wkt
}

// Define a helper function to free a GEOS geometry
function freeGeom (geomPtr) {
  geos.GEOSGeom_destroy(geomPtr)
}

// Define a test case for the GEOSVoronoiDiagram function
test('GEOSVoronoiDiagram', (t) => {
  // Create an input geometry from a WKT string
  const inputWkt = 'MULTIPOINT ((0 0), (1 0), (1 1), (0 1))'
  const inputGeom = wktToGeom(inputWkt)

  // Create an envelope geometry from a WKT string
  const envWkt = 'POLYGON ((-1 -1, 2 -1, 2 2, -1 2, -1 -1))'
  const envGeom = wktToGeom(envWkt)

  // Set the tolerance and edges parameters
  const tolerance = 0.0
  const edges = 'GEOS_VORONOI_ONLY_EDGES'

  // Call the GEOSVoronoiDiagram function and get the output geometry pointer
  const outputGeom = geos.GEOSVoronoiDiagram(inputGeom, envGeom, tolerance, edges)

  // Convert the output geometry to a WKT string
  const outputWkt = geomToWkt(outputGeom)

  // Compare the output WKT with the expected WKT
  const expectedWkt = 'GEOMETRYCOLLECTION (POLYGON ((2 2, 2 0.5, 0.5 0.5, 0.5 2, 2 2)), POLYGON ((-1 2, 0.5 2, 0.5 0.5, -1 0.5, -1 2)), POLYGON ((-1 -1, -1 0.5, 0.5 0.5, 0.5 -1, -1 -1)), POLYGON ((2 -1, 0.5 -1, 0.5 0.5, 2 0.5, 2 -1)))'

  t.equal(outputWkt, expectedWkt, 'The output WKT matches the expected WKT')

  // Free the input, envelope and output geometries
  freeGeom(inputGeom)
  freeGeom(envGeom)
  freeGeom(outputGeom)

  // End the test case
  t.end()
})
