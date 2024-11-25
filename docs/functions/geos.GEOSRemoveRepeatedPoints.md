<a name="exp_module_geos--geos.GEOSRemoveRepeatedPoints"></a>

## geos.GEOSRemoveRepeatedPoints ⇒ [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) ⏏
Works from start of each coordinate sequence in the geometry, retaining points that are further away from the previous retained point than the tolerance value.

**Kind**: global property of [<code>geos</code>](/typedefs-enums/typedefs-enums.html#module_geos)  
**Returns**: [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) - A geometry with all points within the tolerance of each other removed.  

| Param | Type | Description |
| --- | --- | --- |
| g | [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) | The geometry to filter |
| tolerance | <code>number</code> | Remove all points within this distance of each other. Use 0.0 to remove only exactly repeated points. |


---
<a name="exp_module_geos--geos.GEOSRemoveRepeatedPoints_r"></a>

## geos.GEOSRemoveRepeatedPoints\_r ⇒ [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) ⏏
Works from start of each coordinate sequence in the geometry, retaining points that are further away from the previous retained point than the tolerance value.

**Kind**: global property of [<code>geos</code>](/typedefs-enums/typedefs-enums.html#module_geos)  
**Returns**: [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) - A geometry with all points within the tolerance of each other removed.  

| Param | Type | Description |
| --- | --- | --- |
| handle | [<code>GEOSContextHandle\_t</code>](/typedefs-enums/typedefs-enums.html#GEOSContextHandle_t) | - |
| g | [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) | The geometry to filter |
| tolerance | <code>number</code> | Remove all points within this distance of each other. Use 0.0 to remove only exactly repeated points. |


---
