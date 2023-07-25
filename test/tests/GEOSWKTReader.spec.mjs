// Import tape for testing
import test from 'tape'

// Import the geos module
import initGeosJs from '../../build/package/geos.esm.js'
const geos = await initGeosJs()

// Create a WKT reader and writer
const reader = geos.GEOSWKTReader_create()
const writer = geos.GEOSWKTWriter_create()

// Define some test cases
const testCases = [
  {
    wkt: 'POLYGON ((0 0, 1 0, 1 1, 0 1, 0 0))',
    area: 1,
    isValid: true,
    isEmpty: false,
    isSimple: true,
    isRing: false,
    isClosed: true,
    numPoints: 5,
    numInteriorRings: 0,
    numGeometries: 1
  },
  {
    wkt: 'POLYGON EMPTY',
    area: 0,
    isValid: true,
    isEmpty: true,
    isSimple: true,
    isRing: false,
    isClosed: false,
    numPoints: 0,
    numInteriorRings: -1,
    numGeometries: 1
  },
  {
    wkt: 'LINESTRING (0 0, 1 1)',
    area: 0,
    isValid: true,
    isEmpty: false,
    isSimple: true,
    isRing: false,
    isClosed: false,
    numPoints: 2,
    numInteriorRings: -1,
    numGeometries: 1
  }
]

// Run the tests
test('GEOSWKTReader', (t) => {
  // Loop over the test cases
  for (const testCase of testCases) {
    // Convert the WKT string to a GEOS geometry pointer
    const geomPtr = geos.GEOSWKTReader_read(reader, testCase.wkt)

    // Check if the pointer is valid
    t.ok(geomPtr, `GEOSWKTReader_read should return a valid pointer for ${testCase.wkt}`)

    // Convert the GEOS geometry pointer back to a WKT string
    // Set the rounding precision to 0 digits
    geos.GEOSWKTWriter_setRoundingPrecision(writer, 0)
    const wkt = geos.GEOSWKTWriter_write(writer, geomPtr)

    // Check if the WKT string matches the original one
    t.equal(wkt, testCase.wkt, `GEOSWKTWriter_write should return the original WKT string for ${testCase.wkt}`)

    // Create a pointer for storing the area of the geometry
    const areaPtr = geos.Module._malloc(8)

    // Compute the area of the geometry and store it in the pointer
    const areaResult = geos.GEOSArea(geomPtr, areaPtr)

    // Check if the computation was successful
    t.equal(areaResult, 1, `GEOSArea should return 1 for success for ${testCase.wkt}`)

    // Read the value of the area pointer as a double
    const area = geos.Module.getValue(areaPtr, 'double')

    // Check if the area matches the expected value
    t.equal(area, testCase.area, `GEOSArea should return ${testCase.area} for ${testCase.wkt}`)

    // Free the area pointer
    geos.GEOSFree(areaPtr)
  }
  t.end()
})
