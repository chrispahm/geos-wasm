import { readFile } from 'fs/promises'
import { parseTable } from 'arrow-js-ffi'
import initGeosJs from '../build/package/geos.esm.js'
import { readParquet, wasmMemory } from 'parquet-wasm'

const geos = await initGeosJs()

console.time('parquet-wasm time to read parquet file')
const WASM_MEMORY = wasmMemory()
const parquetBuffer = await readFile('test/data/Utah.parquet')
const parquetBytes = new Uint8Array(parquetBuffer)
const arrowWasmTable = readParquet(parquetBytes) // { batchSize: 2000000 }
const ffiTable = arrowWasmTable.intoFFI()
const arrowTable = parseTable(
  WASM_MEMORY.buffer,
  ffiTable.arrayAddrs(),
  ffiTable.schemaAddr()
)
console.timeEnd('parquet-wasm time to read parquet file')

const geometryColumn = arrowTable.getChildAt(0)

console.time('Parsing WKB - Batch')
geometryColumn.data.forEach((chunk, i) => {
  const values = chunk.values
  const valueOffsets = chunk.valueOffsets

  const valuesptr = geos.Module._malloc(
    values.length * values.BYTES_PER_ELEMENT
  )
  geos.Module.HEAPU8.set(values, valuesptr)

  const offsetsptr = geos.Module._malloc(
    valueOffsets.length * valueOffsets.BYTES_PER_ELEMENT
  )
  geos.Module.HEAP32.set(valueOffsets, offsetsptr >> 2)

  const res = geos.GEOSWKBReader_readBatch(valuesptr, offsetsptr, valueOffsets.length - 1)
  // res is a pointer to a list of pointers to geometries -> typed array of pointers
  // const geoms = new Uint32Array(
  //   geos.Module.HEAP32.buffer,
  //   res,
  //   valueOffsets.length - 1
  // )
  // console.log(geoms.length)

  // Array.from(geoms).forEach(geomPtr => {
  //   // free the memory for the geometry
  //   // geos.GEOSGeom_destroy(geomPtr)
  // })
  geos.Module._free(valuesptr)
  geos.Module._free(offsetsptr)
  geos.Module._free(res)
})
console.timeEnd('Parsing WKB - Batch')

console.time('Parsing WKB - Single')
const wkbReader = geos.GEOSWKBReader_create()
geometryColumn.data.forEach((chunk, i) => {
  const values = chunk.values
  const valueOffsets = chunk.valueOffsets
  const valuesptr = geos.Module._malloc(
    values.length * values.BYTES_PER_ELEMENT
  )
  geos.Module.HEAPU8.set(values, valuesptr)

  for (let i = 0; i < valueOffsets.length - 1; i++) {
    // Get the pointer and size of the current feature
    const featureptr = valuesptr + valueOffsets[i]
    const featuresize = valueOffsets[i + 1] - valueOffsets[i]
    // Read the feature from the buffer
    geos.GEOSWKBReader_read(wkbReader, featureptr, featuresize)
  }
  geos.Module._free(valuesptr)
})
geos.GEOSWKBReader_destroy(wkbReader)
console.timeEnd('Parsing WKB - Single')
