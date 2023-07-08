import { readFile, writeFile } from "fs/promises";
// import initGeosJs from '../src/index.mjs';
import initGeosJs from '../build/package/geos.esm.js';
import * as turf from '@turf/turf';

const { buffer, buffer_simple } = await initGeosJs();

// test line buffer
const lineGeomStr = await readFile('./test/data/line.geojson', 'utf8');
const lineGeom = JSON.parse(lineGeomStr);
const lineBuffer = buffer(lineGeom, 0.3, { endCapStyle: 3, singleSided: false, units: 'degrees' });
await writeFile('./test/results/lineBuffer.geojson', JSON.stringify(lineBuffer));
const lineBufferSimple = buffer_simple(lineGeom, 0.3, { endCapStyle: 3, singleSided: false });
await writeFile('./test/results/lineBufferSimple.geojson', JSON.stringify(lineBufferSimple));
const turfLineBuffer = turf.buffer(lineGeom, 0.3, { units: 'degrees' });
await writeFile('./test/results/turfLineBuffer.geojson', JSON.stringify(turfLineBuffer));