<a name="exp_module_geos--geos.GEOSWKTWriter_create"></a>

## geos.GEOSWKTWriter\_create ⇒ <code>number</code> ⏏
Creates a GEOSWKTWriter object.

**Kind**: Exported member  
**Returns**: <code>number</code> - The pointer to the GEOSWKTWriter object or null if an error occurred.  
**See**: [GEOSWKTWriter_create](https://libgeos.org/doxygen/geos__c_8h.html#a0a0f7c1b9f6a9f7c3c4d1b5a7b6f9e2e)  

---
<a name="exp_module_geos--geos.GEOSWKTWriter_create_r"></a>

## geos.GEOSWKTWriter\_create\_r ⇒ <code>number</code> ⏏
Creates a GEOSWKTWriter object.

**Kind**: Exported member  
**Returns**: <code>number</code> - The pointer to the GEOSWKTWriter object or null if an error occurred.  
**See**: [GEOSWKTWriter_create_r](https://libgeos.org/doxygen/geos__c_8h.html#a0a0f7c1b9f6a9f7c3c4d1b5a7b6f9e2e)  

| Param | Type | Description |
| --- | --- | --- |
| handle | <code>number</code> | A pointer to the GEOS context handle. |


---
<a name="exp_module_geos--geos.GEOSWKTWriter_destroy"></a>

## geos.GEOSWKTWriter\_destroy ⏏
Destroys a GEOSWKTWriter object.

**Kind**: Exported member  

| Param | Type | Description |
| --- | --- | --- |
| writer | <code>number</code> | The pointer to the GEOSWKTWriter object to be destroyed. |


---
<a name="exp_module_geos--geos.GEOSWKTWriter_destroy_r"></a>

## geos.GEOSWKTWriter\_destroy\_r ⏏
Destroys a GEOSWKTWriter object using a context handle.

**Kind**: Exported member  

| Param | Type | Description |
| --- | --- | --- |
| handle | <code>number</code> | The pointer to the GEOSContextHandle_t object. |
| writer | <code>number</code> | The pointer to the GEOSWKTWriter object to be destroyed. |


---
<a name="exp_module_geos--geos.GEOSWKTWriter_getOutputDimension"></a>

## geos.GEOSWKTWriter\_getOutputDimension ⇒ <code>number</code> ⏏
Get the output dimension of a GEOSWKTWriter object.

**Kind**: Exported member  
**Returns**: <code>number</code> - The output dimension, either 2 or 3.  
**See**: https://github.com/libgeos/geos/blob/main/capi/geos_c.h.in  

| Param | Type | Description |
| --- | --- | --- |
| writer | <code>number</code> | A pointer to a GEOSWKTWriter object. |


---
<a name="exp_module_geos--geos.GEOSWKTWriter_getOutputDimension_r"></a>

## geos.GEOSWKTWriter\_getOutputDimension\_r ⇒ <code>number</code> ⏏
Get the output dimension of a GEOSWKTWriter object (thread-safe version).

**Kind**: Exported member  
**Returns**: <code>number</code> - The output dimension, either 2 or 3.  
**See**: https://github.com/libgeos/geos/blob/main/capi/geos_c.h.in  

| Param | Type | Description |
| --- | --- | --- |
| handle | <code>number</code> | A GEOS context handle. |
| writer | <code>number</code> | A pointer to a GEOSWKTWriter object. |


---
<a name="exp_module_geos--geos.GEOSWKTWriter_setOld3D"></a>

## geos.GEOSWKTWriter\_setOld3D ⏏
Set whether to use the old-style 3D WKT representation (Z inside brackets).

**Kind**: Exported member  
**See**: https://github.com/libgeos/geos/blob/main/capi/geos_c.h.in  

| Param | Type | Description |
| --- | --- | --- |
| writer | <code>number</code> | A pointer to a GEOSWKTWriter object. |
| useOld3D | <code>number</code> | A boolean value indicating whether to use the old-style 3D WKT representation. |


---
<a name="exp_module_geos--geos.GEOSWKTWriter_setOld3D_r"></a>

## geos.GEOSWKTWriter\_setOld3D\_r ⏏
Set whether to use the old-style 3D WKT representation (Z inside brackets) (thread-safe version).

**Kind**: Exported member  
**See**: https://github.com/libgeos/geos/blob/main/capi/geos_c.h.in  

| Param | Type | Description |
| --- | --- | --- |
| handle | <code>number</code> | A GEOS context handle. |
| writer | <code>number</code> | A pointer to a GEOSWKTWriter object. |
| useOld3D | <code>number</code> | A boolean value indicating whether to use the old-style 3D WKT representation. |


---
<a name="exp_module_geos--geos.GEOSWKTWriter_setOutputDimension"></a>

## geos.GEOSWKTWriter\_setOutputDimension ⏏
Sets the output dimension on a GEOSWKTWriter.
If the specified dimension is 2, any input geometries
that have a higher dimension will be flattened to 2D
by dropping their z value. If the specified dimension is 3,
any input geometries that have a lower dimension will be
promoted to 3D by appending a z value of 0.

**Kind**: Exported member  

| Param | Type | Description |
| --- | --- | --- |
| writer | <code>number</code> | The GEOSWKTWriter object. |
| dim | <code>number</code> | The output dimension (2 or 3). |


---
<a name="exp_module_geos--geos.GEOSWKTWriter_setOutputDimension_r"></a>

## geos.GEOSWKTWriter\_setOutputDimension\_r ⏏
Sets the output dimension on a GEOSWKTWriter.
If the specified dimension is 2, any input geometries
that have a higher dimension will be flattened to 2D
by dropping their z value. If the specified dimension is 3,
any input geometries that have a lower dimension will be
promoted to 3D by appending a z value of 0.

**Kind**: Exported member  

| Param | Type | Description |
| --- | --- | --- |
| handle | <code>number</code> | A pointer to the GEOS context handle. |
| writer | <code>number</code> | The GEOSWKTWriter object. |
| dim | <code>number</code> | The output dimension (2 or 3). |


---
<a name="exp_module_geos--geos.GEOSWKTWriter_setRoundingPrecision"></a>

## geos.GEOSWKTWriter\_setRoundingPrecision ⏏
Sets the number places after the decimal to output in WKT.
Default 16.

**Kind**: Exported member  

| Param | Type | Description |
| --- | --- | --- |
| writer | <code>number</code> | The GEOSWKTWriter object. |
| precision | <code>number</code> | The number of decimal places. |


---
<a name="exp_module_geos--geos.GEOSWKTWriter_setRoundingPrecision_r"></a>

## geos.GEOSWKTWriter\_setRoundingPrecision\_r ⏏
Sets the number places after the decimal to output in WKT.
Default 16.

**Kind**: Exported member  

| Param | Type | Description |
| --- | --- | --- |
| handle | <code>number</code> | A pointer to the GEOS context handle. |
| writer | <code>number</code> | The GEOSWKTWriter object. |
| precision | <code>number</code> | The number of decimal places. |


---
<a name="exp_module_geos--geos.GEOSWKTWriter_setTrim"></a>

## geos.GEOSWKTWriter\_setTrim ⏏
Sets whether the output WKT string should be trimmed of unnecessary spaces.

**Kind**: Exported member  

| Param | Type | Description |
| --- | --- | --- |
| writer | <code>number</code> | The pointer to the GEOSWKTWriter object. |
| trim | <code>number</code> | A boolean value indicating whether to trim or not. 1 for true, 0 for false. |


---
<a name="exp_module_geos--geos.GEOSWKTWriter_setTrim_r"></a>

## geos.GEOSWKTWriter\_setTrim\_r ⏏
Sets the number trimming option on a GEOSWKTWriter.
With trim set to 1, the writer will strip trailing 0's from
the output coordinates. With 0, all coordinates will be
padded with 0's out to the rounding precision.

**Kind**: Exported member  

| Param | Type | Description |
| --- | --- | --- |
| handle | <code>number</code> | A pointer to the GEOS context handle. |
| writer | <code>number</code> | The GEOSWKTWriter object. |
| trim | <code>number</code> | The trimming option (0 or 1). |


---
<a name="exp_module_geos--geos.GEOSWKTWriter_write"></a>

## geos.GEOSWKTWriter\_write ⇒ <code>string</code> ⏏
Converts a GEOSGeometry object to a WKT string.

**Kind**: Exported member  
**Returns**: <code>string</code> - The WKT representation of the geometry, or null on error.  

| Param | Type | Description |
| --- | --- | --- |
| writer | <code>number</code> | The pointer to the GEOSWKTWriter object. |
| g | <code>number</code> | The pointer to the GEOSGeometry object to be converted. |


---
<a name="exp_module_geos--geos.GEOSWKTWriter_write_r"></a>

## geos.GEOSWKTWriter\_write\_r ⇒ <code>string</code> ⏏
Converts a GEOSGeometry object to a WKT string using a context handle.

**Kind**: Exported member  
**Returns**: <code>string</code> - The WKT representation of the geometry, or null on error.  

| Param | Type | Description |
| --- | --- | --- |
| handle | <code>number</code> | The pointer to the GEOSContextHandle_t object. |
| writer | <code>number</code> | The pointer to the GEOSWKTWriter object. |
| g | <code>number</code> | The pointer to the GEOSGeometry object to be converted. |


---
