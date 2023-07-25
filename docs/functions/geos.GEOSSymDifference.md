<a name="exp_module_geos--geos.GEOSSymDifference"></a>

## geos.GEOSSymDifference ⇒ <code>number</code> ⏏
Computes the symmetric difference of two geometries.

**Kind**: Exported member  
**Returns**: <code>number</code> - A pointer to a new GEOSGeometry object representing the symmetric difference, or NULL on exception.  

| Param | Type | Description |
| --- | --- | --- |
| g1 | <code>number</code> | A pointer to a GEOSGeometry object. |
| g2 | <code>number</code> | A pointer to another GEOSGeometry object. |


---
<a name="exp_module_geos--geos.GEOSSymDifferencePrec"></a>

## geos.GEOSSymDifferencePrec ⇒ <code>number</code> ⏏
Computes the symmetric difference of two geometries with precision control.

**Kind**: Exported member  
**Returns**: <code>number</code> - A pointer to a new GEOSGeometry object representing the symmetric difference, or NULL on exception or invalid input.  

| Param | Type | Description |
| --- | --- | --- |
| g1 | <code>number</code> | A pointer to a GEOSGeometry object. |
| g2 | <code>number</code> | A pointer to another GEOSGeometry object. |
| gridSize | <code>number</code> | The size of the grid used for snapping coordinates. Must be positive and non-zero. |


---
<a name="exp_module_geos--geos.GEOSSymDifferencePrec_r"></a>

## geos.GEOSSymDifferencePrec\_r ⇒ <code>number</code> ⏏
Computes a symmetric difference of two geometries using a specified precision model.

**Kind**: Exported member  
**Returns**: <code>number</code> - A pointer to the resulting geometry, or NULL on exception.  

| Param | Type | Description |
| --- | --- | --- |
| handle | <code>number</code> | A pointer to the GEOS context handle. |
| g1 | <code>number</code> | A pointer to the first geometry. |
| g2 | <code>number</code> | A pointer to the second geometry. |
| gridsize | <code>number</code> | The precision grid size to use. |


---
<a name="exp_module_geos--geos.GEOSSymDifference_r"></a>

## geos.GEOSSymDifference\_r ⇒ <code>number</code> ⏏
Computes the symmetric difference of two geometries in a thread-safe manner.

**Kind**: Exported member  
**Returns**: <code>number</code> - A pointer to a new GEOSGeometry object representing the symmetric difference, or NULL on exception.  

| Param | Type | Description |
| --- | --- | --- |
| handle | <code>number</code> | A GEOSContextHandle_t object. |
| g1 | <code>number</code> | A pointer to a GEOSGeometry object. |
| g2 | <code>number</code> | A pointer to another GEOSGeometry object. |


---
