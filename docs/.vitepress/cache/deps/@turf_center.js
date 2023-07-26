import {
  es_default
} from "./chunk-MMVC6BQJ.js";
import "./chunk-VQFI4SDW.js";
import {
  point
} from "./chunk-HE4C34TC.js";
import "./chunk-76J2PTFD.js";

// node_modules/@turf/center/dist/es/index.js
function center(geojson, options) {
  if (options === void 0) {
    options = {};
  }
  var ext = es_default(geojson);
  var x = (ext[0] + ext[2]) / 2;
  var y = (ext[1] + ext[3]) / 2;
  return point([x, y], options.properties, options);
}
var es_default2 = center;
export {
  es_default2 as default
};
//# sourceMappingURL=@turf_center.js.map
