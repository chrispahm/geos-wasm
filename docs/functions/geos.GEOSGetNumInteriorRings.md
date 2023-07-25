<a name="exp_module_geos--geos.GEOSGetNumInteriorRings"></a>

## geos.GEOSGetNumInteriorRings ⇒ <code>number</code> ⏏
Returns the number of interior rings in the polygon.

**Kind**: Exported member  
**Returns**: <code>number</code> - The number of interior rings in the polygon, or -1 on exception.  

| Param | Type | Description |
| --- | --- | --- |
| g | <code>number</code> | A pointer to a GEOSGeometry object of type Polygon. |


---
<a name="exp_module_geos--geos.GEOSGetNumInteriorRings_r"></a>

## geos.GEOSGetNumInteriorRings\_r ⇒ <code>number</code> ⏏
Returns the number of interior rings in the polygon (thread-safe version).

**Kind**: Exported member  
**Returns**: <code>number</code> - The number of interior rings in the polygon, or -1 on exception.  

| Param | Type | Description |
| --- | --- | --- |
| handle | <code>number</code> | A GEOS context handle created with initGEOS_r(). |
| g | <code>number</code> | A pointer to a GEOSGeometry object of type Polygon. |


---
