<a name="exp_module_geos--geos.GEOSMinimumBoundingCircle"></a>

## geos.GEOSMinimumBoundingCircle ⇒ <code>number</code> ⏏
Computes the minimum bounding circle for a geometry.

**Kind**: Exported member  
**Returns**: <code>number</code> - A pointer to a GEOS geometry object representing the minimum bounding circle, or NULL on error.  
**See**: https://postgis.net/docs/ST_MinimumBoundingCircle.html  

| Param | Type | Description |
| --- | --- | --- |
| geom | <code>number</code> | A pointer to a GEOS geometry object. |
| center | <code>number</code> | A pointer to a GEOS geometry object that will store the center point of the circle. |
| radius | <code>number</code> | A pointer to a double that will store the radius of the circle. |


---
<a name="exp_module_geos--geos.GEOSMinimumBoundingCircle_r"></a>

## geos.GEOSMinimumBoundingCircle\_r ⇒ <code>number</code> ⏏
Computes the minimum bounding circle for a geometry using a thread-safe context handle.

**Kind**: Exported member  
**Returns**: <code>number</code> - A pointer to a GEOS geometry object representing the minimum bounding circle, or NULL on error.  
**See**: https://rdrr.io/cran/geos/man/geos_minimum_bounding_circle.html  

| Param | Type | Description |
| --- | --- | --- |
| handle | <code>number</code> | A pointer to a GEOS context handle. |
| geom | <code>number</code> | A pointer to a GEOS geometry object. |
| center | <code>number</code> | A pointer to a GEOS geometry object that will store the center point of the circle. |
| radius | <code>number</code> | A pointer to a double that will store the radius of the circle. |


---
