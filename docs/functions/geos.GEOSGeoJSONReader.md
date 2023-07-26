<a name="exp_module_geos--geos.GEOSGeoJSONReader_create"></a>

## geos.GEOSGeoJSONReader\_create ⇒ <code>number</code> ⏏
Creates a GeoJSON reader object.

**Kind**: Exported member  
**Returns**: <code>number</code> - A pointer to a GEOSGeoJSONReader object, or NULL on error.  
**See**: https://libgeos.org/doxygen/geos__c_8h.html#a6a9f3f0b6c7a4a1d1f5c0e2b2a8f9b4d  

---
<a name="exp_module_geos--geos.GEOSGeoJSONReader_create_r"></a>

## geos.GEOSGeoJSONReader\_create\_r ⇒ <code>number</code> ⏏
Creates a GeoJSON reader object.

**Kind**: Exported member  
**Returns**: <code>number</code> - A pointer to a GEOS GeoJSON reader object, or NULL on error.  
**See**: [GEOS C header file](https://libgeos.org/doxygen/geos__c_8h_source.html)  

| Param | Type | Description |
| --- | --- | --- |
| ctx | <code>number</code> | A pointer to a GEOS context handle. |


---
<a name="exp_module_geos--geos.GEOSGeoJSONReader_destroy"></a>

## geos.GEOSGeoJSONReader\_destroy ⇒ <code>void</code> ⏏
Destroys a GeoJSON reader object and releases any allocated resources.

**Kind**: Exported member  
**See**: https://libgeos.org/doxygen/geos__c_8h.html#a0f7a9a6c0b4f1e5b7f2c3a1d3e4d8a9f  

| Param | Type | Description |
| --- | --- | --- |
| reader | <code>number</code> | A pointer to a GEOSGeoJSONReader object. |


---
<a name="exp_module_geos--geos.GEOSGeoJSONReader_destroy_r"></a>

## geos.GEOSGeoJSONReader\_destroy\_r ⇒ <code>void</code> ⏏
Destroys a GEOSGeoJSONReader object.

**Kind**: Exported member  
**See**: https://libgeos.org/doxygen/geos__c_8h.html#a7f9a4b0e2c9b3a1f1d7a9c6d3f0b5e8a  

| Param | Type | Description |
| --- | --- | --- |
| ctx | <code>number</code> | A pointer to a GEOS context handle. |
| reader | <code>number</code> | A pointer to a GEOSGeoJSONReader object. |


---
<a name="exp_module_geos--geos.GEOSGeoJSONReader_readGeometry"></a>

## geos.GEOSGeoJSONReader\_readGeometry ⇒ <code>number</code> ⏏
Reads a geometry from a GeoJSON string.

**Kind**: Exported member  
**Returns**: <code>number</code> - A pointer to a GEOS geometry object representing the GeoJSON geometry, or NULL on error.  
**See**: https://libgeos.org/doxygen/geos__c_8h.html#a0f2a9b4a3b2b6d1c7f0a5e7f1c8f9d5a  

| Param | Type | Description |
| --- | --- | --- |
| reader | <code>number</code> | A pointer to a GEOSGeoJSONReader object. |
| geojson | <code>string</code> | A string containing a valid GeoJSON geometry object. |


---
<a name="exp_module_geos--geos.GEOSGeoJSONReader_readGeometry_r"></a>

## geos.GEOSGeoJSONReader\_readGeometry\_r ⇒ <code>number</code> ⏏
Reads a geometry from a GeoJSON string.

**Kind**: Exported member  
**Returns**: <code>number</code> - A pointer to a GEOS geometry object, or NULL on error or empty input.  
**See**: https://libgeos.org/doxygen/geos__c_8h.html#a9f6a1c0e8f5a3b4c7b3d0f7f2c9a4e8f  

| Param | Type | Description |
| --- | --- | --- |
| ctx | <code>number</code> | A pointer to a GEOS context handle. |
| reader | <code>number</code> | A pointer to a GEOSGeoJSONReader object. |
| geojson | <code>string</code> | A GeoJSON string representing a geometry. |


---
