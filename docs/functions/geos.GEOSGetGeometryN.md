<a name="exp_module_geos--geos.GEOSGetGeometryN"></a>

## geos.GEOSGetGeometryN ⇒ <code>number</code> ⏏
Returns a geometry from a collection by index.

**Kind**: Exported member  
**Returns**: <code>number</code> - A pointer to a newly allocated GEOSGeometry object corresponding to the geometry at index n. The caller is responsible for destroying it. Returns NULL on exception.  

| Param | Type | Description |
| --- | --- | --- |
| g | <code>number</code> | A pointer to a GEOSGeometry object of type GeometryCollection or its subclasses (MultiPoint, MultiLineString, MultiPolygon). |
| n | <code>number</code> | The index of the geometry to return, starting from 0. |


---
<a name="exp_module_geos--geos.GEOSGetGeometryN_r"></a>

## geos.GEOSGetGeometryN\_r ⇒ <code>number</code> ⏏
Return the Nth geometry of a collection.

**Kind**: Exported member  
**Returns**: <code>number</code> - A geometry object. Caller must free with GEOSGeom_destroy().
NULL on exception or if n is out of range.  

| Param | Type | Description |
| --- | --- | --- |
| handle | <code>number</code> | A pointer to the GEOS context handle. |
| g | <code>number</code> | The input geometry, must be a collection. |
| n | <code>number</code> | The index of the geometry to return, starting from 0. |


---
