<a name="exp_module_geos--geos.GEOSGeoJSONWriter_create"></a>

## geos.GEOSGeoJSONWriter\_create ⇒ <code>number</code> ⏏
Creates a GeoJSON writer object.

**Kind**: Exported member  
**Returns**: <code>number</code> - A pointer to a GEOSGeoJSONWriter object, or NULL on error.  
**See**: [GEOS C header file](https://libgeos.org/doxygen/geos__c_8h_source.html)  

---
<a name="exp_module_geos--geos.GEOSGeoJSONWriter_create_r"></a>

## geos.GEOSGeoJSONWriter\_create\_r ⇒ <code>number</code> ⏏
Creates a GeoJSON writer object.

**Kind**: Exported member  
**Returns**: <code>number</code> - A pointer to a GEOS GeoJSON writer object, or NULL on error.  
**See**: [GEOS C header file](https://libgeos.org/doxygen/geos__c_8h_source.html)  

| Param | Type | Description |
| --- | --- | --- |
| handle | <code>number</code> | A pointer to a GEOS context handle. |


---
<a name="exp_module_geos--geos.GEOSGeoJSONWriter_destroy"></a>

## geos.GEOSGeoJSONWriter\_destroy ⇒ <code>void</code> ⏏
Destroys a GeoJSON writer object and releases any allocated resources.

**Kind**: Exported member  
**See**: https://libgeos.org/doxygen/geos__c_8h.html#a2f0a7c9f0a4a6b3e1f5d6d8c7a3e1b4c  

| Param | Type | Description |
| --- | --- | --- |
| writer | <code>number</code> | A pointer to a GEOS GeoJSON writer object. |


---
<a name="exp_module_geos--geos.GEOSGeoJSONWriter_destroy_r"></a>

## geos.GEOSGeoJSONWriter\_destroy\_r ⇒ <code>void</code> ⏏
Destroys a GEOSGeoJSONWriter object and releases the memory associated with it.

**Kind**: Exported member  
**Returns**: <code>void</code> - No return value.  
**See**: https://libgeos.org/doxygen/geos__c_8h.html#a3f0f5c2b0a6d1a9e7f9a4b6b1c4f3d5a  

| Param | Type | Description |
| --- | --- | --- |
| ctx | <code>number</code> | A pointer to a GEOS context handle. |
| writer | <code>number</code> | A pointer to a GEOSGeoJSONWriter object. |


---
<a name="exp_module_geos--geos.GEOSGeoJSONWriter_writeGeometry"></a>

## geos.GEOSGeoJSONWriter\_writeGeometry ⇒ <code>string</code> ⏏
Writes a geometry object to a GeoJSON string.

**Kind**: Exported member  
**Returns**: <code>string</code> - A GeoJSON string representation of the geometry, or NULL on error.  
**See**: https://libgeos.org/doxygen/geos__c_8h.html#a0a3f1f6b2a1f7d0b5a9c4d2c6b7e9e0a  

| Param | Type | Description |
| --- | --- | --- |
| writer | <code>number</code> | A pointer to a GEOSGeoJSONWriter object. |
| g | <code>number</code> | A pointer to a GEOS geometry object. |


---
<a name="exp_module_geos--geos.GEOSGeoJSONWriter_writeGeometry_r"></a>

## geos.GEOSGeoJSONWriter\_writeGeometry\_r ⇒ <code>string</code> ⏏
Writes a geometry to a GeoJSON string.

**Kind**: Exported member  
**Returns**: <code>string</code> - A GeoJSON string representation of the geometry, or NULL on error.  
**See**: https://libgeos.org/doxygen/geos__c_8h.html#a9a6f9f0b3a4c1a2e7c1d0e4e1b3a2c5d  

| Param | Type | Description |
| --- | --- | --- |
| ctx | <code>number</code> | A GEOS context handle. |
| writer | <code>number</code> | A pointer to a GEOSGeoJSONWriter object. |
| geom | <code>number</code> | A pointer to a GEOS geometry object. |


---
