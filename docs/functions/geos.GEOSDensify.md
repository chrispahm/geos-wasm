<a name="exp_module_geos--geos.GEOSDensify"></a>

## geos.GEOSDensify ⇒ [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) ⏏
Densifies a geometry using a given distance tolerance. Additional vertices will be added to every line segment that is greater this tolerance; these vertices will evenly subdivide that segment. Only linear components of input geometry are densified.

**Kind**: global property of [<code>geos</code>](/typedefs-enums/typedefs-enums.html#module_geos)  
**Returns**: [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) - The densified geometry, or NULL on exception. Caller is responsible for freeing with GEOSGeom_destroy().  

| Param | Type | Description |
| --- | --- | --- |
| g | [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) | The geometry to densify |
| tolerance | <code>number</code> | the distance tolerance to densify |


---
<a name="exp_module_geos--geos.GEOSDensify_r"></a>

## geos.GEOSDensify\_r ⇒ [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) ⏏
Densifies a geometry using a given distance tolerance. Additional vertices will be added to every line segment that is greater this tolerance; these vertices will evenly subdivide that segment. Only linear components of input geometry are densified.

**Kind**: global property of [<code>geos</code>](/typedefs-enums/typedefs-enums.html#module_geos)  
**Returns**: [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) - The densified geometry, or NULL on exception. Caller is responsible for freeing with GEOSGeom_destroy().  

| Param | Type | Description |
| --- | --- | --- |
| handle | [<code>GEOSContextHandle\_t</code>](/typedefs-enums/typedefs-enums.html#GEOSContextHandle_t) | - |
| g | [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) | The geometry to densify |
| tolerance | <code>number</code> | the distance tolerance to densify |


---
