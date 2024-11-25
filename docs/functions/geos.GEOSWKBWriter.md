<a name="exp_module_geos--geos.GEOSWKBWriter_create_r"></a>

## geos.GEOSWKBWriter\_create\_r ⇒ [<code>GEOSWKBWriter</code>](/typedefs-enums/typedefs-enums.html#GEOSWKBWriter) ⏏
Allocate a new GEOSWKBWriter.

**Kind**: global property of [<code>geos</code>](/typedefs-enums/typedefs-enums.html#module_geos)  
**Returns**: [<code>GEOSWKBWriter</code>](/typedefs-enums/typedefs-enums.html#GEOSWKBWriter) - a new writer. Caller must free with GEOSWKBWriter_destroy()  

| Param | Type | Description |
| --- | --- | --- |
| handle | [<code>GEOSContextHandle\_t</code>](/typedefs-enums/typedefs-enums.html#GEOSContextHandle_t) | - |


---
<a name="exp_module_geos--geos.GEOSWKBWriter_destroy"></a>

## geos.GEOSWKBWriter\_destroy ⇒ <code>null</code> ⏏
Free the memory associated with a GEOSWKBWriter.

**Kind**: global property of [<code>geos</code>](/typedefs-enums/typedefs-enums.html#module_geos)  
**Returns**: <code>null</code> - void  

| Param | Type | Description |
| --- | --- | --- |
| writer | [<code>GEOSWKBWriter</code>](/typedefs-enums/typedefs-enums.html#GEOSWKBWriter) | The writer to destroy. |


---
<a name="exp_module_geos--geos.GEOSWKBWriter_destroy_r"></a>

## geos.GEOSWKBWriter\_destroy\_r ⇒ <code>null</code> ⏏
Free the memory associated with a GEOSWKBWriter.

**Kind**: global property of [<code>geos</code>](/typedefs-enums/typedefs-enums.html#module_geos)  
**Returns**: <code>null</code> - void  

| Param | Type | Description |
| --- | --- | --- |
| handle | [<code>GEOSContextHandle\_t</code>](/typedefs-enums/typedefs-enums.html#GEOSContextHandle_t) | - |
| writer | [<code>GEOSWKBWriter</code>](/typedefs-enums/typedefs-enums.html#GEOSWKBWriter) | The writer to destroy. |


---
<a name="exp_module_geos--geos.GEOSWKBWriter_getByteOrder"></a>

## geos.GEOSWKBWriter\_getByteOrder ⇒ <code>number</code> ⏏
Find whether the writer will use WKB byte order that is big or little endian. The return value is a member of GEOSWKBByteOrders.

**Kind**: global property of [<code>geos</code>](/typedefs-enums/typedefs-enums.html#module_geos)  
**Returns**: <code>number</code> - The current byte order  

| Param | Type | Description |
| --- | --- | --- |
| writer | [<code>GEOSWKBWriter</code>](/typedefs-enums/typedefs-enums.html#GEOSWKBWriter) | The writer to read byte order from |


---
<a name="exp_module_geos--geos.GEOSWKBWriter_getByteOrder_r"></a>

## geos.GEOSWKBWriter\_getByteOrder\_r ⇒ <code>number</code> ⏏
Find whether the writer will use WKB byte order that is big or little endian. The return value is a member of GEOSWKBByteOrders.

**Kind**: global property of [<code>geos</code>](/typedefs-enums/typedefs-enums.html#module_geos)  
**Returns**: <code>number</code> - The current byte order  

| Param | Type | Description |
| --- | --- | --- |
| handle | [<code>GEOSContextHandle\_t</code>](/typedefs-enums/typedefs-enums.html#GEOSContextHandle_t) | - |
| writer | [<code>GEOSWKBWriter</code>](/typedefs-enums/typedefs-enums.html#GEOSWKBWriter) | The writer to read byte order from |


---
<a name="exp_module_geos--geos.GEOSWKBWriter_getFlavor"></a>

## geos.GEOSWKBWriter\_getFlavor ⇒ <code>number</code> ⏏
Find whether the writer will use WKB that is ISO flavor or "extended" flavor. The flavor determines how extra dimensionality is encoded with the type number, and whether SRID can be included in the WKB. ISO flavor does not support SRID embedding. ISO flavor is "more standard" for 3D output. GEOS can read both flavors. The return value is a member of GEOSWKBFlavors.

**Kind**: global property of [<code>geos</code>](/typedefs-enums/typedefs-enums.html#module_geos)  
**Returns**: <code>number</code> - The current flavor  

| Param | Type | Description |
| --- | --- | --- |
| writer | [<code>GEOSWKBWriter</code>](/typedefs-enums/typedefs-enums.html#GEOSWKBWriter) | The writer to read flavor from |


---
<a name="exp_module_geos--geos.GEOSWKBWriter_getFlavor_r"></a>

## geos.GEOSWKBWriter\_getFlavor\_r ⇒ <code>number</code> ⏏
Find whether the writer will use WKB that is ISO flavor or "extended" flavor. The flavor determines how extra dimensionality is encoded with the type number, and whether SRID can be included in the WKB. ISO flavor does not support SRID embedding. ISO flavor is "more standard" for 3D output. GEOS can read both flavors. The return value is a member of GEOSWKBFlavors.

**Kind**: global property of [<code>geos</code>](/typedefs-enums/typedefs-enums.html#module_geos)  
**Returns**: <code>number</code> - The current flavor  

| Param | Type | Description |
| --- | --- | --- |
| handle | [<code>GEOSContextHandle\_t</code>](/typedefs-enums/typedefs-enums.html#GEOSContextHandle_t) | - |
| writer | [<code>GEOSWKBWriter</code>](/typedefs-enums/typedefs-enums.html#GEOSWKBWriter) | The writer to read flavor from |


---
<a name="exp_module_geos--geos.GEOSWKBWriter_getIncludeSRID"></a>

## geos.GEOSWKBWriter\_getIncludeSRID ⇒ <code>number</code> ⏏
Read the current SRID embedding value from the writer.

**Kind**: global property of [<code>geos</code>](/typedefs-enums/typedefs-enums.html#module_geos)  
**Returns**: <code>number</code> - char  

| Param | Type | Description |
| --- | --- | --- |
| writer | [<code>GEOSWKBWriter</code>](/typedefs-enums/typedefs-enums.html#GEOSWKBWriter) | The writer to check SRID value on |


---
<a name="exp_module_geos--geos.GEOSWKBWriter_getIncludeSRID_r"></a>

## geos.GEOSWKBWriter\_getIncludeSRID\_r ⇒ <code>number</code> ⏏
Read the current SRID embedding value from the writer.

**Kind**: global property of [<code>geos</code>](/typedefs-enums/typedefs-enums.html#module_geos)  
**Returns**: <code>number</code> - char  

| Param | Type | Description |
| --- | --- | --- |
| handle | [<code>GEOSContextHandle\_t</code>](/typedefs-enums/typedefs-enums.html#GEOSContextHandle_t) | - |
| writer | [<code>GEOSWKBWriter</code>](/typedefs-enums/typedefs-enums.html#GEOSWKBWriter) | The writer to check SRID value on |


---
<a name="exp_module_geos--geos.GEOSWKBWriter_getOutputDimension"></a>

## geos.GEOSWKBWriter\_getOutputDimension ⇒ <code>number</code> ⏏
Read the current output dimension of the writer. Either 2, 3, or 4 dimensions. Return current number of dimensions.

**Kind**: global property of [<code>geos</code>](/typedefs-enums/typedefs-enums.html#module_geos)  
**Returns**: <code>number</code> - Number of dimensions (2, 3, or 4)  

| Param | Type | Description |
| --- | --- | --- |
| writer | [<code>GEOSWKBWriter</code>](/typedefs-enums/typedefs-enums.html#GEOSWKBWriter) | The writer to read from. |


---
<a name="exp_module_geos--geos.GEOSWKBWriter_getOutputDimension_r"></a>

## geos.GEOSWKBWriter\_getOutputDimension\_r ⇒ <code>number</code> ⏏
Read the current output dimension of the writer. Either 2, 3, or 4 dimensions. Return current number of dimensions.

**Kind**: global property of [<code>geos</code>](/typedefs-enums/typedefs-enums.html#module_geos)  
**Returns**: <code>number</code> - Number of dimensions (2, 3, or 4)  

| Param | Type | Description |
| --- | --- | --- |
| handle | [<code>GEOSContextHandle\_t</code>](/typedefs-enums/typedefs-enums.html#GEOSContextHandle_t) | - |
| writer | [<code>GEOSWKBWriter</code>](/typedefs-enums/typedefs-enums.html#GEOSWKBWriter) | The writer to read from. |


---
<a name="exp_module_geos--geos.GEOSWKBWriter_setByteOrder"></a>

## geos.GEOSWKBWriter\_setByteOrder ⇒ <code>null</code> ⏏
Set the output byte order of the writer, using a value from GEOSWKBByteOrders enum.

**Kind**: global property of [<code>geos</code>](/typedefs-enums/typedefs-enums.html#module_geos)  
**Returns**: <code>null</code> - void  

| Param | Type | Description |
| --- | --- | --- |
| writer | [<code>GEOSWKBWriter</code>](/typedefs-enums/typedefs-enums.html#GEOSWKBWriter) | The writer to set byte order on |
| byteOrder | <code>number</code> | Desired byte order |


---
<a name="exp_module_geos--geos.GEOSWKBWriter_setByteOrder_r"></a>

## geos.GEOSWKBWriter\_setByteOrder\_r ⇒ <code>null</code> ⏏
Set the output byte order of the writer, using a value from GEOSWKBByteOrders enum.

**Kind**: global property of [<code>geos</code>](/typedefs-enums/typedefs-enums.html#module_geos)  
**Returns**: <code>null</code> - void  

| Param | Type | Description |
| --- | --- | --- |
| handle | [<code>GEOSContextHandle\_t</code>](/typedefs-enums/typedefs-enums.html#GEOSContextHandle_t) | - |
| writer | [<code>GEOSWKBWriter</code>](/typedefs-enums/typedefs-enums.html#GEOSWKBWriter) | The writer to set byte order on |
| byteOrder | <code>number</code> | Desired byte order |


---
<a name="exp_module_geos--geos.GEOSWKBWriter_setFlavor"></a>

## geos.GEOSWKBWriter\_setFlavor ⇒ <code>null</code> ⏏
Set the output flavor of the writer, using a value from GEOSWKBFlavors enum.

**Kind**: global property of [<code>geos</code>](/typedefs-enums/typedefs-enums.html#module_geos)  
**Returns**: <code>null</code> - void  

| Param | Type | Description |
| --- | --- | --- |
| writer | [<code>GEOSWKBWriter</code>](/typedefs-enums/typedefs-enums.html#GEOSWKBWriter) | The writer to set flavor on |
| flavor | <code>number</code> | Desired flavor |


---
<a name="exp_module_geos--geos.GEOSWKBWriter_setFlavor_r"></a>

## geos.GEOSWKBWriter\_setFlavor\_r ⇒ <code>null</code> ⏏
Set the output flavor of the writer, using a value from GEOSWKBFlavors enum.

**Kind**: global property of [<code>geos</code>](/typedefs-enums/typedefs-enums.html#module_geos)  
**Returns**: <code>null</code> - void  

| Param | Type | Description |
| --- | --- | --- |
| handle | [<code>GEOSContextHandle\_t</code>](/typedefs-enums/typedefs-enums.html#GEOSContextHandle_t) | - |
| writer | [<code>GEOSWKBWriter</code>](/typedefs-enums/typedefs-enums.html#GEOSWKBWriter) | The writer to set flavor on |
| flavor | <code>number</code> | Desired flavor |


---
<a name="exp_module_geos--geos.GEOSWKBWriter_setIncludeSRID"></a>

## geos.GEOSWKBWriter\_setIncludeSRID ⇒ <code>null</code> ⏏
Specify whether SRID values should be output in WKB. Many WKB readers do not support SRID values, use with caution.

**Kind**: global property of [<code>geos</code>](/typedefs-enums/typedefs-enums.html#module_geos)  
**Returns**: <code>null</code> - void  

| Param | Type | Description |
| --- | --- | --- |
| writer | [<code>GEOSWKBWriter</code>](/typedefs-enums/typedefs-enums.html#GEOSWKBWriter) | The writer to set SRID output on |
| writeSRID | <code>number</code> | Set to 1 to include SRID, 0 otherwise |


---
<a name="exp_module_geos--geos.GEOSWKBWriter_setIncludeSRID_r"></a>

## geos.GEOSWKBWriter\_setIncludeSRID\_r ⇒ <code>null</code> ⏏
Specify whether SRID values should be output in WKB. Many WKB readers do not support SRID values, use with caution.

**Kind**: global property of [<code>geos</code>](/typedefs-enums/typedefs-enums.html#module_geos)  
**Returns**: <code>null</code> - void  

| Param | Type | Description |
| --- | --- | --- |
| handle | [<code>GEOSContextHandle\_t</code>](/typedefs-enums/typedefs-enums.html#GEOSContextHandle_t) | - |
| writer | [<code>GEOSWKBWriter</code>](/typedefs-enums/typedefs-enums.html#GEOSWKBWriter) | The writer to set SRID output on |
| writeSRID | <code>number</code> | Set to 1 to include SRID, 0 otherwise |


---
<a name="exp_module_geos--geos.GEOSWKBWriter_setOutputDimension"></a>

## geos.GEOSWKBWriter\_setOutputDimension ⇒ <code>null</code> ⏏
Set the output dimensionality of the writer. Either 2, 3, or 4 dimensions. Default since GEOS 3.12 is 4.

**Kind**: global property of [<code>geos</code>](/typedefs-enums/typedefs-enums.html#module_geos)  
**Returns**: <code>null</code> - void  

| Param | Type | Description |
| --- | --- | --- |
| writer | [<code>GEOSWKBWriter</code>](/typedefs-enums/typedefs-enums.html#GEOSWKBWriter) | The writer to read from. |
| newDimension | <code>number</code> | The dimensionality desired |


---
<a name="exp_module_geos--geos.GEOSWKBWriter_setOutputDimension_r"></a>

## geos.GEOSWKBWriter\_setOutputDimension\_r ⇒ <code>null</code> ⏏
Set the output dimensionality of the writer. Either 2, 3, or 4 dimensions. Default since GEOS 3.12 is 4.

**Kind**: global property of [<code>geos</code>](/typedefs-enums/typedefs-enums.html#module_geos)  
**Returns**: <code>null</code> - void  

| Param | Type | Description |
| --- | --- | --- |
| handle | [<code>GEOSContextHandle\_t</code>](/typedefs-enums/typedefs-enums.html#GEOSContextHandle_t) | - |
| writer | [<code>GEOSWKBWriter</code>](/typedefs-enums/typedefs-enums.html#GEOSWKBWriter) | The writer to read from. |
| newDimension | <code>number</code> | The dimensionality desired |


---
<a name="exp_module_geos--geos.GEOSWKBWriter_write"></a>

## geos.GEOSWKBWriter\_write ⇒ <code>number</code> ⏏
Write out the WKB representation of a geometry.

**Kind**: global property of [<code>geos</code>](/typedefs-enums/typedefs-enums.html#module_geos)  
**Returns**: <code>number</code> - The WKB representation. Caller must free with GEOSFree()  

| Param | Type | Description |
| --- | --- | --- |
| writer | [<code>GEOSWKBWriter</code>](/typedefs-enums/typedefs-enums.html#GEOSWKBWriter) | The GEOSWKBWriter controlling the writing. |
| g | [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) | Geometry to convert to WKB |
| size | [<code>NumberPointer</code>](/typedefs-enums/typedefs-enums.html#NumberPointer) | Pointer to write the size of the final output WKB to |


---
<a name="exp_module_geos--geos.GEOSWKBWriter_writeHEX"></a>

## geos.GEOSWKBWriter\_writeHEX ⇒ <code>number</code> ⏏
Write out the hex WKB representation of a geometry.

**Kind**: global property of [<code>geos</code>](/typedefs-enums/typedefs-enums.html#module_geos)  
**Returns**: <code>number</code> - The HEX WKB representation. Caller must free with GEOSFree()  

| Param | Type | Description |
| --- | --- | --- |
| writer | [<code>GEOSWKBWriter</code>](/typedefs-enums/typedefs-enums.html#GEOSWKBWriter) | The GEOSWKBWriter controlling the writing. |
| g | [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) | Geometry to convert to WKB |
| size | [<code>NumberPointer</code>](/typedefs-enums/typedefs-enums.html#NumberPointer) | Pointer to write the size of the final output WKB to |


---
<a name="exp_module_geos--geos.GEOSWKBWriter_writeHEX_r"></a>

## geos.GEOSWKBWriter\_writeHEX\_r ⇒ <code>number</code> ⏏
Write out the hex WKB representation of a geometry.

**Kind**: global property of [<code>geos</code>](/typedefs-enums/typedefs-enums.html#module_geos)  
**Returns**: <code>number</code> - The HEX WKB representation. Caller must free with GEOSFree()  

| Param | Type | Description |
| --- | --- | --- |
| handle | [<code>GEOSContextHandle\_t</code>](/typedefs-enums/typedefs-enums.html#GEOSContextHandle_t) | - |
| writer | [<code>GEOSWKBWriter</code>](/typedefs-enums/typedefs-enums.html#GEOSWKBWriter) | The GEOSWKBWriter controlling the writing. |
| g | [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) | Geometry to convert to WKB |
| size | [<code>NumberPointer</code>](/typedefs-enums/typedefs-enums.html#NumberPointer) | Pointer to write the size of the final output WKB to |


---
<a name="exp_module_geos--geos.GEOSWKBWriter_write_r"></a>

## geos.GEOSWKBWriter\_write\_r ⇒ <code>number</code> ⏏
Write out the WKB representation of a geometry.

**Kind**: global property of [<code>geos</code>](/typedefs-enums/typedefs-enums.html#module_geos)  
**Returns**: <code>number</code> - The WKB representation. Caller must free with GEOSFree()  

| Param | Type | Description |
| --- | --- | --- |
| handle | [<code>GEOSContextHandle\_t</code>](/typedefs-enums/typedefs-enums.html#GEOSContextHandle_t) | - |
| writer | [<code>GEOSWKBWriter</code>](/typedefs-enums/typedefs-enums.html#GEOSWKBWriter) | The GEOSWKBWriter controlling the writing. |
| g | [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) | Geometry to convert to WKB |
| size | [<code>NumberPointer</code>](/typedefs-enums/typedefs-enums.html#NumberPointer) | Pointer to write the size of the final output WKB to |


---
