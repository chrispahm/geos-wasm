<a name="exp_module_geos--geos.GEOSSegmentIntersection"></a>

## geos.GEOSSegmentIntersection ⇒ <code>number</code> ⏏
Computes the coordinate where two line segments intersect, if any

**Kind**: global property of [<code>geos</code>](/typedefs-enums/typedefs-enums.html#module_geos)  
**Returns**: <code>number</code> - 0 on error, 1 on success, -1 if segments do not intersect  

| Param | Type | Description |
| --- | --- | --- |
| ax0 | <code>number</code> | x-coordinate of 1st point in 1st segment |
| ay0 | <code>number</code> | y-coordinate of 1st point in 1st segment |
| ax1 | <code>number</code> | x-coordinate of 2nd point in 1st segment |
| ay1 | <code>number</code> | y-coordinate of 2nd point in 1st segment |
| bx0 | <code>number</code> | x-coordinate of 1st point in 2nd segment |
| by0 | <code>number</code> | y-coordinate of 1st point in 2nd segment |
| bx1 | <code>number</code> | x-coordinate of 2nd point in 2nd segment |
| by1 | <code>number</code> | y-coordinate of 2nd point in 2nd segment |
| cx | [<code>NumberPointer</code>](/typedefs-enums/typedefs-enums.html#NumberPointer) | x-coordinate of intersection point |
| cy | [<code>NumberPointer</code>](/typedefs-enums/typedefs-enums.html#NumberPointer) | y-coordinate of intersection point |


---
<a name="exp_module_geos--geos.GEOSSegmentIntersection_r"></a>

## geos.GEOSSegmentIntersection\_r ⇒ <code>number</code> ⏏
Computes the coordinate where two line segments intersect, if any

**Kind**: global property of [<code>geos</code>](/typedefs-enums/typedefs-enums.html#module_geos)  
**Returns**: <code>number</code> - 0 on error, 1 on success, -1 if segments do not intersect  

| Param | Type | Description |
| --- | --- | --- |
| extHandle | [<code>GEOSContextHandle\_t</code>](/typedefs-enums/typedefs-enums.html#GEOSContextHandle_t) | - |
| ax0 | <code>number</code> | x-coordinate of 1st point in 1st segment |
| ay0 | <code>number</code> | y-coordinate of 1st point in 1st segment |
| ax1 | <code>number</code> | x-coordinate of 2nd point in 1st segment |
| ay1 | <code>number</code> | y-coordinate of 2nd point in 1st segment |
| bx0 | <code>number</code> | x-coordinate of 1st point in 2nd segment |
| by0 | <code>number</code> | y-coordinate of 1st point in 2nd segment |
| bx1 | <code>number</code> | x-coordinate of 2nd point in 2nd segment |
| by1 | <code>number</code> | y-coordinate of 2nd point in 2nd segment |
| cx | [<code>NumberPointer</code>](/typedefs-enums/typedefs-enums.html#NumberPointer) | x-coordinate of intersection point |
| cy | [<code>NumberPointer</code>](/typedefs-enums/typedefs-enums.html#NumberPointer) | y-coordinate of intersection point |


---
