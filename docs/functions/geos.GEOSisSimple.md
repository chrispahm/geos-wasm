<a name="exp_module_geos--geos.GEOSisSimple"></a>

## geos.GEOSisSimple ⇒ <code>number</code> ⏏
Tests whether a geometry is simple.
A geometry is simple if it has no points of self-tangency, self-intersection or other anomalous points.

**Kind**: Exported member  
**Returns**: <code>number</code> - 1 if the geometry is simple, 0 if not, or -1 on error  

| Param | Type | Description |
| --- | --- | --- |
| g | <code>number</code> | a pointer to a GEOSGeometry object |


---
<a name="exp_module_geos--geos.GEOSisSimple_r"></a>

## geos.GEOSisSimple\_r ⇒ <code>number</code> ⏏
Tests whether a geometry is simple (thread-safe version).
A geometry is simple if it has no points of self-tangency, self-intersection or other anomalous points.

**Kind**: Exported member  
**Returns**: <code>number</code> - 1 if the geometry is simple, 0 if not, or -1 on error  

| Param | Type | Description |
| --- | --- | --- |
| handle | <code>number</code> | a pointer to a GEOS context handle |
| g | <code>number</code> | a pointer to a GEOSGeometry object |


---
