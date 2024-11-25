<a name="exp_module_geos--geos.GEOSOrientationIndex"></a>

## geos.GEOSOrientationIndex ⇒ <code>number</code> ⏏
For the points formed by the six input ordinates, walking from A to B and then to P.

**Kind**: global property of [<code>geos</code>](/typedefs-enums/typedefs-enums.html#module_geos)  
**Returns**: <code>number</code> - -1 if reaching P takes a counter-clockwise (left) turn, 1 if reaching P takes a clockwise (right) turn, 0 if P is collinear with A-B  

| Param | Type | Description |
| --- | --- | --- |
| Ax | <code>number</code> | X coordinate of A |
| Ay | <code>number</code> | Y coordinate of A |
| Bx | <code>number</code> | X coordinate of B |
| By | <code>number</code> | Y coordinate of B |
| Px | <code>number</code> | X coordinate of P |
| Py | <code>number</code> | Y coordinate of P |


---
<a name="exp_module_geos--geos.GEOSOrientationIndex_r"></a>

## geos.GEOSOrientationIndex\_r ⇒ <code>number</code> ⏏
For the points formed by the six input ordinates, walking from A to B and then to P.

**Kind**: global property of [<code>geos</code>](/typedefs-enums/typedefs-enums.html#module_geos)  
**Returns**: <code>number</code> - -1 if reaching P takes a counter-clockwise (left) turn, 1 if reaching P takes a clockwise (right) turn, 0 if P is collinear with A-B  

| Param | Type | Description |
| --- | --- | --- |
| handle | [<code>GEOSContextHandle\_t</code>](/typedefs-enums/typedefs-enums.html#GEOSContextHandle_t) | - |
| Ax | <code>number</code> | X coordinate of A |
| Ay | <code>number</code> | Y coordinate of A |
| Bx | <code>number</code> | X coordinate of B |
| By | <code>number</code> | Y coordinate of B |
| Px | <code>number</code> | X coordinate of P |
| Py | <code>number</code> | Y coordinate of P |


---
