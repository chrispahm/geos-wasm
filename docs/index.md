<script setup>
import { data as geosVersion } from './index.data.js'
const changelogUrl = `https://github.com/libgeos/geos/blob/${geosVersion}/NEWS.md`
</script>

# GEOS-WASM

This is a WebAssembly build of the [GEOS](https://libgeos.org/) library (<a :href="changelogUrl" target="blank">v{{ geosVersion }}</a>). It can be used in the browser, Node.js, bun, and deno.

GEOS-WASM exposes the low-level GEOS C-API to JavaScript without any abstractions. It is intended to be used as a building block for higher-level libraries and specific use cases.

If you're looking for a simple to use geospatial analysis library in JavaScript, check out [turf.js](https://turfjs.org/)! Also keep an eye on [GeoArrow](https://github.com/kylebarron/geoarrow-rs), which brings efficient, vectorized geospatial operations to the browser.

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

Using GEOS-WASM is essentially the same as using GEOS in C. This means that you have to manage memory yourself and deal with pointers, which can be a bit tricky. You can find examples by checking the [examples](/examples/buffer) section of the documentation, as well reading through the [tests directory](https://github.com/chrispahm/geos-wasm/test/tests).

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

TLDR; Use the helper methods [geojsonToGeosGeom](./functions/geojsonToGeosGeom.html) and [geosGeomToGeojson](./functions/geosGeomToGeojson.html) or [WKB](https://libgeos.org/specifications/wkb/). See the examples ([Buffer](./examples/buffer.html) and [Maximum-Inscribed-Circle](./examples/maximum-inscribed-circle.html)) for implementation details.

Transferring data between JavaScript and WASM can be costly, especially [if serialization is involved](https://kylebarron.dev/blog/geos-wasm#serialization-is-costly). Both WKT and GeoJSON (in GEOS CAPI) are text-based formats, which means that they need to be parsed and serialized in order to transfer them. This is *very* slow and can partially be avoided by using a binary format like WKB or by using the GeoJSON helper functions. Keep in mind that WKB is not human-readable, so you might want to use WKT or GeoJSON for debugging purposes.

### How can I define a callback function (e.g. for `GEOSSTRtree_query`)?

You can define a callback function using the `Module.addFunction` method. The first argument is the function that will be called, the second argument is the return type, and the third argument is an array of argument types. The function will return a pointer to the callback function, which you can pass to the GEOS function.

```js
 const tree = geos.GEOSSTRtree_create(2)
  // Add two geometries to the index, the parameters are (index, geometry, item),
  // and only the item will be inserted into the the tree.
  // We use the geometry pointer as an item, but it doesn't have to be.
  geos.GEOSSTRtree_insert(tree, geom1, geom1)
  geos.GEOSSTRtree_insert(tree, geom2, geom2)

  // Define a callback function that will be called for each item that intersects with the query geometry
  function queryCallback (itemPtr, userdata) {
    console.log(itemPtr, userdata)    
  }

  // Create a pointer to the JS callback function
  const queryCallbackPtr = geos.Module.addFunction(queryCallback, 'vii')

  // Query the index with a geometry that intersects with the first item
  geos.GEOSSTRtree_query(tree, geom3, queryCallbackPtr)
  ```

### How can I pass an array of geometries to a GEOS function?

You can pass an array of geometries to a GEOS function by creating an `Int32Array` of geometry pointers,
and subsequently set the array on the heap. The following example shows how to pass an array of WKT strings to the `GEOSPolygonize` function.

```js
  // Convert the input geometries to GEOS geometry pointers
  // inputsWkts is an array of WKT strings
  const inputGeoms = inputWkts.map(wktToGeom)

  // Create an array of geometry pointers
  const geomPtrs = new Int32Array(inputGeoms)
  // Copy the array to the heap
  const geomVecPtr = geos.Module._malloc(geomPtrs.length * geomPtrs.BYTES_PER_ELEMENT)
  geos.Module.HEAP32.set(geomPtrs, geomVecPtr >> 2)

  // Call the GEOSPolygonize function with the input geometries
  const outputGeomPtr = geos.GEOSPolygonize(geomVecPtr, inputGeoms.length)
```