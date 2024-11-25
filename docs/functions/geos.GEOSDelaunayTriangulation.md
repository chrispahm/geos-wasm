<a name="exp_module_geos--geos.GEOSDelaunayTriangulation"></a>

## geos.GEOSDelaunayTriangulation ⇒ [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) ⏏
Return a Delaunay triangulation of the vertices of the given geometry.

**Kind**: global property of [<code>geos</code>](/typedefs-enums/typedefs-enums.html#module_geos)  
**Returns**: [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) - A newly allocated geometry. NULL on exception. Caller is responsible for freeing with GEOSGeom_destroy().  

| Param | Type | Description |
| --- | --- | --- |
| g | [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) | the input geometry whose vertices will be used as "sites" |
| tolerance | <code>number</code> | optional snapping tolerance to use for improved robustness |
| onlyEdges | <code>number</code> | if non-zero will return a MultiLineString, otherwise it will return a GeometryCollection containing triangular Polygons. |


---
<a name="exp_module_geos--geos.GEOSDelaunayTriangulation_r"></a>

## geos.GEOSDelaunayTriangulation\_r ⇒ [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) ⏏
Return a Delaunay triangulation of the vertices of the given geometry.

**Kind**: global property of [<code>geos</code>](/typedefs-enums/typedefs-enums.html#module_geos)  
**Returns**: [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) - A newly allocated geometry. NULL on exception. Caller is responsible for freeing with GEOSGeom_destroy().  

| Param | Type | Description |
| --- | --- | --- |
| handle | [<code>GEOSContextHandle\_t</code>](/typedefs-enums/typedefs-enums.html#GEOSContextHandle_t) | - |
| g | [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) | the input geometry whose vertices will be used as "sites" |
| tolerance | <code>number</code> | optional snapping tolerance to use for improved robustness |
| onlyEdges | <code>number</code> | if non-zero will return a MultiLineString, otherwise it will return a GeometryCollection containing triangular Polygons. |


---
