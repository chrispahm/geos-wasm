<a name="exp_module_geos--geos.GEOSOffsetCurve"></a>

## geos.GEOSOffsetCurve ⇒ [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) ⏏
Generates offset curve line(s) for a geometry. Handles all geometry types as input.

**Kind**: global property of [<code>geos</code>](/typedefs-enums/typedefs-enums.html#module_geos)  
**Returns**: [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) - The offset geometry. Returns NULL on exception. Caller is responsible for freeing with GEOSGeom_destroy().  

| Param | Type | Description |
| --- | --- | --- |
| g | [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) | The linear geometry to offset from |
| width | <code>number</code> | Distance to offset from the curve. Negative for a right-side offset. Positive for a left-side offset. |
| quadsegs | <code>number</code> | Number of segments per quadrant |
| joinStyle | <code>number</code> | See GEOSBufJoinStyles |
| mitreLimit | <code>number</code> | See GEOSBufferParams_setMitreLimit |


---
<a name="exp_module_geos--geos.GEOSOffsetCurve_r"></a>

## geos.GEOSOffsetCurve\_r ⇒ [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) ⏏
Generates offset curve line(s) for a geometry. Handles all geometry types as input.

**Kind**: global property of [<code>geos</code>](/typedefs-enums/typedefs-enums.html#module_geos)  
**Returns**: [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) - The offset geometry. Returns NULL on exception. Caller is responsible for freeing with GEOSGeom_destroy().  

| Param | Type | Description |
| --- | --- | --- |
| handle | [<code>GEOSContextHandle\_t</code>](/typedefs-enums/typedefs-enums.html#GEOSContextHandle_t) | - |
| g | [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) | The linear geometry to offset from |
| width | <code>number</code> | Distance to offset from the curve. Negative for a right-side offset. Positive for a left-side offset. |
| quadsegs | <code>number</code> | Number of segments per quadrant |
| joinStyle | <code>number</code> | See GEOSBufJoinStyles |
| mitreLimit | <code>number</code> | See GEOSBufferParams_setMitreLimit |


---
