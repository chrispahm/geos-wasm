// node_modules/@turf/helpers/dist/es/index.js
var earthRadius = 63710088e-1;
var factors = {
  centimeters: earthRadius * 100,
  centimetres: earthRadius * 100,
  degrees: earthRadius / 111325,
  feet: earthRadius * 3.28084,
  inches: earthRadius * 39.37,
  kilometers: earthRadius / 1e3,
  kilometres: earthRadius / 1e3,
  meters: earthRadius,
  metres: earthRadius,
  miles: earthRadius / 1609.344,
  millimeters: earthRadius * 1e3,
  millimetres: earthRadius * 1e3,
  nauticalmiles: earthRadius / 1852,
  radians: 1,
  yards: earthRadius * 1.0936
};
var unitsFactors = {
  centimeters: 100,
  centimetres: 100,
  degrees: 1 / 111325,
  feet: 3.28084,
  inches: 39.37,
  kilometers: 1 / 1e3,
  kilometres: 1 / 1e3,
  meters: 1,
  metres: 1,
  miles: 1 / 1609.344,
  millimeters: 1e3,
  millimetres: 1e3,
  nauticalmiles: 1 / 1852,
  radians: 1 / earthRadius,
  yards: 1.0936133
};
var areaFactors = {
  acres: 247105e-9,
  centimeters: 1e4,
  centimetres: 1e4,
  feet: 10.763910417,
  hectares: 1e-4,
  inches: 1550.003100006,
  kilometers: 1e-6,
  kilometres: 1e-6,
  meters: 1,
  metres: 1,
  miles: 386e-9,
  millimeters: 1e6,
  millimetres: 1e6,
  yards: 1.195990046
};
function feature(geom, properties, options) {
  if (options === void 0) {
    options = {};
  }
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
function geometry(type, coordinates, _options) {
  if (_options === void 0) {
    _options = {};
  }
  switch (type) {
    case "Point":
      return point(coordinates).geometry;
    case "LineString":
      return lineString(coordinates).geometry;
    case "Polygon":
      return polygon(coordinates).geometry;
    case "MultiPoint":
      return multiPoint(coordinates).geometry;
    case "MultiLineString":
      return multiLineString(coordinates).geometry;
    case "MultiPolygon":
      return multiPolygon(coordinates).geometry;
    default:
      throw new Error(type + " is invalid");
  }
}
function point(coordinates, properties, options) {
  if (options === void 0) {
    options = {};
  }
  if (!coordinates) {
    throw new Error("coordinates is required");
  }
  if (!Array.isArray(coordinates)) {
    throw new Error("coordinates must be an Array");
  }
  if (coordinates.length < 2) {
    throw new Error("coordinates must be at least 2 numbers long");
  }
  if (!isNumber(coordinates[0]) || !isNumber(coordinates[1])) {
    throw new Error("coordinates must contain numbers");
  }
  var geom = {
    type: "Point",
    coordinates
  };
  return feature(geom, properties, options);
}
function points(coordinates, properties, options) {
  if (options === void 0) {
    options = {};
  }
  return featureCollection(coordinates.map(function(coords) {
    return point(coords, properties);
  }), options);
}
function polygon(coordinates, properties, options) {
  if (options === void 0) {
    options = {};
  }
  for (var _i = 0, coordinates_1 = coordinates; _i < coordinates_1.length; _i++) {
    var ring = coordinates_1[_i];
    if (ring.length < 4) {
      throw new Error("Each LinearRing of a Polygon must have 4 or more Positions.");
    }
    for (var j = 0; j < ring[ring.length - 1].length; j++) {
      if (ring[ring.length - 1][j] !== ring[0][j]) {
        throw new Error("First and last Position are not equivalent.");
      }
    }
  }
  var geom = {
    type: "Polygon",
    coordinates
  };
  return feature(geom, properties, options);
}
function polygons(coordinates, properties, options) {
  if (options === void 0) {
    options = {};
  }
  return featureCollection(coordinates.map(function(coords) {
    return polygon(coords, properties);
  }), options);
}
function lineString(coordinates, properties, options) {
  if (options === void 0) {
    options = {};
  }
  if (coordinates.length < 2) {
    throw new Error("coordinates must be an array of two or more positions");
  }
  var geom = {
    type: "LineString",
    coordinates
  };
  return feature(geom, properties, options);
}
function lineStrings(coordinates, properties, options) {
  if (options === void 0) {
    options = {};
  }
  return featureCollection(coordinates.map(function(coords) {
    return lineString(coords, properties);
  }), options);
}
function featureCollection(features, options) {
  if (options === void 0) {
    options = {};
  }
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
function multiLineString(coordinates, properties, options) {
  if (options === void 0) {
    options = {};
  }
  var geom = {
    type: "MultiLineString",
    coordinates
  };
  return feature(geom, properties, options);
}
function multiPoint(coordinates, properties, options) {
  if (options === void 0) {
    options = {};
  }
  var geom = {
    type: "MultiPoint",
    coordinates
  };
  return feature(geom, properties, options);
}
function multiPolygon(coordinates, properties, options) {
  if (options === void 0) {
    options = {};
  }
  var geom = {
    type: "MultiPolygon",
    coordinates
  };
  return feature(geom, properties, options);
}
function geometryCollection(geometries, properties, options) {
  if (options === void 0) {
    options = {};
  }
  var geom = {
    type: "GeometryCollection",
    geometries
  };
  return feature(geom, properties, options);
}
function round(num, precision) {
  if (precision === void 0) {
    precision = 0;
  }
  if (precision && !(precision >= 0)) {
    throw new Error("precision must be a positive number");
  }
  var multiplier = Math.pow(10, precision || 0);
  return Math.round(num * multiplier) / multiplier;
}
function radiansToLength(radians, units) {
  if (units === void 0) {
    units = "kilometers";
  }
  var factor = factors[units];
  if (!factor) {
    throw new Error(units + " units is invalid");
  }
  return radians * factor;
}
function lengthToRadians(distance, units) {
  if (units === void 0) {
    units = "kilometers";
  }
  var factor = factors[units];
  if (!factor) {
    throw new Error(units + " units is invalid");
  }
  return distance / factor;
}
function lengthToDegrees(distance, units) {
  return radiansToDegrees(lengthToRadians(distance, units));
}
function bearingToAzimuth(bearing) {
  var angle = bearing % 360;
  if (angle < 0) {
    angle += 360;
  }
  return angle;
}
function radiansToDegrees(radians) {
  var degrees = radians % (2 * Math.PI);
  return degrees * 180 / Math.PI;
}
function degreesToRadians(degrees) {
  var radians = degrees % 360;
  return radians * Math.PI / 180;
}
function convertLength(length, originalUnit, finalUnit) {
  if (originalUnit === void 0) {
    originalUnit = "kilometers";
  }
  if (finalUnit === void 0) {
    finalUnit = "kilometers";
  }
  if (!(length >= 0)) {
    throw new Error("length must be a positive number");
  }
  return radiansToLength(lengthToRadians(length, originalUnit), finalUnit);
}
function convertArea(area, originalUnit, finalUnit) {
  if (originalUnit === void 0) {
    originalUnit = "meters";
  }
  if (finalUnit === void 0) {
    finalUnit = "kilometers";
  }
  if (!(area >= 0)) {
    throw new Error("area must be a positive number");
  }
  var startFactor = areaFactors[originalUnit];
  if (!startFactor) {
    throw new Error("invalid original units");
  }
  var finalFactor = areaFactors[finalUnit];
  if (!finalFactor) {
    throw new Error("invalid final units");
  }
  return area / startFactor * finalFactor;
}
function isNumber(num) {
  return !isNaN(num) && num !== null && !Array.isArray(num);
}
function isObject(input) {
  return !!input && input.constructor === Object;
}
function validateBBox(bbox) {
  if (!bbox) {
    throw new Error("bbox is required");
  }
  if (!Array.isArray(bbox)) {
    throw new Error("bbox must be an Array");
  }
  if (bbox.length !== 4 && bbox.length !== 6) {
    throw new Error("bbox must be an Array of 4 or 6 numbers");
  }
  bbox.forEach(function(num) {
    if (!isNumber(num)) {
      throw new Error("bbox must only contain numbers");
    }
  });
}
function validateId(id) {
  if (!id) {
    throw new Error("id is required");
  }
  if (["string", "number"].indexOf(typeof id) === -1) {
    throw new Error("id must be a number or a string");
  }
}

export {
  earthRadius,
  factors,
  unitsFactors,
  areaFactors,
  feature,
  geometry,
  point,
  points,
  polygon,
  polygons,
  lineString,
  lineStrings,
  featureCollection,
  multiLineString,
  multiPoint,
  multiPolygon,
  geometryCollection,
  round,
  radiansToLength,
  lengthToRadians,
  lengthToDegrees,
  bearingToAzimuth,
  radiansToDegrees,
  degreesToRadians,
  convertLength,
  convertArea,
  isNumber,
  isObject,
  validateBBox,
  validateId
};
//# sourceMappingURL=chunk-HE4C34TC.js.map
