<a name="exp_module_geos--geos.GEOSClipByRect"></a>

## geos.GEOSClipByRect ⇒ [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) ⏏
Intersection optimized for a rectangular clipping polygon. Supposed to be faster than using GEOSIntersection(). Not guaranteed to return valid results.

**Kind**: global property of [<code>geos</code>](/typedefs-enums/typedefs-enums.html#module_geos)  
**Returns**: [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) - The clipped geometry or NULL on exception Caller is responsible for freeing with GEOSGeom_destroy().  

| Param | Type | Description |
| --- | --- | --- |
| g | [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) | The input geometry to be clipped |
| xmin | <code>number</code> | Left bound of clipping rectangle |
| ymin | <code>number</code> | Lower bound of clipping rectangle |
| xmax | <code>number</code> | Right bound of clipping rectangle |
| ymax | <code>number</code> | Upper bound of clipping rectangle |


---
<a name="exp_module_geos--geos.GEOSClipByRect_r"></a>

## geos.GEOSClipByRect\_r ⇒ [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) ⏏
Intersection optimized for a rectangular clipping polygon. Supposed to be faster than using GEOSIntersection(). Not guaranteed to return valid results.

**Kind**: global property of [<code>geos</code>](/typedefs-enums/typedefs-enums.html#module_geos)  
**Returns**: [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) - The clipped geometry or NULL on exception Caller is responsible for freeing with GEOSGeom_destroy().  

| Param | Type | Description |
| --- | --- | --- |
| handle | [<code>GEOSContextHandle\_t</code>](/typedefs-enums/typedefs-enums.html#GEOSContextHandle_t) | - |
| g | [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) | The input geometry to be clipped |
| xmin | <code>number</code> | Left bound of clipping rectangle |
| ymin | <code>number</code> | Lower bound of clipping rectangle |
| xmax | <code>number</code> | Right bound of clipping rectangle |
| ymax | <code>number</code> | Upper bound of clipping rectangle |


---
