<a name="exp_module_geos--geos.GEOSLength"></a>

## geos.GEOSLength ⇒ <code>number</code> ⏏
Calculate the length of a geometry.

**Kind**: Exported member  
**Returns**: <code>number</code> - 1 on success, 0 on exception  

| Param | Type | Description |
| --- | --- | --- |
| g | <code>number</code> | A pointer to a GEOSGeometry object |
| length | <code>number</code> | A pointer to be filled in with length result |


---
<a name="exp_module_geos--geos.GEOSLength_r"></a>

## geos.GEOSLength\_r ⇒ <code>number</code> ⏏
Calculate the length of a geometry using a custom context handle.

**Kind**: Exported member  
**Returns**: <code>number</code> - 1 on success, 0 on exception  

| Param | Type | Description |
| --- | --- | --- |
| handle | <code>number</code> | A GEOSContextHandle_t object |
| g | <code>number</code> | A pointer to a GEOSGeometry object |
| length | <code>number</code> | A pointer to be filled in with length result |


---
