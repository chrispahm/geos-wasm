<a name="exp_module_geos--geos.GEOSCoverageSimplifyVW"></a>

## geos.GEOSCoverageSimplifyVW ⇒ [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) ⏏
Operates on a coverage (represented as a list of polygonal geometry with exactly matching edge geometry) to apply a Visvalingam–Whyatt simplification to the edges, reducing complexity in proportion with the provided tolerance, while retaining a valid coverage (no edges will cross or touch after the simplification). Geometries never disappear, but they may be simplified down to just a triangle. Also, some invalid geoms (such as Polygons which have too few non-repeated points) will be returned unchanged. If the input dataset is not a valid coverage due to overlaps, it will still be simplified, but invalid topology such as crossing edges will still be invalid.

**Kind**: global property of [<code>geos</code>](/typedefs-enums/typedefs-enums.html#module_geos)  
**Returns**: [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) - A collection containing the simplified geometries, or null on error.  

| Param | Type | Description |
| --- | --- | --- |
| input | [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) | The polygonal coverage to access, stored in a geometry collection. All members must be POLYGON or MULTIPOLYGON. |
| tolerance | <code>number</code> | A tolerance parameter in linear units. |
| preserveBoundary | <code>number</code> | Use 1 to preserve the outside edges of the coverage without simplification, 0 to allow them to be simplified. |


---
<a name="exp_module_geos--geos.GEOSCoverageSimplifyVW_r"></a>

## geos.GEOSCoverageSimplifyVW\_r ⇒ [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) ⏏
Operates on a coverage (represented as a list of polygonal geometry with exactly matching edge geometry) to apply a Visvalingam–Whyatt simplification to the edges, reducing complexity in proportion with the provided tolerance, while retaining a valid coverage (no edges will cross or touch after the simplification). Geometries never disappear, but they may be simplified down to just a triangle. Also, some invalid geoms (such as Polygons which have too few non-repeated points) will be returned unchanged. If the input dataset is not a valid coverage due to overlaps, it will still be simplified, but invalid topology such as crossing edges will still be invalid.

**Kind**: global property of [<code>geos</code>](/typedefs-enums/typedefs-enums.html#module_geos)  
**Returns**: [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) - A collection containing the simplified geometries, or null on error.  

| Param | Type | Description |
| --- | --- | --- |
| extHandle | [<code>GEOSContextHandle\_t</code>](/typedefs-enums/typedefs-enums.html#GEOSContextHandle_t) | - |
| input | [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) | The polygonal coverage to access, stored in a geometry collection. All members must be POLYGON or MULTIPOLYGON. |
| tolerance | <code>number</code> | A tolerance parameter in linear units. |
| preserveBoundary | <code>number</code> | Use 1 to preserve the outside edges of the coverage without simplification, 0 to allow them to be simplified. |


---
