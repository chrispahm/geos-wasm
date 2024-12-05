function e(o,t){if(!o)throw new Error("No GeoJSON object provided")
if(!t)throw new Error("No GEOS module object provided")
function r(e){if(!e||0===e.length)return null
const o=e.length,r=e[0].length,n=new Float64Array(e.flat()),l=t.Module._malloc(o*r*8)
t.Module.HEAPF64.set(n,l/8)
const c=t.GEOSCoordSeq_copyFromBuffer(l,o,r>2,!1)
return t.Module._free(l),c}switch(o.type){case"Feature":return e(o.geometry,t)
case"FeatureCollection":if(0===o.features.length)return t.GEOSGeom_createEmptyCollection(t.GEOS_GEOMETRYCOLLECTION)
{const r=[]
o.features.forEach((o=>{r.push(e(o.geometry,t))}))
const n=t.Module._malloc(4*r.length),l=new Uint32Array(r)
t.Module.HEAPU32.set(l,n/4)
const c=t.GEOSGeom_createCollection(7,n,r.length)
return t.Module._free(n),c}case"GeometryCollection":if(0===o.geometries.length)return t.GEOSGeom_createEmptyCollection(t.GEOS_GEOMETRYCOLLECTION)
{const r=[]
o.geometries.forEach((o=>{r.push(e(o,t))}))
const n=t.Module._malloc(4*r.length),l=new Uint32Array(r)
t.Module.HEAPU32.set(l,n/4)
const c=t.GEOSGeom_createCollection(t.GEOS_GEOMETRYCOLLECTION,n,r.length)
return t.Module._free(n),c}case"Point":if(0===o.coordinates.length)return t.GEOSGeom_createEmptyPoint()
if(2===o.coordinates.length)return t.GEOSGeom_createPointFromXY(o.coordinates[0],o.coordinates[1])
{const e=r([o.coordinates])
return t.GEOSGeom_createPoint(e)}case"LineString":if(0===o.coordinates.length)return t.GEOSGeom_createEmptyLineString()
{const e=r(o.coordinates)
return t.GEOSGeom_createLineString(e)}case"Polygon":if(0===o.coordinates.length)return t.GEOSGeom_createEmptyPolygon()
{const e=r(o.coordinates[0]),n=t.GEOSGeom_createLinearRing(e),l=[]
if(o.coordinates.length>1)for(let e=1;e<o.coordinates.length;e++){const n=r(o.coordinates[e])
l.push(t.GEOSGeom_createLinearRing(n))}let c=null
if(l.length>0){const e=new Uint32Array(l)
c=t.Module._malloc(4*l.length),t.Module.HEAPU32.set(e,c/4)}const u=t.GEOSGeom_createPolygon(n,c,l.length)
return l.length>0&&t.Module._free(c),u}case"MultiPoint":if(0===o.coordinates.length)return t.GEOSGeom_createEmptyCollection(t.GEOS_MULTIPOINT)
{const e=[]
for(let n=0;n<o.coordinates.length;n++)if(2===o.coordinates[n].length)e.push(t.GEOSGeom_createPointFromXY(o.coordinates[n][0],o.coordinates[n][1]))
else{const l=r([o.coordinates[n]])
e.push(t.GEOSGeom_createPoint(l))}const n=t.Module._malloc(4*e.length),l=new Uint32Array(e)
t.Module.HEAPU32.set(l,n/4)
const c=t.GEOSGeom_createCollection(4,n,e.length)
return t.Module._free(n),c}case"MultiLineString":if(0===o.coordinates.length)return t.GEOSGeom_createEmptyCollection(t.GEOS_MULTILINESTRING)
{const e=[]
for(let n=0;n<o.coordinates.length;n++){const l=r(o.coordinates[n])
e.push(t.GEOSGeom_createLineString(l))}const n=t.Module._malloc(4*e.length),l=new Uint32Array(e)
t.Module.HEAPU32.set(l,n/4)
const c=t.GEOSGeom_createCollection(5,n,e.length)
return t.Module._free(n),c}case"MultiPolygon":if(0===o.coordinates.length)return t.GEOSGeom_createEmptyCollection(t.GEOS_MULTIPOLYGON)
{const e=[]
for(let n=0;n<o.coordinates.length;n++){const l=r(o.coordinates[n][0]),c=t.GEOSGeom_createLinearRing(l),u=[]
if(o.coordinates[n].length>1)for(let e=1;e<o.coordinates[n].length;e++){const l=r(o.coordinates[n][e])
u.push(t.GEOSGeom_createLinearRing(l))}let i=null
if(u.length>0){const e=new Uint32Array(u)
i=t.Module._malloc(4*u.length),t.Module.HEAPU32.set(e,i/4)}const s=t.GEOSGeom_createPolygon(c,i,u.length)
u.length>0&&t.Module._free(i),e.push(s)}const n=t.Module._malloc(4*e.length),l=new Uint32Array(e)
t.Module.HEAPU32.set(l,n/4)
const c=t.GEOSGeom_createCollection(t.GEOS_MULTIPOLYGON,n,e.length)
return t.Module._free(n),c}default:throw new Error("Unsupported GeoJSON type: "+o.type+". Are you sure this is valid GeoJSON?")}}function o(e,t){if(!e)throw new Error("No GEOS geometry pointer provided")
if(!t)throw new Error("No GEOS module object provided")
function r(e){if(!e)return null
const o=t.Module._malloc(4)
t.GEOSCoordSeq_getSize(e,o)
const r=t.Module.getValue(o,"i32")
if(t.Module._free(o),0===r)return[]
const n=[],l=t.Module._malloc(2*r*8),c=t.Module._malloc(4)
t.GEOSCoordSeq_getDimensions(e,c)
const u=t.Module.getValue(c,"i32")
t.GEOSCoordSeq_copyToBuffer(e,l,u>2,!1)
const i=new Float64Array(t.Module.HEAPF64.buffer,l,r*u)
for(let e=0;e<r*u;e+=u)u>2?n.push([i[e],i[e+1],i[e+2]]):n.push([i[e],i[e+1]])
return t.Module._free(l),t.Module._free(c),n}if(!e)return null
switch(t.GEOSGeomTypeId(e)){case t.GEOS_POINT:{const o=t.GEOSGeom_getCoordSeq(e),r=[],n=t.Module._malloc(4)
t.GEOSCoordSeq_getSize(o,n)
const l=t.Module.getValue(n,"i32")
if(t.Module._free(n),1===l){const e=t.Module._malloc(8),n=t.Module._malloc(8),l=t.Module._malloc(4)
t.GEOSCoordSeq_getDimensions(o,l)
let c
t.Module.getValue(l,"i32")>2?(c=t.Module._malloc(8),t.GEOSCoordSeq_getXYZ(o,0,e,n,c)):t.GEOSCoordSeq_getXY(o,0,e,n)
const u=t.Module.getValue(e,"double"),i=t.Module.getValue(n,"double")
let s
c&&(s=t.Module.getValue(c,"double"),t.Module._free(c)),t.Module._free(e),t.Module._free(n),t.Module._free(l),"number"==typeof s?r.push(u,i,s):r.push(u,i)}return{type:"Point",coordinates:r}}case t.GEOS_LINESTRING:return{type:"LineString",coordinates:r(t.GEOSGeom_getCoordSeq(e))}
case t.GEOS_POLYGON:{const o=[],n=t.GEOSGetExteriorRing(e)
if(0!==n){const l=t.GEOSGeom_getCoordSeq(n),c=t.Module._malloc(4)
t.GEOSCoordSeq_getSize(l,c)
const u=t.Module.getValue(c,"i32")
if(t.Module._free(c),u>0){o.push(r(l))
const n=t.GEOSGetNumInteriorRings(e)
for(let l=0;l<n;l++){const n=t.GEOSGetInteriorRingN(e,l),c=t.GEOSGeom_getCoordSeq(n)
o.push(r(c))}}}return{type:"Polygon",coordinates:o}}case t.GEOS_MULTIPOINT:{const o=[],r=t.GEOSGetNumGeometries(e)
for(let n=0;n<r;n++){const r=t.GEOSGetGeometryN(e,n),l=t.GEOSGeom_getCoordSeq(r),c=t.Module._malloc(8),u=t.Module._malloc(8),i=t.Module._malloc(4)
t.GEOSCoordSeq_getDimensions(l,i)
let s
t.Module.getValue(i,"i32")>2&&(s=t.Module._malloc(8),t.GEOSCoordSeq_getXYZ(l,0,c,u,s)),t.GEOSCoordSeq_getXY(l,0,c,u)
const G=t.Module.getValue(c,"double"),d=t.Module.getValue(u,"double")
let a
s&&(a=t.Module.getValue(s,"double"),t.Module._free(s)),t.Module._free(c),t.Module._free(u),t.Module._free(i),a?o.push([G,d,a]):o.push([G,d])}return{type:"MultiPoint",coordinates:o}}case t.GEOS_MULTILINESTRING:{const o=[],n=t.GEOSGetNumGeometries(e)
for(let l=0;l<n;l++){const n=t.GEOSGetGeometryN(e,l),c=t.GEOSGeom_getCoordSeq(n)
o.push(r(c))}return{type:"MultiLineString",coordinates:o}}case t.GEOS_MULTIPOLYGON:{const o=[],n=t.GEOSGetNumGeometries(e)
for(let l=0;l<n;l++){const n=t.GEOSGetGeometryN(e,l),c=[],u=t.GEOSGetExteriorRing(n),i=t.GEOSGeom_getCoordSeq(u)
c.push(r(i))
const s=t.GEOSGetNumInteriorRings(n)
for(let e=0;e<s;e++){const o=t.GEOSGetInteriorRingN(n,e),l=t.GEOSGeom_getCoordSeq(o)
c.push(r(l))}o.push(c)}return{type:"MultiPolygon",coordinates:o}}case t.GEOS_GEOMETRYCOLLECTION:{const r=[],n=t.GEOSGetNumGeometries(e)
for(let l=0;l<n;l++){const n=t.GEOSGetGeometryN(e,l)
r.push(o(n,t))}return{type:"GeometryCollection",geometries:r}}default:return null}}var t={geojsonToGeosGeom:e,geosGeomToGeojson:o}
export{t as default,e as geojsonToGeosGeom,o as geosGeomToGeojson}
