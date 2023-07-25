<a name="exp_module_geos--geos.GEOSisRing"></a>

## geos.GEOSisRing ⇒ <code>number</code> ⏏
Tests whether a geometry is a ring.
A ring is a closed and simple linestring.

**Kind**: Exported member  
**Returns**: <code>number</code> - 1 if the geometry is a ring, 0 if not, or -1 on error  

| Param | Type | Description |
| --- | --- | --- |
| g | <code>number</code> | a pointer to a GEOSGeometry object |


---
<a name="exp_module_geos--geos.GEOSisRing_r"></a>

## geos.GEOSisRing\_r ⇒ <code>number</code> ⏏
Tests whether a geometry is a ring (thread-safe version).
A ring is a closed and simple linestring.

**Kind**: Exported member  
**Returns**: <code>number</code> - 1 if the geometry is a ring, 0 if not, or -1 on error  

| Param | Type | Description |
| --- | --- | --- |
| handle | <code>number</code> | a pointer to a GEOS context handle |
| g | <code>number</code> | a pointer to a GEOSGeometry object |


---
