<a name="exp_module_geos--geos.GEOSWKTReader_create_r"></a>

## geos.GEOSWKTReader\_create\_r ⇒ [<code>GEOSWKTReader</code>](/typedefs-enums/typedefs-enums.html#GEOSWKTReader) ⏏
Allocate a new GEOSWKTReader.

**Kind**: global property of [<code>geos</code>](/typedefs-enums/typedefs-enums.html#module_geos)  
**Returns**: [<code>GEOSWKTReader</code>](/typedefs-enums/typedefs-enums.html#GEOSWKTReader) - a new reader. Caller must free with GEOSWKTReader_destroy()  

| Param | Type | Description |
| --- | --- | --- |
| handle | [<code>GEOSContextHandle\_t</code>](/typedefs-enums/typedefs-enums.html#GEOSContextHandle_t) | - |


---
<a name="exp_module_geos--geos.GEOSWKTReader_destroy"></a>

## geos.GEOSWKTReader\_destroy ⇒ <code>null</code> ⏏
Free the memory associated with a GEOSWKTReader.

**Kind**: global property of [<code>geos</code>](/typedefs-enums/typedefs-enums.html#module_geos)  
**Returns**: <code>null</code> - void  

| Param | Type | Description |
| --- | --- | --- |
| reader | [<code>GEOSWKTReader</code>](/typedefs-enums/typedefs-enums.html#GEOSWKTReader) | The reader to destroy. |


---
<a name="exp_module_geos--geos.GEOSWKTReader_destroy_r"></a>

## geos.GEOSWKTReader\_destroy\_r ⇒ <code>null</code> ⏏
Free the memory associated with a GEOSWKTReader.

**Kind**: global property of [<code>geos</code>](/typedefs-enums/typedefs-enums.html#module_geos)  
**Returns**: <code>null</code> - void  

| Param | Type | Description |
| --- | --- | --- |
| handle | [<code>GEOSContextHandle\_t</code>](/typedefs-enums/typedefs-enums.html#GEOSContextHandle_t) | - |
| reader | [<code>GEOSWKTReader</code>](/typedefs-enums/typedefs-enums.html#GEOSWKTReader) | The reader to destroy. |


---
<a name="exp_module_geos--geos.GEOSWKTReader_read"></a>

## geos.GEOSWKTReader\_read ⇒ [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) ⏏
Use a reader to parse the well-known text representation of a geometry, and return an allocated geometry.

**Kind**: global property of [<code>geos</code>](/typedefs-enums/typedefs-enums.html#module_geos)  
**Returns**: [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) - A GEOSGeometry, caller to free with GEOSGeom_destroy())  

| Param | Type | Description |
| --- | --- | --- |
| reader | [<code>GEOSWKTReader</code>](/typedefs-enums/typedefs-enums.html#GEOSWKTReader) | A WKT reader object, caller retains ownership |
| wkt | [<code>StringPointer</code>](/typedefs-enums/typedefs-enums.html#StringPointer) | The WKT string to parse, caller retains ownership |


---
<a name="exp_module_geos--geos.GEOSWKTReader_read_r"></a>

## geos.GEOSWKTReader\_read\_r ⇒ [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) ⏏
Use a reader to parse the well-known text representation of a geometry, and return an allocated geometry.

**Kind**: global property of [<code>geos</code>](/typedefs-enums/typedefs-enums.html#module_geos)  
**Returns**: [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) - A GEOSGeometry, caller to free with GEOSGeom_destroy())  

| Param | Type | Description |
| --- | --- | --- |
| handle | [<code>GEOSContextHandle\_t</code>](/typedefs-enums/typedefs-enums.html#GEOSContextHandle_t) | - |
| reader | [<code>GEOSWKTReader</code>](/typedefs-enums/typedefs-enums.html#GEOSWKTReader) | A WKT reader object, caller retains ownership |
| wkt | [<code>StringPointer</code>](/typedefs-enums/typedefs-enums.html#StringPointer) | The WKT string to parse, caller retains ownership |


---
<a name="exp_module_geos--geos.GEOSWKTReader_setFixStructure"></a>

## geos.GEOSWKTReader\_setFixStructure ⇒ <code>null</code> ⏏
Set the reader to automatically repair structural errors in the input (currently just unclosed rings) while reading.

**Kind**: global property of [<code>geos</code>](/typedefs-enums/typedefs-enums.html#module_geos)  
**Returns**: <code>null</code> - void  

| Param | Type | Description |
| --- | --- | --- |
| reader | [<code>GEOSWKTReader</code>](/typedefs-enums/typedefs-enums.html#GEOSWKTReader) | A WKT reader object, caller retains ownership |
| doFix | <code>number</code> | Set to 1 to repair, 0 for no repair (default). |


---
<a name="exp_module_geos--geos.GEOSWKTReader_setFixStructure_r"></a>

## geos.GEOSWKTReader\_setFixStructure\_r ⇒ <code>null</code> ⏏
Set the reader to automatically repair structural errors in the input (currently just unclosed rings) while reading.

**Kind**: global property of [<code>geos</code>](/typedefs-enums/typedefs-enums.html#module_geos)  
**Returns**: <code>null</code> - void  

| Param | Type | Description |
| --- | --- | --- |
| handle | [<code>GEOSContextHandle\_t</code>](/typedefs-enums/typedefs-enums.html#GEOSContextHandle_t) | - |
| reader | [<code>GEOSWKTReader</code>](/typedefs-enums/typedefs-enums.html#GEOSWKTReader) | A WKT reader object, caller retains ownership |
| doFix | <code>number</code> | Set to 1 to repair, 0 for no repair (default). |


---
