<a name="exp_module_geos--geos.GEOSSymDifference"></a>

## geos.GEOSSymDifference ⇒ [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) ⏏
Returns the symmetric difference of two geometries A and B: the set of points that fall in A but not within B and the set of points that fall in B but not in A.

**Kind**: global property of [<code>geos</code>](/typedefs-enums/typedefs-enums.html#module_geos)  
**Returns**: [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) - A newly allocated geometry of the symmetric difference. NULL on exception. Caller is responsible for freeing with GEOSGeom_destroy().  

| Param | Type | Description |
| --- | --- | --- |
| ga | [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) | geometry A |
| gb | [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) | geometry B |


---
<a name="exp_module_geos--geos.GEOSSymDifferencePrec"></a>

## geos.GEOSSymDifferencePrec ⇒ [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) ⏏
Returns the symmetric difference of two geometries A and B: the set of points that fall in A but not within B and the set of points that fall in B but not in A. All the vertices of the output geometry must fall on the grid defined by the gridSize, and the output will be a valid geometry.

**Kind**: global property of [<code>geos</code>](/typedefs-enums/typedefs-enums.html#module_geos)  
**Returns**: [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) - A newly allocated geometry of the symmetric difference. NULL on exception. Caller is responsible for freeing with GEOSGeom_destroy().  

| Param | Type | Description |
| --- | --- | --- |
| ga | [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) | one of the geometries |
| gb | [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) | the other geometry |
| gridSize | <code>number</code> | the cell size of the precision grid |


---
<a name="exp_module_geos--geos.GEOSSymDifferencePrec_r"></a>

## geos.GEOSSymDifferencePrec\_r ⇒ [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) ⏏
Returns the symmetric difference of two geometries A and B: the set of points that fall in A but not within B and the set of points that fall in B but not in A. All the vertices of the output geometry must fall on the grid defined by the gridSize, and the output will be a valid geometry.

**Kind**: global property of [<code>geos</code>](/typedefs-enums/typedefs-enums.html#module_geos)  
**Returns**: [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) - A newly allocated geometry of the symmetric difference. NULL on exception. Caller is responsible for freeing with GEOSGeom_destroy().  

| Param | Type | Description |
| --- | --- | --- |
| handle | [<code>GEOSContextHandle\_t</code>](/typedefs-enums/typedefs-enums.html#GEOSContextHandle_t) | - |
| g1 | [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) | one of the geometries |
| g2 | [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) | the other geometry |
| gridSize | <code>number</code> | the cell size of the precision grid |


---
<a name="exp_module_geos--geos.GEOSSymDifference_r"></a>

## geos.GEOSSymDifference\_r ⇒ [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) ⏏
Returns the symmetric difference of two geometries A and B: the set of points that fall in A but not within B and the set of points that fall in B but not in A.

**Kind**: global property of [<code>geos</code>](/typedefs-enums/typedefs-enums.html#module_geos)  
**Returns**: [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) - A newly allocated geometry of the symmetric difference. NULL on exception. Caller is responsible for freeing with GEOSGeom_destroy().  

| Param | Type | Description |
| --- | --- | --- |
| handle | [<code>GEOSContextHandle\_t</code>](/typedefs-enums/typedefs-enums.html#GEOSContextHandle_t) | - |
| g1 | [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) | geometry A |
| g2 | [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) | geometry B |


---
