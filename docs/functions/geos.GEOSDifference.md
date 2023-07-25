<a name="exp_module_geos--geos.GEOSDifference"></a>

## geos.GEOSDifference ⇒ <code>number</code> ⏏
Computes a geometry that represents the point set difference of the input geometries.

**Kind**: Exported member  
**Returns**: <code>number</code> - A pointer to the resulting geometry, or NULL if an exception was thrown.  

| Param | Type | Description |
| --- | --- | --- |
| ga | <code>number</code> | A pointer to the first geometry. |
| gb | <code>number</code> | A pointer to the second geometry. |


---
<a name="exp_module_geos--geos.GEOSDifferencePrec"></a>

## geos.GEOSDifferencePrec ⇒ <code>number</code> ⏏
Computes a geometry that represents the point set difference of the input geometries using a precision model.

**Kind**: Exported member  
**Returns**: <code>number</code> - A pointer to the resulting geometry, or NULL if an exception was thrown.  

| Param | Type | Description |
| --- | --- | --- |
| ga | <code>number</code> | A pointer to the first geometry. |
| gb | <code>number</code> | A pointer to the second geometry. |
| gridSize | <code>number</code> | The grid size for the precision model. |


---
<a name="exp_module_geos--geos.GEOSDifferencePrec_r"></a>

## geos.GEOSDifferencePrec\_r ⇒ <code>number</code> ⏏
Computes the difference between two geometries using a precision model grid size and a reentrant API.
The difference is the part of the first geometry that does not intersect with the second geometry.

**Kind**: Exported member  
**Returns**: <code>number</code> - A new GEOS geometry representing the difference, or NULL on exception.  

| Param | Type | Description |
| --- | --- | --- |
| handle | <code>number</code> | A pointer to the GEOS context handle. |
| g1 | <code>number</code> | The first GEOS geometry. |
| g2 | <code>number</code> | The second GEOS geometry. |
| grid_size | <code>number</code> | The grid size for snapping vertices to a precision model grid. |


---
<a name="exp_module_geos--geos.GEOSDifference_r"></a>

## geos.GEOSDifference\_r ⇒ <code>number</code> ⏏
Computes the difference between two geometries using a reentrant API.
The difference is the part of the first geometry that does not intersect with the second geometry.

**Kind**: Exported member  
**Returns**: <code>number</code> - A new GEOS geometry representing the difference, or NULL on exception.  
**See**: https://libgeos.org/doxygen/geos__c_8h.html  

| Param | Type | Description |
| --- | --- | --- |
| handle | <code>number</code> | A pointer to the GEOS context handle. |
| g1 | <code>number</code> | The first GEOS geometry. |
| g2 | <code>number</code> | The second GEOS geometry. |


---
