<a name="exp_module_geos--geos.GEOSDelaunayTriangulation"></a>

## geos.GEOSDelaunayTriangulation ⇒ <code>number</code> ⏏
Computes a Delaunay triangulation of the vertices of the given geometry.

**Kind**: Exported member  
**Returns**: <code>number</code> - A pointer to the geometry representing the Delaunay triangulation. Returns NULL on exception.  

| Param | Type | Description |
| --- | --- | --- |
| g | <code>number</code> | The geometry pointer whose vertices to triangulate. |
| tolerance | <code>number</code> | The snapping tolerance to use for improved robustness. A tolerance of 0.0 specifies that no snapping will take place. |
| onlyEdges | <code>number</code> | If non-zero, only the edges of the triangulation will be returned, forming a multilinestring. If zero, the triangles will be returned as a collection of polygons. |


---
<a name="exp_module_geos--geos.GEOSDelaunayTriangulation_r"></a>

## geos.GEOSDelaunayTriangulation\_r ⇒ <code>number</code> ⏏
Computes a Delaunay triangulation of the vertices of the given geometry using a GEOS context handle.

**Kind**: Exported member  
**Returns**: <code>number</code> - A pointer to the geometry representing the Delaunay triangulation. Returns NULL on exception.  

| Param | Type | Description |
| --- | --- | --- |
| handle | <code>number</code> | The GEOS context pointer handle. |
| g | <code>number</code> | The geometry pointer whose vertices to triangulate. |
| tolerance | <code>number</code> | The snapping tolerance to use for improved robustness. A tolerance of 0.0 specifies that no snapping will take place. |
| onlyEdges | <code>number</code> | If non-zero, only the edges of the triangulation will be returned, forming a multilinestring. If zero, the triangles will be returned as a collection of polygons. |


---
