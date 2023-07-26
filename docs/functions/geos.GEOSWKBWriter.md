<a name="exp_module_geos--geos.GEOSWKBWriter_create"></a>

## geos.GEOSWKBWriter\_create ⇒ <code>number</code> ⏏
Creates a new GEOSWKBWriter object.

**Kind**: Exported member  
**Returns**: <code>number</code> - A pointer to a GEOSWKBWriter object, or null on error.  

---
<a name="exp_module_geos--geos.GEOSWKBWriter_create_r"></a>

## geos.GEOSWKBWriter\_create\_r ⇒ <code>number</code> ⏏
Creates a new GEOSWKBWriter object with a context handle.

**Kind**: Exported member  
**Returns**: <code>number</code> - A pointer to a GEOSWKBWriter object, or null on error.  

| Param | Type | Description |
| --- | --- | --- |
| handle | <code>number</code> | A GEOSContextHandle_t object. |


---
<a name="exp_module_geos--geos.GEOSWKBWriter_destroy"></a>

## geos.GEOSWKBWriter\_destroy ⏏
Destroys a GEOSWKBWriter object.

**Kind**: Exported member  

| Param | Type | Description |
| --- | --- | --- |
| writer | <code>number</code> | A pointer to a GEOSWKBWriter object. |


---
<a name="exp_module_geos--geos.GEOSWKBWriter_destroy_r"></a>

## geos.GEOSWKBWriter\_destroy\_r ⏏
Destroys a GEOSWKBWriter object.

**Kind**: Exported member  

| Param | Type | Description |
| --- | --- | --- |
| handle | <code>number</code> | A pointer to the GEOS context handle. |
| writer | <code>number</code> | The GEOSWKBWriter object to destroy. |


---
<a name="exp_module_geos--geos.GEOSWKBWriter_getByteOrder"></a>

## geos.GEOSWKBWriter\_getByteOrder ⇒ <code>number</code> ⏏
Get the byte order of a WKBWriter object.

**Kind**: Exported member  
**Returns**: <code>number</code> - The byte order (0 for big endian, 1 for little endian).  

| Param | Type | Description |
| --- | --- | --- |
| writer | <code>number</code> | A pointer to a GEOSWKBWriter object. |


---
<a name="exp_module_geos--geos.GEOSWKBWriter_getByteOrder_r"></a>

## geos.GEOSWKBWriter\_getByteOrder\_r ⇒ <code>number</code> ⏏
Returns the byte order used by the writer.

**Kind**: Exported member  
**Returns**: <code>number</code> - The byte order (GEOS_WKB_XDR or GEOS_WKB_NDR).  

| Param | Type | Description |
| --- | --- | --- |
| handle | <code>number</code> | A pointer to the GEOS context handle. |
| writer | <code>number</code> | The GEOSWKBWriter pointer. |


---
<a name="exp_module_geos--geos.GEOSWKBWriter_getFlavor"></a>

## geos.GEOSWKBWriter\_getFlavor ⇒ <code>number</code> ⏏
Returns the output format of a WKB writer.

**Kind**: Exported member  
**Returns**: <code>number</code> - An integer representing the output format, such as 0 for WKB_ISO, 1 for WKB_SFSQL, or 2 for WKB_HEX.  
**See**: https://libgeos.org/doxygen/geos__c_8h.html#a3f7a4c9b8b4f8e2f6d3a0e5c5b7b0a6f  

| Param | Type | Description |
| --- | --- | --- |
| writer | <code>number</code> | A pointer to a GEOS WKB writer object. |


---
<a name="exp_module_geos--geos.GEOSWKBWriter_getFlavor_r"></a>

## geos.GEOSWKBWriter\_getFlavor\_r ⇒ <code>number</code> ⏏
Returns the output format of a WKB writer.

**Kind**: Exported member  
**Returns**: <code>number</code> - An integer representing the output format, such as 0 for WKB_ISO, 1 for WKB_SFSQL, or 2 for WKB_HEX. Returns -1 on error.  
**See**: https://libgeos.org/doxygen/geos__c_8h.html#a0a7f9c4a6f5b8e0f3c8b9a2d1b6b4e3a  

| Param | Type | Description |
| --- | --- | --- |
| handle | <code>number</code> | A GEOS context handle. |
| writer | <code>number</code> | A pointer to a GEOS WKB writer object. |


---
<a name="exp_module_geos--geos.GEOSWKBWriter_getIncludeSRID"></a>

## geos.GEOSWKBWriter\_getIncludeSRID ⇒ <code>number</code> ⏏
Returns whether the writer includes SRID values in output WKB.

**Kind**: Exported member  
**Returns**: <code>number</code> - 1 if SRID values are included, 0 otherwise.  

| Param | Type | Description |
| --- | --- | --- |
| writer | <code>number</code> | The GEOSWKBWriter pointer. |


---
<a name="exp_module_geos--geos.GEOSWKBWriter_getIncludeSRID_r"></a>

## geos.GEOSWKBWriter\_getIncludeSRID\_r ⇒ <code>number</code> ⏏
Returns whether the writer includes SRID values in output WKB with a context handle.

**Kind**: Exported member  
**Returns**: <code>number</code> - 1 if SRID values are included, 0 otherwise.  

| Param | Type | Description |
| --- | --- | --- |
| handle | <code>number</code> | A pointer to the GEOS context handle. |
| writer | <code>number</code> | The GEOSWKBWriter pointer. |


---
<a name="exp_module_geos--geos.GEOSWKBWriter_getOutputDimension"></a>

## geos.GEOSWKBWriter\_getOutputDimension ⇒ <code>number</code> ⏏
Get the output dimension of a WKBWriter object.

**Kind**: Exported member  
**Returns**: <code>number</code> - The output dimension (2 or 3).  

| Param | Type | Description |
| --- | --- | --- |
| writer | <code>number</code> | A pointer to a GEOSWKBWriter object. |


---
<a name="exp_module_geos--geos.GEOSWKBWriter_getOutputDimension_r"></a>

## geos.GEOSWKBWriter\_getOutputDimension\_r ⇒ <code>number</code> ⏏
Get the output dimension of a WKBWriter object (thread-safe).

**Kind**: Exported member  
**Returns**: <code>number</code> - The output dimension (2 or 3).  

| Param | Type | Description |
| --- | --- | --- |
| handle | <code>number</code> | A pointer to a GEOS context handle. |
| writer | <code>number</code> | A pointer to a GEOSWKBWriter object. |


---
<a name="exp_module_geos--geos.GEOSWKBWriter_setByteOrder"></a>

## geos.GEOSWKBWriter\_setByteOrder ⏏
Sets the byte order for the writer.

**Kind**: Exported member  

| Param | Type | Description |
| --- | --- | --- |
| writer | <code>number</code> | The GEOSWKBWriter pointer. |
| byteOrder | <code>number</code> | The byte order to use (GEOS_WKB_XDR or GEOS_WKB_NDR). |


---
<a name="exp_module_geos--geos.GEOSWKBWriter_setByteOrder_r"></a>

## geos.GEOSWKBWriter\_setByteOrder\_r ⏏
Sets the byte order for the writer with a context handle.

**Kind**: Exported member  

| Param | Type | Description |
| --- | --- | --- |
| handle | <code>number</code> | A pointer to the GEOS context handle. |
| writer | <code>number</code> | The GEOSWKBWriter pointer. |
| byteOrder | <code>number</code> | The byte order to use (GEOS_WKB_XDR or GEOS_WKB_NDR). |


---
<a name="exp_module_geos--geos.GEOSWKBWriter_setFlavor"></a>

## geos.GEOSWKBWriter\_setFlavor ⇒ <code>void</code> ⏏
Sets the output format of a WKB writer to either WKB or EWKB.

**Kind**: Exported member  
**See**: https://libgeos.org/doxygen/geos__c_8h.html#a9a0e1f9fa62b0d657c4b18e01a276a94  

| Param | Type | Description |
| --- | --- | --- |
| writer | <code>number</code> | A pointer to a GEOS WKB writer object. |
| flavor | <code>number</code> | An integer representing the output format, 1 for WKB, 2 for EWKB. |


---
<a name="exp_module_geos--geos.GEOSWKBWriter_setFlavor_r"></a>

## geos.GEOSWKBWriter\_setFlavor\_r ⇒ <code>number</code> ⏏
Sets the output format of a WKB writer to either WKB or EWKB.

**Kind**: Exported member  
**Returns**: <code>number</code> - 1 on success, 0 on failure.  
**See**: https://libgeos.org/doxygen/geos__c_8h.html#a7f9a6d3a5f2b0f1a4c6b4c2e3b9b8a9e  

| Param | Type | Description |
| --- | --- | --- |
| handle | <code>number</code> | A GEOS context handle. |
| writer | <code>number</code> | A pointer to a GEOS WKB writer object. |
| flavor | <code>number</code> | An integer representing the output format, 1 for WKB, 2 for EWKB. |


---
<a name="exp_module_geos--geos.GEOSWKBWriter_setIncludeSRID"></a>

## geos.GEOSWKBWriter\_setIncludeSRID ⏏
Sets whether output WKB should have an SRID header.

**Kind**: Exported member  

| Param | Type | Description |
| --- | --- | --- |
| writer | <code>number</code> | A GEOSWKBWriter pointer. |
| writeSRID | <code>number</code> | A boolean value indicating whether to include SRID or not. |


---
<a name="exp_module_geos--geos.GEOSWKBWriter_setIncludeSRID_r"></a>

## geos.GEOSWKBWriter\_setIncludeSRID\_r ⏏
Sets whether output WKB should have an SRID header, with a context handle.

**Kind**: Exported member  

| Param | Type | Description |
| --- | --- | --- |
| handle | <code>number</code> | A GEOSContextHandle pointer. |
| writer | <code>number</code> | A GEOSWKBWriter pointer. |
| writeSRID | <code>number</code> | A boolean value indicating whether to include SRID or not. |


---
<a name="exp_module_geos--geos.GEOSWKBWriter_setOutputDimension"></a>

## geos.GEOSWKBWriter\_setOutputDimension ⏏
Set the output dimension of a WKBWriter object.

**Kind**: Exported member  

| Param | Type | Description |
| --- | --- | --- |
| writer | <code>number</code> | A pointer to a GEOSWKBWriter object. |
| newDimension | <code>number</code> | The new output dimension (2 or 3). |


---
<a name="exp_module_geos--geos.GEOSWKBWriter_setOutputDimension_r"></a>

## geos.GEOSWKBWriter\_setOutputDimension\_r ⏏
Set the output dimension of a WKBWriter object (thread-safe).

**Kind**: Exported member  

| Param | Type | Description |
| --- | --- | --- |
| handle | <code>number</code> | A pointer to a GEOS context handle. |
| writer | <code>number</code> | A pointer to a GEOSWKBWriter object. |
| newDimension | <code>number</code> | The new output dimension (2 or 3). |


---
<a name="exp_module_geos--geos.GEOSWKBWriter_write"></a>

## geos.GEOSWKBWriter\_write ⇒ <code>string</code> ⏏
Writes a geometry as a WKB byte array.

**Kind**: Exported member  
**Returns**: <code>string</code> - A WKB byte array as a string.  

| Param | Type | Description |
| --- | --- | --- |
| writer | <code>number</code> | The GEOSWKBWriter object to use. |
| g | <code>number</code> | The GEOSGeometry object to write. |


---
<a name="exp_module_geos--geos.GEOSWKBWriter_writeHEX"></a>

## geos.GEOSWKBWriter\_writeHEX ⇒ <code>string</code> ⏏
Writes a geometry as a WKB hex-encoded byte array.

**Kind**: Exported member  
**Returns**: <code>string</code> - A WKB hex-encoded byte array as a string.  

| Param | Type | Description |
| --- | --- | --- |
| writer | <code>number</code> | The GEOSWKBWriter object to use. |
| g | <code>number</code> | The GEOSGeometry object to write. |
| size | <code>number</code> | A pointer to store the size of the output array. |


---
<a name="exp_module_geos--geos.GEOSWKBWriter_writeHEX_r"></a>

## geos.GEOSWKBWriter\_writeHEX\_r ⇒ <code>string</code> ⏏
Writes a geometry as a WKB hex-encoded byte array with a context handle.

**Kind**: Exported member  
**Returns**: <code>string</code> - A WKB hex-encoded byte array as a string.  

| Param | Type | Description |
| --- | --- | --- |
| handle | <code>number</code> | A pointer to the GEOS context handle. |
| writer | <code>number</code> | The GEOSWKBWriter object to use. |
| g | <code>number</code> | The GEOSGeometry object to write. |
| size | <code>number</code> | A pointer to store the size of the output array. |


---
<a name="exp_module_geos--geos.GEOSWKBWriter_write_r"></a>

## geos.GEOSWKBWriter\_write\_r ⇒ <code>string</code> ⏏
Writes a geometry as a WKB byte array with a context handle.

**Kind**: Exported member  
**Returns**: <code>string</code> - A WKB byte array as a string.  

| Param | Type | Description |
| --- | --- | --- |
| handle | <code>number</code> | A pointer to the GEOS context handle. |
| writer | <code>number</code> | The GEOSWKBWriter object to use. |
| g | <code>number</code> | The GEOSGeometry object to write. |
| size | <code>number</code> | A pointer to store the size of the output array. |


---
