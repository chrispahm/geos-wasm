<a name="exp_module_geos--geos.GEOSCoverageUnion"></a>

## geos.GEOSCoverageUnion ⇒ [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) ⏏
Optimized union algorithm for polygonal inputs that are correctly noded and do not overlap. It may generate an error (return NULL) for inputs that do not satisfy this constraint, however this is not guaranteed.

**Kind**: global property of [<code>geos</code>](/typedefs-enums/typedefs-enums.html#module_geos)  
**Returns**: [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) - A geometry that covers all the points of the input geometry. Caller is responsible for freeing with GEOSGeom_destroy().  

| Param | Type | Description |
| --- | --- | --- |
| g | [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) | The input geometry |


---
<a name="exp_module_geos--geos.GEOSCoverageUnion_r"></a>

## geos.GEOSCoverageUnion\_r ⇒ [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) ⏏
Optimized union algorithm for polygonal inputs that are correctly noded and do not overlap. It may generate an error (return NULL) for inputs that do not satisfy this constraint, however this is not guaranteed.

**Kind**: global property of [<code>geos</code>](/typedefs-enums/typedefs-enums.html#module_geos)  
**Returns**: [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) - A geometry that covers all the points of the input geometry. Caller is responsible for freeing with GEOSGeom_destroy().  

| Param | Type | Description |
| --- | --- | --- |
| handle | [<code>GEOSContextHandle\_t</code>](/typedefs-enums/typedefs-enums.html#GEOSContextHandle_t) | - |
| g | [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) | The input geometry |


---
