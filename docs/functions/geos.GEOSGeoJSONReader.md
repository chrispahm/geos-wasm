<a name="exp_module_geos--geos.GEOSGeoJSONReader_create_r"></a>

## geos.GEOSGeoJSONReader\_create\_r ⇒ [<code>GEOSGeoJSONReader</code>](/typedefs-enums/typedefs-enums.html#GEOSGeoJSONReader) ⏏
Allocate a new GEOSGeoJSONReader.

**Kind**: global property of [<code>geos</code>](/typedefs-enums/typedefs-enums.html#module_geos)  
**Returns**: [<code>GEOSGeoJSONReader</code>](/typedefs-enums/typedefs-enums.html#GEOSGeoJSONReader) - a new reader. Caller must free with GEOSGeoJSONReader_destroy()  

| Param | Type | Description |
| --- | --- | --- |
| handle | [<code>GEOSContextHandle\_t</code>](/typedefs-enums/typedefs-enums.html#GEOSContextHandle_t) | - |


---
<a name="exp_module_geos--geos.GEOSGeoJSONReader_destroy"></a>

## geos.GEOSGeoJSONReader\_destroy ⇒ <code>null</code> ⏏
Free the memory associated with a GEOSGeoJSONReader.

**Kind**: global property of [<code>geos</code>](/typedefs-enums/typedefs-enums.html#module_geos)  
**Returns**: <code>null</code> - void  

| Param | Type | Description |
| --- | --- | --- |
| reader | [<code>GEOSGeoJSONReader</code>](/typedefs-enums/typedefs-enums.html#GEOSGeoJSONReader) | The reader to destroy. |


---
<a name="exp_module_geos--geos.GEOSGeoJSONReader_destroy_r"></a>

## geos.GEOSGeoJSONReader\_destroy\_r ⇒ <code>null</code> ⏏
Free the memory associated with a GEOSGeoJSONReader.

**Kind**: global property of [<code>geos</code>](/typedefs-enums/typedefs-enums.html#module_geos)  
**Returns**: <code>null</code> - void  

| Param | Type | Description |
| --- | --- | --- |
| handle | [<code>GEOSContextHandle\_t</code>](/typedefs-enums/typedefs-enums.html#GEOSContextHandle_t) | - |
| reader | [<code>GEOSGeoJSONReader</code>](/typedefs-enums/typedefs-enums.html#GEOSGeoJSONReader) | The reader to destroy. |


---
<a name="exp_module_geos--geos.GEOSGeoJSONReader_readGeometry"></a>

## geos.GEOSGeoJSONReader\_readGeometry ⇒ [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) ⏏
Use a reader to parse a GeoJSON string. A single geometry or Feature is parsed as a geometry. A FeatureCollection is parsed as a GeometryCollection. Feature properties are not read.

**Kind**: global property of [<code>geos</code>](/typedefs-enums/typedefs-enums.html#module_geos)  
**Returns**: [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) - A GEOSGeometry, caller to free with GEOSGeom_destroy())  

| Param | Type | Description |
| --- | --- | --- |
| reader | [<code>GEOSGeoJSONReader</code>](/typedefs-enums/typedefs-enums.html#GEOSGeoJSONReader) | A GeoJSON reader object, caller retains ownership |
| geojson | [<code>StringPointer</code>](/typedefs-enums/typedefs-enums.html#StringPointer) | The json string to parse, caller retains ownership |


---
<a name="exp_module_geos--geos.GEOSGeoJSONReader_readGeometry_r"></a>

## geos.GEOSGeoJSONReader\_readGeometry\_r ⇒ [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) ⏏
**Kind**: global property of [<code>geos</code>](/typedefs-enums/typedefs-enums.html#module_geos)  
**Returns**: [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) - GEOSGeometry*  

| Param | Type | Description |
| --- | --- | --- |
| handle | [<code>GEOSContextHandle\_t</code>](/typedefs-enums/typedefs-enums.html#GEOSContextHandle_t) | - |
| reader | [<code>GEOSGeoJSONReader</code>](/typedefs-enums/typedefs-enums.html#GEOSGeoJSONReader) | - |
| geojson | [<code>StringPointer</code>](/typedefs-enums/typedefs-enums.html#StringPointer) | - |


---
