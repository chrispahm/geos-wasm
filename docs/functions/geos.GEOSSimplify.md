<a name="exp_module_geos--geos.GEOSSimplify"></a>

## geos.GEOSSimplify ⇒ <code>number</code> ⏏
Simplifies a Geometry using the standard Douglas-Peucker algorithm.

**Kind**: Exported member  
**Returns**: <code>number</code> - A pointer to a new simplified geometry, or NULL if an exception occurs.  
**See**: https://libgeos.org/doxygen/classgeos_1_1simplify_1_1DouglasPeuckerSimplifier.html  

| Param | Type | Description |
| --- | --- | --- |
| g | <code>number</code> | The input geometry pointer. |
| tolerance | <code>number</code> | The distance tolerance for the simplification. All vertices in the simplified geometry will be within this distance of the original geometry. The tolerance value must be non-negative. A tolerance value of zero is effectively a no-op. |


---
<a name="exp_module_geos--geos.GEOSSimplify_r"></a>

## geos.GEOSSimplify\_r ⇒ <code>number</code> ⏏
Simplifies a Geometry using the standard Douglas-Peucker algorithm.

**Kind**: Exported member  
**Returns**: <code>number</code> - A pointer to a new simplified geometry, or NULL if an exception occurs.  
**See**: https://docs.rs/geos-sys/1.0.10/geos_sys/fn.GEOSSimplify_r.html  

| Param | Type | Description |
| --- | --- | --- |
| handle | <code>number</code> | The GEOS context pointer handle. |
| g | <code>number</code> | The input geometry pointer. |
| tolerance | <code>number</code> | The distance tolerance for the simplification. All vertices in the simplified geometry will be within this distance of the original geometry. The tolerance value must be non-negative. A tolerance value of zero is effectively a no-op. |


---
