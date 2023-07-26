// Import tape for testing
import test from 'tape'

// Import geos module
import initGeosJs from '../../build/package/geos.esm.js'
const geos = await initGeosJs()

// Test cases for GEOSOrientationIndex
test('GEOSOrientationIndex', t => {
  // Test case 1: P is to the right of AB
  let ax = 0
  let ay = 0
  let bx = 1
  let by = 0
  let px = 0.5
  let py = -0.5
  let expected = -1
  let actual = geos.GEOSOrientationIndex(ax, ay, bx, by, px, py)
  t.equal(actual, expected, 'P is to the right of AB')

  // Test case 2: P is collinear with AB
  ax = 0
  ay = 0
  bx = 1
  by = 0
  px = 0.5
  py = 0
  expected = 0
  actual = geos.GEOSOrientationIndex(ax, ay, bx, by, px, py)
  t.equal(actual, expected, 'P is collinear with AB')

  // Test case 3: P is to the left of AB
  ax = 0
  ay = 0
  bx = 1
  by = 0
  px = 0.5
  py = 0.5
  expected = 1
  actual = geos.GEOSOrientationIndex(ax, ay, bx, by, px, py)
  t.equal(actual, expected, 'P is to the left of AB')

  // End the test
  t.end()
})
