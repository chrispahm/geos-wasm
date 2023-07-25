<a name="exp_module_geos--geos.GEOSNearestPoints"></a>

## geos.GEOSNearestPoints ⇒ <code>string</code> ⏏
Compute the nearest points between two geometries.

**Kind**: Exported member  
**Returns**: <code>string</code> - A JSON string representing a GEOSGeometry object containing two points, or null on exception  

| Param | Type | Description |
| --- | --- | --- |
| g1 | <code>string</code> | A JSON string representing a GEOSGeometry object |
| g2 | <code>string</code> | A JSON string representing a GEOSGeometry object |


---
<a name="exp_module_geos--geos.GEOSNearestPoints_r"></a>

## geos.GEOSNearestPoints\_r ⇒ <code>string</code> ⏏
Returns a GEOSCoordSequence of the nearest points between two geometries.

**Kind**: Exported member  
**Returns**: <code>string</code> - A WKT string representing the GEOSCoordSequence of the nearest points.  

| Param | Type | Description |
| --- | --- | --- |
| handle | <code>number</code> | A pointer to the GEOS context handle. |
| g1 | <code>string</code> | The first geometry as a WKT string. |
| g2 | <code>string</code> | The second geometry as a WKT string. |


---
