// Import tape for testing
import tape from 'tape'

// Import the geos module
import initGeosJs from '../../build/package/geos.esm.js'
const geos = await initGeosJs()

// Define a helper function to convert a WKT string to a GEOS geometry
const wktToGeom = (wkt) => {
  const reader = geos.GEOSWKTReader_create()
  const geomPtr = geos.GEOSWKTReader_read(reader, wkt)
  geos.GEOSWKTReader_destroy(reader)
  return geomPtr
}

// Define a helper function to convert a GEOS geometry to a WKT string
const geomToWkt = (geomPtr) => {
  const writer = geos.GEOSWKTWriter_create()
  geos.GEOSWKTWriter_setRoundingPrecision(writer, 0)
  const wkt = geos.GEOSWKTWriter_write(writer, geomPtr)
  geos.GEOSWKTWriter_destroy(writer)
  return wkt
}

// Define a test case for the GEOSGetGeometryN function
tape('GEOSGetGeometryN', (t) => {
  // Create a multipolygon geometry from a WKT string
  const multipolygon = wktToGeom(
    'MULTIPOLYGON (((0 0, 1 0, 1 1, 0 1, 0 0)), ((1 1, 2 1, 2 2, 1 2, 1 1)))'
  )

  // Get the number of geometries in the multipolygon
  const numGeometries = geos.GEOSGetNumGeometries(multipolygon)

  // Assert that the number of geometries is equal to 2
  t.equal(numGeometries, 2, 'The multipolygon has two geometries')

  // Loop over the geometries and check their WKT representation
  for (let i = 0; i < numGeometries; i++) {
    // Get the ith geometry from the multipolygon
    const geometry = geos.GEOSGetGeometryN(multipolygon, i)

    // Convert the geometry to a WKT string
    const wkt = geomToWkt(geometry)

    // Assert that the WKT string matches the expected value
    t.equal(
      wkt,
      `POLYGON ((${i} ${i}, ${i + 1} ${i}, ${i + 1} ${i + 1}, ${i} ${i + 1}, ${i} ${i}))`,
      `The geometry at index ${i} has the correct WKT representation`
    )
  }

  // Destroy the multipolygon geometry
  geos.GEOSGeom_destroy(multipolygon)

  // End the test case
  t.end()
})
