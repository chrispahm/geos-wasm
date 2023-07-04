const GEOSFunctions = {
  Module: {},
};

function initCFunctions() {
  if (GEOSFunctions.initGEOS) return;
  const Module = GEOSFunctions.Module;
  
  Module.ccall('initGEOS', null, ['string', 'string'], ['GEOS_INIT_NOTICE=NO', 'GEOS_ENABLE_TESTS=NO']);

  GEOSFunctions.initGEOS = Module.cwrap('initGEOS', null, ['string', 'string']);
  GEOSFunctions.GEOSGeomFromWKB_buf = Module.cwrap('GEOSGeomFromWKB_buf', 'number', ['number', 'number']);
  GEOSFunctions.GEOSGeomToWKB_buf = Module.cwrap('GEOSGeomToWKB_buf', 'number', ['number', 'number']);
  GEOSFunctions.GEOSGeomToWKT = Module.cwrap('GEOSGeomToWKT', 'number', ['number']);
  GEOSFunctions.GEOSGeomFromWKT = Module.cwrap('GEOSGeomFromWKT', 'number', ['number']);
  GEOSFunctions.GEOSBuffer = Module.cwrap('GEOSBuffer', 'number', ['number', 'number', 'number']);
  GEOSFunctions.GEOSBufferWithParams = Module.cwrap('GEOSBufferWithParams', 'number', ['number', 'number', 'number']);
  GEOSFunctions.GEOSBufferParams_create = Module.cwrap('GEOSBufferParams_create', 'number', [null]);
  GEOSFunctions.GEOSBufferParams_destroy = Module.cwrap('GEOSBufferParams_create', 'number', ['number']);
  GEOSFunctions.GEOSBufferParams_setEndCapStyle = Module.cwrap('GEOSBufferParams_setEndCapStyle', null, ["number"]);
  GEOSFunctions.GEOSBufferParams_setJoinStyle = Module.cwrap('GEOSBufferParams_setJoinStyle', null, ["number"]);
  GEOSFunctions.GEOSBufferParams_setMitreLimit = Module.cwrap('GEOSBufferParams_setMitreLimit', null, ["number"]);
  GEOSFunctions.GEOSBufferParams_setQuadrantSegments = Module.cwrap('GEOSBufferParams_setQuadrantSegments', null, ["number"]);
  GEOSFunctions.GEOSBufferParams_setSingleSided = Module.cwrap('GEOSBufferParams_setSingleSided', null, ["boolean"]);
  GEOSFunctions.GEOSFree = Module.cwrap('GEOSFree', null, ['number']);
  GEOSFunctions.GEOSGeom_destroy = Module.cwrap('GEOSGeom_destroy', null, ['number']);  
}

function getAugmentedNamespace(n) {
  if (n.__esModule) return n;
  var f = n.default;
	if (typeof f == "function") {
		var a = function a () {
			if (this instanceof a) {
				var args = [null];
				args.push.apply(args, arguments);
				var Ctor = Function.bind.apply(f, args);
				return new Ctor();
			}
			return f.apply(this, arguments);
		};
		a.prototype = f.prototype;
  } else a = {};
  Object.defineProperty(a, '__esModule', {value: true});
	Object.keys(n).forEach(function (k) {
		var d = Object.getOwnPropertyDescriptor(n, k);
		Object.defineProperty(a, k, d.get ? d : {
			enumerable: true,
			get: function () {
				return n[k];
			}
		});
	});
	return a;
}

let numberRegexp = /[-+]?([0-9]*\.[0-9]+|[0-9]+)([eE][-+]?[0-9]+)?/;
// Matches sequences like '100 100' or '100 100 100'.
let coordFormat = new RegExp('^' + numberRegexp.source + '(\\s' + numberRegexp.source + '){1,}');

/**
 * Parse WKT and return GeoJSON.
 * @param wkt
 * @return {?Object} A GeoJSON geometry object
 */
const parse = (wkt)=> {
  let parts = wkt.split(';');
  let _ = parts.pop();
  let srid = (parts.shift() || '').split('=').pop();

  let i = 0;

  function $ (re) {
    let match = _.substring(i).match(re);
    if (!match) return null;
    else {
      i += match[0].length;
      return match[0];
    }
  }

  function crs (obj) {
    if (obj && srid.match(/\d+/)) {
      obj.crs = {
        type: 'name',
        properties: {
          name: 'urn:ogc:def:crs:EPSG::' + srid
        }
      };
    }

    return obj;
  }

  function white () { $(/^\s*/); }

  function multicoords () {
    white();
    let depth = 0;
    let rings = [];
    let stack = [rings];
    let pointer = rings;
    let elem;

    while (elem =
      $(/^(\()/) ||
      $(/^(\))/) ||
      $(/^(,)/) ||
      $(coordFormat)) {
      if (elem === '(') {
        stack.push(pointer);
        pointer = [];
        stack[stack.length - 1].push(pointer);
        depth++;
      } else if (elem === ')') {
        // For the case: Polygon(), ...
        if (pointer.length === 0) return null;

        pointer = stack.pop();
        // the stack was empty, input was malformed
        if (!pointer) return null;
        depth--;
        if (depth === 0) break;
      } else if (elem === ',') {
        pointer = [];
        stack[stack.length - 1].push(pointer);
      } else if (!elem.split(/\s/g).some(isNaN)) {
        Array.prototype.push.apply(pointer, elem.split(/\s/g).map(parseFloat));
      } else {
        return null;
      }
      white();
    }

    if (depth !== 0) return null;

    return rings;
  }

  function coords () {
    let list = [];
    let item;
    let pt;
    while (pt =
      $(coordFormat) ||
      $(/^(,)/)) {
      if (pt === ',') {
        list.push(item);
        item = [];
      } else if (!pt.split(/\s/g).some(isNaN)) {
        if (!item) item = [];
        Array.prototype.push.apply(item, pt.split(/\s/g).map(parseFloat));
      }
      white();
    }

    if (item) list.push(item);
    else return null;

    return list.length ? list : null;
  }

  function point () {
    if (!$(/^(point(\sz)?)/i)) return null;
    white();
    if (!$(/^(\()/)) return null;
    let c = coords();
    if (!c) return null;
    white();
    if (!$(/^(\))/)) return null;
    return {
      type: 'Point',
      coordinates: c[0]
    };
  }

  function multipoint () {
    if (!$(/^(multipoint(\sz)?)/i)) return null;
    white();
    let newCoordsFormat = _
      .substring(_.indexOf('(') + 1, _.length - 1)
      .replace(/\(/g, '')
      .replace(/\)/g, '');
    _ = 'MULTIPOINT (' + newCoordsFormat + ')';
    let c = multicoords();
    if (!c) return null;
    white();
    return {
      type: 'MultiPoint',
      coordinates: c
    };
  }

  function multilinestring () {
    if (!$(/^(multilinestring(\sz)?)/i)) return null;
    white();
    let c = multicoords();
    if (!c) return null;
    white();
    return {
      type: 'MultiLineString',
      coordinates: c
    };
  }

  function linestring () {
    if (!$(/^(linestring(\sz)?)/i)) return null;
    white();
    if (!$(/^(\()/)) return null;
    let c = coords();
    if (!c) return null;
    if (!$(/^(\))/)) return null;
    return {
      type: 'LineString',
      coordinates: c
    };
  }

  function polygon () {
    if (!$(/^(polygon(\sz)?)/i)) return null;
    white();
    let c = multicoords();
    if (!c) return null;
    return {
      type: 'Polygon',
      coordinates: c
    };
  }

  function multipolygon () {
    if (!$(/^(multipolygon(\sz)?)/i)) return null;
    white();
    let c = multicoords();
    if (!c) return null;
    return {
      type: 'MultiPolygon',
      coordinates: c
    };
  }

  function geometrycollection () {
    let geometries = [];
    let geometry;

    if (!$(/^(geometrycollection)/i)) return null;
    white();

    if (!$(/^(\()/)) return null;
    while (geometry = root()) {
      geometries.push(geometry);
      white();
      $(/^(,)/);
      white();
    }
    if (!$(/^(\))/)) return null;

    return {
      type: 'GeometryCollection',
      geometries: geometries
    };
  }

  function root () {
    return point() ||
      linestring() ||
      polygon() ||
      multipoint() ||
      multilinestring() ||
      multipolygon() ||
      geometrycollection();
  }

  return crs(root());
};

/**
 * Stringifies a GeoJSON object into WKT
 */
const stringify = (geoJSON)=> {
  if (geoJSON.type === 'Feature') {
    geoJSON = geoJSON.geometry;
  }

  function pairWKT (c) {
    return c.join(' ');
  }

  function ringWKT (r) {
    return r.map(pairWKT).join(', ');
  }

  function ringsWKT (r) {
    return r.map(ringWKT).map(wrapParens).join(', ');
  }

  function multiRingsWKT (r) {
    return r.map(ringsWKT).map(wrapParens).join(', ');
  }

  function wrapParens (s) { return '(' + s + ')'; }

  let gJ = geoJSON;
  switch (gJ.type) {
    case 'Point':
      if(gJ.coordinates && gJ.coordinates.length === 3)
        return 'POINT Z (' + pairWKT(gJ.coordinates) + ')';
      else return 'POINT (' + pairWKT(gJ.coordinates) + ')';

    case 'LineString':
      if(gJ.coordinates && gJ.coordinates[0] && gJ.coordinates[0].length === 3)
        return 'LINESTRING Z (' + ringWKT(gJ.coordinates) + ')';
      else return 'LINESTRING (' + ringWKT(gJ.coordinates) + ')';

    case 'Polygon':
      if(gJ.coordinates && gJ.coordinates[0] && gJ.coordinates[0][0] && gJ.coordinates[0][0].length === 3)
        return 'POLYGON Z (' + ringsWKT(gJ.coordinates) + ')';
      else return 'POLYGON (' + ringsWKT(gJ.coordinates) + ')';

    case 'MultiPoint':
      if(gJ.coordinates && gJ.coordinates[0] && gJ.coordinates[0].length === 3)
        return 'MULTIPOINT Z (' + ringWKT(gJ.coordinates) + ')';
      else return 'MULTIPOINT (' + ringWKT(gJ.coordinates) + ')';

    case 'MultiLineString':
      if(gJ.coordinates && gJ.coordinates[0] && gJ.coordinates[0][0] && gJ.coordinates[0][0].length === 3)
        return 'MULTILINESTRING Z (' + ringsWKT(gJ.coordinates) + ')';
      else return 'MULTILINESTRING (' + ringsWKT(gJ.coordinates) + ')';

    case 'MultiPolygon':
      if(gJ.coordinates && gJ.coordinates[0] && gJ.coordinates[0][0] && gJ.coordinates[0][0] && gJ.coordinates[0][0][0].length === 3)
        return 'MULTIPOLYGON Z (' + multiRingsWKT(gJ.coordinates) + ')';
      else return 'MULTIPOLYGON (' + multiRingsWKT(gJ.coordinates) + ')';


    case 'GeometryCollection':
      return 'GEOMETRYCOLLECTION (' + gJ.geometries.map(stringify).join(', ') + ')';

    default:
      throw new Error('stringify requires a valid GeoJSON Feature or geometry object as input');
  }
};

var wkt = {
  parse,
  stringify
};

function GEOSGeomFromWKT(wkt) {
  const wktPtr = GEOSFunctions.Module._malloc(wkt.length + 1);
  GEOSFunctions.Module.stringToUTF8(wkt, wktPtr, wkt.length + 1);
  const geomPtr = GEOSFunctions.GEOSGeomFromWKT(wktPtr);
  GEOSFunctions.GEOSFree(wktPtr);
  return geomPtr;
}

function GEOSGeomToWKT(geomPtr) {
  const wktPtr = GEOSFunctions.GEOSGeomToWKT(geomPtr);
  const wkt = GEOSFunctions.Module.UTF8ToString(wktPtr);
  GEOSFunctions.GEOSFree(wktPtr);
  GEOSFunctions.GEOSGeom_destroy(geomPtr);
  return wkt;
}

function geojsonToPointers(geojson) {
  const pointers = [];
  // check if it's a feature collection
  if (geojson.type === "FeatureCollection" || geojson.type === "GeometryCollection") {
    // iterate over each feature
    geojson.features.forEach((feature) => {
      pointers.push(geometryToPointer(feature.geometry));
    });
  } else {
    // it's a single feature or geometry
    pointers.push(geometryToPointer(geojson));
  }
  return pointers;
}

function pointersToGeojson(pointers, geojson) {
  pointers.forEach((pointer, i) => {
    if (geojson.features) {
      geojson.features[i] = pointerToFeature(pointer, geojson.features[i]);
    } else if (geojson.geometries) {
      geojson.geometries[i] = pointerToFeature(pointer, geojson.geometries[i]);
    } else {
      geojson = pointerToFeature(pointer, geojson);
    }
  });
  return geojson;
}

function geometryToPointer(geometry) {
  // convert feature to WKT
  const wkt$1 = wkt.stringify(geometry);
  const geomPtr = GEOSGeomFromWKT(wkt$1);
  return geomPtr;
}

function pointerToFeature(pointer, feature) {
  // read WKT from pointer
  const wkt$1 = GEOSGeomToWKT(pointer);
  // convert WKT to GeoJSON
  const geometry = wkt.parse(wkt$1);
  // update the original GeoJSON with the new geometry
  if (feature.geometry) {
    // it's a feature, we only update the geometry
    feature.geometry = geometry;
  } else {
    // it's a geometry, we update the whole object
    feature = geometry;
  }
  return feature;
}

function buffer$1(geojson, radius, options = {}) {
  const {
    quadrantSegments = 8,
    endCapStyle,
    joinStyle,
    mitreLimit,
    singleSided
  } = options;

  const isBufferWithParams = endCapStyle || joinStyle || mitreLimit || singleSided;
  let bufferParamsPtr;
  if (isBufferWithParams) {
    bufferParamsPtr = GEOSFunctions.GEOSBufferParams_create();
    if (endCapStyle) {
      GEOSFunctions.GEOSBufferParams_setEndCapStyle(bufferParamsPtr, endCapStyle);
    }
    if (joinStyle) {
      GEOSFunctions.GEOSBufferParams_setJoinStyle(bufferParamsPtr, joinStyle);
    }
    if (mitreLimit) {
      GEOSFunctions.GEOSBufferParams_setMitreLimit(bufferParamsPtr, mitreLimit);
    }
    if (quadrantSegments) {
      GEOSFunctions.GEOSBufferParams_setQuadrantSegments(bufferParamsPtr, quadrantSegments);
    }
    if (singleSided) {
      GEOSFunctions.GEOSBufferParams_setSingleSided(bufferParamsPtr, singleSided);
    }
  }
  // create a GEOS object from the GeoJSON
  // geojsonToPointers always returns an array of pointers  
  const geomPtrs = geojsonToPointers(geojson);
  // create a buffer for each geometry
  const bufferPtrs = geomPtrs.map((geomPtr) => {
    if (isBufferWithParams) {
      return GEOSFunctions.GEOSBufferWithParams(geomPtr, bufferParamsPtr, radius);
    }
    return GEOSFunctions.GEOSBuffer(geomPtr, radius, quadrantSegments);  
  });
  // destroy the bufferParamsPtr if it exists
  if (bufferParamsPtr) {
    GEOSFunctions.GEOSBufferParams_destroy(bufferParamsPtr);
  }
  // update the original GeoJSON with the new geometry
  const bufferGeojson = pointersToGeojson(bufferPtrs, geojson);
  return bufferGeojson;
}

var global$1 = (typeof global !== "undefined" ? global :
  typeof self !== "undefined" ? self :
  typeof window !== "undefined" ? window : {});

var lookup = [];
var revLookup = [];
var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array;
var inited = false;
function init () {
  inited = true;
  var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
  for (var i = 0, len = code.length; i < len; ++i) {
    lookup[i] = code[i];
    revLookup[code.charCodeAt(i)] = i;
  }

  revLookup['-'.charCodeAt(0)] = 62;
  revLookup['_'.charCodeAt(0)] = 63;
}

function toByteArray (b64) {
  if (!inited) {
    init();
  }
  var i, j, l, tmp, placeHolders, arr;
  var len = b64.length;

  if (len % 4 > 0) {
    throw new Error('Invalid string. Length must be a multiple of 4')
  }

  // the number of equal signs (place holders)
  // if there are two placeholders, than the two characters before it
  // represent one byte
  // if there is only one, then the three characters before it represent 2 bytes
  // this is just a cheap hack to not do indexOf twice
  placeHolders = b64[len - 2] === '=' ? 2 : b64[len - 1] === '=' ? 1 : 0;

  // base64 is 4/3 + up to two characters of the original data
  arr = new Arr(len * 3 / 4 - placeHolders);

  // if there are placeholders, only get up to the last complete 4 chars
  l = placeHolders > 0 ? len - 4 : len;

  var L = 0;

  for (i = 0, j = 0; i < l; i += 4, j += 3) {
    tmp = (revLookup[b64.charCodeAt(i)] << 18) | (revLookup[b64.charCodeAt(i + 1)] << 12) | (revLookup[b64.charCodeAt(i + 2)] << 6) | revLookup[b64.charCodeAt(i + 3)];
    arr[L++] = (tmp >> 16) & 0xFF;
    arr[L++] = (tmp >> 8) & 0xFF;
    arr[L++] = tmp & 0xFF;
  }

  if (placeHolders === 2) {
    tmp = (revLookup[b64.charCodeAt(i)] << 2) | (revLookup[b64.charCodeAt(i + 1)] >> 4);
    arr[L++] = tmp & 0xFF;
  } else if (placeHolders === 1) {
    tmp = (revLookup[b64.charCodeAt(i)] << 10) | (revLookup[b64.charCodeAt(i + 1)] << 4) | (revLookup[b64.charCodeAt(i + 2)] >> 2);
    arr[L++] = (tmp >> 8) & 0xFF;
    arr[L++] = tmp & 0xFF;
  }

  return arr
}

function tripletToBase64 (num) {
  return lookup[num >> 18 & 0x3F] + lookup[num >> 12 & 0x3F] + lookup[num >> 6 & 0x3F] + lookup[num & 0x3F]
}

function encodeChunk (uint8, start, end) {
  var tmp;
  var output = [];
  for (var i = start; i < end; i += 3) {
    tmp = (uint8[i] << 16) + (uint8[i + 1] << 8) + (uint8[i + 2]);
    output.push(tripletToBase64(tmp));
  }
  return output.join('')
}

function fromByteArray (uint8) {
  if (!inited) {
    init();
  }
  var tmp;
  var len = uint8.length;
  var extraBytes = len % 3; // if we have 1 byte left, pad 2 bytes
  var output = '';
  var parts = [];
  var maxChunkLength = 16383; // must be multiple of 3

  // go through the array every three bytes, we'll deal with trailing stuff later
  for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
    parts.push(encodeChunk(uint8, i, (i + maxChunkLength) > len2 ? len2 : (i + maxChunkLength)));
  }

  // pad the end with zeros, but make sure to not forget the extra bytes
  if (extraBytes === 1) {
    tmp = uint8[len - 1];
    output += lookup[tmp >> 2];
    output += lookup[(tmp << 4) & 0x3F];
    output += '==';
  } else if (extraBytes === 2) {
    tmp = (uint8[len - 2] << 8) + (uint8[len - 1]);
    output += lookup[tmp >> 10];
    output += lookup[(tmp >> 4) & 0x3F];
    output += lookup[(tmp << 2) & 0x3F];
    output += '=';
  }

  parts.push(output);

  return parts.join('')
}

function read (buffer, offset, isLE, mLen, nBytes) {
  var e, m;
  var eLen = nBytes * 8 - mLen - 1;
  var eMax = (1 << eLen) - 1;
  var eBias = eMax >> 1;
  var nBits = -7;
  var i = isLE ? (nBytes - 1) : 0;
  var d = isLE ? -1 : 1;
  var s = buffer[offset + i];

  i += d;

  e = s & ((1 << (-nBits)) - 1);
  s >>= (-nBits);
  nBits += eLen;
  for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8) {}

  m = e & ((1 << (-nBits)) - 1);
  e >>= (-nBits);
  nBits += mLen;
  for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8) {}

  if (e === 0) {
    e = 1 - eBias;
  } else if (e === eMax) {
    return m ? NaN : ((s ? -1 : 1) * Infinity)
  } else {
    m = m + Math.pow(2, mLen);
    e = e - eBias;
  }
  return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
}

function write (buffer, value, offset, isLE, mLen, nBytes) {
  var e, m, c;
  var eLen = nBytes * 8 - mLen - 1;
  var eMax = (1 << eLen) - 1;
  var eBias = eMax >> 1;
  var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0);
  var i = isLE ? 0 : (nBytes - 1);
  var d = isLE ? 1 : -1;
  var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0;

  value = Math.abs(value);

  if (isNaN(value) || value === Infinity) {
    m = isNaN(value) ? 1 : 0;
    e = eMax;
  } else {
    e = Math.floor(Math.log(value) / Math.LN2);
    if (value * (c = Math.pow(2, -e)) < 1) {
      e--;
      c *= 2;
    }
    if (e + eBias >= 1) {
      value += rt / c;
    } else {
      value += rt * Math.pow(2, 1 - eBias);
    }
    if (value * c >= 2) {
      e++;
      c /= 2;
    }

    if (e + eBias >= eMax) {
      m = 0;
      e = eMax;
    } else if (e + eBias >= 1) {
      m = (value * c - 1) * Math.pow(2, mLen);
      e = e + eBias;
    } else {
      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen);
      e = 0;
    }
  }

  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

  e = (e << mLen) | m;
  eLen += mLen;
  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

  buffer[offset + i - d] |= s * 128;
}

var toString = {}.toString;

var isArray$1 = Array.isArray || function (arr) {
  return toString.call(arr) == '[object Array]';
};

/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
 * @license  MIT
 */

var INSPECT_MAX_BYTES = 50;

/**
 * If `Buffer.TYPED_ARRAY_SUPPORT`:
 *   === true    Use Uint8Array implementation (fastest)
 *   === false   Use Object implementation (most compatible, even IE6)
 *
 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
 * Opera 11.6+, iOS 4.2+.
 *
 * Due to various browser bugs, sometimes the Object implementation will be used even
 * when the browser supports typed arrays.
 *
 * Note:
 *
 *   - Firefox 4-29 lacks support for adding new properties to `Uint8Array` instances,
 *     See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438.
 *
 *   - Chrome 9-10 is missing the `TypedArray.prototype.subarray` function.
 *
 *   - IE10 has a broken `TypedArray.prototype.subarray` function which returns arrays of
 *     incorrect length in some situations.

 * We detect these buggy browsers and set `Buffer.TYPED_ARRAY_SUPPORT` to `false` so they
 * get the Object implementation, which is slower but behaves correctly.
 */
Buffer.TYPED_ARRAY_SUPPORT = global$1.TYPED_ARRAY_SUPPORT !== undefined
  ? global$1.TYPED_ARRAY_SUPPORT
  : true;

/*
 * Export kMaxLength after typed array support is determined.
 */
kMaxLength();

function kMaxLength () {
  return Buffer.TYPED_ARRAY_SUPPORT
    ? 0x7fffffff
    : 0x3fffffff
}

function createBuffer (that, length) {
  if (kMaxLength() < length) {
    throw new RangeError('Invalid typed array length')
  }
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = new Uint8Array(length);
    that.__proto__ = Buffer.prototype;
  } else {
    // Fallback: Return an object instance of the Buffer class
    if (that === null) {
      that = new Buffer(length);
    }
    that.length = length;
  }

  return that
}

/**
 * The Buffer constructor returns instances of `Uint8Array` that have their
 * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
 * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
 * and the `Uint8Array` methods. Square bracket notation works as expected -- it
 * returns a single octet.
 *
 * The `Uint8Array` prototype remains unmodified.
 */

function Buffer (arg, encodingOrOffset, length) {
  if (!Buffer.TYPED_ARRAY_SUPPORT && !(this instanceof Buffer)) {
    return new Buffer(arg, encodingOrOffset, length)
  }

  // Common case.
  if (typeof arg === 'number') {
    if (typeof encodingOrOffset === 'string') {
      throw new Error(
        'If encoding is specified then the first argument must be a string'
      )
    }
    return allocUnsafe(this, arg)
  }
  return from(this, arg, encodingOrOffset, length)
}

Buffer.poolSize = 8192; // not used by this implementation

// TODO: Legacy, not needed anymore. Remove in next major version.
Buffer._augment = function (arr) {
  arr.__proto__ = Buffer.prototype;
  return arr
};

function from (that, value, encodingOrOffset, length) {
  if (typeof value === 'number') {
    throw new TypeError('"value" argument must not be a number')
  }

  if (typeof ArrayBuffer !== 'undefined' && value instanceof ArrayBuffer) {
    return fromArrayBuffer(that, value, encodingOrOffset, length)
  }

  if (typeof value === 'string') {
    return fromString(that, value, encodingOrOffset)
  }

  return fromObject(that, value)
}

/**
 * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
 * if value is a number.
 * Buffer.from(str[, encoding])
 * Buffer.from(array)
 * Buffer.from(buffer)
 * Buffer.from(arrayBuffer[, byteOffset[, length]])
 **/
Buffer.from = function (value, encodingOrOffset, length) {
  return from(null, value, encodingOrOffset, length)
};

if (Buffer.TYPED_ARRAY_SUPPORT) {
  Buffer.prototype.__proto__ = Uint8Array.prototype;
  Buffer.__proto__ = Uint8Array;
  if (typeof Symbol !== 'undefined' && Symbol.species &&
      Buffer[Symbol.species] === Buffer) ;
}

function assertSize (size) {
  if (typeof size !== 'number') {
    throw new TypeError('"size" argument must be a number')
  } else if (size < 0) {
    throw new RangeError('"size" argument must not be negative')
  }
}

function alloc (that, size, fill, encoding) {
  assertSize(size);
  if (size <= 0) {
    return createBuffer(that, size)
  }
  if (fill !== undefined) {
    // Only pay attention to encoding if it's a string. This
    // prevents accidentally sending in a number that would
    // be interpretted as a start offset.
    return typeof encoding === 'string'
      ? createBuffer(that, size).fill(fill, encoding)
      : createBuffer(that, size).fill(fill)
  }
  return createBuffer(that, size)
}

/**
 * Creates a new filled Buffer instance.
 * alloc(size[, fill[, encoding]])
 **/
Buffer.alloc = function (size, fill, encoding) {
  return alloc(null, size, fill, encoding)
};

function allocUnsafe (that, size) {
  assertSize(size);
  that = createBuffer(that, size < 0 ? 0 : checked(size) | 0);
  if (!Buffer.TYPED_ARRAY_SUPPORT) {
    for (var i = 0; i < size; ++i) {
      that[i] = 0;
    }
  }
  return that
}

/**
 * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
 * */
Buffer.allocUnsafe = function (size) {
  return allocUnsafe(null, size)
};
/**
 * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
 */
Buffer.allocUnsafeSlow = function (size) {
  return allocUnsafe(null, size)
};

function fromString (that, string, encoding) {
  if (typeof encoding !== 'string' || encoding === '') {
    encoding = 'utf8';
  }

  if (!Buffer.isEncoding(encoding)) {
    throw new TypeError('"encoding" must be a valid string encoding')
  }

  var length = byteLength(string, encoding) | 0;
  that = createBuffer(that, length);

  var actual = that.write(string, encoding);

  if (actual !== length) {
    // Writing a hex string, for example, that contains invalid characters will
    // cause everything after the first invalid character to be ignored. (e.g.
    // 'abxxcd' will be treated as 'ab')
    that = that.slice(0, actual);
  }

  return that
}

function fromArrayLike (that, array) {
  var length = array.length < 0 ? 0 : checked(array.length) | 0;
  that = createBuffer(that, length);
  for (var i = 0; i < length; i += 1) {
    that[i] = array[i] & 255;
  }
  return that
}

function fromArrayBuffer (that, array, byteOffset, length) {
  array.byteLength; // this throws if `array` is not a valid ArrayBuffer

  if (byteOffset < 0 || array.byteLength < byteOffset) {
    throw new RangeError('\'offset\' is out of bounds')
  }

  if (array.byteLength < byteOffset + (length || 0)) {
    throw new RangeError('\'length\' is out of bounds')
  }

  if (byteOffset === undefined && length === undefined) {
    array = new Uint8Array(array);
  } else if (length === undefined) {
    array = new Uint8Array(array, byteOffset);
  } else {
    array = new Uint8Array(array, byteOffset, length);
  }

  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = array;
    that.__proto__ = Buffer.prototype;
  } else {
    // Fallback: Return an object instance of the Buffer class
    that = fromArrayLike(that, array);
  }
  return that
}

function fromObject (that, obj) {
  if (internalIsBuffer(obj)) {
    var len = checked(obj.length) | 0;
    that = createBuffer(that, len);

    if (that.length === 0) {
      return that
    }

    obj.copy(that, 0, 0, len);
    return that
  }

  if (obj) {
    if ((typeof ArrayBuffer !== 'undefined' &&
        obj.buffer instanceof ArrayBuffer) || 'length' in obj) {
      if (typeof obj.length !== 'number' || isnan(obj.length)) {
        return createBuffer(that, 0)
      }
      return fromArrayLike(that, obj)
    }

    if (obj.type === 'Buffer' && isArray$1(obj.data)) {
      return fromArrayLike(that, obj.data)
    }
  }

  throw new TypeError('First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.')
}

function checked (length) {
  // Note: cannot use `length < kMaxLength()` here because that fails when
  // length is NaN (which is otherwise coerced to zero.)
  if (length >= kMaxLength()) {
    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
                         'size: 0x' + kMaxLength().toString(16) + ' bytes')
  }
  return length | 0
}
Buffer.isBuffer = isBuffer$1;
function internalIsBuffer (b) {
  return !!(b != null && b._isBuffer)
}

Buffer.compare = function compare (a, b) {
  if (!internalIsBuffer(a) || !internalIsBuffer(b)) {
    throw new TypeError('Arguments must be Buffers')
  }

  if (a === b) return 0

  var x = a.length;
  var y = b.length;

  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
    if (a[i] !== b[i]) {
      x = a[i];
      y = b[i];
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
};

Buffer.isEncoding = function isEncoding (encoding) {
  switch (String(encoding).toLowerCase()) {
    case 'hex':
    case 'utf8':
    case 'utf-8':
    case 'ascii':
    case 'latin1':
    case 'binary':
    case 'base64':
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      return true
    default:
      return false
  }
};

Buffer.concat = function concat (list, length) {
  if (!isArray$1(list)) {
    throw new TypeError('"list" argument must be an Array of Buffers')
  }

  if (list.length === 0) {
    return Buffer.alloc(0)
  }

  var i;
  if (length === undefined) {
    length = 0;
    for (i = 0; i < list.length; ++i) {
      length += list[i].length;
    }
  }

  var buffer = Buffer.allocUnsafe(length);
  var pos = 0;
  for (i = 0; i < list.length; ++i) {
    var buf = list[i];
    if (!internalIsBuffer(buf)) {
      throw new TypeError('"list" argument must be an Array of Buffers')
    }
    buf.copy(buffer, pos);
    pos += buf.length;
  }
  return buffer
};

function byteLength (string, encoding) {
  if (internalIsBuffer(string)) {
    return string.length
  }
  if (typeof ArrayBuffer !== 'undefined' && typeof ArrayBuffer.isView === 'function' &&
      (ArrayBuffer.isView(string) || string instanceof ArrayBuffer)) {
    return string.byteLength
  }
  if (typeof string !== 'string') {
    string = '' + string;
  }

  var len = string.length;
  if (len === 0) return 0

  // Use a for loop to avoid recursion
  var loweredCase = false;
  for (;;) {
    switch (encoding) {
      case 'ascii':
      case 'latin1':
      case 'binary':
        return len
      case 'utf8':
      case 'utf-8':
      case undefined:
        return utf8ToBytes(string).length
      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return len * 2
      case 'hex':
        return len >>> 1
      case 'base64':
        return base64ToBytes(string).length
      default:
        if (loweredCase) return utf8ToBytes(string).length // assume utf8
        encoding = ('' + encoding).toLowerCase();
        loweredCase = true;
    }
  }
}
Buffer.byteLength = byteLength;

function slowToString (encoding, start, end) {
  var loweredCase = false;

  // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
  // property of a typed array.

  // This behaves neither like String nor Uint8Array in that we set start/end
  // to their upper/lower bounds if the value passed is out of range.
  // undefined is handled specially as per ECMA-262 6th Edition,
  // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.
  if (start === undefined || start < 0) {
    start = 0;
  }
  // Return early if start > this.length. Done here to prevent potential uint32
  // coercion fail below.
  if (start > this.length) {
    return ''
  }

  if (end === undefined || end > this.length) {
    end = this.length;
  }

  if (end <= 0) {
    return ''
  }

  // Force coersion to uint32. This will also coerce falsey/NaN values to 0.
  end >>>= 0;
  start >>>= 0;

  if (end <= start) {
    return ''
  }

  if (!encoding) encoding = 'utf8';

  while (true) {
    switch (encoding) {
      case 'hex':
        return hexSlice(this, start, end)

      case 'utf8':
      case 'utf-8':
        return utf8Slice(this, start, end)

      case 'ascii':
        return asciiSlice(this, start, end)

      case 'latin1':
      case 'binary':
        return latin1Slice(this, start, end)

      case 'base64':
        return base64Slice(this, start, end)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return utf16leSlice(this, start, end)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = (encoding + '').toLowerCase();
        loweredCase = true;
    }
  }
}

// The property is used by `Buffer.isBuffer` and `is-buffer` (in Safari 5-7) to detect
// Buffer instances.
Buffer.prototype._isBuffer = true;

function swap (b, n, m) {
  var i = b[n];
  b[n] = b[m];
  b[m] = i;
}

Buffer.prototype.swap16 = function swap16 () {
  var len = this.length;
  if (len % 2 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 16-bits')
  }
  for (var i = 0; i < len; i += 2) {
    swap(this, i, i + 1);
  }
  return this
};

Buffer.prototype.swap32 = function swap32 () {
  var len = this.length;
  if (len % 4 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 32-bits')
  }
  for (var i = 0; i < len; i += 4) {
    swap(this, i, i + 3);
    swap(this, i + 1, i + 2);
  }
  return this
};

Buffer.prototype.swap64 = function swap64 () {
  var len = this.length;
  if (len % 8 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 64-bits')
  }
  for (var i = 0; i < len; i += 8) {
    swap(this, i, i + 7);
    swap(this, i + 1, i + 6);
    swap(this, i + 2, i + 5);
    swap(this, i + 3, i + 4);
  }
  return this
};

Buffer.prototype.toString = function toString () {
  var length = this.length | 0;
  if (length === 0) return ''
  if (arguments.length === 0) return utf8Slice(this, 0, length)
  return slowToString.apply(this, arguments)
};

Buffer.prototype.equals = function equals (b) {
  if (!internalIsBuffer(b)) throw new TypeError('Argument must be a Buffer')
  if (this === b) return true
  return Buffer.compare(this, b) === 0
};

Buffer.prototype.inspect = function inspect () {
  var str = '';
  var max = INSPECT_MAX_BYTES;
  if (this.length > 0) {
    str = this.toString('hex', 0, max).match(/.{2}/g).join(' ');
    if (this.length > max) str += ' ... ';
  }
  return '<Buffer ' + str + '>'
};

Buffer.prototype.compare = function compare (target, start, end, thisStart, thisEnd) {
  if (!internalIsBuffer(target)) {
    throw new TypeError('Argument must be a Buffer')
  }

  if (start === undefined) {
    start = 0;
  }
  if (end === undefined) {
    end = target ? target.length : 0;
  }
  if (thisStart === undefined) {
    thisStart = 0;
  }
  if (thisEnd === undefined) {
    thisEnd = this.length;
  }

  if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
    throw new RangeError('out of range index')
  }

  if (thisStart >= thisEnd && start >= end) {
    return 0
  }
  if (thisStart >= thisEnd) {
    return -1
  }
  if (start >= end) {
    return 1
  }

  start >>>= 0;
  end >>>= 0;
  thisStart >>>= 0;
  thisEnd >>>= 0;

  if (this === target) return 0

  var x = thisEnd - thisStart;
  var y = end - start;
  var len = Math.min(x, y);

  var thisCopy = this.slice(thisStart, thisEnd);
  var targetCopy = target.slice(start, end);

  for (var i = 0; i < len; ++i) {
    if (thisCopy[i] !== targetCopy[i]) {
      x = thisCopy[i];
      y = targetCopy[i];
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
};

// Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
// OR the last index of `val` in `buffer` at offset <= `byteOffset`.
//
// Arguments:
// - buffer - a Buffer to search
// - val - a string, Buffer, or number
// - byteOffset - an index into `buffer`; will be clamped to an int32
// - encoding - an optional encoding, relevant is val is a string
// - dir - true for indexOf, false for lastIndexOf
function bidirectionalIndexOf (buffer, val, byteOffset, encoding, dir) {
  // Empty buffer means no match
  if (buffer.length === 0) return -1

  // Normalize byteOffset
  if (typeof byteOffset === 'string') {
    encoding = byteOffset;
    byteOffset = 0;
  } else if (byteOffset > 0x7fffffff) {
    byteOffset = 0x7fffffff;
  } else if (byteOffset < -0x80000000) {
    byteOffset = -0x80000000;
  }
  byteOffset = +byteOffset;  // Coerce to Number.
  if (isNaN(byteOffset)) {
    // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
    byteOffset = dir ? 0 : (buffer.length - 1);
  }

  // Normalize byteOffset: negative offsets start from the end of the buffer
  if (byteOffset < 0) byteOffset = buffer.length + byteOffset;
  if (byteOffset >= buffer.length) {
    if (dir) return -1
    else byteOffset = buffer.length - 1;
  } else if (byteOffset < 0) {
    if (dir) byteOffset = 0;
    else return -1
  }

  // Normalize val
  if (typeof val === 'string') {
    val = Buffer.from(val, encoding);
  }

  // Finally, search either indexOf (if dir is true) or lastIndexOf
  if (internalIsBuffer(val)) {
    // Special case: looking for empty string/buffer always fails
    if (val.length === 0) {
      return -1
    }
    return arrayIndexOf(buffer, val, byteOffset, encoding, dir)
  } else if (typeof val === 'number') {
    val = val & 0xFF; // Search for a byte value [0-255]
    if (Buffer.TYPED_ARRAY_SUPPORT &&
        typeof Uint8Array.prototype.indexOf === 'function') {
      if (dir) {
        return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset)
      } else {
        return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset)
      }
    }
    return arrayIndexOf(buffer, [ val ], byteOffset, encoding, dir)
  }

  throw new TypeError('val must be string, number or Buffer')
}

function arrayIndexOf (arr, val, byteOffset, encoding, dir) {
  var indexSize = 1;
  var arrLength = arr.length;
  var valLength = val.length;

  if (encoding !== undefined) {
    encoding = String(encoding).toLowerCase();
    if (encoding === 'ucs2' || encoding === 'ucs-2' ||
        encoding === 'utf16le' || encoding === 'utf-16le') {
      if (arr.length < 2 || val.length < 2) {
        return -1
      }
      indexSize = 2;
      arrLength /= 2;
      valLength /= 2;
      byteOffset /= 2;
    }
  }

  function read (buf, i) {
    if (indexSize === 1) {
      return buf[i]
    } else {
      return buf.readUInt16BE(i * indexSize)
    }
  }

  var i;
  if (dir) {
    var foundIndex = -1;
    for (i = byteOffset; i < arrLength; i++) {
      if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
        if (foundIndex === -1) foundIndex = i;
        if (i - foundIndex + 1 === valLength) return foundIndex * indexSize
      } else {
        if (foundIndex !== -1) i -= i - foundIndex;
        foundIndex = -1;
      }
    }
  } else {
    if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength;
    for (i = byteOffset; i >= 0; i--) {
      var found = true;
      for (var j = 0; j < valLength; j++) {
        if (read(arr, i + j) !== read(val, j)) {
          found = false;
          break
        }
      }
      if (found) return i
    }
  }

  return -1
}

Buffer.prototype.includes = function includes (val, byteOffset, encoding) {
  return this.indexOf(val, byteOffset, encoding) !== -1
};

Buffer.prototype.indexOf = function indexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, true)
};

Buffer.prototype.lastIndexOf = function lastIndexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, false)
};

function hexWrite (buf, string, offset, length) {
  offset = Number(offset) || 0;
  var remaining = buf.length - offset;
  if (!length) {
    length = remaining;
  } else {
    length = Number(length);
    if (length > remaining) {
      length = remaining;
    }
  }

  // must be an even number of digits
  var strLen = string.length;
  if (strLen % 2 !== 0) throw new TypeError('Invalid hex string')

  if (length > strLen / 2) {
    length = strLen / 2;
  }
  for (var i = 0; i < length; ++i) {
    var parsed = parseInt(string.substr(i * 2, 2), 16);
    if (isNaN(parsed)) return i
    buf[offset + i] = parsed;
  }
  return i
}

function utf8Write (buf, string, offset, length) {
  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
}

function asciiWrite (buf, string, offset, length) {
  return blitBuffer(asciiToBytes(string), buf, offset, length)
}

function latin1Write (buf, string, offset, length) {
  return asciiWrite(buf, string, offset, length)
}

function base64Write (buf, string, offset, length) {
  return blitBuffer(base64ToBytes(string), buf, offset, length)
}

function ucs2Write (buf, string, offset, length) {
  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
}

Buffer.prototype.write = function write (string, offset, length, encoding) {
  // Buffer#write(string)
  if (offset === undefined) {
    encoding = 'utf8';
    length = this.length;
    offset = 0;
  // Buffer#write(string, encoding)
  } else if (length === undefined && typeof offset === 'string') {
    encoding = offset;
    length = this.length;
    offset = 0;
  // Buffer#write(string, offset[, length][, encoding])
  } else if (isFinite(offset)) {
    offset = offset | 0;
    if (isFinite(length)) {
      length = length | 0;
      if (encoding === undefined) encoding = 'utf8';
    } else {
      encoding = length;
      length = undefined;
    }
  // legacy write(string, encoding, offset, length) - remove in v0.13
  } else {
    throw new Error(
      'Buffer.write(string, encoding, offset[, length]) is no longer supported'
    )
  }

  var remaining = this.length - offset;
  if (length === undefined || length > remaining) length = remaining;

  if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
    throw new RangeError('Attempt to write outside buffer bounds')
  }

  if (!encoding) encoding = 'utf8';

  var loweredCase = false;
  for (;;) {
    switch (encoding) {
      case 'hex':
        return hexWrite(this, string, offset, length)

      case 'utf8':
      case 'utf-8':
        return utf8Write(this, string, offset, length)

      case 'ascii':
        return asciiWrite(this, string, offset, length)

      case 'latin1':
      case 'binary':
        return latin1Write(this, string, offset, length)

      case 'base64':
        // Warning: maxLength not taken into account in base64Write
        return base64Write(this, string, offset, length)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return ucs2Write(this, string, offset, length)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = ('' + encoding).toLowerCase();
        loweredCase = true;
    }
  }
};

Buffer.prototype.toJSON = function toJSON () {
  return {
    type: 'Buffer',
    data: Array.prototype.slice.call(this._arr || this, 0)
  }
};

function base64Slice (buf, start, end) {
  if (start === 0 && end === buf.length) {
    return fromByteArray(buf)
  } else {
    return fromByteArray(buf.slice(start, end))
  }
}

function utf8Slice (buf, start, end) {
  end = Math.min(buf.length, end);
  var res = [];

  var i = start;
  while (i < end) {
    var firstByte = buf[i];
    var codePoint = null;
    var bytesPerSequence = (firstByte > 0xEF) ? 4
      : (firstByte > 0xDF) ? 3
      : (firstByte > 0xBF) ? 2
      : 1;

    if (i + bytesPerSequence <= end) {
      var secondByte, thirdByte, fourthByte, tempCodePoint;

      switch (bytesPerSequence) {
        case 1:
          if (firstByte < 0x80) {
            codePoint = firstByte;
          }
          break
        case 2:
          secondByte = buf[i + 1];
          if ((secondByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F);
            if (tempCodePoint > 0x7F) {
              codePoint = tempCodePoint;
            }
          }
          break
        case 3:
          secondByte = buf[i + 1];
          thirdByte = buf[i + 2];
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | (thirdByte & 0x3F);
            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
              codePoint = tempCodePoint;
            }
          }
          break
        case 4:
          secondByte = buf[i + 1];
          thirdByte = buf[i + 2];
          fourthByte = buf[i + 3];
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F);
            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
              codePoint = tempCodePoint;
            }
          }
      }
    }

    if (codePoint === null) {
      // we did not generate a valid codePoint so insert a
      // replacement char (U+FFFD) and advance only 1 byte
      codePoint = 0xFFFD;
      bytesPerSequence = 1;
    } else if (codePoint > 0xFFFF) {
      // encode to utf16 (surrogate pair dance)
      codePoint -= 0x10000;
      res.push(codePoint >>> 10 & 0x3FF | 0xD800);
      codePoint = 0xDC00 | codePoint & 0x3FF;
    }

    res.push(codePoint);
    i += bytesPerSequence;
  }

  return decodeCodePointsArray(res)
}

// Based on http://stackoverflow.com/a/22747272/680742, the browser with
// the lowest limit is Chrome, with 0x10000 args.
// We go 1 magnitude less, for safety
var MAX_ARGUMENTS_LENGTH = 0x1000;

function decodeCodePointsArray (codePoints) {
  var len = codePoints.length;
  if (len <= MAX_ARGUMENTS_LENGTH) {
    return String.fromCharCode.apply(String, codePoints) // avoid extra slice()
  }

  // Decode in chunks to avoid "call stack size exceeded".
  var res = '';
  var i = 0;
  while (i < len) {
    res += String.fromCharCode.apply(
      String,
      codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
    );
  }
  return res
}

function asciiSlice (buf, start, end) {
  var ret = '';
  end = Math.min(buf.length, end);

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i] & 0x7F);
  }
  return ret
}

function latin1Slice (buf, start, end) {
  var ret = '';
  end = Math.min(buf.length, end);

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i]);
  }
  return ret
}

function hexSlice (buf, start, end) {
  var len = buf.length;

  if (!start || start < 0) start = 0;
  if (!end || end < 0 || end > len) end = len;

  var out = '';
  for (var i = start; i < end; ++i) {
    out += toHex(buf[i]);
  }
  return out
}

function utf16leSlice (buf, start, end) {
  var bytes = buf.slice(start, end);
  var res = '';
  for (var i = 0; i < bytes.length; i += 2) {
    res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256);
  }
  return res
}

Buffer.prototype.slice = function slice (start, end) {
  var len = this.length;
  start = ~~start;
  end = end === undefined ? len : ~~end;

  if (start < 0) {
    start += len;
    if (start < 0) start = 0;
  } else if (start > len) {
    start = len;
  }

  if (end < 0) {
    end += len;
    if (end < 0) end = 0;
  } else if (end > len) {
    end = len;
  }

  if (end < start) end = start;

  var newBuf;
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    newBuf = this.subarray(start, end);
    newBuf.__proto__ = Buffer.prototype;
  } else {
    var sliceLen = end - start;
    newBuf = new Buffer(sliceLen, undefined);
    for (var i = 0; i < sliceLen; ++i) {
      newBuf[i] = this[i + start];
    }
  }

  return newBuf
};

/*
 * Need to make sure that buffer isn't trying to write out of bounds.
 */
function checkOffset (offset, ext, length) {
  if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')
  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')
}

Buffer.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {
  offset = offset | 0;
  byteLength = byteLength | 0;
  if (!noAssert) checkOffset(offset, byteLength, this.length);

  var val = this[offset];
  var mul = 1;
  var i = 0;
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul;
  }

  return val
};

Buffer.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {
  offset = offset | 0;
  byteLength = byteLength | 0;
  if (!noAssert) {
    checkOffset(offset, byteLength, this.length);
  }

  var val = this[offset + --byteLength];
  var mul = 1;
  while (byteLength > 0 && (mul *= 0x100)) {
    val += this[offset + --byteLength] * mul;
  }

  return val
};

Buffer.prototype.readUInt8 = function readUInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length);
  return this[offset]
};

Buffer.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length);
  return this[offset] | (this[offset + 1] << 8)
};

Buffer.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length);
  return (this[offset] << 8) | this[offset + 1]
};

Buffer.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length);

  return ((this[offset]) |
      (this[offset + 1] << 8) |
      (this[offset + 2] << 16)) +
      (this[offset + 3] * 0x1000000)
};

Buffer.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length);

  return (this[offset] * 0x1000000) +
    ((this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    this[offset + 3])
};

Buffer.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {
  offset = offset | 0;
  byteLength = byteLength | 0;
  if (!noAssert) checkOffset(offset, byteLength, this.length);

  var val = this[offset];
  var mul = 1;
  var i = 0;
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul;
  }
  mul *= 0x80;

  if (val >= mul) val -= Math.pow(2, 8 * byteLength);

  return val
};

Buffer.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {
  offset = offset | 0;
  byteLength = byteLength | 0;
  if (!noAssert) checkOffset(offset, byteLength, this.length);

  var i = byteLength;
  var mul = 1;
  var val = this[offset + --i];
  while (i > 0 && (mul *= 0x100)) {
    val += this[offset + --i] * mul;
  }
  mul *= 0x80;

  if (val >= mul) val -= Math.pow(2, 8 * byteLength);

  return val
};

Buffer.prototype.readInt8 = function readInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length);
  if (!(this[offset] & 0x80)) return (this[offset])
  return ((0xff - this[offset] + 1) * -1)
};

Buffer.prototype.readInt16LE = function readInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length);
  var val = this[offset] | (this[offset + 1] << 8);
  return (val & 0x8000) ? val | 0xFFFF0000 : val
};

Buffer.prototype.readInt16BE = function readInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length);
  var val = this[offset + 1] | (this[offset] << 8);
  return (val & 0x8000) ? val | 0xFFFF0000 : val
};

Buffer.prototype.readInt32LE = function readInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length);

  return (this[offset]) |
    (this[offset + 1] << 8) |
    (this[offset + 2] << 16) |
    (this[offset + 3] << 24)
};

Buffer.prototype.readInt32BE = function readInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length);

  return (this[offset] << 24) |
    (this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    (this[offset + 3])
};

Buffer.prototype.readFloatLE = function readFloatLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length);
  return read(this, offset, true, 23, 4)
};

Buffer.prototype.readFloatBE = function readFloatBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length);
  return read(this, offset, false, 23, 4)
};

Buffer.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length);
  return read(this, offset, true, 52, 8)
};

Buffer.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length);
  return read(this, offset, false, 52, 8)
};

function checkInt (buf, value, offset, ext, max, min) {
  if (!internalIsBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance')
  if (value > max || value < min) throw new RangeError('"value" argument is out of bounds')
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
}

Buffer.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {
  value = +value;
  offset = offset | 0;
  byteLength = byteLength | 0;
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1;
    checkInt(this, value, offset, byteLength, maxBytes, 0);
  }

  var mul = 1;
  var i = 0;
  this[offset] = value & 0xFF;
  while (++i < byteLength && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF;
  }

  return offset + byteLength
};

Buffer.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {
  value = +value;
  offset = offset | 0;
  byteLength = byteLength | 0;
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1;
    checkInt(this, value, offset, byteLength, maxBytes, 0);
  }

  var i = byteLength - 1;
  var mul = 1;
  this[offset + i] = value & 0xFF;
  while (--i >= 0 && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF;
  }

  return offset + byteLength
};

Buffer.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0);
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value);
  this[offset] = (value & 0xff);
  return offset + 1
};

function objectWriteUInt16 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffff + value + 1;
  for (var i = 0, j = Math.min(buf.length - offset, 2); i < j; ++i) {
    buf[offset + i] = (value & (0xff << (8 * (littleEndian ? i : 1 - i)))) >>>
      (littleEndian ? i : 1 - i) * 8;
  }
}

Buffer.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0);
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff);
    this[offset + 1] = (value >>> 8);
  } else {
    objectWriteUInt16(this, value, offset, true);
  }
  return offset + 2
};

Buffer.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0);
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8);
    this[offset + 1] = (value & 0xff);
  } else {
    objectWriteUInt16(this, value, offset, false);
  }
  return offset + 2
};

function objectWriteUInt32 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffffffff + value + 1;
  for (var i = 0, j = Math.min(buf.length - offset, 4); i < j; ++i) {
    buf[offset + i] = (value >>> (littleEndian ? i : 3 - i) * 8) & 0xff;
  }
}

Buffer.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0);
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset + 3] = (value >>> 24);
    this[offset + 2] = (value >>> 16);
    this[offset + 1] = (value >>> 8);
    this[offset] = (value & 0xff);
  } else {
    objectWriteUInt32(this, value, offset, true);
  }
  return offset + 4
};

Buffer.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0);
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24);
    this[offset + 1] = (value >>> 16);
    this[offset + 2] = (value >>> 8);
    this[offset + 3] = (value & 0xff);
  } else {
    objectWriteUInt32(this, value, offset, false);
  }
  return offset + 4
};

Buffer.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1);

    checkInt(this, value, offset, byteLength, limit - 1, -limit);
  }

  var i = 0;
  var mul = 1;
  var sub = 0;
  this[offset] = value & 0xFF;
  while (++i < byteLength && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
      sub = 1;
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF;
  }

  return offset + byteLength
};

Buffer.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1);

    checkInt(this, value, offset, byteLength, limit - 1, -limit);
  }

  var i = byteLength - 1;
  var mul = 1;
  var sub = 0;
  this[offset + i] = value & 0xFF;
  while (--i >= 0 && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
      sub = 1;
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF;
  }

  return offset + byteLength
};

Buffer.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80);
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value);
  if (value < 0) value = 0xff + value + 1;
  this[offset] = (value & 0xff);
  return offset + 1
};

Buffer.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000);
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff);
    this[offset + 1] = (value >>> 8);
  } else {
    objectWriteUInt16(this, value, offset, true);
  }
  return offset + 2
};

Buffer.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000);
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8);
    this[offset + 1] = (value & 0xff);
  } else {
    objectWriteUInt16(this, value, offset, false);
  }
  return offset + 2
};

Buffer.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000);
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff);
    this[offset + 1] = (value >>> 8);
    this[offset + 2] = (value >>> 16);
    this[offset + 3] = (value >>> 24);
  } else {
    objectWriteUInt32(this, value, offset, true);
  }
  return offset + 4
};

Buffer.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000);
  if (value < 0) value = 0xffffffff + value + 1;
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24);
    this[offset + 1] = (value >>> 16);
    this[offset + 2] = (value >>> 8);
    this[offset + 3] = (value & 0xff);
  } else {
    objectWriteUInt32(this, value, offset, false);
  }
  return offset + 4
};

function checkIEEE754 (buf, value, offset, ext, max, min) {
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
  if (offset < 0) throw new RangeError('Index out of range')
}

function writeFloat (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 4);
  }
  write(buf, value, offset, littleEndian, 23, 4);
  return offset + 4
}

Buffer.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {
  return writeFloat(this, value, offset, true, noAssert)
};

Buffer.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {
  return writeFloat(this, value, offset, false, noAssert)
};

function writeDouble (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 8);
  }
  write(buf, value, offset, littleEndian, 52, 8);
  return offset + 8
}

Buffer.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {
  return writeDouble(this, value, offset, true, noAssert)
};

Buffer.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {
  return writeDouble(this, value, offset, false, noAssert)
};

// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
Buffer.prototype.copy = function copy (target, targetStart, start, end) {
  if (!start) start = 0;
  if (!end && end !== 0) end = this.length;
  if (targetStart >= target.length) targetStart = target.length;
  if (!targetStart) targetStart = 0;
  if (end > 0 && end < start) end = start;

  // Copy 0 bytes; we're done
  if (end === start) return 0
  if (target.length === 0 || this.length === 0) return 0

  // Fatal error conditions
  if (targetStart < 0) {
    throw new RangeError('targetStart out of bounds')
  }
  if (start < 0 || start >= this.length) throw new RangeError('sourceStart out of bounds')
  if (end < 0) throw new RangeError('sourceEnd out of bounds')

  // Are we oob?
  if (end > this.length) end = this.length;
  if (target.length - targetStart < end - start) {
    end = target.length - targetStart + start;
  }

  var len = end - start;
  var i;

  if (this === target && start < targetStart && targetStart < end) {
    // descending copy from end
    for (i = len - 1; i >= 0; --i) {
      target[i + targetStart] = this[i + start];
    }
  } else if (len < 1000 || !Buffer.TYPED_ARRAY_SUPPORT) {
    // ascending copy from start
    for (i = 0; i < len; ++i) {
      target[i + targetStart] = this[i + start];
    }
  } else {
    Uint8Array.prototype.set.call(
      target,
      this.subarray(start, start + len),
      targetStart
    );
  }

  return len
};

// Usage:
//    buffer.fill(number[, offset[, end]])
//    buffer.fill(buffer[, offset[, end]])
//    buffer.fill(string[, offset[, end]][, encoding])
Buffer.prototype.fill = function fill (val, start, end, encoding) {
  // Handle string cases:
  if (typeof val === 'string') {
    if (typeof start === 'string') {
      encoding = start;
      start = 0;
      end = this.length;
    } else if (typeof end === 'string') {
      encoding = end;
      end = this.length;
    }
    if (val.length === 1) {
      var code = val.charCodeAt(0);
      if (code < 256) {
        val = code;
      }
    }
    if (encoding !== undefined && typeof encoding !== 'string') {
      throw new TypeError('encoding must be a string')
    }
    if (typeof encoding === 'string' && !Buffer.isEncoding(encoding)) {
      throw new TypeError('Unknown encoding: ' + encoding)
    }
  } else if (typeof val === 'number') {
    val = val & 255;
  }

  // Invalid ranges are not set to a default, so can range check early.
  if (start < 0 || this.length < start || this.length < end) {
    throw new RangeError('Out of range index')
  }

  if (end <= start) {
    return this
  }

  start = start >>> 0;
  end = end === undefined ? this.length : end >>> 0;

  if (!val) val = 0;

  var i;
  if (typeof val === 'number') {
    for (i = start; i < end; ++i) {
      this[i] = val;
    }
  } else {
    var bytes = internalIsBuffer(val)
      ? val
      : utf8ToBytes(new Buffer(val, encoding).toString());
    var len = bytes.length;
    for (i = 0; i < end - start; ++i) {
      this[i + start] = bytes[i % len];
    }
  }

  return this
};

// HELPER FUNCTIONS
// ================

var INVALID_BASE64_RE = /[^+\/0-9A-Za-z-_]/g;

function base64clean (str) {
  // Node strips out invalid characters like \n and \t from the string, base64-js does not
  str = stringtrim(str).replace(INVALID_BASE64_RE, '');
  // Node converts strings with length < 2 to ''
  if (str.length < 2) return ''
  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
  while (str.length % 4 !== 0) {
    str = str + '=';
  }
  return str
}

function stringtrim (str) {
  if (str.trim) return str.trim()
  return str.replace(/^\s+|\s+$/g, '')
}

function toHex (n) {
  if (n < 16) return '0' + n.toString(16)
  return n.toString(16)
}

function utf8ToBytes (string, units) {
  units = units || Infinity;
  var codePoint;
  var length = string.length;
  var leadSurrogate = null;
  var bytes = [];

  for (var i = 0; i < length; ++i) {
    codePoint = string.charCodeAt(i);

    // is surrogate component
    if (codePoint > 0xD7FF && codePoint < 0xE000) {
      // last char was a lead
      if (!leadSurrogate) {
        // no lead yet
        if (codePoint > 0xDBFF) {
          // unexpected trail
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
          continue
        } else if (i + 1 === length) {
          // unpaired lead
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
          continue
        }

        // valid lead
        leadSurrogate = codePoint;

        continue
      }

      // 2 leads in a row
      if (codePoint < 0xDC00) {
        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
        leadSurrogate = codePoint;
        continue
      }

      // valid surrogate pair
      codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000;
    } else if (leadSurrogate) {
      // valid bmp char, but last char was a lead
      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
    }

    leadSurrogate = null;

    // encode utf8
    if (codePoint < 0x80) {
      if ((units -= 1) < 0) break
      bytes.push(codePoint);
    } else if (codePoint < 0x800) {
      if ((units -= 2) < 0) break
      bytes.push(
        codePoint >> 0x6 | 0xC0,
        codePoint & 0x3F | 0x80
      );
    } else if (codePoint < 0x10000) {
      if ((units -= 3) < 0) break
      bytes.push(
        codePoint >> 0xC | 0xE0,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      );
    } else if (codePoint < 0x110000) {
      if ((units -= 4) < 0) break
      bytes.push(
        codePoint >> 0x12 | 0xF0,
        codePoint >> 0xC & 0x3F | 0x80,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      );
    } else {
      throw new Error('Invalid code point')
    }
  }

  return bytes
}

function asciiToBytes (str) {
  var byteArray = [];
  for (var i = 0; i < str.length; ++i) {
    // Node's code seems to be doing this and not & 0x7F..
    byteArray.push(str.charCodeAt(i) & 0xFF);
  }
  return byteArray
}

function utf16leToBytes (str, units) {
  var c, hi, lo;
  var byteArray = [];
  for (var i = 0; i < str.length; ++i) {
    if ((units -= 2) < 0) break

    c = str.charCodeAt(i);
    hi = c >> 8;
    lo = c % 256;
    byteArray.push(lo);
    byteArray.push(hi);
  }

  return byteArray
}


function base64ToBytes (str) {
  return toByteArray(base64clean(str))
}

function blitBuffer (src, dst, offset, length) {
  for (var i = 0; i < length; ++i) {
    if ((i + offset >= dst.length) || (i >= src.length)) break
    dst[i + offset] = src[i];
  }
  return i
}

function isnan (val) {
  return val !== val // eslint-disable-line no-self-compare
}


// the following is from is-buffer, also by Feross Aboukhadijeh and with same lisence
// The _isBuffer check is for Safari 5-7 support, because it's missing
// Object.prototype.constructor. Remove this eventually
function isBuffer$1(obj) {
  return obj != null && (!!obj._isBuffer || isFastBuffer(obj) || isSlowBuffer(obj))
}

function isFastBuffer (obj) {
  return !!obj.constructor && typeof obj.constructor.isBuffer === 'function' && obj.constructor.isBuffer(obj)
}

// For Node v0.10 support. Remove this eventually.
function isSlowBuffer (obj) {
  return typeof obj.readFloatLE === 'function' && typeof obj.slice === 'function' && isFastBuffer(obj.slice(0, 0))
}

// in browsers, use buffer-es6 instead of node's buffer
// import { Buffer } from "buffer-es6";

function GeosGeomToWKB(geomPtr) {
  // create a pointer that stores the GEOSGeomToWKB_buf length 
  const wkbPtrLength = GEOSFunctions.Module._malloc(4);
  // set it to 0
  GEOSFunctions.Module.setValue(wkbPtrLength, 0, 'i32');
  // get the wkbPtr and store its length in wkbPtrLength
  const wkbPtr = GEOSFunctions.GEOSGeomToWKB_buf(geomPtr, wkbPtrLength);
  // get the actual length from wkbPtrLength
  const size = GEOSFunctions.Module.getValue(wkbPtrLength, 'i32');
  // create a Uint8Array from the wkbPtr and the size
  const wkbView = new Uint8Array(
    GEOSFunctions.Module.HEAPU8.buffer,
    wkbPtr,
    size
  );    
  const wkb = new Uint8Array(wkbView);
  
  // free the memory
  GEOSFunctions.GEOSFree(wkbPtr);
  GEOSFunctions.GEOSFree(wkbPtrLength);
  const buffer = Buffer.from(wkb);
  return buffer;
}

function GEOSGeomFromWKB(wkb) {
  const wkbPtr = GEOSFunctions.Module._malloc(wkb.length);
  GEOSFunctions.Module.HEAPU8.set(wkb, wkbPtr);
  const geomPtr = GEOSFunctions.GEOSGeomFromWKB_buf(wkbPtr, wkb.length);
  GEOSFunctions.GEOSFree(wkbPtr);
  // GEOSFunctions.Module._free(wkbPtr);
  return geomPtr;
}

/**
 * @module helpers
 */
/**
 * Earth Radius used with the Harvesine formula and approximates using a spherical (non-ellipsoid) Earth.
 *
 * @memberof helpers
 * @type {number}
 */
var earthRadius = 6371008.8;
/**
 * Unit of measurement factors using a spherical (non-ellipsoid) earth radius.
 *
 * @memberof helpers
 * @type {Object}
 */
var factors = {
    centimeters: earthRadius * 100,
    centimetres: earthRadius * 100,
    degrees: earthRadius / 111325,
    feet: earthRadius * 3.28084,
    inches: earthRadius * 39.37,
    kilometers: earthRadius / 1000,
    kilometres: earthRadius / 1000,
    meters: earthRadius,
    metres: earthRadius,
    miles: earthRadius / 1609.344,
    millimeters: earthRadius * 1000,
    millimetres: earthRadius * 1000,
    nauticalmiles: earthRadius / 1852,
    radians: 1,
    yards: earthRadius * 1.0936,
};
/**
 * Wraps a GeoJSON {@link Geometry} in a GeoJSON {@link Feature}.
 *
 * @name feature
 * @param {Geometry} geometry input geometry
 * @param {Object} [properties={}] an Object of key-value pairs to add as properties
 * @param {Object} [options={}] Optional Parameters
 * @param {Array<number>} [options.bbox] Bounding Box Array [west, south, east, north] associated with the Feature
 * @param {string|number} [options.id] Identifier associated with the Feature
 * @returns {Feature} a GeoJSON Feature
 * @example
 * var geometry = {
 *   "type": "Point",
 *   "coordinates": [110, 50]
 * };
 *
 * var feature = turf.feature(geometry);
 *
 * //=feature
 */
function feature(geom, properties, options) {
    if (options === void 0) { options = {}; }
    var feat = { type: "Feature" };
    if (options.id === 0 || options.id) {
        feat.id = options.id;
    }
    if (options.bbox) {
        feat.bbox = options.bbox;
    }
    feat.properties = properties || {};
    feat.geometry = geom;
    return feat;
}
/**
 * Creates a {@link Point} {@link Feature} from a Position.
 *
 * @name point
 * @param {Array<number>} coordinates longitude, latitude position (each in decimal degrees)
 * @param {Object} [properties={}] an Object of key-value pairs to add as properties
 * @param {Object} [options={}] Optional Parameters
 * @param {Array<number>} [options.bbox] Bounding Box Array [west, south, east, north] associated with the Feature
 * @param {string|number} [options.id] Identifier associated with the Feature
 * @returns {Feature<Point>} a Point feature
 * @example
 * var point = turf.point([-75.343, 39.984]);
 *
 * //=point
 */
function point$1(coordinates, properties, options) {
    if (options === void 0) { options = {}; }
    if (!coordinates) {
        throw new Error("coordinates is required");
    }
    if (!Array.isArray(coordinates)) {
        throw new Error("coordinates must be an Array");
    }
    if (coordinates.length < 2) {
        throw new Error("coordinates must be at least 2 numbers long");
    }
    if (!isNumber$1(coordinates[0]) || !isNumber$1(coordinates[1])) {
        throw new Error("coordinates must contain numbers");
    }
    var geom = {
        type: "Point",
        coordinates: coordinates,
    };
    return feature(geom, properties, options);
}
/**
 * Takes one or more {@link Feature|Features} and creates a {@link FeatureCollection}.
 *
 * @name featureCollection
 * @param {Feature[]} features input features
 * @param {Object} [options={}] Optional Parameters
 * @param {Array<number>} [options.bbox] Bounding Box Array [west, south, east, north] associated with the Feature
 * @param {string|number} [options.id] Identifier associated with the Feature
 * @returns {FeatureCollection} FeatureCollection of Features
 * @example
 * var locationA = turf.point([-75.343, 39.984], {name: 'Location A'});
 * var locationB = turf.point([-75.833, 39.284], {name: 'Location B'});
 * var locationC = turf.point([-75.534, 39.123], {name: 'Location C'});
 *
 * var collection = turf.featureCollection([
 *   locationA,
 *   locationB,
 *   locationC
 * ]);
 *
 * //=collection
 */
function featureCollection(features, options) {
    if (options === void 0) { options = {}; }
    var fc = { type: "FeatureCollection" };
    if (options.id) {
        fc.id = options.id;
    }
    if (options.bbox) {
        fc.bbox = options.bbox;
    }
    fc.features = features;
    return fc;
}
/**
 * Convert a distance measurement (assuming a spherical Earth) from radians to a more friendly unit.
 * Valid units: miles, nauticalmiles, inches, yards, meters, metres, kilometers, centimeters, feet
 *
 * @name radiansToLength
 * @param {number} radians in radians across the sphere
 * @param {string} [units="kilometers"] can be degrees, radians, miles, inches, yards, metres,
 * meters, kilometres, kilometers.
 * @returns {number} distance
 */
function radiansToLength(radians, units) {
    if (units === void 0) { units = "kilometers"; }
    var factor = factors[units];
    if (!factor) {
        throw new Error(units + " units is invalid");
    }
    return radians * factor;
}
/**
 * Convert a distance measurement (assuming a spherical Earth) from a real-world unit into radians
 * Valid units: miles, nauticalmiles, inches, yards, meters, metres, kilometers, centimeters, feet
 *
 * @name lengthToRadians
 * @param {number} distance in real units
 * @param {string} [units="kilometers"] can be degrees, radians, miles, inches, yards, metres,
 * meters, kilometres, kilometers.
 * @returns {number} radians
 */
function lengthToRadians(distance, units) {
    if (units === void 0) { units = "kilometers"; }
    var factor = factors[units];
    if (!factor) {
        throw new Error(units + " units is invalid");
    }
    return distance / factor;
}
/**
 * isNumber
 *
 * @param {*} num Number to validate
 * @returns {boolean} true/false
 * @example
 * turf.isNumber(123)
 * //=true
 * turf.isNumber('foo')
 * //=false
 */
function isNumber$1(num) {
    return !isNaN(num) && num !== null && !Array.isArray(num);
}

/**
 * Callback for coordEach
 *
 * @callback coordEachCallback
 * @param {Array<number>} currentCoord The current coordinate being processed.
 * @param {number} coordIndex The current index of the coordinate being processed.
 * @param {number} featureIndex The current index of the Feature being processed.
 * @param {number} multiFeatureIndex The current index of the Multi-Feature being processed.
 * @param {number} geometryIndex The current index of the Geometry being processed.
 */

/**
 * Iterate over coordinates in any GeoJSON object, similar to Array.forEach()
 *
 * @name coordEach
 * @param {FeatureCollection|Feature|Geometry} geojson any GeoJSON object
 * @param {Function} callback a method that takes (currentCoord, coordIndex, featureIndex, multiFeatureIndex)
 * @param {boolean} [excludeWrapCoord=false] whether or not to include the final coordinate of LinearRings that wraps the ring in its iteration.
 * @returns {void}
 * @example
 * var features = turf.featureCollection([
 *   turf.point([26, 37], {"foo": "bar"}),
 *   turf.point([36, 53], {"hello": "world"})
 * ]);
 *
 * turf.coordEach(features, function (currentCoord, coordIndex, featureIndex, multiFeatureIndex, geometryIndex) {
 *   //=currentCoord
 *   //=coordIndex
 *   //=featureIndex
 *   //=multiFeatureIndex
 *   //=geometryIndex
 * });
 */
function coordEach(geojson, callback, excludeWrapCoord) {
  // Handles null Geometry -- Skips this GeoJSON
  if (geojson === null) return;
  var j,
    k,
    l,
    geometry,
    stopG,
    coords,
    geometryMaybeCollection,
    wrapShrink = 0,
    coordIndex = 0,
    isGeometryCollection,
    type = geojson.type,
    isFeatureCollection = type === "FeatureCollection",
    isFeature = type === "Feature",
    stop = isFeatureCollection ? geojson.features.length : 1;

  // This logic may look a little weird. The reason why it is that way
  // is because it's trying to be fast. GeoJSON supports multiple kinds
  // of objects at its root: FeatureCollection, Features, Geometries.
  // This function has the responsibility of handling all of them, and that
  // means that some of the `for` loops you see below actually just don't apply
  // to certain inputs. For instance, if you give this just a
  // Point geometry, then both loops are short-circuited and all we do
  // is gradually rename the input until it's called 'geometry'.
  //
  // This also aims to allocate as few resources as possible: just a
  // few numbers and booleans, rather than any temporary arrays as would
  // be required with the normalization approach.
  for (var featureIndex = 0; featureIndex < stop; featureIndex++) {
    geometryMaybeCollection = isFeatureCollection
      ? geojson.features[featureIndex].geometry
      : isFeature
      ? geojson.geometry
      : geojson;
    isGeometryCollection = geometryMaybeCollection
      ? geometryMaybeCollection.type === "GeometryCollection"
      : false;
    stopG = isGeometryCollection
      ? geometryMaybeCollection.geometries.length
      : 1;

    for (var geomIndex = 0; geomIndex < stopG; geomIndex++) {
      var multiFeatureIndex = 0;
      var geometryIndex = 0;
      geometry = isGeometryCollection
        ? geometryMaybeCollection.geometries[geomIndex]
        : geometryMaybeCollection;

      // Handles null Geometry -- Skips this geometry
      if (geometry === null) continue;
      coords = geometry.coordinates;
      var geomType = geometry.type;

      wrapShrink =
        excludeWrapCoord &&
        (geomType === "Polygon" || geomType === "MultiPolygon")
          ? 1
          : 0;

      switch (geomType) {
        case null:
          break;
        case "Point":
          if (
            callback(
              coords,
              coordIndex,
              featureIndex,
              multiFeatureIndex,
              geometryIndex
            ) === false
          )
            return false;
          coordIndex++;
          multiFeatureIndex++;
          break;
        case "LineString":
        case "MultiPoint":
          for (j = 0; j < coords.length; j++) {
            if (
              callback(
                coords[j],
                coordIndex,
                featureIndex,
                multiFeatureIndex,
                geometryIndex
              ) === false
            )
              return false;
            coordIndex++;
            if (geomType === "MultiPoint") multiFeatureIndex++;
          }
          if (geomType === "LineString") multiFeatureIndex++;
          break;
        case "Polygon":
        case "MultiLineString":
          for (j = 0; j < coords.length; j++) {
            for (k = 0; k < coords[j].length - wrapShrink; k++) {
              if (
                callback(
                  coords[j][k],
                  coordIndex,
                  featureIndex,
                  multiFeatureIndex,
                  geometryIndex
                ) === false
              )
                return false;
              coordIndex++;
            }
            if (geomType === "MultiLineString") multiFeatureIndex++;
            if (geomType === "Polygon") geometryIndex++;
          }
          if (geomType === "Polygon") multiFeatureIndex++;
          break;
        case "MultiPolygon":
          for (j = 0; j < coords.length; j++) {
            geometryIndex = 0;
            for (k = 0; k < coords[j].length; k++) {
              for (l = 0; l < coords[j][k].length - wrapShrink; l++) {
                if (
                  callback(
                    coords[j][k][l],
                    coordIndex,
                    featureIndex,
                    multiFeatureIndex,
                    geometryIndex
                  ) === false
                )
                  return false;
                coordIndex++;
              }
              geometryIndex++;
            }
            multiFeatureIndex++;
          }
          break;
        case "GeometryCollection":
          for (j = 0; j < geometry.geometries.length; j++)
            if (
              coordEach(geometry.geometries[j], callback, excludeWrapCoord) ===
              false
            )
              return false;
          break;
        default:
          throw new Error("Unknown Geometry Type");
      }
    }
  }
}

/**
 * Callback for featureEach
 *
 * @callback featureEachCallback
 * @param {Feature<any>} currentFeature The current Feature being processed.
 * @param {number} featureIndex The current index of the Feature being processed.
 */

/**
 * Iterate over features in any GeoJSON object, similar to
 * Array.forEach.
 *
 * @name featureEach
 * @param {FeatureCollection|Feature|Geometry} geojson any GeoJSON object
 * @param {Function} callback a method that takes (currentFeature, featureIndex)
 * @returns {void}
 * @example
 * var features = turf.featureCollection([
 *   turf.point([26, 37], {foo: 'bar'}),
 *   turf.point([36, 53], {hello: 'world'})
 * ]);
 *
 * turf.featureEach(features, function (currentFeature, featureIndex) {
 *   //=currentFeature
 *   //=featureIndex
 * });
 */
function featureEach(geojson, callback) {
  if (geojson.type === "Feature") {
    callback(geojson, 0);
  } else if (geojson.type === "FeatureCollection") {
    for (var i = 0; i < geojson.features.length; i++) {
      if (callback(geojson.features[i], i) === false) break;
    }
  }
}

/**
 * Callback for geomEach
 *
 * @callback geomEachCallback
 * @param {Geometry} currentGeometry The current Geometry being processed.
 * @param {number} featureIndex The current index of the Feature being processed.
 * @param {Object} featureProperties The current Feature Properties being processed.
 * @param {Array<number>} featureBBox The current Feature BBox being processed.
 * @param {number|string} featureId The current Feature Id being processed.
 */

/**
 * Iterate over each geometry in any GeoJSON object, similar to Array.forEach()
 *
 * @name geomEach
 * @param {FeatureCollection|Feature|Geometry} geojson any GeoJSON object
 * @param {Function} callback a method that takes (currentGeometry, featureIndex, featureProperties, featureBBox, featureId)
 * @returns {void}
 * @example
 * var features = turf.featureCollection([
 *     turf.point([26, 37], {foo: 'bar'}),
 *     turf.point([36, 53], {hello: 'world'})
 * ]);
 *
 * turf.geomEach(features, function (currentGeometry, featureIndex, featureProperties, featureBBox, featureId) {
 *   //=currentGeometry
 *   //=featureIndex
 *   //=featureProperties
 *   //=featureBBox
 *   //=featureId
 * });
 */
function geomEach(geojson, callback) {
  var i,
    j,
    g,
    geometry,
    stopG,
    geometryMaybeCollection,
    isGeometryCollection,
    featureProperties,
    featureBBox,
    featureId,
    featureIndex = 0,
    isFeatureCollection = geojson.type === "FeatureCollection",
    isFeature = geojson.type === "Feature",
    stop = isFeatureCollection ? geojson.features.length : 1;

  // This logic may look a little weird. The reason why it is that way
  // is because it's trying to be fast. GeoJSON supports multiple kinds
  // of objects at its root: FeatureCollection, Features, Geometries.
  // This function has the responsibility of handling all of them, and that
  // means that some of the `for` loops you see below actually just don't apply
  // to certain inputs. For instance, if you give this just a
  // Point geometry, then both loops are short-circuited and all we do
  // is gradually rename the input until it's called 'geometry'.
  //
  // This also aims to allocate as few resources as possible: just a
  // few numbers and booleans, rather than any temporary arrays as would
  // be required with the normalization approach.
  for (i = 0; i < stop; i++) {
    geometryMaybeCollection = isFeatureCollection
      ? geojson.features[i].geometry
      : isFeature
      ? geojson.geometry
      : geojson;
    featureProperties = isFeatureCollection
      ? geojson.features[i].properties
      : isFeature
      ? geojson.properties
      : {};
    featureBBox = isFeatureCollection
      ? geojson.features[i].bbox
      : isFeature
      ? geojson.bbox
      : undefined;
    featureId = isFeatureCollection
      ? geojson.features[i].id
      : isFeature
      ? geojson.id
      : undefined;
    isGeometryCollection = geometryMaybeCollection
      ? geometryMaybeCollection.type === "GeometryCollection"
      : false;
    stopG = isGeometryCollection
      ? geometryMaybeCollection.geometries.length
      : 1;

    for (g = 0; g < stopG; g++) {
      geometry = isGeometryCollection
        ? geometryMaybeCollection.geometries[g]
        : geometryMaybeCollection;

      // Handle null Geometry
      if (geometry === null) {
        if (
          callback(
            null,
            featureIndex,
            featureProperties,
            featureBBox,
            featureId
          ) === false
        )
          return false;
        continue;
      }
      switch (geometry.type) {
        case "Point":
        case "LineString":
        case "MultiPoint":
        case "Polygon":
        case "MultiLineString":
        case "MultiPolygon": {
          if (
            callback(
              geometry,
              featureIndex,
              featureProperties,
              featureBBox,
              featureId
            ) === false
          )
            return false;
          break;
        }
        case "GeometryCollection": {
          for (j = 0; j < geometry.geometries.length; j++) {
            if (
              callback(
                geometry.geometries[j],
                featureIndex,
                featureProperties,
                featureBBox,
                featureId
              ) === false
            )
              return false;
          }
          break;
        }
        default:
          throw new Error("Unknown Geometry Type");
      }
    }
    // Only increase `featureIndex` per each feature
    featureIndex++;
  }
}

/**
 * Takes a set of features, calculates the bbox of all input features, and returns a bounding box.
 *
 * @name bbox
 * @param {GeoJSON} geojson any GeoJSON object
 * @returns {BBox} bbox extent in [minX, minY, maxX, maxY] order
 * @example
 * var line = turf.lineString([[-74, 40], [-78, 42], [-82, 35]]);
 * var bbox = turf.bbox(line);
 * var bboxPolygon = turf.bboxPolygon(bbox);
 *
 * //addToMap
 * var addToMap = [line, bboxPolygon]
 */
function bbox(geojson) {
    var result = [Infinity, Infinity, -Infinity, -Infinity];
    coordEach(geojson, function (coord) {
        if (result[0] > coord[0]) {
            result[0] = coord[0];
        }
        if (result[1] > coord[1]) {
            result[1] = coord[1];
        }
        if (result[2] < coord[0]) {
            result[2] = coord[0];
        }
        if (result[3] < coord[1]) {
            result[3] = coord[1];
        }
    });
    return result;
}
bbox["default"] = bbox;

/**
 * Takes a {@link Feature} or {@link FeatureCollection} and returns the absolute center point of all features.
 *
 * @name center
 * @param {GeoJSON} geojson GeoJSON to be centered
 * @param {Object} [options={}] Optional parameters
 * @param {Object} [options.properties={}] Translate GeoJSON Properties to Point
 * @param {Object} [options.bbox={}] Translate GeoJSON BBox to Point
 * @param {Object} [options.id={}] Translate GeoJSON Id to Point
 * @returns {Feature<Point>} a Point feature at the absolute center point of all input features
 * @example
 * var features = turf.points([
 *   [-97.522259, 35.4691],
 *   [-97.502754, 35.463455],
 *   [-97.508269, 35.463245]
 * ]);
 *
 * var center = turf.center(features);
 *
 * //addToMap
 * var addToMap = [features, center]
 * center.properties['marker-size'] = 'large';
 * center.properties['marker-color'] = '#000';
 */
function center(geojson, options) {
    if (options === void 0) { options = {}; }
    var ext = bbox(geojson);
    var x = (ext[0] + ext[2]) / 2;
    var y = (ext[1] + ext[3]) / 2;
    return point$1([x, y], options.properties, options);
}

// https://github.com/python/cpython/blob/a74eea238f5baba15797e2e8b570d153bc8690a7/Modules/mathmodule.c#L1423
class Adder {
  constructor() {
    this._partials = new Float64Array(32);
    this._n = 0;
  }
  add(x) {
    const p = this._partials;
    let i = 0;
    for (let j = 0; j < this._n && j < 32; j++) {
      const y = p[j],
        hi = x + y,
        lo = Math.abs(x) < Math.abs(y) ? x - (hi - y) : y - (hi - x);
      if (lo) p[i++] = lo;
      x = hi;
    }
    p[i] = x;
    this._n = i + 1;
    return this;
  }
  valueOf() {
    const p = this._partials;
    let n = this._n, x, y, lo, hi = 0;
    if (n > 0) {
      hi = p[--n];
      while (n > 0) {
        x = hi;
        y = p[--n];
        hi = x + y;
        lo = y - (hi - x);
        if (lo) break;
      }
      if (n > 0 && ((lo < 0 && p[n - 1] < 0) || (lo > 0 && p[n - 1] > 0))) {
        y = lo * 2;
        x = hi + y;
        if (y == x - hi) hi = x;
      }
    }
    return hi;
  }
}

function* flatten(arrays) {
  for (const array of arrays) {
    yield* array;
  }
}

function merge(arrays) {
  return Array.from(flatten(arrays));
}

var epsilon = 1e-6;
var epsilon2 = 1e-12;
var pi = Math.PI;
var halfPi = pi / 2;
var quarterPi = pi / 4;
var tau = pi * 2;

var degrees = 180 / pi;
var radians = pi / 180;

var abs = Math.abs;
var atan = Math.atan;
var atan2 = Math.atan2;
var cos = Math.cos;
var sin = Math.sin;
var sign = Math.sign || function(x) { return x > 0 ? 1 : x < 0 ? -1 : 0; };
var sqrt = Math.sqrt;

function acos(x) {
  return x > 1 ? 0 : x < -1 ? pi : Math.acos(x);
}

function asin(x) {
  return x > 1 ? halfPi : x < -1 ? -halfPi : Math.asin(x);
}

function noop$1() {}

function streamGeometry(geometry, stream) {
  if (geometry && streamGeometryType.hasOwnProperty(geometry.type)) {
    streamGeometryType[geometry.type](geometry, stream);
  }
}

var streamObjectType = {
  Feature: function(object, stream) {
    streamGeometry(object.geometry, stream);
  },
  FeatureCollection: function(object, stream) {
    var features = object.features, i = -1, n = features.length;
    while (++i < n) streamGeometry(features[i].geometry, stream);
  }
};

var streamGeometryType = {
  Sphere: function(object, stream) {
    stream.sphere();
  },
  Point: function(object, stream) {
    object = object.coordinates;
    stream.point(object[0], object[1], object[2]);
  },
  MultiPoint: function(object, stream) {
    var coordinates = object.coordinates, i = -1, n = coordinates.length;
    while (++i < n) object = coordinates[i], stream.point(object[0], object[1], object[2]);
  },
  LineString: function(object, stream) {
    streamLine(object.coordinates, stream, 0);
  },
  MultiLineString: function(object, stream) {
    var coordinates = object.coordinates, i = -1, n = coordinates.length;
    while (++i < n) streamLine(coordinates[i], stream, 0);
  },
  Polygon: function(object, stream) {
    streamPolygon(object.coordinates, stream);
  },
  MultiPolygon: function(object, stream) {
    var coordinates = object.coordinates, i = -1, n = coordinates.length;
    while (++i < n) streamPolygon(coordinates[i], stream);
  },
  GeometryCollection: function(object, stream) {
    var geometries = object.geometries, i = -1, n = geometries.length;
    while (++i < n) streamGeometry(geometries[i], stream);
  }
};

function streamLine(coordinates, stream, closed) {
  var i = -1, n = coordinates.length - closed, coordinate;
  stream.lineStart();
  while (++i < n) coordinate = coordinates[i], stream.point(coordinate[0], coordinate[1], coordinate[2]);
  stream.lineEnd();
}

function streamPolygon(coordinates, stream) {
  var i = -1, n = coordinates.length;
  stream.polygonStart();
  while (++i < n) streamLine(coordinates[i], stream, 1);
  stream.polygonEnd();
}

function geoStream(object, stream) {
  if (object && streamObjectType.hasOwnProperty(object.type)) {
    streamObjectType[object.type](object, stream);
  } else {
    streamGeometry(object, stream);
  }
}

function spherical(cartesian) {
  return [atan2(cartesian[1], cartesian[0]), asin(cartesian[2])];
}

function cartesian(spherical) {
  var lambda = spherical[0], phi = spherical[1], cosPhi = cos(phi);
  return [cosPhi * cos(lambda), cosPhi * sin(lambda), sin(phi)];
}

function cartesianDot(a, b) {
  return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
}

function cartesianCross(a, b) {
  return [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
}

// TODO return a
function cartesianAddInPlace(a, b) {
  a[0] += b[0], a[1] += b[1], a[2] += b[2];
}

function cartesianScale(vector, k) {
  return [vector[0] * k, vector[1] * k, vector[2] * k];
}

// TODO return d
function cartesianNormalizeInPlace(d) {
  var l = sqrt(d[0] * d[0] + d[1] * d[1] + d[2] * d[2]);
  d[0] /= l, d[1] /= l, d[2] /= l;
}

function compose(a, b) {

  function compose(x, y) {
    return x = a(x, y), b(x[0], x[1]);
  }

  if (a.invert && b.invert) compose.invert = function(x, y) {
    return x = b.invert(x, y), x && a.invert(x[0], x[1]);
  };

  return compose;
}

function rotationIdentity(lambda, phi) {
  if (abs(lambda) > pi) lambda -= Math.round(lambda / tau) * tau;
  return [lambda, phi];
}

rotationIdentity.invert = rotationIdentity;

function rotateRadians(deltaLambda, deltaPhi, deltaGamma) {
  return (deltaLambda %= tau) ? (deltaPhi || deltaGamma ? compose(rotationLambda(deltaLambda), rotationPhiGamma(deltaPhi, deltaGamma))
    : rotationLambda(deltaLambda))
    : (deltaPhi || deltaGamma ? rotationPhiGamma(deltaPhi, deltaGamma)
    : rotationIdentity);
}

function forwardRotationLambda(deltaLambda) {
  return function(lambda, phi) {
    lambda += deltaLambda;
    if (abs(lambda) > pi) lambda -= Math.round(lambda / tau) * tau;
    return [lambda, phi];
  };
}

function rotationLambda(deltaLambda) {
  var rotation = forwardRotationLambda(deltaLambda);
  rotation.invert = forwardRotationLambda(-deltaLambda);
  return rotation;
}

function rotationPhiGamma(deltaPhi, deltaGamma) {
  var cosDeltaPhi = cos(deltaPhi),
      sinDeltaPhi = sin(deltaPhi),
      cosDeltaGamma = cos(deltaGamma),
      sinDeltaGamma = sin(deltaGamma);

  function rotation(lambda, phi) {
    var cosPhi = cos(phi),
        x = cos(lambda) * cosPhi,
        y = sin(lambda) * cosPhi,
        z = sin(phi),
        k = z * cosDeltaPhi + x * sinDeltaPhi;
    return [
      atan2(y * cosDeltaGamma - k * sinDeltaGamma, x * cosDeltaPhi - z * sinDeltaPhi),
      asin(k * cosDeltaGamma + y * sinDeltaGamma)
    ];
  }

  rotation.invert = function(lambda, phi) {
    var cosPhi = cos(phi),
        x = cos(lambda) * cosPhi,
        y = sin(lambda) * cosPhi,
        z = sin(phi),
        k = z * cosDeltaGamma - y * sinDeltaGamma;
    return [
      atan2(y * cosDeltaGamma + z * sinDeltaGamma, x * cosDeltaPhi + k * sinDeltaPhi),
      asin(k * cosDeltaPhi - x * sinDeltaPhi)
    ];
  };

  return rotation;
}

// Generates a circle centered at [0°, 0°], with a given radius and precision.
function circleStream(stream, radius, delta, direction, t0, t1) {
  if (!delta) return;
  var cosRadius = cos(radius),
      sinRadius = sin(radius),
      step = direction * delta;
  if (t0 == null) {
    t0 = radius + direction * tau;
    t1 = radius - step / 2;
  } else {
    t0 = circleRadius(cosRadius, t0);
    t1 = circleRadius(cosRadius, t1);
    if (direction > 0 ? t0 < t1 : t0 > t1) t0 += direction * tau;
  }
  for (var point, t = t0; direction > 0 ? t > t1 : t < t1; t -= step) {
    point = spherical([cosRadius, -sinRadius * cos(t), -sinRadius * sin(t)]);
    stream.point(point[0], point[1]);
  }
}

// Returns the signed angle of a cartesian point relative to [cosRadius, 0, 0].
function circleRadius(cosRadius, point) {
  point = cartesian(point), point[0] -= cosRadius;
  cartesianNormalizeInPlace(point);
  var radius = acos(-point[1]);
  return ((-point[2] < 0 ? -radius : radius) + tau - epsilon) % tau;
}

function clipBuffer() {
  var lines = [],
      line;
  return {
    point: function(x, y, m) {
      line.push([x, y, m]);
    },
    lineStart: function() {
      lines.push(line = []);
    },
    lineEnd: noop$1,
    rejoin: function() {
      if (lines.length > 1) lines.push(lines.pop().concat(lines.shift()));
    },
    result: function() {
      var result = lines;
      lines = [];
      line = null;
      return result;
    }
  };
}

function pointEqual(a, b) {
  return abs(a[0] - b[0]) < epsilon && abs(a[1] - b[1]) < epsilon;
}

function Intersection(point, points, other, entry) {
  this.x = point;
  this.z = points;
  this.o = other; // another intersection
  this.e = entry; // is an entry?
  this.v = false; // visited
  this.n = this.p = null; // next & previous
}

// A generalized polygon clipping algorithm: given a polygon that has been cut
// into its visible line segments, and rejoins the segments by interpolating
// along the clip edge.
function clipRejoin(segments, compareIntersection, startInside, interpolate, stream) {
  var subject = [],
      clip = [],
      i,
      n;

  segments.forEach(function(segment) {
    if ((n = segment.length - 1) <= 0) return;
    var n, p0 = segment[0], p1 = segment[n], x;

    if (pointEqual(p0, p1)) {
      if (!p0[2] && !p1[2]) {
        stream.lineStart();
        for (i = 0; i < n; ++i) stream.point((p0 = segment[i])[0], p0[1]);
        stream.lineEnd();
        return;
      }
      // handle degenerate cases by moving the point
      p1[0] += 2 * epsilon;
    }

    subject.push(x = new Intersection(p0, segment, null, true));
    clip.push(x.o = new Intersection(p0, null, x, false));
    subject.push(x = new Intersection(p1, segment, null, false));
    clip.push(x.o = new Intersection(p1, null, x, true));
  });

  if (!subject.length) return;

  clip.sort(compareIntersection);
  link(subject);
  link(clip);

  for (i = 0, n = clip.length; i < n; ++i) {
    clip[i].e = startInside = !startInside;
  }

  var start = subject[0],
      points,
      point;

  while (1) {
    // Find first unvisited intersection.
    var current = start,
        isSubject = true;
    while (current.v) if ((current = current.n) === start) return;
    points = current.z;
    stream.lineStart();
    do {
      current.v = current.o.v = true;
      if (current.e) {
        if (isSubject) {
          for (i = 0, n = points.length; i < n; ++i) stream.point((point = points[i])[0], point[1]);
        } else {
          interpolate(current.x, current.n.x, 1, stream);
        }
        current = current.n;
      } else {
        if (isSubject) {
          points = current.p.z;
          for (i = points.length - 1; i >= 0; --i) stream.point((point = points[i])[0], point[1]);
        } else {
          interpolate(current.x, current.p.x, -1, stream);
        }
        current = current.p;
      }
      current = current.o;
      points = current.z;
      isSubject = !isSubject;
    } while (!current.v);
    stream.lineEnd();
  }
}

function link(array) {
  if (!(n = array.length)) return;
  var n,
      i = 0,
      a = array[0],
      b;
  while (++i < n) {
    a.n = b = array[i];
    b.p = a;
    a = b;
  }
  a.n = b = array[0];
  b.p = a;
}

function longitude(point) {
  return abs(point[0]) <= pi ? point[0] : sign(point[0]) * ((abs(point[0]) + pi) % tau - pi);
}

function polygonContains(polygon, point) {
  var lambda = longitude(point),
      phi = point[1],
      sinPhi = sin(phi),
      normal = [sin(lambda), -cos(lambda), 0],
      angle = 0,
      winding = 0;

  var sum = new Adder();

  if (sinPhi === 1) phi = halfPi + epsilon;
  else if (sinPhi === -1) phi = -halfPi - epsilon;

  for (var i = 0, n = polygon.length; i < n; ++i) {
    if (!(m = (ring = polygon[i]).length)) continue;
    var ring,
        m,
        point0 = ring[m - 1],
        lambda0 = longitude(point0),
        phi0 = point0[1] / 2 + quarterPi,
        sinPhi0 = sin(phi0),
        cosPhi0 = cos(phi0);

    for (var j = 0; j < m; ++j, lambda0 = lambda1, sinPhi0 = sinPhi1, cosPhi0 = cosPhi1, point0 = point1) {
      var point1 = ring[j],
          lambda1 = longitude(point1),
          phi1 = point1[1] / 2 + quarterPi,
          sinPhi1 = sin(phi1),
          cosPhi1 = cos(phi1),
          delta = lambda1 - lambda0,
          sign = delta >= 0 ? 1 : -1,
          absDelta = sign * delta,
          antimeridian = absDelta > pi,
          k = sinPhi0 * sinPhi1;

      sum.add(atan2(k * sign * sin(absDelta), cosPhi0 * cosPhi1 + k * cos(absDelta)));
      angle += antimeridian ? delta + sign * tau : delta;

      // Are the longitudes either side of the point’s meridian (lambda),
      // and are the latitudes smaller than the parallel (phi)?
      if (antimeridian ^ lambda0 >= lambda ^ lambda1 >= lambda) {
        var arc = cartesianCross(cartesian(point0), cartesian(point1));
        cartesianNormalizeInPlace(arc);
        var intersection = cartesianCross(normal, arc);
        cartesianNormalizeInPlace(intersection);
        var phiArc = (antimeridian ^ delta >= 0 ? -1 : 1) * asin(intersection[2]);
        if (phi > phiArc || phi === phiArc && (arc[0] || arc[1])) {
          winding += antimeridian ^ delta >= 0 ? 1 : -1;
        }
      }
    }
  }

  // First, determine whether the South pole is inside or outside:
  //
  // It is inside if:
  // * the polygon winds around it in a clockwise direction.
  // * the polygon does not (cumulatively) wind around it, but has a negative
  //   (counter-clockwise) area.
  //
  // Second, count the (signed) number of times a segment crosses a lambda
  // from the point to the South pole.  If it is zero, then the point is the
  // same side as the South pole.

  return (angle < -epsilon || angle < epsilon && sum < -epsilon2) ^ (winding & 1);
}

function clip(pointVisible, clipLine, interpolate, start) {
  return function(sink) {
    var line = clipLine(sink),
        ringBuffer = clipBuffer(),
        ringSink = clipLine(ringBuffer),
        polygonStarted = false,
        polygon,
        segments,
        ring;

    var clip = {
      point: point,
      lineStart: lineStart,
      lineEnd: lineEnd,
      polygonStart: function() {
        clip.point = pointRing;
        clip.lineStart = ringStart;
        clip.lineEnd = ringEnd;
        segments = [];
        polygon = [];
      },
      polygonEnd: function() {
        clip.point = point;
        clip.lineStart = lineStart;
        clip.lineEnd = lineEnd;
        segments = merge(segments);
        var startInside = polygonContains(polygon, start);
        if (segments.length) {
          if (!polygonStarted) sink.polygonStart(), polygonStarted = true;
          clipRejoin(segments, compareIntersection, startInside, interpolate, sink);
        } else if (startInside) {
          if (!polygonStarted) sink.polygonStart(), polygonStarted = true;
          sink.lineStart();
          interpolate(null, null, 1, sink);
          sink.lineEnd();
        }
        if (polygonStarted) sink.polygonEnd(), polygonStarted = false;
        segments = polygon = null;
      },
      sphere: function() {
        sink.polygonStart();
        sink.lineStart();
        interpolate(null, null, 1, sink);
        sink.lineEnd();
        sink.polygonEnd();
      }
    };

    function point(lambda, phi) {
      if (pointVisible(lambda, phi)) sink.point(lambda, phi);
    }

    function pointLine(lambda, phi) {
      line.point(lambda, phi);
    }

    function lineStart() {
      clip.point = pointLine;
      line.lineStart();
    }

    function lineEnd() {
      clip.point = point;
      line.lineEnd();
    }

    function pointRing(lambda, phi) {
      ring.push([lambda, phi]);
      ringSink.point(lambda, phi);
    }

    function ringStart() {
      ringSink.lineStart();
      ring = [];
    }

    function ringEnd() {
      pointRing(ring[0][0], ring[0][1]);
      ringSink.lineEnd();

      var clean = ringSink.clean(),
          ringSegments = ringBuffer.result(),
          i, n = ringSegments.length, m,
          segment,
          point;

      ring.pop();
      polygon.push(ring);
      ring = null;

      if (!n) return;

      // No intersections.
      if (clean & 1) {
        segment = ringSegments[0];
        if ((m = segment.length - 1) > 0) {
          if (!polygonStarted) sink.polygonStart(), polygonStarted = true;
          sink.lineStart();
          for (i = 0; i < m; ++i) sink.point((point = segment[i])[0], point[1]);
          sink.lineEnd();
        }
        return;
      }

      // Rejoin connected segments.
      // TODO reuse ringBuffer.rejoin()?
      if (n > 1 && clean & 2) ringSegments.push(ringSegments.pop().concat(ringSegments.shift()));

      segments.push(ringSegments.filter(validSegment));
    }

    return clip;
  };
}

function validSegment(segment) {
  return segment.length > 1;
}

// Intersections are sorted along the clip edge. For both antimeridian cutting
// and circle clipping, the same comparison is used.
function compareIntersection(a, b) {
  return ((a = a.x)[0] < 0 ? a[1] - halfPi - epsilon : halfPi - a[1])
       - ((b = b.x)[0] < 0 ? b[1] - halfPi - epsilon : halfPi - b[1]);
}

var clipAntimeridian = clip(
  function() { return true; },
  clipAntimeridianLine,
  clipAntimeridianInterpolate,
  [-pi, -halfPi]
);

// Takes a line and cuts into visible segments. Return values: 0 - there were
// intersections or the line was empty; 1 - no intersections; 2 - there were
// intersections, and the first and last segments should be rejoined.
function clipAntimeridianLine(stream) {
  var lambda0 = NaN,
      phi0 = NaN,
      sign0 = NaN,
      clean; // no intersections

  return {
    lineStart: function() {
      stream.lineStart();
      clean = 1;
    },
    point: function(lambda1, phi1) {
      var sign1 = lambda1 > 0 ? pi : -pi,
          delta = abs(lambda1 - lambda0);
      if (abs(delta - pi) < epsilon) { // line crosses a pole
        stream.point(lambda0, phi0 = (phi0 + phi1) / 2 > 0 ? halfPi : -halfPi);
        stream.point(sign0, phi0);
        stream.lineEnd();
        stream.lineStart();
        stream.point(sign1, phi0);
        stream.point(lambda1, phi0);
        clean = 0;
      } else if (sign0 !== sign1 && delta >= pi) { // line crosses antimeridian
        if (abs(lambda0 - sign0) < epsilon) lambda0 -= sign0 * epsilon; // handle degeneracies
        if (abs(lambda1 - sign1) < epsilon) lambda1 -= sign1 * epsilon;
        phi0 = clipAntimeridianIntersect(lambda0, phi0, lambda1, phi1);
        stream.point(sign0, phi0);
        stream.lineEnd();
        stream.lineStart();
        stream.point(sign1, phi0);
        clean = 0;
      }
      stream.point(lambda0 = lambda1, phi0 = phi1);
      sign0 = sign1;
    },
    lineEnd: function() {
      stream.lineEnd();
      lambda0 = phi0 = NaN;
    },
    clean: function() {
      return 2 - clean; // if intersections, rejoin first and last segments
    }
  };
}

function clipAntimeridianIntersect(lambda0, phi0, lambda1, phi1) {
  var cosPhi0,
      cosPhi1,
      sinLambda0Lambda1 = sin(lambda0 - lambda1);
  return abs(sinLambda0Lambda1) > epsilon
      ? atan((sin(phi0) * (cosPhi1 = cos(phi1)) * sin(lambda1)
          - sin(phi1) * (cosPhi0 = cos(phi0)) * sin(lambda0))
          / (cosPhi0 * cosPhi1 * sinLambda0Lambda1))
      : (phi0 + phi1) / 2;
}

function clipAntimeridianInterpolate(from, to, direction, stream) {
  var phi;
  if (from == null) {
    phi = direction * halfPi;
    stream.point(-pi, phi);
    stream.point(0, phi);
    stream.point(pi, phi);
    stream.point(pi, 0);
    stream.point(pi, -phi);
    stream.point(0, -phi);
    stream.point(-pi, -phi);
    stream.point(-pi, 0);
    stream.point(-pi, phi);
  } else if (abs(from[0] - to[0]) > epsilon) {
    var lambda = from[0] < to[0] ? pi : -pi;
    phi = direction * lambda / 2;
    stream.point(-lambda, phi);
    stream.point(0, phi);
    stream.point(lambda, phi);
  } else {
    stream.point(to[0], to[1]);
  }
}

function clipCircle(radius) {
  var cr = cos(radius),
      delta = 6 * radians,
      smallRadius = cr > 0,
      notHemisphere = abs(cr) > epsilon; // TODO optimise for this common case

  function interpolate(from, to, direction, stream) {
    circleStream(stream, radius, delta, direction, from, to);
  }

  function visible(lambda, phi) {
    return cos(lambda) * cos(phi) > cr;
  }

  // Takes a line and cuts into visible segments. Return values used for polygon
  // clipping: 0 - there were intersections or the line was empty; 1 - no
  // intersections 2 - there were intersections, and the first and last segments
  // should be rejoined.
  function clipLine(stream) {
    var point0, // previous point
        c0, // code for previous point
        v0, // visibility of previous point
        v00, // visibility of first point
        clean; // no intersections
    return {
      lineStart: function() {
        v00 = v0 = false;
        clean = 1;
      },
      point: function(lambda, phi) {
        var point1 = [lambda, phi],
            point2,
            v = visible(lambda, phi),
            c = smallRadius
              ? v ? 0 : code(lambda, phi)
              : v ? code(lambda + (lambda < 0 ? pi : -pi), phi) : 0;
        if (!point0 && (v00 = v0 = v)) stream.lineStart();
        if (v !== v0) {
          point2 = intersect(point0, point1);
          if (!point2 || pointEqual(point0, point2) || pointEqual(point1, point2))
            point1[2] = 1;
        }
        if (v !== v0) {
          clean = 0;
          if (v) {
            // outside going in
            stream.lineStart();
            point2 = intersect(point1, point0);
            stream.point(point2[0], point2[1]);
          } else {
            // inside going out
            point2 = intersect(point0, point1);
            stream.point(point2[0], point2[1], 2);
            stream.lineEnd();
          }
          point0 = point2;
        } else if (notHemisphere && point0 && smallRadius ^ v) {
          var t;
          // If the codes for two points are different, or are both zero,
          // and there this segment intersects with the small circle.
          if (!(c & c0) && (t = intersect(point1, point0, true))) {
            clean = 0;
            if (smallRadius) {
              stream.lineStart();
              stream.point(t[0][0], t[0][1]);
              stream.point(t[1][0], t[1][1]);
              stream.lineEnd();
            } else {
              stream.point(t[1][0], t[1][1]);
              stream.lineEnd();
              stream.lineStart();
              stream.point(t[0][0], t[0][1], 3);
            }
          }
        }
        if (v && (!point0 || !pointEqual(point0, point1))) {
          stream.point(point1[0], point1[1]);
        }
        point0 = point1, v0 = v, c0 = c;
      },
      lineEnd: function() {
        if (v0) stream.lineEnd();
        point0 = null;
      },
      // Rejoin first and last segments if there were intersections and the first
      // and last points were visible.
      clean: function() {
        return clean | ((v00 && v0) << 1);
      }
    };
  }

  // Intersects the great circle between a and b with the clip circle.
  function intersect(a, b, two) {
    var pa = cartesian(a),
        pb = cartesian(b);

    // We have two planes, n1.p = d1 and n2.p = d2.
    // Find intersection line p(t) = c1 n1 + c2 n2 + t (n1 ⨯ n2).
    var n1 = [1, 0, 0], // normal
        n2 = cartesianCross(pa, pb),
        n2n2 = cartesianDot(n2, n2),
        n1n2 = n2[0], // cartesianDot(n1, n2),
        determinant = n2n2 - n1n2 * n1n2;

    // Two polar points.
    if (!determinant) return !two && a;

    var c1 =  cr * n2n2 / determinant,
        c2 = -cr * n1n2 / determinant,
        n1xn2 = cartesianCross(n1, n2),
        A = cartesianScale(n1, c1),
        B = cartesianScale(n2, c2);
    cartesianAddInPlace(A, B);

    // Solve |p(t)|^2 = 1.
    var u = n1xn2,
        w = cartesianDot(A, u),
        uu = cartesianDot(u, u),
        t2 = w * w - uu * (cartesianDot(A, A) - 1);

    if (t2 < 0) return;

    var t = sqrt(t2),
        q = cartesianScale(u, (-w - t) / uu);
    cartesianAddInPlace(q, A);
    q = spherical(q);

    if (!two) return q;

    // Two intersection points.
    var lambda0 = a[0],
        lambda1 = b[0],
        phi0 = a[1],
        phi1 = b[1],
        z;

    if (lambda1 < lambda0) z = lambda0, lambda0 = lambda1, lambda1 = z;

    var delta = lambda1 - lambda0,
        polar = abs(delta - pi) < epsilon,
        meridian = polar || delta < epsilon;

    if (!polar && phi1 < phi0) z = phi0, phi0 = phi1, phi1 = z;

    // Check that the first point is between a and b.
    if (meridian
        ? polar
          ? phi0 + phi1 > 0 ^ q[1] < (abs(q[0] - lambda0) < epsilon ? phi0 : phi1)
          : phi0 <= q[1] && q[1] <= phi1
        : delta > pi ^ (lambda0 <= q[0] && q[0] <= lambda1)) {
      var q1 = cartesianScale(u, (-w + t) / uu);
      cartesianAddInPlace(q1, A);
      return [q, spherical(q1)];
    }
  }

  // Generates a 4-bit vector representing the location of a point relative to
  // the small circle's bounding box.
  function code(lambda, phi) {
    var r = smallRadius ? radius : pi - radius,
        code = 0;
    if (lambda < -r) code |= 1; // left
    else if (lambda > r) code |= 2; // right
    if (phi < -r) code |= 4; // below
    else if (phi > r) code |= 8; // above
    return code;
  }

  return clip(visible, clipLine, interpolate, smallRadius ? [0, -radius] : [-pi, radius - pi]);
}

function clipLine(a, b, x0, y0, x1, y1) {
  var ax = a[0],
      ay = a[1],
      bx = b[0],
      by = b[1],
      t0 = 0,
      t1 = 1,
      dx = bx - ax,
      dy = by - ay,
      r;

  r = x0 - ax;
  if (!dx && r > 0) return;
  r /= dx;
  if (dx < 0) {
    if (r < t0) return;
    if (r < t1) t1 = r;
  } else if (dx > 0) {
    if (r > t1) return;
    if (r > t0) t0 = r;
  }

  r = x1 - ax;
  if (!dx && r < 0) return;
  r /= dx;
  if (dx < 0) {
    if (r > t1) return;
    if (r > t0) t0 = r;
  } else if (dx > 0) {
    if (r < t0) return;
    if (r < t1) t1 = r;
  }

  r = y0 - ay;
  if (!dy && r > 0) return;
  r /= dy;
  if (dy < 0) {
    if (r < t0) return;
    if (r < t1) t1 = r;
  } else if (dy > 0) {
    if (r > t1) return;
    if (r > t0) t0 = r;
  }

  r = y1 - ay;
  if (!dy && r < 0) return;
  r /= dy;
  if (dy < 0) {
    if (r > t1) return;
    if (r > t0) t0 = r;
  } else if (dy > 0) {
    if (r < t0) return;
    if (r < t1) t1 = r;
  }

  if (t0 > 0) a[0] = ax + t0 * dx, a[1] = ay + t0 * dy;
  if (t1 < 1) b[0] = ax + t1 * dx, b[1] = ay + t1 * dy;
  return true;
}

var clipMax = 1e9, clipMin = -clipMax;

// TODO Use d3-polygon’s polygonContains here for the ring check?
// TODO Eliminate duplicate buffering in clipBuffer and polygon.push?

function clipRectangle(x0, y0, x1, y1) {

  function visible(x, y) {
    return x0 <= x && x <= x1 && y0 <= y && y <= y1;
  }

  function interpolate(from, to, direction, stream) {
    var a = 0, a1 = 0;
    if (from == null
        || (a = corner(from, direction)) !== (a1 = corner(to, direction))
        || comparePoint(from, to) < 0 ^ direction > 0) {
      do stream.point(a === 0 || a === 3 ? x0 : x1, a > 1 ? y1 : y0);
      while ((a = (a + direction + 4) % 4) !== a1);
    } else {
      stream.point(to[0], to[1]);
    }
  }

  function corner(p, direction) {
    return abs(p[0] - x0) < epsilon ? direction > 0 ? 0 : 3
        : abs(p[0] - x1) < epsilon ? direction > 0 ? 2 : 1
        : abs(p[1] - y0) < epsilon ? direction > 0 ? 1 : 0
        : direction > 0 ? 3 : 2; // abs(p[1] - y1) < epsilon
  }

  function compareIntersection(a, b) {
    return comparePoint(a.x, b.x);
  }

  function comparePoint(a, b) {
    var ca = corner(a, 1),
        cb = corner(b, 1);
    return ca !== cb ? ca - cb
        : ca === 0 ? b[1] - a[1]
        : ca === 1 ? a[0] - b[0]
        : ca === 2 ? a[1] - b[1]
        : b[0] - a[0];
  }

  return function(stream) {
    var activeStream = stream,
        bufferStream = clipBuffer(),
        segments,
        polygon,
        ring,
        x__, y__, v__, // first point
        x_, y_, v_, // previous point
        first,
        clean;

    var clipStream = {
      point: point,
      lineStart: lineStart,
      lineEnd: lineEnd,
      polygonStart: polygonStart,
      polygonEnd: polygonEnd
    };

    function point(x, y) {
      if (visible(x, y)) activeStream.point(x, y);
    }

    function polygonInside() {
      var winding = 0;

      for (var i = 0, n = polygon.length; i < n; ++i) {
        for (var ring = polygon[i], j = 1, m = ring.length, point = ring[0], a0, a1, b0 = point[0], b1 = point[1]; j < m; ++j) {
          a0 = b0, a1 = b1, point = ring[j], b0 = point[0], b1 = point[1];
          if (a1 <= y1) { if (b1 > y1 && (b0 - a0) * (y1 - a1) > (b1 - a1) * (x0 - a0)) ++winding; }
          else { if (b1 <= y1 && (b0 - a0) * (y1 - a1) < (b1 - a1) * (x0 - a0)) --winding; }
        }
      }

      return winding;
    }

    // Buffer geometry within a polygon and then clip it en masse.
    function polygonStart() {
      activeStream = bufferStream, segments = [], polygon = [], clean = true;
    }

    function polygonEnd() {
      var startInside = polygonInside(),
          cleanInside = clean && startInside,
          visible = (segments = merge(segments)).length;
      if (cleanInside || visible) {
        stream.polygonStart();
        if (cleanInside) {
          stream.lineStart();
          interpolate(null, null, 1, stream);
          stream.lineEnd();
        }
        if (visible) {
          clipRejoin(segments, compareIntersection, startInside, interpolate, stream);
        }
        stream.polygonEnd();
      }
      activeStream = stream, segments = polygon = ring = null;
    }

    function lineStart() {
      clipStream.point = linePoint;
      if (polygon) polygon.push(ring = []);
      first = true;
      v_ = false;
      x_ = y_ = NaN;
    }

    // TODO rather than special-case polygons, simply handle them separately.
    // Ideally, coincident intersection points should be jittered to avoid
    // clipping issues.
    function lineEnd() {
      if (segments) {
        linePoint(x__, y__);
        if (v__ && v_) bufferStream.rejoin();
        segments.push(bufferStream.result());
      }
      clipStream.point = point;
      if (v_) activeStream.lineEnd();
    }

    function linePoint(x, y) {
      var v = visible(x, y);
      if (polygon) ring.push([x, y]);
      if (first) {
        x__ = x, y__ = y, v__ = v;
        first = false;
        if (v) {
          activeStream.lineStart();
          activeStream.point(x, y);
        }
      } else {
        if (v && v_) activeStream.point(x, y);
        else {
          var a = [x_ = Math.max(clipMin, Math.min(clipMax, x_)), y_ = Math.max(clipMin, Math.min(clipMax, y_))],
              b = [x = Math.max(clipMin, Math.min(clipMax, x)), y = Math.max(clipMin, Math.min(clipMax, y))];
          if (clipLine(a, b, x0, y0, x1, y1)) {
            if (!v_) {
              activeStream.lineStart();
              activeStream.point(a[0], a[1]);
            }
            activeStream.point(b[0], b[1]);
            if (!v) activeStream.lineEnd();
            clean = false;
          } else if (v) {
            activeStream.lineStart();
            activeStream.point(x, y);
            clean = false;
          }
        }
      }
      x_ = x, y_ = y, v_ = v;
    }

    return clipStream;
  };
}

var identity = x => x;

var x0 = Infinity,
    y0 = x0,
    x1 = -x0,
    y1 = x1;

var boundsStream = {
  point: boundsPoint,
  lineStart: noop$1,
  lineEnd: noop$1,
  polygonStart: noop$1,
  polygonEnd: noop$1,
  result: function() {
    var bounds = [[x0, y0], [x1, y1]];
    x1 = y1 = -(y0 = x0 = Infinity);
    return bounds;
  }
};

function boundsPoint(x, y) {
  if (x < x0) x0 = x;
  if (x > x1) x1 = x;
  if (y < y0) y0 = y;
  if (y > y1) y1 = y;
}

var boundsStream$1 = boundsStream;

function transformer(methods) {
  return function(stream) {
    var s = new TransformStream;
    for (var key in methods) s[key] = methods[key];
    s.stream = stream;
    return s;
  };
}

function TransformStream() {}

TransformStream.prototype = {
  constructor: TransformStream,
  point: function(x, y) { this.stream.point(x, y); },
  sphere: function() { this.stream.sphere(); },
  lineStart: function() { this.stream.lineStart(); },
  lineEnd: function() { this.stream.lineEnd(); },
  polygonStart: function() { this.stream.polygonStart(); },
  polygonEnd: function() { this.stream.polygonEnd(); }
};

function fit(projection, fitBounds, object) {
  var clip = projection.clipExtent && projection.clipExtent();
  projection.scale(150).translate([0, 0]);
  if (clip != null) projection.clipExtent(null);
  geoStream(object, projection.stream(boundsStream$1));
  fitBounds(boundsStream$1.result());
  if (clip != null) projection.clipExtent(clip);
  return projection;
}

function fitExtent(projection, extent, object) {
  return fit(projection, function(b) {
    var w = extent[1][0] - extent[0][0],
        h = extent[1][1] - extent[0][1],
        k = Math.min(w / (b[1][0] - b[0][0]), h / (b[1][1] - b[0][1])),
        x = +extent[0][0] + (w - k * (b[1][0] + b[0][0])) / 2,
        y = +extent[0][1] + (h - k * (b[1][1] + b[0][1])) / 2;
    projection.scale(150 * k).translate([x, y]);
  }, object);
}

function fitSize(projection, size, object) {
  return fitExtent(projection, [[0, 0], size], object);
}

function fitWidth(projection, width, object) {
  return fit(projection, function(b) {
    var w = +width,
        k = w / (b[1][0] - b[0][0]),
        x = (w - k * (b[1][0] + b[0][0])) / 2,
        y = -k * b[0][1];
    projection.scale(150 * k).translate([x, y]);
  }, object);
}

function fitHeight(projection, height, object) {
  return fit(projection, function(b) {
    var h = +height,
        k = h / (b[1][1] - b[0][1]),
        x = -k * b[0][0],
        y = (h - k * (b[1][1] + b[0][1])) / 2;
    projection.scale(150 * k).translate([x, y]);
  }, object);
}

var maxDepth = 16, // maximum depth of subdivision
    cosMinDistance = cos(30 * radians); // cos(minimum angular distance)

function resample(project, delta2) {
  return +delta2 ? resample$1(project, delta2) : resampleNone(project);
}

function resampleNone(project) {
  return transformer({
    point: function(x, y) {
      x = project(x, y);
      this.stream.point(x[0], x[1]);
    }
  });
}

function resample$1(project, delta2) {

  function resampleLineTo(x0, y0, lambda0, a0, b0, c0, x1, y1, lambda1, a1, b1, c1, depth, stream) {
    var dx = x1 - x0,
        dy = y1 - y0,
        d2 = dx * dx + dy * dy;
    if (d2 > 4 * delta2 && depth--) {
      var a = a0 + a1,
          b = b0 + b1,
          c = c0 + c1,
          m = sqrt(a * a + b * b + c * c),
          phi2 = asin(c /= m),
          lambda2 = abs(abs(c) - 1) < epsilon || abs(lambda0 - lambda1) < epsilon ? (lambda0 + lambda1) / 2 : atan2(b, a),
          p = project(lambda2, phi2),
          x2 = p[0],
          y2 = p[1],
          dx2 = x2 - x0,
          dy2 = y2 - y0,
          dz = dy * dx2 - dx * dy2;
      if (dz * dz / d2 > delta2 // perpendicular projected distance
          || abs((dx * dx2 + dy * dy2) / d2 - 0.5) > 0.3 // midpoint close to an end
          || a0 * a1 + b0 * b1 + c0 * c1 < cosMinDistance) { // angular distance
        resampleLineTo(x0, y0, lambda0, a0, b0, c0, x2, y2, lambda2, a /= m, b /= m, c, depth, stream);
        stream.point(x2, y2);
        resampleLineTo(x2, y2, lambda2, a, b, c, x1, y1, lambda1, a1, b1, c1, depth, stream);
      }
    }
  }
  return function(stream) {
    var lambda00, x00, y00, a00, b00, c00, // first point
        lambda0, x0, y0, a0, b0, c0; // previous point

    var resampleStream = {
      point: point,
      lineStart: lineStart,
      lineEnd: lineEnd,
      polygonStart: function() { stream.polygonStart(); resampleStream.lineStart = ringStart; },
      polygonEnd: function() { stream.polygonEnd(); resampleStream.lineStart = lineStart; }
    };

    function point(x, y) {
      x = project(x, y);
      stream.point(x[0], x[1]);
    }

    function lineStart() {
      x0 = NaN;
      resampleStream.point = linePoint;
      stream.lineStart();
    }

    function linePoint(lambda, phi) {
      var c = cartesian([lambda, phi]), p = project(lambda, phi);
      resampleLineTo(x0, y0, lambda0, a0, b0, c0, x0 = p[0], y0 = p[1], lambda0 = lambda, a0 = c[0], b0 = c[1], c0 = c[2], maxDepth, stream);
      stream.point(x0, y0);
    }

    function lineEnd() {
      resampleStream.point = point;
      stream.lineEnd();
    }

    function ringStart() {
      lineStart();
      resampleStream.point = ringPoint;
      resampleStream.lineEnd = ringEnd;
    }

    function ringPoint(lambda, phi) {
      linePoint(lambda00 = lambda, phi), x00 = x0, y00 = y0, a00 = a0, b00 = b0, c00 = c0;
      resampleStream.point = linePoint;
    }

    function ringEnd() {
      resampleLineTo(x0, y0, lambda0, a0, b0, c0, x00, y00, lambda00, a00, b00, c00, maxDepth, stream);
      resampleStream.lineEnd = lineEnd;
      lineEnd();
    }

    return resampleStream;
  };
}

var transformRadians = transformer({
  point: function(x, y) {
    this.stream.point(x * radians, y * radians);
  }
});

function transformRotate(rotate) {
  return transformer({
    point: function(x, y) {
      var r = rotate(x, y);
      return this.stream.point(r[0], r[1]);
    }
  });
}

function scaleTranslate(k, dx, dy, sx, sy) {
  function transform(x, y) {
    x *= sx; y *= sy;
    return [dx + k * x, dy - k * y];
  }
  transform.invert = function(x, y) {
    return [(x - dx) / k * sx, (dy - y) / k * sy];
  };
  return transform;
}

function scaleTranslateRotate(k, dx, dy, sx, sy, alpha) {
  if (!alpha) return scaleTranslate(k, dx, dy, sx, sy);
  var cosAlpha = cos(alpha),
      sinAlpha = sin(alpha),
      a = cosAlpha * k,
      b = sinAlpha * k,
      ai = cosAlpha / k,
      bi = sinAlpha / k,
      ci = (sinAlpha * dy - cosAlpha * dx) / k,
      fi = (sinAlpha * dx + cosAlpha * dy) / k;
  function transform(x, y) {
    x *= sx; y *= sy;
    return [a * x - b * y + dx, dy - b * x - a * y];
  }
  transform.invert = function(x, y) {
    return [sx * (ai * x - bi * y + ci), sy * (fi - bi * x - ai * y)];
  };
  return transform;
}

function projection(project) {
  return projectionMutator(function() { return project; })();
}

function projectionMutator(projectAt) {
  var project,
      k = 150, // scale
      x = 480, y = 250, // translate
      lambda = 0, phi = 0, // center
      deltaLambda = 0, deltaPhi = 0, deltaGamma = 0, rotate, // pre-rotate
      alpha = 0, // post-rotate angle
      sx = 1, // reflectX
      sy = 1, // reflectX
      theta = null, preclip = clipAntimeridian, // pre-clip angle
      x0 = null, y0, x1, y1, postclip = identity, // post-clip extent
      delta2 = 0.5, // precision
      projectResample,
      projectTransform,
      projectRotateTransform,
      cache,
      cacheStream;

  function projection(point) {
    return projectRotateTransform(point[0] * radians, point[1] * radians);
  }

  function invert(point) {
    point = projectRotateTransform.invert(point[0], point[1]);
    return point && [point[0] * degrees, point[1] * degrees];
  }

  projection.stream = function(stream) {
    return cache && cacheStream === stream ? cache : cache = transformRadians(transformRotate(rotate)(preclip(projectResample(postclip(cacheStream = stream)))));
  };

  projection.preclip = function(_) {
    return arguments.length ? (preclip = _, theta = undefined, reset()) : preclip;
  };

  projection.postclip = function(_) {
    return arguments.length ? (postclip = _, x0 = y0 = x1 = y1 = null, reset()) : postclip;
  };

  projection.clipAngle = function(_) {
    return arguments.length ? (preclip = +_ ? clipCircle(theta = _ * radians) : (theta = null, clipAntimeridian), reset()) : theta * degrees;
  };

  projection.clipExtent = function(_) {
    return arguments.length ? (postclip = _ == null ? (x0 = y0 = x1 = y1 = null, identity) : clipRectangle(x0 = +_[0][0], y0 = +_[0][1], x1 = +_[1][0], y1 = +_[1][1]), reset()) : x0 == null ? null : [[x0, y0], [x1, y1]];
  };

  projection.scale = function(_) {
    return arguments.length ? (k = +_, recenter()) : k;
  };

  projection.translate = function(_) {
    return arguments.length ? (x = +_[0], y = +_[1], recenter()) : [x, y];
  };

  projection.center = function(_) {
    return arguments.length ? (lambda = _[0] % 360 * radians, phi = _[1] % 360 * radians, recenter()) : [lambda * degrees, phi * degrees];
  };

  projection.rotate = function(_) {
    return arguments.length ? (deltaLambda = _[0] % 360 * radians, deltaPhi = _[1] % 360 * radians, deltaGamma = _.length > 2 ? _[2] % 360 * radians : 0, recenter()) : [deltaLambda * degrees, deltaPhi * degrees, deltaGamma * degrees];
  };

  projection.angle = function(_) {
    return arguments.length ? (alpha = _ % 360 * radians, recenter()) : alpha * degrees;
  };

  projection.reflectX = function(_) {
    return arguments.length ? (sx = _ ? -1 : 1, recenter()) : sx < 0;
  };

  projection.reflectY = function(_) {
    return arguments.length ? (sy = _ ? -1 : 1, recenter()) : sy < 0;
  };

  projection.precision = function(_) {
    return arguments.length ? (projectResample = resample(projectTransform, delta2 = _ * _), reset()) : sqrt(delta2);
  };

  projection.fitExtent = function(extent, object) {
    return fitExtent(projection, extent, object);
  };

  projection.fitSize = function(size, object) {
    return fitSize(projection, size, object);
  };

  projection.fitWidth = function(width, object) {
    return fitWidth(projection, width, object);
  };

  projection.fitHeight = function(height, object) {
    return fitHeight(projection, height, object);
  };

  function recenter() {
    var center = scaleTranslateRotate(k, 0, 0, sx, sy, alpha).apply(null, project(lambda, phi)),
        transform = scaleTranslateRotate(k, x - center[0], y - center[1], sx, sy, alpha);
    rotate = rotateRadians(deltaLambda, deltaPhi, deltaGamma);
    projectTransform = compose(project, transform);
    projectRotateTransform = compose(rotate, projectTransform);
    projectResample = resample(projectTransform, delta2);
    return reset();
  }

  function reset() {
    cache = cacheStream = null;
    return projection;
  }

  return function() {
    project = projectAt.apply(this, arguments);
    projection.invert = project.invert && invert;
    return recenter();
  };
}

function azimuthalRaw(scale) {
  return function(x, y) {
    var cx = cos(x),
        cy = cos(y),
        k = scale(cx * cy);
        if (k === Infinity) return [2, 0];
    return [
      k * cy * sin(x),
      k * sin(y)
    ];
  }
}

function azimuthalInvert(angle) {
  return function(x, y) {
    var z = sqrt(x * x + y * y),
        c = angle(z),
        sc = sin(c),
        cc = cos(c);
    return [
      atan2(x * sc, z * cc),
      asin(z && y * sc / z)
    ];
  }
}

var azimuthalEquidistantRaw = azimuthalRaw(function(c) {
  return (c = acos(c)) && c / sin(c);
});

azimuthalEquidistantRaw.invert = azimuthalInvert(function(z) {
  return z;
});

function geoAzimuthalEquidistant() {
  return projection(azimuthalEquidistantRaw)
      .scale(79.4188)
      .clipAngle(180 - 1e-3);
}

var types = {
    wkt: {
        Point: 'POINT',
        LineString: 'LINESTRING',
        Polygon: 'POLYGON',
        MultiPoint: 'MULTIPOINT',
        MultiLineString: 'MULTILINESTRING',
        MultiPolygon: 'MULTIPOLYGON',
        GeometryCollection: 'GEOMETRYCOLLECTION'
    },
    wkb: {
        Point: 1,
        LineString: 2,
        Polygon: 3,
        MultiPoint: 4,
        MultiLineString: 5,
        MultiPolygon: 6,
        GeometryCollection: 7
    },
    geoJSON: {
        Point: 'Point',
        LineString: 'LineString',
        Polygon: 'Polygon',
        MultiPoint: 'MultiPoint',
        MultiLineString: 'MultiLineString',
        MultiPolygon: 'MultiPolygon',
        GeometryCollection: 'GeometryCollection'
    }
};

// shim for using process in browser
// based off https://github.com/defunctzombie/node-process/blob/master/browser.js

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
var cachedSetTimeout = defaultSetTimout;
var cachedClearTimeout = defaultClearTimeout;
if (typeof global$1.setTimeout === 'function') {
    cachedSetTimeout = setTimeout;
}
if (typeof global$1.clearTimeout === 'function') {
    cachedClearTimeout = clearTimeout;
}

function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}
function nextTick(fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
}
// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
var title = 'browser';
var platform = 'browser';
var browser = true;
var env = {};
var argv = [];
var version = ''; // empty string to avoid regexp issues
var versions = {};
var release = {};
var config = {};

function noop() {}

var on = noop;
var addListener = noop;
var once = noop;
var off = noop;
var removeListener = noop;
var removeAllListeners = noop;
var emit = noop;

function binding(name) {
    throw new Error('process.binding is not supported');
}

function cwd () { return '/' }
function chdir (dir) {
    throw new Error('process.chdir is not supported');
}function umask() { return 0; }

// from https://github.com/kumavis/browser-process-hrtime/blob/master/index.js
var performance = global$1.performance || {};
var performanceNow =
  performance.now        ||
  performance.mozNow     ||
  performance.msNow      ||
  performance.oNow       ||
  performance.webkitNow  ||
  function(){ return (new Date()).getTime() };

// generate timestamp or delta
// see http://nodejs.org/api/process.html#process_process_hrtime
function hrtime(previousTimestamp){
  var clocktime = performanceNow.call(performance)*1e-3;
  var seconds = Math.floor(clocktime);
  var nanoseconds = Math.floor((clocktime%1)*1e9);
  if (previousTimestamp) {
    seconds = seconds - previousTimestamp[0];
    nanoseconds = nanoseconds - previousTimestamp[1];
    if (nanoseconds<0) {
      seconds--;
      nanoseconds += 1e9;
    }
  }
  return [seconds,nanoseconds]
}

var startTime = new Date();
function uptime() {
  var currentTime = new Date();
  var dif = currentTime - startTime;
  return dif / 1000;
}

var browser$1 = {
  nextTick: nextTick,
  title: title,
  browser: browser,
  env: env,
  argv: argv,
  version: version,
  versions: versions,
  on: on,
  addListener: addListener,
  once: once,
  off: off,
  removeListener: removeListener,
  removeAllListeners: removeAllListeners,
  emit: emit,
  binding: binding,
  cwd: cwd,
  chdir: chdir,
  umask: umask,
  hrtime: hrtime,
  platform: platform,
  release: release,
  config: config,
  uptime: uptime
};

var inherits;
if (typeof Object.create === 'function'){
  inherits = function inherits(ctor, superCtor) {
    // implementation from standard node.js 'util' module
    ctor.super_ = superCtor;
    ctor.prototype = Object.create(superCtor.prototype, {
      constructor: {
        value: ctor,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
  };
} else {
  inherits = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor;
    var TempCtor = function () {};
    TempCtor.prototype = superCtor.prototype;
    ctor.prototype = new TempCtor();
    ctor.prototype.constructor = ctor;
  };
}
var inherits$1 = inherits;

var getOwnPropertyDescriptors = Object.getOwnPropertyDescriptors ||
  function getOwnPropertyDescriptors(obj) {
    var keys = Object.keys(obj);
    var descriptors = {};
    for (var i = 0; i < keys.length; i++) {
      descriptors[keys[i]] = Object.getOwnPropertyDescriptor(obj, keys[i]);
    }
    return descriptors;
  };

var formatRegExp = /%[sdj%]/g;
function format(f) {
  if (!isString(f)) {
    var objects = [];
    for (var i = 0; i < arguments.length; i++) {
      objects.push(inspect(arguments[i]));
    }
    return objects.join(' ');
  }

  var i = 1;
  var args = arguments;
  var len = args.length;
  var str = String(f).replace(formatRegExp, function(x) {
    if (x === '%%') return '%';
    if (i >= len) return x;
    switch (x) {
      case '%s': return String(args[i++]);
      case '%d': return Number(args[i++]);
      case '%j':
        try {
          return JSON.stringify(args[i++]);
        } catch (_) {
          return '[Circular]';
        }
      default:
        return x;
    }
  });
  for (var x = args[i]; i < len; x = args[++i]) {
    if (isNull(x) || !isObject(x)) {
      str += ' ' + x;
    } else {
      str += ' ' + inspect(x);
    }
  }
  return str;
}

// Mark that a method should not be used.
// Returns a modified function which warns once by default.
// If --no-deprecation is set, then it is a no-op.
function deprecate(fn, msg) {
  // Allow for deprecating things in the process of starting up.
  if (isUndefined(global$1.process)) {
    return function() {
      return deprecate(fn, msg).apply(this, arguments);
    };
  }

  if (browser$1.noDeprecation === true) {
    return fn;
  }

  var warned = false;
  function deprecated() {
    if (!warned) {
      if (browser$1.throwDeprecation) {
        throw new Error(msg);
      } else if (browser$1.traceDeprecation) {
        console.trace(msg);
      } else {
        console.error(msg);
      }
      warned = true;
    }
    return fn.apply(this, arguments);
  }

  return deprecated;
}

var debugs = {};
var debugEnviron;
function debuglog(set) {
  if (isUndefined(debugEnviron))
    debugEnviron = browser$1.env.NODE_DEBUG || '';
  set = set.toUpperCase();
  if (!debugs[set]) {
    if (new RegExp('\\b' + set + '\\b', 'i').test(debugEnviron)) {
      var pid = 0;
      debugs[set] = function() {
        var msg = format.apply(null, arguments);
        console.error('%s %d: %s', set, pid, msg);
      };
    } else {
      debugs[set] = function() {};
    }
  }
  return debugs[set];
}

/**
 * Echos the value of a value. Trys to print the value out
 * in the best way possible given the different types.
 *
 * @param {Object} obj The object to print out.
 * @param {Object} opts Optional options object that alters the output.
 */
/* legacy: obj, showHidden, depth, colors*/
function inspect(obj, opts) {
  // default options
  var ctx = {
    seen: [],
    stylize: stylizeNoColor
  };
  // legacy...
  if (arguments.length >= 3) ctx.depth = arguments[2];
  if (arguments.length >= 4) ctx.colors = arguments[3];
  if (isBoolean(opts)) {
    // legacy...
    ctx.showHidden = opts;
  } else if (opts) {
    // got an "options" object
    _extend(ctx, opts);
  }
  // set default options
  if (isUndefined(ctx.showHidden)) ctx.showHidden = false;
  if (isUndefined(ctx.depth)) ctx.depth = 2;
  if (isUndefined(ctx.colors)) ctx.colors = false;
  if (isUndefined(ctx.customInspect)) ctx.customInspect = true;
  if (ctx.colors) ctx.stylize = stylizeWithColor;
  return formatValue(ctx, obj, ctx.depth);
}

// http://en.wikipedia.org/wiki/ANSI_escape_code#graphics
inspect.colors = {
  'bold' : [1, 22],
  'italic' : [3, 23],
  'underline' : [4, 24],
  'inverse' : [7, 27],
  'white' : [37, 39],
  'grey' : [90, 39],
  'black' : [30, 39],
  'blue' : [34, 39],
  'cyan' : [36, 39],
  'green' : [32, 39],
  'magenta' : [35, 39],
  'red' : [31, 39],
  'yellow' : [33, 39]
};

// Don't use 'blue' not visible on cmd.exe
inspect.styles = {
  'special': 'cyan',
  'number': 'yellow',
  'boolean': 'yellow',
  'undefined': 'grey',
  'null': 'bold',
  'string': 'green',
  'date': 'magenta',
  // "name": intentionally not styling
  'regexp': 'red'
};


function stylizeWithColor(str, styleType) {
  var style = inspect.styles[styleType];

  if (style) {
    return '\u001b[' + inspect.colors[style][0] + 'm' + str +
           '\u001b[' + inspect.colors[style][1] + 'm';
  } else {
    return str;
  }
}


function stylizeNoColor(str, styleType) {
  return str;
}


function arrayToHash(array) {
  var hash = {};

  array.forEach(function(val, idx) {
    hash[val] = true;
  });

  return hash;
}


function formatValue(ctx, value, recurseTimes) {
  // Provide a hook for user-specified inspect functions.
  // Check that value is an object with an inspect function on it
  if (ctx.customInspect &&
      value &&
      isFunction(value.inspect) &&
      // Filter out the util module, it's inspect function is special
      value.inspect !== inspect &&
      // Also filter out any prototype objects using the circular check.
      !(value.constructor && value.constructor.prototype === value)) {
    var ret = value.inspect(recurseTimes, ctx);
    if (!isString(ret)) {
      ret = formatValue(ctx, ret, recurseTimes);
    }
    return ret;
  }

  // Primitive types cannot have properties
  var primitive = formatPrimitive(ctx, value);
  if (primitive) {
    return primitive;
  }

  // Look up the keys of the object.
  var keys = Object.keys(value);
  var visibleKeys = arrayToHash(keys);

  if (ctx.showHidden) {
    keys = Object.getOwnPropertyNames(value);
  }

  // IE doesn't make error fields non-enumerable
  // http://msdn.microsoft.com/en-us/library/ie/dww52sbt(v=vs.94).aspx
  if (isError(value)
      && (keys.indexOf('message') >= 0 || keys.indexOf('description') >= 0)) {
    return formatError(value);
  }

  // Some type of object without properties can be shortcutted.
  if (keys.length === 0) {
    if (isFunction(value)) {
      var name = value.name ? ': ' + value.name : '';
      return ctx.stylize('[Function' + name + ']', 'special');
    }
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    }
    if (isDate(value)) {
      return ctx.stylize(Date.prototype.toString.call(value), 'date');
    }
    if (isError(value)) {
      return formatError(value);
    }
  }

  var base = '', array = false, braces = ['{', '}'];

  // Make Array say that they are Array
  if (isArray(value)) {
    array = true;
    braces = ['[', ']'];
  }

  // Make functions say that they are functions
  if (isFunction(value)) {
    var n = value.name ? ': ' + value.name : '';
    base = ' [Function' + n + ']';
  }

  // Make RegExps say that they are RegExps
  if (isRegExp(value)) {
    base = ' ' + RegExp.prototype.toString.call(value);
  }

  // Make dates with properties first say the date
  if (isDate(value)) {
    base = ' ' + Date.prototype.toUTCString.call(value);
  }

  // Make error with message first say the error
  if (isError(value)) {
    base = ' ' + formatError(value);
  }

  if (keys.length === 0 && (!array || value.length == 0)) {
    return braces[0] + base + braces[1];
  }

  if (recurseTimes < 0) {
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    } else {
      return ctx.stylize('[Object]', 'special');
    }
  }

  ctx.seen.push(value);

  var output;
  if (array) {
    output = formatArray(ctx, value, recurseTimes, visibleKeys, keys);
  } else {
    output = keys.map(function(key) {
      return formatProperty(ctx, value, recurseTimes, visibleKeys, key, array);
    });
  }

  ctx.seen.pop();

  return reduceToSingleString(output, base, braces);
}


function formatPrimitive(ctx, value) {
  if (isUndefined(value))
    return ctx.stylize('undefined', 'undefined');
  if (isString(value)) {
    var simple = '\'' + JSON.stringify(value).replace(/^"|"$/g, '')
                                             .replace(/'/g, "\\'")
                                             .replace(/\\"/g, '"') + '\'';
    return ctx.stylize(simple, 'string');
  }
  if (isNumber(value))
    return ctx.stylize('' + value, 'number');
  if (isBoolean(value))
    return ctx.stylize('' + value, 'boolean');
  // For some reason typeof null is "object", so special case here.
  if (isNull(value))
    return ctx.stylize('null', 'null');
}


function formatError(value) {
  return '[' + Error.prototype.toString.call(value) + ']';
}


function formatArray(ctx, value, recurseTimes, visibleKeys, keys) {
  var output = [];
  for (var i = 0, l = value.length; i < l; ++i) {
    if (hasOwnProperty(value, String(i))) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
          String(i), true));
    } else {
      output.push('');
    }
  }
  keys.forEach(function(key) {
    if (!key.match(/^\d+$/)) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
          key, true));
    }
  });
  return output;
}


function formatProperty(ctx, value, recurseTimes, visibleKeys, key, array) {
  var name, str, desc;
  desc = Object.getOwnPropertyDescriptor(value, key) || { value: value[key] };
  if (desc.get) {
    if (desc.set) {
      str = ctx.stylize('[Getter/Setter]', 'special');
    } else {
      str = ctx.stylize('[Getter]', 'special');
    }
  } else {
    if (desc.set) {
      str = ctx.stylize('[Setter]', 'special');
    }
  }
  if (!hasOwnProperty(visibleKeys, key)) {
    name = '[' + key + ']';
  }
  if (!str) {
    if (ctx.seen.indexOf(desc.value) < 0) {
      if (isNull(recurseTimes)) {
        str = formatValue(ctx, desc.value, null);
      } else {
        str = formatValue(ctx, desc.value, recurseTimes - 1);
      }
      if (str.indexOf('\n') > -1) {
        if (array) {
          str = str.split('\n').map(function(line) {
            return '  ' + line;
          }).join('\n').substr(2);
        } else {
          str = '\n' + str.split('\n').map(function(line) {
            return '   ' + line;
          }).join('\n');
        }
      }
    } else {
      str = ctx.stylize('[Circular]', 'special');
    }
  }
  if (isUndefined(name)) {
    if (array && key.match(/^\d+$/)) {
      return str;
    }
    name = JSON.stringify('' + key);
    if (name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {
      name = name.substr(1, name.length - 2);
      name = ctx.stylize(name, 'name');
    } else {
      name = name.replace(/'/g, "\\'")
                 .replace(/\\"/g, '"')
                 .replace(/(^"|"$)/g, "'");
      name = ctx.stylize(name, 'string');
    }
  }

  return name + ': ' + str;
}


function reduceToSingleString(output, base, braces) {
  var length = output.reduce(function(prev, cur) {
    if (cur.indexOf('\n') >= 0) ;
    return prev + cur.replace(/\u001b\[\d\d?m/g, '').length + 1;
  }, 0);

  if (length > 60) {
    return braces[0] +
           (base === '' ? '' : base + '\n ') +
           ' ' +
           output.join(',\n  ') +
           ' ' +
           braces[1];
  }

  return braces[0] + base + ' ' + output.join(', ') + ' ' + braces[1];
}


// NOTE: These type checking functions intentionally don't use `instanceof`
// because it is fragile and can be easily faked with `Object.create()`.
function isArray(ar) {
  return Array.isArray(ar);
}

function isBoolean(arg) {
  return typeof arg === 'boolean';
}

function isNull(arg) {
  return arg === null;
}

function isNullOrUndefined(arg) {
  return arg == null;
}

function isNumber(arg) {
  return typeof arg === 'number';
}

function isString(arg) {
  return typeof arg === 'string';
}

function isSymbol(arg) {
  return typeof arg === 'symbol';
}

function isUndefined(arg) {
  return arg === void 0;
}

function isRegExp(re) {
  return isObject(re) && objectToString(re) === '[object RegExp]';
}

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}

function isDate(d) {
  return isObject(d) && objectToString(d) === '[object Date]';
}

function isError(e) {
  return isObject(e) &&
      (objectToString(e) === '[object Error]' || e instanceof Error);
}

function isFunction(arg) {
  return typeof arg === 'function';
}

function isPrimitive(arg) {
  return arg === null ||
         typeof arg === 'boolean' ||
         typeof arg === 'number' ||
         typeof arg === 'string' ||
         typeof arg === 'symbol' ||  // ES6 symbol
         typeof arg === 'undefined';
}

function isBuffer(maybeBuf) {
  return Buffer.isBuffer(maybeBuf);
}

function objectToString(o) {
  return Object.prototype.toString.call(o);
}


function pad(n) {
  return n < 10 ? '0' + n.toString(10) : n.toString(10);
}


var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep',
              'Oct', 'Nov', 'Dec'];

// 26 Feb 16:19:34
function timestamp() {
  var d = new Date();
  var time = [pad(d.getHours()),
              pad(d.getMinutes()),
              pad(d.getSeconds())].join(':');
  return [d.getDate(), months[d.getMonth()], time].join(' ');
}


// log is just a thin wrapper to console.log that prepends a timestamp
function log() {
  console.log('%s - %s', timestamp(), format.apply(null, arguments));
}

function _extend(origin, add) {
  // Don't do anything if add isn't an object
  if (!add || !isObject(add)) return origin;

  var keys = Object.keys(add);
  var i = keys.length;
  while (i--) {
    origin[keys[i]] = add[keys[i]];
  }
  return origin;
}
function hasOwnProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

var kCustomPromisifiedSymbol = typeof Symbol !== 'undefined' ? Symbol('util.promisify.custom') : undefined;

function promisify(original) {
  if (typeof original !== 'function')
    throw new TypeError('The "original" argument must be of type Function');

  if (kCustomPromisifiedSymbol && original[kCustomPromisifiedSymbol]) {
    var fn = original[kCustomPromisifiedSymbol];
    if (typeof fn !== 'function') {
      throw new TypeError('The "util.promisify.custom" argument must be of type Function');
    }
    Object.defineProperty(fn, kCustomPromisifiedSymbol, {
      value: fn, enumerable: false, writable: false, configurable: true
    });
    return fn;
  }

  function fn() {
    var promiseResolve, promiseReject;
    var promise = new Promise(function (resolve, reject) {
      promiseResolve = resolve;
      promiseReject = reject;
    });

    var args = [];
    for (var i = 0; i < arguments.length; i++) {
      args.push(arguments[i]);
    }
    args.push(function (err, value) {
      if (err) {
        promiseReject(err);
      } else {
        promiseResolve(value);
      }
    });

    try {
      original.apply(this, args);
    } catch (err) {
      promiseReject(err);
    }

    return promise;
  }

  Object.setPrototypeOf(fn, Object.getPrototypeOf(original));

  if (kCustomPromisifiedSymbol) Object.defineProperty(fn, kCustomPromisifiedSymbol, {
    value: fn, enumerable: false, writable: false, configurable: true
  });
  return Object.defineProperties(
    fn,
    getOwnPropertyDescriptors(original)
  );
}

promisify.custom = kCustomPromisifiedSymbol;

function callbackifyOnRejected(reason, cb) {
  // `!reason` guard inspired by bluebird (Ref: https://goo.gl/t5IS6M).
  // Because `null` is a special error value in callbacks which means "no error
  // occurred", we error-wrap so the callback consumer can distinguish between
  // "the promise rejected with null" or "the promise fulfilled with undefined".
  if (!reason) {
    var newReason = new Error('Promise was rejected with a falsy value');
    newReason.reason = reason;
    reason = newReason;
  }
  return cb(reason);
}

function callbackify(original) {
  if (typeof original !== 'function') {
    throw new TypeError('The "original" argument must be of type Function');
  }

  // We DO NOT return the promise as it gives the user a false sense that
  // the promise is actually somehow related to the callback's execution
  // and that the callback throwing will reject the promise.
  function callbackified() {
    var args = [];
    for (var i = 0; i < arguments.length; i++) {
      args.push(arguments[i]);
    }

    var maybeCb = args.pop();
    if (typeof maybeCb !== 'function') {
      throw new TypeError('The last argument must be of type Function');
    }
    var self = this;
    var cb = function() {
      return maybeCb.apply(self, arguments);
    };
    // In true node style we process the callback on `nextTick` with all the
    // implications (stack, `uncaughtException`, `async_hooks`)
    original.apply(this, args)
      .then(function(ret) { browser$1.nextTick(cb.bind(null, null, ret)); },
        function(rej) { browser$1.nextTick(callbackifyOnRejected.bind(null, rej, cb)); });
  }

  Object.setPrototypeOf(callbackified, Object.getPrototypeOf(original));
  Object.defineProperties(callbackified, getOwnPropertyDescriptors(original));
  return callbackified;
}

var _polyfillNode_util = {
  inherits: inherits$1,
  _extend: _extend,
  log: log,
  isBuffer: isBuffer,
  isPrimitive: isPrimitive,
  isFunction: isFunction,
  isError: isError,
  isDate: isDate,
  isObject: isObject,
  isRegExp: isRegExp,
  isUndefined: isUndefined,
  isSymbol: isSymbol,
  isString: isString,
  isNumber: isNumber,
  isNullOrUndefined: isNullOrUndefined,
  isNull: isNull,
  isBoolean: isBoolean,
  isArray: isArray,
  inspect: inspect,
  deprecate: deprecate,
  format: format,
  debuglog: debuglog,
  promisify: promisify,
  callbackify: callbackify,
};

var _polyfillNode_util$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  _extend: _extend,
  callbackify: callbackify,
  debuglog: debuglog,
  default: _polyfillNode_util,
  deprecate: deprecate,
  format: format,
  inherits: inherits$1,
  inspect: inspect,
  isArray: isArray,
  isBoolean: isBoolean,
  isBuffer: isBuffer,
  isDate: isDate,
  isError: isError,
  isFunction: isFunction,
  isNull: isNull,
  isNullOrUndefined: isNullOrUndefined,
  isNumber: isNumber,
  isObject: isObject,
  isPrimitive: isPrimitive,
  isRegExp: isRegExp,
  isString: isString,
  isSymbol: isSymbol,
  isUndefined: isUndefined,
  log: log,
  promisify: promisify
});

var require$$0 = /*@__PURE__*/getAugmentedNamespace(_polyfillNode_util$1);

var binarywriter = BinaryWriter;

function BinaryWriter(size, allowResize) {
    this.buffer = new Buffer.alloc(size);
    this.position = 0;
    this.allowResize = allowResize;
}

function _write(write, size) {
    return function (value, noAssert) {
        this.ensureSize(size);

        write.call(this.buffer, value, this.position, noAssert);
        this.position += size;
    };
}

BinaryWriter.prototype.writeUInt8 = _write(Buffer.prototype.writeUInt8, 1);
BinaryWriter.prototype.writeUInt16LE = _write(Buffer.prototype.writeUInt16LE, 2);
BinaryWriter.prototype.writeUInt16BE = _write(Buffer.prototype.writeUInt16BE, 2);
BinaryWriter.prototype.writeUInt32LE = _write(Buffer.prototype.writeUInt32LE, 4);
BinaryWriter.prototype.writeUInt32BE = _write(Buffer.prototype.writeUInt32BE, 4);
BinaryWriter.prototype.writeInt8 = _write(Buffer.prototype.writeInt8, 1);
BinaryWriter.prototype.writeInt16LE = _write(Buffer.prototype.writeInt16LE, 2);
BinaryWriter.prototype.writeInt16BE = _write(Buffer.prototype.writeInt16BE, 2);
BinaryWriter.prototype.writeInt32LE = _write(Buffer.prototype.writeInt32LE, 4);
BinaryWriter.prototype.writeInt32BE = _write(Buffer.prototype.writeInt32BE, 4);
BinaryWriter.prototype.writeFloatLE = _write(Buffer.prototype.writeFloatLE, 4);
BinaryWriter.prototype.writeFloatBE = _write(Buffer.prototype.writeFloatBE, 4);
BinaryWriter.prototype.writeDoubleLE = _write(Buffer.prototype.writeDoubleLE, 8);
BinaryWriter.prototype.writeDoubleBE = _write(Buffer.prototype.writeDoubleBE, 8);

BinaryWriter.prototype.writeBuffer = function (buffer) {
    this.ensureSize(buffer.length);

    buffer.copy(this.buffer, this.position, 0, buffer.length);
    this.position += buffer.length;
};

BinaryWriter.prototype.writeVarInt = function (value) {
    var length = 1;

    while ((value & 0xFFFFFF80) !== 0) {
        this.writeUInt8((value & 0x7F) | 0x80);
        value >>>= 7;
        length++;
    }

    this.writeUInt8(value & 0x7F);

    return length;
};

BinaryWriter.prototype.ensureSize = function (size) {
    if (this.buffer.length < this.position + size) {
        if (this.allowResize) {
            var tempBuffer = new Buffer.alloc(this.position + size);
            this.buffer.copy(tempBuffer, 0, 0, this.buffer.length);
            this.buffer = tempBuffer;
        }
        else {
            throw new RangeError('index out of range');
        }
    }
};

var zigzag = {
    encode: function (value) {
        return (value << 1) ^ (value >> 31);
    },
    decode: function (value) {
        return (value >> 1) ^ (-(value & 1));
    }
};

var point;
var hasRequiredPoint;

function requirePoint () {
	if (hasRequiredPoint) return point;
	hasRequiredPoint = 1;
	point = Point;

	var util = require$$0;

	var Geometry = requireGeometry();
	var Types = types;
	var BinaryWriter = binarywriter;
	var ZigZag = zigzag;

	function Point(x, y, z, m, srid) {
	    Geometry.call(this);

	    this.x = x;
	    this.y = y;
	    this.z = z;
	    this.m = m;
		this.srid = srid;

	    this.hasZ = typeof this.z !== 'undefined';
	    this.hasM = typeof this.m !== 'undefined';
	}

	util.inherits(Point, Geometry);

	Point.Z = function (x, y, z, srid) {
	    var point = new Point(x, y, z, undefined, srid);
	    point.hasZ = true;
	    return point;
	};

	Point.M = function (x, y, m, srid) {
	    var point = new Point(x, y, undefined, m, srid);
	    point.hasM = true;
	    return point;
	};

	Point.ZM = function (x, y, z, m, srid) {
	    var point = new Point(x, y, z, m, srid);
	    point.hasZ = true;
	    point.hasM = true;
	    return point;
	};

	Point._parseWkt = function (value, options) {
	    var point = new Point();
	    point.srid = options.srid;
	    point.hasZ = options.hasZ;
	    point.hasM = options.hasM;

	    if (value.isMatch(['EMPTY']))
	        return point;

	    value.expectGroupStart();

	    var coordinate = value.matchCoordinate(options);

	    point.x = coordinate.x;
	    point.y = coordinate.y;
	    point.z = coordinate.z;
	    point.m = coordinate.m;

	    value.expectGroupEnd();

	    return point;
	};

	Point._parseWkb = function (value, options) {
	    var point = Point._readWkbPoint(value, options);
	    point.srid = options.srid;
	    return point;
	};

	Point._readWkbPoint = function (value, options) {
	    return new Point(value.readDouble(), value.readDouble(),
	        options.hasZ ? value.readDouble() : undefined,
	        options.hasM ? value.readDouble() : undefined);
	};

	Point._parseTwkb = function (value, options) {
	    var point = new Point();
	    point.hasZ = options.hasZ;
	    point.hasM = options.hasM;

	    if (options.isEmpty)
	        return point;

	    point.x = ZigZag.decode(value.readVarInt()) / options.precisionFactor;
	    point.y = ZigZag.decode(value.readVarInt()) / options.precisionFactor;
	    point.z = options.hasZ ? ZigZag.decode(value.readVarInt()) / options.zPrecisionFactor : undefined;
	    point.m = options.hasM ? ZigZag.decode(value.readVarInt()) / options.mPrecisionFactor : undefined;

	    return point;
	};

	Point._readTwkbPoint = function (value, options, previousPoint) {
	    previousPoint.x += ZigZag.decode(value.readVarInt()) / options.precisionFactor;
	    previousPoint.y += ZigZag.decode(value.readVarInt()) / options.precisionFactor;

	    if (options.hasZ)
	        previousPoint.z += ZigZag.decode(value.readVarInt()) / options.zPrecisionFactor;
	    if (options.hasM)
	        previousPoint.m += ZigZag.decode(value.readVarInt()) / options.mPrecisionFactor;

	    return new Point(previousPoint.x, previousPoint.y, previousPoint.z, previousPoint.m);
	};

	Point._parseGeoJSON = function (value) {
	    return Point._readGeoJSONPoint(value.coordinates);
	};

	Point._readGeoJSONPoint = function (coordinates) {
	    if (coordinates.length === 0)
	        return new Point();

	    if (coordinates.length > 2)
	        return new Point(coordinates[0], coordinates[1], coordinates[2]);

	    return new Point(coordinates[0], coordinates[1]);
	};

	Point.prototype.toWkt = function () {
	    if (typeof this.x === 'undefined' && typeof this.y === 'undefined' &&
	        typeof this.z === 'undefined' && typeof this.m === 'undefined')
	        return this._getWktType(Types.wkt.Point, true);

	    return this._getWktType(Types.wkt.Point, false) + '(' + this._getWktCoordinate(this) + ')';
	};

	Point.prototype.toWkb = function (parentOptions) {
	    var wkb = new BinaryWriter(this._getWkbSize());

	    wkb.writeInt8(1);
	    this._writeWkbType(wkb, Types.wkb.Point, parentOptions);

	    if (typeof this.x === 'undefined' && typeof this.y === 'undefined') {
	        wkb.writeDoubleLE(NaN);
	        wkb.writeDoubleLE(NaN);

	        if (this.hasZ)
	            wkb.writeDoubleLE(NaN);
	        if (this.hasM)
	            wkb.writeDoubleLE(NaN);
	    }
	    else {
	        this._writeWkbPoint(wkb);
	    }

	    return wkb.buffer;
	};

	Point.prototype._writeWkbPoint = function (wkb) {
	    wkb.writeDoubleLE(this.x);
	    wkb.writeDoubleLE(this.y);

	    if (this.hasZ)
	        wkb.writeDoubleLE(this.z);
	    if (this.hasM)
	        wkb.writeDoubleLE(this.m);
	};

	Point.prototype.toTwkb = function () {
	    var twkb = new BinaryWriter(0, true);

	    var precision = Geometry.getTwkbPrecision(5, 0, 0);
	    var isEmpty = typeof this.x === 'undefined' && typeof this.y === 'undefined';

	    this._writeTwkbHeader(twkb, Types.wkb.Point, precision, isEmpty);

	    if (!isEmpty)
	        this._writeTwkbPoint(twkb, precision, new Point(0, 0, 0, 0));

	    return twkb.buffer;
	};

	Point.prototype._writeTwkbPoint = function (twkb, precision, previousPoint) {
	    var x = this.x * precision.xyFactor;
	    var y = this.y * precision.xyFactor;
	    var z = this.z * precision.zFactor;
	    var m = this.m * precision.mFactor;

	    twkb.writeVarInt(ZigZag.encode(x - previousPoint.x));
	    twkb.writeVarInt(ZigZag.encode(y - previousPoint.y));
	    if (this.hasZ)
	        twkb.writeVarInt(ZigZag.encode(z - previousPoint.z));
	    if (this.hasM)
	        twkb.writeVarInt(ZigZag.encode(m - previousPoint.m));

	    previousPoint.x = x;
	    previousPoint.y = y;
	    previousPoint.z = z;
	    previousPoint.m = m;
	};

	Point.prototype._getWkbSize = function () {
	    var size = 1 + 4 + 8 + 8;

	    if (this.hasZ)
	        size += 8;
	    if (this.hasM)
	        size += 8;

	    return size;
	};

	Point.prototype.toGeoJSON = function (options) {
	    var geoJSON = Geometry.prototype.toGeoJSON.call(this, options);
	    geoJSON.type = Types.geoJSON.Point;

	    if (typeof this.x === 'undefined' && typeof this.y === 'undefined')
	        geoJSON.coordinates = [];
	    else if (typeof this.z !== 'undefined')
	        geoJSON.coordinates = [this.x, this.y, this.z];
	    else
	        geoJSON.coordinates = [this.x, this.y];

	    return geoJSON;
	};
	return point;
}

var linestring;
var hasRequiredLinestring;

function requireLinestring () {
	if (hasRequiredLinestring) return linestring;
	hasRequiredLinestring = 1;
	linestring = LineString;

	var util = require$$0;

	var Geometry = requireGeometry();
	var Types = types;
	var Point = requirePoint();
	var BinaryWriter = binarywriter;

	function LineString(points, srid) {
	    Geometry.call(this);

	    this.points = points || [];
		this.srid = srid;

	    if (this.points.length > 0) {
	        this.hasZ = this.points[0].hasZ;
	        this.hasM = this.points[0].hasM;
	    }
	}

	util.inherits(LineString, Geometry);

	LineString.Z = function (points, srid) {
	    var lineString = new LineString(points, srid);
	    lineString.hasZ = true;
	    return lineString;
	};

	LineString.M = function (points, srid) {
	    var lineString = new LineString(points, srid);
	    lineString.hasM = true;
	    return lineString;
	};

	LineString.ZM = function (points, srid) {
	    var lineString = new LineString(points, srid);
	    lineString.hasZ = true;
	    lineString.hasM = true;
	    return lineString;
	};

	LineString._parseWkt = function (value, options) {
	    var lineString = new LineString();
	    lineString.srid = options.srid;
	    lineString.hasZ = options.hasZ;
	    lineString.hasM = options.hasM;

	    if (value.isMatch(['EMPTY']))
	        return lineString;

	    value.expectGroupStart();
	    lineString.points.push.apply(lineString.points, value.matchCoordinates(options));
	    value.expectGroupEnd();

	    return lineString;
	};

	LineString._parseWkb = function (value, options) {
	    var lineString = new LineString();
	    lineString.srid = options.srid;
	    lineString.hasZ = options.hasZ;
	    lineString.hasM = options.hasM;

	    var pointCount = value.readUInt32();

	    for (var i = 0; i < pointCount; i++)
	        lineString.points.push(Point._readWkbPoint(value, options));

	    return lineString;
	};

	LineString._parseTwkb = function (value, options) {
	    var lineString = new LineString();
	    lineString.hasZ = options.hasZ;
	    lineString.hasM = options.hasM;

	    if (options.isEmpty)
	        return lineString;

	    var previousPoint = new Point(0, 0, options.hasZ ? 0 : undefined, options.hasM ? 0 : undefined);
	    var pointCount = value.readVarInt();

	    for (var i = 0; i < pointCount; i++)
	        lineString.points.push(Point._readTwkbPoint(value, options, previousPoint));

	    return lineString;
	};

	LineString._parseGeoJSON = function (value) {
	    var lineString = new LineString();

	    if (value.coordinates.length > 0)
	        lineString.hasZ = value.coordinates[0].length > 2;

	    for (var i = 0; i < value.coordinates.length; i++)
	        lineString.points.push(Point._readGeoJSONPoint(value.coordinates[i]));

	    return lineString;
	};

	LineString.prototype.toWkt = function () {
	    if (this.points.length === 0)
	        return this._getWktType(Types.wkt.LineString, true);

	    return this._getWktType(Types.wkt.LineString, false) + this._toInnerWkt();
	};

	LineString.prototype._toInnerWkt = function () {
	    var innerWkt = '(';

	    for (var i = 0; i < this.points.length; i++)
	        innerWkt += this._getWktCoordinate(this.points[i]) + ',';

	    innerWkt = innerWkt.slice(0, -1);
	    innerWkt += ')';

	    return innerWkt;
	};

	LineString.prototype.toWkb = function (parentOptions) {
	    var wkb = new BinaryWriter(this._getWkbSize());

	    wkb.writeInt8(1);

	    this._writeWkbType(wkb, Types.wkb.LineString, parentOptions);
	    wkb.writeUInt32LE(this.points.length);

	    for (var i = 0; i < this.points.length; i++)
	        this.points[i]._writeWkbPoint(wkb);

	    return wkb.buffer;
	};

	LineString.prototype.toTwkb = function () {
	    var twkb = new BinaryWriter(0, true);

	    var precision = Geometry.getTwkbPrecision(5, 0, 0);
	    var isEmpty = this.points.length === 0;

	    this._writeTwkbHeader(twkb, Types.wkb.LineString, precision, isEmpty);

	    if (this.points.length > 0) {
	        twkb.writeVarInt(this.points.length);

	        var previousPoint = new Point(0, 0, 0, 0);
	        for (var i = 0; i < this.points.length; i++)
	            this.points[i]._writeTwkbPoint(twkb, precision, previousPoint);
	    }

	    return twkb.buffer;
	};

	LineString.prototype._getWkbSize = function () {
	    var coordinateSize = 16;

	    if (this.hasZ)
	        coordinateSize += 8;
	    if (this.hasM)
	        coordinateSize += 8;

	    return 1 + 4 + 4 + (this.points.length * coordinateSize);
	};

	LineString.prototype.toGeoJSON = function (options) {
	    var geoJSON = Geometry.prototype.toGeoJSON.call(this, options);
	    geoJSON.type = Types.geoJSON.LineString;
	    geoJSON.coordinates = [];

	    for (var i = 0; i < this.points.length; i++) {
	        if (this.hasZ)
	            geoJSON.coordinates.push([this.points[i].x, this.points[i].y, this.points[i].z]);
	        else
	            geoJSON.coordinates.push([this.points[i].x, this.points[i].y]);
	    }

	    return geoJSON;
	};
	return linestring;
}

var polygon;
var hasRequiredPolygon;

function requirePolygon () {
	if (hasRequiredPolygon) return polygon;
	hasRequiredPolygon = 1;
	polygon = Polygon;

	var util = require$$0;

	var Geometry = requireGeometry();
	var Types = types;
	var Point = requirePoint();
	var BinaryWriter = binarywriter;

	function Polygon(exteriorRing, interiorRings, srid) {
	    Geometry.call(this);

	    this.exteriorRing = exteriorRing || [];
	    this.interiorRings = interiorRings || [];
		this.srid = srid;

	    if (this.exteriorRing.length > 0) {
	        this.hasZ = this.exteriorRing[0].hasZ;
	        this.hasM = this.exteriorRing[0].hasM;
	    }
	}

	util.inherits(Polygon, Geometry);

	Polygon.Z = function (exteriorRing, interiorRings, srid) {
	    var polygon = new Polygon(exteriorRing, interiorRings, srid);
	    polygon.hasZ = true;
	    return polygon;
	};

	Polygon.M = function (exteriorRing, interiorRings, srid) {
	    var polygon = new Polygon(exteriorRing, interiorRings, srid);
	    polygon.hasM = true;
	    return polygon;
	};

	Polygon.ZM = function (exteriorRing, interiorRings, srid) {
	    var polygon = new Polygon(exteriorRing, interiorRings, srid);
	    polygon.hasZ = true;
	    polygon.hasM = true;
	    return polygon;
	};

	Polygon._parseWkt = function (value, options) {
	    var polygon = new Polygon();
	    polygon.srid = options.srid;
	    polygon.hasZ = options.hasZ;
	    polygon.hasM = options.hasM;

	    if (value.isMatch(['EMPTY']))
	        return polygon;

	    value.expectGroupStart();

	    value.expectGroupStart();
	    polygon.exteriorRing.push.apply(polygon.exteriorRing, value.matchCoordinates(options));
	    value.expectGroupEnd();

	    while (value.isMatch([','])) {
	        value.expectGroupStart();
	        polygon.interiorRings.push(value.matchCoordinates(options));
	        value.expectGroupEnd();
	    }

	    value.expectGroupEnd();

	    return polygon;
	};

	Polygon._parseWkb = function (value, options) {
	    var polygon = new Polygon();
	    polygon.srid = options.srid;
	    polygon.hasZ = options.hasZ;
	    polygon.hasM = options.hasM;

	    var ringCount = value.readUInt32();

	    if (ringCount > 0) {
	        var exteriorRingCount = value.readUInt32();

	        for (var i = 0; i < exteriorRingCount; i++)
	            polygon.exteriorRing.push(Point._readWkbPoint(value, options));

	        for (i = 1; i < ringCount; i++) {
	            var interiorRing = [];

	            var interiorRingCount = value.readUInt32();

	            for (var j = 0; j < interiorRingCount; j++)
	                interiorRing.push(Point._readWkbPoint(value, options));

	            polygon.interiorRings.push(interiorRing);
	        }
	    }

	    return polygon;
	};

	Polygon._parseTwkb = function (value, options) {
	    var polygon = new Polygon();
	    polygon.hasZ = options.hasZ;
	    polygon.hasM = options.hasM;

	    if (options.isEmpty)
	        return polygon;

	    var previousPoint = new Point(0, 0, options.hasZ ? 0 : undefined, options.hasM ? 0 : undefined);
	    var ringCount = value.readVarInt();
	    var exteriorRingCount = value.readVarInt();

	    for (var i = 0; i < exteriorRingCount; i++)
	        polygon.exteriorRing.push(Point._readTwkbPoint(value, options, previousPoint));

	    for (i = 1; i < ringCount; i++) {
	        var interiorRing = [];

	        var interiorRingCount = value.readVarInt();

	        for (var j = 0; j < interiorRingCount; j++)
	            interiorRing.push(Point._readTwkbPoint(value, options, previousPoint));

	        polygon.interiorRings.push(interiorRing);
	    }

	    return polygon;
	};

	Polygon._parseGeoJSON = function (value) {
	    var polygon = new Polygon();

	    if (value.coordinates.length > 0 && value.coordinates[0].length > 0)
	        polygon.hasZ = value.coordinates[0][0].length > 2;

	    for (var i = 0; i < value.coordinates.length; i++) {
	        if (i > 0)
	            polygon.interiorRings.push([]);

	        for (var j = 0; j  < value.coordinates[i].length; j++) {
	            if (i === 0)
	                polygon.exteriorRing.push(Point._readGeoJSONPoint(value.coordinates[i][j]));
	            else
	                polygon.interiorRings[i - 1].push(Point._readGeoJSONPoint(value.coordinates[i][j]));
	        }
	    }

	    return polygon;
	};

	Polygon.prototype.toWkt = function () {
	    if (this.exteriorRing.length === 0)
	        return this._getWktType(Types.wkt.Polygon, true);

	    return this._getWktType(Types.wkt.Polygon, false) + this._toInnerWkt();
	};

	Polygon.prototype._toInnerWkt = function () {
	    var innerWkt = '((';

	    for (var i = 0; i < this.exteriorRing.length; i++)
	        innerWkt += this._getWktCoordinate(this.exteriorRing[i]) + ',';

	    innerWkt = innerWkt.slice(0, -1);
	    innerWkt += ')';

	    for (i = 0; i < this.interiorRings.length; i++) {
	        innerWkt += ',(';

	        for (var j = 0; j < this.interiorRings[i].length; j++) {
	            innerWkt += this._getWktCoordinate(this.interiorRings[i][j]) + ',';
	        }

	        innerWkt = innerWkt.slice(0, -1);
	        innerWkt += ')';
	    }

	    innerWkt += ')';

	    return innerWkt;
	};

	Polygon.prototype.toWkb = function (parentOptions) {
	    var wkb = new BinaryWriter(this._getWkbSize());

	    wkb.writeInt8(1);

	    this._writeWkbType(wkb, Types.wkb.Polygon, parentOptions);

	    if (this.exteriorRing.length > 0) {
	        wkb.writeUInt32LE(1 + this.interiorRings.length);
	        wkb.writeUInt32LE(this.exteriorRing.length);
	    }
	    else {
	        wkb.writeUInt32LE(0);
	    }

	    for (var i = 0; i < this.exteriorRing.length; i++)
	        this.exteriorRing[i]._writeWkbPoint(wkb);

	    for (i = 0; i < this.interiorRings.length; i++) {
	        wkb.writeUInt32LE(this.interiorRings[i].length);

	        for (var j = 0; j < this.interiorRings[i].length; j++)
	            this.interiorRings[i][j]._writeWkbPoint(wkb);
	    }

	    return wkb.buffer;
	};

	Polygon.prototype.toTwkb = function () {
	    var twkb = new BinaryWriter(0, true);

	    var precision = Geometry.getTwkbPrecision(5, 0, 0);
	    var isEmpty = this.exteriorRing.length === 0;

	    this._writeTwkbHeader(twkb, Types.wkb.Polygon, precision, isEmpty);

	    if (this.exteriorRing.length > 0) {
	        twkb.writeVarInt(1 + this.interiorRings.length);

	        twkb.writeVarInt(this.exteriorRing.length);

	        var previousPoint = new Point(0, 0, 0, 0);
	        for (var i = 0; i < this.exteriorRing.length; i++)
	            this.exteriorRing[i]._writeTwkbPoint(twkb, precision, previousPoint);

	        for (i = 0; i < this.interiorRings.length; i++) {
	            twkb.writeVarInt(this.interiorRings[i].length);

	            for (var j = 0; j < this.interiorRings[i].length; j++)
	                this.interiorRings[i][j]._writeTwkbPoint(twkb, precision, previousPoint);
	        }
	    }

	    return twkb.buffer;
	};

	Polygon.prototype._getWkbSize = function () {
	    var coordinateSize = 16;

	    if (this.hasZ)
	        coordinateSize += 8;
	    if (this.hasM)
	        coordinateSize += 8;

	    var size = 1 + 4 + 4;

	    if (this.exteriorRing.length > 0)
	        size += 4 + (this.exteriorRing.length * coordinateSize);

	    for (var i = 0; i < this.interiorRings.length; i++)
	        size += 4 + (this.interiorRings[i].length * coordinateSize);

	    return size;
	};

	Polygon.prototype.toGeoJSON = function (options) {
	    var geoJSON = Geometry.prototype.toGeoJSON.call(this, options);
	    geoJSON.type = Types.geoJSON.Polygon;
	    geoJSON.coordinates = [];

	    if (this.exteriorRing.length > 0) {
	        var exteriorRing = [];

	        for (var i = 0; i < this.exteriorRing.length; i++) {
	            if (this.hasZ)
	                exteriorRing.push([this.exteriorRing[i].x, this.exteriorRing[i].y, this.exteriorRing[i].z]);
	            else
	                exteriorRing.push([this.exteriorRing[i].x, this.exteriorRing[i].y]);
	        }

	        geoJSON.coordinates.push(exteriorRing);
	    }

	    for (var j = 0; j < this.interiorRings.length; j++) {
	        var interiorRing = [];

	        for (var k = 0; k < this.interiorRings[j].length; k++) {
	            if (this.hasZ)
	                interiorRing.push([this.interiorRings[j][k].x, this.interiorRings[j][k].y, this.interiorRings[j][k].z]);
	            else
	                interiorRing.push([this.interiorRings[j][k].x, this.interiorRings[j][k].y]);
	        }

	        geoJSON.coordinates.push(interiorRing);
	    }

	    return geoJSON;
	};
	return polygon;
}

var multipoint;
var hasRequiredMultipoint;

function requireMultipoint () {
	if (hasRequiredMultipoint) return multipoint;
	hasRequiredMultipoint = 1;
	multipoint = MultiPoint;

	var util = require$$0;

	var Types = types;
	var Geometry = requireGeometry();
	var Point = requirePoint();
	var BinaryWriter = binarywriter;

	function MultiPoint(points, srid) {
	    Geometry.call(this);

	    this.points = points || [];
		this.srid = srid;
		
	    if (this.points.length > 0) {
	        this.hasZ = this.points[0].hasZ;
	        this.hasM = this.points[0].hasM;
	    }
	}

	util.inherits(MultiPoint, Geometry);

	MultiPoint.Z = function (points, srid) {
	    var multiPoint = new MultiPoint(points, srid);
	    multiPoint.hasZ = true;
	    return multiPoint;
	};

	MultiPoint.M = function (points, srid) {
	    var multiPoint = new MultiPoint(points, srid);
	    multiPoint.hasM = true;
	    return multiPoint;
	};

	MultiPoint.ZM = function (points, srid) {
	    var multiPoint = new MultiPoint(points, srid);
	    multiPoint.hasZ = true;
	    multiPoint.hasM = true;
	    return multiPoint;
	};

	MultiPoint._parseWkt = function (value, options) {
	    var multiPoint = new MultiPoint();
	    multiPoint.srid = options.srid;
	    multiPoint.hasZ = options.hasZ;
	    multiPoint.hasM = options.hasM;

	    if (value.isMatch(['EMPTY']))
	        return multiPoint;

	    value.expectGroupStart();
	    multiPoint.points.push.apply(multiPoint.points, value.matchCoordinates(options));
	    value.expectGroupEnd();

	    return multiPoint;
	};

	MultiPoint._parseWkb = function (value, options) {
	    var multiPoint = new MultiPoint();
	    multiPoint.srid = options.srid;
	    multiPoint.hasZ = options.hasZ;
	    multiPoint.hasM = options.hasM;

	    var pointCount = value.readUInt32();

	    for (var i = 0; i < pointCount; i++)
	        multiPoint.points.push(Geometry.parse(value, options));

	    return multiPoint;
	};

	MultiPoint._parseTwkb = function (value, options) {
	    var multiPoint = new MultiPoint();
	    multiPoint.hasZ = options.hasZ;
	    multiPoint.hasM = options.hasM;

	    if (options.isEmpty)
	        return multiPoint;

	    var previousPoint = new Point(0, 0, options.hasZ ? 0 : undefined, options.hasM ? 0 : undefined);
	    var pointCount = value.readVarInt();

	    for (var i = 0; i < pointCount; i++)
	        multiPoint.points.push(Point._readTwkbPoint(value, options, previousPoint));

	    return multiPoint;
	};

	MultiPoint._parseGeoJSON = function (value) {
	    var multiPoint = new MultiPoint();

	    if (value.coordinates.length > 0)
	        multiPoint.hasZ = value.coordinates[0].length > 2;

	    for (var i = 0; i < value.coordinates.length; i++)
	        multiPoint.points.push(Point._parseGeoJSON({ coordinates: value.coordinates[i] }));

	    return multiPoint;
	};

	MultiPoint.prototype.toWkt = function () {
	    if (this.points.length === 0)
	        return this._getWktType(Types.wkt.MultiPoint, true);

	    var wkt = this._getWktType(Types.wkt.MultiPoint, false) + '(';

	    for (var i = 0; i < this.points.length; i++)
	        wkt += this._getWktCoordinate(this.points[i]) + ',';

	    wkt = wkt.slice(0, -1);
	    wkt += ')';

	    return wkt;
	};

	MultiPoint.prototype.toWkb = function () {
	    var wkb = new BinaryWriter(this._getWkbSize());

	    wkb.writeInt8(1);

	    this._writeWkbType(wkb, Types.wkb.MultiPoint);
	    wkb.writeUInt32LE(this.points.length);

	    for (var i = 0; i < this.points.length; i++)
	        wkb.writeBuffer(this.points[i].toWkb({ srid: this.srid }));

	    return wkb.buffer;
	};

	MultiPoint.prototype.toTwkb = function () {
	    var twkb = new BinaryWriter(0, true);

	    var precision = Geometry.getTwkbPrecision(5, 0, 0);
	    var isEmpty = this.points.length === 0;

	    this._writeTwkbHeader(twkb, Types.wkb.MultiPoint, precision, isEmpty);

	    if (this.points.length > 0) {
	        twkb.writeVarInt(this.points.length);

	        var previousPoint = new Point(0, 0, 0, 0);
	        for (var i = 0; i < this.points.length; i++)
	            this.points[i]._writeTwkbPoint(twkb, precision, previousPoint);
	    }

	    return twkb.buffer;
	};

	MultiPoint.prototype._getWkbSize = function () {
	    var coordinateSize = 16;

	    if (this.hasZ)
	        coordinateSize += 8;
	    if (this.hasM)
	        coordinateSize += 8;

	    coordinateSize += 5;

	    return 1 + 4 + 4 + (this.points.length * coordinateSize);
	};

	MultiPoint.prototype.toGeoJSON = function (options) {
	    var geoJSON = Geometry.prototype.toGeoJSON.call(this, options);
	    geoJSON.type = Types.geoJSON.MultiPoint;
	    geoJSON.coordinates = [];

	    for (var i = 0; i < this.points.length; i++)
	        geoJSON.coordinates.push(this.points[i].toGeoJSON().coordinates);

	    return geoJSON;
	};
	return multipoint;
}

var multilinestring;
var hasRequiredMultilinestring;

function requireMultilinestring () {
	if (hasRequiredMultilinestring) return multilinestring;
	hasRequiredMultilinestring = 1;
	multilinestring = MultiLineString;

	var util = require$$0;

	var Types = types;
	var Geometry = requireGeometry();
	var Point = requirePoint();
	var LineString = requireLinestring();
	var BinaryWriter = binarywriter;

	function MultiLineString(lineStrings, srid) {
	    Geometry.call(this);

	    this.lineStrings = lineStrings || [];
		this.srid = srid;

	    if (this.lineStrings.length > 0) {
	        this.hasZ = this.lineStrings[0].hasZ;
	        this.hasM = this.lineStrings[0].hasM;
	    }
	}

	util.inherits(MultiLineString, Geometry);

	MultiLineString.Z = function (lineStrings, srid) {
	    var multiLineString = new MultiLineString(lineStrings, srid);
	    multiLineString.hasZ = true;
	    return multiLineString;
	};

	MultiLineString.M = function (lineStrings, srid) {
	    var multiLineString = new MultiLineString(lineStrings, srid);
	    multiLineString.hasM = true;
	    return multiLineString;
	};

	MultiLineString.ZM = function (lineStrings, srid) {
	    var multiLineString = new MultiLineString(lineStrings, srid);
	    multiLineString.hasZ = true;
	    multiLineString.hasM = true;
	    return multiLineString;
	};

	MultiLineString._parseWkt = function (value, options) {
	    var multiLineString = new MultiLineString();
	    multiLineString.srid = options.srid;
	    multiLineString.hasZ = options.hasZ;
	    multiLineString.hasM = options.hasM;

	    if (value.isMatch(['EMPTY']))
	        return multiLineString;

	    value.expectGroupStart();

	    do {
	        value.expectGroupStart();
	        multiLineString.lineStrings.push(new LineString(value.matchCoordinates(options)));
	        value.expectGroupEnd();
	    } while (value.isMatch([',']));

	    value.expectGroupEnd();

	    return multiLineString;
	};

	MultiLineString._parseWkb = function (value, options) {
	    var multiLineString = new MultiLineString();
	    multiLineString.srid = options.srid;
	    multiLineString.hasZ = options.hasZ;
	    multiLineString.hasM = options.hasM;

	    var lineStringCount = value.readUInt32();

	    for (var i = 0; i < lineStringCount; i++)
	        multiLineString.lineStrings.push(Geometry.parse(value, options));

	    return multiLineString;
	};

	MultiLineString._parseTwkb = function (value, options) {
	    var multiLineString = new MultiLineString();
	    multiLineString.hasZ = options.hasZ;
	    multiLineString.hasM = options.hasM;

	    if (options.isEmpty)
	        return multiLineString;

	    var previousPoint = new Point(0, 0, options.hasZ ? 0 : undefined, options.hasM ? 0 : undefined);
	    var lineStringCount = value.readVarInt();

	    for (var i = 0; i < lineStringCount; i++) {
	        var lineString = new LineString();
	        lineString.hasZ = options.hasZ;
	        lineString.hasM = options.hasM;

	        var pointCount = value.readVarInt();

	        for (var j = 0; j < pointCount; j++)
	            lineString.points.push(Point._readTwkbPoint(value, options, previousPoint));

	        multiLineString.lineStrings.push(lineString);
	    }

	    return multiLineString;
	};

	MultiLineString._parseGeoJSON = function (value) {
	    var multiLineString = new MultiLineString();

	    if (value.coordinates.length > 0 && value.coordinates[0].length > 0)
	        multiLineString.hasZ = value.coordinates[0][0].length > 2;

	    for (var i = 0; i < value.coordinates.length; i++)
	        multiLineString.lineStrings.push(LineString._parseGeoJSON({ coordinates: value.coordinates[i] }));

	    return multiLineString;
	};

	MultiLineString.prototype.toWkt = function () {
	    if (this.lineStrings.length === 0)
	        return this._getWktType(Types.wkt.MultiLineString, true);

	    var wkt = this._getWktType(Types.wkt.MultiLineString, false) + '(';

	    for (var i = 0; i < this.lineStrings.length; i++)
	        wkt += this.lineStrings[i]._toInnerWkt() + ',';

	    wkt = wkt.slice(0, -1);
	    wkt += ')';

	    return wkt;
	};

	MultiLineString.prototype.toWkb = function () {
	    var wkb = new BinaryWriter(this._getWkbSize());

	    wkb.writeInt8(1);

	    this._writeWkbType(wkb, Types.wkb.MultiLineString);
	    wkb.writeUInt32LE(this.lineStrings.length);

	    for (var i = 0; i < this.lineStrings.length; i++)
	        wkb.writeBuffer(this.lineStrings[i].toWkb({ srid: this.srid }));

	    return wkb.buffer;
	};

	MultiLineString.prototype.toTwkb = function () {
	    var twkb = new BinaryWriter(0, true);

	    var precision = Geometry.getTwkbPrecision(5, 0, 0);
	    var isEmpty = this.lineStrings.length === 0;

	    this._writeTwkbHeader(twkb, Types.wkb.MultiLineString, precision, isEmpty);

	    if (this.lineStrings.length > 0) {
	        twkb.writeVarInt(this.lineStrings.length);

	        var previousPoint = new Point(0, 0, 0, 0);
	        for (var i = 0; i < this.lineStrings.length; i++) {
	            twkb.writeVarInt(this.lineStrings[i].points.length);

	            for (var j = 0; j < this.lineStrings[i].points.length; j++)
	                this.lineStrings[i].points[j]._writeTwkbPoint(twkb, precision, previousPoint);
	        }
	    }

	    return twkb.buffer;
	};

	MultiLineString.prototype._getWkbSize = function () {
	    var size = 1 + 4 + 4;

	    for (var i = 0; i < this.lineStrings.length; i++)
	        size += this.lineStrings[i]._getWkbSize();

	    return size;
	};

	MultiLineString.prototype.toGeoJSON = function (options) {
	    var geoJSON = Geometry.prototype.toGeoJSON.call(this, options);
	    geoJSON.type = Types.geoJSON.MultiLineString;
	    geoJSON.coordinates = [];

	    for (var i = 0; i < this.lineStrings.length; i++)
	        geoJSON.coordinates.push(this.lineStrings[i].toGeoJSON().coordinates);

	    return geoJSON;
	};
	return multilinestring;
}

var multipolygon;
var hasRequiredMultipolygon;

function requireMultipolygon () {
	if (hasRequiredMultipolygon) return multipolygon;
	hasRequiredMultipolygon = 1;
	multipolygon = MultiPolygon;

	var util = require$$0;

	var Types = types;
	var Geometry = requireGeometry();
	var Point = requirePoint();
	var Polygon = requirePolygon();
	var BinaryWriter = binarywriter;

	function MultiPolygon(polygons, srid) {
	    Geometry.call(this);

	    this.polygons = polygons || [];
		this.srid = srid;

	    if (this.polygons.length > 0) {
	        this.hasZ = this.polygons[0].hasZ;
	        this.hasM = this.polygons[0].hasM;
	    }
	}

	util.inherits(MultiPolygon, Geometry);

	MultiPolygon.Z = function (polygons, srid) {
	    var multiPolygon = new MultiPolygon(polygons, srid);
	    multiPolygon.hasZ = true;
	    return multiPolygon;
	};

	MultiPolygon.M = function (polygons, srid) {
	    var multiPolygon = new MultiPolygon(polygons, srid);
	    multiPolygon.hasM = true;
	    return multiPolygon;
	};

	MultiPolygon.ZM = function (polygons, srid) {
	    var multiPolygon = new MultiPolygon(polygons, srid);
	    multiPolygon.hasZ = true;
	    multiPolygon.hasM = true;
	    return multiPolygon;
	};

	MultiPolygon._parseWkt = function (value, options) {
	    var multiPolygon = new MultiPolygon();
	    multiPolygon.srid = options.srid;
	    multiPolygon.hasZ = options.hasZ;
	    multiPolygon.hasM = options.hasM;

	    if (value.isMatch(['EMPTY']))
	        return multiPolygon;

	    value.expectGroupStart();

	    do {
	        value.expectGroupStart();

	        var exteriorRing = [];
	        var interiorRings = [];

	        value.expectGroupStart();
	        exteriorRing.push.apply(exteriorRing, value.matchCoordinates(options));
	        value.expectGroupEnd();

	        while (value.isMatch([','])) {
	            value.expectGroupStart();
	            interiorRings.push(value.matchCoordinates(options));
	            value.expectGroupEnd();
	        }

	        multiPolygon.polygons.push(new Polygon(exteriorRing, interiorRings));

	        value.expectGroupEnd();

	    } while (value.isMatch([',']));

	    value.expectGroupEnd();

	    return multiPolygon;
	};

	MultiPolygon._parseWkb = function (value, options) {
	    var multiPolygon = new MultiPolygon();
	    multiPolygon.srid = options.srid;
	    multiPolygon.hasZ = options.hasZ;
	    multiPolygon.hasM = options.hasM;

	    var polygonCount = value.readUInt32();

	    for (var i = 0; i < polygonCount; i++)
	        multiPolygon.polygons.push(Geometry.parse(value, options));

	    return multiPolygon;
	};

	MultiPolygon._parseTwkb = function (value, options) {
	    var multiPolygon = new MultiPolygon();
	    multiPolygon.hasZ = options.hasZ;
	    multiPolygon.hasM = options.hasM;

	    if (options.isEmpty)
	        return multiPolygon;

	    var previousPoint = new Point(0, 0, options.hasZ ? 0 : undefined, options.hasM ? 0 : undefined);
	    var polygonCount = value.readVarInt();

	    for (var i = 0; i < polygonCount; i++) {
	        var polygon = new Polygon();
	        polygon.hasZ = options.hasZ;
	        polygon.hasM = options.hasM;

	        var ringCount = value.readVarInt();
	        var exteriorRingCount = value.readVarInt();

	        for (var j = 0; j < exteriorRingCount; j++)
	            polygon.exteriorRing.push(Point._readTwkbPoint(value, options, previousPoint));

	        for (j = 1; j < ringCount; j++) {
	            var interiorRing = [];

	            var interiorRingCount = value.readVarInt();

	            for (var k = 0; k < interiorRingCount; k++)
	                interiorRing.push(Point._readTwkbPoint(value, options, previousPoint));

	            polygon.interiorRings.push(interiorRing);
	        }

	        multiPolygon.polygons.push(polygon);
	    }

	    return multiPolygon;
	};

	MultiPolygon._parseGeoJSON = function (value) {
	    var multiPolygon = new MultiPolygon();

	    if (value.coordinates.length > 0 && value.coordinates[0].length > 0 && value.coordinates[0][0].length > 0)
	        multiPolygon.hasZ = value.coordinates[0][0][0].length > 2;

	    for (var i = 0; i < value.coordinates.length; i++)
	        multiPolygon.polygons.push(Polygon._parseGeoJSON({ coordinates: value.coordinates[i] }));

	    return multiPolygon;
	};

	MultiPolygon.prototype.toWkt = function () {
	    if (this.polygons.length === 0)
	        return this._getWktType(Types.wkt.MultiPolygon, true);

	    var wkt = this._getWktType(Types.wkt.MultiPolygon, false) + '(';

	    for (var i = 0; i < this.polygons.length; i++)
	        wkt += this.polygons[i]._toInnerWkt() + ',';

	    wkt = wkt.slice(0, -1);
	    wkt += ')';

	    return wkt;
	};

	MultiPolygon.prototype.toWkb = function () {
	    var wkb = new BinaryWriter(this._getWkbSize());

	    wkb.writeInt8(1);

	    this._writeWkbType(wkb, Types.wkb.MultiPolygon);
	    wkb.writeUInt32LE(this.polygons.length);

	    for (var i = 0; i < this.polygons.length; i++)
	        wkb.writeBuffer(this.polygons[i].toWkb({ srid: this.srid }));

	    return wkb.buffer;
	};

	MultiPolygon.prototype.toTwkb = function () {
	    var twkb = new BinaryWriter(0, true);

	    var precision = Geometry.getTwkbPrecision(5, 0, 0);
	    var isEmpty = this.polygons.length === 0;

	    this._writeTwkbHeader(twkb, Types.wkb.MultiPolygon, precision, isEmpty);

	    if (this.polygons.length > 0) {
	        twkb.writeVarInt(this.polygons.length);

	        var previousPoint = new Point(0, 0, 0, 0);
	        for (var i = 0; i < this.polygons.length; i++) {
	            twkb.writeVarInt(1 + this.polygons[i].interiorRings.length);

	            twkb.writeVarInt(this.polygons[i].exteriorRing.length);

	            for (var j = 0; j < this.polygons[i].exteriorRing.length; j++)
	                this.polygons[i].exteriorRing[j]._writeTwkbPoint(twkb, precision, previousPoint);

	            for (j = 0; j < this.polygons[i].interiorRings.length; j++) {
	                twkb.writeVarInt(this.polygons[i].interiorRings[j].length);

	                for (var k = 0; k < this.polygons[i].interiorRings[j].length; k++)
	                    this.polygons[i].interiorRings[j][k]._writeTwkbPoint(twkb, precision, previousPoint);
	            }
	        }
	    }

	    return twkb.buffer;
	};

	MultiPolygon.prototype._getWkbSize = function () {
	    var size = 1 + 4 + 4;

	    for (var i = 0; i < this.polygons.length; i++)
	        size += this.polygons[i]._getWkbSize();

	    return size;
	};

	MultiPolygon.prototype.toGeoJSON = function (options) {
	    var geoJSON = Geometry.prototype.toGeoJSON.call(this, options);
	    geoJSON.type = Types.geoJSON.MultiPolygon;
	    geoJSON.coordinates = [];

	    for (var i = 0; i < this.polygons.length; i++)
	        geoJSON.coordinates.push(this.polygons[i].toGeoJSON().coordinates);

	    return geoJSON;
	};
	return multipolygon;
}

var geometrycollection;
var hasRequiredGeometrycollection;

function requireGeometrycollection () {
	if (hasRequiredGeometrycollection) return geometrycollection;
	hasRequiredGeometrycollection = 1;
	geometrycollection = GeometryCollection;

	var util = require$$0;

	var Types = types;
	var Geometry = requireGeometry();
	var BinaryWriter = binarywriter;

	function GeometryCollection(geometries, srid) {
	    Geometry.call(this);

	    this.geometries = geometries || [];
		this.srid = srid;

	    if (this.geometries.length > 0) {
	        this.hasZ = this.geometries[0].hasZ;
	        this.hasM = this.geometries[0].hasM;
	    }
	}

	util.inherits(GeometryCollection, Geometry);

	GeometryCollection.Z = function (geometries, srid) {
	    var geometryCollection = new GeometryCollection(geometries, srid);
	    geometryCollection.hasZ = true;
	    return geometryCollection;
	};

	GeometryCollection.M = function (geometries, srid) {
	    var geometryCollection = new GeometryCollection(geometries, srid);
	    geometryCollection.hasM = true;
	    return geometryCollection;
	};

	GeometryCollection.ZM = function (geometries, srid) {
	    var geometryCollection = new GeometryCollection(geometries, srid);
	    geometryCollection.hasZ = true;
	    geometryCollection.hasM = true;
	    return geometryCollection;
	};

	GeometryCollection._parseWkt = function (value, options) {
	    var geometryCollection = new GeometryCollection();
	    geometryCollection.srid = options.srid;
	    geometryCollection.hasZ = options.hasZ;
	    geometryCollection.hasM = options.hasM;

	    if (value.isMatch(['EMPTY']))
	        return geometryCollection;

	    value.expectGroupStart();

	    do {
	        geometryCollection.geometries.push(Geometry.parse(value));
	    } while (value.isMatch([',']));

	    value.expectGroupEnd();

	    return geometryCollection;
	};

	GeometryCollection._parseWkb = function (value, options) {
	    var geometryCollection = new GeometryCollection();
	    geometryCollection.srid = options.srid;
	    geometryCollection.hasZ = options.hasZ;
	    geometryCollection.hasM = options.hasM;

	    var geometryCount = value.readUInt32();

	    for (var i = 0; i < geometryCount; i++)
	        geometryCollection.geometries.push(Geometry.parse(value, options));

	    return geometryCollection;
	};

	GeometryCollection._parseTwkb = function (value, options) {
	    var geometryCollection = new GeometryCollection();
	    geometryCollection.hasZ = options.hasZ;
	    geometryCollection.hasM = options.hasM;

	    if (options.isEmpty)
	        return geometryCollection;

	    var geometryCount = value.readVarInt();

	    for (var i = 0; i < geometryCount; i++)
	        geometryCollection.geometries.push(Geometry.parseTwkb(value));

	    return geometryCollection;
	};

	GeometryCollection._parseGeoJSON = function (value) {
	    var geometryCollection = new GeometryCollection();

	    for (var i = 0; i < value.geometries.length; i++)
	        geometryCollection.geometries.push(Geometry._parseGeoJSON(value.geometries[i], true));

	    if (geometryCollection.geometries.length > 0)
	        geometryCollection.hasZ = geometryCollection.geometries[0].hasZ;

	    return geometryCollection;
	};

	GeometryCollection.prototype.toWkt = function () {
	    if (this.geometries.length === 0)
	        return this._getWktType(Types.wkt.GeometryCollection, true);

	    var wkt = this._getWktType(Types.wkt.GeometryCollection, false) + '(';

	    for (var i = 0; i < this.geometries.length; i++)
	        wkt += this.geometries[i].toWkt() + ',';

	    wkt = wkt.slice(0, -1);
	    wkt += ')';

	    return wkt;
	};

	GeometryCollection.prototype.toWkb = function () {
	    var wkb = new BinaryWriter(this._getWkbSize());

	    wkb.writeInt8(1);

	    this._writeWkbType(wkb, Types.wkb.GeometryCollection);
	    wkb.writeUInt32LE(this.geometries.length);

	    for (var i = 0; i < this.geometries.length; i++)
	        wkb.writeBuffer(this.geometries[i].toWkb({ srid: this.srid }));

	    return wkb.buffer;
	};

	GeometryCollection.prototype.toTwkb = function () {
	    var twkb = new BinaryWriter(0, true);

	    var precision = Geometry.getTwkbPrecision(5, 0, 0);
	    var isEmpty = this.geometries.length === 0;

	    this._writeTwkbHeader(twkb, Types.wkb.GeometryCollection, precision, isEmpty);

	    if (this.geometries.length > 0) {
	        twkb.writeVarInt(this.geometries.length);

	        for (var i = 0; i < this.geometries.length; i++)
	            twkb.writeBuffer(this.geometries[i].toTwkb());
	    }

	    return twkb.buffer;
	};

	GeometryCollection.prototype._getWkbSize = function () {
	    var size = 1 + 4 + 4;

	    for (var i = 0; i < this.geometries.length; i++)
	        size += this.geometries[i]._getWkbSize();

	    return size;
	};

	GeometryCollection.prototype.toGeoJSON = function (options) {
	    var geoJSON = Geometry.prototype.toGeoJSON.call(this, options);
	    geoJSON.type = Types.geoJSON.GeometryCollection;
	    geoJSON.geometries = [];

	    for (var i = 0; i < this.geometries.length; i++)
	        geoJSON.geometries.push(this.geometries[i].toGeoJSON());

	    return geoJSON;
	};
	return geometrycollection;
}

var binaryreader = BinaryReader;

function BinaryReader(buffer, isBigEndian) {
    this.buffer = buffer;
    this.position = 0;
    this.isBigEndian = isBigEndian || false;
}

function _read(readLE, readBE, size) {
    return function () {
        var value;

        if (this.isBigEndian)
            value = readBE.call(this.buffer, this.position);
        else
            value = readLE.call(this.buffer, this.position);

        this.position += size;

        return value;
    };
}

BinaryReader.prototype.readUInt8 = _read(Buffer.prototype.readUInt8, Buffer.prototype.readUInt8, 1);
BinaryReader.prototype.readUInt16 = _read(Buffer.prototype.readUInt16LE, Buffer.prototype.readUInt16BE, 2);
BinaryReader.prototype.readUInt32 = _read(Buffer.prototype.readUInt32LE, Buffer.prototype.readUInt32BE, 4);
BinaryReader.prototype.readInt8 = _read(Buffer.prototype.readInt8, Buffer.prototype.readInt8, 1);
BinaryReader.prototype.readInt16 = _read(Buffer.prototype.readInt16LE, Buffer.prototype.readInt16BE, 2);
BinaryReader.prototype.readInt32 = _read(Buffer.prototype.readInt32LE, Buffer.prototype.readInt32BE, 4);
BinaryReader.prototype.readFloat = _read(Buffer.prototype.readFloatLE, Buffer.prototype.readFloatBE, 4);
BinaryReader.prototype.readDouble = _read(Buffer.prototype.readDoubleLE, Buffer.prototype.readDoubleBE, 8);

BinaryReader.prototype.readVarInt = function () {
    var nextByte,
        result = 0,
        bytesRead = 0;

    do {
        nextByte = this.buffer[this.position + bytesRead];
        result += (nextByte & 0x7F) << (7 * bytesRead);
        bytesRead++;
    } while (nextByte >= 0x80);

    this.position += bytesRead;

    return result;
};

var wktparser;
var hasRequiredWktparser;

function requireWktparser () {
	if (hasRequiredWktparser) return wktparser;
	hasRequiredWktparser = 1;
	wktparser = WktParser;

	var Types = types;
	var Point = requirePoint();

	function WktParser(value) {
	    this.value = value;
	    this.position = 0;
	}

	WktParser.prototype.match = function (tokens) {
	    this.skipWhitespaces();

	    for (var i = 0; i < tokens.length; i++) {
	        if (this.value.substring(this.position).indexOf(tokens[i]) === 0) {
	            this.position += tokens[i].length;
	            return tokens[i];
	        }
	    }

	    return null;
	};

	WktParser.prototype.matchRegex = function (tokens) {
	    this.skipWhitespaces();

	    for (var i = 0; i < tokens.length; i++) {
	        var match = this.value.substring(this.position).match(tokens[i]);

	        if (match) {
	            this.position += match[0].length;
	            return match;
	        }
	    }

	    return null;
	};

	WktParser.prototype.isMatch = function (tokens) {
	    this.skipWhitespaces();

	    for (var i = 0; i < tokens.length; i++) {
	        if (this.value.substring(this.position).indexOf(tokens[i]) === 0) {
	            this.position += tokens[i].length;
	            return true;
	        }
	    }

	    return false;
	};

	WktParser.prototype.matchType = function () {
	    var geometryType = this.match([Types.wkt.Point, Types.wkt.LineString, Types.wkt.Polygon, Types.wkt.MultiPoint,
	    Types.wkt.MultiLineString, Types.wkt.MultiPolygon, Types.wkt.GeometryCollection]);

	    if (!geometryType)
	        throw new Error('Expected geometry type');

	    return geometryType;
	};

	WktParser.prototype.matchDimension = function () {
	    var dimension = this.match(['ZM', 'Z', 'M']);

	    switch (dimension) {
	        case 'ZM': return { hasZ: true, hasM: true };
	        case 'Z': return { hasZ: true, hasM: false };
	        case 'M': return { hasZ: false, hasM: true };
	        default: return { hasZ: false, hasM: false };
	    }
	};

	WktParser.prototype.expectGroupStart = function () {
	    if (!this.isMatch(['(']))
	        throw new Error('Expected group start');
	};

	WktParser.prototype.expectGroupEnd = function () {
	    if (!this.isMatch([')']))
	        throw new Error('Expected group end');
	};

	WktParser.prototype.matchCoordinate = function (options) {
	    var match;

	    if (options.hasZ && options.hasM)
	        match = this.matchRegex([/^(\S*)\s+(\S*)\s+(\S*)\s+([^\s,)]*)/]);
	    else if (options.hasZ || options.hasM)
	        match = this.matchRegex([/^(\S*)\s+(\S*)\s+([^\s,)]*)/]);
	    else
	        match = this.matchRegex([/^(\S*)\s+([^\s,)]*)/]);

	    if (!match)
	        throw new Error('Expected coordinates');

	    if (options.hasZ && options.hasM)
	        return new Point(parseFloat(match[1]), parseFloat(match[2]), parseFloat(match[3]), parseFloat(match[4]));
	    else if (options.hasZ)
	        return new Point(parseFloat(match[1]), parseFloat(match[2]), parseFloat(match[3]));
	    else if (options.hasM)
	        return new Point(parseFloat(match[1]), parseFloat(match[2]), undefined, parseFloat(match[3]));
	    else
	        return new Point(parseFloat(match[1]), parseFloat(match[2]));
	};

	WktParser.prototype.matchCoordinates = function (options) {
	    var coordinates = [];

	    do {
	        var startsWithBracket = this.isMatch(['(']);

	        coordinates.push(this.matchCoordinate(options));

	        if (startsWithBracket)
	            this.expectGroupEnd();
	    } while (this.isMatch([',']));

	    return coordinates;
	};

	WktParser.prototype.skipWhitespaces = function () {
	    while (this.position < this.value.length && this.value[this.position] === ' ')
	        this.position++;
	};
	return wktparser;
}

var geometry;
var hasRequiredGeometry;

function requireGeometry () {
	if (hasRequiredGeometry) return geometry;
	hasRequiredGeometry = 1;
	geometry = Geometry;

	var Types = types;
	var Point = requirePoint();
	var LineString = requireLinestring();
	var Polygon = requirePolygon();
	var MultiPoint = requireMultipoint();
	var MultiLineString = requireMultilinestring();
	var MultiPolygon = requireMultipolygon();
	var GeometryCollection = requireGeometrycollection();
	var BinaryReader = binaryreader;
	var BinaryWriter = binarywriter;
	var WktParser = requireWktparser();
	var ZigZag = zigzag;

	function Geometry() {
	    this.srid = undefined;
	    this.hasZ = false;
	    this.hasM = false;
	}

	Geometry.parse = function (value, options) {
	    var valueType = typeof value;

	    if (valueType === 'string' || value instanceof WktParser)
	        return Geometry._parseWkt(value);
	    else if (Buffer.isBuffer(value) || value instanceof BinaryReader)
	        return Geometry._parseWkb(value, options);
	    else
	        throw new Error('first argument must be a string or Buffer');
	};

	Geometry._parseWkt = function (value) {
	    var wktParser,
	        srid;

	    if (value instanceof WktParser)
	        wktParser = value;
	    else
	        wktParser = new WktParser(value);

	    var match = wktParser.matchRegex([/^SRID=(\d+);/]);
	    if (match)
	        srid = parseInt(match[1], 10);

	    var geometryType = wktParser.matchType();
	    var dimension = wktParser.matchDimension();

	    var options = {
	        srid: srid,
	        hasZ: dimension.hasZ,
	        hasM: dimension.hasM
	    };

	    switch (geometryType) {
	        case Types.wkt.Point:
	            return Point._parseWkt(wktParser, options);
	        case Types.wkt.LineString:
	            return LineString._parseWkt(wktParser, options);
	        case Types.wkt.Polygon:
	            return Polygon._parseWkt(wktParser, options);
	        case Types.wkt.MultiPoint:
	            return MultiPoint._parseWkt(wktParser, options);
	        case Types.wkt.MultiLineString:
	            return MultiLineString._parseWkt(wktParser, options);
	        case Types.wkt.MultiPolygon:
	            return MultiPolygon._parseWkt(wktParser, options);
	        case Types.wkt.GeometryCollection:
	            return GeometryCollection._parseWkt(wktParser, options);
	    }
	};

	Geometry._parseWkb = function (value, parentOptions) {
	    var binaryReader,
	        wkbType,
	        geometryType,
	        options = {};

	    if (value instanceof BinaryReader)
	        binaryReader = value;
	    else
	        binaryReader = new BinaryReader(value);

	    binaryReader.isBigEndian = !binaryReader.readInt8();

	    wkbType = binaryReader.readUInt32();

	    options.hasSrid = (wkbType & 0x20000000) === 0x20000000;
	    options.isEwkb = (wkbType & 0x20000000) || (wkbType & 0x40000000) || (wkbType & 0x80000000);

	    if (options.hasSrid)
	        options.srid = binaryReader.readUInt32();

	    options.hasZ = false;
	    options.hasM = false;

	    if (!options.isEwkb && (!parentOptions || !parentOptions.isEwkb)) {
	        if (wkbType >= 1000 && wkbType < 2000) {
	            options.hasZ = true;
	            geometryType = wkbType - 1000;
	        }
	        else if (wkbType >= 2000 && wkbType < 3000) {
	            options.hasM = true;
	            geometryType = wkbType - 2000;
	        }
	        else if (wkbType >= 3000 && wkbType < 4000) {
	            options.hasZ = true;
	            options.hasM = true;
	            geometryType = wkbType - 3000;
	        }
	        else {
	            geometryType = wkbType;
	        }
	    }
	    else {
	        if (wkbType & 0x80000000)
	            options.hasZ = true;
	        if (wkbType & 0x40000000)
	            options.hasM = true;

	        geometryType = wkbType & 0xF;
	    }

	    switch (geometryType) {
	        case Types.wkb.Point:
	            return Point._parseWkb(binaryReader, options);
	        case Types.wkb.LineString:
	            return LineString._parseWkb(binaryReader, options);
	        case Types.wkb.Polygon:
	            return Polygon._parseWkb(binaryReader, options);
	        case Types.wkb.MultiPoint:
	            return MultiPoint._parseWkb(binaryReader, options);
	        case Types.wkb.MultiLineString:
	            return MultiLineString._parseWkb(binaryReader, options);
	        case Types.wkb.MultiPolygon:
	            return MultiPolygon._parseWkb(binaryReader, options);
	        case Types.wkb.GeometryCollection:
	            return GeometryCollection._parseWkb(binaryReader, options);
	        default:
	            throw new Error('GeometryType ' + geometryType + ' not supported');
	    }
	};

	Geometry.parseTwkb = function (value) {
	    var binaryReader,
	        options = {};

	    if (value instanceof BinaryReader)
	        binaryReader = value;
	    else
	        binaryReader = new BinaryReader(value);

	    var type = binaryReader.readUInt8();
	    var metadataHeader = binaryReader.readUInt8();

	    var geometryType = type & 0x0F;
	    options.precision = ZigZag.decode(type >> 4);
	    options.precisionFactor = Math.pow(10, options.precision);

	    options.hasBoundingBox = metadataHeader >> 0 & 1;
	    options.hasSizeAttribute = metadataHeader >> 1 & 1;
	    options.hasIdList = metadataHeader >> 2 & 1;
	    options.hasExtendedPrecision = metadataHeader >> 3 & 1;
	    options.isEmpty = metadataHeader >> 4 & 1;

	    if (options.hasExtendedPrecision) {
	        var extendedPrecision = binaryReader.readUInt8();
	        options.hasZ = (extendedPrecision & 0x01) === 0x01;
	        options.hasM = (extendedPrecision & 0x02) === 0x02;

	        options.zPrecision = ZigZag.decode((extendedPrecision & 0x1C) >> 2);
	        options.zPrecisionFactor = Math.pow(10, options.zPrecision);

	        options.mPrecision = ZigZag.decode((extendedPrecision & 0xE0) >> 5);
	        options.mPrecisionFactor = Math.pow(10, options.mPrecision);
	    }
	    else {
	        options.hasZ = false;
	        options.hasM = false;
	    }

	    if (options.hasSizeAttribute)
	        binaryReader.readVarInt();
	    if (options.hasBoundingBox) {
	        var dimensions = 2;

	        if (options.hasZ)
	            dimensions++;
	        if (options.hasM)
	            dimensions++;

	        for (var i = 0; i < dimensions; i++) {
	            binaryReader.readVarInt();
	            binaryReader.readVarInt();
	        }
	    }

	    switch (geometryType) {
	        case Types.wkb.Point:
	            return Point._parseTwkb(binaryReader, options);
	        case Types.wkb.LineString:
	            return LineString._parseTwkb(binaryReader, options);
	        case Types.wkb.Polygon:
	            return Polygon._parseTwkb(binaryReader, options);
	        case Types.wkb.MultiPoint:
	            return MultiPoint._parseTwkb(binaryReader, options);
	        case Types.wkb.MultiLineString:
	            return MultiLineString._parseTwkb(binaryReader, options);
	        case Types.wkb.MultiPolygon:
	            return MultiPolygon._parseTwkb(binaryReader, options);
	        case Types.wkb.GeometryCollection:
	            return GeometryCollection._parseTwkb(binaryReader, options);
	        default:
	            throw new Error('GeometryType ' + geometryType + ' not supported');
	    }
	};

	Geometry.parseGeoJSON = function (value) {
	    return Geometry._parseGeoJSON(value);
	};

	Geometry._parseGeoJSON = function (value, isSubGeometry) {
	    var geometry;

	    switch (value.type) {
	        case Types.geoJSON.Point:
	            geometry = Point._parseGeoJSON(value); break;
	        case Types.geoJSON.LineString:
	            geometry = LineString._parseGeoJSON(value); break;
	        case Types.geoJSON.Polygon:
	            geometry = Polygon._parseGeoJSON(value); break;
	        case Types.geoJSON.MultiPoint:
	            geometry = MultiPoint._parseGeoJSON(value); break;
	        case Types.geoJSON.MultiLineString:
	            geometry = MultiLineString._parseGeoJSON(value); break;
	        case Types.geoJSON.MultiPolygon:
	            geometry = MultiPolygon._parseGeoJSON(value); break;
	        case Types.geoJSON.GeometryCollection:
	            geometry = GeometryCollection._parseGeoJSON(value); break;
	        default:
	            throw new Error('GeometryType ' + value.type + ' not supported');
	    }

	    if (value.crs && value.crs.type && value.crs.type === 'name' && value.crs.properties && value.crs.properties.name) {
	        var crs = value.crs.properties.name;

	        if (crs.indexOf('EPSG:') === 0)
	            geometry.srid = parseInt(crs.substring(5));
	        else if (crs.indexOf('urn:ogc:def:crs:EPSG::') === 0)
	            geometry.srid = parseInt(crs.substring(22));
	        else
	            throw new Error('Unsupported crs: ' + crs);
	    }
	    else if (!isSubGeometry) {
	        geometry.srid = 4326;
	    }

	    return geometry;
	};

	Geometry.prototype.toEwkt = function () {
	    return 'SRID=' + this.srid + ';' + this.toWkt();
	};

	Geometry.prototype.toEwkb = function () {
	    var ewkb = new BinaryWriter(this._getWkbSize() + 4);
	    var wkb = this.toWkb();

	    ewkb.writeInt8(1);
	    ewkb.writeUInt32LE((wkb.slice(1, 5).readUInt32LE(0) | 0x20000000) >>> 0, true);
	    ewkb.writeUInt32LE(this.srid);

	    ewkb.writeBuffer(wkb.slice(5));

	    return ewkb.buffer;
	};

	Geometry.prototype._getWktType = function (wktType, isEmpty) {
	    var wkt = wktType;

	    if (this.hasZ && this.hasM)
	        wkt += ' ZM ';
	    else if (this.hasZ)
	        wkt += ' Z ';
	    else if (this.hasM)
	        wkt += ' M ';

	    if (isEmpty && !this.hasZ && !this.hasM)
	        wkt += ' ';

	    if (isEmpty)
	        wkt += 'EMPTY';

	    return wkt;
	};

	Geometry.prototype._getWktCoordinate = function (point) {
	    var coordinates = point.x + ' ' + point.y;

	    if (this.hasZ)
	        coordinates += ' ' + point.z;
	    if (this.hasM)
	        coordinates += ' ' + point.m;

	    return coordinates;
	};

	Geometry.prototype._writeWkbType = function (wkb, geometryType, parentOptions) {
	    var dimensionType = 0;

	    if (typeof this.srid === 'undefined' && (!parentOptions || typeof parentOptions.srid === 'undefined')) {
	        if (this.hasZ && this.hasM)
	            dimensionType += 3000;
	        else if (this.hasZ)
	            dimensionType += 1000;
	        else if (this.hasM)
	            dimensionType += 2000;
	    }
	    else {
	        if (this.hasZ)
	            dimensionType |= 0x80000000;
	        if (this.hasM)
	            dimensionType |= 0x40000000;
	    }

	    wkb.writeUInt32LE((dimensionType + geometryType) >>> 0, true);
	};

	Geometry.getTwkbPrecision = function (xyPrecision, zPrecision, mPrecision) {
	    return {
	        xy: xyPrecision,
	        z: zPrecision,
	        m: mPrecision,
	        xyFactor: Math.pow(10, xyPrecision),
	        zFactor: Math.pow(10, zPrecision),
	        mFactor: Math.pow(10, mPrecision)
	    };
	};

	Geometry.prototype._writeTwkbHeader = function (twkb, geometryType, precision, isEmpty) {
	    var type = (ZigZag.encode(precision.xy) << 4) + geometryType;
	    var metadataHeader = (this.hasZ || this.hasM) << 3;
	    metadataHeader += isEmpty << 4;

	    twkb.writeUInt8(type);
	    twkb.writeUInt8(metadataHeader);

	    if (this.hasZ || this.hasM) {
	        var extendedPrecision = 0;
	        if (this.hasZ)
	            extendedPrecision |= 0x1;
	        if (this.hasM)
	            extendedPrecision |= 0x2;

	        twkb.writeUInt8(extendedPrecision);
	    }
	};

	Geometry.prototype.toGeoJSON = function (options) {
	    var geoJSON = {};

	    if (this.srid) {
	        if (options) {
	            if (options.shortCrs) {
	                geoJSON.crs = {
	                    type: 'name',
	                    properties: {
	                        name: 'EPSG:' + this.srid
	                    }
	                };
	            }
	            else if (options.longCrs) {
	                geoJSON.crs = {
	                    type: 'name',
	                    properties: {
	                        name: 'urn:ogc:def:crs:EPSG::' + this.srid
	                    }
	                };
	            }
	        }
	    }

	    return geoJSON;
	};
	return geometry;
}

var Geometry = requireGeometry();
requirePoint();
requireLinestring();
requirePolygon();
requireMultipoint();
requireMultilinestring();
requireMultipolygon();
requireGeometrycollection();

/*
Most of the code in this file is copied from Turf.js, 
with some modifications to make it work with GEOS instead of JSTS.

The MIT License (MIT)

Copyright (c) 2017 TurfJS

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

/**
 * Calculates a buffer for input features for a given radius. Units supported are miles, kilometers, and degrees.
 *
 * When using a negative radius, the resulting geometry may be invalid if
 * it's too small compared to the radius magnitude. If the input is a
 * FeatureCollection, only valid members will be returned in the output
 * FeatureCollection - i.e., the output collection may have fewer members than
 * the input, or even be empty.
 *
 * @name buffer
 * @param {FeatureCollection|Geometry|Feature<any>} geojson input to be buffered
 * @param {number} radius distance to draw the buffer (negative values are allowed)
 * @param {Object} [options={}] Optional parameters
 * @param {string} [options.units="kilometers"] any of the options supported by turf units
 * @param {number} [options.steps=8] number of steps
 * @param {number} [options.endCapStyle=1] end cap style (1 = round, 2 = flat, 3 = square)
 * @param {number} [options.joinStyle=1] join style (1 = round, 2 = mitre, 3 = bevel)
 * @param {number} [options.mitreLimit=5] mitre limit
 * @param {boolean} [options.singleSided=false] whether to generate a single-sided or double-sided buffer
 * @returns {FeatureCollection|Feature<Polygon|MultiPolygon>|undefined} buffered features
 * @example
 * const point = turf.point([-90.548630, 14.616599]);
 * const buffered = turf.buffer(point, 500, {units: 'miles'});
 *
 */
function buffer(geojson, radius, options) {
  // Optional params
  options = options || {};

  // use user supplied options or default values
  const units = options.units || "kilometers";
  const steps = options.steps || 8;
  const endCapStyle = options.endCapStyle || 1;
  const joinStyle = options.joinStyle || 1;
  const mitreLimit = options.mitreLimit || 5;
  const singleSided = options.singleSided || false;

  // validation
  if (!geojson) throw new Error("geojson is required");
  if (typeof options !== "object") throw new Error("options must be an object");
  if (typeof steps !== "number") throw new Error("steps must be an number");

  // Allow negative buffers ("erosion") or zero-sized buffers ("repair geometry")
  if (radius === undefined) throw new Error("radius is required");
  if (steps <= 0) throw new Error("steps must be greater than 0");

  const results = [];
  switch (geojson.type) {
    case "GeometryCollection":
      geomEach(geojson, function (geometry) {
        const buffered = bufferFeature(
          geometry,
          radius,
          units,
          steps,
          endCapStyle,
          joinStyle,
          mitreLimit,
          singleSided
        );
        if (buffered) results.push(buffered);
      });
      return featureCollection(results);
    case "FeatureCollection":
      featureEach(geojson, function (feature) {
        const multiBuffered = bufferFeature(
          feature,
          radius,
          units,
          steps,
          endCapStyle,
          joinStyle,
          mitreLimit,
          singleSided
        );
        if (multiBuffered) {
          featureEach(multiBuffered, function (buffered) {
            if (buffered) results.push(buffered);
          });
        }
      });
      return featureCollection(results);
  }
  return bufferFeature(
    geojson,
    radius,
    units,
    steps,
    endCapStyle,
    joinStyle,
    mitreLimit,
    singleSided
  );
}

/**
 * Buffer single Feature/Geometry
 *
 * @private
 * @param {Feature<any>} geojson input to be buffered
 * @param {number} radius distance to draw the buffer
 * @param {string} [units='kilometers'] any of the options supported by turf units
 * @param {number} [steps=8] number of steps
 * @param {number} [endCapStyle=1] end cap style (1 = round, 2 = flat, 3 = square)
 * @param {number} [joinStyle=1] join style (1 = round, 2 = mitre, 3 = bevel)
 * @param {number} [mitreLimit=5] mitre limit ratio
 * @param {boolean} [singleSided=false] whether to buffer just one side of the input line
 * @returns {Feature<Polygon|MultiPolygon>} buffered feature
 */
function bufferFeature(geojson, radius, units, steps, endCapStyle, joinStyle, mitreLimit, singleSided) {
  const properties = geojson.properties || {};
  const geometry = geojson.type === "Feature" ? geojson.geometry : geojson;

  // Geometry Types faster than jsts
  if (geometry.type === "GeometryCollection") {
    const results = [];
    geomEach(geojson, function (geometry) {
      const buffered = bufferFeature(
        geometry,
        radius,
        units,
        steps,
        endCapStyle,
        joinStyle,
        mitreLimit,
        singleSided
      );
      if (buffered) results.push(buffered);
    });
    return featureCollection(results);
  }

  // Project GeoJSON to Azimuthal Equidistant projection (convert to Meters)
  const projection = defineProjection(geometry);

  const projected = {
    type: geometry.type,
    coordinates: projectCoords(geometry.coordinates, projection),
  };

  // GEOS buffer operation
  const isBufferWithParams = endCapStyle || joinStyle || mitreLimit || singleSided;
  let bufferParamsPtr;
  if (isBufferWithParams) {
    bufferParamsPtr = GEOSFunctions.GEOSBufferParams_create();
    if (endCapStyle) {
      GEOSFunctions.GEOSBufferParams_setEndCapStyle(bufferParamsPtr, endCapStyle);
    }
    if (joinStyle) {
      GEOSFunctions.GEOSBufferParams_setJoinStyle(bufferParamsPtr, joinStyle);
    }
    if (mitreLimit) {
      GEOSFunctions.GEOSBufferParams_setMitreLimit(bufferParamsPtr, mitreLimit);
    }
    if (steps) {
      GEOSFunctions.GEOSBufferParams_setQuadrantSegments(bufferParamsPtr, steps);
    }
    if (singleSided) {
      GEOSFunctions.GEOSBufferParams_setSingleSided(bufferParamsPtr, singleSided);
    }
  }
  // create a GEOS object from the GeoJSON
  // geojsonToPointers always returns an array of pointers  
  // const geomPtr = GEOSGeomFromWKT(stringify(projected));
  const wkb = Geometry.parseGeoJSON(projected).toWkb();
  const geomPtr = GEOSGeomFromWKB(wkb);
  const distance = radiansToLength(lengthToRadians(radius, units), "meters");
  let bufferPtr;
  if (isBufferWithParams) {
    bufferPtr = GEOSFunctions.GEOSBufferWithParams(geomPtr, bufferParamsPtr, distance);
  } else {
    bufferPtr = GEOSFunctions.GEOSBuffer(geomPtr, distance, steps);
  }  
  // destroy the bufferParamsPtr if it exists
  if (bufferParamsPtr) {
    GEOSFunctions.GEOSBufferParams_destroy(bufferParamsPtr);
  }
  // update the original GeoJSON with the new geometry
  const bufferedWkb = GeosGeomToWKB(bufferPtr);  
  const buffered = Geometry.parse(bufferedWkb).toGeoJSON();
  // destroy the GEOS objects
  GEOSFunctions.GEOSGeom_destroy(geomPtr);
  GEOSFunctions.GEOSGeom_destroy(bufferPtr);  

  // Detect if empty geometries
  if (coordsIsNaN(buffered.coordinates)) return undefined;

  // Unproject coordinates (convert to Degrees)
  const result = {
    type: buffered.type,
    coordinates: unprojectCoords(buffered.coordinates, projection),
  };

  return feature(result, properties);
}

/**
 * Coordinates isNaN
 *
 * @private
 * @param {Array<any>} coords GeoJSON Coordinates
 * @returns {boolean} if NaN exists
 */
function coordsIsNaN(coords) {
  if (Array.isArray(coords[0])) return coordsIsNaN(coords[0]);
  return isNaN(coords[0]);
}

/**
 * Project coordinates to projection
 *
 * @private
 * @param {Array<any>} coords to project
 * @param {GeoProjection} proj D3 Geo Projection
 * @returns {Array<any>} projected coordinates
 */
function projectCoords(coords, proj) {
  if (typeof coords[0] !== "object") return proj(coords);
  return coords.map(function (coord) {
    return projectCoords(coord, proj);
  });
}

/**
 * Un-Project coordinates to projection
 *
 * @private
 * @param {Array<any>} coords to un-project
 * @param {GeoProjection} proj D3 Geo Projection
 * @returns {Array<any>} un-projected coordinates
 */
function unprojectCoords(coords, proj) {
  if (typeof coords[0] !== "object") return proj.invert(coords);
  return coords.map(function (coord) {
    return unprojectCoords(coord, proj);
  });
}

/**
 * Define Azimuthal Equidistant projection
 *
 * @private
 * @param {Geometry|Feature<any>} geojson Base projection on center of GeoJSON
 * @returns {GeoProjection} D3 Geo Azimuthal Equidistant Projection
 */
function defineProjection(geojson) {
  const coords = center(geojson).geometry.coordinates;
  const rotation = [-coords[0], -coords[1]];
  return geoAzimuthalEquidistant().rotate(rotation).scale(earthRadius);
}

var allJsFunctions = {
  buffer,
  buffer_simple: buffer$1,
  geomToWKT: GEOSGeomToWKT,
  geomFromWKT: GEOSGeomFromWKT
};

var CModule = (() => {
  var _scriptDir = import.meta.url;
  
  return (
async function(moduleArg = {}) {

var Module=moduleArg;var readyPromiseResolve,readyPromiseReject;Module["ready"]=new Promise((resolve,reject)=>{readyPromiseResolve=resolve;readyPromiseReject=reject;});var moduleOverrides=Object.assign({},Module);var thisProgram="./this.program";var ENVIRONMENT_IS_WEB=typeof window=="object";var ENVIRONMENT_IS_WORKER=typeof importScripts=="function";var ENVIRONMENT_IS_NODE=typeof browser$1=="object"&&typeof browser$1.versions=="object"&&typeof browser$1.versions.node=="string";var scriptDirectory="";function locateFile(path){if(Module["locateFile"]){return Module["locateFile"](path,scriptDirectory)}return scriptDirectory+path}var read_,readAsync,readBinary;if(ENVIRONMENT_IS_NODE){const{createRequire:createRequire}=await Promise.resolve().then(function () { return _polyfillNode_module; });var require=createRequire(import.meta.url);var fs=require("fs");var nodePath=require("path");if(ENVIRONMENT_IS_WORKER){scriptDirectory=nodePath.dirname(scriptDirectory)+"/";}else {scriptDirectory=require("url").fileURLToPath(new URL("./",import.meta.url));}read_=(filename,binary)=>{filename=isFileURI(filename)?new URL(filename):nodePath.normalize(filename);return fs.readFileSync(filename,binary?undefined:"utf8")};readBinary=filename=>{var ret=read_(filename,true);if(!ret.buffer){ret=new Uint8Array(ret);}return ret};readAsync=(filename,onload,onerror,binary=true)=>{filename=isFileURI(filename)?new URL(filename):nodePath.normalize(filename);fs.readFile(filename,binary?undefined:"utf8",(err,data)=>{if(err)onerror(err);else onload(binary?data.buffer:data);});};if(!Module["thisProgram"]&&browser$1.argv.length>1){thisProgram=browser$1.argv[1].replace(/\\/g,"/");}browser$1.argv.slice(2);Module["inspect"]=()=>"[Emscripten Module object]";}else if(ENVIRONMENT_IS_WEB||ENVIRONMENT_IS_WORKER){if(ENVIRONMENT_IS_WORKER){scriptDirectory=self.location.href;}else if(typeof document!="undefined"&&document.currentScript){scriptDirectory=document.currentScript.src;}if(_scriptDir){scriptDirectory=_scriptDir;}if(scriptDirectory.indexOf("blob:")!==0){scriptDirectory=scriptDirectory.substr(0,scriptDirectory.replace(/[?#].*/,"").lastIndexOf("/")+1);}else {scriptDirectory="";}{read_=url=>{var xhr=new XMLHttpRequest;xhr.open("GET",url,false);xhr.send(null);return xhr.responseText};if(ENVIRONMENT_IS_WORKER){readBinary=url=>{var xhr=new XMLHttpRequest;xhr.open("GET",url,false);xhr.responseType="arraybuffer";xhr.send(null);return new Uint8Array(xhr.response)};}readAsync=(url,onload,onerror)=>{var xhr=new XMLHttpRequest;xhr.open("GET",url,true);xhr.responseType="arraybuffer";xhr.onload=()=>{if(xhr.status==200||xhr.status==0&&xhr.response){onload(xhr.response);return}onerror();};xhr.onerror=onerror;xhr.send(null);};}}else;var out=Module["print"]||console.log.bind(console);var err=Module["printErr"]||console.error.bind(console);Object.assign(Module,moduleOverrides);moduleOverrides=null;if(Module["arguments"])Module["arguments"];if(Module["thisProgram"])thisProgram=Module["thisProgram"];if(Module["quit"])Module["quit"];var wasmBinary;if(Module["wasmBinary"])wasmBinary=Module["wasmBinary"];Module["noExitRuntime"]||true;if(typeof WebAssembly!="object"){abort("no native wasm support detected");}var wasmMemory;var ABORT=false;function assert(condition,text){if(!condition){abort(text);}}var HEAP8,HEAPU8,HEAP16,HEAP32,HEAPU32,HEAPF32,HEAPF64;function updateMemoryViews(){var b=wasmMemory.buffer;Module["HEAP8"]=HEAP8=new Int8Array(b);Module["HEAP16"]=HEAP16=new Int16Array(b);Module["HEAP32"]=HEAP32=new Int32Array(b);Module["HEAPU8"]=HEAPU8=new Uint8Array(b);Module["HEAPU16"]=new Uint16Array(b);Module["HEAPU32"]=HEAPU32=new Uint32Array(b);Module["HEAPF32"]=HEAPF32=new Float32Array(b);Module["HEAPF64"]=HEAPF64=new Float64Array(b);}var wasmTable;var __ATPRERUN__=[];var __ATINIT__=[];var __ATPOSTRUN__=[];function preRun(){if(Module["preRun"]){if(typeof Module["preRun"]=="function")Module["preRun"]=[Module["preRun"]];while(Module["preRun"].length){addOnPreRun(Module["preRun"].shift());}}callRuntimeCallbacks(__ATPRERUN__);}function initRuntime(){if(!Module["noFSInit"]&&!FS.init.initialized)FS.init();FS.ignorePermissions=false;callRuntimeCallbacks(__ATINIT__);}function postRun(){if(Module["postRun"]){if(typeof Module["postRun"]=="function")Module["postRun"]=[Module["postRun"]];while(Module["postRun"].length){addOnPostRun(Module["postRun"].shift());}}callRuntimeCallbacks(__ATPOSTRUN__);}function addOnPreRun(cb){__ATPRERUN__.unshift(cb);}function addOnInit(cb){__ATINIT__.unshift(cb);}function addOnPostRun(cb){__ATPOSTRUN__.unshift(cb);}var runDependencies=0;var dependenciesFulfilled=null;function getUniqueRunDependency(id){return id}function addRunDependency(id){runDependencies++;if(Module["monitorRunDependencies"]){Module["monitorRunDependencies"](runDependencies);}}function removeRunDependency(id){runDependencies--;if(Module["monitorRunDependencies"]){Module["monitorRunDependencies"](runDependencies);}if(runDependencies==0){if(dependenciesFulfilled){var callback=dependenciesFulfilled;dependenciesFulfilled=null;callback();}}}function abort(what){if(Module["onAbort"]){Module["onAbort"](what);}what="Aborted("+what+")";err(what);ABORT=true;what+=". Build with -sASSERTIONS for more info.";var e=new WebAssembly.RuntimeError(what);readyPromiseReject(e);throw e}var dataURIPrefix="data:application/octet-stream;base64,";function isDataURI(filename){return filename.startsWith(dataURIPrefix)}function isFileURI(filename){return filename.startsWith("file://")}var wasmBinaryFile;if(Module["locateFile"]){wasmBinaryFile="geos.wasm";if(!isDataURI(wasmBinaryFile)){wasmBinaryFile=locateFile(wasmBinaryFile);}}else {wasmBinaryFile=new URL("geos.wasm",import.meta.url).href;}function getBinary(file){try{if(file==wasmBinaryFile&&wasmBinary){return new Uint8Array(wasmBinary)}if(readBinary){return readBinary(file)}throw "both async and sync fetching of the wasm failed"}catch(err){abort(err);}}function getBinaryPromise(binaryFile){if(!wasmBinary&&(ENVIRONMENT_IS_WEB||ENVIRONMENT_IS_WORKER)){if(typeof fetch=="function"&&!isFileURI(binaryFile)){return fetch(binaryFile,{credentials:"same-origin"}).then(response=>{if(!response["ok"]){throw "failed to load wasm binary file at '"+binaryFile+"'"}return response["arrayBuffer"]()}).catch(()=>getBinary(binaryFile))}else {if(readAsync){return new Promise((resolve,reject)=>{readAsync(binaryFile,response=>resolve(new Uint8Array(response)),reject);})}}}return Promise.resolve().then(()=>getBinary(binaryFile))}function instantiateArrayBuffer(binaryFile,imports,receiver){return getBinaryPromise(binaryFile).then(binary=>{return WebAssembly.instantiate(binary,imports)}).then(instance=>{return instance}).then(receiver,reason=>{err("failed to asynchronously prepare wasm: "+reason);abort(reason);})}function instantiateAsync(binary,binaryFile,imports,callback){if(!binary&&typeof WebAssembly.instantiateStreaming=="function"&&!isDataURI(binaryFile)&&!isFileURI(binaryFile)&&!ENVIRONMENT_IS_NODE&&typeof fetch=="function"){return fetch(binaryFile,{credentials:"same-origin"}).then(response=>{var result=WebAssembly.instantiateStreaming(response,imports);return result.then(callback,function(reason){err("wasm streaming compile failed: "+reason);err("falling back to ArrayBuffer instantiation");return instantiateArrayBuffer(binaryFile,imports,callback)})})}else {return instantiateArrayBuffer(binaryFile,imports,callback)}}function createWasm(){var info={"a":wasmImports};function receiveInstance(instance,module){var exports=instance.exports;Module["asm"]=exports;wasmMemory=Module["asm"]["ba"];updateMemoryViews();wasmTable=Module["asm"]["Ea"];addOnInit(Module["asm"]["ca"]);removeRunDependency();return exports}addRunDependency();function receiveInstantiationResult(result){receiveInstance(result["instance"]);}if(Module["instantiateWasm"]){try{return Module["instantiateWasm"](info,receiveInstance)}catch(e){err("Module.instantiateWasm callback failed with error: "+e);readyPromiseReject(e);}}instantiateAsync(wasmBinary,wasmBinaryFile,info,receiveInstantiationResult).catch(readyPromiseReject);return {}}var callRuntimeCallbacks=callbacks=>{while(callbacks.length>0){callbacks.shift()(Module);}};function getValue(ptr,type="i8"){if(type.endsWith("*"))type="*";switch(type){case"i1":return HEAP8[ptr>>0];case"i8":return HEAP8[ptr>>0];case"i16":return HEAP16[ptr>>1];case"i32":return HEAP32[ptr>>2];case"i64":abort("to do getValue(i64) use WASM_BIGINT");case"float":return HEAPF32[ptr>>2];case"double":return HEAPF64[ptr>>3];case"*":return HEAPU32[ptr>>2];default:abort(`invalid type for getValue: ${type}`);}}function setValue(ptr,value,type="i8"){if(type.endsWith("*"))type="*";switch(type){case"i1":HEAP8[ptr>>0]=value;break;case"i8":HEAP8[ptr>>0]=value;break;case"i16":HEAP16[ptr>>1]=value;break;case"i32":HEAP32[ptr>>2]=value;break;case"i64":abort("to do setValue(i64) use WASM_BIGINT");case"float":HEAPF32[ptr>>2]=value;break;case"double":HEAPF64[ptr>>3]=value;break;case"*":HEAPU32[ptr>>2]=value;break;default:abort(`invalid type for setValue: ${type}`);}}var UTF8Decoder=typeof TextDecoder!="undefined"?new TextDecoder("utf8"):undefined;var UTF8ArrayToString=(heapOrArray,idx,maxBytesToRead)=>{var endIdx=idx+maxBytesToRead;var endPtr=idx;while(heapOrArray[endPtr]&&!(endPtr>=endIdx))++endPtr;if(endPtr-idx>16&&heapOrArray.buffer&&UTF8Decoder){return UTF8Decoder.decode(heapOrArray.subarray(idx,endPtr))}var str="";while(idx<endPtr){var u0=heapOrArray[idx++];if(!(u0&128)){str+=String.fromCharCode(u0);continue}var u1=heapOrArray[idx++]&63;if((u0&224)==192){str+=String.fromCharCode((u0&31)<<6|u1);continue}var u2=heapOrArray[idx++]&63;if((u0&240)==224){u0=(u0&15)<<12|u1<<6|u2;}else {u0=(u0&7)<<18|u1<<12|u2<<6|heapOrArray[idx++]&63;}if(u0<65536){str+=String.fromCharCode(u0);}else {var ch=u0-65536;str+=String.fromCharCode(55296|ch>>10,56320|ch&1023);}}return str};var UTF8ToString=(ptr,maxBytesToRead)=>{return ptr?UTF8ArrayToString(HEAPU8,ptr,maxBytesToRead):""};var ___assert_fail=(condition,filename,line,func)=>{abort(`Assertion failed: ${UTF8ToString(condition)}, at: `+[filename?UTF8ToString(filename):"unknown filename",line,func?UTF8ToString(func):"unknown function"]);};var exceptionCaught=[];var uncaughtExceptionCount=0;function ___cxa_begin_catch(ptr){var info=new ExceptionInfo(ptr);if(!info.get_caught()){info.set_caught(true);uncaughtExceptionCount--;}info.set_rethrown(false);exceptionCaught.push(info);___cxa_increment_exception_refcount(info.excPtr);return info.get_exception_ptr()}var exceptionLast=0;function ___cxa_end_catch(){_setThrew(0);var info=exceptionCaught.pop();___cxa_decrement_exception_refcount(info.excPtr);exceptionLast=0;}function ExceptionInfo(excPtr){this.excPtr=excPtr;this.ptr=excPtr-24;this.set_type=function(type){HEAPU32[this.ptr+4>>2]=type;};this.get_type=function(){return HEAPU32[this.ptr+4>>2]};this.set_destructor=function(destructor){HEAPU32[this.ptr+8>>2]=destructor;};this.get_destructor=function(){return HEAPU32[this.ptr+8>>2]};this.set_caught=function(caught){caught=caught?1:0;HEAP8[this.ptr+12>>0]=caught;};this.get_caught=function(){return HEAP8[this.ptr+12>>0]!=0};this.set_rethrown=function(rethrown){rethrown=rethrown?1:0;HEAP8[this.ptr+13>>0]=rethrown;};this.get_rethrown=function(){return HEAP8[this.ptr+13>>0]!=0};this.init=function(type,destructor){this.set_adjusted_ptr(0);this.set_type(type);this.set_destructor(destructor);};this.set_adjusted_ptr=function(adjustedPtr){HEAPU32[this.ptr+16>>2]=adjustedPtr;};this.get_adjusted_ptr=function(){return HEAPU32[this.ptr+16>>2]};this.get_exception_ptr=function(){var isPointer=___cxa_is_pointer_type(this.get_type());if(isPointer){return HEAPU32[this.excPtr>>2]}var adjusted=this.get_adjusted_ptr();if(adjusted!==0)return adjusted;return this.excPtr};}function ___resumeException(ptr){if(!exceptionLast){exceptionLast=ptr;}throw exceptionLast}function ___cxa_find_matching_catch(){var thrown=exceptionLast;if(!thrown){setTempRet0(0);return 0}var info=new ExceptionInfo(thrown);info.set_adjusted_ptr(thrown);var thrownType=info.get_type();if(!thrownType){setTempRet0(0);return thrown}for(var i=0;i<arguments.length;i++){var caughtType=arguments[i];if(caughtType===0||caughtType===thrownType){break}var adjusted_ptr_addr=info.ptr+16;if(___cxa_can_catch(caughtType,thrownType,adjusted_ptr_addr)){setTempRet0(caughtType);return thrown}}setTempRet0(thrownType);return thrown}var ___cxa_find_matching_catch_2=___cxa_find_matching_catch;var ___cxa_find_matching_catch_3=___cxa_find_matching_catch;var ___cxa_find_matching_catch_4=___cxa_find_matching_catch;function ___cxa_rethrow(){var info=exceptionCaught.pop();if(!info){abort("no exception to throw");}var ptr=info.excPtr;if(!info.get_rethrown()){exceptionCaught.push(info);info.set_rethrown(true);info.set_caught(false);uncaughtExceptionCount++;}exceptionLast=ptr;throw exceptionLast}function ___cxa_throw(ptr,type,destructor){var info=new ExceptionInfo(ptr);info.init(type,destructor);exceptionLast=ptr;uncaughtExceptionCount++;throw exceptionLast}function ___cxa_uncaught_exceptions(){return uncaughtExceptionCount}var _abort=()=>{abort("");};var _emscripten_memcpy_big=(dest,src,num)=>HEAPU8.copyWithin(dest,src,src+num);var getHeapMax=()=>2147483648;var growMemory=size=>{var b=wasmMemory.buffer;var pages=size-b.byteLength+65535>>>16;try{wasmMemory.grow(pages);updateMemoryViews();return 1}catch(e){}};var _emscripten_resize_heap=requestedSize=>{var oldSize=HEAPU8.length;requestedSize=requestedSize>>>0;var maxHeapSize=getHeapMax();if(requestedSize>maxHeapSize){return false}var alignUp=(x,multiple)=>x+(multiple-x%multiple)%multiple;for(var cutDown=1;cutDown<=4;cutDown*=2){var overGrownHeapSize=oldSize*(1+.2/cutDown);overGrownHeapSize=Math.min(overGrownHeapSize,requestedSize+100663296);var newSize=Math.min(maxHeapSize,alignUp(Math.max(requestedSize,overGrownHeapSize),65536));var replacement=growMemory(newSize);if(replacement){return true}}return false};var ENV={};var getExecutableName=()=>{return thisProgram||"./this.program"};var getEnvStrings=()=>{if(!getEnvStrings.strings){var lang=(typeof navigator=="object"&&navigator.languages&&navigator.languages[0]||"C").replace("-","_")+".UTF-8";var env={"USER":"web_user","LOGNAME":"web_user","PATH":"/","PWD":"/","HOME":"/home/web_user","LANG":lang,"_":getExecutableName()};for(var x in ENV){if(ENV[x]===undefined)delete env[x];else env[x]=ENV[x];}var strings=[];for(var x in env){strings.push(`${x}=${env[x]}`);}getEnvStrings.strings=strings;}return getEnvStrings.strings};var stringToAscii=(str,buffer)=>{for(var i=0;i<str.length;++i){HEAP8[buffer++>>0]=str.charCodeAt(i);}HEAP8[buffer>>0]=0;};var PATH={isAbs:path=>path.charAt(0)==="/",splitPath:filename=>{var splitPathRe=/^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/;return splitPathRe.exec(filename).slice(1)},normalizeArray:(parts,allowAboveRoot)=>{var up=0;for(var i=parts.length-1;i>=0;i--){var last=parts[i];if(last==="."){parts.splice(i,1);}else if(last===".."){parts.splice(i,1);up++;}else if(up){parts.splice(i,1);up--;}}if(allowAboveRoot){for(;up;up--){parts.unshift("..");}}return parts},normalize:path=>{var isAbsolute=PATH.isAbs(path),trailingSlash=path.substr(-1)==="/";path=PATH.normalizeArray(path.split("/").filter(p=>!!p),!isAbsolute).join("/");if(!path&&!isAbsolute){path=".";}if(path&&trailingSlash){path+="/";}return (isAbsolute?"/":"")+path},dirname:path=>{var result=PATH.splitPath(path),root=result[0],dir=result[1];if(!root&&!dir){return "."}if(dir){dir=dir.substr(0,dir.length-1);}return root+dir},basename:path=>{if(path==="/")return "/";path=PATH.normalize(path);path=path.replace(/\/$/,"");var lastSlash=path.lastIndexOf("/");if(lastSlash===-1)return path;return path.substr(lastSlash+1)},join:function(){var paths=Array.prototype.slice.call(arguments);return PATH.normalize(paths.join("/"))},join2:(l,r)=>{return PATH.normalize(l+"/"+r)}};var initRandomFill=()=>{if(typeof crypto=="object"&&typeof crypto["getRandomValues"]=="function"){return view=>crypto.getRandomValues(view)}else if(ENVIRONMENT_IS_NODE){try{var crypto_module=require("crypto");var randomFillSync=crypto_module["randomFillSync"];if(randomFillSync){return view=>crypto_module["randomFillSync"](view)}var randomBytes=crypto_module["randomBytes"];return view=>(view.set(randomBytes(view.byteLength)),view)}catch(e){}}abort("initRandomDevice");};var randomFill=view=>{return (randomFill=initRandomFill())(view)};var PATH_FS={resolve:function(){var resolvedPath="",resolvedAbsolute=false;for(var i=arguments.length-1;i>=-1&&!resolvedAbsolute;i--){var path=i>=0?arguments[i]:FS.cwd();if(typeof path!="string"){throw new TypeError("Arguments to path.resolve must be strings")}else if(!path){return ""}resolvedPath=path+"/"+resolvedPath;resolvedAbsolute=PATH.isAbs(path);}resolvedPath=PATH.normalizeArray(resolvedPath.split("/").filter(p=>!!p),!resolvedAbsolute).join("/");return (resolvedAbsolute?"/":"")+resolvedPath||"."},relative:(from,to)=>{from=PATH_FS.resolve(from).substr(1);to=PATH_FS.resolve(to).substr(1);function trim(arr){var start=0;for(;start<arr.length;start++){if(arr[start]!=="")break}var end=arr.length-1;for(;end>=0;end--){if(arr[end]!=="")break}if(start>end)return [];return arr.slice(start,end-start+1)}var fromParts=trim(from.split("/"));var toParts=trim(to.split("/"));var length=Math.min(fromParts.length,toParts.length);var samePartsLength=length;for(var i=0;i<length;i++){if(fromParts[i]!==toParts[i]){samePartsLength=i;break}}var outputParts=[];for(var i=samePartsLength;i<fromParts.length;i++){outputParts.push("..");}outputParts=outputParts.concat(toParts.slice(samePartsLength));return outputParts.join("/")}};var lengthBytesUTF8=str=>{var len=0;for(var i=0;i<str.length;++i){var c=str.charCodeAt(i);if(c<=127){len++;}else if(c<=2047){len+=2;}else if(c>=55296&&c<=57343){len+=4;++i;}else {len+=3;}}return len};var stringToUTF8Array=(str,heap,outIdx,maxBytesToWrite)=>{if(!(maxBytesToWrite>0))return 0;var startIdx=outIdx;var endIdx=outIdx+maxBytesToWrite-1;for(var i=0;i<str.length;++i){var u=str.charCodeAt(i);if(u>=55296&&u<=57343){var u1=str.charCodeAt(++i);u=65536+((u&1023)<<10)|u1&1023;}if(u<=127){if(outIdx>=endIdx)break;heap[outIdx++]=u;}else if(u<=2047){if(outIdx+1>=endIdx)break;heap[outIdx++]=192|u>>6;heap[outIdx++]=128|u&63;}else if(u<=65535){if(outIdx+2>=endIdx)break;heap[outIdx++]=224|u>>12;heap[outIdx++]=128|u>>6&63;heap[outIdx++]=128|u&63;}else {if(outIdx+3>=endIdx)break;heap[outIdx++]=240|u>>18;heap[outIdx++]=128|u>>12&63;heap[outIdx++]=128|u>>6&63;heap[outIdx++]=128|u&63;}}heap[outIdx]=0;return outIdx-startIdx};function intArrayFromString(stringy,dontAddNull,length){var len=length>0?length:lengthBytesUTF8(stringy)+1;var u8array=new Array(len);var numBytesWritten=stringToUTF8Array(stringy,u8array,0,u8array.length);if(dontAddNull)u8array.length=numBytesWritten;return u8array}var TTY={ttys:[],init:function(){},shutdown:function(){},register:function(dev,ops){TTY.ttys[dev]={input:[],output:[],ops:ops};FS.registerDevice(dev,TTY.stream_ops);},stream_ops:{open:function(stream){var tty=TTY.ttys[stream.node.rdev];if(!tty){throw new FS.ErrnoError(43)}stream.tty=tty;stream.seekable=false;},close:function(stream){stream.tty.ops.fsync(stream.tty);},fsync:function(stream){stream.tty.ops.fsync(stream.tty);},read:function(stream,buffer,offset,length,pos){if(!stream.tty||!stream.tty.ops.get_char){throw new FS.ErrnoError(60)}var bytesRead=0;for(var i=0;i<length;i++){var result;try{result=stream.tty.ops.get_char(stream.tty);}catch(e){throw new FS.ErrnoError(29)}if(result===undefined&&bytesRead===0){throw new FS.ErrnoError(6)}if(result===null||result===undefined)break;bytesRead++;buffer[offset+i]=result;}if(bytesRead){stream.node.timestamp=Date.now();}return bytesRead},write:function(stream,buffer,offset,length,pos){if(!stream.tty||!stream.tty.ops.put_char){throw new FS.ErrnoError(60)}try{for(var i=0;i<length;i++){stream.tty.ops.put_char(stream.tty,buffer[offset+i]);}}catch(e){throw new FS.ErrnoError(29)}if(length){stream.node.timestamp=Date.now();}return i}},default_tty_ops:{get_char:function(tty){if(!tty.input.length){var result=null;if(ENVIRONMENT_IS_NODE){var BUFSIZE=256;var buf=Buffer.alloc(BUFSIZE);var bytesRead=0;try{bytesRead=fs.readSync(browser$1.stdin.fd,buf,0,BUFSIZE,-1);}catch(e){if(e.toString().includes("EOF"))bytesRead=0;else throw e}if(bytesRead>0){result=buf.slice(0,bytesRead).toString("utf-8");}else {result=null;}}else if(typeof window!="undefined"&&typeof window.prompt=="function"){result=window.prompt("Input: ");if(result!==null){result+="\n";}}else if(typeof readline=="function"){result=readline();if(result!==null){result+="\n";}}if(!result){return null}tty.input=intArrayFromString(result,true);}return tty.input.shift()},put_char:function(tty,val){if(val===null||val===10){out(UTF8ArrayToString(tty.output,0));tty.output=[];}else {if(val!=0)tty.output.push(val);}},fsync:function(tty){if(tty.output&&tty.output.length>0){out(UTF8ArrayToString(tty.output,0));tty.output=[];}},ioctl_tcgets:function(tty){return {c_iflag:25856,c_oflag:5,c_cflag:191,c_lflag:35387,c_cc:[3,28,127,21,4,0,1,0,17,19,26,0,18,15,23,22,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]}},ioctl_tcsets:function(tty,optional_actions,data){return 0},ioctl_tiocgwinsz:function(tty){return [24,80]}},default_tty1_ops:{put_char:function(tty,val){if(val===null||val===10){err(UTF8ArrayToString(tty.output,0));tty.output=[];}else {if(val!=0)tty.output.push(val);}},fsync:function(tty){if(tty.output&&tty.output.length>0){err(UTF8ArrayToString(tty.output,0));tty.output=[];}}}};var mmapAlloc=size=>{abort();};var MEMFS={ops_table:null,mount:function(mount){return MEMFS.createNode(null,"/",16384|511,0)},createNode:function(parent,name,mode,dev){if(FS.isBlkdev(mode)||FS.isFIFO(mode)){throw new FS.ErrnoError(63)}if(!MEMFS.ops_table){MEMFS.ops_table={dir:{node:{getattr:MEMFS.node_ops.getattr,setattr:MEMFS.node_ops.setattr,lookup:MEMFS.node_ops.lookup,mknod:MEMFS.node_ops.mknod,rename:MEMFS.node_ops.rename,unlink:MEMFS.node_ops.unlink,rmdir:MEMFS.node_ops.rmdir,readdir:MEMFS.node_ops.readdir,symlink:MEMFS.node_ops.symlink},stream:{llseek:MEMFS.stream_ops.llseek}},file:{node:{getattr:MEMFS.node_ops.getattr,setattr:MEMFS.node_ops.setattr},stream:{llseek:MEMFS.stream_ops.llseek,read:MEMFS.stream_ops.read,write:MEMFS.stream_ops.write,allocate:MEMFS.stream_ops.allocate,mmap:MEMFS.stream_ops.mmap,msync:MEMFS.stream_ops.msync}},link:{node:{getattr:MEMFS.node_ops.getattr,setattr:MEMFS.node_ops.setattr,readlink:MEMFS.node_ops.readlink},stream:{}},chrdev:{node:{getattr:MEMFS.node_ops.getattr,setattr:MEMFS.node_ops.setattr},stream:FS.chrdev_stream_ops}};}var node=FS.createNode(parent,name,mode,dev);if(FS.isDir(node.mode)){node.node_ops=MEMFS.ops_table.dir.node;node.stream_ops=MEMFS.ops_table.dir.stream;node.contents={};}else if(FS.isFile(node.mode)){node.node_ops=MEMFS.ops_table.file.node;node.stream_ops=MEMFS.ops_table.file.stream;node.usedBytes=0;node.contents=null;}else if(FS.isLink(node.mode)){node.node_ops=MEMFS.ops_table.link.node;node.stream_ops=MEMFS.ops_table.link.stream;}else if(FS.isChrdev(node.mode)){node.node_ops=MEMFS.ops_table.chrdev.node;node.stream_ops=MEMFS.ops_table.chrdev.stream;}node.timestamp=Date.now();if(parent){parent.contents[name]=node;parent.timestamp=node.timestamp;}return node},getFileDataAsTypedArray:function(node){if(!node.contents)return new Uint8Array(0);if(node.contents.subarray)return node.contents.subarray(0,node.usedBytes);return new Uint8Array(node.contents)},expandFileStorage:function(node,newCapacity){var prevCapacity=node.contents?node.contents.length:0;if(prevCapacity>=newCapacity)return;var CAPACITY_DOUBLING_MAX=1024*1024;newCapacity=Math.max(newCapacity,prevCapacity*(prevCapacity<CAPACITY_DOUBLING_MAX?2:1.125)>>>0);if(prevCapacity!=0)newCapacity=Math.max(newCapacity,256);var oldContents=node.contents;node.contents=new Uint8Array(newCapacity);if(node.usedBytes>0)node.contents.set(oldContents.subarray(0,node.usedBytes),0);},resizeFileStorage:function(node,newSize){if(node.usedBytes==newSize)return;if(newSize==0){node.contents=null;node.usedBytes=0;}else {var oldContents=node.contents;node.contents=new Uint8Array(newSize);if(oldContents){node.contents.set(oldContents.subarray(0,Math.min(newSize,node.usedBytes)));}node.usedBytes=newSize;}},node_ops:{getattr:function(node){var attr={};attr.dev=FS.isChrdev(node.mode)?node.id:1;attr.ino=node.id;attr.mode=node.mode;attr.nlink=1;attr.uid=0;attr.gid=0;attr.rdev=node.rdev;if(FS.isDir(node.mode)){attr.size=4096;}else if(FS.isFile(node.mode)){attr.size=node.usedBytes;}else if(FS.isLink(node.mode)){attr.size=node.link.length;}else {attr.size=0;}attr.atime=new Date(node.timestamp);attr.mtime=new Date(node.timestamp);attr.ctime=new Date(node.timestamp);attr.blksize=4096;attr.blocks=Math.ceil(attr.size/attr.blksize);return attr},setattr:function(node,attr){if(attr.mode!==undefined){node.mode=attr.mode;}if(attr.timestamp!==undefined){node.timestamp=attr.timestamp;}if(attr.size!==undefined){MEMFS.resizeFileStorage(node,attr.size);}},lookup:function(parent,name){throw FS.genericErrors[44]},mknod:function(parent,name,mode,dev){return MEMFS.createNode(parent,name,mode,dev)},rename:function(old_node,new_dir,new_name){if(FS.isDir(old_node.mode)){var new_node;try{new_node=FS.lookupNode(new_dir,new_name);}catch(e){}if(new_node){for(var i in new_node.contents){throw new FS.ErrnoError(55)}}}delete old_node.parent.contents[old_node.name];old_node.parent.timestamp=Date.now();old_node.name=new_name;new_dir.contents[new_name]=old_node;new_dir.timestamp=old_node.parent.timestamp;old_node.parent=new_dir;},unlink:function(parent,name){delete parent.contents[name];parent.timestamp=Date.now();},rmdir:function(parent,name){var node=FS.lookupNode(parent,name);for(var i in node.contents){throw new FS.ErrnoError(55)}delete parent.contents[name];parent.timestamp=Date.now();},readdir:function(node){var entries=[".",".."];for(var key in node.contents){if(!node.contents.hasOwnProperty(key)){continue}entries.push(key);}return entries},symlink:function(parent,newname,oldpath){var node=MEMFS.createNode(parent,newname,511|40960,0);node.link=oldpath;return node},readlink:function(node){if(!FS.isLink(node.mode)){throw new FS.ErrnoError(28)}return node.link}},stream_ops:{read:function(stream,buffer,offset,length,position){var contents=stream.node.contents;if(position>=stream.node.usedBytes)return 0;var size=Math.min(stream.node.usedBytes-position,length);if(size>8&&contents.subarray){buffer.set(contents.subarray(position,position+size),offset);}else {for(var i=0;i<size;i++)buffer[offset+i]=contents[position+i];}return size},write:function(stream,buffer,offset,length,position,canOwn){if(buffer.buffer===HEAP8.buffer){canOwn=false;}if(!length)return 0;var node=stream.node;node.timestamp=Date.now();if(buffer.subarray&&(!node.contents||node.contents.subarray)){if(canOwn){node.contents=buffer.subarray(offset,offset+length);node.usedBytes=length;return length}else if(node.usedBytes===0&&position===0){node.contents=buffer.slice(offset,offset+length);node.usedBytes=length;return length}else if(position+length<=node.usedBytes){node.contents.set(buffer.subarray(offset,offset+length),position);return length}}MEMFS.expandFileStorage(node,position+length);if(node.contents.subarray&&buffer.subarray){node.contents.set(buffer.subarray(offset,offset+length),position);}else {for(var i=0;i<length;i++){node.contents[position+i]=buffer[offset+i];}}node.usedBytes=Math.max(node.usedBytes,position+length);return length},llseek:function(stream,offset,whence){var position=offset;if(whence===1){position+=stream.position;}else if(whence===2){if(FS.isFile(stream.node.mode)){position+=stream.node.usedBytes;}}if(position<0){throw new FS.ErrnoError(28)}return position},allocate:function(stream,offset,length){MEMFS.expandFileStorage(stream.node,offset+length);stream.node.usedBytes=Math.max(stream.node.usedBytes,offset+length);},mmap:function(stream,length,position,prot,flags){if(!FS.isFile(stream.node.mode)){throw new FS.ErrnoError(43)}var ptr;var allocated;var contents=stream.node.contents;if(!(flags&2)&&contents.buffer===HEAP8.buffer){allocated=false;ptr=contents.byteOffset;}else {if(position>0||position+length<contents.length){if(contents.subarray){contents=contents.subarray(position,position+length);}else {contents=Array.prototype.slice.call(contents,position,position+length);}}allocated=true;ptr=mmapAlloc();if(!ptr){throw new FS.ErrnoError(48)}HEAP8.set(contents,ptr);}return {ptr:ptr,allocated:allocated}},msync:function(stream,buffer,offset,length,mmapFlags){MEMFS.stream_ops.write(stream,buffer,0,length,offset,false);return 0}}};var asyncLoad=(url,onload,onerror,noRunDep)=>{var dep=!noRunDep?getUniqueRunDependency(`al ${url}`):"";readAsync(url,arrayBuffer=>{assert(arrayBuffer,`Loading data file "${url}" failed (no arrayBuffer).`);onload(new Uint8Array(arrayBuffer));if(dep)removeRunDependency();},event=>{if(onerror){onerror();}else {throw `Loading data file "${url}" failed.`}});if(dep)addRunDependency();};var preloadPlugins=Module["preloadPlugins"]||[];function FS_handledByPreloadPlugin(byteArray,fullname,finish,onerror){if(typeof Browser!="undefined")Browser.init();var handled=false;preloadPlugins.forEach(function(plugin){if(handled)return;if(plugin["canHandle"](fullname)){plugin["handle"](byteArray,fullname,finish,onerror);handled=true;}});return handled}function FS_createPreloadedFile(parent,name,url,canRead,canWrite,onload,onerror,dontCreateFile,canOwn,preFinish){var fullname=name?PATH_FS.resolve(PATH.join2(parent,name)):parent;function processData(byteArray){function finish(byteArray){if(preFinish)preFinish();if(!dontCreateFile){FS.createDataFile(parent,name,byteArray,canRead,canWrite,canOwn);}if(onload)onload();removeRunDependency();}if(FS_handledByPreloadPlugin(byteArray,fullname,finish,()=>{if(onerror)onerror();removeRunDependency();})){return}finish(byteArray);}addRunDependency();if(typeof url=="string"){asyncLoad(url,byteArray=>processData(byteArray),onerror);}else {processData(url);}}function FS_modeStringToFlags(str){var flagModes={"r":0,"r+":2,"w":512|64|1,"w+":512|64|2,"a":1024|64|1,"a+":1024|64|2};var flags=flagModes[str];if(typeof flags=="undefined"){throw new Error(`Unknown file open mode: ${str}`)}return flags}function FS_getMode(canRead,canWrite){var mode=0;if(canRead)mode|=292|73;if(canWrite)mode|=146;return mode}var ERRNO_CODES={};var NODEFS={isWindows:false,staticInit:()=>{NODEFS.isWindows=!!browser$1.platform.match(/^win/);var flags=browser$1.binding("constants");if(flags["fs"]){flags=flags["fs"];}NODEFS.flagsForNodeMap={1024:flags["O_APPEND"],64:flags["O_CREAT"],128:flags["O_EXCL"],256:flags["O_NOCTTY"],0:flags["O_RDONLY"],2:flags["O_RDWR"],4096:flags["O_SYNC"],512:flags["O_TRUNC"],1:flags["O_WRONLY"],131072:flags["O_NOFOLLOW"]};},convertNodeCode:e=>{var code=e.code;return ERRNO_CODES[code]},mount:mount=>{return NODEFS.createNode(null,"/",NODEFS.getMode(mount.opts.root),0)},createNode:(parent,name,mode,dev)=>{if(!FS.isDir(mode)&&!FS.isFile(mode)&&!FS.isLink(mode)){throw new FS.ErrnoError(28)}var node=FS.createNode(parent,name,mode);node.node_ops=NODEFS.node_ops;node.stream_ops=NODEFS.stream_ops;return node},getMode:path=>{var stat;try{stat=fs.lstatSync(path);if(NODEFS.isWindows){stat.mode=stat.mode|(stat.mode&292)>>2;}}catch(e){if(!e.code)throw e;throw new FS.ErrnoError(NODEFS.convertNodeCode(e))}return stat.mode},realPath:node=>{var parts=[];while(node.parent!==node){parts.push(node.name);node=node.parent;}parts.push(node.mount.opts.root);parts.reverse();return PATH.join.apply(null,parts)},flagsForNode:flags=>{flags&=~2097152;flags&=~2048;flags&=~32768;flags&=~524288;flags&=~65536;var newFlags=0;for(var k in NODEFS.flagsForNodeMap){if(flags&k){newFlags|=NODEFS.flagsForNodeMap[k];flags^=k;}}if(flags){throw new FS.ErrnoError(28)}return newFlags},node_ops:{getattr:node=>{var path=NODEFS.realPath(node);var stat;try{stat=fs.lstatSync(path);}catch(e){if(!e.code)throw e;throw new FS.ErrnoError(NODEFS.convertNodeCode(e))}if(NODEFS.isWindows&&!stat.blksize){stat.blksize=4096;}if(NODEFS.isWindows&&!stat.blocks){stat.blocks=(stat.size+stat.blksize-1)/stat.blksize|0;}return {dev:stat.dev,ino:stat.ino,mode:stat.mode,nlink:stat.nlink,uid:stat.uid,gid:stat.gid,rdev:stat.rdev,size:stat.size,atime:stat.atime,mtime:stat.mtime,ctime:stat.ctime,blksize:stat.blksize,blocks:stat.blocks}},setattr:(node,attr)=>{var path=NODEFS.realPath(node);try{if(attr.mode!==undefined){fs.chmodSync(path,attr.mode);node.mode=attr.mode;}if(attr.timestamp!==undefined){var date=new Date(attr.timestamp);fs.utimesSync(path,date,date);}if(attr.size!==undefined){fs.truncateSync(path,attr.size);}}catch(e){if(!e.code)throw e;throw new FS.ErrnoError(NODEFS.convertNodeCode(e))}},lookup:(parent,name)=>{var path=PATH.join2(NODEFS.realPath(parent),name);var mode=NODEFS.getMode(path);return NODEFS.createNode(parent,name,mode)},mknod:(parent,name,mode,dev)=>{var node=NODEFS.createNode(parent,name,mode,dev);var path=NODEFS.realPath(node);try{if(FS.isDir(node.mode)){fs.mkdirSync(path,node.mode);}else {fs.writeFileSync(path,"",{mode:node.mode});}}catch(e){if(!e.code)throw e;throw new FS.ErrnoError(NODEFS.convertNodeCode(e))}return node},rename:(oldNode,newDir,newName)=>{var oldPath=NODEFS.realPath(oldNode);var newPath=PATH.join2(NODEFS.realPath(newDir),newName);try{fs.renameSync(oldPath,newPath);}catch(e){if(!e.code)throw e;throw new FS.ErrnoError(NODEFS.convertNodeCode(e))}oldNode.name=newName;},unlink:(parent,name)=>{var path=PATH.join2(NODEFS.realPath(parent),name);try{fs.unlinkSync(path);}catch(e){if(!e.code)throw e;throw new FS.ErrnoError(NODEFS.convertNodeCode(e))}},rmdir:(parent,name)=>{var path=PATH.join2(NODEFS.realPath(parent),name);try{fs.rmdirSync(path);}catch(e){if(!e.code)throw e;throw new FS.ErrnoError(NODEFS.convertNodeCode(e))}},readdir:node=>{var path=NODEFS.realPath(node);try{return fs.readdirSync(path)}catch(e){if(!e.code)throw e;throw new FS.ErrnoError(NODEFS.convertNodeCode(e))}},symlink:(parent,newName,oldPath)=>{var newPath=PATH.join2(NODEFS.realPath(parent),newName);try{fs.symlinkSync(oldPath,newPath);}catch(e){if(!e.code)throw e;throw new FS.ErrnoError(NODEFS.convertNodeCode(e))}},readlink:node=>{var path=NODEFS.realPath(node);try{path=fs.readlinkSync(path);path=nodePath.relative(nodePath.resolve(node.mount.opts.root),path);return path}catch(e){if(!e.code)throw e;if(e.code==="UNKNOWN")throw new FS.ErrnoError(28);throw new FS.ErrnoError(NODEFS.convertNodeCode(e))}}},stream_ops:{open:stream=>{var path=NODEFS.realPath(stream.node);try{if(FS.isFile(stream.node.mode)){stream.nfd=fs.openSync(path,NODEFS.flagsForNode(stream.flags));}}catch(e){if(!e.code)throw e;throw new FS.ErrnoError(NODEFS.convertNodeCode(e))}},close:stream=>{try{if(FS.isFile(stream.node.mode)&&stream.nfd){fs.closeSync(stream.nfd);}}catch(e){if(!e.code)throw e;throw new FS.ErrnoError(NODEFS.convertNodeCode(e))}},read:(stream,buffer,offset,length,position)=>{if(length===0)return 0;try{return fs.readSync(stream.nfd,Buffer.from(buffer.buffer),offset,length,position)}catch(e){throw new FS.ErrnoError(NODEFS.convertNodeCode(e))}},write:(stream,buffer,offset,length,position)=>{try{return fs.writeSync(stream.nfd,Buffer.from(buffer.buffer),offset,length,position)}catch(e){throw new FS.ErrnoError(NODEFS.convertNodeCode(e))}},llseek:(stream,offset,whence)=>{var position=offset;if(whence===1){position+=stream.position;}else if(whence===2){if(FS.isFile(stream.node.mode)){try{var stat=fs.fstatSync(stream.nfd);position+=stat.size;}catch(e){throw new FS.ErrnoError(NODEFS.convertNodeCode(e))}}}if(position<0){throw new FS.ErrnoError(28)}return position},mmap:(stream,length,position,prot,flags)=>{if(!FS.isFile(stream.node.mode)){throw new FS.ErrnoError(43)}var ptr=mmapAlloc();NODEFS.stream_ops.read(stream,HEAP8,ptr,length,position);return {ptr:ptr,allocated:true}},msync:(stream,buffer,offset,length,mmapFlags)=>{NODEFS.stream_ops.write(stream,buffer,0,length,offset,false);return 0}}};var WORKERFS={DIR_MODE:16895,FILE_MODE:33279,reader:null,mount:function(mount){assert(ENVIRONMENT_IS_WORKER);if(!WORKERFS.reader)WORKERFS.reader=new FileReaderSync;var root=WORKERFS.createNode(null,"/",WORKERFS.DIR_MODE,0);var createdParents={};function ensureParent(path){var parts=path.split("/");var parent=root;for(var i=0;i<parts.length-1;i++){var curr=parts.slice(0,i+1).join("/");if(!createdParents[curr]){createdParents[curr]=WORKERFS.createNode(parent,parts[i],WORKERFS.DIR_MODE,0);}parent=createdParents[curr];}return parent}function base(path){var parts=path.split("/");return parts[parts.length-1]}Array.prototype.forEach.call(mount.opts["files"]||[],function(file){WORKERFS.createNode(ensureParent(file.name),base(file.name),WORKERFS.FILE_MODE,0,file,file.lastModifiedDate);});(mount.opts["blobs"]||[]).forEach(function(obj){WORKERFS.createNode(ensureParent(obj["name"]),base(obj["name"]),WORKERFS.FILE_MODE,0,obj["data"]);});(mount.opts["packages"]||[]).forEach(function(pack){pack["metadata"].files.forEach(function(file){var name=file.filename.substr(1);WORKERFS.createNode(ensureParent(name),base(name),WORKERFS.FILE_MODE,0,pack["blob"].slice(file.start,file.end));});});return root},createNode:function(parent,name,mode,dev,contents,mtime){var node=FS.createNode(parent,name,mode);node.mode=mode;node.node_ops=WORKERFS.node_ops;node.stream_ops=WORKERFS.stream_ops;node.timestamp=(mtime||new Date).getTime();assert(WORKERFS.FILE_MODE!==WORKERFS.DIR_MODE);if(mode===WORKERFS.FILE_MODE){node.size=contents.size;node.contents=contents;}else {node.size=4096;node.contents={};}if(parent){parent.contents[name]=node;}return node},node_ops:{getattr:function(node){return {dev:1,ino:node.id,mode:node.mode,nlink:1,uid:0,gid:0,rdev:0,size:node.size,atime:new Date(node.timestamp),mtime:new Date(node.timestamp),ctime:new Date(node.timestamp),blksize:4096,blocks:Math.ceil(node.size/4096)}},setattr:function(node,attr){if(attr.mode!==undefined){node.mode=attr.mode;}if(attr.timestamp!==undefined){node.timestamp=attr.timestamp;}},lookup:function(parent,name){throw new FS.ErrnoError(44)},mknod:function(parent,name,mode,dev){throw new FS.ErrnoError(63)},rename:function(oldNode,newDir,newName){throw new FS.ErrnoError(63)},unlink:function(parent,name){throw new FS.ErrnoError(63)},rmdir:function(parent,name){throw new FS.ErrnoError(63)},readdir:function(node){var entries=[".",".."];for(var key in node.contents){if(!node.contents.hasOwnProperty(key)){continue}entries.push(key);}return entries},symlink:function(parent,newName,oldPath){throw new FS.ErrnoError(63)}},stream_ops:{read:function(stream,buffer,offset,length,position){if(position>=stream.node.size)return 0;var chunk=stream.node.contents.slice(position,position+length);var ab=WORKERFS.reader.readAsArrayBuffer(chunk);buffer.set(new Uint8Array(ab),offset);return chunk.size},write:function(stream,buffer,offset,length,position){throw new FS.ErrnoError(29)},llseek:function(stream,offset,whence){var position=offset;if(whence===1){position+=stream.position;}else if(whence===2){if(FS.isFile(stream.node.mode)){position+=stream.node.size;}}if(position<0){throw new FS.ErrnoError(28)}return position}}};var FS={root:null,mounts:[],devices:{},streams:[],nextInode:1,nameTable:null,currentPath:"/",initialized:false,ignorePermissions:true,ErrnoError:null,genericErrors:{},filesystems:null,syncFSRequests:0,lookupPath:(path,opts={})=>{path=PATH_FS.resolve(path);if(!path)return {path:"",node:null};var defaults={follow_mount:true,recurse_count:0};opts=Object.assign(defaults,opts);if(opts.recurse_count>8){throw new FS.ErrnoError(32)}var parts=path.split("/").filter(p=>!!p);var current=FS.root;var current_path="/";for(var i=0;i<parts.length;i++){var islast=i===parts.length-1;if(islast&&opts.parent){break}current=FS.lookupNode(current,parts[i]);current_path=PATH.join2(current_path,parts[i]);if(FS.isMountpoint(current)){if(!islast||islast&&opts.follow_mount){current=current.mounted.root;}}if(!islast||opts.follow){var count=0;while(FS.isLink(current.mode)){var link=FS.readlink(current_path);current_path=PATH_FS.resolve(PATH.dirname(current_path),link);var lookup=FS.lookupPath(current_path,{recurse_count:opts.recurse_count+1});current=lookup.node;if(count++>40){throw new FS.ErrnoError(32)}}}}return {path:current_path,node:current}},getPath:node=>{var path;while(true){if(FS.isRoot(node)){var mount=node.mount.mountpoint;if(!path)return mount;return mount[mount.length-1]!=="/"?`${mount}/${path}`:mount+path}path=path?`${node.name}/${path}`:node.name;node=node.parent;}},hashName:(parentid,name)=>{var hash=0;for(var i=0;i<name.length;i++){hash=(hash<<5)-hash+name.charCodeAt(i)|0;}return (parentid+hash>>>0)%FS.nameTable.length},hashAddNode:node=>{var hash=FS.hashName(node.parent.id,node.name);node.name_next=FS.nameTable[hash];FS.nameTable[hash]=node;},hashRemoveNode:node=>{var hash=FS.hashName(node.parent.id,node.name);if(FS.nameTable[hash]===node){FS.nameTable[hash]=node.name_next;}else {var current=FS.nameTable[hash];while(current){if(current.name_next===node){current.name_next=node.name_next;break}current=current.name_next;}}},lookupNode:(parent,name)=>{var errCode=FS.mayLookup(parent);if(errCode){throw new FS.ErrnoError(errCode,parent)}var hash=FS.hashName(parent.id,name);for(var node=FS.nameTable[hash];node;node=node.name_next){var nodeName=node.name;if(node.parent.id===parent.id&&nodeName===name){return node}}return FS.lookup(parent,name)},createNode:(parent,name,mode,rdev)=>{var node=new FS.FSNode(parent,name,mode,rdev);FS.hashAddNode(node);return node},destroyNode:node=>{FS.hashRemoveNode(node);},isRoot:node=>{return node===node.parent},isMountpoint:node=>{return !!node.mounted},isFile:mode=>{return (mode&61440)===32768},isDir:mode=>{return (mode&61440)===16384},isLink:mode=>{return (mode&61440)===40960},isChrdev:mode=>{return (mode&61440)===8192},isBlkdev:mode=>{return (mode&61440)===24576},isFIFO:mode=>{return (mode&61440)===4096},isSocket:mode=>{return (mode&49152)===49152},flagsToPermissionString:flag=>{var perms=["r","w","rw"][flag&3];if(flag&512){perms+="w";}return perms},nodePermissions:(node,perms)=>{if(FS.ignorePermissions){return 0}if(perms.includes("r")&&!(node.mode&292)){return 2}else if(perms.includes("w")&&!(node.mode&146)){return 2}else if(perms.includes("x")&&!(node.mode&73)){return 2}return 0},mayLookup:dir=>{var errCode=FS.nodePermissions(dir,"x");if(errCode)return errCode;if(!dir.node_ops.lookup)return 2;return 0},mayCreate:(dir,name)=>{try{var node=FS.lookupNode(dir,name);return 20}catch(e){}return FS.nodePermissions(dir,"wx")},mayDelete:(dir,name,isdir)=>{var node;try{node=FS.lookupNode(dir,name);}catch(e){return e.errno}var errCode=FS.nodePermissions(dir,"wx");if(errCode){return errCode}if(isdir){if(!FS.isDir(node.mode)){return 54}if(FS.isRoot(node)||FS.getPath(node)===FS.cwd()){return 10}}else {if(FS.isDir(node.mode)){return 31}}return 0},mayOpen:(node,flags)=>{if(!node){return 44}if(FS.isLink(node.mode)){return 32}else if(FS.isDir(node.mode)){if(FS.flagsToPermissionString(flags)!=="r"||flags&512){return 31}}return FS.nodePermissions(node,FS.flagsToPermissionString(flags))},MAX_OPEN_FDS:4096,nextfd:()=>{for(var fd=0;fd<=FS.MAX_OPEN_FDS;fd++){if(!FS.streams[fd]){return fd}}throw new FS.ErrnoError(33)},getStreamChecked:fd=>{var stream=FS.getStream(fd);if(!stream){throw new FS.ErrnoError(8)}return stream},getStream:fd=>FS.streams[fd],createStream:(stream,fd=-1)=>{if(!FS.FSStream){FS.FSStream=function(){this.shared={};};FS.FSStream.prototype={};Object.defineProperties(FS.FSStream.prototype,{object:{get:function(){return this.node},set:function(val){this.node=val;}},isRead:{get:function(){return (this.flags&2097155)!==1}},isWrite:{get:function(){return (this.flags&2097155)!==0}},isAppend:{get:function(){return this.flags&1024}},flags:{get:function(){return this.shared.flags},set:function(val){this.shared.flags=val;}},position:{get:function(){return this.shared.position},set:function(val){this.shared.position=val;}}});}stream=Object.assign(new FS.FSStream,stream);if(fd==-1){fd=FS.nextfd();}stream.fd=fd;FS.streams[fd]=stream;return stream},closeStream:fd=>{FS.streams[fd]=null;},chrdev_stream_ops:{open:stream=>{var device=FS.getDevice(stream.node.rdev);stream.stream_ops=device.stream_ops;if(stream.stream_ops.open){stream.stream_ops.open(stream);}},llseek:()=>{throw new FS.ErrnoError(70)}},major:dev=>dev>>8,minor:dev=>dev&255,makedev:(ma,mi)=>ma<<8|mi,registerDevice:(dev,ops)=>{FS.devices[dev]={stream_ops:ops};},getDevice:dev=>FS.devices[dev],getMounts:mount=>{var mounts=[];var check=[mount];while(check.length){var m=check.pop();mounts.push(m);check.push.apply(check,m.mounts);}return mounts},syncfs:(populate,callback)=>{if(typeof populate=="function"){callback=populate;populate=false;}FS.syncFSRequests++;if(FS.syncFSRequests>1){err(`warning: ${FS.syncFSRequests} FS.syncfs operations in flight at once, probably just doing extra work`);}var mounts=FS.getMounts(FS.root.mount);var completed=0;function doCallback(errCode){FS.syncFSRequests--;return callback(errCode)}function done(errCode){if(errCode){if(!done.errored){done.errored=true;return doCallback(errCode)}return}if(++completed>=mounts.length){doCallback(null);}}mounts.forEach(mount=>{if(!mount.type.syncfs){return done(null)}mount.type.syncfs(mount,populate,done);});},mount:(type,opts,mountpoint)=>{var root=mountpoint==="/";var pseudo=!mountpoint;var node;if(root&&FS.root){throw new FS.ErrnoError(10)}else if(!root&&!pseudo){var lookup=FS.lookupPath(mountpoint,{follow_mount:false});mountpoint=lookup.path;node=lookup.node;if(FS.isMountpoint(node)){throw new FS.ErrnoError(10)}if(!FS.isDir(node.mode)){throw new FS.ErrnoError(54)}}var mount={type:type,opts:opts,mountpoint:mountpoint,mounts:[]};var mountRoot=type.mount(mount);mountRoot.mount=mount;mount.root=mountRoot;if(root){FS.root=mountRoot;}else if(node){node.mounted=mount;if(node.mount){node.mount.mounts.push(mount);}}return mountRoot},unmount:mountpoint=>{var lookup=FS.lookupPath(mountpoint,{follow_mount:false});if(!FS.isMountpoint(lookup.node)){throw new FS.ErrnoError(28)}var node=lookup.node;var mount=node.mounted;var mounts=FS.getMounts(mount);Object.keys(FS.nameTable).forEach(hash=>{var current=FS.nameTable[hash];while(current){var next=current.name_next;if(mounts.includes(current.mount)){FS.destroyNode(current);}current=next;}});node.mounted=null;var idx=node.mount.mounts.indexOf(mount);node.mount.mounts.splice(idx,1);},lookup:(parent,name)=>{return parent.node_ops.lookup(parent,name)},mknod:(path,mode,dev)=>{var lookup=FS.lookupPath(path,{parent:true});var parent=lookup.node;var name=PATH.basename(path);if(!name||name==="."||name===".."){throw new FS.ErrnoError(28)}var errCode=FS.mayCreate(parent,name);if(errCode){throw new FS.ErrnoError(errCode)}if(!parent.node_ops.mknod){throw new FS.ErrnoError(63)}return parent.node_ops.mknod(parent,name,mode,dev)},create:(path,mode)=>{mode=mode!==undefined?mode:438;mode&=4095;mode|=32768;return FS.mknod(path,mode,0)},mkdir:(path,mode)=>{mode=mode!==undefined?mode:511;mode&=511|512;mode|=16384;return FS.mknod(path,mode,0)},mkdirTree:(path,mode)=>{var dirs=path.split("/");var d="";for(var i=0;i<dirs.length;++i){if(!dirs[i])continue;d+="/"+dirs[i];try{FS.mkdir(d,mode);}catch(e){if(e.errno!=20)throw e}}},mkdev:(path,mode,dev)=>{if(typeof dev=="undefined"){dev=mode;mode=438;}mode|=8192;return FS.mknod(path,mode,dev)},symlink:(oldpath,newpath)=>{if(!PATH_FS.resolve(oldpath)){throw new FS.ErrnoError(44)}var lookup=FS.lookupPath(newpath,{parent:true});var parent=lookup.node;if(!parent){throw new FS.ErrnoError(44)}var newname=PATH.basename(newpath);var errCode=FS.mayCreate(parent,newname);if(errCode){throw new FS.ErrnoError(errCode)}if(!parent.node_ops.symlink){throw new FS.ErrnoError(63)}return parent.node_ops.symlink(parent,newname,oldpath)},rename:(old_path,new_path)=>{var old_dirname=PATH.dirname(old_path);var new_dirname=PATH.dirname(new_path);var old_name=PATH.basename(old_path);var new_name=PATH.basename(new_path);var lookup,old_dir,new_dir;lookup=FS.lookupPath(old_path,{parent:true});old_dir=lookup.node;lookup=FS.lookupPath(new_path,{parent:true});new_dir=lookup.node;if(!old_dir||!new_dir)throw new FS.ErrnoError(44);if(old_dir.mount!==new_dir.mount){throw new FS.ErrnoError(75)}var old_node=FS.lookupNode(old_dir,old_name);var relative=PATH_FS.relative(old_path,new_dirname);if(relative.charAt(0)!=="."){throw new FS.ErrnoError(28)}relative=PATH_FS.relative(new_path,old_dirname);if(relative.charAt(0)!=="."){throw new FS.ErrnoError(55)}var new_node;try{new_node=FS.lookupNode(new_dir,new_name);}catch(e){}if(old_node===new_node){return}var isdir=FS.isDir(old_node.mode);var errCode=FS.mayDelete(old_dir,old_name,isdir);if(errCode){throw new FS.ErrnoError(errCode)}errCode=new_node?FS.mayDelete(new_dir,new_name,isdir):FS.mayCreate(new_dir,new_name);if(errCode){throw new FS.ErrnoError(errCode)}if(!old_dir.node_ops.rename){throw new FS.ErrnoError(63)}if(FS.isMountpoint(old_node)||new_node&&FS.isMountpoint(new_node)){throw new FS.ErrnoError(10)}if(new_dir!==old_dir){errCode=FS.nodePermissions(old_dir,"w");if(errCode){throw new FS.ErrnoError(errCode)}}FS.hashRemoveNode(old_node);try{old_dir.node_ops.rename(old_node,new_dir,new_name);}catch(e){throw e}finally{FS.hashAddNode(old_node);}},rmdir:path=>{var lookup=FS.lookupPath(path,{parent:true});var parent=lookup.node;var name=PATH.basename(path);var node=FS.lookupNode(parent,name);var errCode=FS.mayDelete(parent,name,true);if(errCode){throw new FS.ErrnoError(errCode)}if(!parent.node_ops.rmdir){throw new FS.ErrnoError(63)}if(FS.isMountpoint(node)){throw new FS.ErrnoError(10)}parent.node_ops.rmdir(parent,name);FS.destroyNode(node);},readdir:path=>{var lookup=FS.lookupPath(path,{follow:true});var node=lookup.node;if(!node.node_ops.readdir){throw new FS.ErrnoError(54)}return node.node_ops.readdir(node)},unlink:path=>{var lookup=FS.lookupPath(path,{parent:true});var parent=lookup.node;if(!parent){throw new FS.ErrnoError(44)}var name=PATH.basename(path);var node=FS.lookupNode(parent,name);var errCode=FS.mayDelete(parent,name,false);if(errCode){throw new FS.ErrnoError(errCode)}if(!parent.node_ops.unlink){throw new FS.ErrnoError(63)}if(FS.isMountpoint(node)){throw new FS.ErrnoError(10)}parent.node_ops.unlink(parent,name);FS.destroyNode(node);},readlink:path=>{var lookup=FS.lookupPath(path);var link=lookup.node;if(!link){throw new FS.ErrnoError(44)}if(!link.node_ops.readlink){throw new FS.ErrnoError(28)}return PATH_FS.resolve(FS.getPath(link.parent),link.node_ops.readlink(link))},stat:(path,dontFollow)=>{var lookup=FS.lookupPath(path,{follow:!dontFollow});var node=lookup.node;if(!node){throw new FS.ErrnoError(44)}if(!node.node_ops.getattr){throw new FS.ErrnoError(63)}return node.node_ops.getattr(node)},lstat:path=>{return FS.stat(path,true)},chmod:(path,mode,dontFollow)=>{var node;if(typeof path=="string"){var lookup=FS.lookupPath(path,{follow:!dontFollow});node=lookup.node;}else {node=path;}if(!node.node_ops.setattr){throw new FS.ErrnoError(63)}node.node_ops.setattr(node,{mode:mode&4095|node.mode&~4095,timestamp:Date.now()});},lchmod:(path,mode)=>{FS.chmod(path,mode,true);},fchmod:(fd,mode)=>{var stream=FS.getStreamChecked(fd);FS.chmod(stream.node,mode);},chown:(path,uid,gid,dontFollow)=>{var node;if(typeof path=="string"){var lookup=FS.lookupPath(path,{follow:!dontFollow});node=lookup.node;}else {node=path;}if(!node.node_ops.setattr){throw new FS.ErrnoError(63)}node.node_ops.setattr(node,{timestamp:Date.now()});},lchown:(path,uid,gid)=>{FS.chown(path,uid,gid,true);},fchown:(fd,uid,gid)=>{var stream=FS.getStreamChecked(fd);FS.chown(stream.node,uid,gid);},truncate:(path,len)=>{if(len<0){throw new FS.ErrnoError(28)}var node;if(typeof path=="string"){var lookup=FS.lookupPath(path,{follow:true});node=lookup.node;}else {node=path;}if(!node.node_ops.setattr){throw new FS.ErrnoError(63)}if(FS.isDir(node.mode)){throw new FS.ErrnoError(31)}if(!FS.isFile(node.mode)){throw new FS.ErrnoError(28)}var errCode=FS.nodePermissions(node,"w");if(errCode){throw new FS.ErrnoError(errCode)}node.node_ops.setattr(node,{size:len,timestamp:Date.now()});},ftruncate:(fd,len)=>{var stream=FS.getStreamChecked(fd);if((stream.flags&2097155)===0){throw new FS.ErrnoError(28)}FS.truncate(stream.node,len);},utime:(path,atime,mtime)=>{var lookup=FS.lookupPath(path,{follow:true});var node=lookup.node;node.node_ops.setattr(node,{timestamp:Math.max(atime,mtime)});},open:(path,flags,mode)=>{if(path===""){throw new FS.ErrnoError(44)}flags=typeof flags=="string"?FS_modeStringToFlags(flags):flags;mode=typeof mode=="undefined"?438:mode;if(flags&64){mode=mode&4095|32768;}else {mode=0;}var node;if(typeof path=="object"){node=path;}else {path=PATH.normalize(path);try{var lookup=FS.lookupPath(path,{follow:!(flags&131072)});node=lookup.node;}catch(e){}}var created=false;if(flags&64){if(node){if(flags&128){throw new FS.ErrnoError(20)}}else {node=FS.mknod(path,mode,0);created=true;}}if(!node){throw new FS.ErrnoError(44)}if(FS.isChrdev(node.mode)){flags&=~512;}if(flags&65536&&!FS.isDir(node.mode)){throw new FS.ErrnoError(54)}if(!created){var errCode=FS.mayOpen(node,flags);if(errCode){throw new FS.ErrnoError(errCode)}}if(flags&512&&!created){FS.truncate(node,0);}flags&=~(128|512|131072);var stream=FS.createStream({node:node,path:FS.getPath(node),flags:flags,seekable:true,position:0,stream_ops:node.stream_ops,ungotten:[],error:false});if(stream.stream_ops.open){stream.stream_ops.open(stream);}if(Module["logReadFiles"]&&!(flags&1)){if(!FS.readFiles)FS.readFiles={};if(!(path in FS.readFiles)){FS.readFiles[path]=1;}}return stream},close:stream=>{if(FS.isClosed(stream)){throw new FS.ErrnoError(8)}if(stream.getdents)stream.getdents=null;try{if(stream.stream_ops.close){stream.stream_ops.close(stream);}}catch(e){throw e}finally{FS.closeStream(stream.fd);}stream.fd=null;},isClosed:stream=>{return stream.fd===null},llseek:(stream,offset,whence)=>{if(FS.isClosed(stream)){throw new FS.ErrnoError(8)}if(!stream.seekable||!stream.stream_ops.llseek){throw new FS.ErrnoError(70)}if(whence!=0&&whence!=1&&whence!=2){throw new FS.ErrnoError(28)}stream.position=stream.stream_ops.llseek(stream,offset,whence);stream.ungotten=[];return stream.position},read:(stream,buffer,offset,length,position)=>{if(length<0||position<0){throw new FS.ErrnoError(28)}if(FS.isClosed(stream)){throw new FS.ErrnoError(8)}if((stream.flags&2097155)===1){throw new FS.ErrnoError(8)}if(FS.isDir(stream.node.mode)){throw new FS.ErrnoError(31)}if(!stream.stream_ops.read){throw new FS.ErrnoError(28)}var seeking=typeof position!="undefined";if(!seeking){position=stream.position;}else if(!stream.seekable){throw new FS.ErrnoError(70)}var bytesRead=stream.stream_ops.read(stream,buffer,offset,length,position);if(!seeking)stream.position+=bytesRead;return bytesRead},write:(stream,buffer,offset,length,position,canOwn)=>{if(length<0||position<0){throw new FS.ErrnoError(28)}if(FS.isClosed(stream)){throw new FS.ErrnoError(8)}if((stream.flags&2097155)===0){throw new FS.ErrnoError(8)}if(FS.isDir(stream.node.mode)){throw new FS.ErrnoError(31)}if(!stream.stream_ops.write){throw new FS.ErrnoError(28)}if(stream.seekable&&stream.flags&1024){FS.llseek(stream,0,2);}var seeking=typeof position!="undefined";if(!seeking){position=stream.position;}else if(!stream.seekable){throw new FS.ErrnoError(70)}var bytesWritten=stream.stream_ops.write(stream,buffer,offset,length,position,canOwn);if(!seeking)stream.position+=bytesWritten;return bytesWritten},allocate:(stream,offset,length)=>{if(FS.isClosed(stream)){throw new FS.ErrnoError(8)}if(offset<0||length<=0){throw new FS.ErrnoError(28)}if((stream.flags&2097155)===0){throw new FS.ErrnoError(8)}if(!FS.isFile(stream.node.mode)&&!FS.isDir(stream.node.mode)){throw new FS.ErrnoError(43)}if(!stream.stream_ops.allocate){throw new FS.ErrnoError(138)}stream.stream_ops.allocate(stream,offset,length);},mmap:(stream,length,position,prot,flags)=>{if((prot&2)!==0&&(flags&2)===0&&(stream.flags&2097155)!==2){throw new FS.ErrnoError(2)}if((stream.flags&2097155)===1){throw new FS.ErrnoError(2)}if(!stream.stream_ops.mmap){throw new FS.ErrnoError(43)}return stream.stream_ops.mmap(stream,length,position,prot,flags)},msync:(stream,buffer,offset,length,mmapFlags)=>{if(!stream.stream_ops.msync){return 0}return stream.stream_ops.msync(stream,buffer,offset,length,mmapFlags)},munmap:stream=>0,ioctl:(stream,cmd,arg)=>{if(!stream.stream_ops.ioctl){throw new FS.ErrnoError(59)}return stream.stream_ops.ioctl(stream,cmd,arg)},readFile:(path,opts={})=>{opts.flags=opts.flags||0;opts.encoding=opts.encoding||"binary";if(opts.encoding!=="utf8"&&opts.encoding!=="binary"){throw new Error(`Invalid encoding type "${opts.encoding}"`)}var ret;var stream=FS.open(path,opts.flags);var stat=FS.stat(path);var length=stat.size;var buf=new Uint8Array(length);FS.read(stream,buf,0,length,0);if(opts.encoding==="utf8"){ret=UTF8ArrayToString(buf,0);}else if(opts.encoding==="binary"){ret=buf;}FS.close(stream);return ret},writeFile:(path,data,opts={})=>{opts.flags=opts.flags||577;var stream=FS.open(path,opts.flags,opts.mode);if(typeof data=="string"){var buf=new Uint8Array(lengthBytesUTF8(data)+1);var actualNumBytes=stringToUTF8Array(data,buf,0,buf.length);FS.write(stream,buf,0,actualNumBytes,undefined,opts.canOwn);}else if(ArrayBuffer.isView(data)){FS.write(stream,data,0,data.byteLength,undefined,opts.canOwn);}else {throw new Error("Unsupported data type")}FS.close(stream);},cwd:()=>FS.currentPath,chdir:path=>{var lookup=FS.lookupPath(path,{follow:true});if(lookup.node===null){throw new FS.ErrnoError(44)}if(!FS.isDir(lookup.node.mode)){throw new FS.ErrnoError(54)}var errCode=FS.nodePermissions(lookup.node,"x");if(errCode){throw new FS.ErrnoError(errCode)}FS.currentPath=lookup.path;},createDefaultDirectories:()=>{FS.mkdir("/tmp");FS.mkdir("/home");FS.mkdir("/home/web_user");},createDefaultDevices:()=>{FS.mkdir("/dev");FS.registerDevice(FS.makedev(1,3),{read:()=>0,write:(stream,buffer,offset,length,pos)=>length});FS.mkdev("/dev/null",FS.makedev(1,3));TTY.register(FS.makedev(5,0),TTY.default_tty_ops);TTY.register(FS.makedev(6,0),TTY.default_tty1_ops);FS.mkdev("/dev/tty",FS.makedev(5,0));FS.mkdev("/dev/tty1",FS.makedev(6,0));var randomBuffer=new Uint8Array(1024),randomLeft=0;var randomByte=()=>{if(randomLeft===0){randomLeft=randomFill(randomBuffer).byteLength;}return randomBuffer[--randomLeft]};FS.createDevice("/dev","random",randomByte);FS.createDevice("/dev","urandom",randomByte);FS.mkdir("/dev/shm");FS.mkdir("/dev/shm/tmp");},createSpecialDirectories:()=>{FS.mkdir("/proc");var proc_self=FS.mkdir("/proc/self");FS.mkdir("/proc/self/fd");FS.mount({mount:()=>{var node=FS.createNode(proc_self,"fd",16384|511,73);node.node_ops={lookup:(parent,name)=>{var fd=+name;var stream=FS.getStreamChecked(fd);var ret={parent:null,mount:{mountpoint:"fake"},node_ops:{readlink:()=>stream.path}};ret.parent=ret;return ret}};return node}},{},"/proc/self/fd");},createStandardStreams:()=>{if(Module["stdin"]){FS.createDevice("/dev","stdin",Module["stdin"]);}else {FS.symlink("/dev/tty","/dev/stdin");}if(Module["stdout"]){FS.createDevice("/dev","stdout",null,Module["stdout"]);}else {FS.symlink("/dev/tty","/dev/stdout");}if(Module["stderr"]){FS.createDevice("/dev","stderr",null,Module["stderr"]);}else {FS.symlink("/dev/tty1","/dev/stderr");}FS.open("/dev/stdin",0);FS.open("/dev/stdout",1);FS.open("/dev/stderr",1);},ensureErrnoError:()=>{if(FS.ErrnoError)return;FS.ErrnoError=function ErrnoError(errno,node){this.name="ErrnoError";this.node=node;this.setErrno=function(errno){this.errno=errno;};this.setErrno(errno);this.message="FS error";};FS.ErrnoError.prototype=new Error;FS.ErrnoError.prototype.constructor=FS.ErrnoError;[44].forEach(code=>{FS.genericErrors[code]=new FS.ErrnoError(code);FS.genericErrors[code].stack="<generic error, no stack>";});},staticInit:()=>{FS.ensureErrnoError();FS.nameTable=new Array(4096);FS.mount(MEMFS,{},"/");FS.createDefaultDirectories();FS.createDefaultDevices();FS.createSpecialDirectories();FS.filesystems={"MEMFS":MEMFS,"NODEFS":NODEFS,"WORKERFS":WORKERFS};},init:(input,output,error)=>{FS.init.initialized=true;FS.ensureErrnoError();Module["stdin"]=input||Module["stdin"];Module["stdout"]=output||Module["stdout"];Module["stderr"]=error||Module["stderr"];FS.createStandardStreams();},quit:()=>{FS.init.initialized=false;for(var i=0;i<FS.streams.length;i++){var stream=FS.streams[i];if(!stream){continue}FS.close(stream);}},findObject:(path,dontResolveLastLink)=>{var ret=FS.analyzePath(path,dontResolveLastLink);if(!ret.exists){return null}return ret.object},analyzePath:(path,dontResolveLastLink)=>{try{var lookup=FS.lookupPath(path,{follow:!dontResolveLastLink});path=lookup.path;}catch(e){}var ret={isRoot:false,exists:false,error:0,name:null,path:null,object:null,parentExists:false,parentPath:null,parentObject:null};try{var lookup=FS.lookupPath(path,{parent:true});ret.parentExists=true;ret.parentPath=lookup.path;ret.parentObject=lookup.node;ret.name=PATH.basename(path);lookup=FS.lookupPath(path,{follow:!dontResolveLastLink});ret.exists=true;ret.path=lookup.path;ret.object=lookup.node;ret.name=lookup.node.name;ret.isRoot=lookup.path==="/";}catch(e){ret.error=e.errno;}return ret},createPath:(parent,path,canRead,canWrite)=>{parent=typeof parent=="string"?parent:FS.getPath(parent);var parts=path.split("/").reverse();while(parts.length){var part=parts.pop();if(!part)continue;var current=PATH.join2(parent,part);try{FS.mkdir(current);}catch(e){}parent=current;}return current},createFile:(parent,name,properties,canRead,canWrite)=>{var path=PATH.join2(typeof parent=="string"?parent:FS.getPath(parent),name);var mode=FS_getMode(canRead,canWrite);return FS.create(path,mode)},createDataFile:(parent,name,data,canRead,canWrite,canOwn)=>{var path=name;if(parent){parent=typeof parent=="string"?parent:FS.getPath(parent);path=name?PATH.join2(parent,name):parent;}var mode=FS_getMode(canRead,canWrite);var node=FS.create(path,mode);if(data){if(typeof data=="string"){var arr=new Array(data.length);for(var i=0,len=data.length;i<len;++i)arr[i]=data.charCodeAt(i);data=arr;}FS.chmod(node,mode|146);var stream=FS.open(node,577);FS.write(stream,data,0,data.length,0,canOwn);FS.close(stream);FS.chmod(node,mode);}return node},createDevice:(parent,name,input,output)=>{var path=PATH.join2(typeof parent=="string"?parent:FS.getPath(parent),name);var mode=FS_getMode(!!input,!!output);if(!FS.createDevice.major)FS.createDevice.major=64;var dev=FS.makedev(FS.createDevice.major++,0);FS.registerDevice(dev,{open:stream=>{stream.seekable=false;},close:stream=>{if(output&&output.buffer&&output.buffer.length){output(10);}},read:(stream,buffer,offset,length,pos)=>{var bytesRead=0;for(var i=0;i<length;i++){var result;try{result=input();}catch(e){throw new FS.ErrnoError(29)}if(result===undefined&&bytesRead===0){throw new FS.ErrnoError(6)}if(result===null||result===undefined)break;bytesRead++;buffer[offset+i]=result;}if(bytesRead){stream.node.timestamp=Date.now();}return bytesRead},write:(stream,buffer,offset,length,pos)=>{for(var i=0;i<length;i++){try{output(buffer[offset+i]);}catch(e){throw new FS.ErrnoError(29)}}if(length){stream.node.timestamp=Date.now();}return i}});return FS.mkdev(path,mode,dev)},forceLoadFile:obj=>{if(obj.isDevice||obj.isFolder||obj.link||obj.contents)return true;if(typeof XMLHttpRequest!="undefined"){throw new Error("Lazy loading should have been performed (contents set) in createLazyFile, but it was not. Lazy loading only works in web workers. Use --embed-file or --preload-file in emcc on the main thread.")}else if(read_){try{obj.contents=intArrayFromString(read_(obj.url),true);obj.usedBytes=obj.contents.length;}catch(e){throw new FS.ErrnoError(29)}}else {throw new Error("Cannot load without read() or XMLHttpRequest.")}},createLazyFile:(parent,name,url,canRead,canWrite)=>{function LazyUint8Array(){this.lengthKnown=false;this.chunks=[];}LazyUint8Array.prototype.get=function LazyUint8Array_get(idx){if(idx>this.length-1||idx<0){return undefined}var chunkOffset=idx%this.chunkSize;var chunkNum=idx/this.chunkSize|0;return this.getter(chunkNum)[chunkOffset]};LazyUint8Array.prototype.setDataGetter=function LazyUint8Array_setDataGetter(getter){this.getter=getter;};LazyUint8Array.prototype.cacheLength=function LazyUint8Array_cacheLength(){var xhr=new XMLHttpRequest;xhr.open("HEAD",url,false);xhr.send(null);if(!(xhr.status>=200&&xhr.status<300||xhr.status===304))throw new Error("Couldn't load "+url+". Status: "+xhr.status);var datalength=Number(xhr.getResponseHeader("Content-length"));var header;var hasByteServing=(header=xhr.getResponseHeader("Accept-Ranges"))&&header==="bytes";var usesGzip=(header=xhr.getResponseHeader("Content-Encoding"))&&header==="gzip";var chunkSize=1024*1024;if(!hasByteServing)chunkSize=datalength;var doXHR=(from,to)=>{if(from>to)throw new Error("invalid range ("+from+", "+to+") or no bytes requested!");if(to>datalength-1)throw new Error("only "+datalength+" bytes available! programmer error!");var xhr=new XMLHttpRequest;xhr.open("GET",url,false);if(datalength!==chunkSize)xhr.setRequestHeader("Range","bytes="+from+"-"+to);xhr.responseType="arraybuffer";if(xhr.overrideMimeType){xhr.overrideMimeType("text/plain; charset=x-user-defined");}xhr.send(null);if(!(xhr.status>=200&&xhr.status<300||xhr.status===304))throw new Error("Couldn't load "+url+". Status: "+xhr.status);if(xhr.response!==undefined){return new Uint8Array(xhr.response||[])}return intArrayFromString(xhr.responseText||"",true)};var lazyArray=this;lazyArray.setDataGetter(chunkNum=>{var start=chunkNum*chunkSize;var end=(chunkNum+1)*chunkSize-1;end=Math.min(end,datalength-1);if(typeof lazyArray.chunks[chunkNum]=="undefined"){lazyArray.chunks[chunkNum]=doXHR(start,end);}if(typeof lazyArray.chunks[chunkNum]=="undefined")throw new Error("doXHR failed!");return lazyArray.chunks[chunkNum]});if(usesGzip||!datalength){chunkSize=datalength=1;datalength=this.getter(0).length;chunkSize=datalength;out("LazyFiles on gzip forces download of the whole file when length is accessed");}this._length=datalength;this._chunkSize=chunkSize;this.lengthKnown=true;};if(typeof XMLHttpRequest!="undefined"){if(!ENVIRONMENT_IS_WORKER)throw "Cannot do synchronous binary XHRs outside webworkers in modern browsers. Use --embed-file or --preload-file in emcc";var lazyArray=new LazyUint8Array;Object.defineProperties(lazyArray,{length:{get:function(){if(!this.lengthKnown){this.cacheLength();}return this._length}},chunkSize:{get:function(){if(!this.lengthKnown){this.cacheLength();}return this._chunkSize}}});var properties={isDevice:false,contents:lazyArray};}else {var properties={isDevice:false,url:url};}var node=FS.createFile(parent,name,properties,canRead,canWrite);if(properties.contents){node.contents=properties.contents;}else if(properties.url){node.contents=null;node.url=properties.url;}Object.defineProperties(node,{usedBytes:{get:function(){return this.contents.length}}});var stream_ops={};var keys=Object.keys(node.stream_ops);keys.forEach(key=>{var fn=node.stream_ops[key];stream_ops[key]=function forceLoadLazyFile(){FS.forceLoadFile(node);return fn.apply(null,arguments)};});function writeChunks(stream,buffer,offset,length,position){var contents=stream.node.contents;if(position>=contents.length)return 0;var size=Math.min(contents.length-position,length);if(contents.slice){for(var i=0;i<size;i++){buffer[offset+i]=contents[position+i];}}else {for(var i=0;i<size;i++){buffer[offset+i]=contents.get(position+i);}}return size}stream_ops.read=(stream,buffer,offset,length,position)=>{FS.forceLoadFile(node);return writeChunks(stream,buffer,offset,length,position)};stream_ops.mmap=(stream,length,position,prot,flags)=>{FS.forceLoadFile(node);var ptr=mmapAlloc();if(!ptr){throw new FS.ErrnoError(48)}writeChunks(stream,HEAP8,ptr,length,position);return {ptr:ptr,allocated:true}};node.stream_ops=stream_ops;return node}};var _environ_get=(__environ,environ_buf)=>{var bufSize=0;getEnvStrings().forEach(function(string,i){var ptr=environ_buf+bufSize;HEAPU32[__environ+i*4>>2]=ptr;stringToAscii(string,ptr);bufSize+=string.length+1;});return 0};var _environ_sizes_get=(penviron_count,penviron_buf_size)=>{var strings=getEnvStrings();HEAPU32[penviron_count>>2]=strings.length;var bufSize=0;strings.forEach(function(string){bufSize+=string.length+1;});HEAPU32[penviron_buf_size>>2]=bufSize;return 0};var _getentropy=(buffer,size)=>{randomFill(HEAPU8.subarray(buffer,buffer+size));return 0};function _llvm_eh_typeid_for(type){return type}var isLeapYear=year=>{return year%4===0&&(year%100!==0||year%400===0)};var arraySum=(array,index)=>{var sum=0;for(var i=0;i<=index;sum+=array[i++]){}return sum};var MONTH_DAYS_LEAP=[31,29,31,30,31,30,31,31,30,31,30,31];var MONTH_DAYS_REGULAR=[31,28,31,30,31,30,31,31,30,31,30,31];var addDays=(date,days)=>{var newDate=new Date(date.getTime());while(days>0){var leap=isLeapYear(newDate.getFullYear());var currentMonth=newDate.getMonth();var daysInCurrentMonth=(leap?MONTH_DAYS_LEAP:MONTH_DAYS_REGULAR)[currentMonth];if(days>daysInCurrentMonth-newDate.getDate()){days-=daysInCurrentMonth-newDate.getDate()+1;newDate.setDate(1);if(currentMonth<11){newDate.setMonth(currentMonth+1);}else {newDate.setMonth(0);newDate.setFullYear(newDate.getFullYear()+1);}}else {newDate.setDate(newDate.getDate()+days);return newDate}}return newDate};var writeArrayToMemory=(array,buffer)=>{HEAP8.set(array,buffer);};var _strftime=(s,maxsize,format,tm)=>{var tm_zone=HEAP32[tm+40>>2];var date={tm_sec:HEAP32[tm>>2],tm_min:HEAP32[tm+4>>2],tm_hour:HEAP32[tm+8>>2],tm_mday:HEAP32[tm+12>>2],tm_mon:HEAP32[tm+16>>2],tm_year:HEAP32[tm+20>>2],tm_wday:HEAP32[tm+24>>2],tm_yday:HEAP32[tm+28>>2],tm_isdst:HEAP32[tm+32>>2],tm_gmtoff:HEAP32[tm+36>>2],tm_zone:tm_zone?UTF8ToString(tm_zone):""};var pattern=UTF8ToString(format);var EXPANSION_RULES_1={"%c":"%a %b %d %H:%M:%S %Y","%D":"%m/%d/%y","%F":"%Y-%m-%d","%h":"%b","%r":"%I:%M:%S %p","%R":"%H:%M","%T":"%H:%M:%S","%x":"%m/%d/%y","%X":"%H:%M:%S","%Ec":"%c","%EC":"%C","%Ex":"%m/%d/%y","%EX":"%H:%M:%S","%Ey":"%y","%EY":"%Y","%Od":"%d","%Oe":"%e","%OH":"%H","%OI":"%I","%Om":"%m","%OM":"%M","%OS":"%S","%Ou":"%u","%OU":"%U","%OV":"%V","%Ow":"%w","%OW":"%W","%Oy":"%y"};for(var rule in EXPANSION_RULES_1){pattern=pattern.replace(new RegExp(rule,"g"),EXPANSION_RULES_1[rule]);}var WEEKDAYS=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];var MONTHS=["January","February","March","April","May","June","July","August","September","October","November","December"];function leadingSomething(value,digits,character){var str=typeof value=="number"?value.toString():value||"";while(str.length<digits){str=character[0]+str;}return str}function leadingNulls(value,digits){return leadingSomething(value,digits,"0")}function compareByDay(date1,date2){function sgn(value){return value<0?-1:value>0?1:0}var compare;if((compare=sgn(date1.getFullYear()-date2.getFullYear()))===0){if((compare=sgn(date1.getMonth()-date2.getMonth()))===0){compare=sgn(date1.getDate()-date2.getDate());}}return compare}function getFirstWeekStartDate(janFourth){switch(janFourth.getDay()){case 0:return new Date(janFourth.getFullYear()-1,11,29);case 1:return janFourth;case 2:return new Date(janFourth.getFullYear(),0,3);case 3:return new Date(janFourth.getFullYear(),0,2);case 4:return new Date(janFourth.getFullYear(),0,1);case 5:return new Date(janFourth.getFullYear()-1,11,31);case 6:return new Date(janFourth.getFullYear()-1,11,30)}}function getWeekBasedYear(date){var thisDate=addDays(new Date(date.tm_year+1900,0,1),date.tm_yday);var janFourthThisYear=new Date(thisDate.getFullYear(),0,4);var janFourthNextYear=new Date(thisDate.getFullYear()+1,0,4);var firstWeekStartThisYear=getFirstWeekStartDate(janFourthThisYear);var firstWeekStartNextYear=getFirstWeekStartDate(janFourthNextYear);if(compareByDay(firstWeekStartThisYear,thisDate)<=0){if(compareByDay(firstWeekStartNextYear,thisDate)<=0){return thisDate.getFullYear()+1}return thisDate.getFullYear()}return thisDate.getFullYear()-1}var EXPANSION_RULES_2={"%a":date=>WEEKDAYS[date.tm_wday].substring(0,3),"%A":date=>WEEKDAYS[date.tm_wday],"%b":date=>MONTHS[date.tm_mon].substring(0,3),"%B":date=>MONTHS[date.tm_mon],"%C":date=>{var year=date.tm_year+1900;return leadingNulls(year/100|0,2)},"%d":date=>leadingNulls(date.tm_mday,2),"%e":date=>leadingSomething(date.tm_mday,2," "),"%g":date=>{return getWeekBasedYear(date).toString().substring(2)},"%G":date=>getWeekBasedYear(date),"%H":date=>leadingNulls(date.tm_hour,2),"%I":date=>{var twelveHour=date.tm_hour;if(twelveHour==0)twelveHour=12;else if(twelveHour>12)twelveHour-=12;return leadingNulls(twelveHour,2)},"%j":date=>{return leadingNulls(date.tm_mday+arraySum(isLeapYear(date.tm_year+1900)?MONTH_DAYS_LEAP:MONTH_DAYS_REGULAR,date.tm_mon-1),3)},"%m":date=>leadingNulls(date.tm_mon+1,2),"%M":date=>leadingNulls(date.tm_min,2),"%n":()=>"\n","%p":date=>{if(date.tm_hour>=0&&date.tm_hour<12){return "AM"}return "PM"},"%S":date=>leadingNulls(date.tm_sec,2),"%t":()=>"\t","%u":date=>date.tm_wday||7,"%U":date=>{var days=date.tm_yday+7-date.tm_wday;return leadingNulls(Math.floor(days/7),2)},"%V":date=>{var val=Math.floor((date.tm_yday+7-(date.tm_wday+6)%7)/7);if((date.tm_wday+371-date.tm_yday-2)%7<=2){val++;}if(!val){val=52;var dec31=(date.tm_wday+7-date.tm_yday-1)%7;if(dec31==4||dec31==5&&isLeapYear(date.tm_year%400-1)){val++;}}else if(val==53){var jan1=(date.tm_wday+371-date.tm_yday)%7;if(jan1!=4&&(jan1!=3||!isLeapYear(date.tm_year)))val=1;}return leadingNulls(val,2)},"%w":date=>date.tm_wday,"%W":date=>{var days=date.tm_yday+7-(date.tm_wday+6)%7;return leadingNulls(Math.floor(days/7),2)},"%y":date=>{return (date.tm_year+1900).toString().substring(2)},"%Y":date=>date.tm_year+1900,"%z":date=>{var off=date.tm_gmtoff;var ahead=off>=0;off=Math.abs(off)/60;off=off/60*100+off%60;return (ahead?"+":"-")+String("0000"+off).slice(-4)},"%Z":date=>date.tm_zone,"%%":()=>"%"};pattern=pattern.replace(/%%/g,"\0\0");for(var rule in EXPANSION_RULES_2){if(pattern.includes(rule)){pattern=pattern.replace(new RegExp(rule,"g"),EXPANSION_RULES_2[rule](date));}}pattern=pattern.replace(/\0\0/g,"%");var bytes=intArrayFromString(pattern,false);if(bytes.length>maxsize){return 0}writeArrayToMemory(bytes,s);return bytes.length-1};var _strftime_l=(s,maxsize,format,tm,loc)=>{return _strftime(s,maxsize,format,tm)};var wasmTableMirror=[];var getWasmTableEntry=funcPtr=>{var func=wasmTableMirror[funcPtr];if(!func){if(funcPtr>=wasmTableMirror.length)wasmTableMirror.length=funcPtr+1;wasmTableMirror[funcPtr]=func=wasmTable.get(funcPtr);}return func};function getCFunc(ident){var func=Module["_"+ident];return func}var stringToUTF8=(str,outPtr,maxBytesToWrite)=>{return stringToUTF8Array(str,HEAPU8,outPtr,maxBytesToWrite)};var stringToUTF8OnStack=str=>{var size=lengthBytesUTF8(str)+1;var ret=stackAlloc(size);stringToUTF8(str,ret,size);return ret};var ccall=function(ident,returnType,argTypes,args,opts){var toC={"string":str=>{var ret=0;if(str!==null&&str!==undefined&&str!==0){ret=stringToUTF8OnStack(str);}return ret},"array":arr=>{var ret=stackAlloc(arr.length);writeArrayToMemory(arr,ret);return ret}};function convertReturnValue(ret){if(returnType==="string"){return UTF8ToString(ret)}if(returnType==="boolean")return Boolean(ret);return ret}var func=getCFunc(ident);var cArgs=[];var stack=0;if(args){for(var i=0;i<args.length;i++){var converter=toC[argTypes[i]];if(converter){if(stack===0)stack=stackSave();cArgs[i]=converter(args[i]);}else {cArgs[i]=args[i];}}}var ret=func.apply(null,cArgs);function onDone(ret){if(stack!==0)stackRestore(stack);return convertReturnValue(ret)}ret=onDone(ret);return ret};var cwrap=function(ident,returnType,argTypes,opts){var numericArgs=!argTypes||argTypes.every(type=>type==="number"||type==="boolean");var numericRet=returnType!=="string";if(numericRet&&numericArgs&&!opts){return getCFunc(ident)}return function(){return ccall(ident,returnType,argTypes,arguments)}};var FSNode=function(parent,name,mode,rdev){if(!parent){parent=this;}this.parent=parent;this.mount=parent.mount;this.mounted=null;this.id=FS.nextInode++;this.name=name;this.mode=mode;this.node_ops={};this.stream_ops={};this.rdev=rdev;};var readMode=292|73;var writeMode=146;Object.defineProperties(FSNode.prototype,{read:{get:function(){return (this.mode&readMode)===readMode},set:function(val){val?this.mode|=readMode:this.mode&=~readMode;}},write:{get:function(){return (this.mode&writeMode)===writeMode},set:function(val){val?this.mode|=writeMode:this.mode&=~writeMode;}},isFolder:{get:function(){return FS.isDir(this.mode)}},isDevice:{get:function(){return FS.isChrdev(this.mode)}}});FS.FSNode=FSNode;FS.createPreloadedFile=FS_createPreloadedFile;FS.staticInit();Module["FS_createPath"]=FS.createPath;Module["FS_createDataFile"]=FS.createDataFile;Module["FS_createPreloadedFile"]=FS.createPreloadedFile;Module["FS_unlink"]=FS.unlink;Module["FS_createLazyFile"]=FS.createLazyFile;Module["FS_createDevice"]=FS.createDevice;if(ENVIRONMENT_IS_NODE){NODEFS.staticInit();}ERRNO_CODES={"EPERM":63,"ENOENT":44,"ESRCH":71,"EINTR":27,"EIO":29,"ENXIO":60,"E2BIG":1,"ENOEXEC":45,"EBADF":8,"ECHILD":12,"EAGAIN":6,"EWOULDBLOCK":6,"ENOMEM":48,"EACCES":2,"EFAULT":21,"ENOTBLK":105,"EBUSY":10,"EEXIST":20,"EXDEV":75,"ENODEV":43,"ENOTDIR":54,"EISDIR":31,"EINVAL":28,"ENFILE":41,"EMFILE":33,"ENOTTY":59,"ETXTBSY":74,"EFBIG":22,"ENOSPC":51,"ESPIPE":70,"EROFS":69,"EMLINK":34,"EPIPE":64,"EDOM":18,"ERANGE":68,"ENOMSG":49,"EIDRM":24,"ECHRNG":106,"EL2NSYNC":156,"EL3HLT":107,"EL3RST":108,"ELNRNG":109,"EUNATCH":110,"ENOCSI":111,"EL2HLT":112,"EDEADLK":16,"ENOLCK":46,"EBADE":113,"EBADR":114,"EXFULL":115,"ENOANO":104,"EBADRQC":103,"EBADSLT":102,"EDEADLOCK":16,"EBFONT":101,"ENOSTR":100,"ENODATA":116,"ETIME":117,"ENOSR":118,"ENONET":119,"ENOPKG":120,"EREMOTE":121,"ENOLINK":47,"EADV":122,"ESRMNT":123,"ECOMM":124,"EPROTO":65,"EMULTIHOP":36,"EDOTDOT":125,"EBADMSG":9,"ENOTUNIQ":126,"EBADFD":127,"EREMCHG":128,"ELIBACC":129,"ELIBBAD":130,"ELIBSCN":131,"ELIBMAX":132,"ELIBEXEC":133,"ENOSYS":52,"ENOTEMPTY":55,"ENAMETOOLONG":37,"ELOOP":32,"EOPNOTSUPP":138,"EPFNOSUPPORT":139,"ECONNRESET":15,"ENOBUFS":42,"EAFNOSUPPORT":5,"EPROTOTYPE":67,"ENOTSOCK":57,"ENOPROTOOPT":50,"ESHUTDOWN":140,"ECONNREFUSED":14,"EADDRINUSE":3,"ECONNABORTED":13,"ENETUNREACH":40,"ENETDOWN":38,"ETIMEDOUT":73,"EHOSTDOWN":142,"EHOSTUNREACH":23,"EINPROGRESS":26,"EALREADY":7,"EDESTADDRREQ":17,"EMSGSIZE":35,"EPROTONOSUPPORT":66,"ESOCKTNOSUPPORT":137,"EADDRNOTAVAIL":4,"ENETRESET":39,"EISCONN":30,"ENOTCONN":53,"ETOOMANYREFS":141,"EUSERS":136,"EDQUOT":19,"ESTALE":72,"ENOTSUP":138,"ENOMEDIUM":148,"EILSEQ":25,"EOVERFLOW":61,"ECANCELED":11,"ENOTRECOVERABLE":56,"EOWNERDEAD":62,"ESTRPIPE":135};var wasmImports={"f":___assert_fail,"n":___cxa_begin_catch,"o":___cxa_end_catch,"a":___cxa_find_matching_catch_2,"i":___cxa_find_matching_catch_3,"p":___cxa_find_matching_catch_4,"L":___cxa_rethrow,"s":___cxa_throw,"X":___cxa_uncaught_exceptions,"b":___resumeException,"I":_abort,"$":_emscripten_memcpy_big,"aa":_emscripten_resize_heap,"Z":_environ_get,"_":_environ_sizes_get,"T":_getentropy,"F":invoke_di,"A":invoke_dii,"O":invoke_diii,"P":invoke_fiii,"r":invoke_i,"c":invoke_ii,"t":invoke_iid,"J":invoke_iidi,"d":invoke_iii,"z":invoke_iiid,"g":invoke_iiii,"K":invoke_iiiid,"m":invoke_iiiii,"W":invoke_iiiiid,"v":invoke_iiiiii,"w":invoke_iiiiiii,"M":invoke_iiiiiiii,"C":invoke_iiiiiiiiiiii,"Q":invoke_iiji,"S":invoke_jiiii,"j":invoke_v,"k":invoke_vi,"H":invoke_vid,"V":invoke_viddi,"e":invoke_vii,"N":invoke_viid,"D":invoke_viidi,"y":invoke_viidiii,"h":invoke_viii,"E":invoke_viiid,"U":invoke_viiidi,"l":invoke_viiii,"G":invoke_viiiii,"u":invoke_viiiiiii,"x":invoke_viiiiiiiiii,"B":invoke_viiiiiiiiiiiiiii,"R":invoke_viijii,"q":_llvm_eh_typeid_for,"Y":_strftime_l};createWasm();Module["_initGEOS"]=function(){return (Module["_initGEOS"]=Module["asm"]["da"]).apply(null,arguments)};Module["_finishGEOS"]=function(){return (Module["_finishGEOS"]=Module["asm"]["ea"]).apply(null,arguments)};Module["_GEOSFree"]=function(){return (Module["_GEOSFree"]=Module["asm"]["fa"]).apply(null,arguments)};Module["_GEOSGeomFromWKT"]=function(){return (Module["_GEOSGeomFromWKT"]=Module["asm"]["ga"]).apply(null,arguments)};Module["_GEOSGeomToWKT"]=function(){return (Module["_GEOSGeomToWKT"]=Module["asm"]["ha"]).apply(null,arguments)};Module["_GEOSGeomToWKB_buf"]=function(){return (Module["_GEOSGeomToWKB_buf"]=Module["asm"]["ia"]).apply(null,arguments)};Module["_GEOSGeomFromWKB_buf"]=function(){return (Module["_GEOSGeomFromWKB_buf"]=Module["asm"]["ja"]).apply(null,arguments)};Module["_GEOSBuffer"]=function(){return (Module["_GEOSBuffer"]=Module["asm"]["ka"]).apply(null,arguments)};Module["_GEOSGeom_destroy"]=function(){return (Module["_GEOSGeom_destroy"]=Module["asm"]["la"]).apply(null,arguments)};Module["_GEOSBufferParams_create"]=function(){return (Module["_GEOSBufferParams_create"]=Module["asm"]["ma"]).apply(null,arguments)};Module["_GEOSBufferParams_destroy"]=function(){return (Module["_GEOSBufferParams_destroy"]=Module["asm"]["na"]).apply(null,arguments)};Module["_GEOSBufferParams_setEndCapStyle"]=function(){return (Module["_GEOSBufferParams_setEndCapStyle"]=Module["asm"]["oa"]).apply(null,arguments)};Module["_GEOSBufferParams_setJoinStyle"]=function(){return (Module["_GEOSBufferParams_setJoinStyle"]=Module["asm"]["pa"]).apply(null,arguments)};Module["_GEOSBufferParams_setMitreLimit"]=function(){return (Module["_GEOSBufferParams_setMitreLimit"]=Module["asm"]["qa"]).apply(null,arguments)};Module["_GEOSBufferParams_setQuadrantSegments"]=function(){return (Module["_GEOSBufferParams_setQuadrantSegments"]=Module["asm"]["ra"]).apply(null,arguments)};Module["_GEOSBufferParams_setSingleSided"]=function(){return (Module["_GEOSBufferParams_setSingleSided"]=Module["asm"]["sa"]).apply(null,arguments)};Module["_GEOSBufferWithParams"]=function(){return (Module["_GEOSBufferWithParams"]=Module["asm"]["ta"]).apply(null,arguments)};Module["_malloc"]=function(){return (Module["_malloc"]=Module["asm"]["ua"]).apply(null,arguments)};var _setThrew=function(){return (_setThrew=Module["asm"]["va"]).apply(null,arguments)};var setTempRet0=function(){return (setTempRet0=Module["asm"]["wa"]).apply(null,arguments)};var stackSave=function(){return (stackSave=Module["asm"]["xa"]).apply(null,arguments)};var stackRestore=function(){return (stackRestore=Module["asm"]["ya"]).apply(null,arguments)};var stackAlloc=function(){return (stackAlloc=Module["asm"]["za"]).apply(null,arguments)};var ___cxa_increment_exception_refcount=function(){return (___cxa_increment_exception_refcount=Module["asm"]["Aa"]).apply(null,arguments)};var ___cxa_decrement_exception_refcount=function(){return (___cxa_decrement_exception_refcount=Module["asm"]["Ba"]).apply(null,arguments)};var ___cxa_can_catch=function(){return (___cxa_can_catch=Module["asm"]["Ca"]).apply(null,arguments)};var ___cxa_is_pointer_type=function(){return (___cxa_is_pointer_type=Module["asm"]["Da"]).apply(null,arguments)};var dynCall_jiiii=Module["dynCall_jiiii"]=function(){return (dynCall_jiiii=Module["dynCall_jiiii"]=Module["asm"]["Fa"]).apply(null,arguments)};var dynCall_viijii=Module["dynCall_viijii"]=function(){return (dynCall_viijii=Module["dynCall_viijii"]=Module["asm"]["Ga"]).apply(null,arguments)};var dynCall_iiji=Module["dynCall_iiji"]=function(){return (dynCall_iiji=Module["dynCall_iiji"]=Module["asm"]["Ha"]).apply(null,arguments)};function invoke_ii(index,a1){var sp=stackSave();try{return getWasmTableEntry(index)(a1)}catch(e){stackRestore(sp);if(e!==e+0)throw e;_setThrew(1,0);}}function invoke_v(index){var sp=stackSave();try{getWasmTableEntry(index)();}catch(e){stackRestore(sp);if(e!==e+0)throw e;_setThrew(1,0);}}function invoke_vii(index,a1,a2){var sp=stackSave();try{getWasmTableEntry(index)(a1,a2);}catch(e){stackRestore(sp);if(e!==e+0)throw e;_setThrew(1,0);}}function invoke_vi(index,a1){var sp=stackSave();try{getWasmTableEntry(index)(a1);}catch(e){stackRestore(sp);if(e!==e+0)throw e;_setThrew(1,0);}}function invoke_iii(index,a1,a2){var sp=stackSave();try{return getWasmTableEntry(index)(a1,a2)}catch(e){stackRestore(sp);if(e!==e+0)throw e;_setThrew(1,0);}}function invoke_viii(index,a1,a2,a3){var sp=stackSave();try{getWasmTableEntry(index)(a1,a2,a3);}catch(e){stackRestore(sp);if(e!==e+0)throw e;_setThrew(1,0);}}function invoke_iiii(index,a1,a2,a3){var sp=stackSave();try{return getWasmTableEntry(index)(a1,a2,a3)}catch(e){stackRestore(sp);if(e!==e+0)throw e;_setThrew(1,0);}}function invoke_iiiiii(index,a1,a2,a3,a4,a5){var sp=stackSave();try{return getWasmTableEntry(index)(a1,a2,a3,a4,a5)}catch(e){stackRestore(sp);if(e!==e+0)throw e;_setThrew(1,0);}}function invoke_iiiii(index,a1,a2,a3,a4){var sp=stackSave();try{return getWasmTableEntry(index)(a1,a2,a3,a4)}catch(e){stackRestore(sp);if(e!==e+0)throw e;_setThrew(1,0);}}function invoke_fiii(index,a1,a2,a3){var sp=stackSave();try{return getWasmTableEntry(index)(a1,a2,a3)}catch(e){stackRestore(sp);if(e!==e+0)throw e;_setThrew(1,0);}}function invoke_diii(index,a1,a2,a3){var sp=stackSave();try{return getWasmTableEntry(index)(a1,a2,a3)}catch(e){stackRestore(sp);if(e!==e+0)throw e;_setThrew(1,0);}}function invoke_viiii(index,a1,a2,a3,a4){var sp=stackSave();try{getWasmTableEntry(index)(a1,a2,a3,a4);}catch(e){stackRestore(sp);if(e!==e+0)throw e;_setThrew(1,0);}}function invoke_viid(index,a1,a2,a3){var sp=stackSave();try{getWasmTableEntry(index)(a1,a2,a3);}catch(e){stackRestore(sp);if(e!==e+0)throw e;_setThrew(1,0);}}function invoke_iiiiiiii(index,a1,a2,a3,a4,a5,a6,a7){var sp=stackSave();try{return getWasmTableEntry(index)(a1,a2,a3,a4,a5,a6,a7)}catch(e){stackRestore(sp);if(e!==e+0)throw e;_setThrew(1,0);}}function invoke_i(index){var sp=stackSave();try{return getWasmTableEntry(index)()}catch(e){stackRestore(sp);if(e!==e+0)throw e;_setThrew(1,0);}}function invoke_viiiiiii(index,a1,a2,a3,a4,a5,a6,a7){var sp=stackSave();try{getWasmTableEntry(index)(a1,a2,a3,a4,a5,a6,a7);}catch(e){stackRestore(sp);if(e!==e+0)throw e;_setThrew(1,0);}}function invoke_iiiiiii(index,a1,a2,a3,a4,a5,a6){var sp=stackSave();try{return getWasmTableEntry(index)(a1,a2,a3,a4,a5,a6)}catch(e){stackRestore(sp);if(e!==e+0)throw e;_setThrew(1,0);}}function invoke_iiiiiiiiiiii(index,a1,a2,a3,a4,a5,a6,a7,a8,a9,a10,a11){var sp=stackSave();try{return getWasmTableEntry(index)(a1,a2,a3,a4,a5,a6,a7,a8,a9,a10,a11)}catch(e){stackRestore(sp);if(e!==e+0)throw e;_setThrew(1,0);}}function invoke_viiiiiiiiii(index,a1,a2,a3,a4,a5,a6,a7,a8,a9,a10){var sp=stackSave();try{getWasmTableEntry(index)(a1,a2,a3,a4,a5,a6,a7,a8,a9,a10);}catch(e){stackRestore(sp);if(e!==e+0)throw e;_setThrew(1,0);}}function invoke_viiiiiiiiiiiiiii(index,a1,a2,a3,a4,a5,a6,a7,a8,a9,a10,a11,a12,a13,a14,a15){var sp=stackSave();try{getWasmTableEntry(index)(a1,a2,a3,a4,a5,a6,a7,a8,a9,a10,a11,a12,a13,a14,a15);}catch(e){stackRestore(sp);if(e!==e+0)throw e;_setThrew(1,0);}}function invoke_iiiiid(index,a1,a2,a3,a4,a5){var sp=stackSave();try{return getWasmTableEntry(index)(a1,a2,a3,a4,a5)}catch(e){stackRestore(sp);if(e!==e+0)throw e;_setThrew(1,0);}}function invoke_iid(index,a1,a2){var sp=stackSave();try{return getWasmTableEntry(index)(a1,a2)}catch(e){stackRestore(sp);if(e!==e+0)throw e;_setThrew(1,0);}}function invoke_vid(index,a1,a2){var sp=stackSave();try{getWasmTableEntry(index)(a1,a2);}catch(e){stackRestore(sp);if(e!==e+0)throw e;_setThrew(1,0);}}function invoke_viiiii(index,a1,a2,a3,a4,a5){var sp=stackSave();try{getWasmTableEntry(index)(a1,a2,a3,a4,a5);}catch(e){stackRestore(sp);if(e!==e+0)throw e;_setThrew(1,0);}}function invoke_viddi(index,a1,a2,a3,a4){var sp=stackSave();try{getWasmTableEntry(index)(a1,a2,a3,a4);}catch(e){stackRestore(sp);if(e!==e+0)throw e;_setThrew(1,0);}}function invoke_di(index,a1){var sp=stackSave();try{return getWasmTableEntry(index)(a1)}catch(e){stackRestore(sp);if(e!==e+0)throw e;_setThrew(1,0);}}function invoke_viiid(index,a1,a2,a3,a4){var sp=stackSave();try{getWasmTableEntry(index)(a1,a2,a3,a4);}catch(e){stackRestore(sp);if(e!==e+0)throw e;_setThrew(1,0);}}function invoke_dii(index,a1,a2){var sp=stackSave();try{return getWasmTableEntry(index)(a1,a2)}catch(e){stackRestore(sp);if(e!==e+0)throw e;_setThrew(1,0);}}function invoke_iiid(index,a1,a2,a3){var sp=stackSave();try{return getWasmTableEntry(index)(a1,a2,a3)}catch(e){stackRestore(sp);if(e!==e+0)throw e;_setThrew(1,0);}}function invoke_iiiid(index,a1,a2,a3,a4){var sp=stackSave();try{return getWasmTableEntry(index)(a1,a2,a3,a4)}catch(e){stackRestore(sp);if(e!==e+0)throw e;_setThrew(1,0);}}function invoke_viidiii(index,a1,a2,a3,a4,a5,a6){var sp=stackSave();try{getWasmTableEntry(index)(a1,a2,a3,a4,a5,a6);}catch(e){stackRestore(sp);if(e!==e+0)throw e;_setThrew(1,0);}}function invoke_viidi(index,a1,a2,a3,a4){var sp=stackSave();try{getWasmTableEntry(index)(a1,a2,a3,a4);}catch(e){stackRestore(sp);if(e!==e+0)throw e;_setThrew(1,0);}}function invoke_viiidi(index,a1,a2,a3,a4,a5){var sp=stackSave();try{getWasmTableEntry(index)(a1,a2,a3,a4,a5);}catch(e){stackRestore(sp);if(e!==e+0)throw e;_setThrew(1,0);}}function invoke_iidi(index,a1,a2,a3){var sp=stackSave();try{return getWasmTableEntry(index)(a1,a2,a3)}catch(e){stackRestore(sp);if(e!==e+0)throw e;_setThrew(1,0);}}function invoke_jiiii(index,a1,a2,a3,a4){var sp=stackSave();try{return dynCall_jiiii(index,a1,a2,a3,a4)}catch(e){stackRestore(sp);if(e!==e+0)throw e;_setThrew(1,0);}}function invoke_viijii(index,a1,a2,a3,a4,a5,a6){var sp=stackSave();try{dynCall_viijii(index,a1,a2,a3,a4,a5,a6);}catch(e){stackRestore(sp);if(e!==e+0)throw e;_setThrew(1,0);}}function invoke_iiji(index,a1,a2,a3,a4){var sp=stackSave();try{return dynCall_iiji(index,a1,a2,a3,a4)}catch(e){stackRestore(sp);if(e!==e+0)throw e;_setThrew(1,0);}}Module["addRunDependency"]=addRunDependency;Module["removeRunDependency"]=removeRunDependency;Module["FS_createPath"]=FS.createPath;Module["FS_createDataFile"]=FS.createDataFile;Module["FS_createLazyFile"]=FS.createLazyFile;Module["FS_createDevice"]=FS.createDevice;Module["FS_unlink"]=FS.unlink;Module["ccall"]=ccall;Module["cwrap"]=cwrap;Module["setValue"]=setValue;Module["getValue"]=getValue;Module["UTF8ToString"]=UTF8ToString;Module["stringToUTF8"]=stringToUTF8;Module["FS_createPreloadedFile"]=FS.createPreloadedFile;var calledRun;dependenciesFulfilled=function runCaller(){if(!calledRun)run();if(!calledRun)dependenciesFulfilled=runCaller;};function run(){if(runDependencies>0){return}preRun();if(runDependencies>0){return}function doRun(){if(calledRun)return;calledRun=true;Module["calledRun"]=true;if(ABORT)return;initRuntime();readyPromiseResolve(Module);if(Module["onRuntimeInitialized"])Module["onRuntimeInitialized"]();postRun();}if(Module["setStatus"]){Module["setStatus"]("Running...");setTimeout(function(){setTimeout(function(){Module["setStatus"]("");},1);doRun();},1);}else {doRun();}}if(Module["preInit"]){if(typeof Module["preInit"]=="function")Module["preInit"]=[Module["preInit"]];while(Module["preInit"].length>0){Module["preInit"].pop()();}}run();


  return moduleArg.ready
}

);
})();

let geosJsPromise;

function initGeosJs(
  config = {},
) {
  if (geosJsPromise) return geosJsPromise;
  geosJsPromise = new Promise((resolve, reject) => {
    const Module = GEOSFunctions.Module;

    Module.print = function p(text) {
      console.debug(`geos stdout: ${text}`);
    };

    Module.printErr = function p(text) {
      console.error(`geos stderr: ${text}`);
    };

    Module.onRuntimeInitialized = function onRuntimeInitialized() {
      try {
        initCFunctions();        
      } catch (error) {
        console.log('error initializing geos.js', error);
      }
    };

    Module.destroy = function destroy() {
      /* Clean up the global context */
      GEOSFunctions.finishGEOS();
    };

    
    Module.locateFile = config.locateFile;
    
    CModule(GEOSFunctions.Module).then((res) => {            
      resolve(allJsFunctions);
    });
  });
  return geosJsPromise;
}

var _polyfillNode_module = /*#__PURE__*/Object.freeze({
  __proto__: null
});

export { initGeosJs as default };
