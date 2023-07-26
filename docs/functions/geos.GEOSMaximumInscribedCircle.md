<a name="exp_module_geos--geos.GEOSMaximumInscribedCircle"></a>

## geos.GEOSMaximumInscribedCircle ⇒ <code>number</code> ⏏
Constructs the "maximum inscribed circle" (MIC) for a polygonal geometry, up to a specified tolerance. The MIC is determined by a point in the interior of the area which has the farthest distance from the area boundary, along with a boundary point at that distance. In the context of geography the center of the MIC is known as the "pole of inaccessibility". A cartographic use case is to determine a suitable point to place a map label within a polygon. The radius length of the MIC is a measure of how "narrow" a polygon is. It is the distance at which the negative buffer becomes empty. The class supports polygons with holes and multipolygons. The implementation uses a successive-approximation technique over a grid of square cells covering the area geometry. The grid is refined using a branch-and-bound algorithm. Point containment and distance are computed in a performant way by using spatial indexes. Returns a two-point linestring, with one point at the center of the inscribed circle and the other on the boundary of the inscribed circle.

**Kind**: Exported member  
**Returns**: <code>number</code> - The pointer to the output geometry, or NULL on exception.  

| Param | Type | Description |
| --- | --- | --- |
| g | <code>number</code> | The pointer to the input geometry. |
| tolerance | <code>number</code> | The distance tolerance for computing the center point. |


---
<a name="exp_module_geos--geos.GEOSMaximumInscribedCircle_r"></a>

## geos.GEOSMaximumInscribedCircle\_r ⇒ <code>number</code> ⏏
Constructs the "maximum inscribed circle" (MIC) for a polygonal geometry, up to a specified tolerance. The MIC is determined by a point in the interior of the area which has the farthest distance from the area boundary, along with a boundary point at that distance. In the context of geography the center of the MIC is known as the "pole of inaccessibility". A cartographic use case is to determine a suitable point to place a map label within a polygon. The radius length of the MIC is a measure of how "narrow" a polygon is. It is the distance at which the negative buffer becomes empty. The class supports polygons with holes and multipolygons. The implementation uses a successive-approximation technique over a grid of square cells covering the area geometry. The grid is refined using a branch-and-bound algorithm. Point containment and distance are computed in a performant way by using spatial indexes. Returns a two-point linestring, with one point at the center of the inscribed circle and the other on the boundary of the inscribed circle.

**Kind**: Exported member  
**Returns**: <code>number</code> - The pointer to the output geometry, or NULL on exception.  

| Param | Type | Description |
| --- | --- | --- |
| handle | <code>number</code> | A pointer to the GEOS context handle. |
| g | <code>number</code> | The pointer to the input geometry. |
| tolerance | <code>number</code> | The distance tolerance for computing the center point. |


---
