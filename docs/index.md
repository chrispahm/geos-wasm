# GEOS-WASM

This is a WebAssembly build of the [GEOS](https://libgeos.org/) library. It can be used in the browser, Node.js, bun, and deno.

GEOS-WASM exposes the low-level GEOS C-API to JavaScript without any abstractions. It is intended to be used as a building block for higher-level libraries and specific use cases.

If you're looking for a simple to use geospatial analysis library in JavaScript, check out [turf.js](https://turfjs.org/)! Also keep an eye on [GeoArrow](https://github.com/kylebarron/geoarrow-rs), which brings efficient, vectorized geospatial operations in the browser.

## Installation

If you're using Node.js, you can install GEOS-WASM with npm/pnpm/yarn:

```
npm install geos-wasm
```

in a browser, you can use a CDN like [Skypack](https://www.skypack.dev/view/geos-wasm):

```html
<script type="module">
  import initGeosJs from 'https://cdn.skypack.dev/geos-wasm';
</script>
```

## Usage

This library exposes a single function `initGeosJs` that returns a promise that resolves to a GEOS object. The GEOS object contains all the GEOS functions as properties. The GEOS object is a wrapper around the [GEOS C-API](https://libgeos.org/doxygen/geos__c_8h.html).

Using GEOS-WASM is essentially the same as using GEOS in C. This means that you have to manage memory yourself and deal with pointers, which can be a bit tricky. You can find examples by checking the [examples](/examples) section of the documentation, as well reading through the [tests directory](https://github.com/chrispahm/geos-wasm/test/tests).

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
const geomPtr = geos.GEOSWKTReader_read(reader, wkt)
// create a pointer where the area will be written to
const areaPtr = geos.Module._malloc(8)
// calculate the area of the geometry
geos.GEOSArea(geomPtr, areaPtr)
// read the area from the pointer into a JS number
const area = geos.Module.getValue(areaPtr, 'double')

console.log(area) // area = 1

// free the WKT reader, the geometry, and the pointer
geos.GEOSWKTReader_destroy(reader)
geos.GEOSGeom_destroy(geomPtr)
geos.GEOSFree(areaPtr)
```

## FAQ

### What is the preferred way to pass Geometries between JavaScript and GEOS-WASM?

TLDR; Use [WKB](https://libgeos.org/specifications/wkb/). See [the examples](https://chrispahm.github.io/geos-wasm/examples/) for imlementation details.

Transferring data between JavaScript and WASM can be costly, especially [if serialization is involved](https://kylebarron.dev/blog/geos-wasm#serialization-is-costly). Both WKT and GeoJSON are text-based formats, which means that they need to be parsed and serialized in order to transfer them. This is *very* slow and can partially be avoided by using a binary format like WKB. Keep in mind that WKB is not human-readable, so you might want to use WKT or GeoJSON for debugging purposes.

### How to deal with `RuntimeError: table index is out of bounds`

This error is usually thrown when GEOS throws an error in an operation. E.g. when passing an [EWKT](https://en.wikipedia.org/wiki/Well-known_text_representation_of_geometry#Format_variations) to `GEOSGeomFromWKT`, which solely supports regular WKT input. Refer to the stack trace to identify the function that threw the error, and check if a) the input is valid and b) the function arguments are of the correct type. Also make sure to check the [test directory](https://github.com/chrispahm/geos-wasm/test/tests) for examples.
