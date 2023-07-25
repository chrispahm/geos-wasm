<a name="exp_module_geos--geos.GEOSBuffer"></a>

## geos.GEOSBuffer ⇒ <code>number</code> ⏏
Computes a buffer area around this geometry having the given width and with a specified accuracy of approximation for circular arcs.

**Kind**: Exported member  
**Returns**: <code>number</code> - A pointer to the resulting geometry, or NULL if an exception was thrown.  

| Param | Type | Description |
| --- | --- | --- |
| g | <code>number</code> | A pointer to the input geometry. |
| width | <code>number</code> | The width of the buffer area around this geometry. Negative values create a buffer inside this geometry. |
| quadsegs | <code>number</code> | The number of segments used to approximate a quarter circle (defaults to 8). |


---
<a name="exp_module_geos--geos.GEOSBufferParams_create"></a>

## geos.GEOSBufferParams\_create ⇒ <code>number</code> ⏏
Create a new GEOSBufferParams object

**Kind**: Exported member  
**Returns**: <code>number</code> - A pointer to the newly allocated GEOSBufferParams object  

---
<a name="exp_module_geos--geos.GEOSBufferParams_create_r"></a>

## geos.GEOSBufferParams\_create\_r ⇒ <code>number</code> ⏏
Create a new GEOSBufferParams object with a context handle

**Kind**: Exported member  
**Returns**: <code>number</code> - A pointer to the newly allocated GEOSBufferParams object  

| Param | Type | Description |
| --- | --- | --- |
| handle | <code>number</code> | The context handle |


---
<a name="exp_module_geos--geos.GEOSBufferParams_destroy"></a>

## geos.GEOSBufferParams\_destroy ⏏
Destroy a GEOSBufferParams object

**Kind**: Exported member  

| Param | Type | Description |
| --- | --- | --- |
| params | <code>number</code> | A pointer to the GEOSBufferParams object to destroy |


---
<a name="exp_module_geos--geos.GEOSBufferParams_destroy_r"></a>

## geos.GEOSBufferParams\_destroy\_r ⏏
Destroy a GEOSBufferParams object with a context handle

**Kind**: Exported member  

| Param | Type | Description |
| --- | --- | --- |
| handle | <code>number</code> | The context handle |
| params | <code>number</code> | A pointer to the GEOSBufferParams object to destroy |


---
<a name="exp_module_geos--geos.GEOSBufferParams_setEndCapStyle"></a>

## geos.GEOSBufferParams\_setEndCapStyle ⇒ <code>number</code> ⏏
Set the end cap style for a GEOSBufferParams object

**Kind**: Exported member  
**Returns**: <code>number</code> - 1 on success, 0 on failure  

| Param | Type | Description |
| --- | --- | --- |
| params | <code>number</code> | A pointer to the GEOSBufferParams object to modify |
| style | <code>number</code> | The end cap style, one of **GEOSBUF_CAP_ROUND**, **GEOSBUF_CAP_FLAT**, or **GEOSBUF_CAP_SQUARE** |


---
<a name="exp_module_geos--geos.GEOSBufferParams_setEndCapStyle_r"></a>

## geos.GEOSBufferParams\_setEndCapStyle\_r ⇒ <code>null</code> ⏏
Sets the end cap style of the buffer parameters.

**Kind**: Exported member  

| Param | Type | Description |
| --- | --- | --- |
| handle | <code>number</code> | A pointer to the GEOS context handle. |
| p | <code>number</code> | The pointer to the buffer parameters object. |
| style | <code>number</code> | The end cap style code. Possible values are:  - 1: round  - 2: flat  - 3: square |


---
<a name="exp_module_geos--geos.GEOSBufferParams_setJoinStyle"></a>

## geos.GEOSBufferParams\_setJoinStyle ⇒ <code>null</code> ⏏
Sets the join style of the buffer parameters.

**Kind**: Exported member  

| Param | Type | Description |
| --- | --- | --- |
| p | <code>number</code> | The pointer to the buffer parameters object. |
| joinStyle | <code>number</code> | The join style code. Possible values are:  - 1: round  - 2: mitre  - 3: bevel |


---
<a name="exp_module_geos--geos.GEOSBufferParams_setJoinStyle_r"></a>

## geos.GEOSBufferParams\_setJoinStyle\_r ⇒ <code>null</code> ⏏
Sets the join style of the buffer parameters.

**Kind**: Exported member  

| Param | Type | Description |
| --- | --- | --- |
| handle | <code>number</code> | A pointer to the GEOS context handle. |
| p | <code>number</code> | The pointer to the buffer parameters object. |
| joinStyle | <code>number</code> | The join style code. Possible values are:  - 1: round  - 2: mitre  - 3: bevel |


---
<a name="exp_module_geos--geos.GEOSBufferParams_setMitreLimit"></a>

## geos.GEOSBufferParams\_setMitreLimit ⇒ <code>null</code> ⏏
Sets the mitre limit of the buffer parameters.

**Kind**: Exported member  

| Param | Type | Description |
| --- | --- | --- |
| p | <code>number</code> | The pointer to the buffer parameters object. |
| mitreLimit | <code>number</code> | The mitre limit value. This is used for very sharp corners. The mitre limit is the ratio of the distance from the corner to the end of the mitred offset corner. When two line segments meet at a sharp angle, a miter join will extend the original geometry. To prevent unreasonable geometry, the mitre limit allows controlling how far the miter join can extend from the original geometry. If the limit is exceeded, the join will be beveled. |


---
<a name="exp_module_geos--geos.GEOSBufferParams_setMitreLimit_r"></a>

## geos.GEOSBufferParams\_setMitreLimit\_r ⇒ <code>null</code> ⏏
Sets the mitre limit of the buffer parameters.

**Kind**: Exported member  

| Param | Type | Description |
| --- | --- | --- |
| handle | <code>number</code> | A pointer to the GEOS context handle. |
| p | <code>number</code> | The pointer to the buffer parameters object. |
| mitreLimit | <code>number</code> | The mitre limit value. This is used for very sharp corners. The mitre limit is the ratio of the distance from the corner to the end of the mitred offset corner. When two line segments meet at a sharp angle, a miter join will extend the original geometry. To prevent unreasonable geometry, the mitre limit allows controlling how far the miter join can extend from the original geometry. If the limit is exceeded, the join will be beveled. |


---
<a name="exp_module_geos--geos.GEOSBufferParams_setQuadrantSegments"></a>

## geos.GEOSBufferParams\_setQuadrantSegments ⇒ <code>null</code> ⏏
Sets the number of line segments used to approximate an angle fillet.

**Kind**: Exported member  
**Returns**: <code>null</code> - - No return value.  

| Param | Type | Description |
| --- | --- | --- |
| p | <code>number</code> | A pointer to a GEOSBufferParams object. |
| quadSegs | <code>number</code> | The number of segments in a fillet for a quadrant, must be >= 1. |


---
<a name="exp_module_geos--geos.GEOSBufferParams_setQuadrantSegments_r"></a>

## geos.GEOSBufferParams\_setQuadrantSegments\_r ⇒ <code>null</code> ⏏
Sets the number of line segments used to approximate an angle fillet, with a context handle.

**Kind**: Exported member  
**Returns**: <code>null</code> - - No return value.  

| Param | Type | Description |
| --- | --- | --- |
| handle | <code>number</code> | A pointer to a GEOSContextHandle object. |
| p | <code>number</code> | A pointer to a GEOSBufferParams object. |
| quadSegs | <code>number</code> | The number of segments in a fillet for a quadrant, must be >= 1. |


---
<a name="exp_module_geos--geos.GEOSBufferParams_setSingleSided"></a>

## geos.GEOSBufferParams\_setSingleSided ⇒ <code>null</code> ⏏
Sets whether the computed buffer should be single-sided.
A single-sided buffer is constructed on only one side of each input line.
The side is determined by the sign of the buffer distance:
- A positive distance indicates the left-hand side
- A negative distance indicates the right-hand side
The single-sided buffer of point geometries is the same as the regular buffer.
The End Cap Style for single-sided buffers is always ignored, and forced to the equivalent of CAP_FLAT.

**Kind**: Exported member  
**Returns**: <code>null</code> - - No return value.  

| Param | Type | Description |
| --- | --- | --- |
| p | <code>number</code> | A pointer to a GEOSBufferParams object. |
| singleSided | <code>number</code> | A boolean value indicating whether the buffer is single-sided or not. |


---
<a name="exp_module_geos--geos.GEOSBufferParams_setSingleSided_r"></a>

## geos.GEOSBufferParams\_setSingleSided\_r ⇒ <code>null</code> ⏏
Sets whether the computed buffer should be single-sided, with a context handle.
A single-sided buffer is constructed on only one side of each input line.
The side is determined by the sign of the buffer distance:
- A positive distance indicates the left-hand side
- A negative distance indicates the right-hand side
The single-sided buffer of point geometries is the same as the regular buffer.
The End Cap Style for single-sided buffers is always ignored, and forced to the equivalent of CAP_FLAT.

**Kind**: Exported member  
**Returns**: <code>null</code> - - No return value.  

| Param | Type | Description |
| --- | --- | --- |
| handle | <code>number</code> | A pointer to a GEOSContextHandle object. |
| p | <code>number</code> | A pointer to a GEOSBufferParams object. |
| singleSided | <code>number</code> | A boolean value indicating whether the buffer is single-sided or not. |


---
<a name="exp_module_geos--geos.GEOSBufferWithParams"></a>

## geos.GEOSBufferWithParams ⇒ <code>number</code> ⏏
Returns the buffer computed for a geometry for a given buffer distance and parameters.

**Kind**: Exported member  
**Returns**: <code>number</code> - - A pointer to a GEOSGeometry object representing the output geometry, or NULL if an exception occurred.  

| Param | Type | Description |
| --- | --- | --- |
| g | <code>number</code> | A pointer to a GEOSGeometry object representing the input geometry. |
| p | <code>number</code> | A pointer to a GEOSBufferParams object containing the buffer parameters. |
| width | <code>number</code> | The buffer distance. |


---
<a name="exp_module_geos--geos.GEOSBufferWithParams_r"></a>

## geos.GEOSBufferWithParams\_r ⇒ <code>number</code> ⏏
Creates a buffer area around this geometry having the given width and with a specified accuracy of approximation for circular arcs.

**Kind**: Exported member  
**Returns**: <code>number</code> - A pointer to the geometry representing the buffer area. Returns NULL on exception.  

| Param | Type | Description |
| --- | --- | --- |
| handle | <code>number</code> | The GEOS context pointer handle. |
| g | <code>number</code> | The geometry pointer to buffer. |
| p | <code>number</code> | A pointer to the buffer parameters. |
| width | <code>number</code> | The width of the buffer area. |


---
<a name="exp_module_geos--geos.GEOSBufferWithStyle"></a>

## geos.GEOSBufferWithStyle ⇒ <code>number</code> ⏏
Creates a buffer around a geometry with a specified width, number of segments per quadrant, end cap style, join style and mitre limit.

**Kind**: Exported member  
**Returns**: <code>number</code> - The buffered geometry pointer or NULL if an exception occurred.  

| Param | Type | Description |
| --- | --- | --- |
| g | <code>number</code> | The input geometry pointer. |
| width | <code>number</code> | The buffer width. |
| quadsegs | <code>number</code> | The number of segments per quadrant. |
| endCapStyle | <code>number</code> | The end cap style. One of GEOSBUF_CAP_ROUND, GEOSBUF_CAP_FLAT or GEOSBUF_CAP_SQUARE. |
| joinStyle | <code>number</code> | The join style. One of GEOSBUF_JOIN_ROUND, GEOSBUF_JOIN_MITRE or GEOSBUF_JOIN_BEVEL. |


---
<a name="exp_module_geos--geos.GEOSBufferWithStyle_r"></a>

## geos.GEOSBufferWithStyle\_r ⇒ <code>number</code> ⏏
Creates a buffer around a geometry with a specified width, number of segments per quadrant, end cap style, join style and mitre limit using a given context handle.

**Kind**: Exported member  
**Returns**: <code>number</code> - The buffered geometry pointer or NULL if an exception occurred.  

| Param | Type | Description |
| --- | --- | --- |
| handle | <code>number</code> | A pointer to the GEOS context handle. |
| g | <code>number</code> | The input geometry pointer. |
| width | <code>number</code> | The buffer width. |
| quadsegs | <code>number</code> | The number of segments per quadrant. |
| endCapStyle | <code>number</code> | The end cap style. One of GEOSBUF_CAP_ROUND, GEOSBUF_CAP_FLAT or GEOSBUF_CAP_SQUARE. |
| joinStyle | <code>number</code> | The join style. One of GEOSBUF_JOIN_ROUND, GEOSBUF_JOIN_MITRE or GEOSBUF_JOIN_BEVEL. |
| mitreLimit | <code>number</code> | The mitre limit. A positive number or zero. |


---
<a name="exp_module_geos--geos.GEOSBuffer_r"></a>

## geos.GEOSBuffer\_r ⇒ <code>number</code> ⏏
Creates a buffer around a geometry with a specified width, number of segments per quadrant, end cap style, join style and mitre limit.

**Kind**: Exported member  
**Returns**: <code>number</code> - The buffered geometry pointer or NULL if an exception occurred.  

| Param | Type | Description |
| --- | --- | --- |
| handle | <code>number</code> | A pointer to the GEOS context handle. |
| g | <code>number</code> | The input geometry pointer. |
| width | <code>number</code> | The buffer width. |
| quadsegs | <code>number</code> | The number of segments per quadrant. |
| endCapStyle | <code>number</code> | The end cap style. One of GEOSBUF_CAP_ROUND, GEOSBUF_CAP_FLAT or GEOSBUF_CAP_SQUARE. |
| joinStyle | <code>number</code> | The join style. One of GEOSBUF_JOIN_ROUND, GEOSBUF_JOIN_MITRE or GEOSBUF_JOIN_BEVEL. |
| mitreLimit | <code>number</code> | The mitre limit. A positive number or zero. |


---
