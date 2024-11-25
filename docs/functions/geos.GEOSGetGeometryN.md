<a name="exp_module_geos--geos.GEOSGetGeometryN"></a>

## geos.GEOSGetGeometryN ⇒ <code>number</code> ⏏
Returns the specified sub-geometry of a collection. For a simple geometry, returns a pointer to the input. Returned object is a pointer to internal storage: it must NOT be destroyed directly.

**Kind**: global property of [<code>geos</code>](/typedefs-enums/typedefs-enums.html#module_geos)  
**Returns**: <code>number</code> - A const GEOSGeometry, do not free! It will be freed when the parent is freed. Returns NULL on exception.  

| Param | Type | Description |
| --- | --- | --- |
| g | [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) | Input geometry |
| n | <code>number</code> | Sub-geometry index, zero-based |


---
<a name="exp_module_geos--geos.GEOSGetGeometryN_r"></a>

## geos.GEOSGetGeometryN\_r ⇒ <code>number</code> ⏏
Returns the specified sub-geometry of a collection. For a simple geometry, returns a pointer to the input. Returned object is a pointer to internal storage: it must NOT be destroyed directly.

**Kind**: global property of [<code>geos</code>](/typedefs-enums/typedefs-enums.html#module_geos)  
**Returns**: <code>number</code> - A const GEOSGeometry, do not free! It will be freed when the parent is freed. Returns NULL on exception.  

| Param | Type | Description |
| --- | --- | --- |
| handle | [<code>GEOSContextHandle\_t</code>](/typedefs-enums/typedefs-enums.html#GEOSContextHandle_t) | - |
| g | [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) | Input geometry |
| n | <code>number</code> | Sub-geometry index, zero-based |


---
