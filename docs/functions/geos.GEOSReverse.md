<a name="exp_module_geos--geos.GEOSReverse"></a>

## geos.GEOSReverse ⇒ <code>number</code> ⏏
Reverses the order of the coordinates in a geometry.

**Kind**: Exported member  
**Returns**: <code>number</code> - A pointer to a geometry with reversed coordinates, or NULL on exception.  
**See**: https://libgeos.org/doxygen/classgeos_1_1geom_1_1Geometry.html  

| Param | Type | Description |
| --- | --- | --- |
| g | <code>number</code> | The input geometry pointer, which must be a point, linestring, linearring or polygon. |


---
<a name="exp_module_geos--geos.GEOSReverse_r"></a>

## geos.GEOSReverse\_r ⇒ <code>number</code> ⏏
Reverses the order of the coordinates in a geometry, using a GEOS context handle.

**Kind**: Exported member  
**Returns**: <code>number</code> - A pointer to a geometry with reversed coordinates, or NULL on exception.  
**See**: https://libgeos.org/doxygen/geos__c_8h_source.html  

| Param | Type | Description |
| --- | --- | --- |
| handle | <code>number</code> | The GEOS context pointer handle. |
| g | <code>number</code> | The input geometry pointer, which must be a point, linestring, linearring or polygon. |


---
