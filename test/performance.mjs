import { performance } from 'perf_hooks'
import * as turf from '@turf/turf'
import { readFileSync } from 'fs'
import initGeosJs from '../src/index.mjs'
import geosBuffer from '../docs/assets/buffer.js'

const geos = await initGeosJs()

const australiaBorder = JSON.parse(readFileSync('./test/data/AUS.json'))

// Define the input geometry
const simpleGeometry = {
  type: 'Polygon',
  coordinates: [
    [
      [-77.031669, 38.878605],
      [-77.029609, 38.881946],
      [-77.020339, 38.884084],
      [-77.025661, 38.885821],
      [-77.021884, 38.889563],
      [-77.019824, 38.892368],
      [-77.022647, 38.893704],
      [-77.023297, 38.892919],
      [-77.026121, 38.893861],
      [-77.030716, 38.892998],
      [-77.035026, 38.890342],
      [-77.034926, 38.888462],
      [-77.031669, 38.878605]
    ]
  ]
}

// Define the buffer distance
const bufferDistance = 1

// Define the number of iterations to run
const runs = 100

// Define the performance test function
function runPerformanceTest (inputGeometry, numIterations, bufferSingleFeatures = false) {
  // Measure the performance of the GEOS buffer method
  const geosBufferStart = performance.now()
  for (let i = 0; i < numIterations; i++) {
    if (bufferSingleFeatures) {
      inputGeometry.features.forEach((feature) => {
        geosBuffer(feature, bufferDistance, { GEOS: geos })
      })
    } else {
      geosBuffer(inputGeometry, bufferDistance, { GEOS: geos })
    }
  }
  const geosBufferEnd = performance.now()
  const geosBufferTime = Math.round(geosBufferEnd - geosBufferStart)
  const geosTimePerIteration = geosBufferTime / numIterations

  // Measure the performance of the @turf/turf buffer method
  const turfBufferStart = performance.now()
  for (let i = 0; i < numIterations; i++) {
    if (bufferSingleFeatures) {
      inputGeometry.features.forEach((feature) => {
        turf.buffer(feature, bufferDistance)
      })
    } else {
      turf.buffer(inputGeometry, bufferDistance)
    }
  }
  const turfBufferEnd = performance.now()
  const turfBufferTime = Math.round(turfBufferEnd - turfBufferStart)
  const turfTimePerIteration = turfBufferTime / numIterations

  // Output the results
  console.log(`GEOS buffer method took ${geosBufferTime} milliseconds to run ${numIterations} times.`)
  console.log(`Average time per iteration: ${Math.round(geosTimePerIteration)} milliseconds.`)

  console.log(`@turf/turf buffer method took ${turfBufferTime} milliseconds to run ${numIterations} times.`)
  console.log(`Average time per iteration: ${Math.round(turfTimePerIteration)} milliseconds.`)

  // log which was faster including multiplication factor
  if (geosTimePerIteration < turfTimePerIteration) {
    console.log(`GEOS buffer method was ${Math.round(turfTimePerIteration / geosTimePerIteration * 100) / 100}x faster than @turf/turf buffer method.`)
  } else {
    console.log(`@turf/turf buffer method was ${Math.round(geosTimePerIteration / turfTimePerIteration * 100) / 100}x faster than GEOS buffer method.`)
  }
  // add a line break
  console.log()
}

// Run the performance test
const geometryToTest = [
  {
    name: 'Simple',
    feature: simpleGeometry
  },
  {
    name: 'Australia',
    feature: australiaBorder
  }
]
geometryToTest.forEach(obj => {
  console.log(`Testing feature ${obj.name}`)
  runPerformanceTest(obj.feature, runs)
})

// real life performance test
console.log('Real life performance test')

// we download all NUTS3 geometries from Eurostat
// and buffer them by 1km
const nuts3 = await fetch('https://ec.europa.eu/eurostat/cache/GISCO/distribution/v2/nuts/geojson/NUTS_RG_10M_2021_4326_LEVL_3.geojson').then(res => res.json())

// we try 2 tests:
// 1. buffer all geometries at once
console.log('Buffering all geometries at once')
runPerformanceTest(nuts3, 1)
// 2. buffer each geometry individually
console.log('Buffering each geometry individually')
runPerformanceTest(nuts3, 1, true)
