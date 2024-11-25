<a name="exp_module_geos--geos.GEOSLineSubstring"></a>

## geos.GEOSLineSubstring ⇒ [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) ⏏
Computes the line which is the section of the input LineString starting and ending at the given length fractions.

**Kind**: global property of [<code>geos</code>](/typedefs-enums/typedefs-enums.html#module_geos)  
**Returns**: [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) - selected substring. Caller is responsible for freeing with GEOSGeom_destroy()  

| Param | Type | Description |
| --- | --- | --- |
| g | [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) | The input LineString |
| start_fraction | <code>number</code> | start fraction (0-1) along the length of g |
| end_fraction | <code>number</code> | end fraction (0-1) along the length of g |


---
<a name="exp_module_geos--geos.GEOSLineSubstring_r"></a>

## geos.GEOSLineSubstring\_r ⇒ [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) ⏏
Computes the line which is the section of the input LineString starting and ending at the given length fractions.

**Kind**: global property of [<code>geos</code>](/typedefs-enums/typedefs-enums.html#module_geos)  
**Returns**: [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) - selected substring. Caller is responsible for freeing with GEOSGeom_destroy()  

| Param | Type | Description |
| --- | --- | --- |
| handle | [<code>GEOSContextHandle\_t</code>](/typedefs-enums/typedefs-enums.html#GEOSContextHandle_t) | - |
| g | [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) | The input LineString |
| start_fraction | <code>number</code> | start fraction (0-1) along the length of g |
| end_fdraction | <code>number</code> | end fraction (0-1) along the length of g |


---
