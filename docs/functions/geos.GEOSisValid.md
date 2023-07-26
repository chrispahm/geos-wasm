<a name="exp_module_geos--geos.GEOSisValid"></a>

## geos.GEOSisValid ⇒ <code>number</code> ⏏
Tests whether a geometry is valid according to the OGC rules for geometry validity.

**Kind**: Exported member  
**Returns**: <code>number</code> - 1 if the geometry is valid, 0 if it is invalid, or -1 if an error occurred.  
**See**: https://docs.rs/geos-sys/1.0.10/geos_sys/fn.GEOSisValid.html  

| Param | Type | Description |
| --- | --- | --- |
| geom | <code>number</code> | The geometry to test. |


---
<a name="exp_module_geos--geos.GEOSisValidDetail"></a>

## geos.GEOSisValidDetail ⇒ <code>number</code> ⏏
Returns a valid_detail row, containing a boolean stating if a geometry is valid,
a varchar stating a reason why it is invalid and a geometry pointing out where it is invalid.

**Kind**: Exported member  
**Returns**: <code>number</code> - 1 if the geometry is valid, 0 if it is invalid, or -1 on error  
**See**: [GEOSisValidDetail](https://libgeos.org/doxygen/geos__c_8h.html#a1f7b2d9e0a7d2e9d7e6f4a7a2f3e5b9d)  

| Param | Type | Description |
| --- | --- | --- |
| g | <code>number</code> | A pointer to a GEOSGeometry object |
| flags | <code>number</code> | A bitfield for setting options. See [ST_IsValidDetail](https://postgis.net/docs/ST_IsValidDetail.html) for details. |
| reason | <code>string</code> | A pointer to store the null-terminated string describing the validity of the geometry |
| location | <code>number</code> | A pointer to store the GEOSGeometry object indicating the location of invalidity |


---
<a name="exp_module_geos--geos.GEOSisValidDetail_r"></a>

## geos.GEOSisValidDetail\_r ⇒ <code>number</code> ⏏
Returns a valid_detail row, containing a boolean stating if a geometry is valid,
a varchar stating a reason why it is invalid and a geometry pointing out where it is invalid. Thread-safe version.

**Kind**: Exported member  
**Returns**: <code>number</code> - 1 if the geometry is valid, 0 if it is invalid, or -1 on error  
**See**: [GEOSisValidDetail_r](https://libgeos.org/doxygen/geos__c_8h.html#a1f7b2d9e0a7d2e9d7e6f4a7a2f3e5b9d)  

| Param | Type | Description |
| --- | --- | --- |
| handle | <code>number</code> | A GEOS context handle |
| g | <code>number</code> | A pointer to a GEOSGeometry object |
| flags | <code>number</code> | A bitfield for setting options. See [ST_IsValidDetail](https://postgis.net/docs/ST_IsValidDetail.html) for details. |
| reason | <code>string</code> | A pointer to store the null-terminated string describing the validity of the geometry |
| location | <code>number</code> | A pointer to store the GEOSGeometry object indicating the location of invalidity |


---
<a name="exp_module_geos--geos.GEOSisValidReason"></a>

## geos.GEOSisValidReason ⇒ <code>string</code> ⏏
Returns text stating if a geometry is valid, or if invalid a reason why.

**Kind**: Exported member  
**Returns**: <code>string</code> - A null-terminated string describing the validity of the geometry  
**See**: [GEOSisValidReason](https://libgeos.org/doxygen/geos__c_8h.html#a0f3a7b9f9c6b5a1d0c2f6c8e3a4d4b5e)  

| Param | Type | Description |
| --- | --- | --- |
| g | <code>number</code> | A pointer to a GEOSGeometry object |


---
<a name="exp_module_geos--geos.GEOSisValidReason_r"></a>

## geos.GEOSisValidReason\_r ⇒ <code>string</code> ⏏
Returns text stating if a geometry is valid, or if invalid a reason why. Thread-safe version.

**Kind**: Exported member  
**Returns**: <code>string</code> - A null-terminated string describing the validity of the geometry  
**See**: [GEOSisValidReason_r](https://libgeos.org/doxygen/geos__c_8h.html#a0f3a7b9f9c6b5a1d0c2f6c8e3a4d4b5e)  

| Param | Type | Description |
| --- | --- | --- |
| handle | <code>number</code> | A GEOS context handle |
| g | <code>number</code> | A pointer to a GEOSGeometry object |


---
<a name="exp_module_geos--geos.GEOSisValid_r"></a>

## geos.GEOSisValid\_r ⇒ <code>number</code> ⏏
Tests whether a geometry is valid according to the OGC rules for geometry validity.

**Kind**: Exported member  
**Returns**: <code>number</code> - 1 if the geometry is valid, 0 if it is invalid, or -1 if an error occurred.  
**See**: https://docs.rs/geos-sys/1.0.10/geos_sys/fn.GEOSisValid_r.html  

| Param | Type | Description |
| --- | --- | --- |
| handle | <code>number</code> | A pointer to the GEOS context handle. |
| geom | <code>number</code> | The geometry to test. |


---
