<a name="exp_module_geos--geos.GEOSisValid"></a>

## geos.GEOSisValid ⇒ <code>number</code> ⏏
Check the validity of the provided geometry.

**Kind**: global property of [<code>geos</code>](/typedefs-enums/typedefs-enums.html#module_geos)  
**Returns**: <code>number</code> - 1 on true, 0 on false, 2 on exception  

| Param | Type | Description |
| --- | --- | --- |
| g | [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) | The geometry to test |


---
<a name="exp_module_geos--geos.GEOSisValidDetail"></a>

## geos.GEOSisValidDetail ⇒ <code>number</code> ⏏
In one step, calculate and return the validity, the human readable validity reason and a point at which validity rules are broken. Caller has the responsibility to destroy 'reason' with GEOSFree() and 'location' with GEOSGeom_destroy()

**Kind**: global property of [<code>geos</code>](/typedefs-enums/typedefs-enums.html#module_geos)  
**Returns**: <code>number</code> - 1 when valid, 0 when invalid, 2 on exception  

| Param | Type | Description |
| --- | --- | --- |
| g | [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) | The geometry to test |
| flags | <code>number</code> | A value from the GEOSValidFlags enum |
| reason | [<code>Pointer</code>](/typedefs-enums/typedefs-enums.html#Pointer) | A pointer in which the reason string will be places |
| location | [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) | A pointer in which the location GEOSGeometry will be placed |


---
<a name="exp_module_geos--geos.GEOSisValidDetail_r"></a>

## geos.GEOSisValidDetail\_r ⇒ <code>number</code> ⏏
In one step, calculate and return the validity, the human readable validity reason and a point at which validity rules are broken. Caller has the responsibility to destroy 'reason' with GEOSFree() and 'location' with GEOSGeom_destroy()

**Kind**: global property of [<code>geos</code>](/typedefs-enums/typedefs-enums.html#module_geos)  
**Returns**: <code>number</code> - 1 when valid, 0 when invalid, 2 on exception  

| Param | Type | Description |
| --- | --- | --- |
| handle | [<code>GEOSContextHandle\_t</code>](/typedefs-enums/typedefs-enums.html#GEOSContextHandle_t) | - |
| g | [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) | The geometry to test |
| flags | <code>number</code> | A value from the GEOSValidFlags enum |
| reason | [<code>Pointer</code>](/typedefs-enums/typedefs-enums.html#Pointer) | A pointer in which the reason string will be places |
| location | [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) | A pointer in which the location GEOSGeometry will be placed |


---
<a name="exp_module_geos--geos.GEOSisValidReason"></a>

## geos.GEOSisValidReason ⇒ [<code>StringPointer</code>](/typedefs-enums/typedefs-enums.html#StringPointer) ⏏
Return the human readable reason a geometry is invalid, "Valid Geometry" string otherwise, or NULL on exception.

**Kind**: global property of [<code>geos</code>](/typedefs-enums/typedefs-enums.html#module_geos)  
**Returns**: [<code>StringPointer</code>](/typedefs-enums/typedefs-enums.html#StringPointer) - A string with the reason, NULL on exception. Caller must GEOSFree() their result.  

| Param | Type | Description |
| --- | --- | --- |
| g | [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) | The geometry to test |


---
<a name="exp_module_geos--geos.GEOSisValidReason_r"></a>

## geos.GEOSisValidReason\_r ⇒ [<code>StringPointer</code>](/typedefs-enums/typedefs-enums.html#StringPointer) ⏏
Return the human readable reason a geometry is invalid, "Valid Geometry" string otherwise, or NULL on exception.

**Kind**: global property of [<code>geos</code>](/typedefs-enums/typedefs-enums.html#module_geos)  
**Returns**: [<code>StringPointer</code>](/typedefs-enums/typedefs-enums.html#StringPointer) - A string with the reason, NULL on exception. Caller must GEOSFree() their result.  

| Param | Type | Description |
| --- | --- | --- |
| handle | [<code>GEOSContextHandle\_t</code>](/typedefs-enums/typedefs-enums.html#GEOSContextHandle_t) | - |
| g | [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) | The geometry to test |


---
<a name="exp_module_geos--geos.GEOSisValid_r"></a>

## geos.GEOSisValid\_r ⇒ <code>number</code> ⏏
Check the validity of the provided geometry.

**Kind**: global property of [<code>geos</code>](/typedefs-enums/typedefs-enums.html#module_geos)  
**Returns**: <code>number</code> - 1 on true, 0 on false, 2 on exception  

| Param | Type | Description |
| --- | --- | --- |
| handle | [<code>GEOSContextHandle\_t</code>](/typedefs-enums/typedefs-enums.html#GEOSContextHandle_t) | - |
| g | [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) | The geometry to test |


---
