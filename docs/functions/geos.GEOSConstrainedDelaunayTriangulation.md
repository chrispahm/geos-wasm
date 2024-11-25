<a name="exp_module_geos--geos.GEOSConstrainedDelaunayTriangulation"></a>

## geos.GEOSConstrainedDelaunayTriangulation ⇒ [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) ⏏
Return a constrained Delaunay triangulation of the vertices of the given polygon(s). For non-polygonal inputs, returns an empty geometry collection.

**Kind**: global property of [<code>geos</code>](/typedefs-enums/typedefs-enums.html#module_geos)  
**Returns**: [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) - A newly allocated geometry. NULL on exception. Caller is responsible for freeing with GEOSGeom_destroy().  

| Param | Type | Description |
| --- | --- | --- |
| g | [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) | the input geometry whose rings will be used as input |


---
<a name="exp_module_geos--geos.GEOSConstrainedDelaunayTriangulation_r"></a>

## geos.GEOSConstrainedDelaunayTriangulation\_r ⇒ [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) ⏏
Return a constrained Delaunay triangulation of the vertices of the given polygon(s). For non-polygonal inputs, returns an empty geometry collection.

**Kind**: global property of [<code>geos</code>](/typedefs-enums/typedefs-enums.html#module_geos)  
**Returns**: [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) - A newly allocated geometry. NULL on exception. Caller is responsible for freeing with GEOSGeom_destroy().  

| Param | Type | Description |
| --- | --- | --- |
| handle | [<code>GEOSContextHandle\_t</code>](/typedefs-enums/typedefs-enums.html#GEOSContextHandle_t) | - |
| g | [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) | the input geometry whose rings will be used as input |


---
