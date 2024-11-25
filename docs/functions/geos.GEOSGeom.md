<a name="exp_module_geos--geos.GEOSGeomFromHEX_buf"></a>

## ~~geos.GEOSGeomFromHEX\_buf ⇒ [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) ⏏~~
***Deprecated***

**Kind**: global property of [<code>geos</code>](/typedefs-enums/typedefs-enums.html#module_geos)  
**Returns**: [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) - GEOSGeometry*  

| Param | Type | Description |
| --- | --- | --- |
| hex | [<code>Pointer</code>](/typedefs-enums/typedefs-enums.html#Pointer) | - |
| size | <code>number</code> | - |


---
<a name="exp_module_geos--geos.GEOSGeomFromHEX_buf_r"></a>

## ~~geos.GEOSGeomFromHEX\_buf\_r ⇒ [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) ⏏~~
***Deprecated***

**Kind**: global property of [<code>geos</code>](/typedefs-enums/typedefs-enums.html#module_geos)  
**Returns**: [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) - GEOSGeometry*  

| Param | Type | Description |
| --- | --- | --- |
| handle | [<code>GEOSContextHandle\_t</code>](/typedefs-enums/typedefs-enums.html#GEOSContextHandle_t) | - |
| hex | [<code>Pointer</code>](/typedefs-enums/typedefs-enums.html#Pointer) | - |
| size | <code>number</code> | - |


---
<a name="exp_module_geos--geos.GEOSGeomFromWKB_buf"></a>

## ~~geos.GEOSGeomFromWKB\_buf ⇒ [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) ⏏~~
***Deprecated***

**Kind**: global property of [<code>geos</code>](/typedefs-enums/typedefs-enums.html#module_geos)  
**Returns**: [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) - GEOSGeometry*  

| Param | Type | Description |
| --- | --- | --- |
| wkb | [<code>Pointer</code>](/typedefs-enums/typedefs-enums.html#Pointer) | - |
| size | <code>number</code> | - |


---
<a name="exp_module_geos--geos.GEOSGeomFromWKB_buf_r"></a>

## ~~geos.GEOSGeomFromWKB\_buf\_r ⇒ [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) ⏏~~
***Deprecated***

**Kind**: global property of [<code>geos</code>](/typedefs-enums/typedefs-enums.html#module_geos)  
**Returns**: [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) - GEOSGeometry*  

| Param | Type | Description |
| --- | --- | --- |
| handle | [<code>GEOSContextHandle\_t</code>](/typedefs-enums/typedefs-enums.html#GEOSContextHandle_t) | - |
| wkb | [<code>Pointer</code>](/typedefs-enums/typedefs-enums.html#Pointer) | - |
| size | <code>number</code> | - |


---
<a name="exp_module_geos--geos.GEOSGeomFromWKT"></a>

## ~~geos.GEOSGeomFromWKT ⇒ [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) ⏏~~
***Deprecated***

**Kind**: global property of [<code>geos</code>](/typedefs-enums/typedefs-enums.html#module_geos)  
**Returns**: [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) - GEOSGeometry*  

| Param | Type | Description |
| --- | --- | --- |
| wkt | [<code>StringPointer</code>](/typedefs-enums/typedefs-enums.html#StringPointer) | - |


---
<a name="exp_module_geos--geos.GEOSGeomFromWKT_r"></a>

## ~~geos.GEOSGeomFromWKT\_r ⇒ [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) ⏏~~
***Deprecated***

**Kind**: global property of [<code>geos</code>](/typedefs-enums/typedefs-enums.html#module_geos)  
**Returns**: [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) - GEOSGeometry*  

| Param | Type | Description |
| --- | --- | --- |
| handle | [<code>GEOSContextHandle\_t</code>](/typedefs-enums/typedefs-enums.html#GEOSContextHandle_t) | - |
| wkt | [<code>StringPointer</code>](/typedefs-enums/typedefs-enums.html#StringPointer) | - |


---
<a name="exp_module_geos--geos.GEOSGeomGetEndPoint"></a>

## geos.GEOSGeomGetEndPoint ⇒ [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) ⏏
Return the last point of a LineString

**Kind**: global property of [<code>geos</code>](/typedefs-enums/typedefs-enums.html#module_geos)  
**Returns**: [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) - A Point geometry. Caller must free with GEOSGeom_destroy() NULL on exception.  

| Param | Type | Description |
| --- | --- | --- |
| g | [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) | Input geometry, must be a LineString |


---
<a name="exp_module_geos--geos.GEOSGeomGetEndPoint_r"></a>

## geos.GEOSGeomGetEndPoint\_r ⇒ [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) ⏏
Return the last point of a LineString

**Kind**: global property of [<code>geos</code>](/typedefs-enums/typedefs-enums.html#module_geos)  
**Returns**: [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) - A Point geometry. Caller must free with GEOSGeom_destroy() NULL on exception.  

| Param | Type | Description |
| --- | --- | --- |
| handle | [<code>GEOSContextHandle\_t</code>](/typedefs-enums/typedefs-enums.html#GEOSContextHandle_t) | - |
| g | [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) | Input geometry, must be a LineString |


---
<a name="exp_module_geos--geos.GEOSGeomGetLength"></a>

## geos.GEOSGeomGetLength ⇒ <code>number</code> ⏏
Calculate the length of a LineString. Only works for LineString inputs, returns exception otherwise.

**Kind**: global property of [<code>geos</code>](/typedefs-enums/typedefs-enums.html#module_geos)  
**Returns**: <code>number</code> - 1 on success, 0 on exception.  

| Param | Type | Description |
| --- | --- | --- |
| g | [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) | Input geometry |
| length | [<code>NumberPointer</code>](/typedefs-enums/typedefs-enums.html#NumberPointer) | Pointer to be filled in with length result |


---
<a name="exp_module_geos--geos.GEOSGeomGetLength_r"></a>

## geos.GEOSGeomGetLength\_r ⇒ <code>number</code> ⏏
Calculate the length of a LineString. Only works for LineString inputs, returns exception otherwise.

**Kind**: global property of [<code>geos</code>](/typedefs-enums/typedefs-enums.html#module_geos)  
**Returns**: <code>number</code> - 1 on success, 0 on exception.  

| Param | Type | Description |
| --- | --- | --- |
| handle | [<code>GEOSContextHandle\_t</code>](/typedefs-enums/typedefs-enums.html#GEOSContextHandle_t) | - |
| g | [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) | Input geometry |
| length | [<code>NumberPointer</code>](/typedefs-enums/typedefs-enums.html#NumberPointer) | Pointer to be filled in with length result |


---
<a name="exp_module_geos--geos.GEOSGeomGetM"></a>

## geos.GEOSGeomGetM ⇒ <code>number</code> ⏏
Returns the M coordinate, for a Point input, or an exception otherwise.

**Kind**: global property of [<code>geos</code>](/typedefs-enums/typedefs-enums.html#module_geos)  
**Returns**: <code>number</code> - 1 on success, 0 on exception  

| Param | Type | Description |
| --- | --- | --- |
| g | [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) | Input Point geometry |
| m | [<code>NumberPointer</code>](/typedefs-enums/typedefs-enums.html#NumberPointer) | Pointer to hold return value |


---
<a name="exp_module_geos--geos.GEOSGeomGetM_r"></a>

## geos.GEOSGeomGetM\_r ⇒ <code>number</code> ⏏
Returns the M coordinate, for a Point input, or an exception otherwise.

**Kind**: global property of [<code>geos</code>](/typedefs-enums/typedefs-enums.html#module_geos)  
**Returns**: <code>number</code> - 1 on success, 0 on exception  

| Param | Type | Description |
| --- | --- | --- |
| handle | [<code>GEOSContextHandle\_t</code>](/typedefs-enums/typedefs-enums.html#GEOSContextHandle_t) | - |
| g | [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) | Input Point geometry |
| m | [<code>NumberPointer</code>](/typedefs-enums/typedefs-enums.html#NumberPointer) | Pointer to hold return value |


---
<a name="exp_module_geos--geos.GEOSGeomGetNumPoints"></a>

## geos.GEOSGeomGetNumPoints ⇒ <code>number</code> ⏏
Returns the number of points, for a LineString input, or an exception otherwise.

**Kind**: global property of [<code>geos</code>](/typedefs-enums/typedefs-enums.html#module_geos)  
**Returns**: <code>number</code> - Number of points, -1 on exception  

| Param | Type | Description |
| --- | --- | --- |
| g | [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) | Input LineString geometry |


---
<a name="exp_module_geos--geos.GEOSGeomGetNumPoints_r"></a>

## geos.GEOSGeomGetNumPoints\_r ⇒ <code>number</code> ⏏
Returns the number of points, for a LineString input, or an exception otherwise.

**Kind**: global property of [<code>geos</code>](/typedefs-enums/typedefs-enums.html#module_geos)  
**Returns**: <code>number</code> - Number of points, -1 on exception  

| Param | Type | Description |
| --- | --- | --- |
| handle | [<code>GEOSContextHandle\_t</code>](/typedefs-enums/typedefs-enums.html#GEOSContextHandle_t) | - |
| g | [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) | Input LineString geometry |


---
<a name="exp_module_geos--geos.GEOSGeomGetPointN"></a>

## geos.GEOSGeomGetPointN ⇒ [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) ⏏
Return the N'th point of a LineString

**Kind**: global property of [<code>geos</code>](/typedefs-enums/typedefs-enums.html#module_geos)  
**Returns**: [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) - A Point geometry. Caller must free with GEOSGeom_destroy() NULL on exception.  

| Param | Type | Description |
| --- | --- | --- |
| g | [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) | Input geometry, must be a LineString |
| n | <code>number</code> | Index of desired point (zero based) |


---
<a name="exp_module_geos--geos.GEOSGeomGetPointN_r"></a>

## geos.GEOSGeomGetPointN\_r ⇒ [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) ⏏
Return the N'th point of a LineString

**Kind**: global property of [<code>geos</code>](/typedefs-enums/typedefs-enums.html#module_geos)  
**Returns**: [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) - A Point geometry. Caller must free with GEOSGeom_destroy() NULL on exception.  

| Param | Type | Description |
| --- | --- | --- |
| handle | [<code>GEOSContextHandle\_t</code>](/typedefs-enums/typedefs-enums.html#GEOSContextHandle_t) | - |
| g | [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) | Input geometry, must be a LineString |
| n | <code>number</code> | Index of desired point (zero based) |


---
<a name="exp_module_geos--geos.GEOSGeomGetStartPoint"></a>

## geos.GEOSGeomGetStartPoint ⇒ [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) ⏏
Return the first point of a LineString

**Kind**: global property of [<code>geos</code>](/typedefs-enums/typedefs-enums.html#module_geos)  
**Returns**: [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) - A Point geometry. Caller must free with GEOSGeom_destroy() NULL on exception.  

| Param | Type | Description |
| --- | --- | --- |
| g | [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) | Input geometry, must be a LineString |


---
<a name="exp_module_geos--geos.GEOSGeomGetStartPoint_r"></a>

## geos.GEOSGeomGetStartPoint\_r ⇒ [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) ⏏
Return the first point of a LineString

**Kind**: global property of [<code>geos</code>](/typedefs-enums/typedefs-enums.html#module_geos)  
**Returns**: [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) - A Point geometry. Caller must free with GEOSGeom_destroy() NULL on exception.  

| Param | Type | Description |
| --- | --- | --- |
| handle | [<code>GEOSContextHandle\_t</code>](/typedefs-enums/typedefs-enums.html#GEOSContextHandle_t) | - |
| g | [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) | Input geometry, must be a LineString |


---
<a name="exp_module_geos--geos.GEOSGeomGetX"></a>

## geos.GEOSGeomGetX ⇒ <code>number</code> ⏏
Returns the X coordinate, for a Point input, or an exception otherwise.

**Kind**: global property of [<code>geos</code>](/typedefs-enums/typedefs-enums.html#module_geos)  
**Returns**: <code>number</code> - 1 on success, 0 on exception  

| Param | Type | Description |
| --- | --- | --- |
| g | [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) | Input Point geometry |
| x | [<code>NumberPointer</code>](/typedefs-enums/typedefs-enums.html#NumberPointer) | Pointer to hold return value |


---
<a name="exp_module_geos--geos.GEOSGeomGetX_r"></a>

## geos.GEOSGeomGetX\_r ⇒ <code>number</code> ⏏
Returns the X coordinate, for a Point input, or an exception otherwise.

**Kind**: global property of [<code>geos</code>](/typedefs-enums/typedefs-enums.html#module_geos)  
**Returns**: <code>number</code> - 1 on success, 0 on exception  

| Param | Type | Description |
| --- | --- | --- |
| handle | [<code>GEOSContextHandle\_t</code>](/typedefs-enums/typedefs-enums.html#GEOSContextHandle_t) | - |
| g | [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) | Input Point geometry |
| x | [<code>NumberPointer</code>](/typedefs-enums/typedefs-enums.html#NumberPointer) | Pointer to hold return value |


---
<a name="exp_module_geos--geos.GEOSGeomGetY"></a>

## geos.GEOSGeomGetY ⇒ <code>number</code> ⏏
Returns the Y coordinate, for a Point input, or an exception otherwise.

**Kind**: global property of [<code>geos</code>](/typedefs-enums/typedefs-enums.html#module_geos)  
**Returns**: <code>number</code> - 1 on success, 0 on exception  

| Param | Type | Description |
| --- | --- | --- |
| g | [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) | Input Point geometry |
| y | [<code>NumberPointer</code>](/typedefs-enums/typedefs-enums.html#NumberPointer) | Pointer to hold return value |


---
<a name="exp_module_geos--geos.GEOSGeomGetY_r"></a>

## geos.GEOSGeomGetY\_r ⇒ <code>number</code> ⏏
Returns the Y coordinate, for a Point input, or an exception otherwise.

**Kind**: global property of [<code>geos</code>](/typedefs-enums/typedefs-enums.html#module_geos)  
**Returns**: <code>number</code> - 1 on success, 0 on exception  

| Param | Type | Description |
| --- | --- | --- |
| handle | [<code>GEOSContextHandle\_t</code>](/typedefs-enums/typedefs-enums.html#GEOSContextHandle_t) | - |
| g | [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) | Input Point geometry |
| y | [<code>NumberPointer</code>](/typedefs-enums/typedefs-enums.html#NumberPointer) | Pointer to hold return value |


---
<a name="exp_module_geos--geos.GEOSGeomGetZ"></a>

## geos.GEOSGeomGetZ ⇒ <code>number</code> ⏏
Returns the Z coordinate, for a Point input, or an exception otherwise.

**Kind**: global property of [<code>geos</code>](/typedefs-enums/typedefs-enums.html#module_geos)  
**Returns**: <code>number</code> - 1 on success, 0 on exception  

| Param | Type | Description |
| --- | --- | --- |
| g | [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) | Input Point geometry |
| z | [<code>NumberPointer</code>](/typedefs-enums/typedefs-enums.html#NumberPointer) | Pointer to hold return value |


---
<a name="exp_module_geos--geos.GEOSGeomGetZ_r"></a>

## geos.GEOSGeomGetZ\_r ⇒ <code>number</code> ⏏
Returns the Z coordinate, for a Point input, or an exception otherwise.

**Kind**: global property of [<code>geos</code>](/typedefs-enums/typedefs-enums.html#module_geos)  
**Returns**: <code>number</code> - 1 on success, 0 on exception  

| Param | Type | Description |
| --- | --- | --- |
| handle | [<code>GEOSContextHandle\_t</code>](/typedefs-enums/typedefs-enums.html#GEOSContextHandle_t) | - |
| g | [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) | Input Point geometry |
| z | [<code>NumberPointer</code>](/typedefs-enums/typedefs-enums.html#NumberPointer) | Pointer to hold return value |


---
<a name="exp_module_geos--geos.GEOSGeomToHEX_buf"></a>

## ~~geos.GEOSGeomToHEX\_buf ⇒ <code>number</code> ⏏~~
***Deprecated***

**Kind**: global property of [<code>geos</code>](/typedefs-enums/typedefs-enums.html#module_geos)  
**Returns**: <code>number</code> - unsigned  

| Param | Type | Description |
| --- | --- | --- |
| g | [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) | - |
| size | [<code>NumberPointer</code>](/typedefs-enums/typedefs-enums.html#NumberPointer) | - |


---
<a name="exp_module_geos--geos.GEOSGeomToHEX_buf_r"></a>

## ~~geos.GEOSGeomToHEX\_buf\_r ⇒ <code>number</code> ⏏~~
***Deprecated***

**Kind**: global property of [<code>geos</code>](/typedefs-enums/typedefs-enums.html#module_geos)  
**Returns**: <code>number</code> - unsigned  

| Param | Type | Description |
| --- | --- | --- |
| handle | [<code>GEOSContextHandle\_t</code>](/typedefs-enums/typedefs-enums.html#GEOSContextHandle_t) | - |
| g | [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) | - |
| size | [<code>NumberPointer</code>](/typedefs-enums/typedefs-enums.html#NumberPointer) | - |


---
<a name="exp_module_geos--geos.GEOSGeomToWKB_buf"></a>

## ~~geos.GEOSGeomToWKB\_buf ⇒ <code>number</code> ⏏~~
***Deprecated***

**Kind**: global property of [<code>geos</code>](/typedefs-enums/typedefs-enums.html#module_geos)  
**Returns**: <code>number</code> - unsigned  

| Param | Type | Description |
| --- | --- | --- |
| g | [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) | - |
| size | [<code>NumberPointer</code>](/typedefs-enums/typedefs-enums.html#NumberPointer) | - |


---
<a name="exp_module_geos--geos.GEOSGeomToWKB_buf_r"></a>

## ~~geos.GEOSGeomToWKB\_buf\_r ⇒ <code>number</code> ⏏~~
***Deprecated***

**Kind**: global property of [<code>geos</code>](/typedefs-enums/typedefs-enums.html#module_geos)  
**Returns**: <code>number</code> - unsigned  

| Param | Type | Description |
| --- | --- | --- |
| handle | [<code>GEOSContextHandle\_t</code>](/typedefs-enums/typedefs-enums.html#GEOSContextHandle_t) | - |
| g | [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) | - |
| size | [<code>NumberPointer</code>](/typedefs-enums/typedefs-enums.html#NumberPointer) | - |


---
<a name="exp_module_geos--geos.GEOSGeomToWKT"></a>

## ~~geos.GEOSGeomToWKT ⇒ [<code>StringPointer</code>](/typedefs-enums/typedefs-enums.html#StringPointer) ⏏~~
***Deprecated***

**Kind**: global property of [<code>geos</code>](/typedefs-enums/typedefs-enums.html#module_geos)  
**Returns**: [<code>StringPointer</code>](/typedefs-enums/typedefs-enums.html#StringPointer) - char*  

| Param | Type | Description |
| --- | --- | --- |
| g | [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) | - |


---
<a name="exp_module_geos--geos.GEOSGeomToWKT_r"></a>

## ~~geos.GEOSGeomToWKT\_r ⇒ [<code>StringPointer</code>](/typedefs-enums/typedefs-enums.html#StringPointer) ⏏~~
***Deprecated***

**Kind**: global property of [<code>geos</code>](/typedefs-enums/typedefs-enums.html#module_geos)  
**Returns**: [<code>StringPointer</code>](/typedefs-enums/typedefs-enums.html#StringPointer) - char*  

| Param | Type | Description |
| --- | --- | --- |
| handle | [<code>GEOSContextHandle\_t</code>](/typedefs-enums/typedefs-enums.html#GEOSContextHandle_t) | - |
| g | [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) | - |


---
<a name="exp_module_geos--geos.GEOSGeomType"></a>

## geos.GEOSGeomType ⇒ [<code>StringPointer</code>](/typedefs-enums/typedefs-enums.html#StringPointer) ⏏
Returns the geometry type string for this geometry. eg: "GeometryCollection", "LineString"

**Kind**: global property of [<code>geos</code>](/typedefs-enums/typedefs-enums.html#module_geos)  
**Returns**: [<code>StringPointer</code>](/typedefs-enums/typedefs-enums.html#StringPointer) - A string with the geometry type. Caller must free with GEOSFree(). NULL on exception.  

| Param | Type | Description |
| --- | --- | --- |
| g | [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) | Input geometry |


---
<a name="exp_module_geos--geos.GEOSGeomTypeId"></a>

## geos.GEOSGeomTypeId ⇒ <code>number</code> ⏏
Returns the GEOSGeomTypeId number for this geometry.

**Kind**: global property of [<code>geos</code>](/typedefs-enums/typedefs-enums.html#module_geos)  
**Returns**: <code>number</code> - The geometry type number, or -1 on exception.  

| Param | Type | Description |
| --- | --- | --- |
| g | [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) | Input geometry |


---
<a name="exp_module_geos--geos.GEOSGeomTypeId_r"></a>

## geos.GEOSGeomTypeId\_r ⇒ <code>number</code> ⏏
Returns the GEOSGeomTypeId number for this geometry.

**Kind**: global property of [<code>geos</code>](/typedefs-enums/typedefs-enums.html#module_geos)  
**Returns**: <code>number</code> - The geometry type number, or -1 on exception.  

| Param | Type | Description |
| --- | --- | --- |
| handle | [<code>GEOSContextHandle\_t</code>](/typedefs-enums/typedefs-enums.html#GEOSContextHandle_t) | - |
| g | [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) | Input geometry |


---
<a name="exp_module_geos--geos.GEOSGeomType_r"></a>

## geos.GEOSGeomType\_r ⇒ [<code>StringPointer</code>](/typedefs-enums/typedefs-enums.html#StringPointer) ⏏
Returns the geometry type string for this geometry. eg: "GeometryCollection", "LineString"

**Kind**: global property of [<code>geos</code>](/typedefs-enums/typedefs-enums.html#module_geos)  
**Returns**: [<code>StringPointer</code>](/typedefs-enums/typedefs-enums.html#StringPointer) - A string with the geometry type. Caller must free with GEOSFree(). NULL on exception.  

| Param | Type | Description |
| --- | --- | --- |
| handle | [<code>GEOSContextHandle\_t</code>](/typedefs-enums/typedefs-enums.html#GEOSContextHandle_t) | - |
| g | [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) | Input geometry |


---
<a name="exp_module_geos--geos.GEOSGeom_clone"></a>

## geos.GEOSGeom\_clone ⇒ [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) ⏏
Create a new copy of the input geometry.

**Kind**: global property of [<code>geos</code>](/typedefs-enums/typedefs-enums.html#module_geos)  
**Returns**: [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) - A newly allocated geometry. NULL on exception. Caller is responsible for freeing with GEOSGeom_destroy().  

| Param | Type | Description |
| --- | --- | --- |
| g | [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) | The geometry to copy |


---
<a name="exp_module_geos--geos.GEOSGeom_clone_r"></a>

## geos.GEOSGeom\_clone\_r ⇒ [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) ⏏
Create a new copy of the input geometry.

**Kind**: global property of [<code>geos</code>](/typedefs-enums/typedefs-enums.html#module_geos)  
**Returns**: [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) - A newly allocated geometry. NULL on exception. Caller is responsible for freeing with GEOSGeom_destroy().  

| Param | Type | Description |
| --- | --- | --- |
| handle | [<code>GEOSContextHandle\_t</code>](/typedefs-enums/typedefs-enums.html#GEOSContextHandle_t) | - |
| g | [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) | The geometry to copy |


---
<a name="exp_module_geos--geos.GEOSGeom_createCircularString"></a>

## geos.GEOSGeom\_createCircularString ⇒ [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) ⏏
Creates a CircularString geometry.

**Kind**: global property of [<code>geos</code>](/typedefs-enums/typedefs-enums.html#module_geos)  
**Returns**: [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) - A newly allocated CircularString geometry. NULL on exception. Caller is responsible for freeing with GEOSGeom_destroy().  

| Param | Type | Description |
| --- | --- | --- |
| s | [<code>GEOSCoordSequence</code>](/typedefs-enums/typedefs-enums.html#GEOSCoordSequence) | Input coordinate sequence, ownership passes to the geometry |


---
<a name="exp_module_geos--geos.GEOSGeom_createCircularString_r"></a>

## geos.GEOSGeom\_createCircularString\_r ⇒ [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) ⏏
Creates a CircularString geometry.

**Kind**: global property of [<code>geos</code>](/typedefs-enums/typedefs-enums.html#module_geos)  
**Returns**: [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) - A newly allocated CircularString geometry. NULL on exception. Caller is responsible for freeing with GEOSGeom_destroy().  

| Param | Type | Description |
| --- | --- | --- |
| handle | [<code>GEOSContextHandle\_t</code>](/typedefs-enums/typedefs-enums.html#GEOSContextHandle_t) | - |
| s | [<code>GEOSCoordSequence</code>](/typedefs-enums/typedefs-enums.html#GEOSCoordSequence) | Input coordinate sequence, ownership passes to the geometry |


---
<a name="exp_module_geos--geos.GEOSGeom_createCollection"></a>

## geos.GEOSGeom\_createCollection ⇒ [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) ⏏
Create a geometry collection.

**Kind**: global property of [<code>geos</code>](/typedefs-enums/typedefs-enums.html#module_geos)  
**Returns**: [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) - A newly allocated geometry collection. NULL on exception. Caller is responsible for freeing with GEOSGeom_destroy().  

| Param | Type | Description |
| --- | --- | --- |
| type | <code>number</code> | The geometry type, enumerated by GEOSGeomTypes |
| geoms | [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) | A list of geometries that will form the collection |
| ngeoms | <code>number</code> | The number of geometries in the geoms list |


---
<a name="exp_module_geos--geos.GEOSGeom_createCollection_r"></a>

## geos.GEOSGeom\_createCollection\_r ⇒ [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) ⏏
Create a geometry collection.

**Kind**: global property of [<code>geos</code>](/typedefs-enums/typedefs-enums.html#module_geos)  
**Returns**: [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) - A newly allocated geometry collection. NULL on exception. Caller is responsible for freeing with GEOSGeom_destroy().  

| Param | Type | Description |
| --- | --- | --- |
| handle | [<code>GEOSContextHandle\_t</code>](/typedefs-enums/typedefs-enums.html#GEOSContextHandle_t) | - |
| type | <code>number</code> | The geometry type, enumerated by GEOSGeomTypes |
| geoms | [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) | A list of geometries that will form the collection |
| ngeoms | <code>number</code> | The number of geometries in the geoms list |


---
<a name="exp_module_geos--geos.GEOSGeom_createCompoundCurve"></a>

## geos.GEOSGeom\_createCompoundCurve ⇒ [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) ⏏
Creates a CompoundCurve geometry.

**Kind**: global property of [<code>geos</code>](/typedefs-enums/typedefs-enums.html#module_geos)  
**Returns**: [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) - A newly allocated CompoundCurve geometry. NULL on exception. Caller is responsible for freeing with GEOSGeom_destroy().  

| Param | Type | Description |
| --- | --- | --- |
| curves | [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) | A list of geometries that will form the CompoundCurve |
| ncurves | <code>number</code> | The number of geometries in the curves list |


---
<a name="exp_module_geos--geos.GEOSGeom_createCompoundCurve_r"></a>

## geos.GEOSGeom\_createCompoundCurve\_r ⇒ [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) ⏏
Creates a CompoundCurve geometry.

**Kind**: global property of [<code>geos</code>](/typedefs-enums/typedefs-enums.html#module_geos)  
**Returns**: [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) - A newly allocated CompoundCurve geometry. NULL on exception. Caller is responsible for freeing with GEOSGeom_destroy().  

| Param | Type | Description |
| --- | --- | --- |
| handle | [<code>GEOSContextHandle\_t</code>](/typedefs-enums/typedefs-enums.html#GEOSContextHandle_t) | - |
| curves | [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) | A list of geometries that will form the CompoundCurve |
| ncurves | <code>number</code> | The number of geometries in the curves list |


---
<a name="exp_module_geos--geos.GEOSGeom_createCurvePolygon"></a>

## geos.GEOSGeom\_createCurvePolygon ⇒ [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) ⏏
Creates a CurvePolygon geometry from ring geometries.

**Kind**: global property of [<code>geos</code>](/typedefs-enums/typedefs-enums.html#module_geos)  
**Returns**: [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) - A newly allocated geometry. NULL on exception. Caller is responsible for freeing with GEOSGeom_destroy().  

| Param | Type | Description |
| --- | --- | --- |
| shell | [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) | A ring that is the exterior ring of the polygon. |
| holes | [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) | An array of rings that are the holes. |
| nholes | <code>number</code> | The number of rings in the holes array. |


---
<a name="exp_module_geos--geos.GEOSGeom_createCurvePolygon_r"></a>

## geos.GEOSGeom\_createCurvePolygon\_r ⇒ [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) ⏏
Creates a CurvePolygon geometry from ring geometries.

**Kind**: global property of [<code>geos</code>](/typedefs-enums/typedefs-enums.html#module_geos)  
**Returns**: [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) - A newly allocated geometry. NULL on exception. Caller is responsible for freeing with GEOSGeom_destroy().  

| Param | Type | Description |
| --- | --- | --- |
| handle | [<code>GEOSContextHandle\_t</code>](/typedefs-enums/typedefs-enums.html#GEOSContextHandle_t) | - |
| shell | [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) | A ring that is the exterior ring of the polygon. |
| holes | [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) | An array of rings that are the holes. |
| nholes | <code>number</code> | The number of rings in the holes array. |


---
<a name="exp_module_geos--geos.GEOSGeom_createEmptyCircularString_r"></a>

## geos.GEOSGeom\_createEmptyCircularString\_r ⇒ [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) ⏏
Creates an empty CircularString geometry.

**Kind**: global property of [<code>geos</code>](/typedefs-enums/typedefs-enums.html#module_geos)  
**Returns**: [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) - A newly allocated CircularString geometry. NULL on exception. Caller is responsible for freeing with GEOSGeom_destroy().  

| Param | Type | Description |
| --- | --- | --- |
| handle | [<code>GEOSContextHandle\_t</code>](/typedefs-enums/typedefs-enums.html#GEOSContextHandle_t) | - |


---
<a name="exp_module_geos--geos.GEOSGeom_createEmptyCollection"></a>

## geos.GEOSGeom\_createEmptyCollection ⇒ [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) ⏏
Create an empty geometry collection.

**Kind**: global property of [<code>geos</code>](/typedefs-enums/typedefs-enums.html#module_geos)  
**Returns**: [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) - A newly allocated empty geometry collection. NULL on exception. Caller is responsible for freeing with GEOSGeom_destroy().  

| Param | Type | Description |
| --- | --- | --- |
| type | <code>number</code> | The geometry type, enumerated by GEOSGeomTypes |


---
<a name="exp_module_geos--geos.GEOSGeom_createEmptyCollection_r"></a>

## geos.GEOSGeom\_createEmptyCollection\_r ⇒ [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) ⏏
Create an empty geometry collection.

**Kind**: global property of [<code>geos</code>](/typedefs-enums/typedefs-enums.html#module_geos)  
**Returns**: [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) - A newly allocated empty geometry collection. NULL on exception. Caller is responsible for freeing with GEOSGeom_destroy().  

| Param | Type | Description |
| --- | --- | --- |
| handle | [<code>GEOSContextHandle\_t</code>](/typedefs-enums/typedefs-enums.html#GEOSContextHandle_t) | - |
| type | <code>number</code> | The geometry type, enumerated by GEOSGeomTypes |


---
<a name="exp_module_geos--geos.GEOSGeom_createEmptyCompoundCurve_r"></a>

## geos.GEOSGeom\_createEmptyCompoundCurve\_r ⇒ [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) ⏏
Creates an empty CompoundCurve geometry.

**Kind**: global property of [<code>geos</code>](/typedefs-enums/typedefs-enums.html#module_geos)  
**Returns**: [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) - A newly allocated CompoundCurve geometry. NULL on exception. Caller is responsible for freeing with GEOSGeom_destroy().  

| Param | Type | Description |
| --- | --- | --- |
| handle | [<code>GEOSContextHandle\_t</code>](/typedefs-enums/typedefs-enums.html#GEOSContextHandle_t) | - |


---
<a name="exp_module_geos--geos.GEOSGeom_createEmptyCurvePolygon_r"></a>

## geos.GEOSGeom\_createEmptyCurvePolygon\_r ⇒ [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) ⏏
Creates an empty CurvePolygon geometry.

**Kind**: global property of [<code>geos</code>](/typedefs-enums/typedefs-enums.html#module_geos)  
**Returns**: [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) - A newly allocated CurvePolygon geometry. NULL on exception. Caller is responsible for freeing with GEOSGeom_destroy().  

| Param | Type | Description |
| --- | --- | --- |
| handle | [<code>GEOSContextHandle\_t</code>](/typedefs-enums/typedefs-enums.html#GEOSContextHandle_t) | - |


---
<a name="exp_module_geos--geos.GEOSGeom_createEmptyLineString_r"></a>

## geos.GEOSGeom\_createEmptyLineString\_r ⇒ [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) ⏏
Creates an emptylinestring geometry.

**Kind**: global property of [<code>geos</code>](/typedefs-enums/typedefs-enums.html#module_geos)  
**Returns**: [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) - A newly allocated linestring geometry. NULL on exception. Caller is responsible for freeing with GEOSGeom_destroy().  

| Param | Type | Description |
| --- | --- | --- |
| handle | [<code>GEOSContextHandle\_t</code>](/typedefs-enums/typedefs-enums.html#GEOSContextHandle_t) | - |


---
<a name="exp_module_geos--geos.GEOSGeom_createEmptyPoint_r"></a>

## geos.GEOSGeom\_createEmptyPoint\_r ⇒ [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) ⏏
Creates an empty point.

**Kind**: global property of [<code>geos</code>](/typedefs-enums/typedefs-enums.html#module_geos)  
**Returns**: [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) - A newly allocated empty point geometry. NULL on exception. Caller is responsible for freeing with GEOSGeom_destroy().  

| Param | Type | Description |
| --- | --- | --- |
| handle | [<code>GEOSContextHandle\_t</code>](/typedefs-enums/typedefs-enums.html#GEOSContextHandle_t) | - |


---
<a name="exp_module_geos--geos.GEOSGeom_createEmptyPolygon_r"></a>

## geos.GEOSGeom\_createEmptyPolygon\_r ⇒ [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) ⏏
Creates an empty polygon geometry.

**Kind**: global property of [<code>geos</code>](/typedefs-enums/typedefs-enums.html#module_geos)  
**Returns**: [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) - A newly allocated empty polygon geometry. NULL on exception. Caller is responsible for freeing with GEOSGeom_destroy().  

| Param | Type | Description |
| --- | --- | --- |
| handle | [<code>GEOSContextHandle\_t</code>](/typedefs-enums/typedefs-enums.html#GEOSContextHandle_t) | - |


---
<a name="exp_module_geos--geos.GEOSGeom_createLineString"></a>

## geos.GEOSGeom\_createLineString ⇒ [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) ⏏
Creates a linestring geometry.

**Kind**: global property of [<code>geos</code>](/typedefs-enums/typedefs-enums.html#module_geos)  
**Returns**: [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) - A newly allocated linestring geometry. NULL on exception. Caller is responsible for freeing with GEOSGeom_destroy().  

| Param | Type | Description |
| --- | --- | --- |
| s | [<code>GEOSCoordSequence</code>](/typedefs-enums/typedefs-enums.html#GEOSCoordSequence) | Input coordinate sequence, ownership passes to the geometry |


---
<a name="exp_module_geos--geos.GEOSGeom_createLineString_r"></a>

## geos.GEOSGeom\_createLineString\_r ⇒ [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) ⏏
Creates a linestring geometry.

**Kind**: global property of [<code>geos</code>](/typedefs-enums/typedefs-enums.html#module_geos)  
**Returns**: [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) - A newly allocated linestring geometry. NULL on exception. Caller is responsible for freeing with GEOSGeom_destroy().  

| Param | Type | Description |
| --- | --- | --- |
| handle | [<code>GEOSContextHandle\_t</code>](/typedefs-enums/typedefs-enums.html#GEOSContextHandle_t) | - |
| s | [<code>GEOSCoordSequence</code>](/typedefs-enums/typedefs-enums.html#GEOSCoordSequence) | Input coordinate sequence, ownership passes to the geometry |


---
<a name="exp_module_geos--geos.GEOSGeom_createLinearRing"></a>

## geos.GEOSGeom\_createLinearRing ⇒ [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) ⏏
Creates a linear ring geometry, for use in a polygon.

**Kind**: global property of [<code>geos</code>](/typedefs-enums/typedefs-enums.html#module_geos)  
**Returns**: [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) - A newly allocated linear ring geometry. NULL on exception. Caller is responsible for freeing with GEOSGeom_destroy().  

| Param | Type | Description |
| --- | --- | --- |
| s | [<code>GEOSCoordSequence</code>](/typedefs-enums/typedefs-enums.html#GEOSCoordSequence) | Input coordinate sequence, ownership passes to the geometry |


---
<a name="exp_module_geos--geos.GEOSGeom_createLinearRing_r"></a>

## geos.GEOSGeom\_createLinearRing\_r ⇒ [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) ⏏
Creates a linear ring geometry, for use in a polygon.

**Kind**: global property of [<code>geos</code>](/typedefs-enums/typedefs-enums.html#module_geos)  
**Returns**: [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) - A newly allocated linear ring geometry. NULL on exception. Caller is responsible for freeing with GEOSGeom_destroy().  

| Param | Type | Description |
| --- | --- | --- |
| handle | [<code>GEOSContextHandle\_t</code>](/typedefs-enums/typedefs-enums.html#GEOSContextHandle_t) | - |
| s | [<code>GEOSCoordSequence</code>](/typedefs-enums/typedefs-enums.html#GEOSCoordSequence) | Input coordinate sequence, ownership passes to the geometry |


---
<a name="exp_module_geos--geos.GEOSGeom_createPoint"></a>

## geos.GEOSGeom\_createPoint ⇒ [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) ⏏
Creates a point geometry from a coordinate sequence.

**Kind**: global property of [<code>geos</code>](/typedefs-enums/typedefs-enums.html#module_geos)  
**Returns**: [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) - A newly allocated point geometry. NULL on exception. Caller is responsible for freeing with GEOSGeom_destroy().  

| Param | Type | Description |
| --- | --- | --- |
| s | [<code>GEOSCoordSequence</code>](/typedefs-enums/typedefs-enums.html#GEOSCoordSequence) | Input coordinate sequence, ownership passes to the geometry |


---
<a name="exp_module_geos--geos.GEOSGeom_createPointFromXY"></a>

## geos.GEOSGeom\_createPointFromXY ⇒ [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) ⏏
Creates a point geometry from a pair of coordinates.

**Kind**: global property of [<code>geos</code>](/typedefs-enums/typedefs-enums.html#module_geos)  
**Returns**: [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) - A newly allocated point geometry. NULL on exception. Caller is responsible for freeing with GEOSGeom_destroy().  

| Param | Type | Description |
| --- | --- | --- |
| x | <code>number</code> | The X coordinate |
| y | <code>number</code> | The Y coordinate |


---
<a name="exp_module_geos--geos.GEOSGeom_createPointFromXY_r"></a>

## geos.GEOSGeom\_createPointFromXY\_r ⇒ [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) ⏏
Creates a point geometry from a pair of coordinates.

**Kind**: global property of [<code>geos</code>](/typedefs-enums/typedefs-enums.html#module_geos)  
**Returns**: [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) - A newly allocated point geometry. NULL on exception. Caller is responsible for freeing with GEOSGeom_destroy().  

| Param | Type | Description |
| --- | --- | --- |
| handle | [<code>GEOSContextHandle\_t</code>](/typedefs-enums/typedefs-enums.html#GEOSContextHandle_t) | - |
| x | <code>number</code> | The X coordinate |
| y | <code>number</code> | The Y coordinate |


---
<a name="exp_module_geos--geos.GEOSGeom_createPoint_r"></a>

## geos.GEOSGeom\_createPoint\_r ⇒ [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) ⏏
Creates a point geometry from a coordinate sequence.

**Kind**: global property of [<code>geos</code>](/typedefs-enums/typedefs-enums.html#module_geos)  
**Returns**: [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) - A newly allocated point geometry. NULL on exception. Caller is responsible for freeing with GEOSGeom_destroy().  

| Param | Type | Description |
| --- | --- | --- |
| handle | [<code>GEOSContextHandle\_t</code>](/typedefs-enums/typedefs-enums.html#GEOSContextHandle_t) | - |
| s | [<code>GEOSCoordSequence</code>](/typedefs-enums/typedefs-enums.html#GEOSCoordSequence) | Input coordinate sequence, ownership passes to the geometry |


---
<a name="exp_module_geos--geos.GEOSGeom_createPolygon"></a>

## geos.GEOSGeom\_createPolygon ⇒ [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) ⏏
Creates a polygon geometry from linear ring geometries.

**Kind**: global property of [<code>geos</code>](/typedefs-enums/typedefs-enums.html#module_geos)  
**Returns**: [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) - A newly allocated geometry. NULL on exception. Caller is responsible for freeing with GEOSGeom_destroy().  

| Param | Type | Description |
| --- | --- | --- |
| shell | [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) | A linear ring that is the exterior ring of the polygon. |
| holes | [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) | An array of linear rings that are the holes. |
| nholes | <code>number</code> | The number of rings in the holes array. |


---
<a name="exp_module_geos--geos.GEOSGeom_createPolygon_r"></a>

## geos.GEOSGeom\_createPolygon\_r ⇒ [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) ⏏
Creates a polygon geometry from linear ring geometries.

**Kind**: global property of [<code>geos</code>](/typedefs-enums/typedefs-enums.html#module_geos)  
**Returns**: [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) - A newly allocated geometry. NULL on exception. Caller is responsible for freeing with GEOSGeom_destroy().  

| Param | Type | Description |
| --- | --- | --- |
| handle | [<code>GEOSContextHandle\_t</code>](/typedefs-enums/typedefs-enums.html#GEOSContextHandle_t) | - |
| shell | [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) | A linear ring that is the exterior ring of the polygon. |
| holes | [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) | An array of linear rings that are the holes. |
| nholes | <code>number</code> | The number of rings in the holes array. |


---
<a name="exp_module_geos--geos.GEOSGeom_createRectangle"></a>

## geos.GEOSGeom\_createRectangle ⇒ [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) ⏏
Create a rectangular polygon from bounding coordinates. Will return a point geometry if width and height are 0.

**Kind**: global property of [<code>geos</code>](/typedefs-enums/typedefs-enums.html#module_geos)  
**Returns**: [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) - GEOSGeometry*  

| Param | Type | Description |
| --- | --- | --- |
| xmin | <code>number</code> | Left bound of envelope |
| ymin | <code>number</code> | Lower bound of envelope |
| xmax | <code>number</code> | Right bound of envelope |
| ymax | <code>number</code> | Upper bound of envelope |


---
<a name="exp_module_geos--geos.GEOSGeom_createRectangle_r"></a>

## geos.GEOSGeom\_createRectangle\_r ⇒ [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) ⏏
Create a rectangular polygon from bounding coordinates. Will return a point geometry if width and height are 0.

**Kind**: global property of [<code>geos</code>](/typedefs-enums/typedefs-enums.html#module_geos)  
**Returns**: [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) - GEOSGeometry*  

| Param | Type | Description |
| --- | --- | --- |
| handle | [<code>GEOSContextHandle\_t</code>](/typedefs-enums/typedefs-enums.html#GEOSContextHandle_t) | - |
| xmin | <code>number</code> | Left bound of envelope |
| ymin | <code>number</code> | Lower bound of envelope |
| xmax | <code>number</code> | Right bound of envelope |
| ymax | <code>number</code> | Upper bound of envelope |


---
<a name="exp_module_geos--geos.GEOSGeom_destroy"></a>

## geos.GEOSGeom\_destroy ⇒ <code>null</code> ⏏
Release the memory associated with a geometry.

**Kind**: global property of [<code>geos</code>](/typedefs-enums/typedefs-enums.html#module_geos)  
**Returns**: <code>null</code> - void  

| Param | Type | Description |
| --- | --- | --- |
| g | [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) | The geometry to be destroyed. |


---
<a name="exp_module_geos--geos.GEOSGeom_destroy_r"></a>

## geos.GEOSGeom\_destroy\_r ⇒ <code>null</code> ⏏
Release the memory associated with a geometry.

**Kind**: global property of [<code>geos</code>](/typedefs-enums/typedefs-enums.html#module_geos)  
**Returns**: <code>null</code> - void  

| Param | Type | Description |
| --- | --- | --- |
| handle | [<code>GEOSContextHandle\_t</code>](/typedefs-enums/typedefs-enums.html#GEOSContextHandle_t) | - |
| g | [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) | The geometry to be destroyed. |


---
<a name="exp_module_geos--geos.GEOSGeom_extractUniquePoints"></a>

## geos.GEOSGeom\_extractUniquePoints ⇒ [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) ⏏
Return all distinct vertices of input geometry as a MultiPoint. Note that only 2 dimensions of the vertices are considered when testing for equality.

**Kind**: global property of [<code>geos</code>](/typedefs-enums/typedefs-enums.html#module_geos)  
**Returns**: [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) - The distinct points Caller is responsible for freeing with GEOSGeom_destroy().  

| Param | Type | Description |
| --- | --- | --- |
| g | [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) | The input geometry |


---
<a name="exp_module_geos--geos.GEOSGeom_extractUniquePoints_r"></a>

## geos.GEOSGeom\_extractUniquePoints\_r ⇒ [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) ⏏
Return all distinct vertices of input geometry as a MultiPoint. Note that only 2 dimensions of the vertices are considered when testing for equality.

**Kind**: global property of [<code>geos</code>](/typedefs-enums/typedefs-enums.html#module_geos)  
**Returns**: [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) - The distinct points Caller is responsible for freeing with GEOSGeom_destroy().  

| Param | Type | Description |
| --- | --- | --- |
| handle | [<code>GEOSContextHandle\_t</code>](/typedefs-enums/typedefs-enums.html#GEOSContextHandle_t) | - |
| g | [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) | The input geometry |


---
<a name="exp_module_geos--geos.GEOSGeom_getCoordSeq"></a>

## geos.GEOSGeom\_getCoordSeq ⇒ <code>number</code> ⏏
Return the coordinate sequence underlying the given geometry (Must be a LineString, LinearRing or Point). Do not directly free the coordinate sequence, it is owned by the parent geometry.

**Kind**: global property of [<code>geos</code>](/typedefs-enums/typedefs-enums.html#module_geos)  
**Returns**: <code>number</code> - Coordinate sequence or NULL on exception.  

| Param | Type | Description |
| --- | --- | --- |
| g | [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) | Input geometry |


---
<a name="exp_module_geos--geos.GEOSGeom_getCoordSeq_r"></a>

## geos.GEOSGeom\_getCoordSeq\_r ⇒ <code>number</code> ⏏
Return the coordinate sequence underlying the given geometry (Must be a LineString, LinearRing or Point). Do not directly free the coordinate sequence, it is owned by the parent geometry.

**Kind**: global property of [<code>geos</code>](/typedefs-enums/typedefs-enums.html#module_geos)  
**Returns**: <code>number</code> - Coordinate sequence or NULL on exception.  

| Param | Type | Description |
| --- | --- | --- |
| handle | [<code>GEOSContextHandle\_t</code>](/typedefs-enums/typedefs-enums.html#GEOSContextHandle_t) | - |
| g | [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) | Input geometry |


---
<a name="exp_module_geos--geos.GEOSGeom_getCoordinateDimension"></a>

## geos.GEOSGeom\_getCoordinateDimension ⇒ <code>number</code> ⏏
Return the cartesian dimension of the geometry.

**Kind**: global property of [<code>geos</code>](/typedefs-enums/typedefs-enums.html#module_geos)  
**Returns**: <code>number</code> - The dimension  

| Param | Type | Description |
| --- | --- | --- |
| g | [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) | Input geometry |


---
<a name="exp_module_geos--geos.GEOSGeom_getCoordinateDimension_r"></a>

## geos.GEOSGeom\_getCoordinateDimension\_r ⇒ <code>number</code> ⏏
Return the cartesian dimension of the geometry.

**Kind**: global property of [<code>geos</code>](/typedefs-enums/typedefs-enums.html#module_geos)  
**Returns**: <code>number</code> - The dimension  

| Param | Type | Description |
| --- | --- | --- |
| handle | [<code>GEOSContextHandle\_t</code>](/typedefs-enums/typedefs-enums.html#GEOSContextHandle_t) | - |
| g | [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) | Input geometry |


---
<a name="exp_module_geos--geos.GEOSGeom_getDimensions"></a>

## geos.GEOSGeom\_getDimensions ⇒ <code>number</code> ⏏
Return the planar dimensionality of the geometry.

**Kind**: global property of [<code>geos</code>](/typedefs-enums/typedefs-enums.html#module_geos)  
**Returns**: <code>number</code> - The dimensionality  

| Param | Type | Description |
| --- | --- | --- |
| g | [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) | Input geometry |


---
<a name="exp_module_geos--geos.GEOSGeom_getDimensions_r"></a>

## geos.GEOSGeom\_getDimensions\_r ⇒ <code>number</code> ⏏
Return the planar dimensionality of the geometry.

**Kind**: global property of [<code>geos</code>](/typedefs-enums/typedefs-enums.html#module_geos)  
**Returns**: <code>number</code> - The dimensionality  

| Param | Type | Description |
| --- | --- | --- |
| handle | [<code>GEOSContextHandle\_t</code>](/typedefs-enums/typedefs-enums.html#GEOSContextHandle_t) | - |
| g | [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) | Input geometry |


---
<a name="exp_module_geos--geos.GEOSGeom_getExtent"></a>

## geos.GEOSGeom\_getExtent ⇒ <code>number</code> ⏏
Finds the extent (minimum and maximum X and Y value) of the geometry. Raises an exception for empty geometry input.

**Kind**: global property of [<code>geos</code>](/typedefs-enums/typedefs-enums.html#module_geos)  
**Returns**: <code>number</code> - 1 on success, 0 on exception  

| Param | Type | Description |
| --- | --- | --- |
| g | [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) | Input geometry |
| xmin | [<code>NumberPointer</code>](/typedefs-enums/typedefs-enums.html#NumberPointer) | Pointer to place result for minimum X value |
| ymin | [<code>NumberPointer</code>](/typedefs-enums/typedefs-enums.html#NumberPointer) | Pointer to place result for minimum Y value |
| xmax | [<code>NumberPointer</code>](/typedefs-enums/typedefs-enums.html#NumberPointer) | Pointer to place result for maximum X value |
| ymax | [<code>NumberPointer</code>](/typedefs-enums/typedefs-enums.html#NumberPointer) | Pointer to place result for maximum Y value |


---
<a name="exp_module_geos--geos.GEOSGeom_getExtent_r"></a>

## geos.GEOSGeom\_getExtent\_r ⇒ <code>number</code> ⏏
Finds the extent (minimum and maximum X and Y value) of the geometry. Raises an exception for empty geometry input.

**Kind**: global property of [<code>geos</code>](/typedefs-enums/typedefs-enums.html#module_geos)  
**Returns**: <code>number</code> - 1 on success, 0 on exception  

| Param | Type | Description |
| --- | --- | --- |
| handle | [<code>GEOSContextHandle\_t</code>](/typedefs-enums/typedefs-enums.html#GEOSContextHandle_t) | - |
| g | [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) | Input geometry |
| xmin | [<code>NumberPointer</code>](/typedefs-enums/typedefs-enums.html#NumberPointer) | Pointer to place result for minimum X value |
| ymin | [<code>NumberPointer</code>](/typedefs-enums/typedefs-enums.html#NumberPointer) | Pointer to place result for minimum Y value |
| xmax | [<code>NumberPointer</code>](/typedefs-enums/typedefs-enums.html#NumberPointer) | Pointer to place result for maximum X value |
| ymax | [<code>NumberPointer</code>](/typedefs-enums/typedefs-enums.html#NumberPointer) | Pointer to place result for maximum Y value |


---
<a name="exp_module_geos--geos.GEOSGeom_getPrecision"></a>

## geos.GEOSGeom\_getPrecision ⇒ <code>number</code> ⏏
Read the currently set precision value from the geometry and returns the grid size if it is a fixed precision or 0.0 if it is full floating point precision.

**Kind**: global property of [<code>geos</code>](/typedefs-enums/typedefs-enums.html#module_geos)  
**Returns**: <code>number</code> - The grid size, or -1 on exception  

| Param | Type | Description |
| --- | --- | --- |
| g | [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) | Input geometry |


---
<a name="exp_module_geos--geos.GEOSGeom_getPrecision_r"></a>

## geos.GEOSGeom\_getPrecision\_r ⇒ <code>number</code> ⏏
Read the currently set precision value from the geometry and returns the grid size if it is a fixed precision or 0.0 if it is full floating point precision.

**Kind**: global property of [<code>geos</code>](/typedefs-enums/typedefs-enums.html#module_geos)  
**Returns**: <code>number</code> - The grid size, or -1 on exception  

| Param | Type | Description |
| --- | --- | --- |
| handle | [<code>GEOSContextHandle\_t</code>](/typedefs-enums/typedefs-enums.html#GEOSContextHandle_t) | - |
| g | [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) | Input geometry |


---
<a name="exp_module_geos--geos.GEOSGeom_getUserData"></a>

## geos.GEOSGeom\_getUserData ⇒ [<code>Pointer</code>](/typedefs-enums/typedefs-enums.html#Pointer) ⏏
Return the anonymous "user data" for this geometry. User data must be managed by the caller, and is not freed when the geometry is destroyed.

**Kind**: global property of [<code>geos</code>](/typedefs-enums/typedefs-enums.html#module_geos)  
**Returns**: [<code>Pointer</code>](/typedefs-enums/typedefs-enums.html#Pointer) - A void* to the user data, caller is responsible for casting to the appropriate type.  

| Param | Type | Description |
| --- | --- | --- |
| g | [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) | Input geometry |


---
<a name="exp_module_geos--geos.GEOSGeom_getUserData_r"></a>

## geos.GEOSGeom\_getUserData\_r ⇒ [<code>Pointer</code>](/typedefs-enums/typedefs-enums.html#Pointer) ⏏
Return the anonymous "user data" for this geometry. User data must be managed by the caller, and is not freed when the geometry is destroyed.

**Kind**: global property of [<code>geos</code>](/typedefs-enums/typedefs-enums.html#module_geos)  
**Returns**: [<code>Pointer</code>](/typedefs-enums/typedefs-enums.html#Pointer) - A void* to the user data, caller is responsible for casting to the appropriate type.  

| Param | Type | Description |
| --- | --- | --- |
| handle | [<code>GEOSContextHandle\_t</code>](/typedefs-enums/typedefs-enums.html#GEOSContextHandle_t) | - |
| g | [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) | Input geometry |


---
<a name="exp_module_geos--geos.GEOSGeom_getXMax"></a>

## geos.GEOSGeom\_getXMax ⇒ <code>number</code> ⏏
Finds the maximum X value in the geometry.

**Kind**: global property of [<code>geos</code>](/typedefs-enums/typedefs-enums.html#module_geos)  
**Returns**: <code>number</code> - 0 on exception  

| Param | Type | Description |
| --- | --- | --- |
| g | [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) | Input geometry |
| value | [<code>NumberPointer</code>](/typedefs-enums/typedefs-enums.html#NumberPointer) | Pointer to place result |


---
<a name="exp_module_geos--geos.GEOSGeom_getXMax_r"></a>

## geos.GEOSGeom\_getXMax\_r ⇒ <code>number</code> ⏏
Finds the maximum X value in the geometry.

**Kind**: global property of [<code>geos</code>](/typedefs-enums/typedefs-enums.html#module_geos)  
**Returns**: <code>number</code> - 0 on exception  

| Param | Type | Description |
| --- | --- | --- |
| handle | [<code>GEOSContextHandle\_t</code>](/typedefs-enums/typedefs-enums.html#GEOSContextHandle_t) | - |
| g | [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) | Input geometry |
| value | [<code>NumberPointer</code>](/typedefs-enums/typedefs-enums.html#NumberPointer) | Pointer to place result |


---
<a name="exp_module_geos--geos.GEOSGeom_getXMin"></a>

## geos.GEOSGeom\_getXMin ⇒ <code>number</code> ⏏
Finds the minimum X value in the geometry.

**Kind**: global property of [<code>geos</code>](/typedefs-enums/typedefs-enums.html#module_geos)  
**Returns**: <code>number</code> - 0 on exception  

| Param | Type | Description |
| --- | --- | --- |
| g | [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) | Input geometry |
| value | [<code>NumberPointer</code>](/typedefs-enums/typedefs-enums.html#NumberPointer) | Pointer to place result |


---
<a name="exp_module_geos--geos.GEOSGeom_getXMin_r"></a>

## geos.GEOSGeom\_getXMin\_r ⇒ <code>number</code> ⏏
Finds the minimum X value in the geometry.

**Kind**: global property of [<code>geos</code>](/typedefs-enums/typedefs-enums.html#module_geos)  
**Returns**: <code>number</code> - 0 on exception  

| Param | Type | Description |
| --- | --- | --- |
| handle | [<code>GEOSContextHandle\_t</code>](/typedefs-enums/typedefs-enums.html#GEOSContextHandle_t) | - |
| g | [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) | Input geometry |
| value | [<code>NumberPointer</code>](/typedefs-enums/typedefs-enums.html#NumberPointer) | Pointer to place result |


---
<a name="exp_module_geos--geos.GEOSGeom_getYMax"></a>

## geos.GEOSGeom\_getYMax ⇒ <code>number</code> ⏏
Finds the maximum Y value in the geometry.

**Kind**: global property of [<code>geos</code>](/typedefs-enums/typedefs-enums.html#module_geos)  
**Returns**: <code>number</code> - 0 on exception  

| Param | Type | Description |
| --- | --- | --- |
| g | [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) | Input geometry |
| value | [<code>NumberPointer</code>](/typedefs-enums/typedefs-enums.html#NumberPointer) | Pointer to place result |


---
<a name="exp_module_geos--geos.GEOSGeom_getYMax_r"></a>

## geos.GEOSGeom\_getYMax\_r ⇒ <code>number</code> ⏏
Finds the maximum Y value in the geometry.

**Kind**: global property of [<code>geos</code>](/typedefs-enums/typedefs-enums.html#module_geos)  
**Returns**: <code>number</code> - 0 on exception  

| Param | Type | Description |
| --- | --- | --- |
| handle | [<code>GEOSContextHandle\_t</code>](/typedefs-enums/typedefs-enums.html#GEOSContextHandle_t) | - |
| g | [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) | Input geometry |
| value | [<code>NumberPointer</code>](/typedefs-enums/typedefs-enums.html#NumberPointer) | Pointer to place result |


---
<a name="exp_module_geos--geos.GEOSGeom_getYMin"></a>

## geos.GEOSGeom\_getYMin ⇒ <code>number</code> ⏏
Finds the minimum Y value in the geometry.

**Kind**: global property of [<code>geos</code>](/typedefs-enums/typedefs-enums.html#module_geos)  
**Returns**: <code>number</code> - 0 on exception  

| Param | Type | Description |
| --- | --- | --- |
| g | [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) | Input geometry |
| value | [<code>NumberPointer</code>](/typedefs-enums/typedefs-enums.html#NumberPointer) | Pointer to place result |


---
<a name="exp_module_geos--geos.GEOSGeom_getYMin_r"></a>

## geos.GEOSGeom\_getYMin\_r ⇒ <code>number</code> ⏏
Finds the minimum Y value in the geometry.

**Kind**: global property of [<code>geos</code>](/typedefs-enums/typedefs-enums.html#module_geos)  
**Returns**: <code>number</code> - 0 on exception  

| Param | Type | Description |
| --- | --- | --- |
| handle | [<code>GEOSContextHandle\_t</code>](/typedefs-enums/typedefs-enums.html#GEOSContextHandle_t) | - |
| g | [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) | Input geometry |
| value | [<code>NumberPointer</code>](/typedefs-enums/typedefs-enums.html#NumberPointer) | Pointer to place result |


---
<a name="exp_module_geos--geos.GEOSGeom_releaseCollection"></a>

## geos.GEOSGeom\_releaseCollection ⇒ [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) ⏏
Release the sub-geometries of a collection for management. by the caller. The input collection remains as an empty collection, that the caller is responsible for destroying. The output geometries are also the responsibility of the caller, as is the containing array, which must be freed with GEOSFree().

**Kind**: global property of [<code>geos</code>](/typedefs-enums/typedefs-enums.html#module_geos)  
**Returns**: [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) - A newly allocated array of GEOSGeometry pointers.  

| Param | Type | Description |
| --- | --- | --- |
| collection | [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) | The collection that will have its components released. |
| ngeoms | [<code>NumberPointer</code>](/typedefs-enums/typedefs-enums.html#NumberPointer) | A pointer to a variable that will be filled with the size of the output array. |


---
<a name="exp_module_geos--geos.GEOSGeom_releaseCollection_r"></a>

## geos.GEOSGeom\_releaseCollection\_r ⇒ [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) ⏏
Release the sub-geometries of a collection for management. by the caller. The input collection remains as an empty collection, that the caller is responsible for destroying. The output geometries are also the responsibility of the caller, as is the containing array, which must be freed with GEOSFree().

**Kind**: global property of [<code>geos</code>](/typedefs-enums/typedefs-enums.html#module_geos)  
**Returns**: [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) - A newly allocated array of GEOSGeometry pointers.  

| Param | Type | Description |
| --- | --- | --- |
| handle | [<code>GEOSContextHandle\_t</code>](/typedefs-enums/typedefs-enums.html#GEOSContextHandle_t) | - |
| collection | [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) | The collection that will have its components released. |
| ngeoms | [<code>NumberPointer</code>](/typedefs-enums/typedefs-enums.html#NumberPointer) | A pointer to a variable that will be filled with the size of the output array. |


---
<a name="exp_module_geos--geos.GEOSGeom_setPrecision"></a>

## geos.GEOSGeom\_setPrecision ⇒ [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) ⏏
Change the coordinate precision of a geometry. This will affect the precision of the existing geometry as well as any geometries derived from this geometry using overlay functions. The output will be a valid GEOSGeometry.

**Kind**: global property of [<code>geos</code>](/typedefs-enums/typedefs-enums.html#module_geos)  
**Returns**: [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) - The precision reduced result. Caller must free with GEOSGeom_destroy() NULL on exception.  

| Param | Type | Description |
| --- | --- | --- |
| g | [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) | Input geometry |
| gridSize | <code>number</code> | cell size of grid to round coordinates to, or 0 for FLOATING precision |
| flags | <code>number</code> | The bitwise OR of members of the GEOSPrecisionRules enum |


---
<a name="exp_module_geos--geos.GEOSGeom_setPrecision_r"></a>

## geos.GEOSGeom\_setPrecision\_r ⇒ [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) ⏏
Change the coordinate precision of a geometry. This will affect the precision of the existing geometry as well as any geometries derived from this geometry using overlay functions. The output will be a valid GEOSGeometry.

**Kind**: global property of [<code>geos</code>](/typedefs-enums/typedefs-enums.html#module_geos)  
**Returns**: [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) - The precision reduced result. Caller must free with GEOSGeom_destroy() NULL on exception.  

| Param | Type | Description |
| --- | --- | --- |
| handle | [<code>GEOSContextHandle\_t</code>](/typedefs-enums/typedefs-enums.html#GEOSContextHandle_t) | - |
| g | [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) | Input geometry |
| gridSize | <code>number</code> | cell size of grid to round coordinates to, or 0 for FLOATING precision |
| flags | <code>number</code> | The bitwise OR of members of the GEOSPrecisionRules enum |


---
<a name="exp_module_geos--geos.GEOSGeom_setUserData"></a>

## geos.GEOSGeom\_setUserData ⇒ <code>null</code> ⏏
Set the anonymous "user data" for this geometry.

**Kind**: global property of [<code>geos</code>](/typedefs-enums/typedefs-enums.html#module_geos)  
**Returns**: <code>null</code> - void  

| Param | Type | Description |
| --- | --- | --- |
| g | [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) | Input geometry |
| userData | [<code>Pointer</code>](/typedefs-enums/typedefs-enums.html#Pointer) | Void pointer to user data |


---
<a name="exp_module_geos--geos.GEOSGeom_setUserData_r"></a>

## geos.GEOSGeom\_setUserData\_r ⇒ <code>null</code> ⏏
Set the anonymous "user data" for this geometry.

**Kind**: global property of [<code>geos</code>](/typedefs-enums/typedefs-enums.html#module_geos)  
**Returns**: <code>null</code> - void  

| Param | Type | Description |
| --- | --- | --- |
| handle | [<code>GEOSContextHandle\_t</code>](/typedefs-enums/typedefs-enums.html#GEOSContextHandle_t) | - |
| g | [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) | Input geometry |
| userData | [<code>Pointer</code>](/typedefs-enums/typedefs-enums.html#Pointer) | Void pointer to user data |


---
<a name="exp_module_geos--geos.GEOSGeom_transformXY"></a>

## geos.GEOSGeom\_transformXY ⇒ [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) ⏏
Apply XY coordinate transform callback to all coordinates in a copy of input geometry. If the callback returns an error, returned geometry will be NULL. Z and M values, if present, are not modified by this function.

**Kind**: global property of [<code>geos</code>](/typedefs-enums/typedefs-enums.html#module_geos)  
**Returns**: [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) - a copy of the input geometry with transformed coordinates. Caller must free with GEOSGeom_destroy().  

| Param | Type | Description |
| --- | --- | --- |
| g | [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) | Input geometry |
| callback | [<code>GEOSTransformXYCallback</code>](/typedefs-enums/typedefs-enums.html#GEOSTransformXYCallback) | a function to be executed for each coordinate in the geometry. The callback takes 3 parameters: x and y coordinate values to be updated and a void userdata pointer. |
| userdata | [<code>Pointer</code>](/typedefs-enums/typedefs-enums.html#Pointer) | an optional pointer to pe passed to 'callback' as an argument |


---
<a name="exp_module_geos--geos.GEOSGeom_transformXY_r"></a>

## geos.GEOSGeom\_transformXY\_r ⇒ [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) ⏏
Apply XY coordinate transform callback to all coordinates in a copy of input geometry. If the callback returns an error, returned geometry will be NULL. Z and M values, if present, are not modified by this function.

**Kind**: global property of [<code>geos</code>](/typedefs-enums/typedefs-enums.html#module_geos)  
**Returns**: [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) - a copy of the input geometry with transformed coordinates. Caller must free with GEOSGeom_destroy().  

| Param | Type | Description |
| --- | --- | --- |
| handle | [<code>GEOSContextHandle\_t</code>](/typedefs-enums/typedefs-enums.html#GEOSContextHandle_t) | - |
| g | [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) | Input geometry |
| callback | [<code>GEOSTransformXYCallback</code>](/typedefs-enums/typedefs-enums.html#GEOSTransformXYCallback) | a function to be executed for each coordinate in the geometry. The callback takes 3 parameters: x and y coordinate values to be updated and a void userdata pointer. |
| userdata | [<code>Pointer</code>](/typedefs-enums/typedefs-enums.html#Pointer) | an optional pointer to pe passed to 'callback' as an argument |


---
