<a name="exp_module_geos--geos.GEOSConvexHull"></a>

## geos.GEOSConvexHull ⇒ <code>number</code> ⏏
Computes the convex hull of a geometry. The convex hull is the smallest convex geometry that contains all the points in the input geometry.

**Kind**: Exported member  
**Returns**: <code>number</code> - A pointer to a new GEOSGeometry object representing the convex hull, or NULL on exception.  
**See**: https://libgeos.org/doxygen/classgeos_1_1algorithm_1_1ConvexHull.html  

| Param | Type | Description |
| --- | --- | --- |
| geom | <code>number</code> | A pointer to a GEOSGeometry object. |


---
<a name="exp_module_geos--geos.GEOSConvexHull_r"></a>

## geos.GEOSConvexHull\_r ⇒ <code>number</code> ⏏
Computes the convex hull of a geometry using a handle. The convex hull is the smallest convex geometry that contains all the points in the input geometry.

**Kind**: Exported member  
**Returns**: <code>number</code> - A pointer to a new GEOSGeometry object representing the convex hull, or NULL on exception.  
**See**: https://libgeos.org/doxygen/classgeos_1_1algorithm_1_1ConvexHull.html  

| Param | Type | Description |
| --- | --- | --- |
| handle | <code>number</code> | A pointer to a GEOSContextHandle_t object. |
| geom | <code>number</code> | A pointer to a GEOSGeometry object. |


---
