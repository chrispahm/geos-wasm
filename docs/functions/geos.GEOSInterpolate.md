<a name="exp_module_geos--geos.GEOSInterpolate"></a>

## geos.GEOSInterpolate ⇒ [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) ⏏
Measuring from start of line, return point that is distance the start. Line parameter must be a LineString. The returned point is not guaranteed to intersect the line due to limitations of floating point calculations.

**Kind**: global property of [<code>geos</code>](/typedefs-enums/typedefs-enums.html#module_geos)  
**Returns**: [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) - The point GEOSGeometry that is distance from the start of line. Caller takes ownership of returned geometry.  

| Param | Type | Description |
| --- | --- | --- |
| line | [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) | linear target of projection |
| d | <code>number</code> | distance from start of line to created point |


---
<a name="exp_module_geos--geos.GEOSInterpolateNormalized"></a>

## geos.GEOSInterpolateNormalized ⇒ [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) ⏏
Measuring from start of line, return point that is a proportion the start. Line parameter must be a LineString.

**Kind**: global property of [<code>geos</code>](/typedefs-enums/typedefs-enums.html#module_geos)  
**Returns**: [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) - The point GEOSGeometry that is distance from the start of line. Caller takes ownership of returned geometry.  

| Param | Type | Description |
| --- | --- | --- |
| line | [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) | linear target of projection |
| proportion | <code>number</code> | The proportion from the start of line to created point |


---
<a name="exp_module_geos--geos.GEOSInterpolateNormalized_r"></a>

## geos.GEOSInterpolateNormalized\_r ⇒ [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) ⏏
Measuring from start of line, return point that is a proportion the start. Line parameter must be a LineString.

**Kind**: global property of [<code>geos</code>](/typedefs-enums/typedefs-enums.html#module_geos)  
**Returns**: [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) - The point GEOSGeometry that is distance from the start of line. Caller takes ownership of returned geometry.  

| Param | Type | Description |
| --- | --- | --- |
| handle | [<code>GEOSContextHandle\_t</code>](/typedefs-enums/typedefs-enums.html#GEOSContextHandle_t) | - |
| g | [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) | linear target of projection |
| d | <code>number</code> | The proportion from the start of line to created point |


---
<a name="exp_module_geos--geos.GEOSInterpolate_r"></a>

## geos.GEOSInterpolate\_r ⇒ [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) ⏏
Measuring from start of line, return point that is distance the start. Line parameter must be a LineString. The returned point is not guaranteed to intersect the line due to limitations of floating point calculations.

**Kind**: global property of [<code>geos</code>](/typedefs-enums/typedefs-enums.html#module_geos)  
**Returns**: [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) - The point GEOSGeometry that is distance from the start of line. Caller takes ownership of returned geometry.  

| Param | Type | Description |
| --- | --- | --- |
| handle | [<code>GEOSContextHandle\_t</code>](/typedefs-enums/typedefs-enums.html#GEOSContextHandle_t) | - |
| line | [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) | linear target of projection |
| d | <code>number</code> | distance from start of line to created point |


---
