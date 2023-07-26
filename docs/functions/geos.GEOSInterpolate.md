<a name="exp_module_geos--geos.GEOSInterpolate"></a>

## geos.GEOSInterpolate ⇒ <code>number</code> ⏏
Measuring from start of line, return point that is distance the start. Line parameter must be a LineString. The returned point is not guaranteed to intersect the line due to limitations of floating point calculations.

**Kind**: Exported member  
**Returns**: <code>number</code> - A new GEOSGeometry pointer representing the interpolated point, or NULL on exception.  
**See**: https://libgeos.org/doxygen/geos__c_8h.html#a1849  

| Param | Type | Description |
| --- | --- | --- |
| line | <code>number</code> | The GEOSGeometry pointer of the lineal geometry. |
| distance | <code>number</code> | The distance along the linestring to interpolate. |


---
<a name="exp_module_geos--geos.GEOSInterpolateNormalized"></a>

## geos.GEOSInterpolateNormalized ⇒ <code>number</code> ⏏
Returns the point along line g representing the given distance from the origin along the geometry.
The distance is normalized to the length of g, which must be a lineal geometry.

**Kind**: Exported member  
**Returns**: <code>number</code> - A pointer to a new GEOSGeometry object representing the interpolated point, or NULL on error.  
**See**: [https://rdrr.io/cran/geos/man/geos_project.html](https://rdrr.io/cran/geos/man/geos_project.html)  

| Param | Type | Description |
| --- | --- | --- |
| g | <code>number</code> | A pointer to a GEOSGeometry object representing a lineal geometry. |
| d | <code>number</code> | The normalized distance along the linestring to interpolate. |


---
<a name="exp_module_geos--geos.GEOSInterpolateNormalized_r"></a>

## geos.GEOSInterpolateNormalized\_r ⇒ <code>number</code> ⏏
Returns the point along line g representing the given distance from the origin along the geometry.
The distance is normalized to the length of g, which must be a lineal geometry.
This is a thread-safe variant of GEOSInterpolateNormalized that takes a GEOS context handle as an argument.

**Kind**: Exported member  
**Returns**: <code>number</code> - A pointer to a new GEOSGeometry object representing the interpolated point, or NULL on error.  
**See**: [https://github.com/libgeos/geos/blob/main/capi/geos_c.h.in](https://github.com/libgeos/geos/blob/main/capi/geos_c.h.in)  

| Param | Type | Description |
| --- | --- | --- |
| handle | <code>number</code> | A pointer to a GEOSContextHandle_t object. |
| g | <code>number</code> | A pointer to a GEOSGeometry object representing a lineal geometry. |
| d | <code>number</code> | The normalized distance along the linestring to interpolate. |


---
<a name="exp_module_geos--geos.GEOSInterpolate_r"></a>

## geos.GEOSInterpolate\_r ⇒ <code>number</code> ⏏
Measuring from start of line, return point that is distance the start. Line parameter must be a LineString. The returned point is not guaranteed to intersect the line due to limitations of floating point calculations.

**Kind**: Exported member  
**Returns**: <code>number</code> - A new GEOSGeometry pointer representing the interpolated point, or NULL on exception.  
**See**: https://libgeos.org/doxygen/geos__c_8h.html#a1850  

| Param | Type | Description |
| --- | --- | --- |
| handle | <code>number</code> | A pointer to the GEOS context handle. |
| line | <code>number</code> | The GEOSGeometry pointer of the lineal geometry. |
| distance | <code>number</code> | The distance along the linestring to interpolate. |


---
