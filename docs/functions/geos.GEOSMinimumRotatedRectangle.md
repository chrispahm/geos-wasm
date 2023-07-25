<a name="exp_module_geos--geos.GEOSMinimumRotatedRectangle"></a>

## geos.GEOSMinimumRotatedRectangle ⇒ <code>number</code> ⏏
Computes the minimum rotated rectangle (MRR) of a geometry. The MRR is similar to an envelope, but not necessarily aligned with coordinate axes. It has minimum area among all rectangles enclosing its input geometry.

**Kind**: Exported member  
**Returns**: <code>number</code> - A pointer to a new GEOSGeometry object representing the MRR, or NULL on exception.  

| Param | Type | Description |
| --- | --- | --- |
| geom | <code>number</code> | A pointer to a GEOSGeometry object. |


---
<a name="exp_module_geos--geos.GEOSMinimumRotatedRectangle_r"></a>

## geos.GEOSMinimumRotatedRectangle\_r ⇒ <code>number</code> ⏏
Computes the minimum-area rotated rectangle containing a geometry.

**Kind**: Exported member  
**Returns**: <code>number</code> - The pointer to the output geometry, or NULL on exception.  

| Param | Type | Description |
| --- | --- | --- |
| handle | <code>number</code> | A pointer to the GEOS context handle. |
| g | <code>number</code> | The pointer to the input geometry. |


---
