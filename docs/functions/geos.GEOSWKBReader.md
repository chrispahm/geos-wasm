<a name="exp_module_geos--geos.GEOSWKBReader_create_r"></a>

## geos.GEOSWKBReader\_create\_r ⇒ [<code>GEOSWKBReader</code>](/typedefs-enums/typedefs-enums.html#GEOSWKBReader) ⏏
Allocate a new GEOSWKBReader.

**Kind**: global property of [<code>geos</code>](/typedefs-enums/typedefs-enums.html#module_geos)  
**Returns**: [<code>GEOSWKBReader</code>](/typedefs-enums/typedefs-enums.html#GEOSWKBReader) - a new reader. Caller must free with GEOSWKBReader_destroy()  

| Param | Type | Description |
| --- | --- | --- |
| handle | [<code>GEOSContextHandle\_t</code>](/typedefs-enums/typedefs-enums.html#GEOSContextHandle_t) | - |


---
<a name="exp_module_geos--geos.GEOSWKBReader_destroy"></a>

## geos.GEOSWKBReader\_destroy ⇒ <code>null</code> ⏏
Free the memory associated with a GEOSWKBReader.

**Kind**: global property of [<code>geos</code>](/typedefs-enums/typedefs-enums.html#module_geos)  
**Returns**: <code>null</code> - void  

| Param | Type | Description |
| --- | --- | --- |
| reader | [<code>GEOSWKBReader</code>](/typedefs-enums/typedefs-enums.html#GEOSWKBReader) | The reader to destroy. |


---
<a name="exp_module_geos--geos.GEOSWKBReader_destroy_r"></a>

## geos.GEOSWKBReader\_destroy\_r ⇒ <code>null</code> ⏏
Free the memory associated with a GEOSWKBReader.

**Kind**: global property of [<code>geos</code>](/typedefs-enums/typedefs-enums.html#module_geos)  
**Returns**: <code>null</code> - void  

| Param | Type | Description |
| --- | --- | --- |
| handle | [<code>GEOSContextHandle\_t</code>](/typedefs-enums/typedefs-enums.html#GEOSContextHandle_t) | - |
| reader | [<code>GEOSWKBReader</code>](/typedefs-enums/typedefs-enums.html#GEOSWKBReader) | The reader to destroy. |


---
<a name="exp_module_geos--geos.GEOSWKBReader_read"></a>

## geos.GEOSWKBReader\_read ⇒ [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) ⏏
Read a geometry from a well-known binary buffer.

**Kind**: global property of [<code>geos</code>](/typedefs-enums/typedefs-enums.html#module_geos)  
**Returns**: [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) - A GEOSGeometry built from the WKB, or NULL on exception.  

| Param | Type | Description |
| --- | --- | --- |
| reader | [<code>GEOSWKBReader</code>](/typedefs-enums/typedefs-enums.html#GEOSWKBReader) | A GEOSWKBReader |
| wkb | [<code>Pointer</code>](/typedefs-enums/typedefs-enums.html#Pointer) | A pointer to the buffer to read from |
| size | <code>number</code> | The number of bytes of data in the buffer |


---
<a name="exp_module_geos--geos.GEOSWKBReader_readHEX"></a>

## geos.GEOSWKBReader\_readHEX ⇒ [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) ⏏
Read a geometry from a hex encoded well-known binary buffer.

**Kind**: global property of [<code>geos</code>](/typedefs-enums/typedefs-enums.html#module_geos)  
**Returns**: [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) - A GEOSGeometry built from the HEX WKB, or NULL on exception.  

| Param | Type | Description |
| --- | --- | --- |
| reader | [<code>GEOSWKBReader</code>](/typedefs-enums/typedefs-enums.html#GEOSWKBReader) | A GEOSWKBReader |
| hex | [<code>Pointer</code>](/typedefs-enums/typedefs-enums.html#Pointer) | A pointer to the buffer to read from |
| size | <code>number</code> | The number of bytes of data in the buffer |


---
<a name="exp_module_geos--geos.GEOSWKBReader_readHEX_r"></a>

## geos.GEOSWKBReader\_readHEX\_r ⇒ [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) ⏏
Read a geometry from a hex encoded well-known binary buffer.

**Kind**: global property of [<code>geos</code>](/typedefs-enums/typedefs-enums.html#module_geos)  
**Returns**: [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) - A GEOSGeometry built from the HEX WKB, or NULL on exception.  

| Param | Type | Description |
| --- | --- | --- |
| handle | [<code>GEOSContextHandle\_t</code>](/typedefs-enums/typedefs-enums.html#GEOSContextHandle_t) | - |
| reader | [<code>GEOSWKBReader</code>](/typedefs-enums/typedefs-enums.html#GEOSWKBReader) | A GEOSWKBReader |
| hex | [<code>Pointer</code>](/typedefs-enums/typedefs-enums.html#Pointer) | A pointer to the buffer to read from |
| size | <code>number</code> | The number of bytes of data in the buffer |


---
<a name="exp_module_geos--geos.GEOSWKBReader_read_r"></a>

## geos.GEOSWKBReader\_read\_r ⇒ [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) ⏏
Read a geometry from a well-known binary buffer.

**Kind**: global property of [<code>geos</code>](/typedefs-enums/typedefs-enums.html#module_geos)  
**Returns**: [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) - A GEOSGeometry built from the WKB, or NULL on exception.  

| Param | Type | Description |
| --- | --- | --- |
| handle | [<code>GEOSContextHandle\_t</code>](/typedefs-enums/typedefs-enums.html#GEOSContextHandle_t) | - |
| reader | [<code>GEOSWKBReader</code>](/typedefs-enums/typedefs-enums.html#GEOSWKBReader) | A GEOSWKBReader |
| wkb | [<code>Pointer</code>](/typedefs-enums/typedefs-enums.html#Pointer) | A pointer to the buffer to read from |
| size | <code>number</code> | The number of bytes of data in the buffer |


---
<a name="exp_module_geos--geos.GEOSWKBReader_setFixStructure"></a>

## geos.GEOSWKBReader\_setFixStructure ⇒ <code>null</code> ⏏
Set the reader to automatically repair structural errors in the input (currently just unclosed rings) while reading.

**Kind**: global property of [<code>geos</code>](/typedefs-enums/typedefs-enums.html#module_geos)  
**Returns**: <code>null</code> - void  

| Param | Type | Description |
| --- | --- | --- |
| reader | [<code>GEOSWKBReader</code>](/typedefs-enums/typedefs-enums.html#GEOSWKBReader) | A WKB reader object, caller retains ownership |
| doFix | <code>number</code> | Set to 1 to repair, 0 for no repair (default). |


---
<a name="exp_module_geos--geos.GEOSWKBReader_setFixStructure_r"></a>

## geos.GEOSWKBReader\_setFixStructure\_r ⇒ <code>null</code> ⏏
Set the reader to automatically repair structural errors in the input (currently just unclosed rings) while reading.

**Kind**: global property of [<code>geos</code>](/typedefs-enums/typedefs-enums.html#module_geos)  
**Returns**: <code>null</code> - void  

| Param | Type | Description |
| --- | --- | --- |
| handle | [<code>GEOSContextHandle\_t</code>](/typedefs-enums/typedefs-enums.html#GEOSContextHandle_t) | - |
| reader | [<code>GEOSWKBReader</code>](/typedefs-enums/typedefs-enums.html#GEOSWKBReader) | A WKB reader object, caller retains ownership |
| doFix | <code>number</code> | Set to 1 to repair, 0 for no repair (default). |


---
