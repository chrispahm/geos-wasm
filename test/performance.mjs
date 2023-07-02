import { performance } from 'perf_hooks';
import * as turf from '@turf/turf';
import initGeosJs from '../src/index.mjs';
const geos = await initGeosJs();

// Define the input geometry
const inputGeometry = {
  "type": "Polygon",
  "coordinates": [
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
};

// Define the buffer distance
const bufferDistance = 0.001;

// Define the number of iterations to run
const numIterations = 1000;

// Define the performance test function
function runPerformanceTest() {
  // Measure the performance of your buffer method
  const geosBufferStart = performance.now();
  for (let i = 0; i < numIterations; i++) {
    geos.buffer(inputGeometry, bufferDistance);
  }
  const geosBufferEnd = performance.now();
  const geosBufferTime = geosBufferEnd - geosBufferStart;

  // Measure the performance of the @turf/turf buffer method
  const turfBufferStart = performance.now();
  for (let i = 0; i < numIterations; i++) {
    turf.buffer(inputGeometry, bufferDistance, { units: 'degrees' });
  }
  const turfBufferEnd = performance.now();
  const turfBufferTime = turfBufferEnd - turfBufferStart;

  // Output the results
  console.log(`GEOS buffer method took ${geosBufferTime} milliseconds to run ${numIterations} times.`);
  console.log(`@turf/turf buffer method took ${turfBufferTime} milliseconds to run ${numIterations} times.`);
}

// Run the performance test
runPerformanceTest();