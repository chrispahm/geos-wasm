// Import tape for testing
import test from 'tape'

// Import the geos module
import initGeosJs from '../../build/package/geos.esm.js'
const geos = await initGeosJs()

// A helper function to convert a WKT string to a GEOS geometry
const wktToGeom = (wkt) => {
  const reader = geos.GEOSWKTReader_create()
  const geomPtr = geos.GEOSWKTReader_read(reader, wkt)
  geos.GEOSWKTReader_destroy(reader)
  return geomPtr
}

// A helper function to convert a GEOS geometry to a WKT string
const geomToWkt = (geomPtr) => {
  const writer = geos.GEOSWKTWriter_create()
  // Set the output precision to 0
  geos.GEOSWKTWriter_setRoundingPrecision(writer, 0)
  const wkt = geos.GEOSWKTWriter_write(writer, geomPtr)
  geos.GEOSWKTWriter_destroy(writer)
  return wkt
}

// A helper function to free a GEOS geometry
const freeGeom = (geomPtr) => {
  geos.GEOSGeom_destroy(geomPtr)
}

// A test case for GEOSTopologyPreserveSimplify
test('GEOSTopologyPreserveSimplify', (t) => {
  // The input WKT string
  const inputWkt = 'POLYGON ((0 0, 1 0, 1 1, 0.5 0.5, 0 1, 0 0))'

  // The expected output WKT string
  const expectedOutputWkt = 'POLYGON ((0 0, 1 0, 1 1, 0 0, 0 1, 0 0))'

  // The tolerance value
  const tolerance = 0.25

  // Convert the input WKT string to a GEOS geometry
  const inputGeomPtr = wktToGeom(inputWkt)

  // Call the GEOSTopologyPreserveSimplify function with the input geometry and the tolerance value
  const outputGeomPtr = geos.GEOSTopologyPreserveSimplify(inputGeomPtr, tolerance)

  // Convert the output GEOS geometry to a WKT string
  const outputWkt = geomToWkt(outputGeomPtr)

  // Compare the output WKT string with the expected output WKT string
  t.equal(outputWkt, expectedOutputWkt)

  // Free the input and output geometries
  freeGeom(inputGeomPtr)
  freeGeom(outputGeomPtr)

  // End the test case
  t.end()
})
