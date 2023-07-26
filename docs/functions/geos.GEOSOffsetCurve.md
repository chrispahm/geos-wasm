<a name="exp_module_geos--geos.GEOSOffsetCurve"></a>

## geos.GEOSOffsetCurve ⇒ <code>number</code> ⏏
Computes an offset curve from a geometry. An offset curve is a linear geometry which is offset a given distance from the input. If the offset distance is positive the curve lies on the left side of the input; if it is negative the curve is on the right side. The curve(s) have the same direction as the input line(s).

**Kind**: Exported member  
**Returns**: <code>number</code> - A pointer to a new GEOSGeometry object representing the offset curve, or NULL on exception.  
**See**: https://libgeos.org/doxygen/geos__c_8h.html#a06557cad6153f56703b6875d4f21dc18  

| Param | Type | Description |
| --- | --- | --- |
| geom | <code>number</code> | A pointer to a GEOSGeometry object. |
| width | <code>number</code> | The offset distance. |
| quadsegs | <code>number</code> | The number of quadrant segments used to approximate a quarter circle (defaults to 8). |
| joinStyle | <code>number</code> | The join style for line joins (defaults to BufferParameters::JOIN_STYLE). |
| mitreLimit | <code>number</code> | The mitre ratio limit (only applies for mitre join style, defaults to 5.0). |


---
<a name="exp_module_geos--geos.GEOSOffsetCurve_r"></a>

## geos.GEOSOffsetCurve\_r ⇒ <code>number</code> ⏏
Computes an offset curve from a geometry using a handle. An offset curve is a linear geometry which is offset a given distance from the input. If the offset distance is positive the curve lies on the left side of the input; if it is negative the curve is on the right side. The curve(s) have the same direction as the input line(s).

**Kind**: Exported member  
**Returns**: <code>number</code> - A pointer to a new GEOSGeometry object representing the offset curve, or NULL on exception.  
**See**: https://libgeos.org/doxygen/classgeos_1_1operation_1_1buffer_1_1OffsetCurve.html  

| Param | Type | Description |
| --- | --- | --- |
| handle | <code>number</code> | A pointer to a GEOSContextHandle_t object. |
| geom | <code>number</code> | A pointer to a GEOSGeometry object. |
| width | <code>number</code> | The offset distance. |
| quadsegs | <code>number</code> | The number of quadrant segments used to approximate a quarter circle (defaults to 8). |
| joinStyle | <code>number</code> | The join style for line joins (defaults to BufferParameters::JOIN_STYLE). |
| mitreLimit | <code>number</code> | The mitre ratio limit (only applies for mitre join style, defaults to 5.0). |


---
