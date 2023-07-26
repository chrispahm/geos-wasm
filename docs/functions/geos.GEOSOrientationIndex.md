<a name="exp_module_geos--geos.GEOSOrientationIndex"></a>

## geos.GEOSOrientationIndex ⇒ <code>number</code> ⏏
Computes the orientation index of the direction of the point q relative to a directed infinite line specified by p1-p2.
The index indicates whether the point lies to the LEFT or RIGHT of the line, or lies on it COLLINEAR.
The index also indicates the orientation of the triangle formed by the three points (COUNTERCLOCKWISE, CLOCKWISE, or STRAIGHT).

**Kind**: Exported member  
**Returns**: <code>number</code> - The orientation index: 1 (LEFT), 0 (COLLINEAR), or -1 (RIGHT).  
**See**: https://libgeos.org/doxygen/classgeos_1_1algorithm_1_1Orientation.html#a5b9f8c4a7c6f0a3f3a4e7c8d6b9a5d7b  

| Param | Type | Description |
| --- | --- | --- |
| ax | <code>number</code> | The x coordinate of p1. |
| ay | <code>number</code> | The y coordinate of p1. |
| bx | <code>number</code> | The x coordinate of p2. |
| by | <code>number</code> | The y coordinate of p2. |
| px | <code>number</code> | The x coordinate of q. |
| py | <code>number</code> | The y coordinate of q. |


---
<a name="exp_module_geos--geos.GEOSOrientationIndex_r"></a>

## geos.GEOSOrientationIndex\_r ⇒ <code>number</code> ⏏
Computes the orientation index of the direction of the point q relative to
the directed line segment p1-p2.

**Kind**: Exported member  
**Returns**: <code>number</code> - -1 if q lies to the left of p1-p2, 0 if q is collinear with p1-p2, 1 if q lies to the right of p1-p2.  
**See**: [https://libgeos.org/doxygen/geos__c_8h.html](https://libgeos.org/doxygen/geos__c_8h.html)  

| Param | Type | Description |
| --- | --- | --- |
| handle | <code>number</code> | A pointer to the GEOS context handle. |
| Ax | <code>number</code> | The x-coordinate of the first point of the line segment. |
| Ay | <code>number</code> | The y-coordinate of the first point of the line segment. |
| Bx | <code>number</code> | The x-coordinate of the second point of the line segment. |
| By | <code>number</code> | The y-coordinate of the second point of the line segment. |
| Px | <code>number</code> | The x-coordinate of the point to test. |
| Py | <code>number</code> | The y-coordinate of the point to test. |


---
