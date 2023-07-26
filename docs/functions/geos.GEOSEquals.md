<a name="exp_module_geos--geos.GEOSEquals"></a>

## geos.GEOSEquals ⇒ <code>number</code> ⏏
Tests whether two geometries are topologically equal.

**Kind**: Exported member  
**Returns**: <code>number</code> - 1 if they are equal, 0 if they are not, or -1 on error  
**See**: [GEOSEquals](https://libgeos.org/doxygen/geos__c_8h.html#a5b6b7a4a8a0c5f0c1a2e3a9d9b4f6c7f)  

| Param | Type | Description |
| --- | --- | --- |
| g1 | <code>number</code> | A pointer to a GEOSGeometry object |
| g2 | <code>number</code> | A pointer to another GEOSGeometry object |


---
<a name="exp_module_geos--geos.GEOSEqualsExact"></a>

## geos.GEOSEqualsExact ⇒ <code>number</code> ⏏
Tests whether two geometries are exactly equal, up to a specified tolerance.

**Kind**: Exported member  
**Returns**: <code>number</code> - 1 if equal, 0 if not, -1 on exception.  

| Param | Type | Description |
| --- | --- | --- |
| g1 | <code>number</code> | The first geometry to compare. |
| g2 | <code>number</code> | The second geometry to compare. |
| tolerance | <code>number</code> | The maximum distance between any pair of points that are considered equal. |


---
<a name="exp_module_geos--geos.GEOSEqualsExact_r"></a>

## geos.GEOSEqualsExact\_r ⇒ <code>number</code> ⏏
Tests whether two geometries are exactly equal, up to a specified tolerance.

**Kind**: Exported member  
**Returns**: <code>number</code> - 1 if equal, 0 if not, -1 on exception.  

| Param | Type | Description |
| --- | --- | --- |
| handle | <code>number</code> | A pointer to the GEOS context handle. |
| g1 | <code>number</code> | The first geometry to compare. |
| g2 | <code>number</code> | The second geometry to compare. |
| tolerance | <code>number</code> | The maximum distance between any pair of points that are considered equal. |


---
<a name="exp_module_geos--geos.GEOSEquals_r"></a>

## geos.GEOSEquals\_r ⇒ <code>number</code> ⏏
Tests whether two geometries are topologically equal.

**Kind**: Exported member  
**Returns**: <code>number</code> - 1 if equal, 0 if not, -1 on exception.  

| Param | Type | Description |
| --- | --- | --- |
| handle | <code>number</code> | A pointer to the GEOS context handle. |
| g1 | <code>number</code> | The first geometry to compare. |
| g2 | <code>number</code> | The second geometry to compare. |


---
