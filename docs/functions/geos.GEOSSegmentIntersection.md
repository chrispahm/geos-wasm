<a name="exp_module_geos--geos.GEOSSegmentIntersection"></a>

## geos.GEOSSegmentIntersection ⇒ <code>number</code> ⏏
Computes the intersection point of two line segments, if there is one.

**Kind**: Exported member  
**Returns**: <code>number</code> - 1 if an intersection point is found, 0 if no intersection point is found, or -1 on error.  

| Param | Type | Description |
| --- | --- | --- |
| p0x | <code>number</code> | The x-coordinate of the first endpoint of the first segment. |
| p0y | <code>number</code> | The y-coordinate of the first endpoint of the first segment. |
| p1x | <code>number</code> | The x-coordinate of the second endpoint of the first segment. |
| p1y | <code>number</code> | The y-coordinate of the second endpoint of the first segment. |
| q0x | <code>number</code> | The x-coordinate of the first endpoint of the second segment. |
| q0y | <code>number</code> | The y-coordinate of the first endpoint of the second segment. |
| q1x | <code>number</code> | The x-coordinate of the second endpoint of the second segment. |
| q1y | <code>number</code> | The y-coordinate of the second endpoint of the second segment. |
| rx | <code>number</code> | A pointer to a double where the x-coordinate of the intersection point will be stored, if any. |
| ry | <code>number</code> | A pointer to a double where the y-coordinate of the intersection point will be stored, if any. |


---
<a name="exp_module_geos--geos.GEOSSegmentIntersection_r"></a>

## geos.GEOSSegmentIntersection\_r ⇒ <code>number</code> ⏏
Computes the intersection point of two line segments, if there is one. This is a reentrant version that takes a GEOS context handle as an argument.

**Kind**: Exported member  
**Returns**: <code>number</code> - 1 if an intersection point is found, 0 if no intersection point is found, or -1 on error.  

| Param | Type | Description |
| --- | --- | --- |
| handle | <code>number</code> | A pointer to the GEOS context handle. |
| p0x | <code>number</code> | The x-coordinate of the first endpoint of the first segment. |
| p0y | <code>number</code> | The y-coordinate of the first endpoint of the first segment. |
| p1x | <code>number</code> | The x-coordinate of the second endpoint of the first segment. |
| p1y | <code>number</code> | The y-coordinate of the second endpoint of the first segment. |
| q0x | <code>number</code> | The x-coordinate of the first endpoint of the second segment. |
| q0y | <code>number</code> | The y-coordinate of the first endpoint of the second segment. |
| q1x | <code>number</code> | The x-coordinate of the second endpoint of the second segment. |
| q1y | <code>number</code> | The y-coordinate of the second endpoint of the second segment. |
| rx | <code>number</code> | A pointer to a double where the x-coordinate of the intersection point will be stored, if any. |
| ry | <code>number</code> | A pointer to a double where the y-coordinate of the intersection point will be stored, if any. |


---
