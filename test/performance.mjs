import { performance } from 'perf_hooks';
import * as turf from '@turf/turf';
import initGeosJs from '../src/index.mjs';
const geos = await initGeosJs();
import australiaBorder from './data/aus.json' assert { type: "json" };
// Define the input geometry
const simpleGeometry = {
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
const bufferDistance = 100;

// Define the number of iterations to run
const numIterations = 5;

// Define the performance test function
function runPerformanceTest(inputGeometry) {
  // Measure the performance of the GEOS buffer method
  const geosBufferStart = performance.now();
  for (let i = 0; i < numIterations; i++) {
    geos.buffer(inputGeometry, bufferDistance);
  }
  const geosBufferEnd = performance.now();
  const geosBufferTime = Math.round(geosBufferEnd - geosBufferStart);
  const geosTimePerIteration = Math.round(geosBufferTime / numIterations);

  // Measure the performance of the @turf/turf buffer method
  const turfBufferStart = performance.now();
  for (let i = 0; i < numIterations; i++) {
    turf.buffer(inputGeometry, bufferDistance);    
  }
  const turfBufferEnd = performance.now();
  const turfBufferTime = Math.round(turfBufferEnd - turfBufferStart);
  const turfTimePerIteration = Math.round(turfBufferTime / numIterations);

  // Output the results
  console.log(`GEOS buffer method took ${geosBufferTime} milliseconds to run ${numIterations} times.`);
  console.log(`Average time per iteration: ${geosTimePerIteration} milliseconds. (lower is better)`);
  
  console.log(`@turf/turf buffer method took ${turfBufferTime} milliseconds to run ${numIterations} times.`);
  console.log(`Average time per iteration: ${turfTimePerIteration} milliseconds. (lower is better)`);
}

// Run the performance test
const geometryToTest = [
  {
    name: 'Simple',
    feature: simpleGeometry,
  },
  {
    name: 'Australia',
    feature: australiaBorder,
  }
];
geometryToTest.forEach(obj => {
  console.log(`Testing feature ${obj.name}`);
  runPerformanceTest(obj.feature);
});
