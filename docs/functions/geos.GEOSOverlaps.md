<a name="exp_module_geos--geos.GEOSOverlaps"></a>

## geos.GEOSOverlaps ⇒ <code>number</code> ⏏
Tests if two geometries overlap in their interior points.

**Kind**: Exported member  
**Returns**: <code>number</code> - = 1 if true, 0 if false, -1 on error.  

| Param | Type | Description |
| --- | --- | --- |
| g1 | <code>number</code> | The first geometry pointer. |
| g2 | <code>number</code> | The second geometry pointer. |


---
<a name="exp_module_geos--geos.GEOSOverlaps_r"></a>

## geos.GEOSOverlaps\_r ⇒ <code>number</code> ⏏
Tests whether two geometries overlap.

**Kind**: Exported member  
**Returns**: <code>number</code> - 1 if the geometries overlap, 0 if not, or -1 on error.  

| Param | Type | Description |
| --- | --- | --- |
| handle | <code>number</code> | A pointer to the GEOS context handle. |
| g1 | <code>number</code> | The first geometry. |
| g2 | <code>number</code> | The second geometry. |


---
