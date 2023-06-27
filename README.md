# geos-wasm

This is an experimental WebAssembly build of [GEOS](https://github.com/libgeos/geos) using [Emscripten](https://emscripten.org/). It can be used in the browser or in Node.js, bun, or deno.

GEOS is a C++ port of the [Java Topology Suite](
  https://github.com/locationtech/jts
), a library for performing operations on planar geometry.
GEOS provides many of the algorithms used by [PostGIS](http://www.postgis.net/), the [Shapely](http://www.postgis.net/) package for Python, the [sf](https://github.com/r-spatial/sf) package for R, and others.

Currently, only the `GEOSBuffer` function (including parameters), as well as a few helper functions are exposed. **You can find an interactive demo of the buffer function [here](https://chrispahm.github.io/geos-wasm/).**

## Background

*Recently*, I read Tom MacWrights thoughts/goals on a potential [geos-wasm library](https://github.com/tmcw/geos-wasm), and got convinced that trying to port GEOS to WebAssembly might be a good idea:

> - We can get the same features/bugs as GEOS, with fewer steps to the source than JSTS.
> - We can just use GEOS for a lot of stuff.
> - Maybe it'll be fast, or small? I don't really know, this is all TBD. I've tinkered with WebAssembly but don't know that much about it.

I mostly use [@turf/turf](https://turfjs.org/) for anything geo-related (and I'm happy with it!), but the points Tom makes made me curious whether having a geos-wasm port a) would be doable without too much effort, and b) would potentially even be faster than turf. 

So, as a weekend project, I tried to port the GEOS buffer function to WASM. Mostly because I need the buffer `endCapStyle` feature from time to time which I've been unsuccessfully trying to merge into turf's own buffer function [for a while now](https://github.com/Turfjs/turf/pull/1994)...

**After playing around with this a bit, I have to admit that getting this right would be a much bigger project than I anticipated!** 

Here are my findings so far, as reactions to Tom's points above:

> - We can get the same features/bugs as GEOS, with fewer steps to the source than JSTS.

The first thing I learned when working on the topic was that GEOS is the port, not JTS (which is still very actively maintained). So in general, a potential GEOS-WASM fork is not necessarily closer to the source than JSTS. But still, the main advantage is that GEOS (being a C++ library) is easier to compile to WebAssembly than Java is to JS, so I went on.

What I naïvely expected was that once you'd get GEOS to compile to WASM, you'd automatically be able to use its functions from within JS. But that's not the case. You still need to manually expose each function you'd want to use, define the parameters and return types, allocate memory and clean up after yourself. This is a lot of work and it's far too easy to mess up and produce code that is much slower than necessary when you're not skilled enough in C. Plus, it misses the original idea of having code which is close to the source Since we're writing the wrapper functions, there's now another layer that potentially introduces bugs, and most importantly, that needs to be maintained. I guess shapely and sf are good examples of how this can be done (since they have to do the same at some point), but it's still a lot of work.

> - We can just use GEOS for a lot of stuff.

That's true! However, there would need to be a good concept of how the linkage between the JS and GEOS-WASM context would look like. [This issue](https://github.com/WebAssembly/design/issues/1231#issuecomment-420466909) in the WebAssembly design repo talks about a potential implementation where WASM owns the data, and JS creates a view on it. I hope this would drastically speed up the process of passing data between JS and WASM, but I'm not sure how this would work in practice for all types of GeoJSON. I guess it's a somewhat similar issue as with having dataframes in JS that link to BLAS/Lapack functions in WASM, where just the serialization often takes longer than just processing the whole thing in JS.

> - Maybe it'll be fast, or small? I don't really know, this is all TBD. I've tinkered with WebAssembly but don't know that much about it.

I was hoping for this as well, but it's not the case, at least not with this naïve build :(. The custom WASM build containing only the GEOSBuffer function is about ~600kB + 85kB of JS (full build is ~4MB), which is more than turf including JSTS. And the buffer function is not faster than turf's, at least not in the tests I ran. I guess this is mostly due to the fact that I'm currently serialzing the GeoJSON geometry to WKT, then passing it to the WASM context, running the buffer op and then doing the same thing backwards. This is a lot of overhead, and I haven't come up with a way to avoid it. I guess the only way to make this faster would be to have a concept of a shared memory between JS and WASM, but again this would require a more skilled C/WASM dev than me.

**I still believe this could be interesting, but I guess it requires far more work than 'just' porting the library. I'll leave this repo up as a basis for discussion, but I'm not sure whether I'll continue working on it. If you read this, and you're a skilled C/WASM dev, or want to take over from here, please get in touch!**

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

### API

#### `geos.buffer(geojson, radius, options)`

Buffer a GeoJSON geometry by a given radius. The radius can be positive, negative or zero. The buffer operation always returns a polygon, even if the input geometry is a point or a line.
Uses the same API as [turf.buffer](https://turfjs.org/docs/#buffer).

##### Parameters

- `geojson` - a GeoJSON geometry object
- `radius` - the radius to buffer the geometry by, default unit is kilometers
- `options` - an object with the following optional properties:
  - `unit` - the unit to use for the buffer radius. Can be one of `kilometers`, `meters`, `miles`, `feet`, `degrees`. Defaults to `kilometers`.
  - `steps` - the number of steps to use for the buffer approximation. Defaults to `8`.
  - `endCapStyle` - the style to use for the buffer end caps. Can be `1` for round, `2` for flat or `3` square. Defaults to 1 (round).
  - `joinStyle` - the style to use for the buffer joins. Can be `1` for round, `2` for mitre or `3` bevel. Defaults to 1 (round).
  - `mitreLimit` - the mitre limit to use for the buffer joins. Defaults to `5`.
  - `singleSided` - whether to buffer only one side of the input geometry. Ignored for polygon features. Defaults to `false`.

##### Returns

A GeoJSON polygon geometry object.

##### Example

```js
const geojson = {
  "type": "Point",
  "coordinates": [
    114.18,
    22.27
  ]
};
const buffered = geos.buffer(geojson, 10, { unit: 'miles' });
```

## Development

### Prerequisites

- [Emscripten](https://emscripten.org/docs/getting_started/downloads.html)
- [Node.js](https://nodejs.org/en/download/)

### Compiling

The compiling process and overall project structure is largely copied from [gdal3](https://github.com/bugra9/gdal3.js)! Thanks for the great work!

- Clone the repository.
- Run `npm install`.
- Run `npm compile` or `make`. Run `make type=debug` for a debug version.
- Run `npm build`. Run `npm build-dev` for a debug version.

### Adding more GEOS functions

You can find an overview of all functions exported by GEOS in the `ALL_GEOS_FUNCTIONS.mk` file.

1) Add the GEOS functions you want to include in the final build to the `EXPORTED_FUNCTIONS` list in the `GEOS_EMCC_FLAGS` Makefile.
2) Delete the files `build/package/geos.js` and `build/package/geos.wasm`, then run `npm compile` or `make`.
3) In the file `src/allCFunctions.mjs`, at the end of the `initCFunctions()` function, add a `cwrap` call for each GEOS function you want to expose. The first argument is the name of the function, the second argument is the return type, the third argument is an array of argument types:
```js
GEOSFunctions.GEOS_new_function = Module.cwrap('GEOS_new_function', 'return_type', ['function_argument_type_pos_1', 'function_argument_type_pos_2']);
```
4) Create a JS wrapper function for each GEOS function you want to expose. The wrapper function should ideally live in a separate file in the `src/allJsFunctions` directory, and have the same name as the original GEOS function. Consider the `src/allJsFunctions/Buffer.mjs` file as an example.
5) Import the wrapper functions in the file `src/allJsFunctions.mjs`, and add it to the default export object.

### Testing

*Not implemented* -> ToDo!

### Contribution

Contributions are welcome! Please open an issue or submit a pull request.
If you're interested to take over the project, please contact me!