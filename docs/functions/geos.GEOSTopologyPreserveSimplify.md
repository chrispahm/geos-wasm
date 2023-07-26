<a name="exp_module_geos--geos.GEOSTopologyPreserveSimplify"></a>

## geos.GEOSTopologyPreserveSimplify ⇒ <code>number</code> ⏏
Simplifies a geometry, ensuring that the result is a valid geometry having the same dimension and number of components as the input.

**Kind**: Exported member  
**Returns**: <code>number</code> - A pointer to a simplified GEOSGeometry object, or NULL on error.  
**See**: https://libgeos.org/doxygen/classgeos_1_1simplify_1_1TopologyPreservingSimplifier.html  

| Param | Type | Description |
| --- | --- | --- |
| geom | <code>number</code> | A pointer to a GEOSGeometry object. |
| tolerance | <code>number</code> | The distance tolerance for the simplification. |


---
<a name="exp_module_geos--geos.GEOSTopologyPreserveSimplify_r"></a>

## geos.GEOSTopologyPreserveSimplify\_r ⇒ <code>number</code> ⏏
Simplifies a geometry, ensuring that the result is a valid geometry having the same dimension and number of components as the input. Thread-safe version.

**Kind**: Exported member  
**Returns**: <code>number</code> - A pointer to a simplified GEOSGeometry object, or NULL on error.  
**See**: https://libgeos.org/doxygen/geos__c_8h.html  

| Param | Type | Description |
| --- | --- | --- |
| handle | <code>number</code> | A pointer to a GEOSContextHandle object. |
| geom | <code>number</code> | A pointer to a GEOSGeometry object. |
| tolerance | <code>number</code> | The distance tolerance for the simplification. |


---
