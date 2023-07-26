<a name="exp_module_geos--geos.GEOSMinimumBoundingCircle"></a>

## geos.GEOSMinimumBoundingCircle ⇒ <code>number</code> ⏏
Returns a geometry which represents the "minimum bounding circle", the smallest circle that contains the input.

**Kind**: Exported member  
**Returns**: <code>number</code> - A pointer to a GEOS geometry object representing the minimum bounding circle, or NULL on error.  
**See**: https://libgeos.org/doxygen/geos__c_8h.html#af09ef325324bec3c1ccb981db52eec4f  

| Param | Type | Description |
| --- | --- | --- |
| geom | <code>number</code> | A pointer to a GEOS geometry object. |
| radius | <code>number</code> | A pointer to a double that will store the radius of the circle. |
| center | <code>number</code> | A pointer to a GEOS geometry object that will store the center point of the circle. |


---
<a name="exp_module_geos--geos.GEOSMinimumBoundingCircle_r"></a>

## geos.GEOSMinimumBoundingCircle\_r ⇒ <code>number</code> ⏏
Returns a geometry which represents the "minimum bounding circle", the smallest circle that contains the input.

**Kind**: Exported member  
**Returns**: <code>number</code> - A pointer to a GEOS geometry object representing the minimum bounding circle, or NULL on error.  
**See**: https://libgeos.org/doxygen/geos__c_8h.html#af09ef325324bec3c1ccb981db52eec4f  

| Param | Type | Description |
| --- | --- | --- |
| handle | <code>number</code> | A pointer to a GEOS context handle. |
| geom | <code>number</code> | A pointer to a GEOS geometry object. |
| radius | <code>number</code> | A pointer to a double that will store the radius of the circle. |
| center | <code>number</code> | A pointer to a GEOS geometry object that will store the center point of the circle. |


---
