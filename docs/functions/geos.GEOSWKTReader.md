<a name="exp_module_geos--geos.GEOSWKTReader_create"></a>

## geos.GEOSWKTReader\_create ⇒ <code>number</code> ⏏
Creates a new GEOSWKTReader object.

**Kind**: Exported member  
**Returns**: <code>number</code> - A pointer to a GEOSWKTReader object, or NULL on error.  
**See**: https://libgeos.org/doxygen/geos__c_8h.html  

---
<a name="exp_module_geos--geos.GEOSWKTReader_create_r"></a>

## geos.GEOSWKTReader\_create\_r ⇒ <code>number</code> ⏏
Creates a new GEOSWKTReader object. Thread-safe version.

**Kind**: Exported member  
**Returns**: <code>number</code> - A pointer to a GEOSWKTReader object, or NULL on error.  
**See**: https://libgeos.org/doxygen/geos__c_8h.html  

| Param | Type | Description |
| --- | --- | --- |
| handle | <code>number</code> | A pointer to a GEOSContextHandle object. |


---
<a name="exp_module_geos--geos.GEOSWKTReader_destroy"></a>

## geos.GEOSWKTReader\_destroy ⏏
Destroys a GEOSWKTReader object and releases its memory.

**Kind**: Exported member  

| Param | Type | Description |
| --- | --- | --- |
| reader | <code>number</code> | A pointer to a GEOSWKTReader object. |


---
<a name="exp_module_geos--geos.GEOSWKTReader_destroy_r"></a>

## geos.GEOSWKTReader\_destroy\_r ⇒ <code>null</code> ⏏
Destroys a GEOSWKTReader object.

**Kind**: Exported member  
**See**: [GEOSWKTReader_destroy_r](https://libgeos.org/doxygen/geos__c_8h.html#a0a0f7c1b9f6a9f7c3c4d1b5a7b6f9e2e)  

| Param | Type | Description |
| --- | --- | --- |
| handle | <code>number</code> | A pointer to the GEOS context handle. |
| reader | <code>number</code> | The pointer to the GEOSWKTReader object. |


---
<a name="exp_module_geos--geos.GEOSWKTReader_read"></a>

## geos.GEOSWKTReader\_read ⇒ <code>number</code> ⏏
Reads a WKT string and returns a GEOSGeometry object.

**Kind**: Exported member  
**Returns**: <code>number</code> - The pointer to the GEOSGeometry object or null if an error occurred.  
**Throws**:

- <code>ParseError</code> If the WKT string is invalid or cannot be parsed.

**See**: [GEOSWKTReader_read_r](https://libgeos.org/doxygen/geos__c_8h.html#a0a0f7c1b9f6a9f7c3c4d1b5a7b6f9e2e)  

| Param | Type | Description |
| --- | --- | --- |
| reader | <code>number</code> | The pointer to the GEOSWKTReader object. |
| wkt | <code>number</code> | The WKT string pointer to read. |


---
<a name="exp_module_geos--geos.GEOSWKTReader_read_r"></a>

## geos.GEOSWKTReader\_read\_r ⇒ <code>number</code> ⏏
Reads a WKT string and returns a GEOSGeometry object.

**Kind**: Exported member  
**Returns**: <code>number</code> - The pointer to the GEOSGeometry object or null if an error occurred.  
**Throws**:

- <code>ParseError</code> If the WKT string is invalid or cannot be parsed.

**See**: [GEOSWKTReader_read_r](https://libgeos.org/doxygen/geos__c_8h.html#a0a0f7c1b9f6a9f7c3c4d1b5a7b6f9e2e)  

| Param | Type | Description |
| --- | --- | --- |
| handle | <code>number</code> | A pointer to the GEOS context handle. |
| reader | <code>number</code> | The pointer to the GEOSWKTReader object. |
| wkt | <code>number</code> | The WKT string pointer to read. |


---
