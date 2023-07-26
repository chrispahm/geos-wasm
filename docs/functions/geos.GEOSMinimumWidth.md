<a name="exp_module_geos--geos.GEOSMinimumWidth"></a>

## geos.GEOSMinimumWidth ⇒ <code>number</code> ⏏
Computes the minimum width of a geometry.
The minimum width is the smallest distance between two parallel lines that contain the geometry.

**Kind**: Exported member  
**Returns**: <code>number</code> - A pointer to a LineString containing two points defining the minimum width line segment, or NULL on exception.  

| Param | Type | Description |
| --- | --- | --- |
| g | <code>number</code> | The input geometry pointer. |


---
<a name="exp_module_geos--geos.GEOSMinimumWidth_r"></a>

## geos.GEOSMinimumWidth\_r ⇒ <code>number</code> ⏏
Computes the minimum width of a geometry in a reentrant way.
The minimum width is the smallest distance between two parallel lines that contain the geometry.

**Kind**: Exported member  
**Returns**: <code>number</code> - A pointer to a LineString containing two points defining the minimum width line segment, or NULL on exception.  

| Param | Type | Description |
| --- | --- | --- |
| handle | <code>number</code> | The context handle pointer to use for error reporting. |
| g | <code>number</code> | The input geometry pointer. |


---
