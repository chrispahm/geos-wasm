# geos-wasm

This is a WebAssembly build of [GEOS](https://github.com/libgeos/geos) using [Emscripten](https://emscripten.org/). It can be used in the browser or in Node.js, bun, or deno.

GEOS is a C/C++ port of the [Java Topology Suite](
  https://github.com/locationtech/jts
), a library for performing operations on planar geometry.
GEOS provides many of the algorithms used by [PostGIS](http://www.postgis.net/), the [Shapely](http://www.postgis.net/) package for Python, the [sf](https://github.com/r-spatial/sf) package for R, and others.

[Demo](https://chrispahm.github.io/geos-wasm/examples/buffer) • [API Documentation](https://chrispahm.github.io/geos-wasm/)

## Installation

### Browser

```html
<script type="module">
  import initGeosJs from './build/package/geos.esm.js';
  const geos = await initGeosJs();
</script>
```

### Node.js

```js
import initGeosJs from './src/index.mjs';
const geos = await initGeosJs();
```

## Example

```js
import initGeosJs from '../../build/package/geos.esm.js'
// initGeosJs returns a promise that resolves to a GEOS object
const geos = await initGeosJs()

// use the GEOS object to call GEOS functions
// Example: get the area of a polygon
// create a WKT reader
const reader = geos.GEOSWKTReader_create()
const wkt = 'POLYGON ((0 0, 1 0, 1 1, 0 1, 0 0))'
// read the WKT string into a GEOS geometry -> returns a pointer
const size = wkt.length + 1
const wktPtr = geos.Module._malloc(size)
geos.Module.stringToUTF8(wkt, wktPtr, size)
const geomPtr = geos.GEOSWKTReader_read(reader, wktPtr)
// create a pointer where the area will be written to
const areaPtr = geos.Module._malloc(8)
// calculate the area of the geometry
geos.GEOSArea(geomPtr, areaPtr)
// read the area from the pointer into a JS number
const area = geos.Module.getValue(areaPtr, 'double')

console.log(area) // area = 1

// free the WKT reader, the geometry, and the pointers
geos.GEOSWKTReader_destroy(reader)
geos.GEOSGeom_destroy(geomPtr)
geos.GEOSFree(areaPtr)
geos.Module._free(wktPtr)
```

## API

Please refer to the
[API documentation](https://chrispahm.github.io/geos-wasm/).

## Development

### Prerequisites

- [Emscripten](https://emscripten.org/docs/getting_started/downloads.html)
- [Node.js](https://nodejs.org/en/download/)
- [Doxygen](https://www.doxygen.nl/download.html)

### Compiling

The compiling process and overall project structure is largely copied from [gdal3](https://github.com/bugra9/gdal3.js)! Thanks for the great work!

- Clone the repository.
- Run `npm install`.
- Run `npm run make` or `make`. Run `make type=debug` for a debug version.

### Testing

```sh
npm test
```

### Contribution

Contributions are welcome!
Please open an issue in order to discuss contributions before submitting a pull request.
