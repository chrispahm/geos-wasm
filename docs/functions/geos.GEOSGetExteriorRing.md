<a name="exp_module_geos--geos.GEOSGetExteriorRing"></a>

## geos.GEOSGetExteriorRing ⇒ <code>number</code> ⏏
Returns the exterior ring of a polygon geometry as a linear ring.

**Kind**: Exported member  
**Returns**: <code>number</code> - A pointer to a newly allocated GEOSGeometry object of type LinearRing, or NULL on exception. The caller is responsible for destroying it with GEOSGeom_destroy().  

| Param | Type | Description |
| --- | --- | --- |
| g | <code>number</code> | A pointer to a GEOSGeometry object of type Polygon. |


---
<a name="exp_module_geos--geos.GEOSGetExteriorRing_r"></a>

## geos.GEOSGetExteriorRing\_r ⇒ <code>number</code> ⏏
Returns the exterior ring of a polygon geometry.

**Kind**: Exported member  
**Returns**: <code>number</code> - - The exterior ring geometry, or null if an error occurred.  
**See**: https://libgeos.org/doxygen/geos__c_8h_source.html  

| Param | Type | Description |
| --- | --- | --- |
| handle | <code>number</code> | A pointer to the GEOS context handle. |
| g | <code>number</code> | The polygon geometry. |


---
