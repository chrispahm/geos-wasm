// This test is based on the following GEOS CAPI test:
// https://github.com/libgeos/geos/blob/3.12.0/tests/unit/capi/GEOSCoordSeqTest.cpp
import test from 'tape'
import initGeosJs from '../../build/package/geos.esm.js'

const geos = await initGeosJs()

test('1: Test construction and fill of a 3D CoordinateSequence', (t) => {
  const cs_ = geos.GEOSCoordSeq_create(5, 3)

  const sizePtr = geos.Module._malloc(4)
  const dimsPtr = geos.Module._malloc(4)

  t.ok(geos.GEOSCoordSeq_getSize(cs_, sizePtr) !== 0)
  const size = geos.Module.getValue(sizePtr, 'i32')
  geos.Module._free(sizePtr)
  t.equal(size, 5)

  t.ok(geos.GEOSCoordSeq_getDimensions(cs_, dimsPtr) !== 0)
  const dims = geos.Module.getValue(dimsPtr, 'i32')
  geos.Module._free(dimsPtr)
  t.equal(dims, 3)

  for (let i = 0; i < 5; ++i) {
    const x = i * 10
    const y = i * 10 + 1
    const z = i * 10 + 2

    geos.GEOSCoordSeq_setX(cs_, i, x)
    geos.GEOSCoordSeq_setY(cs_, i, y)
    geos.GEOSCoordSeq_setZ(cs_, i, z)

    const xcheckPtr = geos.Module._malloc(8)
    const ycheckPtr = geos.Module._malloc(8)
    const zcheckPtr = geos.Module._malloc(8)

    t.ok(geos.GEOSCoordSeq_getX(cs_, i, xcheckPtr) !== 0)
    t.ok(geos.GEOSCoordSeq_getY(cs_, i, ycheckPtr) !== 0)
    t.ok(geos.GEOSCoordSeq_getZ(cs_, i, zcheckPtr) !== 0)

    const xcheck = geos.Module.getValue(xcheckPtr, 'double')
    geos.Module._free(xcheckPtr)
    const ycheck = geos.Module.getValue(ycheckPtr, 'double')
    geos.Module._free(ycheckPtr)
    const zcheck = geos.Module.getValue(zcheckPtr, 'double')
    geos.Module._free(zcheckPtr)

    t.equal(xcheck, x)
    t.equal(ycheck, y)
    t.equal(zcheck, z)
  }
  t.end()
})

test('2: Test not swapped setX/setY calls (see bug #133, fixed)', (t) => {
  const cs_ = geos.GEOSCoordSeq_create(1, 3)

  const sizePtr = geos.Module._malloc(4)
  const dimsPtr = geos.Module._malloc(4)

  t.ok(geos.GEOSCoordSeq_getSize(cs_, sizePtr) !== 0)
  const size = geos.Module.getValue(sizePtr, 'i32')
  geos.Module._free(sizePtr)
  t.equal(size, 1)

  t.ok(geos.GEOSCoordSeq_getDimensions(cs_, dimsPtr) !== 0)
  const dims = geos.Module.getValue(dimsPtr, 'i32')
  geos.Module._free(dimsPtr)
  t.equal(dims, 3)

  const x = 10
  const y = 11
  const z = 12

  // X, Y, Z
  geos.GEOSCoordSeq_setX(cs_, 0, x)
  geos.GEOSCoordSeq_setY(cs_, 0, y)
  geos.GEOSCoordSeq_setZ(cs_, 0, z)

  const xcheckPtr = geos.Module._malloc(8)
  const ycheckPtr = geos.Module._malloc(8)
  const zcheckPtr = geos.Module._malloc(8)

  t.ok(geos.GEOSCoordSeq_getY(cs_, 0, ycheckPtr) !== 0)
  t.ok(geos.GEOSCoordSeq_getX(cs_, 0, xcheckPtr) !== 0)
  t.ok(geos.GEOSCoordSeq_getZ(cs_, 0, zcheckPtr) !== 0)

  const xcheck = geos.Module.getValue(xcheckPtr, 'double')
  geos.Module._free(xcheckPtr)
  const ycheck = geos.Module.getValue(ycheckPtr, 'double')
  geos.Module._free(ycheckPtr)
  const zcheck = geos.Module.getValue(zcheckPtr, 'double')
  geos.Module._free(zcheckPtr)

  t.equal(xcheck, x)
  t.equal(ycheck, y)
  t.equal(zcheck, z)

  t.end()
})

test('3: Test not swapped setOrdinate calls (see bug #133, fixed)', (t) => {
  const cs_ = geos.GEOSCoordSeq_create(1, 3)

  const sizePtr = geos.Module._malloc(4)
  const dimsPtr = geos.Module._malloc(4)

  t.ok(geos.GEOSCoordSeq_getSize(cs_, sizePtr) !== 0)
  const size = geos.Module.getValue(sizePtr, 'i32')
  geos.Module._free(sizePtr)
  t.equal(size, 1)

  t.ok(geos.GEOSCoordSeq_getDimensions(cs_, dimsPtr) !== 0)
  const dims = geos.Module.getValue(dimsPtr, 'i32')
  geos.Module._free(dimsPtr)
  t.equal(dims, 3)

  const x = 10
  const y = 11
  const z = 12

  // X, Y, Z
  geos.GEOSCoordSeq_setOrdinate(cs_, 0, 0, x)
  geos.GEOSCoordSeq_setOrdinate(cs_, 0, 1, y)
  geos.GEOSCoordSeq_setOrdinate(cs_, 0, 2, z)

  const xcheckPtr = geos.Module._malloc(8)
  const ycheckPtr = geos.Module._malloc(8)
  const zcheckPtr = geos.Module._malloc(8)

  t.ok(geos.GEOSCoordSeq_getOrdinate(cs_, 0, 1, ycheckPtr) !== 0)
  t.ok(geos.GEOSCoordSeq_getOrdinate(cs_, 0, 0, xcheckPtr) !== 0)
  t.ok(geos.GEOSCoordSeq_getOrdinate(cs_, 0, 2, zcheckPtr) !== 0)

  const xcheck = geos.Module.getValue(xcheckPtr, 'double')
  geos.Module._free(xcheckPtr)
  const ycheck = geos.Module.getValue(ycheckPtr, 'double')
  geos.Module._free(ycheckPtr)
  const zcheck = geos.Module.getValue(zcheckPtr, 'double')
  geos.Module._free(zcheckPtr)

  t.equal(xcheck, x)
  t.equal(ycheck, y)
  t.equal(zcheck, z)

  // correct error on wrong ordinate index
  t.throws(() => {
    geos.GEOSCoordSeq_setOrdinate(cs_, 0, 37, z)
  })

  t.end()
})

test('4: Test swapped setX calls (see bug #133, fixed)', (t) => {
  const cs_ = geos.GEOSCoordSeq_create(1, 3)

  const sizePtr = geos.Module._malloc(4)
  const dimsPtr = geos.Module._malloc(4)

  t.ok(geos.GEOSCoordSeq_getSize(cs_, sizePtr) !== 0)
  const size = geos.Module.getValue(sizePtr, 'i32')
  geos.Module._free(sizePtr)
  t.equal(size, 1)

  t.ok(geos.GEOSCoordSeq_getDimensions(cs_, dimsPtr) !== 0)
  const dims = geos.Module.getValue(dimsPtr, 'i32')
  geos.Module._free(dimsPtr)
  t.equal(dims, 3)

  const x = 10
  const y = 11
  const z = 12

  // X, Y, Z
  geos.GEOSCoordSeq_setY(cs_, 0, y)
  geos.GEOSCoordSeq_setX(cs_, 0, x)
  geos.GEOSCoordSeq_setZ(cs_, 0, z)

  const xcheckPtr = geos.Module._malloc(8)
  const ycheckPtr = geos.Module._malloc(8)
  const zcheckPtr = geos.Module._malloc(8)

  t.ok(geos.GEOSCoordSeq_getY(cs_, 0, ycheckPtr) !== 0)
  t.ok(geos.GEOSCoordSeq_getX(cs_, 0, xcheckPtr) !== 0)
  t.ok(geos.GEOSCoordSeq_getZ(cs_, 0, zcheckPtr) !== 0)

  const xcheck = geos.Module.getValue(xcheckPtr, 'double')
  geos.Module._free(xcheckPtr)
  const ycheck = geos.Module.getValue(ycheckPtr, 'double')
  geos.Module._free(ycheckPtr)
  const zcheck = geos.Module.getValue(zcheckPtr, 'double')
  geos.Module._free(zcheckPtr)

  t.equal(xcheck, x)
  t.equal(ycheck, y)
  t.equal(zcheck, z)

  t.end()
})

test('5: Test swapped setOrdinate calls (see bug #133, fixed)', (t) => {
  const cs_ = geos.GEOSCoordSeq_create(1, 3)

  const sizePtr = geos.Module._malloc(4)
  const dimsPtr = geos.Module._malloc(4)

  t.ok(geos.GEOSCoordSeq_getSize(cs_, sizePtr) !== 0)
  const size = geos.Module.getValue(sizePtr, 'i32')
  geos.Module._free(sizePtr)
  t.equal(size, 1)

  t.ok(geos.GEOSCoordSeq_getDimensions(cs_, dimsPtr) !== 0)
  const dims = geos.Module.getValue(dimsPtr, 'i32')
  geos.Module._free(dimsPtr)
  t.equal(dims, 3)

  const x = 10
  const y = 11
  const z = 12

  // X, Y, Z
  geos.GEOSCoordSeq_setOrdinate(cs_, 0, 1, y)
  geos.GEOSCoordSeq_setOrdinate(cs_, 0, 0, x)
  geos.GEOSCoordSeq_setOrdinate(cs_, 0, 2, z)

  const xcheckPtr = geos.Module._malloc(8)
  const ycheckPtr = geos.Module._malloc(8)
  const zcheckPtr = geos.Module._malloc(8)

  t.ok(geos.GEOSCoordSeq_getOrdinate(cs_, 0, 1, ycheckPtr) !== 0)
  t.ok(geos.GEOSCoordSeq_getOrdinate(cs_, 0, 0, xcheckPtr) !== 0)
  t.ok(geos.GEOSCoordSeq_getOrdinate(cs_, 0, 2, zcheckPtr) !== 0)

  const xcheck = geos.Module.getValue(xcheckPtr, 'double')
  geos.Module._free(xcheckPtr)
  const ycheck = geos.Module.getValue(ycheckPtr, 'double')
  geos.Module._free(ycheckPtr)
  const zcheck = geos.Module.getValue(zcheckPtr, 'double')
  geos.Module._free(zcheckPtr)

  t.equal(xcheck, x)
  t.equal(ycheck, y)
  t.equal(zcheck, z)

  t.end()
})

test('6: Test getDimensions call (see bug #135)', (t) => {
  const cs_ = geos.GEOSCoordSeq_create(1, 2)

  const sizePtr = geos.Module._malloc(4)
  const dimsPtr = geos.Module._malloc(4)

  t.ok(geos.GEOSCoordSeq_getSize(cs_, sizePtr) !== 0)
  const size = geos.Module.getValue(sizePtr, 'i32')
  geos.Module._free(sizePtr)
  t.equal(size, 1)

  t.ok(geos.GEOSCoordSeq_getDimensions(cs_, dimsPtr) !== 0)
  const dims = geos.Module.getValue(dimsPtr, 'i32')
  geos.Module._free(dimsPtr)

  // The dimension passed to GEOSCoordSeq_create()
  // is a request for a minimum, not a strict mandate
  // for changing actual size.
  //
  t.ok(dims >= 2)

  t.end()
})

test('7: ccw orientation', (t) => {
  // ccw orientation
  const cs_ = geos.GEOSCoordSeq_create(4, 2)
  const ccwPtr = geos.Module._malloc(1)

  geos.GEOSCoordSeq_setX(cs_, 0, 0)
  geos.GEOSCoordSeq_setY(cs_, 0, 0)

  geos.GEOSCoordSeq_setX(cs_, 1, 1)
  geos.GEOSCoordSeq_setY(cs_, 1, 0)

  geos.GEOSCoordSeq_setX(cs_, 2, 1)
  geos.GEOSCoordSeq_setY(cs_, 2, 1)

  geos.GEOSCoordSeq_setX(cs_, 3, 0)
  geos.GEOSCoordSeq_setY(cs_, 3, 0)

  t.equal(geos.GEOSCoordSeq_isCCW(cs_, ccwPtr), 1)
  const ccw = geos.Module.getValue(ccwPtr, 'i8')
  geos.Module._free(ccwPtr)
  t.ok(ccw !== 0)

  t.end()
})

test('8: cw orientation', (t) => {
  // cw orientation
  const cs_ = geos.GEOSCoordSeq_create(4, 2)
  const ccwPtr = geos.Module._malloc(1)

  geos.GEOSCoordSeq_setX(cs_, 0, 0)
  geos.GEOSCoordSeq_setY(cs_, 0, 0)

  geos.GEOSCoordSeq_setX(cs_, 1, 1)
  geos.GEOSCoordSeq_setY(cs_, 1, 1)

  geos.GEOSCoordSeq_setX(cs_, 2, 1)
  geos.GEOSCoordSeq_setY(cs_, 2, 0)

  geos.GEOSCoordSeq_setX(cs_, 3, 0)
  geos.GEOSCoordSeq_setY(cs_, 3, 0)

  t.equal(geos.GEOSCoordSeq_isCCW(cs_, ccwPtr), 1)
  const ccw = geos.Module.getValue(ccwPtr, 'i8')
  geos.Module._free(ccwPtr)
  t.ok(!ccw)

  t.end()
})

test('9: no orientation', (t) => {
  // no orientation
  const cs_ = geos.GEOSCoordSeq_create(3, 2)
  const ccwPtr = geos.Module._malloc(1)

  geos.GEOSCoordSeq_setX(cs_, 0, 0)
  geos.GEOSCoordSeq_setY(cs_, 0, 0)

  geos.GEOSCoordSeq_setX(cs_, 1, 1)
  geos.GEOSCoordSeq_setY(cs_, 1, 1)

  geos.GEOSCoordSeq_setX(cs_, 2, 1)
  geos.GEOSCoordSeq_setY(cs_, 2, 0)

  t.equal(geos.GEOSCoordSeq_isCCW(cs_, ccwPtr), 1)
  const ccw = geos.Module.getValue(ccwPtr, 'i8')
  geos.Module._free(ccwPtr)
  t.ok(!ccw)

  t.end()
})

test('10: no orientation', (t) => {
  // no orientation
  const cs_ = geos.GEOSCoordSeq_create(0, 0)
  const ccwPtr = geos.Module._malloc(1)

  t.equal(geos.GEOSCoordSeq_isCCW(cs_, ccwPtr), 1)
  const ccw = geos.Module.getValue(ccwPtr, 'i8')
  geos.Module._free(ccwPtr)
  t.ok(!ccw)

  t.end()
})

test('11: ', (t) => {
  const cs_ = geos.GEOSCoordSeq_create(1, 2)

  const sizePtr = geos.Module._malloc(4)
  const dimsPtr = geos.Module._malloc(4)

  t.ok(geos.GEOSCoordSeq_getSize(cs_, sizePtr) !== 0)
  const size = geos.Module.getValue(sizePtr, 'i32')
  geos.Module._free(sizePtr)
  t.equal(size, 1, 'Seq has expected size')

  t.ok(geos.GEOSCoordSeq_getDimensions(cs_, dimsPtr) !== 0)
  const dims = geos.Module.getValue(dimsPtr, 'i32')
  geos.Module._free(dimsPtr)
  t.equal(dims, 2, 'seq has expected dim')

  const x = 10
  const y = 11

  geos.GEOSCoordSeq_setXY(cs_, 0, x, y)

  const xcheckPtr = geos.Module._malloc(8)
  const ycheckPtr = geos.Module._malloc(8)
  const zcheckPtr = geos.Module._malloc(8)
  let xcheck, ycheck, zcheck

  t.ok(geos.GEOSCoordSeq_getXY(cs_, 0, xcheckPtr, ycheckPtr) !== 0)
  xcheck = geos.Module.getValue(xcheckPtr, 'double')
  ycheck = geos.Module.getValue(ycheckPtr, 'double')

  t.equal(xcheck, x)
  t.equal(ycheck, y)

  // Calling getXYZ on a 2D seq gets you NaN for Z
  t.ok(geos.GEOSCoordSeq_getXYZ(cs_, 0, xcheckPtr, ycheckPtr, zcheckPtr) !== 0)
  xcheck = geos.Module.getValue(xcheckPtr, 'double')
  ycheck = geos.Module.getValue(ycheckPtr, 'double')
  zcheck = geos.Module.getValue(zcheckPtr, 'double')

  t.equal(xcheck, x)
  t.equal(ycheck, y)
  t.ok(isNaN(zcheck), 'z is NaN on 2D seq')

  // Calling setXYZ on a 2D seq coerces to 3D
  const z = 12
  geos.GEOSCoordSeq_setXYZ(cs_, 0, x, y, z)

  t.ok(geos.GEOSCoordSeq_getXYZ(cs_, 0, xcheckPtr, ycheckPtr, zcheckPtr) !== 0)
  xcheck = geos.Module.getValue(xcheckPtr, 'double')
  ycheck = geos.Module.getValue(ycheckPtr, 'double')
  zcheck = geos.Module.getValue(zcheckPtr, 'double')

  t.equal(xcheck, x)
  t.equal(ycheck, y)
  t.equal(zcheck, z)

  geos.Module._free(xcheckPtr)
  geos.Module._free(ycheckPtr)
  geos.Module._free(zcheckPtr)

  t.end()
})

test('12: test 2D from/to buffer', (t) => {
  const N = 10
  const dim = 2
  const values = new Float64Array(N * dim)
  for (let i = 0; i < values.length; i++) {
    values[i] = i
  }

  const valuesPtr = geos.Module._malloc(N * dim * 8)
  geos.Module.HEAPF64.set(values, valuesPtr / 8)
  const cs_ = geos.GEOSCoordSeq_copyFromBuffer(valuesPtr, N, false, false)
  geos.Module._free(valuesPtr)

  let x, y
  const xPtr = geos.Module._malloc(8)
  const yPtr = geos.Module._malloc(8)
  t.ok(geos.GEOSCoordSeq_getXY(cs_, 0, xPtr, yPtr))
  x = geos.Module.getValue(xPtr, 'double')
  y = geos.Module.getValue(yPtr, 'double')
  t.equal(x, 0.0)
  t.equal(y, 1.0)

  t.ok(geos.GEOSCoordSeq_getXY(cs_, N - 1, xPtr, yPtr))
  x = geos.Module.getValue(xPtr, 'double')
  y = geos.Module.getValue(yPtr, 'double')
  t.equal(x, (N - 1) * 2)
  t.equal(y, (N - 1) * 2 + 1)

  geos.Module._free(xPtr)
  geos.Module._free(yPtr)

  const dimOutPtr = geos.Module._malloc(4)
  t.ok(geos.GEOSCoordSeq_getDimensions(cs_, dimOutPtr))
  const dimOut = geos.Module.getValue(dimOutPtr, 'i32')
  geos.Module._free(dimOutPtr)
  t.equal(dimOut, dim)

  const out3 = new Float64Array(N * 3)
  const out3Ptr = geos.Module._malloc(N * 3 * 8)
  t.ok(geos.GEOSCoordSeq_copyToBuffer(cs_, out3Ptr, true, false))
  const view3 = new Float64Array(geos.Module.HEAPF64.buffer, out3Ptr, N * 3)
  for (let i = 0; i < out3.length; i++) {
    out3[i] = view3[i]
  }
  geos.Module._free(out3Ptr)
  t.equal(out3[0], values[0]) // X1
  t.equal(out3[1], values[1]) // Y1
  t.ok(isNaN(out3[2])) // Z1
  t.equal(out3[3], values[2]) // X2

  const out2 = new Float64Array(N * 2)
  const out2Ptr = geos.Module._malloc(N * 2 * 8)
  t.ok(geos.GEOSCoordSeq_copyToBuffer(cs_, out2Ptr, false, false))
  const view2 = new Float64Array(geos.Module.HEAPF64.buffer, out2Ptr, N * 2)
  for (let i = 0; i < out2.length; i++) {
    out2[i] = view2[i]
  }
  t.ok(JSON.stringify(out2) === JSON.stringify(values))

  t.end()
})

test('13: test 3D from/to buffer', (t) => {
  const N = 10
  const dim = 3
  const values = new Float64Array(N * dim)
  for (let i = 0; i < values.length; i++) {
    values[i] = i
  }

  const valuesPtr = geos.Module._malloc(N * dim * 8)
  geos.Module.HEAPF64.set(values, valuesPtr / 8)
  const cs_ = geos.GEOSCoordSeq_copyFromBuffer(valuesPtr, N, true, false)
  geos.Module._free(valuesPtr)

  let x, y, z
  const xPtr = geos.Module._malloc(8)
  const yPtr = geos.Module._malloc(8)
  const zPtr = geos.Module._malloc(8)
  t.ok(geos.GEOSCoordSeq_getXYZ(cs_, 0, xPtr, yPtr, zPtr))
  x = geos.Module.getValue(xPtr, 'double')
  y = geos.Module.getValue(yPtr, 'double')
  z = geos.Module.getValue(zPtr, 'double')
  t.equal(x, 0.0)
  t.equal(y, 1.0)
  t.equal(z, 2.0)

  t.ok(geos.GEOSCoordSeq_getXYZ(cs_, N - 1, xPtr, yPtr, zPtr))
  x = geos.Module.getValue(xPtr, 'double')
  y = geos.Module.getValue(yPtr, 'double')
  z = geos.Module.getValue(zPtr, 'double')
  t.equal(x, (N - 1) * 3)
  t.equal(y, (N - 1) * 3 + 1)
  t.equal(z, (N - 1) * 3 + 2)

  geos.Module._free(xPtr)
  geos.Module._free(yPtr)
  geos.Module._free(zPtr)

  const dimOutPtr = geos.Module._malloc(4)
  t.ok(geos.GEOSCoordSeq_getDimensions(cs_, dimOutPtr))
  const dimOut = geos.Module.getValue(dimOutPtr, 'i32')
  geos.Module._free(dimOutPtr)
  t.equal(dimOut, dim)

  const out3 = new Float64Array(N * 3)
  const out3Ptr = geos.Module._malloc(N * 3 * 8)
  t.ok(geos.GEOSCoordSeq_copyToBuffer(cs_, out3Ptr, true, false))
  const view3 = new Float64Array(geos.Module.HEAPF64.buffer, out3Ptr, N * 3)
  for (let i = 0; i < out3.length; i++) {
    out3[i] = view3[i]
  }
  geos.Module._free(out3Ptr)
  t.ok(JSON.stringify(out3) === JSON.stringify(values))

  // Copy to 2D buffer
  const out2 = new Float64Array(N * 2)
  const out2Ptr = geos.Module._malloc(N * 2 * 8)
  t.ok(geos.GEOSCoordSeq_copyToBuffer(cs_, out2Ptr, false, false))
  const view2 = new Float64Array(geos.Module.HEAPF64.buffer, out2Ptr, N * 2)
  for (let i = 0; i < out2.length; i++) {
    out2[i] = view2[i]
  }
  t.equal(out2[0], values[0]) // X1
  t.equal(out2[1], values[1]) // Y1
  t.equal(out2[2], values[3]) // X2
  t.equal(out2[3], values[4]) // Y2

  // Copy to XYZM buffer
  const out4 = new Float64Array(N * 4)
  const out4Ptr = geos.Module._malloc(N * 4 * 8)
  t.ok(geos.GEOSCoordSeq_copyToBuffer(cs_, out4Ptr, true, true))
  const view4 = new Float64Array(geos.Module.HEAPF64.buffer, out4Ptr, N * 4)
  for (let i = 0; i < out4.length; i++) {
    out4[i] = view4[i]
  }
  for (let i = 0, j = 0; i < out4.length; i++) {
    if (i % 4 === 3) {
      // M should be set to NaN
      t.ok(isNaN(out4[i]))
    } else {
      // XYZ should be copied in
      t.equal(out4[i], values[j++])
    }
  }

  t.end()
})

test('14: test 2D from/to arrays', (t) => {
  const N = 10
  const dim = 2
  const x = new Float64Array(N)
  const y = new Float64Array(N)
  for (let i = 0; i < N; i++) {
    x[i] = i
    y[i] = 2 * i
  }

  const xPtr = geos.Module._malloc(N * 8)
  geos.Module.HEAPF64.set(x, xPtr / 8)
  const yPtr = geos.Module._malloc(N * 8)
  geos.Module.HEAPF64.set(y, yPtr / 8)
  const cs_ = geos.GEOSCoordSeq_copyFromArrays(xPtr, yPtr, null, null, N)
  geos.Module._free(xPtr)
  geos.Module._free(yPtr)
  const dimOutPtr = geos.Module._malloc(4)
  t.ok(geos.GEOSCoordSeq_getDimensions(cs_, dimOutPtr))
  const dimOut = geos.Module.getValue(dimOutPtr, 'i32')
  t.equal(dimOut, dim)

  const cxPtr = geos.Module._malloc(8)
  const cyPtr = geos.Module._malloc(8)
  let cx, cy
  t.ok(geos.GEOSCoordSeq_getXY(cs_, 0, cxPtr, cyPtr))
  cx = geos.Module.getValue(cxPtr, 'double')
  cy = geos.Module.getValue(cyPtr, 'double')
  t.equal(cx, 0.0)
  t.equal(cy, 0.0)

  t.ok(geos.GEOSCoordSeq_getXY(cs_, 1, cxPtr, cyPtr))
  cx = geos.Module.getValue(cxPtr, 'double')
  cy = geos.Module.getValue(cyPtr, 'double')
  t.equal(cx, 1.0)
  t.equal(cy, 2.0)

  t.ok(geos.GEOSCoordSeq_getXY(cs_, 2, cxPtr, cyPtr))
  cx = geos.Module.getValue(cxPtr, 'double')
  cy = geos.Module.getValue(cyPtr, 'double')
  t.equal(cx, 2.0)
  t.equals(cy, 4.0)
  geos.Module._free(cxPtr)
  geos.Module._free(cyPtr)

  const xOut = new Float64Array(N)
  const yOut = new Float64Array(N)
  const zOut = new Float64Array(N)
  const xOutPtr = geos.Module._malloc(N * 8)
  const yOutPtr = geos.Module._malloc(N * 8)
  const zOutPtr = geos.Module._malloc(N * 8)
  t.ok(geos.GEOSCoordSeq_copyToArrays(cs_, xOutPtr, yOutPtr, null, null))
  const viewX = new Float64Array(geos.Module.HEAPF64.buffer, xOutPtr, N)
  const viewY = new Float64Array(geos.Module.HEAPF64.buffer, yOutPtr, N)
  for (let i = 0; i < N; i++) {
    xOut[i] = viewX[i]
    yOut[i] = viewY[i]
  }
  t.ok(JSON.stringify(x) === JSON.stringify(xOut))
  t.ok(JSON.stringify(y) === JSON.stringify(yOut))

  // providing z vector to 2D coordinate sequence populates it with NaN
  t.ok(geos.GEOSCoordSeq_copyToArrays(cs_, xOutPtr, yOutPtr, zOutPtr, null))
  const viewZ = new Float64Array(geos.Module.HEAPF64.buffer, zOutPtr, N)
  for (let i = 0; i < N; i++) {
    zOut[i] = viewZ[i]
  }
  for (let i = 0; i < N; i++) {
    t.ok(isNaN(zOut[i]))
  }
  geos.Module._free(xOutPtr)
  geos.Module._free(yOutPtr)
  geos.Module._free(zOutPtr)

  t.end()
})

test('15: test 3D from/to arrays', (t) => {
  const N = 10
  const dim = 3
  const x = new Float64Array(N)
  const y = new Float64Array(N)
  const z = new Float64Array(N)
  for (let i = 0; i < N; i++) {
    x[i] = i
    y[i] = 2 * i
    z[i] = 3 * i
  }

  const xPtr = geos.Module._malloc(N * 8)
  geos.Module.HEAPF64.set(x, xPtr / 8)
  const yPtr = geos.Module._malloc(N * 8)
  geos.Module.HEAPF64.set(y, yPtr / 8)
  const zPtr = geos.Module._malloc(N * 8)
  geos.Module.HEAPF64.set(z, zPtr / 8)
  const cs_ = geos.GEOSCoordSeq_copyFromArrays(xPtr, yPtr, zPtr, null, N)
  geos.Module._free(xPtr)
  geos.Module._free(yPtr)
  geos.Module._free(zPtr)
  const dimOutPtr = geos.Module._malloc(4)
  t.ok(geos.GEOSCoordSeq_getDimensions(cs_, dimOutPtr))
  const dimOut = geos.Module.getValue(dimOutPtr, 'i32')
  geos.Module._free(dimOutPtr)
  t.equal(dimOut, dim)

  const cxPtr = geos.Module._malloc(8)
  const cyPtr = geos.Module._malloc(8)
  const czPtr = geos.Module._malloc(8)
  let cx, cy, cz
  t.ok(geos.GEOSCoordSeq_getXYZ(cs_, 0, cxPtr, cyPtr, czPtr))
  cx = geos.Module.getValue(cxPtr, 'double')
  cy = geos.Module.getValue(cyPtr, 'double')
  cz = geos.Module.getValue(czPtr, 'double')
  t.equal(cx, 0.0)
  t.equal(cy, 0.0)
  t.equal(cz, 0.0)

  t.ok(geos.GEOSCoordSeq_getXYZ(cs_, 1, cxPtr, cyPtr, czPtr))
  cx = geos.Module.getValue(cxPtr, 'double')
  cy = geos.Module.getValue(cyPtr, 'double')
  cz = geos.Module.getValue(czPtr, 'double')
  t.equal(cx, 1.0)
  t.equal(cy, 2.0)
  t.equal(cz, 3.0)

  t.ok(geos.GEOSCoordSeq_getXYZ(cs_, 2, cxPtr, cyPtr, czPtr))
  cx = geos.Module.getValue(cxPtr, 'double')
  cy = geos.Module.getValue(cyPtr, 'double')
  cz = geos.Module.getValue(czPtr, 'double')
  t.equal(cx, 2.0)
  t.equal(cy, 4.0)
  t.equal(cz, 6.0)
  geos.Module._free(cxPtr)
  geos.Module._free(cyPtr)
  geos.Module._free(czPtr)

  const xOut = new Float64Array(N)
  const yOut = new Float64Array(N)
  const zOut = new Float64Array(N)
  const mOut = new Float64Array(N)
  const xOutPtr = geos.Module._malloc(N * 8)
  const yOutPtr = geos.Module._malloc(N * 8)
  const zOutPtr = geos.Module._malloc(N * 8)
  const mOutPtr = geos.Module._malloc(N * 8)
  t.ok(geos.GEOSCoordSeq_copyToArrays(cs_, xOutPtr, yOutPtr, null, null))
  let viewX = new Float64Array(geos.Module.HEAPF64.buffer, xOutPtr, N)
  let viewY = new Float64Array(geos.Module.HEAPF64.buffer, yOutPtr, N)
  for (let i = 0; i < N; i++) {
    xOut[i] = viewX[i]
    yOut[i] = viewY[i]
  }
  t.ok(JSON.stringify(x) === JSON.stringify(xOut))
  t.ok(JSON.stringify(y) === JSON.stringify(yOut))

  t.ok(geos.GEOSCoordSeq_copyToArrays(cs_, xOutPtr, yOutPtr, zOutPtr, mOutPtr))
  viewX = new Float64Array(geos.Module.HEAPF64.buffer, xOutPtr, N)
  viewY = new Float64Array(geos.Module.HEAPF64.buffer, yOutPtr, N)
  const viewZ = new Float64Array(geos.Module.HEAPF64.buffer, zOutPtr, N)
  const viewM = new Float64Array(geos.Module.HEAPF64.buffer, mOutPtr, N)
  for (let i = 0; i < N; i++) {
    xOut[i] = viewX[i]
    yOut[i] = viewY[i]
    zOut[i] = viewZ[i]
    mOut[i] = viewM[i]
  }
  t.ok(JSON.stringify(x) === JSON.stringify(xOut))
  t.ok(JSON.stringify(y) === JSON.stringify(yOut))
  t.ok(JSON.stringify(z) === JSON.stringify(zOut))
  for (let i = 0; i < N; i++) {
    t.ok(isNaN(mOut[i]))
  }
  geos.Module._free(xOutPtr)
  geos.Module._free(yOutPtr)
  geos.Module._free(zOutPtr)
  geos.Module._free(mOutPtr)

  t.end()
})

test('16: test 3DM from/to buffer', (t) => {
  const N = 10
  const dim = 3
  const values = new Float64Array(N * dim)
  for (let i = 0; i < values.length; i++) {
    values[i] = i
  }

  const valuesPtr = geos.Module._malloc(N * dim * 8)
  geos.Module.HEAPF64.set(values, valuesPtr / 8)
  const cs_ = geos.GEOSCoordSeq_copyFromBuffer(valuesPtr, N, false, true)
  geos.Module._free(valuesPtr)

  // XYM buffer produces 3D coordinate sequence
  const dimOutPtr = geos.Module._malloc(4)
  t.ok(geos.GEOSCoordSeq_getDimensions(cs_, dimOutPtr))
  const dimOut = geos.Module.getValue(dimOutPtr, 'i32')
  geos.Module._free(dimOutPtr)
  t.equal(dimOut, 3)

  // Check first coordinate
  const xPtr = geos.Module._malloc(8)
  const yPtr = geos.Module._malloc(8)
  const zPtr = geos.Module._malloc(8)
  let x, y, z
  t.ok(geos.GEOSCoordSeq_getXYZ(cs_, 0, xPtr, yPtr, zPtr))
  x = geos.Module.getValue(xPtr, 'double')
  y = geos.Module.getValue(yPtr, 'double')
  z = geos.Module.getValue(zPtr, 'double')
  t.equal(x, 0.0)
  t.equal(y, 1.0)
  t.ok(isNaN(z))

  // Check last coordinate
  t.ok(geos.GEOSCoordSeq_getXYZ(cs_, N - 1, xPtr, yPtr, zPtr))
  x = geos.Module.getValue(xPtr, 'double')
  y = geos.Module.getValue(yPtr, 'double')
  z = geos.Module.getValue(zPtr, 'double')
  t.equal(x, (N - 1) * 3)
  t.equal(y, (N - 1) * 3 + 1)
  t.ok(isNaN(z))
  geos.Module._free(xPtr)
  geos.Module._free(yPtr)
  geos.Module._free(zPtr)

  // Copy to 2D buffer
  const out2 = new Float64Array(N * 2)
  const out2Ptr = geos.Module._malloc(N * 2 * 8)
  t.ok(geos.GEOSCoordSeq_copyToBuffer(cs_, out2Ptr, false, false))
  const view2 = new Float64Array(geos.Module.HEAPF64.buffer, out2Ptr, N * 2)
  for (let i = 0; i < N * 2; i++) {
    out2[i] = view2[i]
  }
  t.equal(out2[0], values[0]) // X1
  t.equal(out2[1], values[1]) // Y1
  t.equal(out2[2], values[3]) // X2
  t.equal(out2[3], values[4]) // Y2
  geos.Module._free(out2Ptr)

  // Copy to XYM buffer
  const out3m = new Float64Array(N * 3)
  const out3mPtr = geos.Module._malloc(N * 3 * 8)
  t.ok(geos.GEOSCoordSeq_copyToBuffer(cs_, out3mPtr, false, true))
  const view3m = new Float64Array(geos.Module.HEAPF64.buffer, out3mPtr, N * 3)
  for (let i = 0; i < N * 3; i++) {
    out3m[i] = view3m[i]
  }
  for (let i = 0; i < values.length; i++) {
    t.equal(out3m[i], values[i])
  }
  geos.Module._free(out3mPtr)

  t.end()
})

test('17: test 4D from/to buffer', (t) => {
  const N = 10
  const dim = 4
  const values = new Float64Array(N * dim)
  for (let i = 0; i < values.length; i++) {
    values[i] = i
  }

  const valuesPtr = geos.Module._malloc(N * dim * 8)
  geos.Module.HEAPF64.set(values, valuesPtr / 8)
  const cs_ = geos.GEOSCoordSeq_copyFromBuffer(valuesPtr, N, true, true)
  geos.Module._free(valuesPtr)

  // XYZM buffer creates a 4D coordinate sequence
  const dimOutPtr = geos.Module._malloc(4)
  t.ok(geos.GEOSCoordSeq_getDimensions(cs_, dimOutPtr))
  const dimOut = geos.Module.getValue(dimOutPtr, 'i32')
  geos.Module._free(dimOutPtr)
  t.equal(dimOut, 4)

  // Check first coordinate
  const xPtr = geos.Module._malloc(8)
  const yPtr = geos.Module._malloc(8)
  const zPtr = geos.Module._malloc(8)
  let x, y, z
  t.ok(geos.GEOSCoordSeq_getXYZ(cs_, 0, xPtr, yPtr, zPtr))
  x = geos.Module.getValue(xPtr, 'double')
  y = geos.Module.getValue(yPtr, 'double')
  z = geos.Module.getValue(zPtr, 'double')
  t.equal(x, 0.0)
  t.equal(y, 1.0)
  t.equal(z, 2.0)

  // Check last coordinate
  t.ok(geos.GEOSCoordSeq_getXYZ(cs_, N - 1, xPtr, yPtr, zPtr))
  x = geos.Module.getValue(xPtr, 'double')
  y = geos.Module.getValue(yPtr, 'double')
  z = geos.Module.getValue(zPtr, 'double')
  t.equal(x, (N - 1) * 4)
  t.equal(y, (N - 1) * 4 + 1)
  t.equal(z, (N - 1) * 4 + 2)
  geos.Module._free(xPtr)
  geos.Module._free(yPtr)
  geos.Module._free(zPtr)

  // Copy to 4D buffer
  const out4d = new Float64Array(N * 4)
  const out4dPtr = geos.Module._malloc(N * 4 * 8)
  t.ok(geos.GEOSCoordSeq_copyToBuffer(cs_, out4dPtr, true, true))
  const view4d = new Float64Array(geos.Module.HEAPF64.buffer, out4dPtr, N * 4)
  for (let i = 0; i < N * 4; i++) {
    out4d[i] = view4d[i]
  }
  t.equal(out4d[0], values[0], 'X1')
  t.equal(out4d[1], values[1], 'Y1')
  t.equal(out4d[2], values[2], 'Z1')
  t.equal(out4d[3], values[3], 'M1')
  t.equal(out4d[4], values[4], 'X2')
  t.equal(out4d[5], values[5], 'Y2')
  t.equal(out4d[6], values[6], 'Z2')
  t.equal(out4d[7], values[7], 'M2')

  // Copy to XYZ buffer
  const out3d = new Float64Array(N * 3)
  const out3dPtr = geos.Module._malloc(N * 3 * 8)
  t.ok(geos.GEOSCoordSeq_copyToBuffer(cs_, out3dPtr, true, false))
  const view3d = new Float64Array(geos.Module.HEAPF64.buffer, out3dPtr, N * 3)
  for (let i = 0; i < N * 3; i++) {
    out3d[i] = view3d[i]
  }
  t.equal(out3d[0], values[0], 'X1')
  t.equal(out3d[1], values[1], 'Y1')
  t.equal(out3d[2], values[2], 'Z1')
  t.equal(out3d[3], values[4], 'X2')
  t.equal(out3d[4], values[5], 'Y2')
  t.equal(out3d[5], values[6], 'Z2')

  t.end()
})

test('18: test error on invalid dim', (t) => {
  t.throws(() => geos.GEOSCoordSeq_create(0, 1))
  t.throws(() => geos.GEOSCoordSeq_create(0, 5))

  t.end()
})

test('19: test 3d values stored correctly in 4D seq', (t) => {
  const cs_ = geos.GEOSCoordSeq_create(2, 4)
  geos.GEOSCoordSeq_setXYZ(cs_, 0, 1, 2, 3)
  geos.GEOSCoordSeq_setXYZ(cs_, 1, 4, 5, 6)

  const xPtr = geos.Module._malloc(8)
  const yPtr = geos.Module._malloc(8)
  const zPtr = geos.Module._malloc(8)
  let x, y, z
  geos.GEOSCoordSeq_getXYZ(cs_, 0, xPtr, yPtr, zPtr)
  x = geos.Module.getValue(xPtr, 'double')
  y = geos.Module.getValue(yPtr, 'double')
  z = geos.Module.getValue(zPtr, 'double')
  t.equal(x, 1)
  t.equal(y, 2)
  t.equal(z, 3)

  geos.GEOSCoordSeq_getXYZ(cs_, 1, xPtr, yPtr, zPtr)
  x = geos.Module.getValue(xPtr, 'double')
  y = geos.Module.getValue(yPtr, 'double')
  z = geos.Module.getValue(zPtr, 'double')
  t.equal(x, 4)
  t.equal(y, 5)
  t.equal(z, 6)
  geos.Module._free(xPtr)
  geos.Module._free(yPtr)
  geos.Module._free(zPtr)

  t.end()
})

test('20: test 3DM from/to arrays', (t) => {
  const N = 10
  const x = new Float64Array(N)
  const y = new Float64Array(N)
  const m = new Float64Array(N)
  for (let i = 0; i < N; i++) {
    x[i] = i
    y[i] = 2 * i
    m[i] = 3 * i
  }

  const xPtr = geos.Module._malloc(N * 8)
  geos.Module.HEAPF64.set(x, xPtr / 8)
  const yPtr = geos.Module._malloc(N * 8)
  geos.Module.HEAPF64.set(y, yPtr / 8)
  const mPtr = geos.Module._malloc(N * 8)
  geos.Module.HEAPF64.set(m, mPtr / 8)
  const cs_ = geos.GEOSCoordSeq_copyFromArrays(xPtr, yPtr, null, mPtr, N)
  const dimOutPtr = geos.Module._malloc(4)
  t.ok(geos.GEOSCoordSeq_getDimensions(cs_, dimOutPtr))
  const dimOut = geos.Module.getValue(dimOutPtr, 'i32')
  geos.Module._free(dimOutPtr)
  t.equal(dimOut, 3, 'XYM sequence has dimension = 3')

  const xout = new Float64Array(N)
  const yout = new Float64Array(N)
  const zout = new Float64Array(N)
  const mout = new Float64Array(N)
  const xoutPtr = geos.Module._malloc(N * 8)
  const youtPtr = geos.Module._malloc(N * 8)
  const zoutPtr = geos.Module._malloc(N * 8)
  const moutPtr = geos.Module._malloc(N * 8)
  t.ok(geos.GEOSCoordSeq_copyToArrays(cs_, xoutPtr, youtPtr, null, moutPtr))
  let viewx = new Float64Array(geos.Module.HEAPF64.buffer, xoutPtr, N)
  let viewy = new Float64Array(geos.Module.HEAPF64.buffer, youtPtr, N)
  let viewm = new Float64Array(geos.Module.HEAPF64.buffer, moutPtr, N)
  for (let i = 0; i < N; i++) {
    xout[i] = viewx[i]
    yout[i] = viewy[i]
    mout[i] = viewm[i]
  }
  t.ok(JSON.stringify(x) === JSON.stringify(xout))
  t.ok(JSON.stringify(y) === JSON.stringify(yout))
  t.ok(JSON.stringify(m) === JSON.stringify(mout))

  t.ok(geos.GEOSCoordSeq_copyToArrays(cs_, xoutPtr, youtPtr, zoutPtr, moutPtr))
  viewx = new Float64Array(geos.Module.HEAPF64.buffer, xoutPtr, N)
  viewy = new Float64Array(geos.Module.HEAPF64.buffer, youtPtr, N)
  const viewz = new Float64Array(geos.Module.HEAPF64.buffer, zoutPtr, N)
  viewm = new Float64Array(geos.Module.HEAPF64.buffer, moutPtr, N)
  for (let i = 0; i < N; i++) {
    xout[i] = viewx[i]
    yout[i] = viewy[i]
    zout[i] = viewz[i]
    mout[i] = viewm[i]
  }
  t.ok(JSON.stringify(x) === JSON.stringify(xout))
  t.ok(JSON.stringify(y) === JSON.stringify(yout))
  for (let i = 0; i < N; i++) {
    t.ok(isNaN(zout[i]))
  }
  t.ok(JSON.stringify(m) === JSON.stringify(mout))

  t.end()
})

test('21: ', (t) => {
  const handle = geos.GEOS_init_r()

  const sz = 5
  const seq1 = geos.GEOSCoordSeq_create_r(handle, sz, 3)
  for (let i = 0; i < sz; i++) {
    t.ok(geos.GEOSCoordSeq_setX_r(handle, seq1, i, i + 1.0))
    t.ok(geos.GEOSCoordSeq_setY_r(handle, seq1, i, i + 1.0))
    t.ok(geos.GEOSCoordSeq_setZ_r(handle, seq1, i, i + 1.0))
  }

  const seq2 = geos.GEOSCoordSeq_clone_r(handle, seq1)
  for (let i = 0; i < sz; i++) {
    const xPtr = geos.Module._malloc(8)
    const yPtr = geos.Module._malloc(8)
    const zPtr = geos.Module._malloc(8)
    t.ok(geos.GEOSCoordSeq_getX_r(handle, seq2, i, xPtr))
    t.ok(geos.GEOSCoordSeq_getY_r(handle, seq2, i, yPtr))
    t.ok(geos.GEOSCoordSeq_getZ_r(handle, seq2, i, zPtr))
    const x = geos.Module.getValue(xPtr, 'double')
    const y = geos.Module.getValue(yPtr, 'double')
    const z = geos.Module.getValue(zPtr, 'double')

    t.equal(x, i + 1.0)
    t.equal(y, i + 1.0)
    t.equal(z, i + 1.0)
  }

  geos.GEOSCoordSeq_destroy_r(handle, seq1)
  geos.GEOSCoordSeq_destroy_r(handle, seq2)

  geos.GEOS_finish_r(handle)

  t.end()
})
