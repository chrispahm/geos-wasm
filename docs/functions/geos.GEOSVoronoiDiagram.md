<a name="exp_module_geos--geos.GEOSVoronoiDiagram"></a>

## geos.GEOSVoronoiDiagram ⇒ [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) ⏏
Returns the Voronoi polygons or edges of the vertices of the given geometry.

**Kind**: global property of [<code>geos</code>](/typedefs-enums/typedefs-enums.html#module_geos)  
**Returns**: [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) - A newly allocated geometry. NULL on exception. Caller is responsible for freeing with GEOSGeom_destroy().  

| Param | Type | Description |
| --- | --- | --- |
| g | [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) | the input geometry whose vertices will be used as sites. |
| env | [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) | snapping tolerance to use for improved robustness. A tolerance of 0.0 specifies that no snapping will take place. This argument can be finicky and is known to cause the algorithm to fail in several cases. If you're using tolerance and getting a failure, try setting it to 0.0. |
| tolerance | <code>number</code> | A value from the GEOSVoronoiFlags enum |
| flags | <code>number</code> | clipping envelope for the returned diagram, automatically determined if env is NULL. The diagram will be clipped to the larger of this envelope or an envelope surrounding the sites. |


---
<a name="exp_module_geos--geos.GEOSVoronoiDiagram_r"></a>

## geos.GEOSVoronoiDiagram\_r ⇒ [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) ⏏
Returns the Voronoi polygons or edges of the vertices of the given geometry.

**Kind**: global property of [<code>geos</code>](/typedefs-enums/typedefs-enums.html#module_geos)  
**Returns**: [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) - A newly allocated geometry. NULL on exception. Caller is responsible for freeing with GEOSGeom_destroy().  

| Param | Type | Description |
| --- | --- | --- |
| extHandle | [<code>GEOSContextHandle\_t</code>](/typedefs-enums/typedefs-enums.html#GEOSContextHandle_t) | - |
| g | [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) | the input geometry whose vertices will be used as sites. |
| env | [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) | snapping tolerance to use for improved robustness. A tolerance of 0.0 specifies that no snapping will take place. This argument can be finicky and is known to cause the algorithm to fail in several cases. If you're using tolerance and getting a failure, try setting it to 0.0. |
| tolerance | <code>number</code> | A value from the GEOSVoronoiFlags enum |
| flags | <code>number</code> | clipping envelope for the returned diagram, automatically determined if env is NULL. The diagram will be clipped to the larger of this envelope or an envelope surrounding the sites. |


---
