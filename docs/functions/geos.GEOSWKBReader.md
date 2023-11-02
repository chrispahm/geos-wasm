<a name="exp_module_geos--geos.GEOSWKBReader_create"></a>

## geos.GEOSWKBReader\_create ⇒ <code>number</code> ⏏
Create a new GEOSWKBReader object.

**Kind**: Exported member  
**Returns**: <code>number</code> - A pointer to a newly allocated GEOSWKBReader object.  
**See**: https://github.com/libgeos/geos/blob/main/capi/geos_c.h.in  

---
<a name="exp_module_geos--geos.GEOSWKBReader_create_r"></a>

## geos.GEOSWKBReader\_create\_r ⇒ <code>number</code> ⏏
Creates a new WKB reader object.

**Kind**: Exported member  
**Returns**: <code>number</code> - - The pointer to the WKB reader object.  

| Param | Type | Description |
| --- | --- | --- |
| handle | <code>number</code> | The GEOS context pointer handle. |


---
<a name="exp_module_geos--geos.GEOSWKBReader_destroy"></a>

## geos.GEOSWKBReader\_destroy ⏏
Destroys a WKB reader object.

**Kind**: Exported member  

| Param | Type | Description |
| --- | --- | --- |
| reader | <code>number</code> | The pointer to the WKB reader object. |


---
<a name="exp_module_geos--geos.GEOSWKBReader_destroy_r"></a>

## geos.GEOSWKBReader\_destroy\_r ⏏
Destroys a WKB reader object using a context handle.

**Kind**: Exported member  

| Param | Type | Description |
| --- | --- | --- |
| handle | <code>number</code> | The GEOS context pointer handle. |
| reader | <code>number</code> | The pointer to the WKB reader object. |


---
<a name="exp_module_geos--geos.GEOSWKBReader_read"></a>

## geos.GEOSWKBReader\_read ⇒ <code>number</code> ⏏
Reads a geometry from a WKB byte buffer.

**Kind**: Exported member  
**Returns**: <code>number</code> - - The pointer to the geometry object, or null if an error occurred.  

| Param | Type | Description |
| --- | --- | --- |
| reader | <code>number</code> | The pointer to the WKB reader object. |
| wkb | <code>string</code> | The WKB byte buffer as a hex string. |
| size | <code>number</code> | The size of the WKB byte buffer in bytes. |


---
<a name="exp_module_geos--geos.GEOSWKBReader_readHEX"></a>

## geos.GEOSWKBReader\_readHEX ⇒ <code>number</code> ⏏
Reads a geometry from a hexadecimal WKB representation.

**Kind**: Exported member  
**Returns**: <code>number</code> - A pointer to a GEOSGeometry object, or null on error.  

| Param | Type | Description |
| --- | --- | --- |
| reader | <code>number</code> | A pointer to a GEOSWKBReader object. |
| hex | <code>string</code> | A hexadecimal string representing the WKB of the geometry. |
| size | <code>number</code> | The length of the hexadecimal string. |


---
<a name="exp_module_geos--geos.GEOSWKBReader_readHEX_r"></a>

## geos.GEOSWKBReader\_readHEX\_r ⇒ <code>number</code> ⏏
Reads a geometry from a hexadecimal WKB representation with a context handle.

**Kind**: Exported member  
**Returns**: <code>number</code> - A pointer to a GEOSGeometry object, or null on error.  

| Param | Type | Description |
| --- | --- | --- |
| handle | <code>number</code> | A GEOSContextHandle_t object. |
| reader | <code>number</code> | A pointer to a GEOSWKBReader object. |
| hex | <code>string</code> | A hexadecimal string representing the WKB of the geometry. |
| size | <code>number</code> | The length of the hexadecimal string. |


---
<a name="exp_module_geos--geos.GEOSWKBReader_read_r"></a>

## geos.GEOSWKBReader\_read\_r ⇒ <code>number</code> ⏏
Reads a geometry from a WKB byte buffer using a context handle.

**Kind**: Exported member  
**Returns**: <code>number</code> - - The pointer to the geometry object, or null if an error occurred.  

| Param | Type | Description |
| --- | --- | --- |
| handle | <code>number</code> | The GEOS context pointer handle. |
| reader | <code>number</code> | The pointer to the WKB reader object. |
| wkb | <code>string</code> | The WKB byte buffer as a hex string. |
| size | <code>number</code> | The size of the WKB byte buffer in bytes. |


---
<a name="exp_module_geos--geos.GEOSWKBReader_setFixStructure"></a>

## geos.GEOSWKBReader\_setFixStructure ⏏
Set the reader to automatically repair structural errors
in the input (currently just unclosed rings) while reading.

**Kind**: Exported member  

| Param | Type | Description |
| --- | --- | --- |
| reader | <code>number</code> | A WKB reader object, caller retains ownership |
| doFix | <code>number</code> | Set to 1 to repair, 0 for no repair (default). |


---
<a name="exp_module_geos--geos.GEOSWKBReader_setFixStructure_r"></a>

## geos.GEOSWKBReader\_setFixStructure\_r ⏏
Set the reader to automatically repair structural errors
in the input (currently just unclosed rings) while reading.

**Kind**: Exported member  

| Param | Type | Description |
| --- | --- | --- |
| handle | <code>number</code> | The GEOS context pointer handle. |
| reader | <code>number</code> | A WKB reader object, caller retains ownership |
| doFix | <code>number</code> | Set to 1 to repair, 0 for no repair (default). |


---
