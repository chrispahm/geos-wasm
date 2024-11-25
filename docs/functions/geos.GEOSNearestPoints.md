<a name="exp_module_geos--geos.GEOSNearestPoints"></a>

## geos.GEOSNearestPoints ⇒ [<code>GEOSCoordSequence</code>](/typedefs-enums/typedefs-enums.html#GEOSCoordSequence) ⏏
The closest points of the two geometries. The first point comes from g1 geometry and the second point comes from g2.

**Kind**: global property of [<code>geos</code>](/typedefs-enums/typedefs-enums.html#module_geos)  
**Returns**: [<code>GEOSCoordSequence</code>](/typedefs-enums/typedefs-enums.html#GEOSCoordSequence) - A coordinate sequence with the two points, or NULL on exception. Caller must free with GEOSCoordSeq_destroy().  

| Param | Type | Description |
| --- | --- | --- |
| g1 | [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) | Input geometry |
| g2 | [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) | Input geometry |


---
<a name="exp_module_geos--geos.GEOSNearestPoints_r"></a>

## geos.GEOSNearestPoints\_r ⇒ [<code>GEOSCoordSequence</code>](/typedefs-enums/typedefs-enums.html#GEOSCoordSequence) ⏏
The closest points of the two geometries. The first point comes from g1 geometry and the second point comes from g2.

**Kind**: global property of [<code>geos</code>](/typedefs-enums/typedefs-enums.html#module_geos)  
**Returns**: [<code>GEOSCoordSequence</code>](/typedefs-enums/typedefs-enums.html#GEOSCoordSequence) - A coordinate sequence with the two points, or NULL on exception. Caller must free with GEOSCoordSeq_destroy().  

| Param | Type | Description |
| --- | --- | --- |
| handle | [<code>GEOSContextHandle\_t</code>](/typedefs-enums/typedefs-enums.html#GEOSContextHandle_t) | - |
| g1 | [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) | Input geometry |
| g2 | [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) | Input geometry |


---
