<a name="exp_module_geos--geos.GEOSUnion"></a>

## geos.GEOSUnion ⇒ <code>number</code> ⏏
Computes a union of two geometries.

**Kind**: Exported member  
**Returns**: <code>number</code> - A pointer to the resulting geometry, or NULL on exception.  

| Param | Type | Description |
| --- | --- | --- |
| g1 | <code>number</code> | A pointer to the first geometry. |
| g2 | <code>number</code> | A pointer to the second geometry. |


---
<a name="exp_module_geos--geos.GEOSUnionCascaded"></a>

## geos.GEOSUnionCascaded ⇒ <code>number</code> ⏏
Computes the union of a collection of polygonal geometries using an optimized algorithm.

**Kind**: Exported member  
**Returns**: <code>number</code> - The pointer to a GEOS geometry representing the union, or NULL on error.  
**See**: https://libgeos.org/doxygen/classgeos_1_1operation_1_1geounion_1_1CascadedPolygonUnion.html  

| Param | Type | Description |
| --- | --- | --- |
| g | <code>number</code> | The pointer to a GEOS geometry collection. |


---
<a name="exp_module_geos--geos.GEOSUnionCascaded_r"></a>

## geos.GEOSUnionCascaded\_r ⇒ <code>number</code> ⏏
Computes the union of a collection of polygonal geometries using an optimized algorithm.

**Kind**: Exported member  
**Returns**: <code>number</code> - The pointer to a GEOS geometry representing the union, or NULL on error.  
**See**: https://libgeos.org/doxygen/classgeos_1_1operation_1_1geounion_1_1CascadedPolygonUnion.html  

| Param | Type | Description |
| --- | --- | --- |
| handle | <code>number</code> | A pointer to the GEOS context handle. |
| g | <code>number</code> | The pointer to a GEOS geometry collection. |


---
<a name="exp_module_geos--geos.GEOSUnionPrec"></a>

## geos.GEOSUnionPrec ⇒ <code>number</code> ⏏
Computes a union of two geometries using a specified precision model.

**Kind**: Exported member  
**Returns**: <code>number</code> - A pointer to the resulting geometry, or NULL on exception.  

| Param | Type | Description |
| --- | --- | --- |
| g1 | <code>number</code> | A pointer to the first geometry. |
| g2 | <code>number</code> | A pointer to the second geometry. |
| gridsize | <code>number</code> | The precision grid size to use. |


---
<a name="exp_module_geos--geos.GEOSUnionPrec_r"></a>

## geos.GEOSUnionPrec\_r ⇒ <code>number</code> ⏏
Computes a union of two geometries using a specified precision model and context handle.

**Kind**: Exported member  
**Returns**: <code>number</code> - A pointer to the resulting geometry, or NULL on exception.  

| Param | Type | Description |
| --- | --- | --- |
| handle | <code>number</code> | A pointer to the GEOS context handle. |
| g1 | <code>number</code> | A pointer to the first geometry. |
| g2 | <code>number</code> | A pointer to the second geometry. |
| gridsize | <code>number</code> | The precision grid size to use. |


---
<a name="exp_module_geos--geos.GEOSUnion_r"></a>

## geos.GEOSUnion\_r ⇒ <code>number</code> ⏏
Computes a union of two geometries using a specified context handle.

**Kind**: Exported member  
**Returns**: <code>number</code> - A pointer to the resulting geometry, or NULL on exception.  

| Param | Type | Description |
| --- | --- | --- |
| handle | <code>number</code> | A pointer to the GEOS context handle. |
| g1 | <code>number</code> | A pointer to the first geometry. |
| g2 | <code>number</code> | A pointer to the second geometry. |


---
