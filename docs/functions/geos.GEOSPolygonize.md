<a name="exp_module_geos--geos.GEOSPolygonize"></a>

## geos.GEOSPolygonize ⇒ [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) ⏏
Polygonizes a set of Geometries which contain linework that represents the edges of a planar graph.

**Kind**: global property of [<code>geos</code>](/typedefs-enums/typedefs-enums.html#module_geos)  
**Returns**: [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) - The polygonal output geometry. Caller is responsible for freeing with GEOSGeom_destroy().  

| Param | Type | Description |
| --- | --- | --- |
| geoms | [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) | Array of linear geometries to polygons. Caller retains ownersihp of both array container and objects. |
| ngeoms | <code>number</code> | Size of the geoms array. |


---
<a name="exp_module_geos--geos.GEOSPolygonize_full"></a>

## geos.GEOSPolygonize\_full ⇒ [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) ⏏
Perform the polygonization as GEOSPolygonize() and return the polygonal result as well as all extra outputs.

**Kind**: global property of [<code>geos</code>](/typedefs-enums/typedefs-enums.html#module_geos)  
**Returns**: [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) - The polygonal valid output Caller is responsible for freeing with GEOSGeom_destroy().  

| Param | Type | Description |
| --- | --- | --- |
| input | [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) | A single geometry with all the input lines to polygonize. |
| cuts | [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) | Pointer to hold "cut edges", connected on both ends but not part of output. Caller must free. |
| dangles | [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) | Pointer to hold "dangles", connected one end but not part of output. Caller must free. |
| invalid | [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) | Pointer to hold invalid outputs, polygons formed but not valid. Caller must free. |


---
<a name="exp_module_geos--geos.GEOSPolygonize_full_r"></a>

## geos.GEOSPolygonize\_full\_r ⇒ [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) ⏏
Perform the polygonization as GEOSPolygonize() and return the polygonal result as well as all extra outputs.

**Kind**: global property of [<code>geos</code>](/typedefs-enums/typedefs-enums.html#module_geos)  
**Returns**: [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) - The polygonal valid output Caller is responsible for freeing with GEOSGeom_destroy().  

| Param | Type | Description |
| --- | --- | --- |
| handle | [<code>GEOSContextHandle\_t</code>](/typedefs-enums/typedefs-enums.html#GEOSContextHandle_t) | - |
| input | [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) | A single geometry with all the input lines to polygonize. |
| cuts | [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) | Pointer to hold "cut edges", connected on both ends but not part of output. Caller must free. |
| dangles | [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) | Pointer to hold "dangles", connected one end but not part of output. Caller must free. |
| invalidRings | [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) | Pointer to hold invalid outputs, polygons formed but not valid. Caller must free. |


---
<a name="exp_module_geos--geos.GEOSPolygonize_r"></a>

## geos.GEOSPolygonize\_r ⇒ [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) ⏏
Polygonizes a set of Geometries which contain linework that represents the edges of a planar graph.

**Kind**: global property of [<code>geos</code>](/typedefs-enums/typedefs-enums.html#module_geos)  
**Returns**: [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) - The polygonal output geometry. Caller is responsible for freeing with GEOSGeom_destroy().  

| Param | Type | Description |
| --- | --- | --- |
| handle | [<code>GEOSContextHandle\_t</code>](/typedefs-enums/typedefs-enums.html#GEOSContextHandle_t) | - |
| geoms | [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) | Array of linear geometries to polygons. Caller retains ownersihp of both array container and objects. |
| ngeoms | <code>number</code> | Size of the geoms array. |


---
<a name="exp_module_geos--geos.GEOSPolygonize_valid"></a>

## geos.GEOSPolygonize\_valid ⇒ [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) ⏏
Has the same polygonizing behavior as GEOSPolygonize(), but returns a result which is a valid polygonal geometry. The result will not contain any edge-adjacent elements.

**Kind**: global property of [<code>geos</code>](/typedefs-enums/typedefs-enums.html#module_geos)  
**Returns**: [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) - The polygonal output geometry. Caller is responsible for freeing with GEOSGeom_destroy().  

| Param | Type | Description |
| --- | --- | --- |
| geoms | [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) | Array of linear geometries to polygons. Caller retains ownersihp of both array container and objects. |
| ngeoms | <code>number</code> | Size of the geoms array. |


---
<a name="exp_module_geos--geos.GEOSPolygonize_valid_r"></a>

## geos.GEOSPolygonize\_valid\_r ⇒ [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) ⏏
Has the same polygonizing behavior as GEOSPolygonize(), but returns a result which is a valid polygonal geometry. The result will not contain any edge-adjacent elements.

**Kind**: global property of [<code>geos</code>](/typedefs-enums/typedefs-enums.html#module_geos)  
**Returns**: [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) - The polygonal output geometry. Caller is responsible for freeing with GEOSGeom_destroy().  

| Param | Type | Description |
| --- | --- | --- |
| handle | [<code>GEOSContextHandle\_t</code>](/typedefs-enums/typedefs-enums.html#GEOSContextHandle_t) | - |
| geoms | [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) | Array of linear geometries to polygons. Caller retains ownersihp of both array container and objects. |
| ngems | <code>number</code> | Size of the geoms array. |


---
<a name="exp_module_geos--geos.GEOSPolygonizer_getCutEdges"></a>

## geos.GEOSPolygonizer\_getCutEdges ⇒ [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) ⏏
Perform the polygonization as GEOSPolygonize() but return only the "cut edges", the linear features that are connected at both ends, do not participate in the final polygon.

**Kind**: global property of [<code>geos</code>](/typedefs-enums/typedefs-enums.html#module_geos)  
**Returns**: [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) - The "cut edges" Caller is responsible for freeing with GEOSGeom_destroy().  

| Param | Type | Description |
| --- | --- | --- |
| geoms | [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) | Array of linear geometries to polygons. Caller retains ownersihp of both array container and objects. |
| ngeoms | <code>number</code> | Size of the geoms array. |


---
<a name="exp_module_geos--geos.GEOSPolygonizer_getCutEdges_r"></a>

## geos.GEOSPolygonizer\_getCutEdges\_r ⇒ [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) ⏏
Perform the polygonization as GEOSPolygonize() but return only the "cut edges", the linear features that are connected at both ends, do not participate in the final polygon.

**Kind**: global property of [<code>geos</code>](/typedefs-enums/typedefs-enums.html#module_geos)  
**Returns**: [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) - The "cut edges" Caller is responsible for freeing with GEOSGeom_destroy().  

| Param | Type | Description |
| --- | --- | --- |
| handle | [<code>GEOSContextHandle\_t</code>](/typedefs-enums/typedefs-enums.html#GEOSContextHandle_t) | - |
| geoms | [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) | Array of linear geometries to polygons. Caller retains ownersihp of both array container and objects. |
| ngeoms | <code>number</code> | Size of the geoms array. |


---
