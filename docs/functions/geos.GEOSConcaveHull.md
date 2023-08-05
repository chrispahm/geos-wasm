<a name="exp_module_geos--geos.GEOSConcaveHull"></a>

## geos.GEOSConcaveHull ⇒ <code>number</code> ⏏
Returns a "concave hull" of a geometry. A concave hull is a polygon which contains all the points of the input, but is a better approximation than the convex hull to the area occupied by the input. Frequently used to convert a multi-point into a polygonal area. that contains all the points in the input Geometry.

A set of points has a sequence of hulls of increasing concaveness, determined by a numeric target parameter. The concave hull is constructed by removing the longest outer edges of the Delaunay Triangulation of the space between the polygons, until the target criterion parameter is reached. This can be expressed as a ratio between the lengths of the longest and shortest edges. 1 produces the convex hull; 0 produces a hull with maximum concaveness

**Kind**: Exported member  
**Returns**: <code>number</code> - A newly allocated geometry of the concave hull. NULL on exception.  

| Param | Type | Description |
| --- | --- | --- |
| geom | <code>number</code> | A pointer to a GEOSGeometry object. |
| ratio | <code>number</code> | The edge length ratio value, between 0 and 1. |
| allowHoles | <code>number</code> | When non-zero, the polygonal output may contain holes. |


---
<a name="exp_module_geos--geos.GEOSConcaveHullByLength"></a>

## geos.GEOSConcaveHullByLength ⇒ <code>number</code> ⏏
Returns a "concave hull" of a geometry. A concave hull is a polygon which contains all the points of the input, but is a better approximation than the convex hull to the area occupied by the input. Frequently used to convert a multi-point into a polygonal area. that contains all the points in the input Geometry.

A set of points has a sequence of hulls of increasing concaveness, determined by a numeric target parameter. The concave hull is constructed by removing the longest outer edges of the Delaunay Triangulation of the space between the polygons, until the specified maximm edge length is reached. A large value produces the convex hull, 0 produces the hull of maximim concaveness.

**Kind**: Exported member  
**Returns**: <code>number</code> - A newly allocated geometry of the concave hull. NULL on exception.  

| Param | Type | Description |
| --- | --- | --- |
| geom | <code>number</code> | A pointer to a GEOSGeometry object. |
| length | <code>number</code> | The maximum edge length (0 or greater). |
| allowHoles | <code>number</code> | When non-zero, the polygonal output may contain holes. |


---
<a name="exp_module_geos--geos.GEOSConcaveHullByLength_r"></a>

## geos.GEOSConcaveHullByLength\_r ⇒ <code>number</code> ⏏
Returns a "concave hull" of a geometry. A concave hull is a polygon which contains all the points of the input, but is a better approximation than the convex hull to the area occupied by the input. Frequently used to convert a multi-point into a polygonal area. that contains all the points in the input Geometry.

A set of points has a sequence of hulls of increasing concaveness, determined by a numeric target parameter. The concave hull is constructed by removing the longest outer edges of the Delaunay Triangulation of the space between the polygons, until the specified maximm edge length is reached. A large value produces the convex hull, 0 produces the hull of maximim concaveness.

**Kind**: Exported member  
**Returns**: <code>number</code> - A newly allocated geometry of the concave hull. NULL on exception.  

| Param | Type | Description |
| --- | --- | --- |
| handle | <code>number</code> | A pointer to the GEOS context handle. |
| geom | <code>number</code> | A pointer to a GEOSGeometry object. |
| length | <code>number</code> | The maximum edge length (0 or greater). |
| allowHoles | <code>number</code> | When non-zero, the polygonal output may contain holes. |


---
<a name="exp_module_geos--geos.GEOSConcaveHullOfPolygons"></a>

## geos.GEOSConcaveHullOfPolygons ⇒ <code>number</code> ⏏
Constructs a concave hull of a set of polygons, respecting the polygons as constraints.
A concave hull is a (possibly) non-convex polygon containing all the input polygons. The computed hull "fills the gap" between the polygons, and does not intersect their interior. A set of polygons has a sequence of hulls of increasing concaveness, determined by a numeric target parameter.
The concave hull is constructed by removing the longest outer edges of the Delaunay Triangulation of the space between the polygons, until the target criterion parameter is reached. The "Maximum Edge Length" parameter limits the length of the longest edge between polygons to be no larger than this value. This can be expressed as a ratio between the lengths of the longest and shortest edges.
The input polygons must be a valid MultiPolygon (i.e. they must be non-overlapping).

**Kind**: Exported member  
**Returns**: <code>number</code> - A newly allocated geometry of the concave hull. NULL on exception.  

| Param | Type | Description |
| --- | --- | --- |
| geom | <code>number</code> | A pointer to a GEOSGeometry object. |
| lengthRatio | <code>number</code> | specifies the Maximum Edge Length as a fraction of the difference between the longest and shortest edge lengths between the polygons. This normalizes the Maximum Edge Length to be scale-free. A value of 1 produces the convex hull; a value of 0 produces the original polygons. |
| isTight | <code>number</code> | does the hull follow the outer boundaries of the input polygons. |
| isHolesAllowed | <code>number</code> | is the concave hull allowed to contain holes? |


---
<a name="exp_module_geos--geos.GEOSConcaveHullOfPolygons_r"></a>

## geos.GEOSConcaveHullOfPolygons\_r ⇒ <code>number</code> ⏏
Constructs a concave hull of a set of polygons, respecting the polygons as constraints.
A concave hull is a (possibly) non-convex polygon containing all the input polygons. The computed hull "fills the gap" between the polygons, and does not intersect their interior. A set of polygons has a sequence of hulls of increasing concaveness, determined by a numeric target parameter.
The concave hull is constructed by removing the longest outer edges of the Delaunay Triangulation of the space between the polygons, until the target criterion parameter is reached. The "Maximum Edge Length" parameter limits the length of the longest edge between polygons to be no larger than this value. This can be expressed as a ratio between the lengths of the longest and shortest edges.
The input polygons must be a valid MultiPolygon (i.e. they must be non-overlapping).

**Kind**: Exported member  
**Returns**: <code>number</code> - A newly allocated geometry of the concave hull. NULL on exception.  

| Param | Type | Description |
| --- | --- | --- |
| handle | <code>number</code> | A pointer to the GEOS context handle. |
| geom | <code>number</code> | A pointer to a GEOSGeometry object. |
| lengthRatio | <code>number</code> | specifies the Maximum Edge Length as a fraction of the difference between the longest and shortest edge lengths between the polygons. This normalizes the Maximum Edge Length to be scale-free. A value of 1 produces the convex hull; a value of 0 produces the original polygons. |
| isTight | <code>number</code> | does the hull follow the outer boundaries of the input polygons. |
| isHolesAllowed | <code>number</code> | is the concave hull allowed to contain holes? |


---
<a name="exp_module_geos--geos.GEOSConcaveHull_r"></a>

## geos.GEOSConcaveHull\_r ⇒ <code>number</code> ⏏
Returns a "concave hull" of a geometry. A concave hull is a polygon which contains all the points of the input, but is a better approximation than the convex hull to the area occupied by the input. Frequently used to convert a multi-point into a polygonal area. that contains all the points in the input Geometry.

A set of points has a sequence of hulls of increasing concaveness, determined by a numeric target parameter. The concave hull is constructed by removing the longest outer edges of the Delaunay Triangulation of the space between the polygons, until the target criterion parameter is reached. This can be expressed as a ratio between the lengths of the longest and shortest edges. 1 produces the convex hull; 0 produces a hull with maximum concaveness

**Kind**: Exported member  
**Returns**: <code>number</code> - A newly allocated geometry of the concave hull. NULL on exception.  

| Param | Type | Description |
| --- | --- | --- |
| handle | <code>number</code> | A pointer to the GEOS context handle. |
| geom | <code>number</code> | A pointer to a GEOSGeometry object. |
| ratio | <code>number</code> | The edge length ratio value, between 0 and 1. |
| allowHoles | <code>number</code> | When non-zero, the polygonal output may contain holes. |


---
