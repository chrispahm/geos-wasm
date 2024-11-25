<a name="exp_module_geos--geos.GEOSCoverageIsValid"></a>

## geos.GEOSCoverageIsValid ⇒ <code>number</code> ⏏
Analyze a coverage (represented as a collection of polygonal geometry with exactly matching edge geometry) to find places where the assumption of exactly matching edges is not met.

**Kind**: global property of [<code>geos</code>](/typedefs-enums/typedefs-enums.html#module_geos)  
**Returns**: <code>number</code> - A value of 1 for a valid coverage, 0 for invalid and 2 for an exception or error. Invalidity includes polygons that overlap, that have gaps smaller than the gapWidth, or non-polygonal entries in the input collection.  

| Param | Type | Description |
| --- | --- | --- |
| input | [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) | The polygonal coverage to access, stored in a geometry collection. All members must be POLYGON or MULTIPOLYGON. |
| gapWidth | <code>number</code> | The maximum width of gaps to detect. |
| invalidEdges | [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) | When there are invalidities in the coverage, this pointer will be set with a geometry collection of the same length as the input, with a MULTILINESTRING of the error edges for each invalid polygon, or an EMPTY where the polygon is a valid participant in the coverage. Pass NULL if you do not want the invalid edges returned. |


---
<a name="exp_module_geos--geos.GEOSCoverageIsValid_r"></a>

## geos.GEOSCoverageIsValid\_r ⇒ <code>number</code> ⏏
Analyze a coverage (represented as a collection of polygonal geometry with exactly matching edge geometry) to find places where the assumption of exactly matching edges is not met.

**Kind**: global property of [<code>geos</code>](/typedefs-enums/typedefs-enums.html#module_geos)  
**Returns**: <code>number</code> - A value of 1 for a valid coverage, 0 for invalid and 2 for an exception or error. Invalidity includes polygons that overlap, that have gaps smaller than the gapWidth, or non-polygonal entries in the input collection.  

| Param | Type | Description |
| --- | --- | --- |
| extHandle | [<code>GEOSContextHandle\_t</code>](/typedefs-enums/typedefs-enums.html#GEOSContextHandle_t) | - |
| input | [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) | The polygonal coverage to access, stored in a geometry collection. All members must be POLYGON or MULTIPOLYGON. |
| gapWidth | <code>number</code> | The maximum width of gaps to detect. |
| output | [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) | When there are invalidities in the coverage, this pointer will be set with a geometry collection of the same length as the input, with a MULTILINESTRING of the error edges for each invalid polygon, or an EMPTY where the polygon is a valid participant in the coverage. Pass NULL if you do not want the invalid edges returned. |


---
