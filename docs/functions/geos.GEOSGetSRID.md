<a name="exp_module_geos--geos.GEOSGetSRID"></a>

## geos.GEOSGetSRID ⇒ <code>number</code> ⏏
Returns the Spatial Reference System ID (SRID) of a geometry.

**Kind**: Exported member  
**Returns**: <code>number</code> - The SRID of the geometry, or 0 if not set.  

| Param | Type | Description |
| --- | --- | --- |
| g | <code>number</code> | A pointer to a GEOSGeometry object. |


---
<a name="exp_module_geos--geos.GEOSGetSRID_r"></a>

## geos.GEOSGetSRID\_r ⇒ <code>number</code> ⏏
Returns the Spatial Reference System ID (SRID) of a geometry in a thread-safe manner.

**Kind**: Exported member  
**Returns**: <code>number</code> - The SRID of the geometry, or 0 if not set.  

| Param | Type | Description |
| --- | --- | --- |
| handle | <code>number</code> | A pointer to a GEOSContextHandle_t object. |
| g | <code>number</code> | A pointer to a GEOSGeometry object. |


---
