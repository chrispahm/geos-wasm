<a name="exp_module_geos--geos.GEOSPrepare"></a>

## geos.GEOSPrepare ⇒ <code>number</code> ⏏
Create a Prepared Geometry. The caller retains ownership of the base geometry, and after processing is complete, must free both the prepared and the base geometry. (Ideally, destroy the prepared geometry first, as it has an internal reference to the base geometry.)

**Kind**: global property of [<code>geos</code>](/typedefs-enums/typedefs-enums.html#module_geos)  
**Returns**: <code>number</code> - A prepared geometry. Caller is responsible for freeing with GEOSPreparedGeom_destroy()  

| Param | Type | Description |
| --- | --- | --- |
| g | [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) | The base geometry to wrap in a prepared geometry. |


---
<a name="exp_module_geos--geos.GEOSPrepare_r"></a>

## geos.GEOSPrepare\_r ⇒ <code>number</code> ⏏
Create a Prepared Geometry. The caller retains ownership of the base geometry, and after processing is complete, must free both the prepared and the base geometry. (Ideally, destroy the prepared geometry first, as it has an internal reference to the base geometry.)

**Kind**: global property of [<code>geos</code>](/typedefs-enums/typedefs-enums.html#module_geos)  
**Returns**: <code>number</code> - A prepared geometry. Caller is responsible for freeing with GEOSPreparedGeom_destroy()  

| Param | Type | Description |
| --- | --- | --- |
| handle | [<code>GEOSContextHandle\_t</code>](/typedefs-enums/typedefs-enums.html#GEOSContextHandle_t) | - |
| g | [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) | The base geometry to wrap in a prepared geometry. |


---
<a name="exp_module_geos--geos.GEOSPreparedContains"></a>

## geos.GEOSPreparedContains ⇒ <code>number</code> ⏏
Use a GEOSPreparedGeometry do a high performance calculation of whether the provided geometry is contained.

**Kind**: global property of [<code>geos</code>](/typedefs-enums/typedefs-enums.html#module_geos)  
**Returns**: <code>number</code> - 1 on true, 0 on false, 2 on exception  

| Param | Type | Description |
| --- | --- | --- |
| pg1 | [<code>GEOSPreparedGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSPreparedGeometry) | The prepared geometry |
| g2 | [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) | The geometry to test |


---
<a name="exp_module_geos--geos.GEOSPreparedContainsProperly"></a>

## geos.GEOSPreparedContainsProperly ⇒ <code>number</code> ⏏
Use a GEOSPreparedGeometry do a high performance calculation of whether the provided geometry is contained properly.

**Kind**: global property of [<code>geos</code>](/typedefs-enums/typedefs-enums.html#module_geos)  
**Returns**: <code>number</code> - 1 on true, 0 on false, 2 on exception  

| Param | Type | Description |
| --- | --- | --- |
| pg1 | [<code>GEOSPreparedGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSPreparedGeometry) | The prepared geometry |
| g2 | [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) | The geometry to test |


---
<a name="exp_module_geos--geos.GEOSPreparedContainsProperly_r"></a>

## geos.GEOSPreparedContainsProperly\_r ⇒ <code>number</code> ⏏
Use a GEOSPreparedGeometry do a high performance calculation of whether the provided geometry is contained properly.

**Kind**: global property of [<code>geos</code>](/typedefs-enums/typedefs-enums.html#module_geos)  
**Returns**: <code>number</code> - 1 on true, 0 on false, 2 on exception  

| Param | Type | Description |
| --- | --- | --- |
| handle | [<code>GEOSContextHandle\_t</code>](/typedefs-enums/typedefs-enums.html#GEOSContextHandle_t) | - |
| pg1 | [<code>GEOSPreparedGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSPreparedGeometry) | The prepared geometry |
| g2 | [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) | The geometry to test |


---
<a name="exp_module_geos--geos.GEOSPreparedContainsXY"></a>

## geos.GEOSPreparedContainsXY ⇒ <code>number</code> ⏏
Use a GEOSPreparedGeometry do a high performance calculation of whether the provided point is contained.

**Kind**: global property of [<code>geos</code>](/typedefs-enums/typedefs-enums.html#module_geos)  
**Returns**: <code>number</code> - 1 on true, 0 on false, 2 on exception  

| Param | Type | Description |
| --- | --- | --- |
| pg1 | [<code>GEOSPreparedGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSPreparedGeometry) | The prepared geometry |
| x | <code>number</code> | x coordinate of point to test |
| y | <code>number</code> | y coordinate of point to test |


---
<a name="exp_module_geos--geos.GEOSPreparedContainsXY_r"></a>

## geos.GEOSPreparedContainsXY\_r ⇒ <code>number</code> ⏏
Use a GEOSPreparedGeometry do a high performance calculation of whether the provided point is contained.

**Kind**: global property of [<code>geos</code>](/typedefs-enums/typedefs-enums.html#module_geos)  
**Returns**: <code>number</code> - 1 on true, 0 on false, 2 on exception  

| Param | Type | Description |
| --- | --- | --- |
| handle | [<code>GEOSContextHandle\_t</code>](/typedefs-enums/typedefs-enums.html#GEOSContextHandle_t) | - |
| pg1 | [<code>GEOSPreparedGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSPreparedGeometry) | The prepared geometry |
| x | <code>number</code> | x coordinate of point to test |
| y | <code>number</code> | y coordinate of point to test |


---
<a name="exp_module_geos--geos.GEOSPreparedContains_r"></a>

## geos.GEOSPreparedContains\_r ⇒ <code>number</code> ⏏
Use a GEOSPreparedGeometry do a high performance calculation of whether the provided geometry is contained.

**Kind**: global property of [<code>geos</code>](/typedefs-enums/typedefs-enums.html#module_geos)  
**Returns**: <code>number</code> - 1 on true, 0 on false, 2 on exception  

| Param | Type | Description |
| --- | --- | --- |
| handle | [<code>GEOSContextHandle\_t</code>](/typedefs-enums/typedefs-enums.html#GEOSContextHandle_t) | - |
| pg1 | [<code>GEOSPreparedGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSPreparedGeometry) | The prepared geometry |
| g2 | [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) | The geometry to test |


---
<a name="exp_module_geos--geos.GEOSPreparedCoveredBy"></a>

## geos.GEOSPreparedCoveredBy ⇒ <code>number</code> ⏏
Using a GEOSPreparedGeometry do a high performance calculation of whether the provided geometry is covered by.

**Kind**: global property of [<code>geos</code>](/typedefs-enums/typedefs-enums.html#module_geos)  
**Returns**: <code>number</code> - 1 on true, 0 on false, 2 on exception  

| Param | Type | Description |
| --- | --- | --- |
| pg1 | [<code>GEOSPreparedGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSPreparedGeometry) | The prepared geometry |
| g2 | [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) | The geometry to test |


---
<a name="exp_module_geos--geos.GEOSPreparedCoveredBy_r"></a>

## geos.GEOSPreparedCoveredBy\_r ⇒ <code>number</code> ⏏
Using a GEOSPreparedGeometry do a high performance calculation of whether the provided geometry is covered by.

**Kind**: global property of [<code>geos</code>](/typedefs-enums/typedefs-enums.html#module_geos)  
**Returns**: <code>number</code> - 1 on true, 0 on false, 2 on exception  

| Param | Type | Description |
| --- | --- | --- |
| handle | [<code>GEOSContextHandle\_t</code>](/typedefs-enums/typedefs-enums.html#GEOSContextHandle_t) | - |
| pg1 | [<code>GEOSPreparedGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSPreparedGeometry) | The prepared geometry |
| g2 | [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) | The geometry to test |


---
<a name="exp_module_geos--geos.GEOSPreparedCovers"></a>

## geos.GEOSPreparedCovers ⇒ <code>number</code> ⏏
Using a GEOSPreparedGeometry do a high performance calculation of whether the provided geometry covers.

**Kind**: global property of [<code>geos</code>](/typedefs-enums/typedefs-enums.html#module_geos)  
**Returns**: <code>number</code> - 1 on true, 0 on false, 2 on exception  

| Param | Type | Description |
| --- | --- | --- |
| pg1 | [<code>GEOSPreparedGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSPreparedGeometry) | The prepared geometry |
| g2 | [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) | The geometry to test |


---
<a name="exp_module_geos--geos.GEOSPreparedCovers_r"></a>

## geos.GEOSPreparedCovers\_r ⇒ <code>number</code> ⏏
Using a GEOSPreparedGeometry do a high performance calculation of whether the provided geometry covers.

**Kind**: global property of [<code>geos</code>](/typedefs-enums/typedefs-enums.html#module_geos)  
**Returns**: <code>number</code> - 1 on true, 0 on false, 2 on exception  

| Param | Type | Description |
| --- | --- | --- |
| handle | [<code>GEOSContextHandle\_t</code>](/typedefs-enums/typedefs-enums.html#GEOSContextHandle_t) | - |
| pg1 | [<code>GEOSPreparedGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSPreparedGeometry) | The prepared geometry |
| g2 | [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) | The geometry to test |


---
<a name="exp_module_geos--geos.GEOSPreparedCrosses"></a>

## geos.GEOSPreparedCrosses ⇒ <code>number</code> ⏏
Using a GEOSPreparedGeometry do a high performance calculation of whether the provided geometry crosses.

**Kind**: global property of [<code>geos</code>](/typedefs-enums/typedefs-enums.html#module_geos)  
**Returns**: <code>number</code> - 1 on true, 0 on false, 2 on exception  

| Param | Type | Description |
| --- | --- | --- |
| pg1 | [<code>GEOSPreparedGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSPreparedGeometry) | The prepared geometry |
| g2 | [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) | The geometry to test |


---
<a name="exp_module_geos--geos.GEOSPreparedCrosses_r"></a>

## geos.GEOSPreparedCrosses\_r ⇒ <code>number</code> ⏏
Using a GEOSPreparedGeometry do a high performance calculation of whether the provided geometry crosses.

**Kind**: global property of [<code>geos</code>](/typedefs-enums/typedefs-enums.html#module_geos)  
**Returns**: <code>number</code> - 1 on true, 0 on false, 2 on exception  

| Param | Type | Description |
| --- | --- | --- |
| handle | [<code>GEOSContextHandle\_t</code>](/typedefs-enums/typedefs-enums.html#GEOSContextHandle_t) | - |
| pg1 | [<code>GEOSPreparedGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSPreparedGeometry) | The prepared geometry |
| g2 | [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) | The geometry to test |


---
<a name="exp_module_geos--geos.GEOSPreparedDisjoint"></a>

## geos.GEOSPreparedDisjoint ⇒ <code>number</code> ⏏
Use a GEOSPreparedGeometry do a high performance calculation of whether the provided geometry is disjoint.

**Kind**: global property of [<code>geos</code>](/typedefs-enums/typedefs-enums.html#module_geos)  
**Returns**: <code>number</code> - 1 on true, 0 on false, 2 on exception  

| Param | Type | Description |
| --- | --- | --- |
| pg1 | [<code>GEOSPreparedGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSPreparedGeometry) | The prepared geometry |
| g2 | [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) | The geometry to test |


---
<a name="exp_module_geos--geos.GEOSPreparedDisjoint_r"></a>

## geos.GEOSPreparedDisjoint\_r ⇒ <code>number</code> ⏏
Use a GEOSPreparedGeometry do a high performance calculation of whether the provided geometry is disjoint.

**Kind**: global property of [<code>geos</code>](/typedefs-enums/typedefs-enums.html#module_geos)  
**Returns**: <code>number</code> - 1 on true, 0 on false, 2 on exception  

| Param | Type | Description |
| --- | --- | --- |
| handle | [<code>GEOSContextHandle\_t</code>](/typedefs-enums/typedefs-enums.html#GEOSContextHandle_t) | - |
| pg1 | [<code>GEOSPreparedGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSPreparedGeometry) | The prepared geometry |
| g2 | [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) | The geometry to test |


---
<a name="exp_module_geos--geos.GEOSPreparedDistance"></a>

## geos.GEOSPreparedDistance ⇒ <code>number</code> ⏏
Use a GEOSPreparedGeometry do a high performance calculation to find the distance between the prepared and provided geometry. Useful for situations where one geometry is large and static and needs to be tested against a large number of other geometries.

**Kind**: global property of [<code>geos</code>](/typedefs-enums/typedefs-enums.html#module_geos)  
**Returns**: <code>number</code> - 1 on success  

| Param | Type | Description |
| --- | --- | --- |
| pg1 | [<code>GEOSPreparedGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSPreparedGeometry) | The prepared geometry |
| g2 | [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) | The geometry to test |
| dist | [<code>NumberPointer</code>](/typedefs-enums/typedefs-enums.html#NumberPointer) | Pointer to store the result in |


---
<a name="exp_module_geos--geos.GEOSPreparedDistanceWithin"></a>

## geos.GEOSPreparedDistanceWithin ⇒ <code>number</code> ⏏
Use a GEOSPreparedGeometry do a high performance calculation to find whether the prepared and provided geometry are within the given max distance. Useful for situations where one geometry is large and static and needs to be tested against a large number of other geometries.

**Kind**: global property of [<code>geos</code>](/typedefs-enums/typedefs-enums.html#module_geos)  
**Returns**: <code>number</code> - 1 on success  

| Param | Type | Description |
| --- | --- | --- |
| pg1 | [<code>GEOSPreparedGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSPreparedGeometry) | The prepared geometry |
| g2 | [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) | The geometry to test |
| dist | <code>number</code> | The max distance |


---
<a name="exp_module_geos--geos.GEOSPreparedDistanceWithin_r"></a>

## geos.GEOSPreparedDistanceWithin\_r ⇒ <code>number</code> ⏏
Use a GEOSPreparedGeometry do a high performance calculation to find whether the prepared and provided geometry are within the given max distance. Useful for situations where one geometry is large and static and needs to be tested against a large number of other geometries.

**Kind**: global property of [<code>geos</code>](/typedefs-enums/typedefs-enums.html#module_geos)  
**Returns**: <code>number</code> - 1 on success  

| Param | Type | Description |
| --- | --- | --- |
| handle | [<code>GEOSContextHandle\_t</code>](/typedefs-enums/typedefs-enums.html#GEOSContextHandle_t) | - |
| pg1 | [<code>GEOSPreparedGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSPreparedGeometry) | The prepared geometry |
| g2 | [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) | The geometry to test |
| dist | <code>number</code> | The max distance |


---
<a name="exp_module_geos--geos.GEOSPreparedDistance_r"></a>

## geos.GEOSPreparedDistance\_r ⇒ <code>number</code> ⏏
Use a GEOSPreparedGeometry do a high performance calculation to find the distance between the prepared and provided geometry. Useful for situations where one geometry is large and static and needs to be tested against a large number of other geometries.

**Kind**: global property of [<code>geos</code>](/typedefs-enums/typedefs-enums.html#module_geos)  
**Returns**: <code>number</code> - 1 on success  

| Param | Type | Description |
| --- | --- | --- |
| handle | [<code>GEOSContextHandle\_t</code>](/typedefs-enums/typedefs-enums.html#GEOSContextHandle_t) | - |
| pg1 | [<code>GEOSPreparedGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSPreparedGeometry) | The prepared geometry |
| g2 | [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) | The geometry to test |
| dist | [<code>NumberPointer</code>](/typedefs-enums/typedefs-enums.html#NumberPointer) | Pointer to store the result in |


---
<a name="exp_module_geos--geos.GEOSPreparedGeom_destroy"></a>

## geos.GEOSPreparedGeom\_destroy ⇒ <code>null</code> ⏏
Free the memory associated with a GEOSPreparedGeometry. Caller must separately free the base GEOSGeometry used to create the prepared geometry.

**Kind**: global property of [<code>geos</code>](/typedefs-enums/typedefs-enums.html#module_geos)  
**Returns**: <code>null</code> - void  

| Param | Type | Description |
| --- | --- | --- |
| g | [<code>GEOSPreparedGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSPreparedGeometry) | Prepared geometry to destroy. |


---
<a name="exp_module_geos--geos.GEOSPreparedGeom_destroy_r"></a>

## geos.GEOSPreparedGeom\_destroy\_r ⇒ <code>null</code> ⏏
Free the memory associated with a GEOSPreparedGeometry. Caller must separately free the base GEOSGeometry used to create the prepared geometry.

**Kind**: global property of [<code>geos</code>](/typedefs-enums/typedefs-enums.html#module_geos)  
**Returns**: <code>null</code> - void  

| Param | Type | Description |
| --- | --- | --- |
| handle | [<code>GEOSContextHandle\_t</code>](/typedefs-enums/typedefs-enums.html#GEOSContextHandle_t) | - |
| g | [<code>GEOSPreparedGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSPreparedGeometry) | Prepared geometry to destroy. |


---
<a name="exp_module_geos--geos.GEOSPreparedIntersects"></a>

## geos.GEOSPreparedIntersects ⇒ <code>number</code> ⏏
Use a GEOSPreparedGeometry do a high performance calculation of whether the provided geometry intersects.

**Kind**: global property of [<code>geos</code>](/typedefs-enums/typedefs-enums.html#module_geos)  
**Returns**: <code>number</code> - 1 on true, 0 on false, 2 on exception  

| Param | Type | Description |
| --- | --- | --- |
| pg1 | [<code>GEOSPreparedGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSPreparedGeometry) | The prepared geometry |
| g2 | [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) | The geometry to test |


---
<a name="exp_module_geos--geos.GEOSPreparedIntersectsXY"></a>

## geos.GEOSPreparedIntersectsXY ⇒ <code>number</code> ⏏
Use a GEOSPreparedGeometry do a high performance calculation of whether the provided point intersects.

**Kind**: global property of [<code>geos</code>](/typedefs-enums/typedefs-enums.html#module_geos)  
**Returns**: <code>number</code> - 1 on true, 0 on false, 2 on exception  

| Param | Type | Description |
| --- | --- | --- |
| pg1 | [<code>GEOSPreparedGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSPreparedGeometry) | The prepared geometry |
| x | <code>number</code> | x coordinate of point to test |
| y | <code>number</code> | y coordinate of point to test |


---
<a name="exp_module_geos--geos.GEOSPreparedIntersectsXY_r"></a>

## geos.GEOSPreparedIntersectsXY\_r ⇒ <code>number</code> ⏏
Use a GEOSPreparedGeometry do a high performance calculation of whether the provided point intersects.

**Kind**: global property of [<code>geos</code>](/typedefs-enums/typedefs-enums.html#module_geos)  
**Returns**: <code>number</code> - 1 on true, 0 on false, 2 on exception  

| Param | Type | Description |
| --- | --- | --- |
| handle | [<code>GEOSContextHandle\_t</code>](/typedefs-enums/typedefs-enums.html#GEOSContextHandle_t) | - |
| pg1 | [<code>GEOSPreparedGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSPreparedGeometry) | The prepared geometry |
| x | <code>number</code> | x coordinate of point to test |
| y | <code>number</code> | y coordinate of point to test |


---
<a name="exp_module_geos--geos.GEOSPreparedIntersects_r"></a>

## geos.GEOSPreparedIntersects\_r ⇒ <code>number</code> ⏏
Use a GEOSPreparedGeometry do a high performance calculation of whether the provided geometry intersects.

**Kind**: global property of [<code>geos</code>](/typedefs-enums/typedefs-enums.html#module_geos)  
**Returns**: <code>number</code> - 1 on true, 0 on false, 2 on exception  

| Param | Type | Description |
| --- | --- | --- |
| handle | [<code>GEOSContextHandle\_t</code>](/typedefs-enums/typedefs-enums.html#GEOSContextHandle_t) | - |
| pg1 | [<code>GEOSPreparedGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSPreparedGeometry) | The prepared geometry |
| g2 | [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) | The geometry to test |


---
<a name="exp_module_geos--geos.GEOSPreparedNearestPoints"></a>

## geos.GEOSPreparedNearestPoints ⇒ [<code>GEOSCoordSequence</code>](/typedefs-enums/typedefs-enums.html#GEOSCoordSequence) ⏏
Use a GEOSPreparedGeometry do a high performance calculation to find the nearest points between the prepared and provided geometry.

**Kind**: global property of [<code>geos</code>](/typedefs-enums/typedefs-enums.html#module_geos)  
**Returns**: [<code>GEOSCoordSequence</code>](/typedefs-enums/typedefs-enums.html#GEOSCoordSequence) - A coordinate sequence containing the nearest points, or NULL on exception. The first point in the sequence is from the prepared geometry, and the seconds is from the other argument.  

| Param | Type | Description |
| --- | --- | --- |
| pg1 | [<code>GEOSPreparedGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSPreparedGeometry) | The prepared geometry |
| g2 | [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) | The geometry to test |


---
<a name="exp_module_geos--geos.GEOSPreparedNearestPoints_r"></a>

## geos.GEOSPreparedNearestPoints\_r ⇒ [<code>GEOSCoordSequence</code>](/typedefs-enums/typedefs-enums.html#GEOSCoordSequence) ⏏
Use a GEOSPreparedGeometry do a high performance calculation to find the nearest points between the prepared and provided geometry.

**Kind**: global property of [<code>geos</code>](/typedefs-enums/typedefs-enums.html#module_geos)  
**Returns**: [<code>GEOSCoordSequence</code>](/typedefs-enums/typedefs-enums.html#GEOSCoordSequence) - A coordinate sequence containing the nearest points, or NULL on exception. The first point in the sequence is from the prepared geometry, and the seconds is from the other argument.  

| Param | Type | Description |
| --- | --- | --- |
| handle | [<code>GEOSContextHandle\_t</code>](/typedefs-enums/typedefs-enums.html#GEOSContextHandle_t) | - |
| pg1 | [<code>GEOSPreparedGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSPreparedGeometry) | The prepared geometry |
| g2 | [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) | The geometry to test |


---
<a name="exp_module_geos--geos.GEOSPreparedOverlaps"></a>

## geos.GEOSPreparedOverlaps ⇒ <code>number</code> ⏏
Use a GEOSPreparedGeometry do a high performance calculation of whether the provided geometry overlaps.

**Kind**: global property of [<code>geos</code>](/typedefs-enums/typedefs-enums.html#module_geos)  
**Returns**: <code>number</code> - 1 on true, 0 on false, 2 on exception  

| Param | Type | Description |
| --- | --- | --- |
| pg1 | [<code>GEOSPreparedGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSPreparedGeometry) | The prepared geometry |
| g2 | [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) | The geometry to test |


---
<a name="exp_module_geos--geos.GEOSPreparedOverlaps_r"></a>

## geos.GEOSPreparedOverlaps\_r ⇒ <code>number</code> ⏏
Use a GEOSPreparedGeometry do a high performance calculation of whether the provided geometry overlaps.

**Kind**: global property of [<code>geos</code>](/typedefs-enums/typedefs-enums.html#module_geos)  
**Returns**: <code>number</code> - 1 on true, 0 on false, 2 on exception  

| Param | Type | Description |
| --- | --- | --- |
| handle | [<code>GEOSContextHandle\_t</code>](/typedefs-enums/typedefs-enums.html#GEOSContextHandle_t) | - |
| pg1 | [<code>GEOSPreparedGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSPreparedGeometry) | The prepared geometry |
| g2 | [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) | The geometry to test |


---
<a name="exp_module_geos--geos.GEOSPreparedRelate"></a>

## geos.GEOSPreparedRelate ⇒ [<code>StringPointer</code>](/typedefs-enums/typedefs-enums.html#StringPointer) ⏏
Use a GEOSPreparedGeometry do a high-performance calculation of the DE9IM relationship between the prepared and provided geometry.

**Kind**: global property of [<code>geos</code>](/typedefs-enums/typedefs-enums.html#module_geos)  
**Returns**: [<code>StringPointer</code>](/typedefs-enums/typedefs-enums.html#StringPointer) - The DE9IM string  

| Param | Type | Description |
| --- | --- | --- |
| pg1 | [<code>GEOSPreparedGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSPreparedGeometry) | The prepared geometry |
| g2 | [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) | The geometry to test |


---
<a name="exp_module_geos--geos.GEOSPreparedRelatePattern"></a>

## geos.GEOSPreparedRelatePattern ⇒ <code>number</code> ⏏
Use a GEOSPreparedGeometry do a high-performance calculation of the DE9IM relationship between the prepared and provided geometry, and compare the relationship to the provided DE9IM pattern. Returns true if the patterns are consistent and false otherwise.

**Kind**: global property of [<code>geos</code>](/typedefs-enums/typedefs-enums.html#module_geos)  
**Returns**: <code>number</code> - 1 on true, 0 on false, 2 on exception  

| Param | Type | Description |
| --- | --- | --- |
| pg1 | [<code>GEOSPreparedGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSPreparedGeometry) | The prepared geometry |
| g2 | [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) | The geometry to test |
| imPattern | [<code>StringPointer</code>](/typedefs-enums/typedefs-enums.html#StringPointer) | The DE9IM pattern to test |


---
<a name="exp_module_geos--geos.GEOSPreparedRelatePattern_r"></a>

## geos.GEOSPreparedRelatePattern\_r ⇒ <code>number</code> ⏏
Use a GEOSPreparedGeometry do a high-performance calculation of the DE9IM relationship between the prepared and provided geometry, and compare the relationship to the provided DE9IM pattern. Returns true if the patterns are consistent and false otherwise.

**Kind**: global property of [<code>geos</code>](/typedefs-enums/typedefs-enums.html#module_geos)  
**Returns**: <code>number</code> - 1 on true, 0 on false, 2 on exception  

| Param | Type | Description |
| --- | --- | --- |
| handle | [<code>GEOSContextHandle\_t</code>](/typedefs-enums/typedefs-enums.html#GEOSContextHandle_t) | - |
| pg1 | [<code>GEOSPreparedGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSPreparedGeometry) | The prepared geometry |
| g2 | [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) | The geometry to test |
| im | [<code>StringPointer</code>](/typedefs-enums/typedefs-enums.html#StringPointer) | The DE9IM pattern to test |


---
<a name="exp_module_geos--geos.GEOSPreparedRelate_r"></a>

## geos.GEOSPreparedRelate\_r ⇒ [<code>StringPointer</code>](/typedefs-enums/typedefs-enums.html#StringPointer) ⏏
Use a GEOSPreparedGeometry do a high-performance calculation of the DE9IM relationship between the prepared and provided geometry.

**Kind**: global property of [<code>geos</code>](/typedefs-enums/typedefs-enums.html#module_geos)  
**Returns**: [<code>StringPointer</code>](/typedefs-enums/typedefs-enums.html#StringPointer) - The DE9IM string  

| Param | Type | Description |
| --- | --- | --- |
| handle | [<code>GEOSContextHandle\_t</code>](/typedefs-enums/typedefs-enums.html#GEOSContextHandle_t) | - |
| pg1 | [<code>GEOSPreparedGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSPreparedGeometry) | The prepared geometry |
| g2 | [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) | The geometry to test |


---
<a name="exp_module_geos--geos.GEOSPreparedTouches"></a>

## geos.GEOSPreparedTouches ⇒ <code>number</code> ⏏
Use a GEOSPreparedGeometry do a high performance calculation of whether the provided geometry touches.

**Kind**: global property of [<code>geos</code>](/typedefs-enums/typedefs-enums.html#module_geos)  
**Returns**: <code>number</code> - 1 on true, 0 on false, 2 on exception  

| Param | Type | Description |
| --- | --- | --- |
| pg1 | [<code>GEOSPreparedGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSPreparedGeometry) | The prepared geometry |
| g2 | [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) | The geometry to test |


---
<a name="exp_module_geos--geos.GEOSPreparedTouches_r"></a>

## geos.GEOSPreparedTouches\_r ⇒ <code>number</code> ⏏
Use a GEOSPreparedGeometry do a high performance calculation of whether the provided geometry touches.

**Kind**: global property of [<code>geos</code>](/typedefs-enums/typedefs-enums.html#module_geos)  
**Returns**: <code>number</code> - 1 on true, 0 on false, 2 on exception  

| Param | Type | Description |
| --- | --- | --- |
| handle | [<code>GEOSContextHandle\_t</code>](/typedefs-enums/typedefs-enums.html#GEOSContextHandle_t) | - |
| pg1 | [<code>GEOSPreparedGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSPreparedGeometry) | The prepared geometry |
| g2 | [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) | The geometry to test |


---
<a name="exp_module_geos--geos.GEOSPreparedWithin"></a>

## geos.GEOSPreparedWithin ⇒ <code>number</code> ⏏
Use a GEOSPreparedGeometry do a high performance calculation of whether the provided geometry is within.

**Kind**: global property of [<code>geos</code>](/typedefs-enums/typedefs-enums.html#module_geos)  
**Returns**: <code>number</code> - 1 on true, 0 on false, 2 on exception  

| Param | Type | Description |
| --- | --- | --- |
| pg1 | [<code>GEOSPreparedGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSPreparedGeometry) | The prepared geometry |
| g2 | [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) | The geometry to test |


---
<a name="exp_module_geos--geos.GEOSPreparedWithin_r"></a>

## geos.GEOSPreparedWithin\_r ⇒ <code>number</code> ⏏
Use a GEOSPreparedGeometry do a high performance calculation of whether the provided geometry is within.

**Kind**: global property of [<code>geos</code>](/typedefs-enums/typedefs-enums.html#module_geos)  
**Returns**: <code>number</code> - 1 on true, 0 on false, 2 on exception  

| Param | Type | Description |
| --- | --- | --- |
| handle | [<code>GEOSContextHandle\_t</code>](/typedefs-enums/typedefs-enums.html#GEOSContextHandle_t) | - |
| pg1 | [<code>GEOSPreparedGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSPreparedGeometry) | The prepared geometry |
| g2 | [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) | The geometry to test |


---
