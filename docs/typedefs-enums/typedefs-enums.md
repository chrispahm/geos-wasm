# Typedefs and Enums

## Typedefs

<a name="StringPointer"></a>

## StringPointer : <code>number</code>
A pointer to a char * string.
Can be created using const ptr = geos.Module.stringToNewUTF8(someString)
Can be converted to JS using const str = geos.Module.UTF8ToString(ptr)

**Kind**: global typedef  

---
<a name="NumberPointer"></a>

## NumberPointer : <code>number</code>
A pointer to a double *, int *, or unsigned int *.
Can be created using const ptr = geos.Module._malloc(8)
Can be converted to JS using const value = geos.Module.getValue(ptr, 'double')
Must be freed using geos.Module._free(ptr)

**Kind**: global typedef  

---
<a name="ArrayPointer"></a>

## ArrayPointer : <code>number</code>
A pointer to an array (double *).
Can be create using the following JS code:
const values = new Float64Array(N * dim)
for (let i = 0; i < values.length; i++) {
  values[i] = i
}
const valuesPtr = geos.Module._malloc(N * dim * 8)
geos.Module.HEAPF64.set(values, valuesPtr / 8)
Can be converted to JS using the following JS code:
const view = new Float64Array(geos.Module.HEAPF64.buffer, valuesPtr, N * dim * 8)

**Kind**: global typedef  

---
<a name="Pointer"></a>

## Pointer : [<code>StringPointer</code>](#StringPointer) \| [<code>NumberPointer</code>](#NumberPointer)
A generic pointer type.

**Kind**: global typedef  

---
<a name="GEOSBufferParams"></a>

## GEOSBufferParams : <code>number</code>
Parameter object for buffering.

**Kind**: global typedef  

---
<a name="GEOSContextHandle_t"></a>

## GEOSContextHandle\_t : <code>number</code>
Type returned by GEOS_init_r(), for use with the functions ending in _r (the reentrant API).

**Kind**: global typedef  

---
<a name="GEOSCoordSequence"></a>

## GEOSCoordSequence : <code>number</code>
Coordinate sequence type representing fixed-size lists of coordinates. Contains the list of vertices defining the location of a GEOSGeometry.

**Kind**: global typedef  

---
<a name="GEOSDistanceCallback"></a>

## GEOSDistanceCallback ⇒ <code>number</code>
Callback function for use in spatial index nearest neighbor calculations. Allows custom distance to be calculated between items in the index. Is passed two items, and sets the calculated distance between the items into the distance pointer. Extra data for the calculation can be passed via the userdata.
This callback is displayed as a global member.

**Kind**: global typedef  
**Returns**: <code>number</code> - 1 if distance calculation succeeds, 0 otherwise  

---
<a name="GEOSGeoJSONReader"></a>

## GEOSGeoJSONReader : <code>number</code>
Reader object to read GeoJSON format and construct a Geometry.

**Kind**: global typedef  

---
<a name="GEOSGeoJSONWriter"></a>

## GEOSGeoJSONWriter : <code>number</code>
Writer object to turn a Geometry into GeoJSON.

**Kind**: global typedef  

---
<a name="GEOSGeometry"></a>

## GEOSGeometry : <code>number</code>
The generic type for a geometry. A geometry can be a Point, LineString, Polygon, MultiPoint, MultiLineString, MultiPolygon, or GeometryCollection. The geometry type can be read with GEOSGeomTypeId. Most functions in GEOS have GEOSGeometry * as either a parameter or a return type.

**Kind**: global typedef  

---
<a name="GEOSInterruptCallback"></a>

## GEOSInterruptCallback : <code>function</code>
Callback function for use in interruption. The callback will be invoked before checking for interruption, so can be used to request it.
This callback is displayed as a global member.

**Kind**: global typedef  

---
<a name="GEOSMakeValidParams"></a>

## GEOSMakeValidParams : <code>number</code>
Parameter object for validity enforcement.

**Kind**: global typedef  

---
<a name="GEOSMessageHandler"></a>

## GEOSMessageHandler : <code>function</code>
Callback function for passing GEOS error messages to parent process.
This callback is displayed as a global member.

**Kind**: global typedef  

---
<a name="GEOSMessageHandler_r"></a>

## GEOSMessageHandler\_r : <code>function</code>
A GEOS message handler function.
This callback is displayed as a global member.

**Kind**: global typedef  

---
<a name="GEOSPreparedGeometry"></a>

## GEOSPreparedGeometry : <code>number</code>
Prepared geometry type.

**Kind**: global typedef  

---
<a name="GEOSQueryCallback"></a>

## GEOSQueryCallback : <code>function</code>
Callback function for use in spatial index search calls. Pass into the query function and handle query results as the index returns them.
This callback is displayed as a global member.

**Kind**: global typedef  

---
<a name="GEOSSTRtree"></a>

## GEOSSTRtree : <code>number</code>
STRTree index.

**Kind**: global typedef  

---
<a name="GEOSTransformXYCallback"></a>

## GEOSTransformXYCallback ⇒ <code>number</code>
Callback function for use in GEOSGeom_transformXY. Allows custom function to be applied to x and y values for each coordinate in a geometry. Z and M values are unchanged by this function. Extra data for the calculation can be passed via the userdata.
This callback is displayed as a global member.

**Kind**: global typedef  
**Returns**: <code>number</code> - 1 if calculation succeeded, 0 on failure  

---
<a name="GEOSWKBReader"></a>

## GEOSWKBReader : <code>number</code>
Reader object to read Well-Known Binary (WKB) format and construct Geometry.

**Kind**: global typedef  

---
<a name="GEOSWKBWriter"></a>

## GEOSWKBWriter : <code>number</code>
Writer object to turn Geometry into Well-Known Binary (WKB).

**Kind**: global typedef  

---
<a name="GEOSWKTReader"></a>

## GEOSWKTReader : <code>number</code>
Reader object to read Well-Known Text (WKT) format and construct Geometry.

**Kind**: global typedef  

---
<a name="GEOSWKTWriter"></a>

## GEOSWKTWriter : <code>number</code>
Writer object to turn Geometry into Well-Known Text (WKT).

**Kind**: global typedef  

---

## Enums

<a name="exp_module_geos--geos.GEOSBufCapStyles"></a>

## geos.GEOSBufCapStyles : <code>enum</code> ⏏
Cap styles control the ends of buffered lines.

**Kind**: global enum of [<code>geos</code>](#module_geos)  
**Read only**: true  
**See**: GEOSBuffer  
**Properties**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| GEOSBUF_CAP_ROUND | <code>number</code> | <code>0</code> | End is rounded, with end point of original line in the centre of the round cap. |
| GEOSBUF_CAP_FLAT | <code>number</code> | <code>1</code> | End is flat, with end point of original line at the end of the buffer |
| GEOSBUF_CAP_SQUARE | <code>number</code> | <code>2</code> | End is flat, with end point of original line in the middle of a square enclosing that point |


---
<a name="exp_module_geos--geos.GEOSBufJoinStyles"></a>

## geos.GEOSBufJoinStyles : <code>enum</code> ⏏
Join styles control the buffer shape at bends in a line.

**Kind**: global enum of [<code>geos</code>](#module_geos)  
**Read only**: true  
**See**: GEOSBuffer  
**Properties**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| GEOSBUF_JOIN_ROUND | <code>number</code> | <code>0</code> | Join is rounded, essentially each line is terminated in a round cap. Form round corner. |
| GEOSBUF_JOIN_MITRE | <code>number</code> | <code>1</code> | Join is flat, with line between buffer edges, through the join point. Forms flat corner. |
| GEOSBUF_JOIN_BEVEL | <code>number</code> | <code>2</code> | Join is the point at which the two buffer edges intersect. Forms sharp corner. |


---
<a name="exp_module_geos--geos.GEOSGeomTypes"></a>

## geos.GEOSGeomTypes : <code>enum</code> ⏏
Geometry type number, used by functions returning or consuming geometry types.

**Kind**: global enum of [<code>geos</code>](#module_geos)  
**Read only**: true  
**See**

- GEOSGeomType
- GEOSGeomTypeId

**Properties**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| GEOS_POINT | <code>number</code> | <code>0</code> | Point |
| GEOS_LINESTRING | <code>number</code> | <code>1</code> | Linestring |
| GEOS_LINEARRING | <code>number</code> | <code>2</code> | Linear ring, used within polygons |
| GEOS_POLYGON | <code>number</code> | <code>3</code> | Polygon |
| GEOS_MULTIPOINT | <code>number</code> | <code>4</code> | Multipoint, a homogeneous collection of points |
| GEOS_MULTILINESTRING | <code>number</code> | <code>5</code> | Multilinestring, a homogeneous collection of linestrings |
| GEOS_MULTIPOLYGON | <code>number</code> | <code>6</code> | Multipolygon, a homogeneous collection of polygons |
| GEOS_GEOMETRYCOLLECTION | <code>number</code> | <code>7</code> | Geometry collection, a heterogeneous collection of geometry |


---
<a name="exp_module_geos--geos.GEOSMakeValidMethods"></a>

## geos.GEOSMakeValidMethods : <code>enum</code> ⏏
Algorithm to use when repairing invalid geometries.

**Kind**: global enum of [<code>geos</code>](#module_geos)  
**Read only**: true  
**See**: GEOSMakeValidWithParams  
**Properties**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| GEOS_MAKE_VALID_LINEWORK | <code>number</code> | <code>0</code> | Original method, combines all rings into a set of noded lines and then extracts valid polygons from that linework. |
| GEOS_MAKE_VALID_STRUCTURE | <code>number</code> | <code>1</code> | Structured method, first makes all rings valid then merges shells and subtracts holes from shells to generate valid result. Assumes that holes and shells are correctly categorized. |


---
<a name="exp_module_geos--geos.GEOSPolygonHullParameterModes"></a>

## geos.GEOSPolygonHullParameterModes : <code>enum</code> ⏏
Controls the behavior of the GEOSPolygonHullSimplify parameter.

**Kind**: global enum of [<code>geos</code>](#module_geos)  
**Read only**: true  
**Properties**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| GEOSHULL_PARAM_VERTEX_RATIO | <code>number</code> | <code>0</code> | Fraction of input vertices retained |
| GEOSHULL_PARAM_AREA_RATIO | <code>number</code> | <code>1</code> | Ratio of simplified hull area to input area |


---
<a name="exp_module_geos--geos.GEOSPrecisionRules"></a>

## geos.GEOSPrecisionRules : <code>enum</code> ⏏
Controls the behavior of GEOSGeom_setPrecision() when altering the precision of a geometry.

**Kind**: global enum of [<code>geos</code>](#module_geos)  
**Read only**: true  
**Properties**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| GEOS_PREC_VALID_OUTPUT | <code>number</code> | <code>0</code> | The output is always valid. Collapsed geometry elements (including both polygons and lines) are removed. |
| GEOS_PREC_NO_TOPO | <code>number</code> | <code>1</code> | Precision reduction is performed pointwise. Output geometry may be invalid due to collapse or self-intersection. (This might be better called "GEOS_PREC_POINTWISE" - the current name is historical.) |
| GEOS_PREC_KEEP_COLLAPSED | <code>number</code> | <code>2</code> | Like the default mode, except that collapsed linear geometry elements are preserved. Collapsed polygonal input elements are removed. |


---
<a name="exp_module_geos--geos.GEOSRelateBoundaryNodeRules"></a>

## geos.GEOSRelateBoundaryNodeRules : <code>enum</code> ⏏
Controls the behavior of the result of GEOSRelate when returning DE9IM results for two geometries.

**Kind**: global enum of [<code>geos</code>](#module_geos)  
**Read only**: true  
**Properties**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| GEOSRELATE_BNR_MOD2 | <code>number</code> | <code>0</code> | See geos::algorithm::BoundaryNodeRule::getBoundaryRuleMod2() |
| GEOSRELATE_BNR_OGC | <code>number</code> | <code>1</code> | Same as GEOSRELATE_BNR_MOD2 |
| GEOSRELATE_BNR_ENDPOINT | <code>number</code> | <code>2</code> | See geos::algorithm::BoundaryNodeRule::getBoundaryEndPoint() |
| GEOSRELATE_BNR_MULTIVALENT_ENDPOINT | <code>number</code> | <code>3</code> | See geos::algorithm::BoundaryNodeRule::getBoundaryMultivalentEndPoint() |
| GEOSRELATE_BNR_MONOVALENT_ENDPOINT | <code>number</code> | <code>4</code> | See geos::algorithm::BoundaryNodeRule::getBoundaryMonovalentEndPoint() |


---
<a name="exp_module_geos--geos.GEOSValidFlags"></a>

## geos.GEOSValidFlags : <code>enum</code> ⏏
Change behaviour of validity testing in GEOSisValidDetail

**Kind**: global enum of [<code>geos</code>](#module_geos)  
**Read only**: true  
**Properties**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| GEOSVALID_ALLOW_SELFTOUCHING_RING_FORMING_HOLE | <code>number</code> | <code>0</code> | Allow self-touching rings to form a hole in a polygon. |


---
<a name="exp_module_geos--geos.GEOSVoronoiFlags"></a>

## geos.GEOSVoronoiFlags : <code>enum</code> ⏏
Change behaviour of GEOSVoronoiDiagram

**Kind**: global enum of [<code>geos</code>](#module_geos)  
**Read only**: true  
**Properties**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| GEOS_VORONOI_ONLY_EDGES | <code>number</code> | <code>0</code> | Return only edges of the Voronoi cells, as a MultiLineString |
| GEOS_VORONOI_PRESERVE_ORDER | <code>number</code> | <code>1</code> | Preserve order of inputs, such that the nth cell in the result corresponds to the nth vertex in the input. If this cannot be done, such as for inputs that contain repeated points, GEOSVoronoiDiagram will return NULL. |


---
<a name="exp_module_geos--geos.GEOSWKBByteOrders"></a>

## geos.GEOSWKBByteOrders : <code>enum</code> ⏏
Well-known binary byte orders used when writing to WKB.

**Kind**: global enum of [<code>geos</code>](#module_geos)  
**Read only**: true  
**See**: GEOSWKBWriter_setByteOrder  
**Properties**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| GEOS_WKB_XDR | <code>number</code> | <code>0</code> | Big Endian |
| GEOS_WKB_NDR | <code>number</code> | <code>1</code> | Little Endian |


---
<a name="exp_module_geos--geos.GEOSWKBFlavors"></a>

## geos.GEOSWKBFlavors : <code>enum</code> ⏏
Well-known binary flavors to use when writing to WKB. ISO flavour is more standard. Extended flavour supports 3D and SRID embedding. GEOS reads both transparently.

**Kind**: global enum of [<code>geos</code>](#module_geos)  
**Read only**: true  
**See**: GEOSWKBWriter_setFlavor  
**Properties**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| GEOS_WKB_EXTENDED | <code>number</code> | <code>0</code> | Extended |
| GEOS_WKB_ISO | <code>number</code> | <code>1</code> | ISO |


---
