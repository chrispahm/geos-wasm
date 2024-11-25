<a name="exp_module_geos--geos.GEOSWKTWriter_create_r"></a>

## geos.GEOSWKTWriter\_create\_r ⇒ [<code>GEOSWKTWriter</code>](/typedefs-enums/typedefs-enums.html#GEOSWKTWriter) ⏏
Allocate a new GEOSWKTReader.

**Kind**: global property of [<code>geos</code>](/typedefs-enums/typedefs-enums.html#module_geos)  
**Returns**: [<code>GEOSWKTWriter</code>](/typedefs-enums/typedefs-enums.html#GEOSWKTWriter) - a new reader. Caller must free with GEOSWKTReader_destroy()  

| Param | Type | Description |
| --- | --- | --- |
| handle | [<code>GEOSContextHandle\_t</code>](/typedefs-enums/typedefs-enums.html#GEOSContextHandle_t) | - |


---
<a name="exp_module_geos--geos.GEOSWKTWriter_destroy"></a>

## geos.GEOSWKTWriter\_destroy ⇒ <code>null</code> ⏏
Free the memory associated with a GEOSWKTWriter.

**Kind**: global property of [<code>geos</code>](/typedefs-enums/typedefs-enums.html#module_geos)  
**Returns**: <code>null</code> - void  

| Param | Type | Description |
| --- | --- | --- |
| writer | [<code>GEOSWKTWriter</code>](/typedefs-enums/typedefs-enums.html#GEOSWKTWriter) | The writer to destroy. |


---
<a name="exp_module_geos--geos.GEOSWKTWriter_destroy_r"></a>

## geos.GEOSWKTWriter\_destroy\_r ⇒ <code>null</code> ⏏
Free the memory associated with a GEOSWKTWriter.

**Kind**: global property of [<code>geos</code>](/typedefs-enums/typedefs-enums.html#module_geos)  
**Returns**: <code>null</code> - void  

| Param | Type | Description |
| --- | --- | --- |
| handle | [<code>GEOSContextHandle\_t</code>](/typedefs-enums/typedefs-enums.html#GEOSContextHandle_t) | - |
| writer | [<code>GEOSWKTWriter</code>](/typedefs-enums/typedefs-enums.html#GEOSWKTWriter) | The writer to destroy. |


---
<a name="exp_module_geos--geos.GEOSWKTWriter_getOutputDimension"></a>

## geos.GEOSWKTWriter\_getOutputDimension ⇒ <code>number</code> ⏏
Reads the current output dimension from a GEOSWKTWriter.

**Kind**: global property of [<code>geos</code>](/typedefs-enums/typedefs-enums.html#module_geos)  
**Returns**: <code>number</code> - The current dimension.  

| Param | Type | Description |
| --- | --- | --- |
| writer | [<code>GEOSWKTWriter</code>](/typedefs-enums/typedefs-enums.html#GEOSWKTWriter) | A GEOSWKTWriter. |


---
<a name="exp_module_geos--geos.GEOSWKTWriter_getOutputDimension_r"></a>

## geos.GEOSWKTWriter\_getOutputDimension\_r ⇒ <code>number</code> ⏏
Reads the current output dimension from a GEOSWKTWriter.

**Kind**: global property of [<code>geos</code>](/typedefs-enums/typedefs-enums.html#module_geos)  
**Returns**: <code>number</code> - The current dimension.  

| Param | Type | Description |
| --- | --- | --- |
| handle | [<code>GEOSContextHandle\_t</code>](/typedefs-enums/typedefs-enums.html#GEOSContextHandle_t) | - |
| writer | [<code>GEOSWKTWriter</code>](/typedefs-enums/typedefs-enums.html#GEOSWKTWriter) | A GEOSWKTWriter. |


---
<a name="exp_module_geos--geos.GEOSWKTWriter_setOld3D"></a>

## geos.GEOSWKTWriter\_setOld3D ⇒ <code>null</code> ⏏
Sets the format for 3D outputs. The "old 3D" format does not include a Z dimension tag, e.g. "POINT (1 2 3)", except for XYM, e.g. "POINT M (1 2 3)". Geometries with XYZM coordinates do not add any dimensionality tags, e.g. "POINT (1 2 3 4)".

**Kind**: global property of [<code>geos</code>](/typedefs-enums/typedefs-enums.html#module_geos)  
**Returns**: <code>null</code> - void  

| Param | Type | Description |
| --- | --- | --- |
| writer | [<code>GEOSWKTWriter</code>](/typedefs-enums/typedefs-enums.html#GEOSWKTWriter) | A GEOSWKTWriter. |
| useOld3D | <code>number</code> | True to use the old format, false is the default. |


---
<a name="exp_module_geos--geos.GEOSWKTWriter_setOld3D_r"></a>

## geos.GEOSWKTWriter\_setOld3D\_r ⇒ <code>null</code> ⏏
Sets the format for 3D outputs. The "old 3D" format does not include a Z dimension tag, e.g. "POINT (1 2 3)", except for XYM, e.g. "POINT M (1 2 3)". Geometries with XYZM coordinates do not add any dimensionality tags, e.g. "POINT (1 2 3 4)".

**Kind**: global property of [<code>geos</code>](/typedefs-enums/typedefs-enums.html#module_geos)  
**Returns**: <code>null</code> - void  

| Param | Type | Description |
| --- | --- | --- |
| handle | [<code>GEOSContextHandle\_t</code>](/typedefs-enums/typedefs-enums.html#GEOSContextHandle_t) | - |
| writer | [<code>GEOSWKTWriter</code>](/typedefs-enums/typedefs-enums.html#GEOSWKTWriter) | A GEOSWKTWriter. |
| useOld3D | <code>number</code> | True to use the old format, false is the default. |


---
<a name="exp_module_geos--geos.GEOSWKTWriter_setOutputDimension"></a>

## geos.GEOSWKTWriter\_setOutputDimension ⇒ <code>null</code> ⏏
Set the output dimensionality of the writer. Either 2, 3, or 4 dimensions. Default since GEOS 3.12 is 4.

**Kind**: global property of [<code>geos</code>](/typedefs-enums/typedefs-enums.html#module_geos)  
**Returns**: <code>null</code> - void  

| Param | Type | Description |
| --- | --- | --- |
| writer | [<code>GEOSWKTWriter</code>](/typedefs-enums/typedefs-enums.html#GEOSWKTWriter) | A GEOSWKTWriter. |
| dim | <code>number</code> | The dimensionality desired. |


---
<a name="exp_module_geos--geos.GEOSWKTWriter_setOutputDimension_r"></a>

## geos.GEOSWKTWriter\_setOutputDimension\_r ⇒ <code>null</code> ⏏
Set the output dimensionality of the writer. Either 2, 3, or 4 dimensions. Default since GEOS 3.12 is 4.

**Kind**: global property of [<code>geos</code>](/typedefs-enums/typedefs-enums.html#module_geos)  
**Returns**: <code>null</code> - void  

| Param | Type | Description |
| --- | --- | --- |
| handle | [<code>GEOSContextHandle\_t</code>](/typedefs-enums/typedefs-enums.html#GEOSContextHandle_t) | - |
| writer | [<code>GEOSWKTWriter</code>](/typedefs-enums/typedefs-enums.html#GEOSWKTWriter) | A GEOSWKTWriter. |
| dim | <code>number</code> | The dimensionality desired. |


---
<a name="exp_module_geos--geos.GEOSWKTWriter_setRoundingPrecision"></a>

## geos.GEOSWKTWriter\_setRoundingPrecision ⇒ <code>null</code> ⏏
Sets the number places after the decimal to output in WKT.

**Kind**: global property of [<code>geos</code>](/typedefs-enums/typedefs-enums.html#module_geos)  
**Returns**: <code>null</code> - void  

| Param | Type | Description |
| --- | --- | --- |
| writer | [<code>GEOSWKTWriter</code>](/typedefs-enums/typedefs-enums.html#GEOSWKTWriter) | A GEOSWKTWriter. |
| precision | <code>number</code> | The desired precision, default 16. |


---
<a name="exp_module_geos--geos.GEOSWKTWriter_setRoundingPrecision_r"></a>

## geos.GEOSWKTWriter\_setRoundingPrecision\_r ⇒ <code>null</code> ⏏
Sets the number places after the decimal to output in WKT.

**Kind**: global property of [<code>geos</code>](/typedefs-enums/typedefs-enums.html#module_geos)  
**Returns**: <code>null</code> - void  

| Param | Type | Description |
| --- | --- | --- |
| handle | [<code>GEOSContextHandle\_t</code>](/typedefs-enums/typedefs-enums.html#GEOSContextHandle_t) | - |
| writer | [<code>GEOSWKTWriter</code>](/typedefs-enums/typedefs-enums.html#GEOSWKTWriter) | A GEOSWKTWriter. |
| precision | <code>number</code> | The desired precision, default 16. |


---
<a name="exp_module_geos--geos.GEOSWKTWriter_setTrim"></a>

## geos.GEOSWKTWriter\_setTrim ⇒ <code>null</code> ⏏
Sets the number trimming option on a GEOSWKTWriter. With trim set to 1, the writer will strip trailing 0's from the output coordinates. With 1 (trimming enabled), big and small absolute coordinates will use scientific notation, otherwise positional notation is used; see GEOS_printDouble for details. With 0 (trimming disabled), all coordinates will be padded with 0's out to the rounding precision. Default since GEOS 3.12 is with trim set to 1 for 'on'.

**Kind**: global property of [<code>geos</code>](/typedefs-enums/typedefs-enums.html#module_geos)  
**Returns**: <code>null</code> - void  

| Param | Type | Description |
| --- | --- | --- |
| writer | [<code>GEOSWKTWriter</code>](/typedefs-enums/typedefs-enums.html#GEOSWKTWriter) | A GEOSWKTWriter. |
| trim | <code>number</code> | The trimming behaviour to set, 1 for 'on', 0 for 'off' |


---
<a name="exp_module_geos--geos.GEOSWKTWriter_setTrim_r"></a>

## geos.GEOSWKTWriter\_setTrim\_r ⇒ <code>null</code> ⏏
Sets the number trimming option on a GEOSWKTWriter. With trim set to 1, the writer will strip trailing 0's from the output coordinates. With 1 (trimming enabled), big and small absolute coordinates will use scientific notation, otherwise positional notation is used; see GEOS_printDouble for details. With 0 (trimming disabled), all coordinates will be padded with 0's out to the rounding precision. Default since GEOS 3.12 is with trim set to 1 for 'on'.

**Kind**: global property of [<code>geos</code>](/typedefs-enums/typedefs-enums.html#module_geos)  
**Returns**: <code>null</code> - void  

| Param | Type | Description |
| --- | --- | --- |
| handle | [<code>GEOSContextHandle\_t</code>](/typedefs-enums/typedefs-enums.html#GEOSContextHandle_t) | - |
| writer | [<code>GEOSWKTWriter</code>](/typedefs-enums/typedefs-enums.html#GEOSWKTWriter) | A GEOSWKTWriter. |
| trim | <code>number</code> | The trimming behaviour to set, 1 for 'on', 0 for 'off' |


---
<a name="exp_module_geos--geos.GEOSWKTWriter_write"></a>

## geos.GEOSWKTWriter\_write ⇒ [<code>StringPointer</code>](/typedefs-enums/typedefs-enums.html#StringPointer) ⏏
Writes out the well-known text representation of a geometry, using the trim, rounding and dimension settings of the writer.

**Kind**: global property of [<code>geos</code>](/typedefs-enums/typedefs-enums.html#module_geos)  
**Returns**: [<code>StringPointer</code>](/typedefs-enums/typedefs-enums.html#StringPointer) - A newly allocated string containing the WKT output or NULL on exception. Caller must free with GEOSFree()  

| Param | Type | Description |
| --- | --- | --- |
| writer | [<code>GEOSWKTWriter</code>](/typedefs-enums/typedefs-enums.html#GEOSWKTWriter) | A GEOSWKTWriter. |
| g | [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) | Input geometry |


---
<a name="exp_module_geos--geos.GEOSWKTWriter_write_r"></a>

## geos.GEOSWKTWriter\_write\_r ⇒ [<code>StringPointer</code>](/typedefs-enums/typedefs-enums.html#StringPointer) ⏏
Writes out the well-known text representation of a geometry, using the trim, rounding and dimension settings of the writer.

**Kind**: global property of [<code>geos</code>](/typedefs-enums/typedefs-enums.html#module_geos)  
**Returns**: [<code>StringPointer</code>](/typedefs-enums/typedefs-enums.html#StringPointer) - A newly allocated string containing the WKT output or NULL on exception. Caller must free with GEOSFree()  

| Param | Type | Description |
| --- | --- | --- |
| handle | [<code>GEOSContextHandle\_t</code>](/typedefs-enums/typedefs-enums.html#GEOSContextHandle_t) | - |
| writer | [<code>GEOSWKTWriter</code>](/typedefs-enums/typedefs-enums.html#GEOSWKTWriter) | A GEOSWKTWriter. |
| g | [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) | Input geometry |


---
