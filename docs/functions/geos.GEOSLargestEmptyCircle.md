<a name="exp_module_geos--geos.GEOSLargestEmptyCircle"></a>

## geos.GEOSLargestEmptyCircle ⇒ [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) ⏏
Constructs the "largest empty circle" (LEC) for a set of obstacle geometries and within a polygonal boundary, with accuracy to to a specified distance tolerance. The obstacles may be any collection of points, lines and polygons. The LEC is the largest circle whose interior does not intersect with any obstacle. and which has its center inside the given boundary. If no boundary is provided, the convex hull of the obstacles is used. The LEC center is the point in the interior of the boundary which has the farthest distance from the obstacles (up to the given distance tolerance). The LEC is determined by the center point and a point indicating the circle radius (which will lie on an obstacle).
To compute an LEC which lies wholly within a polygonal boundary, include the boundary of the polygon(s) as a linear obstacle.
The implementation uses a successive-approximation technique over a grid of square cells covering the obstacles and boundary. The grid is refined using a branch-and-bound algorithm. Point containment and distance are computed in a performant way by using spatial indexes.
Returns the LEC radius as a two-point linestring, with the start point at the center of the inscribed circle and the end on the boundary of the circle.

**Kind**: global property of [<code>geos</code>](/typedefs-enums/typedefs-enums.html#module_geos)  
**Returns**: [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) - A newly allocated geometry of the LEC radius line. NULL on exception. Caller is responsible for freeing with GEOSGeom_destroy().  

| Param | Type | Description |
| --- | --- | --- |
| obstacles | [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) | The geometries that the LEC must not cross |
| boundary | [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) | The area to contain the LEC center (may be null or empty) |
| tolerance | <code>number</code> | Stop the algorithm when the search area is smaller than this tolerance |


---
<a name="exp_module_geos--geos.GEOSLargestEmptyCircle_r"></a>

## geos.GEOSLargestEmptyCircle\_r ⇒ [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) ⏏
Constructs the "largest empty circle" (LEC) for a set of obstacle geometries and within a polygonal boundary, with accuracy to to a specified distance tolerance. The obstacles may be any collection of points, lines and polygons. The LEC is the largest circle whose interior does not intersect with any obstacle. and which has its center inside the given boundary. If no boundary is provided, the convex hull of the obstacles is used. The LEC center is the point in the interior of the boundary which has the farthest distance from the obstacles (up to the given distance tolerance). The LEC is determined by the center point and a point indicating the circle radius (which will lie on an obstacle).
To compute an LEC which lies wholly within a polygonal boundary, include the boundary of the polygon(s) as a linear obstacle.
The implementation uses a successive-approximation technique over a grid of square cells covering the obstacles and boundary. The grid is refined using a branch-and-bound algorithm. Point containment and distance are computed in a performant way by using spatial indexes.
Returns the LEC radius as a two-point linestring, with the start point at the center of the inscribed circle and the end on the boundary of the circle.

**Kind**: global property of [<code>geos</code>](/typedefs-enums/typedefs-enums.html#module_geos)  
**Returns**: [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) - A newly allocated geometry of the LEC radius line. NULL on exception. Caller is responsible for freeing with GEOSGeom_destroy().  

| Param | Type | Description |
| --- | --- | --- |
| handle | [<code>GEOSContextHandle\_t</code>](/typedefs-enums/typedefs-enums.html#GEOSContextHandle_t) | - |
| g | [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) | The geometries that the LEC must not cross |
| boundary | [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) | The area to contain the LEC center (may be null or empty) |
| tolerance | <code>number</code> | Stop the algorithm when the search area is smaller than this tolerance |


---
