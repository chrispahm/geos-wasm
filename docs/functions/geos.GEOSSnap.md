<a name="exp_module_geos--geos.GEOSSnap"></a>

## geos.GEOSSnap ⇒ <code>number</code> ⏏
Snaps two geometries together with a given tolerance.

**Kind**: Exported member  
**Returns**: <code>number</code> - A pointer to a new snapped geometry, or NULL on exception.  
**See**: [https://libgeos.org/doxygen/geos__c_8h.html](https://libgeos.org/doxygen/geos__c_8h.html)  

| Param | Type | Description |
| --- | --- | --- |
| handle | <code>number</code> | A pointer to the GEOS context handle. |
| g1 | <code>number</code> | A pointer to the first geometry to snap. |
| g2 | <code>number</code> | A pointer to the second geometry to snap. |
| tolerance | <code>number</code> | The snapping tolerance to use, in same units as input geometries. |


---
<a name="exp_module_geos--geos.GEOSSnap_r"></a>

## geos.GEOSSnap\_r ⇒ <code>number</code> ⏏
Snaps two geometries together with a given tolerance using a GEOS context handle.

**Kind**: Exported member  
**Returns**: <code>number</code> - A pointer to a new snapped geometry, or NULL on exception.  
**See**: [https://libgeos.org/doxygen/geos__c_8h.html](https://libgeos.org/doxygen/geos__c_8h.html)  

| Param | Type | Description |
| --- | --- | --- |
| handle | <code>number</code> | A pointer to the GEOS context handle. |
| g1 | <code>number</code> | A pointer to the first geometry to snap. |
| g2 | <code>number</code> | A pointer to the second geometry to snap. |
| tolerance | <code>number</code> | The snapping tolerance to use, in same units as input geometries. |


---
