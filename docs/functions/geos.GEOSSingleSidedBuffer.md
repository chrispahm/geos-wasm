<a name="exp_module_geos--geos.GEOSSingleSidedBuffer"></a>

## geos.GEOSSingleSidedBuffer ⇒ <code>number</code> ⏏
Creates a single-sided buffer around a geometry with a specified width, number of segments per quadrant, side (left or right), end cap style and join style using a given context handle.
A positive distance will create a buffer on the left side of the geometry (as viewed from the start point to the end point), while a negative distance will create a buffer on the right side.
A single-sided buffer is constructed by offsetting the input line by the buffer distance then forming a buffer around the offset line by the buffer distance (using round ends).
This produces a buffer polygon with one straight side which is parallel to the input line at the given offset distance.
If the input line is oriented counter-clockwise then the left side is inside the polygon; otherwise it is outside.
If the input line is not simple (i.e. it loops back on itself) then there may be multiple left sides and right sides; in this case it is not clearly defined which side should be buffered.
In this case the operation may either fail with an exception or return an approximate result which may not be valid.
This function does not support buffering MultiLineStrings (the result will be an empty polygon).

**Kind**: Exported member  
**Returns**: <code>number</code> - The single-sided buffered geometry pointer or NULL if an exception occurred.  

| Param | Type | Description |
| --- | --- | --- |
| g | <code>number</code> | The input geometry pointer. |
| width | <code>number</code> | The buffer width. |
| quadsegs | <code>number</code> | The number of segments per quadrant. |
| side | <code>number</code> | The side to buffer. 1 for left, -1 for right. |
| endCapStyle | <code>number</code> | The end cap style. One of 1 = GEOSBUF_CAP_ROUND, 2 = GEOSBUF_CAP_FLAT or 3 = GEOSBUF_CAP_SQUARE. |
| joinStyle | <code>number</code> | The join style. One of 1 = GEOSBUF_JOIN_ROUND, 2 = GEOSBUF_JOIN_MITRE or 3 = GEOSBUF_JOIN_BEVEL. |


---
<a name="exp_module_geos--geos.GEOSSingleSidedBuffer_r"></a>

## geos.GEOSSingleSidedBuffer\_r ⇒ <code>number</code> ⏏
Creates a single-sided buffer around a geometry with a specified width, number of segments per quadrant, side (left or right), end cap style and join style using a given context handle.
A positive distance will create a buffer on the left side of the geometry (as viewed from the start point to the end point), while a negative distance will create a buffer on the right side.
A single-sided buffer is constructed by offsetting the input line by the buffer distance then forming a buffer around the offset line by the buffer distance (using round ends).
This produces a buffer polygon with one straight side which is parallel to the input line at the given offset distance.
If the input line is oriented counter-clockwise then the left side is inside the polygon; otherwise it is outside.
If the input line is not simple (i.e. it loops back on itself) then there may be multiple left sides and right sides; in this case it is not clearly defined which side should be buffered.
In this case the operation may either fail with an exception or return an approximate result which may not be valid.
This function does not support buffering MultiLineStrings (the result will be an empty polygon).

**Kind**: Exported member  
**Returns**: <code>number</code> - The single-sided buffered geometry pointer or NULL if an exception occurred.  

| Param | Type | Description |
| --- | --- | --- |
| handle | <code>number</code> | A pointer to the GEOS context handle. |
| g | <code>number</code> | The input geometry pointer. |
| width | <code>number</code> | The buffer width. |
| quadsegs | <code>number</code> | The number of segments per quadrant. |
| side | <code>number</code> | The side to buffer. 1 for left, -1 for right. |
| endCapStyle | <code>number</code> | The end cap style. One of 1 = GEOSBUF_CAP_ROUND, 2 = GEOSBUF_CAP_FLAT or 3 =GEOSBUF_CAP_SQUARE. |
| joinStyle | <code>number</code> | The join style. One of 1 = GEOSBUF_JOIN_ROUND, 2 = GEOSBUF_JOIN_MITRE or 3 = GEOSBUF_JOIN_BEVEL. |


---
