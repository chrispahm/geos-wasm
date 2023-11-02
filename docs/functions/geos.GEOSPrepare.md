<a name="exp_module_geos--geos.GEOSPrepare"></a>

## geos.GEOSPrepare ⇒ <code>number</code> ⏏
Creates a prepared geometry from a regular geometry.

**Kind**: Exported member  
**Returns**: <code>number</code> - A GEOSPreparedGeometry pointer, or NULL on exception.  

| Param | Type | Description |
| --- | --- | --- |
| g | <code>number</code> | A GEOSGeometry pointer. |


---
<a name="exp_module_geos--geos.GEOSPrepare_r"></a>

## geos.GEOSPrepare\_r ⇒ <code>number</code> ⏏
Creates a prepared geometry from a regular geometry, with a context handle.

**Kind**: Exported member  
**Returns**: <code>number</code> - A GEOSPreparedGeometry pointer, or NULL on exception.  

| Param | Type | Description |
| --- | --- | --- |
| handle | <code>number</code> | A GEOSContextHandle pointer. |
| g | <code>number</code> | A GEOSGeometry pointer. |


---
<a name="exp_module_geos--geos.GEOSPreparedContains"></a>

## geos.GEOSPreparedContains ⇒ <code>number</code> ⏏
Tests whether a prepared geometry contains another geometry.

**Kind**: Exported member  
**Returns**: <code>number</code> - 1 if prepGeom1 contains geom2, 0 if not, or -1 on error.  

| Param | Type | Description |
| --- | --- | --- |
| prepGeom1 | <code>number</code> | The pointer to the prepared geometry object that is the potential container. |
| geom2 | <code>number</code> | The pointer to the geometry object that is the potential containee. |


---
<a name="exp_module_geos--geos.GEOSPreparedContainsProperly"></a>

## geos.GEOSPreparedContainsProperly ⇒ <code>number</code> ⏏
Tests whether a prepared geometry properly contains another geometry. Proper containment means that the test geometry is contained in the interior of the target geometry, and does not intersect its boundary.

**Kind**: Exported member  
**Returns**: <code>number</code> - 1 if prepGeom1 properly contains geom2, 0 if not, or -1 on error.  

| Param | Type | Description |
| --- | --- | --- |
| prepGeom1 | <code>number</code> | The pointer to the prepared geometry object that is the potential container. |
| geom2 | <code>number</code> | The pointer to the geometry object that is the potential containee. |


---
<a name="exp_module_geos--geos.GEOSPreparedContainsProperly_r"></a>

## geos.GEOSPreparedContainsProperly\_r ⇒ <code>number</code> ⏏
Tests whether a prepared geometry properly contains another geometry. Proper containment means that the test geometry is contained in the interior of the target geometry, and does not intersect its boundary.

**Kind**: Exported member  
**Returns**: <code>number</code> - 1 if prepGeom1 properly contains geom2, 0 if not, or -1 on error.  

| Param | Type | Description |
| --- | --- | --- |
| handle | <code>number</code> | A pointer to the GEOS context handle. |
| prepGeom1 | <code>number</code> | The pointer to the prepared geometry object that is the potential container. |
| geom2 | <code>number</code> | The pointer to the geometry object that is the potential containee. |


---
<a name="exp_module_geos--geos.GEOSPreparedContainsXY"></a>

## geos.GEOSPreparedContainsXY ⇒ <code>number</code> ⏏
Use a GEOSPreparedGeometry do a high performance
calculation of whether the provided point is contained.

**Kind**: Exported member  
**Returns**: <code>number</code> - 1 on true, 0 on false, 2 on exception  
**See**: GEOSContains  

| Param | Type | Description |
| --- | --- | --- |
| pg1 | <code>number</code> | The prepared geometry |
| x | <code>number</code> | x coordinate of point to test |
| y | <code>number</code> | y coordinate of point to test |


---
<a name="exp_module_geos--geos.GEOSPreparedContainsXY_r"></a>

## geos.GEOSPreparedContainsXY\_r ⇒ <code>number</code> ⏏
Use a GEOSPreparedGeometry do a high performance
calculation of whether the provided point is contained.

**Kind**: Exported member  
**Returns**: <code>number</code> - 1 on true, 0 on false, 2 on exception  
**See**: GEOSContains  

| Param | Type | Description |
| --- | --- | --- |
| handle | <code>number</code> | A pointer to the GEOS context handle. |
| pg1 | <code>number</code> | The prepared geometry |
| x | <code>number</code> | x coordinate of point to test |
| y | <code>number</code> | y coordinate of point to test |


---
<a name="exp_module_geos--geos.GEOSPreparedContains_r"></a>

## geos.GEOSPreparedContains\_r ⇒ <code>number</code> ⏏
Tests whether a prepared geometry contains another geometry.

**Kind**: Exported member  
**Returns**: <code>number</code> - 1 if prepGeom1 contains geom2, 0 if not, or -1 on error.  

| Param | Type | Description |
| --- | --- | --- |
| handle | <code>number</code> | A pointer to the GEOS context handle. |
| prepGeom1 | <code>number</code> | The pointer to the prepared geometry object that is the potential container. |
| geom2 | <code>number</code> | The pointer to the geometry object that is the potential containee. |


---
<a name="exp_module_geos--geos.GEOSPreparedCoveredBy"></a>

## geos.GEOSPreparedCoveredBy ⇒ <code>number</code> ⏏
Tests whether a geometry is covered by another geometry.

**Kind**: Exported member  
**Returns**: <code>number</code> - 1 if g2 is covered by pg1, 0 if not, -1 on exception.  

| Param | Type | Description |
| --- | --- | --- |
| pg1 | <code>number</code> | A pointer to a prepared geometry. |
| g2 | <code>number</code> | A pointer to a geometry. |


---
<a name="exp_module_geos--geos.GEOSPreparedCoveredBy_r"></a>

## geos.GEOSPreparedCoveredBy\_r ⇒ <code>number</code> ⏏
Tests whether a geometry is covered by another geometry, using a GEOS context handle.

**Kind**: Exported member  
**Returns**: <code>number</code> - 1 if g2 is covered by pg1, 0 if not, -1 on exception.  

| Param | Type | Description |
| --- | --- | --- |
| handle | <code>number</code> | A GEOS context handle. |
| pg1 | <code>number</code> | A pointer to a prepared geometry. |
| g2 | <code>number</code> | A pointer to a geometry. |


---
<a name="exp_module_geos--geos.GEOSPreparedCovers"></a>

## geos.GEOSPreparedCovers ⇒ <code>number</code> ⏏
Tests whether a geometry covers another geometry.

**Kind**: Exported member  
**Returns**: <code>number</code> - 1 if pg1 covers g2, 0 if not, -1 on exception.  

| Param | Type | Description |
| --- | --- | --- |
| pg1 | <code>number</code> | A pointer to a prepared geometry. |
| g2 | <code>number</code> | A pointer to a geometry. |


---
<a name="exp_module_geos--geos.GEOSPreparedCovers_r"></a>

## geos.GEOSPreparedCovers\_r ⇒ <code>number</code> ⏏
Tests whether a geometry covers another geometry, using a GEOS context handle.

**Kind**: Exported member  
**Returns**: <code>number</code> - 1 if pg1 covers g2, 0 if not, -1 on exception.  

| Param | Type | Description |
| --- | --- | --- |
| handle | <code>number</code> | A GEOS context handle. |
| pg1 | <code>number</code> | A pointer to a prepared geometry. |
| g2 | <code>number</code> | A pointer to a geometry. |


---
<a name="exp_module_geos--geos.GEOSPreparedCrosses"></a>

## geos.GEOSPreparedCrosses ⇒ <code>number</code> ⏏
Tests whether a geometry crosses another geometry.

**Kind**: Exported member  
**Returns**: <code>number</code> - 1 if pg1 crosses g2, 0 if not, -1 on exception.  

| Param | Type | Description |
| --- | --- | --- |
| pg1 | <code>number</code> | A pointer to a prepared geometry. |
| g2 | <code>number</code> | A pointer to a geometry. |


---
<a name="exp_module_geos--geos.GEOSPreparedCrosses_r"></a>

## geos.GEOSPreparedCrosses\_r ⇒ <code>number</code> ⏏
Computes whether the given geometries cross.

**Kind**: Exported member  
**Returns**: <code>number</code> - 1 if the geometries cross, 0 if they do not, or -1 on error.  

| Param | Type | Description |
| --- | --- | --- |
| handle | <code>number</code> | A pointer to the GEOS context handle. |
| pg1 | <code>number</code> | The first prepared geometry. |
| g2 | <code>number</code> | The second geometry. |


---
<a name="exp_module_geos--geos.GEOSPreparedDisjoint"></a>

## geos.GEOSPreparedDisjoint ⇒ <code>number</code> ⏏
Computes whether the given geometries are disjoint.

**Kind**: Exported member  
**Returns**: <code>number</code> - 1 if the geometries are disjoint, 0 if they are not, or -1 on error.  

| Param | Type | Description |
| --- | --- | --- |
| pg1 | <code>number</code> | The first prepared geometry. |
| g2 | <code>number</code> | The second geometry. |


---
<a name="exp_module_geos--geos.GEOSPreparedDisjoint_r"></a>

## geos.GEOSPreparedDisjoint\_r ⇒ <code>number</code> ⏏
Computes whether the given geometries are disjoint.

**Kind**: Exported member  
**Returns**: <code>number</code> - 1 if the geometries are disjoint, 0 if they are not, or -1 on error.  

| Param | Type | Description |
| --- | --- | --- |
| handle | <code>number</code> | A pointer to the GEOS context handle. |
| pg1 | <code>number</code> | The first prepared geometry. |
| g2 | <code>number</code> | The second geometry. |


---
<a name="exp_module_geos--geos.GEOSPreparedDistance"></a>

## geos.GEOSPreparedDistance ⇒ <code>number</code> ⏏
Computes the distance between two geometries using a prepared geometry for the first argument.

**Kind**: Exported member  
**Returns**: <code>number</code> - 1 if the distance was computed successfully, 0 otherwise, or -1 on error.  

| Param | Type | Description |
| --- | --- | --- |
| pg1 | <code>number</code> | A pointer to the prepared geometry to compute the distance from. |
| g2 | <code>number</code> | A pointer to the geometry to compute the distance to. |
| dist | <code>number</code> | A pointer to a double variable to store the distance result. |


---
<a name="exp_module_geos--geos.GEOSPreparedDistanceWithin"></a>

## geos.GEOSPreparedDistanceWithin ⇒ <code>number</code> ⏏
Tests whether the distance between a prepared geometry and another geometry is within a specified distance.

**Kind**: Exported member  
**Returns**: <code>number</code> - 1 if the geometries are within the distance, 0 if not, or -1 on error.  
**See**: https://libgeos.org/doxygen/geos__c_8h.html#a6f5a0b7f6f9e3a9c4b0b8a3c1a4d4e6d  

| Param | Type | Description |
| --- | --- | --- |
| prep | <code>number</code> | A pointer to a GEOS prepared geometry object. |
| g2 | <code>number</code> | A pointer to a GEOS geometry object. |
| dist | <code>number</code> | A double value representing the distance threshold. |


---
<a name="exp_module_geos--geos.GEOSPreparedDistanceWithin_r"></a>

## geos.GEOSPreparedDistanceWithin\_r ⇒ <code>number</code> ⏏
Computes the distance between a prepared geometry and another geometry, and checks if it is within a given tolerance.

**Kind**: Exported member  
**Returns**: <code>number</code> - 1 if the geometries are within the given distance of each other, 0 if not, or -1 on error.  
**See**: https://libgeos.org/doxygen/geos__c_8h.html#a3a9f7c0b6f9b2c6a0e3f4f5a7d8b9e5d  

| Param | Type | Description |
| --- | --- | --- |
| ctx | <code>number</code> | A GEOS context handle. |
| prep | <code>number</code> | A pointer to a prepared GEOS geometry object. |
| g | <code>number</code> | A pointer to a GEOS geometry object. |
| tolerance | <code>number</code> | A non-negative distance value. |


---
<a name="exp_module_geos--geos.GEOSPreparedDistance_r"></a>

## geos.GEOSPreparedDistance\_r ⇒ <code>number</code> ⏏
Computes the distance between two geometries using a prepared geometry for the first argument and a GEOS context handle.

**Kind**: Exported member  
**Returns**: <code>number</code> - 1 if the distance was computed successfully, 0 otherwise, or -1 on error.  

| Param | Type | Description |
| --- | --- | --- |
| handle | <code>number</code> | The GEOS context pointer handle. |
| pg1 | <code>number</code> | A pointer to the prepared geometry to compute the distance from. |
| g2 | <code>number</code> | A pointer to the geometry to compute the distance to. |
| dist | <code>number</code> | A pointer to a double variable to store the distance result. |


---
<a name="exp_module_geos--geos.GEOSPreparedGeom_destroy"></a>

## geos.GEOSPreparedGeom\_destroy ⏏
Destroys a prepared geometry.

**Kind**: Exported member  

| Param | Type | Description |
| --- | --- | --- |
| g | <code>number</code> | A GEOSPreparedGeometry pointer. |


---
<a name="exp_module_geos--geos.GEOSPreparedGeom_destroy_r"></a>

## geos.GEOSPreparedGeom\_destroy\_r ⏏
Destroys a prepared geometry object.

**Kind**: Exported member  

| Param | Type | Description |
| --- | --- | --- |
| handle | <code>number</code> | A pointer to the GEOS context handle. |
| prepGeom | <code>number</code> | The pointer to the prepared geometry object to be destroyed. |


---
<a name="exp_module_geos--geos.GEOSPreparedIntersects"></a>

## geos.GEOSPreparedIntersects ⇒ <code>number</code> ⏏
Computes whether the given geometries intersect.

**Kind**: Exported member  
**Returns**: <code>number</code> - 1 if the geometries intersect, 0 if they do not, or -1 on error.  

| Param | Type | Description |
| --- | --- | --- |
| pg1 | <code>number</code> | The first prepared geometry. |
| g2 | <code>number</code> | The second geometry. |


---
<a name="exp_module_geos--geos.GEOSPreparedIntersectsXY"></a>

## geos.GEOSPreparedIntersectsXY ⇒ <code>number</code> ⏏
Use a GEOSPreparedGeometry do a high performance
calculation of whether the provided point intersects.

**Kind**: Exported member  
**Returns**: <code>number</code> - 1 on true, 0 on false, 2 on exception  
**See**: GEOSIntersects  

| Param | Type | Description |
| --- | --- | --- |
| pg1 | <code>number</code> | The prepared geometry |
| x | <code>number</code> | x coordinate of point to test |
| y | <code>number</code> | y coordinate of point to test |


---
<a name="exp_module_geos--geos.GEOSPreparedIntersectsXY_r"></a>

## geos.GEOSPreparedIntersectsXY\_r ⇒ <code>number</code> ⏏
Use a GEOSPreparedGeometry do a high performance
calculation of whether the provided point intersects.

**Kind**: Exported member  
**Returns**: <code>number</code> - 1 on true, 0 on false, 2 on exception  
**See**: GEOSIntersects  

| Param | Type | Description |
| --- | --- | --- |
| handle | <code>number</code> | A pointer to the GEOS context handle. |
| pg1 | <code>number</code> | The prepared geometry |
| x | <code>number</code> | x coordinate of point to test |
| y | <code>number</code> | y coordinate of point to test |


---
<a name="exp_module_geos--geos.GEOSPreparedIntersects_r"></a>

## geos.GEOSPreparedIntersects\_r ⇒ <code>number</code> ⏏
Computes whether the given geometries intersect.

**Kind**: Exported member  
**Returns**: <code>number</code> - 1 if the geometries intersect, 0 if they do not, or -1 on error.  

| Param | Type | Description |
| --- | --- | --- |
| handle | <code>number</code> | A pointer to the GEOS context handle. |
| pg1 | <code>number</code> | The first prepared geometry. |
| g2 | <code>number</code> | The second geometry. |


---
<a name="exp_module_geos--geos.GEOSPreparedNearestPoints"></a>

## geos.GEOSPreparedNearestPoints ⇒ <code>number</code> ⏏
Computes the nearest points of two geometries.

**Kind**: Exported member  
**Returns**: <code>number</code> - A pointer to a coordinate sequence containing the nearest points, or NULL on error.  

| Param | Type | Description |
| --- | --- | --- |
| pg1 | <code>number</code> | A pointer to the first prepared geometry. |
| g2 | <code>number</code> | A pointer to the second geometry. |


---
<a name="exp_module_geos--geos.GEOSPreparedNearestPoints_r"></a>

## geos.GEOSPreparedNearestPoints\_r ⇒ <code>number</code> ⏏
Computes the nearest points of two geometries using a GEOS context handle.

**Kind**: Exported member  
**Returns**: <code>number</code> - A pointer to a coordinate sequence containing the nearest points, or NULL on error.  

| Param | Type | Description |
| --- | --- | --- |
| handle | <code>number</code> | The GEOS context pointer handle. |
| pg1 | <code>number</code> | A pointer to the first prepared geometry. |
| g2 | <code>number</code> | A pointer to the second geometry. |


---
<a name="exp_module_geos--geos.GEOSPreparedOverlaps"></a>

## geos.GEOSPreparedOverlaps ⇒ <code>number</code> ⏏
Tests whether two geometries overlap.

**Kind**: Exported member  
**Returns**: <code>number</code> - 1 if the geometries overlap, 0 if not, -1 on exception.  

| Param | Type | Description |
| --- | --- | --- |
| pg1 | <code>number</code> | A pointer to the first prepared geometry. |
| g2 | <code>number</code> | A pointer to the second geometry. |


---
<a name="exp_module_geos--geos.GEOSPreparedOverlaps_r"></a>

## geos.GEOSPreparedOverlaps\_r ⇒ <code>number</code> ⏏
Tests whether two geometries overlap, using a context handle.

**Kind**: Exported member  
**Returns**: <code>number</code> - 1 if the geometries overlap, 0 if not, -1 on exception.  

| Param | Type | Description |
| --- | --- | --- |
| handle | <code>number</code> | The context handle.pointer |
| pg1 | <code>number</code> | A pointer to the first prepared geometry. |
| g2 | <code>number</code> | A pointer to the second geometry. |


---
<a name="exp_module_geos--geos.GEOSPreparedTouches"></a>

## geos.GEOSPreparedTouches ⇒ <code>number</code> ⏏
Tests whether two geometries touch at one or more points.

**Kind**: Exported member  
**Returns**: <code>number</code> - 1 if the geometries touch, 0 if not, -1 on exception.  

| Param | Type | Description |
| --- | --- | --- |
| pg1 | <code>number</code> | A pointer to the first prepared geometry. |
| g2 | <code>number</code> | A pointer to the second geometry. |


---
<a name="exp_module_geos--geos.GEOSPreparedTouches_r"></a>

## geos.GEOSPreparedTouches\_r ⇒ <code>number</code> ⏏
Tests whether two geometries touch at one or more points, using a context handle.

**Kind**: Exported member  
**Returns**: <code>number</code> - 1 if the geometries touch, 0 if not, -1 on exception.  

| Param | Type | Description |
| --- | --- | --- |
| handle | <code>number</code> | The context handle.pointer |
| pg1 | <code>number</code> | A pointer to the first prepared geometry. |
| g2 | <code>number</code> | A pointer to the second geometry. |


---
<a name="exp_module_geos--geos.GEOSPreparedWithin"></a>

## geos.GEOSPreparedWithin ⇒ <code>number</code> ⏏
Tests whether the first geometry is within the second geometry.

**Kind**: Exported member  
**Returns**: <code>number</code> - 1 if the first geometry is within the second geometry, 0 if not, -1 on exception.  

| Param | Type | Description |
| --- | --- | --- |
| pg1 | <code>number</code> | A pointer to the first prepared geometry. |
| g2 | <code>number</code> | A pointer to the second geometry. |


---
<a name="exp_module_geos--geos.GEOSPreparedWithin_r"></a>

## geos.GEOSPreparedWithin\_r ⇒ <code>number</code> ⏏
Tests whether a geometry is within another geometry.

**Kind**: Exported member  
**Returns**: <code>number</code> - 1 if pg1 is within g2, 0 otherwise, or -1 on error.  

| Param | Type | Description |
| --- | --- | --- |
| handle | <code>number</code> | The GEOS context pointer handle. |
| pg1 | <code>number</code> | A pointer to the prepared geometry to test. |
| g2 | <code>number</code> | A pointer to the geometry to test against. |


---
