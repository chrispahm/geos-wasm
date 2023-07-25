<a name="exp_module_geos--geos.GEOSLargestEmptyCircle"></a>

## geos.GEOSLargestEmptyCircle ⇒ <code>number</code> ⏏
Computes the largest empty circle for a set of obstacle geometries, up to a specified tolerance.
The obstacles are point and line geometries.
The boundary is an optional polygonal geometry that defines the extent of the area of interest.
If it is not provided, it is computed as the convex hull of the obstacles.

**Kind**: Exported member  
**Returns**: <code>number</code> - The pointer to the output geometry, or NULL on exception.  

| Param | Type | Description |
| --- | --- | --- |
| g | <code>number</code> | The pointer to the input obstacle geometry. |
| boundary | <code>number</code> | The pointer to the input boundary geometry, or NULL if not provided. |
| tolerance | <code>number</code> | The distance tolerance for computing the center point and radius. |


---
<a name="exp_module_geos--geos.GEOSLargestEmptyCircle_r"></a>

## geos.GEOSLargestEmptyCircle\_r ⇒ <code>number</code> ⏏
Computes the largest empty circle for a set of obstacle geometries, up to a specified tolerance.
The obstacles are point and line geometries.
The boundary is an optional polygonal geometry that defines the extent of the area of interest.
If it is not provided, it is computed as the convex hull of the obstacles.

**Kind**: Exported member  
**Returns**: <code>number</code> - The pointer to the output geometry, or NULL on exception.  

| Param | Type | Description |
| --- | --- | --- |
| handle | <code>number</code> | A pointer to the GEOS context handle. |
| g | <code>number</code> | The pointer to the input obstacle geometry. |
| boundary | <code>number</code> | The pointer to the input boundary geometry, or NULL if not provided. |
| tolerance | <code>number</code> | The distance tolerance for computing the center point and radius. |


---
