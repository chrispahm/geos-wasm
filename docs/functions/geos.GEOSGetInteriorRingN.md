<a name="exp_module_geos--geos.GEOSGetInteriorRingN"></a>

## geos.GEOSGetInteriorRingN ⇒ <code>number</code> ⏏
Returns the Nth interior ring of a polygon geometry.
Note: Returned object is a pointer to internal storage: it must NOT be destroyed directly.

**Kind**: Exported member  
**Returns**: <code>number</code> - - The interior ring geometry, or null if an error occurred or the index is out of range.  
**See**: https://libgeos.org/doxygen/geos__c_8h.html  

| Param | Type | Description |
| --- | --- | --- |
| g | <code>number</code> | The polygon geometry. |
| n | <code>number</code> | The index of the interior ring, starting from 0. |


---
<a name="exp_module_geos--geos.GEOSGetInteriorRingN_r"></a>

## geos.GEOSGetInteriorRingN\_r ⇒ <code>number</code> ⏏
Returns the Nth interior ring of a polygon geometry.

**Kind**: Exported member  
**Returns**: <code>number</code> - - The interior ring geometry, or null if an error occurred or the index is out of range.  
**See**: https://libgeos.org/doxygen/geos__c_8h_source.html  

| Param | Type | Description |
| --- | --- | --- |
| handle | <code>number</code> | A pointer to the GEOS context handle. |
| g | <code>number</code> | The polygon geometry. |
| n | <code>number</code> | The index of the interior ring, starting from 0. |


---
