<a name="exp_module_geos--geos.GEOSGeoJSONWriter_create_r"></a>

## geos.GEOSGeoJSONWriter\_create\_r ⇒ [<code>GEOSGeoJSONWriter</code>](/typedefs-enums/typedefs-enums.html#GEOSGeoJSONWriter) ⏏
Allocate a new GEOSGeoJSONWriter.

**Kind**: global property of [<code>geos</code>](/typedefs-enums/typedefs-enums.html#module_geos)  
**Returns**: [<code>GEOSGeoJSONWriter</code>](/typedefs-enums/typedefs-enums.html#GEOSGeoJSONWriter) - a new writer. Caller must free with GEOSGeoJSONWriter_destroy()  

| Param | Type | Description |
| --- | --- | --- |
| handle | [<code>GEOSContextHandle\_t</code>](/typedefs-enums/typedefs-enums.html#GEOSContextHandle_t) | - |


---
<a name="exp_module_geos--geos.GEOSGeoJSONWriter_destroy"></a>

## geos.GEOSGeoJSONWriter\_destroy ⇒ <code>null</code> ⏏
Free the memory associated with a GEOSGeoJSONWriter.

**Kind**: global property of [<code>geos</code>](/typedefs-enums/typedefs-enums.html#module_geos)  
**Returns**: <code>null</code> - void  

| Param | Type | Description |
| --- | --- | --- |
| writer | [<code>GEOSGeoJSONWriter</code>](/typedefs-enums/typedefs-enums.html#GEOSGeoJSONWriter) | The writer to destroy. |


---
<a name="exp_module_geos--geos.GEOSGeoJSONWriter_destroy_r"></a>

## geos.GEOSGeoJSONWriter\_destroy\_r ⇒ <code>null</code> ⏏
Free the memory associated with a GEOSGeoJSONWriter.

**Kind**: global property of [<code>geos</code>](/typedefs-enums/typedefs-enums.html#module_geos)  
**Returns**: <code>null</code> - void  

| Param | Type | Description |
| --- | --- | --- |
| handle | [<code>GEOSContextHandle\_t</code>](/typedefs-enums/typedefs-enums.html#GEOSContextHandle_t) | - |
| writer | [<code>GEOSGeoJSONWriter</code>](/typedefs-enums/typedefs-enums.html#GEOSGeoJSONWriter) | The writer to destroy. |


---
<a name="exp_module_geos--geos.GEOSGeoJSONWriter_writeGeometry"></a>

## geos.GEOSGeoJSONWriter\_writeGeometry ⇒ [<code>StringPointer</code>](/typedefs-enums/typedefs-enums.html#StringPointer) ⏏
Write out the GeoJSON representation of a geometry. Note that writing a GeoJSON Feature or FeatureCollection is unsupported through the GEOS C API.

**Kind**: global property of [<code>geos</code>](/typedefs-enums/typedefs-enums.html#module_geos)  
**Returns**: [<code>StringPointer</code>](/typedefs-enums/typedefs-enums.html#StringPointer) - A char pointer, caller to free with GEOSFree())  

| Param | Type | Description |
| --- | --- | --- |
| writer | [<code>GEOSGeoJSONWriter</code>](/typedefs-enums/typedefs-enums.html#GEOSGeoJSONWriter) | A GeoJSON reader object, caller retains ownership. |
| g | [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) | The geometry to convert, caller retains ownership. |
| indent | <code>number</code> | The indentation used. Use -1 for no formatting. |


---
<a name="exp_module_geos--geos.GEOSGeoJSONWriter_writeGeometry_r"></a>

## geos.GEOSGeoJSONWriter\_writeGeometry\_r ⇒ [<code>StringPointer</code>](/typedefs-enums/typedefs-enums.html#StringPointer) ⏏
Write out the GeoJSON representation of a geometry. Note that writing a GeoJSON Feature or FeatureCollection is unsupported through the GEOS C API.

**Kind**: global property of [<code>geos</code>](/typedefs-enums/typedefs-enums.html#module_geos)  
**Returns**: [<code>StringPointer</code>](/typedefs-enums/typedefs-enums.html#StringPointer) - A char pointer, caller to free with GEOSFree())  

| Param | Type | Description |
| --- | --- | --- |
| handle | [<code>GEOSContextHandle\_t</code>](/typedefs-enums/typedefs-enums.html#GEOSContextHandle_t) | - |
| writer | [<code>GEOSGeoJSONWriter</code>](/typedefs-enums/typedefs-enums.html#GEOSGeoJSONWriter) | A GeoJSON reader object, caller retains ownership. |
| g | [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) | The geometry to convert, caller retains ownership. |
| indent | <code>number</code> | The indentation used. Use -1 for no formatting. |


---
