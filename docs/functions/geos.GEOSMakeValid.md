<a name="exp_module_geos--geos.GEOSMakeValid"></a>

## geos.GEOSMakeValid ⇒ [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) ⏏
Repair an invalid geometry, returning a valid output.

**Kind**: global property of [<code>geos</code>](/typedefs-enums/typedefs-enums.html#module_geos)  
**Returns**: [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) - The repaired geometry. Caller must free with GEOSGeom_destroy().  

| Param | Type | Description |
| --- | --- | --- |
| g | [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) | The geometry to repair |


---
<a name="exp_module_geos--geos.GEOSMakeValidParams_create_r"></a>

## geos.GEOSMakeValidParams\_create\_r ⇒ [<code>GEOSMakeValidParams</code>](/typedefs-enums/typedefs-enums.html#GEOSMakeValidParams) ⏏
Create a GEOSMakeValidParams to hold the desired parameters to control the algorithm and behavior of the validation process.

**Kind**: global property of [<code>geos</code>](/typedefs-enums/typedefs-enums.html#module_geos)  
**Returns**: [<code>GEOSMakeValidParams</code>](/typedefs-enums/typedefs-enums.html#GEOSMakeValidParams) - a parameter object  

| Param | Type | Description |
| --- | --- | --- |
| extHandle | [<code>GEOSContextHandle\_t</code>](/typedefs-enums/typedefs-enums.html#GEOSContextHandle_t) | - |


---
<a name="exp_module_geos--geos.GEOSMakeValidParams_destroy"></a>

## geos.GEOSMakeValidParams\_destroy ⇒ <code>null</code> ⏏
Destroy a GEOSMakeValidParams.

**Kind**: global property of [<code>geos</code>](/typedefs-enums/typedefs-enums.html#module_geos)  
**Returns**: <code>null</code> - void  

| Param | Type | Description |
| --- | --- | --- |
| parms | [<code>GEOSMakeValidParams</code>](/typedefs-enums/typedefs-enums.html#GEOSMakeValidParams) | the object to destroy |


---
<a name="exp_module_geos--geos.GEOSMakeValidParams_destroy_r"></a>

## geos.GEOSMakeValidParams\_destroy\_r ⇒ <code>null</code> ⏏
Destroy a GEOSMakeValidParams.

**Kind**: global property of [<code>geos</code>](/typedefs-enums/typedefs-enums.html#module_geos)  
**Returns**: <code>null</code> - void  

| Param | Type | Description |
| --- | --- | --- |
| handle | [<code>GEOSContextHandle\_t</code>](/typedefs-enums/typedefs-enums.html#GEOSContextHandle_t) | - |
| parms | [<code>GEOSMakeValidParams</code>](/typedefs-enums/typedefs-enums.html#GEOSMakeValidParams) | the object to destroy |


---
<a name="exp_module_geos--geos.GEOSMakeValidParams_setKeepCollapsed"></a>

## geos.GEOSMakeValidParams\_setKeepCollapsed ⇒ <code>number</code> ⏏
When this parameter is nn-zero, the GEOS_MAKE_VALID_STRUCTURE method will keep components that have collapsed into a lower dimensionality. For example, a ring collapsing to a line, or a line collapsing to a point.

**Kind**: global property of [<code>geos</code>](/typedefs-enums/typedefs-enums.html#module_geos)  
**Returns**: <code>number</code> - 0 on exception, 1 on success.  

| Param | Type | Description |
| --- | --- | --- |
| p | [<code>GEOSMakeValidParams</code>](/typedefs-enums/typedefs-enums.html#GEOSMakeValidParams) | - |
| keepCollapsed | <code>number</code> | - |


---
<a name="exp_module_geos--geos.GEOSMakeValidParams_setKeepCollapsed_r"></a>

## geos.GEOSMakeValidParams\_setKeepCollapsed\_r ⇒ <code>number</code> ⏏
When this parameter is nn-zero, the GEOS_MAKE_VALID_STRUCTURE method will keep components that have collapsed into a lower dimensionality. For example, a ring collapsing to a line, or a line collapsing to a point.

**Kind**: global property of [<code>geos</code>](/typedefs-enums/typedefs-enums.html#module_geos)  
**Returns**: <code>number</code> - 0 on exception, 1 on success.  

| Param | Type | Description |
| --- | --- | --- |
| handle | [<code>GEOSContextHandle\_t</code>](/typedefs-enums/typedefs-enums.html#GEOSContextHandle_t) | - |
| p | [<code>GEOSMakeValidParams</code>](/typedefs-enums/typedefs-enums.html#GEOSMakeValidParams) | - |
| style | <code>number</code> | - |


---
<a name="exp_module_geos--geos.GEOSMakeValidParams_setMethod"></a>

## geos.GEOSMakeValidParams\_setMethod ⇒ <code>number</code> ⏏
Set the GEOSMakeValidMethods to use in making the geometry valid.

**Kind**: global property of [<code>geos</code>](/typedefs-enums/typedefs-enums.html#module_geos)  
**Returns**: <code>number</code> - 0 on exception, 1 on success.  

| Param | Type | Description |
| --- | --- | --- |
| p | [<code>GEOSMakeValidParams</code>](/typedefs-enums/typedefs-enums.html#GEOSMakeValidParams) | - |
| method | <code>GEOSMakeValidMethods</code> | - |


---
<a name="exp_module_geos--geos.GEOSMakeValidParams_setMethod_r"></a>

## geos.GEOSMakeValidParams\_setMethod\_r ⇒ <code>number</code> ⏏
Set the GEOSMakeValidMethods to use in making the geometry valid.

**Kind**: global property of [<code>geos</code>](/typedefs-enums/typedefs-enums.html#module_geos)  
**Returns**: <code>number</code> - 0 on exception, 1 on success.  

| Param | Type | Description |
| --- | --- | --- |
| handle | [<code>GEOSContextHandle\_t</code>](/typedefs-enums/typedefs-enums.html#GEOSContextHandle_t) | - |
| p | [<code>GEOSMakeValidParams</code>](/typedefs-enums/typedefs-enums.html#GEOSMakeValidParams) | - |
| method | <code>GEOSMakeValidMethods</code> | - |


---
<a name="exp_module_geos--geos.GEOSMakeValidWithParams"></a>

## geos.GEOSMakeValidWithParams ⇒ [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) ⏏
Repair an invalid geometry, returning a valid output, using the indicated GEOSMakeValidMethods algorithm and options.

**Kind**: global property of [<code>geos</code>](/typedefs-enums/typedefs-enums.html#module_geos)  
**Returns**: [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) - A repaired geometry. Caller must free with GEOSGeom_destroy().  

| Param | Type | Description |
| --- | --- | --- |
| g | [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) | is the geometry to test. |
| makeValidParams | [<code>GEOSMakeValidParams</code>](/typedefs-enums/typedefs-enums.html#GEOSMakeValidParams) | is a GEOSMakeValidParams with the desired parameters set on it. |


---
<a name="exp_module_geos--geos.GEOSMakeValidWithParams_r"></a>

## geos.GEOSMakeValidWithParams\_r ⇒ [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) ⏏
Repair an invalid geometry, returning a valid output, using the indicated GEOSMakeValidMethods algorithm and options.

**Kind**: global property of [<code>geos</code>](/typedefs-enums/typedefs-enums.html#module_geos)  
**Returns**: [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) - A repaired geometry. Caller must free with GEOSGeom_destroy().  

| Param | Type | Description |
| --- | --- | --- |
| handle | [<code>GEOSContextHandle\_t</code>](/typedefs-enums/typedefs-enums.html#GEOSContextHandle_t) | - |
| g | [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) | is the geometry to test. |
| makeValidParams | [<code>GEOSMakeValidParams</code>](/typedefs-enums/typedefs-enums.html#GEOSMakeValidParams) | is a GEOSMakeValidParams with the desired parameters set on it. |


---
<a name="exp_module_geos--geos.GEOSMakeValid_r"></a>

## geos.GEOSMakeValid\_r ⇒ [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) ⏏
Repair an invalid geometry, returning a valid output.

**Kind**: global property of [<code>geos</code>](/typedefs-enums/typedefs-enums.html#module_geos)  
**Returns**: [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) - The repaired geometry. Caller must free with GEOSGeom_destroy().  

| Param | Type | Description |
| --- | --- | --- |
| handle | [<code>GEOSContextHandle\_t</code>](/typedefs-enums/typedefs-enums.html#GEOSContextHandle_t) | - |
| g | [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) | The geometry to repair |


---
