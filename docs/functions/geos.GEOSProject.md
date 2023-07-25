<a name="exp_module_geos--geos.GEOSProject"></a>

## geos.GEOSProject ⇒ <code>number</code> ⏏
Returns the distance of a point projected on a line from the origin of the line.

**Kind**: Exported member  
**Returns**: <code>number</code> - The distance of the projected point along the line, or -1 on exception.  
**See**: https://libgeos.org/doxygen/geos__c_8h.html#a557  

| Param | Type | Description |
| --- | --- | --- |
| line | <code>number</code> | The GEOSGeometry pointer of the lineal geometry. |
| point | <code>number</code> | The GEOSGeometry pointer of the point geometry. |


---
<a name="exp_module_geos--geos.GEOSProjectNormalized"></a>

## geos.GEOSProjectNormalized ⇒ <code>number</code> ⏏
Returns the distance of point p projected on line g from the origin of g,
which must be a lineal geometry. The distance is normalized to the length of g.

**Kind**: Exported member  
**Returns**: <code>number</code> - The normalized distance of p projected on g, or -1 on error.  
**See**: [https://docs.rs/geos-sys/1.0.13/geos_sys/fn.GEOSProjectNormalized.html](https://docs.rs/geos-sys/1.0.13/geos_sys/fn.GEOSProjectNormalized.html)  

| Param | Type | Description |
| --- | --- | --- |
| g | <code>number</code> | A pointer to a GEOSGeometry object representing a lineal geometry. |
| p | <code>number</code> | A pointer to a GEOSGeometry object representing a point. |


---
<a name="exp_module_geos--geos.GEOSProjectNormalized_r"></a>

## geos.GEOSProjectNormalized\_r ⇒ <code>number</code> ⏏
Returns the distance of point p projected on line g from the origin of g,
which must be a lineal geometry. The distance is normalized to the length of g.
This is a thread-safe variant of GEOSProjectNormalized that takes a GEOS context handle as an argument.

**Kind**: Exported member  
**Returns**: <code>number</code> - The normalized distance of p projected on g, or -1 on error.  
**See**: [https://github.com/libgeos/geos/blob/main/capi/geos_c.h.in](https://github.com/libgeos/geos/blob/main/capi/geos_c.h.in)  

| Param | Type | Description |
| --- | --- | --- |
| handle | <code>number</code> | A pointer to a GEOSContextHandle_t object. |
| g | <code>number</code> | A pointer to a GEOSGeometry object representing a lineal geometry. |
| p | <code>number</code> | A pointer to a GEOSGeometry object representing a point. |


---
<a name="exp_module_geos--geos.GEOSProject_r"></a>

## geos.GEOSProject\_r ⇒ <code>number</code> ⏏
Returns the distance of a point projected on a line from the origin of the line, using a reentrant context.

**Kind**: Exported member  
**Returns**: <code>number</code> - The distance of the projected point along the line, or -1 on exception.  
**See**: https://libgeos.org/doxygen/geos__c_8h_source.html#l00557  

| Param | Type | Description |
| --- | --- | --- |
| handle | <code>number</code> | A pointer to the GEOS context handle. |
| line | <code>number</code> | The GEOSGeometry pointer of the lineal geometry. |
| point | <code>number</code> | The GEOSGeometry pointer of the point geometry. |


---
