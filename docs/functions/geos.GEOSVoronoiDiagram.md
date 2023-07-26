<a name="exp_module_geos--geos.GEOSVoronoiDiagram"></a>

## geos.GEOSVoronoiDiagram ⇒ <code>number</code> ⏏
Computes a Voronoi diagram from the vertices of the given geometry.

**Kind**: Exported member  
**Returns**: <code>number</code> - A pointer to the geometry representing the Voronoi diagram. Returns NULL on exception.  

| Param | Type | Description |
| --- | --- | --- |
| g | <code>number</code> | The geometry pointer whose vertices to use as sites for Voronoi diagram generation. |
| env | <code>number</code> | A pointer to an optional clipping envelope (GEOSGeometry). If provided, only cells which lie in this envelope will be included in the result. This can be used to avoid constructing very large cells (such as those which are far away from all sites). If NULL, no clipping envelope is used. |
| tolerance | <code>number</code> | The snapping tolerance to use for improved robustness. A tolerance of 0.0 specifies that no snapping will take place. |
| onlyEdges | <code>number</code> | If non-zero, only the edges of the Voronoi diagram will be returned, forming a multilinestring. If zero, the cells will be returned as a collection of polygons. |


---
<a name="exp_module_geos--geos.GEOSVoronoiDiagram_r"></a>

## geos.GEOSVoronoiDiagram\_r ⇒ <code>number</code> ⏏
Computes a Voronoi diagram from the vertices of the given geometry using a GEOS context handle.

**Kind**: Exported member  
**Returns**: <code>number</code> - A pointer to the geometry representing the Voronoi diagram. Returns NULL on exception.  

| Param | Type | Description |
| --- | --- | --- |
| handle | <code>number</code> | The GEOS context pointer handle. |
| g | <code>number</code> | The geometry pointer whose vertices to use as sites for Voronoi diagram generation. |
| env | <code>number</code> | A pointer to an optional clipping envelope (GEOSGeometry). If provided, only cells which lie in this envelope will be included in the result. This can be used to avoid constructing very large cells (such as those which are far away from all sites). If NULL, no clipping envelope is used. |
| tolerance | <code>number</code> | The snapping tolerance to use for improved robustness. A tolerance of 0.0 specifies that no snapping will take place. |
| onlyEdges | <code>number</code> | If non-zero, only the edges of the Voronoi diagram will be returned, forming a multilinestring. If zero, the cells will be returned as a collection of polygons. |


---
