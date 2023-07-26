<a name="exp_module_geos--geos.GEOSGetNumGeometries"></a>

## geos.GEOSGetNumGeometries ⇒ <code>number</code> ⏏
Returns the number of geometries in a collection.

**Kind**: Exported member  
**Returns**: <code>number</code> - The number of geometries in the collection, or -1 on exception.  

| Param | Type | Description |
| --- | --- | --- |
| g | <code>number</code> | A pointer to a GEOSGeometry object of type GeometryCollection or its subclasses (MultiPoint, MultiLineString, MultiPolygon). |


---
<a name="exp_module_geos--geos.GEOSGetNumGeometries_r"></a>

## geos.GEOSGetNumGeometries\_r ⇒ <code>number</code> ⏏
Returns the number of geometries in a collection (thread-safe version).

**Kind**: Exported member  
**Returns**: <code>number</code> - The number of geometries in the collection, or -1 on exception.  

| Param | Type | Description |
| --- | --- | --- |
| handle | <code>number</code> | A GEOS context handle created with initGEOS_r(). |
| g | <code>number</code> | A pointer to a GEOSGeometry object of type GeometryCollection or its subclasses (MultiPoint, MultiLineString, MultiPolygon). |


---
