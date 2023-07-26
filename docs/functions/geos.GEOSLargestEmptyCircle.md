<a name="exp_module_geos--geos.GEOSLargestEmptyCircle"></a>

## geos.GEOSLargestEmptyCircle ⇒ <code>number</code> ⏏
Constructs the "largest empty circle" (LEC) for a set of obstacle geometries and within a polygonal boundary, with accuracy to to a specified distance tolerance. The obstacles may be any collection of points, lines and polygons. The LEC is the largest circle whose interior does not intersect with any obstacle. and which has its center inside the given boundary. If no boundary is provided, the convex hull of the obstacles is used. The LEC center is the point in the interior of the boundary which has the farthest distance from the obstacles (up to the given distance tolerance). The LEC is determined by the center point and a point indicating the circle radius (which will lie on an obstacle).
To compute an LEC which lies wholly within a polygonal boundary, include the boundary of the polygon(s) as a linear obstacle.
The implementation uses a successive-approximation technique over a grid of square cells covering the obstacles and boundary. The grid is refined using a branch-and-bound algorithm. Point containment and distance are computed in a performant way by using spatial indexes.
Returns the LEC radius as a two-point linestring, with the start point at the center of the inscribed circle and the end on the boundary of the circle.

**Kind**: Exported member  
**Returns**: <code>number</code> - The pointer to the output geometry, or NULL on exception.  

| Param | Type | Description |
| --- | --- | --- |
| g | <code>number</code> | The pointer to the input obstacle geometry. |
| boundary | <code>number</code> | The pointer to the input boundary geometry, or NULL if not provided. |
| tolerance | <code>number</code> | The distance tolerance for computing the center point and radius. |


---
<a name="exp_module_geos--geos.GEOSLargestEmptyCircle_r"></a>

## geos.GEOSLargestEmptyCircle\_r ⇒ <code>number</code> ⏏
Constructs the "largest empty circle" (LEC) for a set of obstacle geometries and within a polygonal boundary, with accuracy to to a specified distance tolerance. The obstacles may be any collection of points, lines and polygons. The LEC is the largest circle whose interior does not intersect with any obstacle. and which has its center inside the given boundary. If no boundary is provided, the convex hull of the obstacles is used. The LEC center is the point in the interior of the boundary which has the farthest distance from the obstacles (up to the given distance tolerance). The LEC is determined by the center point and a point indicating the circle radius (which will lie on an obstacle).
To compute an LEC which lies wholly within a polygonal boundary, include the boundary of the polygon(s) as a linear obstacle.
The implementation uses a successive-approximation technique over a grid of square cells covering the obstacles and boundary. The grid is refined using a branch-and-bound algorithm. Point containment and distance are computed in a performant way by using spatial indexes.
Returns the LEC radius as a two-point linestring, with the start point at the center of the inscribed circle and the end on the boundary of the circle.

**Kind**: Exported member  
**Returns**: <code>number</code> - The pointer to the output geometry, or NULL on exception.  

| Param | Type | Description |
| --- | --- | --- |
| handle | <code>number</code> | A pointer to the GEOS context handle. |
| g | <code>number</code> | The pointer to the input obstacle geometry. |
| boundary | <code>number</code> | The pointer to the input boundary geometry, or NULL if not provided. |
| tolerance | <code>number</code> | The distance tolerance for computing the center point and radius. |


---
