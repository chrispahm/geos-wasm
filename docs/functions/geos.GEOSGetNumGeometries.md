<a name="exp_module_geos--geos.GEOSGetNumGeometries"></a>

## geos.GEOSGetNumGeometries ⇒ <code>number</code> ⏏
Returns the number of sub-geometries immediately under a multi-geometry or collection or 1 for a simple geometry. For nested collections, remember to check if returned sub-geometries are themselves also collections. Empty collection or multi-geometry types return 0, and empty simple geometry types return 1.

**Kind**: global property of [<code>geos</code>](/typedefs-enums/typedefs-enums.html#module_geos)  
**Returns**: <code>number</code> - Number of direct children in this collection  

| Param | Type | Description |
| --- | --- | --- |
| g | [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) | Input geometry |


---
<a name="exp_module_geos--geos.GEOSGetNumGeometries_r"></a>

## geos.GEOSGetNumGeometries\_r ⇒ <code>number</code> ⏏
Returns the number of sub-geometries immediately under a multi-geometry or collection or 1 for a simple geometry. For nested collections, remember to check if returned sub-geometries are themselves also collections. Empty collection or multi-geometry types return 0, and empty simple geometry types return 1.

**Kind**: global property of [<code>geos</code>](/typedefs-enums/typedefs-enums.html#module_geos)  
**Returns**: <code>number</code> - Number of direct children in this collection  

| Param | Type | Description |
| --- | --- | --- |
| handle | [<code>GEOSContextHandle\_t</code>](/typedefs-enums/typedefs-enums.html#GEOSContextHandle_t) | - |
| g | [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) | Input geometry |


---
