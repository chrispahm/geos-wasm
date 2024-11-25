<a name="exp_module_geos--geos.GEOSDifference"></a>

## geos.GEOSDifference ⇒ [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) ⏏
Returns the difference of two geometries A and B: the set of points that fall within A but not within B.

**Kind**: global property of [<code>geos</code>](/typedefs-enums/typedefs-enums.html#module_geos)  
**Returns**: [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) - A newly allocated geometry of the difference. NULL on exception. Caller is responsible for freeing with GEOSGeom_destroy().  

| Param | Type | Description |
| --- | --- | --- |
| ga | [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) | the base geometry |
| gb | [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) | the geometry to subtract from it |


---
<a name="exp_module_geos--geos.GEOSDifferencePrec"></a>

## geos.GEOSDifferencePrec ⇒ [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) ⏏
Returns the difference of two geometries A and B: the set of points that fall within A but not within B. All the vertices of the output geometry must fall on the grid defined by the gridSize, and the output will be a valid geometry.

**Kind**: global property of [<code>geos</code>](/typedefs-enums/typedefs-enums.html#module_geos)  
**Returns**: [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) - A newly allocated geometry of the difference. NULL on exception. Caller is responsible for freeing with GEOSGeom_destroy().  

| Param | Type | Description |
| --- | --- | --- |
| ga | [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) | one of the geometries |
| gb | [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) | the other geometry |
| gridSize | <code>number</code> | the cell size of the precision grid |


---
<a name="exp_module_geos--geos.GEOSDifferencePrec_r"></a>

## geos.GEOSDifferencePrec\_r ⇒ [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) ⏏
Returns the difference of two geometries A and B: the set of points that fall within A but not within B. All the vertices of the output geometry must fall on the grid defined by the gridSize, and the output will be a valid geometry.

**Kind**: global property of [<code>geos</code>](/typedefs-enums/typedefs-enums.html#module_geos)  
**Returns**: [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) - A newly allocated geometry of the difference. NULL on exception. Caller is responsible for freeing with GEOSGeom_destroy().  

| Param | Type | Description |
| --- | --- | --- |
| handle | [<code>GEOSContextHandle\_t</code>](/typedefs-enums/typedefs-enums.html#GEOSContextHandle_t) | - |
| g1 | [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) | one of the geometries |
| g2 | [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) | the other geometry |
| gridSize | <code>number</code> | the cell size of the precision grid |


---
<a name="exp_module_geos--geos.GEOSDifference_r"></a>

## geos.GEOSDifference\_r ⇒ [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) ⏏
Returns the difference of two geometries A and B: the set of points that fall within A but not within B.

**Kind**: global property of [<code>geos</code>](/typedefs-enums/typedefs-enums.html#module_geos)  
**Returns**: [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) - A newly allocated geometry of the difference. NULL on exception. Caller is responsible for freeing with GEOSGeom_destroy().  

| Param | Type | Description |
| --- | --- | --- |
| handle | [<code>GEOSContextHandle\_t</code>](/typedefs-enums/typedefs-enums.html#GEOSContextHandle_t) | - |
| g1 | [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) | the base geometry |
| g2 | [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) | the geometry to subtract from it |


---
