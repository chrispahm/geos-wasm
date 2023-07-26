import {
  feature,
  isObject,
  lineString,
  point
} from "./chunk-HE4C34TC.js";

// node_modules/@turf/meta/dist/es/index.js
function coordEach(geojson, callback, excludeWrapCoord) {
  if (geojson === null)
    return;
  var j, k, l, geometry, stopG, coords, geometryMaybeCollection, wrapShrink = 0, coordIndex = 0, isGeometryCollection, type = geojson.type, isFeatureCollection = type === "FeatureCollection", isFeature = type === "Feature", stop = isFeatureCollection ? geojson.features.length : 1;
  for (var featureIndex = 0; featureIndex < stop; featureIndex++) {
    geometryMaybeCollection = isFeatureCollection ? geojson.features[featureIndex].geometry : isFeature ? geojson.geometry : geojson;
    isGeometryCollection = geometryMaybeCollection ? geometryMaybeCollection.type === "GeometryCollection" : false;
    stopG = isGeometryCollection ? geometryMaybeCollection.geometries.length : 1;
    for (var geomIndex = 0; geomIndex < stopG; geomIndex++) {
      var multiFeatureIndex = 0;
      var geometryIndex = 0;
      geometry = isGeometryCollection ? geometryMaybeCollection.geometries[geomIndex] : geometryMaybeCollection;
      if (geometry === null)
        continue;
      coords = geometry.coordinates;
      var geomType = geometry.type;
      wrapShrink = excludeWrapCoord && (geomType === "Polygon" || geomType === "MultiPolygon") ? 1 : 0;
      switch (geomType) {
        case null:
          break;
        case "Point":
          if (callback(
            coords,
            coordIndex,
            featureIndex,
            multiFeatureIndex,
            geometryIndex
          ) === false)
            return false;
          coordIndex++;
          multiFeatureIndex++;
          break;
        case "LineString":
        case "MultiPoint":
          for (j = 0; j < coords.length; j++) {
            if (callback(
              coords[j],
              coordIndex,
              featureIndex,
              multiFeatureIndex,
              geometryIndex
            ) === false)
              return false;
            coordIndex++;
            if (geomType === "MultiPoint")
              multiFeatureIndex++;
          }
          if (geomType === "LineString")
            multiFeatureIndex++;
          break;
        case "Polygon":
        case "MultiLineString":
          for (j = 0; j < coords.length; j++) {
            for (k = 0; k < coords[j].length - wrapShrink; k++) {
              if (callback(
                coords[j][k],
                coordIndex,
                featureIndex,
                multiFeatureIndex,
                geometryIndex
              ) === false)
                return false;
              coordIndex++;
            }
            if (geomType === "MultiLineString")
              multiFeatureIndex++;
            if (geomType === "Polygon")
              geometryIndex++;
          }
          if (geomType === "Polygon")
            multiFeatureIndex++;
          break;
        case "MultiPolygon":
          for (j = 0; j < coords.length; j++) {
            geometryIndex = 0;
            for (k = 0; k < coords[j].length; k++) {
              for (l = 0; l < coords[j][k].length - wrapShrink; l++) {
                if (callback(
                  coords[j][k][l],
                  coordIndex,
                  featureIndex,
                  multiFeatureIndex,
                  geometryIndex
                ) === false)
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
            if (coordEach(geometry.geometries[j], callback, excludeWrapCoord) === false)
              return false;
          break;
        default:
          throw new Error("Unknown Geometry Type");
      }
    }
  }
}
function coordReduce(geojson, callback, initialValue, excludeWrapCoord) {
  var previousValue = initialValue;
  coordEach(
    geojson,
    function(currentCoord, coordIndex, featureIndex, multiFeatureIndex, geometryIndex) {
      if (coordIndex === 0 && initialValue === void 0)
        previousValue = currentCoord;
      else
        previousValue = callback(
          previousValue,
          currentCoord,
          coordIndex,
          featureIndex,
          multiFeatureIndex,
          geometryIndex
        );
    },
    excludeWrapCoord
  );
  return previousValue;
}
function propEach(geojson, callback) {
  var i;
  switch (geojson.type) {
    case "FeatureCollection":
      for (i = 0; i < geojson.features.length; i++) {
        if (callback(geojson.features[i].properties, i) === false)
          break;
      }
      break;
    case "Feature":
      callback(geojson.properties, 0);
      break;
  }
}
function propReduce(geojson, callback, initialValue) {
  var previousValue = initialValue;
  propEach(geojson, function(currentProperties, featureIndex) {
    if (featureIndex === 0 && initialValue === void 0)
      previousValue = currentProperties;
    else
      previousValue = callback(previousValue, currentProperties, featureIndex);
  });
  return previousValue;
}
function featureEach(geojson, callback) {
  if (geojson.type === "Feature") {
    callback(geojson, 0);
  } else if (geojson.type === "FeatureCollection") {
    for (var i = 0; i < geojson.features.length; i++) {
      if (callback(geojson.features[i], i) === false)
        break;
    }
  }
}
function featureReduce(geojson, callback, initialValue) {
  var previousValue = initialValue;
  featureEach(geojson, function(currentFeature, featureIndex) {
    if (featureIndex === 0 && initialValue === void 0)
      previousValue = currentFeature;
    else
      previousValue = callback(previousValue, currentFeature, featureIndex);
  });
  return previousValue;
}
function coordAll(geojson) {
  var coords = [];
  coordEach(geojson, function(coord) {
    coords.push(coord);
  });
  return coords;
}
function geomEach(geojson, callback) {
  var i, j, g, geometry, stopG, geometryMaybeCollection, isGeometryCollection, featureProperties, featureBBox, featureId, featureIndex = 0, isFeatureCollection = geojson.type === "FeatureCollection", isFeature = geojson.type === "Feature", stop = isFeatureCollection ? geojson.features.length : 1;
  for (i = 0; i < stop; i++) {
    geometryMaybeCollection = isFeatureCollection ? geojson.features[i].geometry : isFeature ? geojson.geometry : geojson;
    featureProperties = isFeatureCollection ? geojson.features[i].properties : isFeature ? geojson.properties : {};
    featureBBox = isFeatureCollection ? geojson.features[i].bbox : isFeature ? geojson.bbox : void 0;
    featureId = isFeatureCollection ? geojson.features[i].id : isFeature ? geojson.id : void 0;
    isGeometryCollection = geometryMaybeCollection ? geometryMaybeCollection.type === "GeometryCollection" : false;
    stopG = isGeometryCollection ? geometryMaybeCollection.geometries.length : 1;
    for (g = 0; g < stopG; g++) {
      geometry = isGeometryCollection ? geometryMaybeCollection.geometries[g] : geometryMaybeCollection;
      if (geometry === null) {
        if (callback(
          null,
          featureIndex,
          featureProperties,
          featureBBox,
          featureId
        ) === false)
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
          if (callback(
            geometry,
            featureIndex,
            featureProperties,
            featureBBox,
            featureId
          ) === false)
            return false;
          break;
        }
        case "GeometryCollection": {
          for (j = 0; j < geometry.geometries.length; j++) {
            if (callback(
              geometry.geometries[j],
              featureIndex,
              featureProperties,
              featureBBox,
              featureId
            ) === false)
              return false;
          }
          break;
        }
        default:
          throw new Error("Unknown Geometry Type");
      }
    }
    featureIndex++;
  }
}
function geomReduce(geojson, callback, initialValue) {
  var previousValue = initialValue;
  geomEach(
    geojson,
    function(currentGeometry, featureIndex, featureProperties, featureBBox, featureId) {
      if (featureIndex === 0 && initialValue === void 0)
        previousValue = currentGeometry;
      else
        previousValue = callback(
          previousValue,
          currentGeometry,
          featureIndex,
          featureProperties,
          featureBBox,
          featureId
        );
    }
  );
  return previousValue;
}
function flattenEach(geojson, callback) {
  geomEach(geojson, function(geometry, featureIndex, properties, bbox, id) {
    var type = geometry === null ? null : geometry.type;
    switch (type) {
      case null:
      case "Point":
      case "LineString":
      case "Polygon":
        if (callback(
          feature(geometry, properties, { bbox, id }),
          featureIndex,
          0
        ) === false)
          return false;
        return;
    }
    var geomType;
    switch (type) {
      case "MultiPoint":
        geomType = "Point";
        break;
      case "MultiLineString":
        geomType = "LineString";
        break;
      case "MultiPolygon":
        geomType = "Polygon";
        break;
    }
    for (var multiFeatureIndex = 0; multiFeatureIndex < geometry.coordinates.length; multiFeatureIndex++) {
      var coordinate = geometry.coordinates[multiFeatureIndex];
      var geom = {
        type: geomType,
        coordinates: coordinate
      };
      if (callback(feature(geom, properties), featureIndex, multiFeatureIndex) === false)
        return false;
    }
  });
}
function flattenReduce(geojson, callback, initialValue) {
  var previousValue = initialValue;
  flattenEach(
    geojson,
    function(currentFeature, featureIndex, multiFeatureIndex) {
      if (featureIndex === 0 && multiFeatureIndex === 0 && initialValue === void 0)
        previousValue = currentFeature;
      else
        previousValue = callback(
          previousValue,
          currentFeature,
          featureIndex,
          multiFeatureIndex
        );
    }
  );
  return previousValue;
}
function segmentEach(geojson, callback) {
  flattenEach(geojson, function(feature2, featureIndex, multiFeatureIndex) {
    var segmentIndex = 0;
    if (!feature2.geometry)
      return;
    var type = feature2.geometry.type;
    if (type === "Point" || type === "MultiPoint")
      return;
    var previousCoords;
    var previousFeatureIndex = 0;
    var previousMultiIndex = 0;
    var prevGeomIndex = 0;
    if (coordEach(
      feature2,
      function(currentCoord, coordIndex, featureIndexCoord, multiPartIndexCoord, geometryIndex) {
        if (previousCoords === void 0 || featureIndex > previousFeatureIndex || multiPartIndexCoord > previousMultiIndex || geometryIndex > prevGeomIndex) {
          previousCoords = currentCoord;
          previousFeatureIndex = featureIndex;
          previousMultiIndex = multiPartIndexCoord;
          prevGeomIndex = geometryIndex;
          segmentIndex = 0;
          return;
        }
        var currentSegment = lineString(
          [previousCoords, currentCoord],
          feature2.properties
        );
        if (callback(
          currentSegment,
          featureIndex,
          multiFeatureIndex,
          geometryIndex,
          segmentIndex
        ) === false)
          return false;
        segmentIndex++;
        previousCoords = currentCoord;
      }
    ) === false)
      return false;
  });
}
function segmentReduce(geojson, callback, initialValue) {
  var previousValue = initialValue;
  var started = false;
  segmentEach(
    geojson,
    function(currentSegment, featureIndex, multiFeatureIndex, geometryIndex, segmentIndex) {
      if (started === false && initialValue === void 0)
        previousValue = currentSegment;
      else
        previousValue = callback(
          previousValue,
          currentSegment,
          featureIndex,
          multiFeatureIndex,
          geometryIndex,
          segmentIndex
        );
      started = true;
    }
  );
  return previousValue;
}
function lineEach(geojson, callback) {
  if (!geojson)
    throw new Error("geojson is required");
  flattenEach(geojson, function(feature2, featureIndex, multiFeatureIndex) {
    if (feature2.geometry === null)
      return;
    var type = feature2.geometry.type;
    var coords = feature2.geometry.coordinates;
    switch (type) {
      case "LineString":
        if (callback(feature2, featureIndex, multiFeatureIndex, 0, 0) === false)
          return false;
        break;
      case "Polygon":
        for (var geometryIndex = 0; geometryIndex < coords.length; geometryIndex++) {
          if (callback(
            lineString(coords[geometryIndex], feature2.properties),
            featureIndex,
            multiFeatureIndex,
            geometryIndex
          ) === false)
            return false;
        }
        break;
    }
  });
}
function lineReduce(geojson, callback, initialValue) {
  var previousValue = initialValue;
  lineEach(
    geojson,
    function(currentLine, featureIndex, multiFeatureIndex, geometryIndex) {
      if (featureIndex === 0 && initialValue === void 0)
        previousValue = currentLine;
      else
        previousValue = callback(
          previousValue,
          currentLine,
          featureIndex,
          multiFeatureIndex,
          geometryIndex
        );
    }
  );
  return previousValue;
}
function findSegment(geojson, options) {
  options = options || {};
  if (!isObject(options))
    throw new Error("options is invalid");
  var featureIndex = options.featureIndex || 0;
  var multiFeatureIndex = options.multiFeatureIndex || 0;
  var geometryIndex = options.geometryIndex || 0;
  var segmentIndex = options.segmentIndex || 0;
  var properties = options.properties;
  var geometry;
  switch (geojson.type) {
    case "FeatureCollection":
      if (featureIndex < 0)
        featureIndex = geojson.features.length + featureIndex;
      properties = properties || geojson.features[featureIndex].properties;
      geometry = geojson.features[featureIndex].geometry;
      break;
    case "Feature":
      properties = properties || geojson.properties;
      geometry = geojson.geometry;
      break;
    case "Point":
    case "MultiPoint":
      return null;
    case "LineString":
    case "Polygon":
    case "MultiLineString":
    case "MultiPolygon":
      geometry = geojson;
      break;
    default:
      throw new Error("geojson is invalid");
  }
  if (geometry === null)
    return null;
  var coords = geometry.coordinates;
  switch (geometry.type) {
    case "Point":
    case "MultiPoint":
      return null;
    case "LineString":
      if (segmentIndex < 0)
        segmentIndex = coords.length + segmentIndex - 1;
      return lineString(
        [coords[segmentIndex], coords[segmentIndex + 1]],
        properties,
        options
      );
    case "Polygon":
      if (geometryIndex < 0)
        geometryIndex = coords.length + geometryIndex;
      if (segmentIndex < 0)
        segmentIndex = coords[geometryIndex].length + segmentIndex - 1;
      return lineString(
        [
          coords[geometryIndex][segmentIndex],
          coords[geometryIndex][segmentIndex + 1]
        ],
        properties,
        options
      );
    case "MultiLineString":
      if (multiFeatureIndex < 0)
        multiFeatureIndex = coords.length + multiFeatureIndex;
      if (segmentIndex < 0)
        segmentIndex = coords[multiFeatureIndex].length + segmentIndex - 1;
      return lineString(
        [
          coords[multiFeatureIndex][segmentIndex],
          coords[multiFeatureIndex][segmentIndex + 1]
        ],
        properties,
        options
      );
    case "MultiPolygon":
      if (multiFeatureIndex < 0)
        multiFeatureIndex = coords.length + multiFeatureIndex;
      if (geometryIndex < 0)
        geometryIndex = coords[multiFeatureIndex].length + geometryIndex;
      if (segmentIndex < 0)
        segmentIndex = coords[multiFeatureIndex][geometryIndex].length - segmentIndex - 1;
      return lineString(
        [
          coords[multiFeatureIndex][geometryIndex][segmentIndex],
          coords[multiFeatureIndex][geometryIndex][segmentIndex + 1]
        ],
        properties,
        options
      );
  }
  throw new Error("geojson is invalid");
}
function findPoint(geojson, options) {
  options = options || {};
  if (!isObject(options))
    throw new Error("options is invalid");
  var featureIndex = options.featureIndex || 0;
  var multiFeatureIndex = options.multiFeatureIndex || 0;
  var geometryIndex = options.geometryIndex || 0;
  var coordIndex = options.coordIndex || 0;
  var properties = options.properties;
  var geometry;
  switch (geojson.type) {
    case "FeatureCollection":
      if (featureIndex < 0)
        featureIndex = geojson.features.length + featureIndex;
      properties = properties || geojson.features[featureIndex].properties;
      geometry = geojson.features[featureIndex].geometry;
      break;
    case "Feature":
      properties = properties || geojson.properties;
      geometry = geojson.geometry;
      break;
    case "Point":
    case "MultiPoint":
      return null;
    case "LineString":
    case "Polygon":
    case "MultiLineString":
    case "MultiPolygon":
      geometry = geojson;
      break;
    default:
      throw new Error("geojson is invalid");
  }
  if (geometry === null)
    return null;
  var coords = geometry.coordinates;
  switch (geometry.type) {
    case "Point":
      return point(coords, properties, options);
    case "MultiPoint":
      if (multiFeatureIndex < 0)
        multiFeatureIndex = coords.length + multiFeatureIndex;
      return point(coords[multiFeatureIndex], properties, options);
    case "LineString":
      if (coordIndex < 0)
        coordIndex = coords.length + coordIndex;
      return point(coords[coordIndex], properties, options);
    case "Polygon":
      if (geometryIndex < 0)
        geometryIndex = coords.length + geometryIndex;
      if (coordIndex < 0)
        coordIndex = coords[geometryIndex].length + coordIndex;
      return point(coords[geometryIndex][coordIndex], properties, options);
    case "MultiLineString":
      if (multiFeatureIndex < 0)
        multiFeatureIndex = coords.length + multiFeatureIndex;
      if (coordIndex < 0)
        coordIndex = coords[multiFeatureIndex].length + coordIndex;
      return point(coords[multiFeatureIndex][coordIndex], properties, options);
    case "MultiPolygon":
      if (multiFeatureIndex < 0)
        multiFeatureIndex = coords.length + multiFeatureIndex;
      if (geometryIndex < 0)
        geometryIndex = coords[multiFeatureIndex].length + geometryIndex;
      if (coordIndex < 0)
        coordIndex = coords[multiFeatureIndex][geometryIndex].length - coordIndex;
      return point(
        coords[multiFeatureIndex][geometryIndex][coordIndex],
        properties,
        options
      );
  }
  throw new Error("geojson is invalid");
}

export {
  coordEach,
  coordReduce,
  propEach,
  propReduce,
  featureEach,
  featureReduce,
  coordAll,
  geomEach,
  geomReduce,
  flattenEach,
  flattenReduce,
  segmentEach,
  segmentReduce,
  lineEach,
  lineReduce,
  findSegment,
  findPoint
};
//# sourceMappingURL=chunk-VQFI4SDW.js.map
