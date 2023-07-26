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

## API

Please refer to the
[API documentation](https://chrispahm.github.io/geos-wasm/).


## Development

### Prerequisites

- [Emscripten](https://emscripten.org/docs/getting_started/downloads.html)
- [Node.js](https://nodejs.org/en/download/)

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
