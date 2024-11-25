<a name="exp_module_geos--geos.GEOSConcaveHull"></a>

## geos.GEOSConcaveHull ⇒ [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) ⏏
Returns a "concave hull" of a geometry. A concave hull is a polygon which contains all the points of the input, but is a better approximation than the convex hull to the area occupied by the input. Frequently used to convert a multi-point into a polygonal area. that contains all the points in the input Geometry.

**Kind**: global property of [<code>geos</code>](/typedefs-enums/typedefs-enums.html#module_geos)  
**Returns**: [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) - A newly allocated geometry of the concave hull. NULL on exception.  

| Param | Type | Description |
| --- | --- | --- |
| g | [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) | The input geometry |
| ratio | <code>number</code> | The edge length ratio value, between 0 and 1. |
| allowHoles | <code>number</code> | When non-zero, the polygonal output may contain holes. |


---
<a name="exp_module_geos--geos.GEOSConcaveHullByLength"></a>

## geos.GEOSConcaveHullByLength ⇒ [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) ⏏
Returns a "concave hull" of a geometry. A concave hull is a polygon which contains all the points of the input, but is a better approximation than the convex hull to the area occupied by the input. Frequently used to convert a multi-point into a polygonal area. that contains all the points in the input Geometry.

**Kind**: global property of [<code>geos</code>](/typedefs-enums/typedefs-enums.html#module_geos)  
**Returns**: [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) - A newly allocated geometry of the concave hull. NULL on exception.  

| Param | Type | Description |
| --- | --- | --- |
| g | [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) | The input geometry |
| length | <code>number</code> | The maximum edge length (0 or greater) |
| allowHoles | <code>number</code> | When non-zero, the polygonal output may contain holes. |


---
<a name="exp_module_geos--geos.GEOSConcaveHullByLength_r"></a>

## geos.GEOSConcaveHullByLength\_r ⇒ [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) ⏏
Returns a "concave hull" of a geometry. A concave hull is a polygon which contains all the points of the input, but is a better approximation than the convex hull to the area occupied by the input. Frequently used to convert a multi-point into a polygonal area. that contains all the points in the input Geometry.

**Kind**: global property of [<code>geos</code>](/typedefs-enums/typedefs-enums.html#module_geos)  
**Returns**: [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) - A newly allocated geometry of the concave hull. NULL on exception.  

| Param | Type | Description |
| --- | --- | --- |
| handle | [<code>GEOSContextHandle\_t</code>](/typedefs-enums/typedefs-enums.html#GEOSContextHandle_t) | - |
| g | [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) | The input geometry |
| ratio | <code>number</code> | The maximum edge length (0 or greater) |
| allowHoles | <code>number</code> | When non-zero, the polygonal output may contain holes. |


---
<a name="exp_module_geos--geos.GEOSConcaveHullOfPolygons"></a>

## geos.GEOSConcaveHullOfPolygons ⇒ [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) ⏏
Constructs a concave hull of a set of polygons, respecting the polygons as constraints.

**Kind**: global property of [<code>geos</code>](/typedefs-enums/typedefs-enums.html#module_geos)  
**Returns**: [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) - A newly allocated geometry of the concave hull. NULL on exception.  

| Param | Type | Description |
| --- | --- | --- |
| g | [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) | the valid MultiPolygon geometry to process |
| lengthRatio | <code>number</code> | specifies the Maximum Edge Length as a fraction of the difference between the longest and shortest edge lengths between the polygons. This normalizes the Maximum Edge Length to be scale-free. A value of 1 produces the convex hull; a value of 0 produces the original polygons. |
| isTight | <code>number</code> | is the concave hull allowed to contain holes? |
| isHolesAllowed | <code>number</code> | does the hull follow the outer boundaries of the input polygons. |


---
<a name="exp_module_geos--geos.GEOSConcaveHullOfPolygons_r"></a>

## geos.GEOSConcaveHullOfPolygons\_r ⇒ [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) ⏏
Constructs a concave hull of a set of polygons, respecting the polygons as constraints.

**Kind**: global property of [<code>geos</code>](/typedefs-enums/typedefs-enums.html#module_geos)  
**Returns**: [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) - A newly allocated geometry of the concave hull. NULL on exception.  

| Param | Type | Description |
| --- | --- | --- |
| handle | [<code>GEOSContextHandle\_t</code>](/typedefs-enums/typedefs-enums.html#GEOSContextHandle_t) | - |
| g | [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) | the valid MultiPolygon geometry to process |
| lengthRatio | <code>number</code> | specifies the Maximum Edge Length as a fraction of the difference between the longest and shortest edge lengths between the polygons. This normalizes the Maximum Edge Length to be scale-free. A value of 1 produces the convex hull; a value of 0 produces the original polygons. |
| isTight | <code>number</code> | is the concave hull allowed to contain holes? |
| isHolesAllowed | <code>number</code> | does the hull follow the outer boundaries of the input polygons. |


---
<a name="exp_module_geos--geos.GEOSConcaveHull_r"></a>

## geos.GEOSConcaveHull\_r ⇒ [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) ⏏
Returns a "concave hull" of a geometry. A concave hull is a polygon which contains all the points of the input, but is a better approximation than the convex hull to the area occupied by the input. Frequently used to convert a multi-point into a polygonal area. that contains all the points in the input Geometry.

**Kind**: global property of [<code>geos</code>](/typedefs-enums/typedefs-enums.html#module_geos)  
**Returns**: [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) - A newly allocated geometry of the concave hull. NULL on exception.  

| Param | Type | Description |
| --- | --- | --- |
| handle | [<code>GEOSContextHandle\_t</code>](/typedefs-enums/typedefs-enums.html#GEOSContextHandle_t) | - |
| g | [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) | The input geometry |
| ratio | <code>number</code> | The edge length ratio value, between 0 and 1. |
| allowHoles | <code>number</code> | When non-zero, the polygonal output may contain holes. |


---
