<a name="exp_module_geos--geos.GEOSCoverageUnion"></a>

## geos.GEOSCoverageUnion ⇒ <code>number</code> ⏏
Computes the union of all the input geometries using an optimized algorithm for coverages (collections of polygons that do not overlap).

**Kind**: Exported member  
**Returns**: <code>number</code> - A pointer to a new GEOS geometry representing the union, or NULL on exception.  
**See**: https://libgeos.org/doxygen/classgeos_1_1operation_1_1geounion_1_1CoverageUnionOp.html  

| Param | Type | Description |
| --- | --- | --- |
| geom | <code>number</code> | A pointer to a GEOS geometry. |


---
<a name="exp_module_geos--geos.GEOSCoverageUnion_r"></a>

## geos.GEOSCoverageUnion\_r ⇒ <code>number</code> ⏏
Computes the union of a collection of polygonal geometries that are correctly noded and do not overlap.

**Kind**: Exported member  
**Returns**: <code>number</code> - The pointer to a GEOS geometry representing the union, or NULL on error.  
**See**: https://libgeos.org/doxygen/classgeos_1_1operation_1_1geounion_1_1CascadedPolygonUnion.html  

| Param | Type | Description |
| --- | --- | --- |
| handle | <code>number</code> | A pointer to the GEOS context handle. |
| g | <code>number</code> | The pointer to a GEOS geometry collection. |


---
