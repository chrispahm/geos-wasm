import { readFile, writeFile } from "fs/promises";
// import initGeosJs from '../src/index.mjs';
import initGeosJs from '../build/package/geos.esm.js';

const { buffer } = await initGeosJs();

// test line buffer
const lineGeomStr = await readFile('./test/data/line.geojson', 'utf8');
const lineGeom = JSON.parse(lineGeomStr);
const lineBuffer = buffer(lineGeom, 0.3, { endCapStyle: 3, singleSided: false});
await writeFile('./test/results/lineBuffer.geojson', JSON.stringify(lineBuffer));