<a name="exp_module_geos--geos.GEOSSimplify"></a>

## geos.GEOSSimplify ⇒ [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) ⏏
Apply the Douglas/Peucker algorithm to the coordinate sequences of the input geometry. Removes "unnecessary" vertices, vertices that are co-linear within the tolerance distance.

**Kind**: global property of [<code>geos</code>](/typedefs-enums/typedefs-enums.html#module_geos)  
**Returns**: [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) - The simplified geometry Caller is responsible for freeing with GEOSGeom_destroy().  

| Param | Type | Description |
| --- | --- | --- |
| g | [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) | The input geometry |
| tolerance | <code>number</code> | The tolerance to apply. Larger tolerance leads to simpler output. |


---
<a name="exp_module_geos--geos.GEOSSimplify_r"></a>

## geos.GEOSSimplify\_r ⇒ [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) ⏏
Apply the Douglas/Peucker algorithm to the coordinate sequences of the input geometry. Removes "unnecessary" vertices, vertices that are co-linear within the tolerance distance.

**Kind**: global property of [<code>geos</code>](/typedefs-enums/typedefs-enums.html#module_geos)  
**Returns**: [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) - The simplified geometry Caller is responsible for freeing with GEOSGeom_destroy().  

| Param | Type | Description |
| --- | --- | --- |
| handle | [<code>GEOSContextHandle\_t</code>](/typedefs-enums/typedefs-enums.html#GEOSContextHandle_t) | - |
| g | [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) | The input geometry |
| tolerance | <code>number</code> | The tolerance to apply. Larger tolerance leads to simpler output. |


---
