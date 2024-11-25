<a name="exp_module_geos--geos.GEOSOrientPolygons"></a>

## geos.GEOSOrientPolygons ⇒ <code>number</code> ⏏
Enforce a ring orientation on all polygonal elements in the input geometry. Non-polygonal geometries will not be modified.

**Kind**: global property of [<code>geos</code>](/typedefs-enums/typedefs-enums.html#module_geos)  
**Returns**: <code>number</code> - 0 on success or -1 on exception  

| Param | Type | Description |
| --- | --- | --- |
| g | [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) | Input geometry |
| exteriorCW | <code>number</code> | if 1, exterior rings will be clockwise and interior rings will be counter-clockwise |


---
<a name="exp_module_geos--geos.GEOSOrientPolygons_r"></a>

## geos.GEOSOrientPolygons\_r ⇒ <code>number</code> ⏏
Enforce a ring orientation on all polygonal elements in the input geometry. Non-polygonal geometries will not be modified.

**Kind**: global property of [<code>geos</code>](/typedefs-enums/typedefs-enums.html#module_geos)  
**Returns**: <code>number</code> - 0 on success or -1 on exception  

| Param | Type | Description |
| --- | --- | --- |
| handle | [<code>GEOSContextHandle\_t</code>](/typedefs-enums/typedefs-enums.html#GEOSContextHandle_t) | - |
| g | [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) | Input geometry |
| exteriorCW | <code>number</code> | if 1, exterior rings will be clockwise and interior rings will be counter-clockwise |


---
