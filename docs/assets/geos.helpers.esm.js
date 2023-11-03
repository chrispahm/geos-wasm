function e(o,t){if(!o)throw new Error("No GeoJSON object provided");if(!t)throw new Error("No GEOS module object provided");function r(e){if(!e||0===e.length)return null;const o=e.length,r=new Float64Array(e.flat()),n=t.Module._malloc(2*o*8);t.Module.HEAPF64.set(r,n/8);const l=t.GEOSCoordSeq_copyFromBuffer(n,o,!1,!1);return t.Module._free(n),l}switch(o.type){case"Feature":return e(o.geometry,t);case"FeatureCollection":if(0===o.features.length)return t.GEOSGeom_createEmptyCollection(7);{const r=[];o.features.forEach((o=>{r.push(e(o.geometry,t))}));const n=t.Module._malloc(4*r.length),l=new Uint32Array(r);t.Module.HEAPU32.set(l,n/4);const c=t.GEOSGeom_createCollection(7,n,r.length);return t.Module._free(n),c}case"GeometryCollection":if(0===o.geometries.length)return t.GEOSGeom_createEmptyCollection(7);{const r=[];o.geometries.forEach((o=>{r.push(e(o,t))}));const n=t.Module._malloc(4*r.length),l=new Uint32Array(r);t.Module.HEAPU32.set(l,n/4);const c=t.GEOSGeom_createCollection(7,n,r.length);return t.Module._free(n),c}case"Point":return 0===o.coordinates.length?t.GEOSGeom_createEmptyPoint():t.GEOSGeom_createPointFromXY(o.coordinates[0],o.coordinates[1]);case"LineString":if(0===o.coordinates.length)return t.GEOSGeom_createEmptyLineString();{const e=r(o.coordinates);return t.GEOSGeom_createLineString(e)}case"Polygon":if(0===o.coordinates.length)return t.GEOSGeom_createEmptyPolygon();{const e=r(o.coordinates[0]),n=t.GEOSGeom_createLinearRing(e),l=[];if(o.coordinates.length>1)for(let e=1;e<o.coordinates.length;e++){const n=r(o.coordinates[e]);l.push(t.GEOSGeom_createLinearRing(n))}let c=null;if(l.length>0){const e=new Uint32Array(l);c=t.Module._malloc(4*l.length),t.Module.HEAPU32.set(e,c/4)}const i=t.GEOSGeom_createPolygon(n,c,l.length);return l.length>0&&t.Module._free(c),i}case"MultiPoint":if(0===o.coordinates.length)return t.GEOSGeom_createEmptyCollection(4);{const e=[];for(let r=0;r<o.coordinates.length;r++)e.push(t.GEOSGeom_createPointFromXY(o.coordinates[r][0],o.coordinates[r][1]));const r=t.Module._malloc(4*e.length),n=new Uint32Array(e);t.Module.HEAPU32.set(n,r/4);const l=t.GEOSGeom_createCollection(4,r,e.length);return t.Module._free(r),l}case"MultiLineString":if(0===o.coordinates.length)return t.GEOSGeom_createEmptyCollection(5);{const e=[];for(let n=0;n<o.coordinates.length;n++){const l=r(o.coordinates[n]);e.push(t.GEOSGeom_createLineString(l))}const n=t.Module._malloc(4*e.length),l=new Uint32Array(e);t.Module.HEAPU32.set(l,n/4);const c=t.GEOSGeom_createCollection(5,n,e.length);return t.Module._free(n),c}case"MultiPolygon":if(0===o.coordinates.length)return t.GEOSGeom_createEmptyCollection(6);{const e=[];for(let n=0;n<o.coordinates.length;n++){const l=r(o.coordinates[n][0]),c=t.GEOSGeom_createLinearRing(l),i=[];if(o.coordinates[n].length>1)for(let e=1;e<o.coordinates[n].length;e++){const l=r(o.coordinates[n][e]);i.push(t.GEOSGeom_createLinearRing(l))}let s=null;if(i.length>0){const e=new Uint32Array(i);s=t.Module._malloc(4*i.length),t.Module.HEAPU32.set(e,s/4)}const u=t.GEOSGeom_createPolygon(c,s,i.length);i.length>0&&t.Module._free(s),e.push(u)}const n=t.Module._malloc(4*e.length),l=new Uint32Array(e);t.Module.HEAPU32.set(l,n/4);const c=t.GEOSGeom_createCollection(6,n,e.length);return t.Module._free(n),c}default:throw new Error("Unsupported GeoJSON type: "+o.type+". Are you sure this is valid GeoJSON?")}}function o(e,t){if(!e)throw new Error("No GEOS geometry pointer provided");if(!t)throw new Error("No GEOS module object provided");function r(e){if(!e)return null;const o=t.Module._malloc(4);t.GEOSCoordSeq_getSize(e,o);const r=t.Module.getValue(o,"i32");if(t.Module._free(o),0===r)return[];const n=[],l=t.Module._malloc(2*r*8);t.GEOSCoordSeq_copyToBuffer(e,l,!1,!1);const c=new Float64Array(t.Module.HEAPF64.buffer,l,2*r);for(let e=0;e<2*r;e+=2)n.push([c[e],c[e+1]]);return t.Module._free(l),n}if(!e)return null;switch(t.GEOSGeomTypeId(e)){case 0:{const o=t.GEOSGeom_getCoordSeq(e),r=[],n=t.Module._malloc(4);t.GEOSCoordSeq_getSize(o,n);const l=t.Module.getValue(n,"i32");if(t.Module._free(n),1===l){const e=t.Module._malloc(8),n=t.Module._malloc(8);t.GEOSCoordSeq_getXY(o,0,e,n);const l=t.Module.getValue(e,"double"),c=t.Module.getValue(n,"double");t.Module._free(e),t.Module._free(n),r.push(l,c)}return{type:"Point",coordinates:r}}case 1:return{type:"LineString",coordinates:r(t.GEOSGeom_getCoordSeq(e))};case 3:{const o=[],n=t.GEOSGetExteriorRing(e);if(0!==n){const l=t.GEOSGeom_getCoordSeq(n),c=t.Module._malloc(4);t.GEOSCoordSeq_getSize(l,c);const i=t.Module.getValue(c,"i32");if(t.Module._free(c),i>0){o.push(r(l));const n=t.GEOSGetNumInteriorRings(e);for(let l=0;l<n;l++){const n=t.GEOSGetInteriorRingN(e,l),c=t.GEOSGeom_getCoordSeq(n);o.push(r(c))}}}return{type:"Polygon",coordinates:o}}case 4:{const o=[],r=t.GEOSGetNumGeometries(e);for(let n=0;n<r;n++){const r=t.GEOSGetGeometryN(e,n),l=t.GEOSGeom_getCoordSeq(r),c=t.Module._malloc(8),i=t.Module._malloc(8);t.GEOSCoordSeq_getXY(l,0,c,i);const s=t.Module.getValue(c,"double"),u=t.Module.getValue(i,"double");t.Module._free(c),t.Module._free(i),o.push([s,u])}return{type:"MultiPoint",coordinates:o}}case 5:{const o=[],n=t.GEOSGetNumGeometries(e);for(let l=0;l<n;l++){const n=t.GEOSGetGeometryN(e,l),c=t.GEOSGeom_getCoordSeq(n);o.push(r(c))}return{type:"MultiLineString",coordinates:o}}case 6:{const o=[],n=t.GEOSGetNumGeometries(e);for(let l=0;l<n;l++){const n=t.GEOSGetGeometryN(e,l),c=[],i=t.GEOSGetExteriorRing(n),s=t.GEOSGeom_getCoordSeq(i);c.push(r(s));const u=t.GEOSGetNumInteriorRings(n);for(let e=0;e<u;e++){const o=t.GEOSGetInteriorRingN(n,e),l=t.GEOSGeom_getCoordSeq(o);c.push(r(l))}o.push(c)}return{type:"MultiPolygon",coordinates:o}}case 7:{const r=[],n=t.GEOSGetNumGeometries(e);for(let l=0;l<n;l++){const n=t.GEOSGetGeometryN(e,l);r.push(o(n,t))}return{type:"GeometryCollection",geometries:r}}default:return null}}var t={geojsonToGeosGeom:e,geosGeomToGeojson:o};export{t as default,e as geojsonToGeosGeom,o as geosGeomToGeojson};