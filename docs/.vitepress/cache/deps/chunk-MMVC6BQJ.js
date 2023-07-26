import {
  coordEach
} from "./chunk-VQFI4SDW.js";

// node_modules/@turf/bbox/dist/es/index.js
function bbox(geojson) {
  var result = [Infinity, Infinity, -Infinity, -Infinity];
  coordEach(geojson, function(coord) {
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
var es_default = bbox;

export {
  es_default
};
//# sourceMappingURL=chunk-MMVC6BQJ.js.map
