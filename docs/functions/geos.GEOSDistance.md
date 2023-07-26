<a name="exp_module_geos--geos.GEOSDistance"></a>

## geos.GEOSDistance ⇒ <code>number</code> ⏏
Computes the distance between the closest points of two geometries.

**Kind**: Exported member  
**Returns**: <code>number</code> - 1 on success, 0 on exception.  

| Param | Type | Description |
| --- | --- | --- |
| g1 | <code>number</code> | The first geometry to measure from. |
| g2 | <code>number</code> | The second geometry to measure to. |
| dist | <code>number</code> | A pointer to a double variable where the distance will be stored. |


---
<a name="exp_module_geos--geos.GEOSDistanceIndexed"></a>

## geos.GEOSDistanceIndexed ⇒ <code>number</code> ⏏
Computes the distance between two geometries using an indexed algorithm.
Useful when one or both geometries is very large.

**Kind**: Exported member  
**Returns**: <code>number</code> - 1 on success, 0 on exception.  
**See**: geos::operation::distance::IndexedFacetDistance  
**Since**: 3.7  

| Param | Type | Description |
| --- | --- | --- |
| g1 | <code>number</code> | Input geometry pointer. |
| g2 | <code>number</code> | Input geometry pointer. |
| dist | <code>number</code> | Pointer to be filled in with distance result. |


---
<a name="exp_module_geos--geos.GEOSDistanceIndexed_r"></a>

## geos.GEOSDistanceIndexed\_r ⇒ <code>number</code> ⏏
Computes the distance between two geometries using an indexed algorithm.
Useful when one or both geometries is very large.
This is a thread-safe version of GEOSDistanceIndexed.

**Kind**: Exported member  
**Returns**: <code>number</code> - 1 on success, 0 on exception.  
**See**: geos::operation::distance::IndexedFacetDistance  
**Since**: 3.7  

| Param | Type | Description |
| --- | --- | --- |
| handle | <code>number</code> | The context handle.pointer |
| g1 | <code>number</code> | Input geometry pointer. |
| g2 | <code>number</code> | Input geometry pointer. |
| dist | <code>number</code> | Pointer to be filled in with distance result. |


---
<a name="exp_module_geos--geos.GEOSDistanceWithin"></a>

## geos.GEOSDistanceWithin ⇒ <code>number</code> ⏏
Tests whether two geometries are within a specified distance of each other.

**Kind**: Exported member  
**Returns**: <code>number</code> - 1 if the geometries are within the distance of each other, 0 if not, or -1 on error.  
**See**: [GEOS C header file](https://libgeos.org/doxygen/geos__c_8h_source.html)  

| Param | Type | Description |
| --- | --- | --- |
| g1 | <code>number</code> | A pointer to a GEOS geometry object. |
| g2 | <code>number</code> | A pointer to another GEOS geometry object. |
| distance | <code>number</code> | The distance threshold to test. |


---
<a name="exp_module_geos--geos.GEOSDistanceWithin_r"></a>

## geos.GEOSDistanceWithin\_r ⇒ <code>number</code> ⏏
Checks if two geometries are within a given distance of each other.

**Kind**: Exported member  
**Returns**: <code>number</code> - A char value that is 1 if the geometries are within distance, 0 if not, or -1 on error.  
**See**: https://libgeos.org/doxygen/geos__c_8h.html#a7a9b0f6a3d3f9f8a5d4e9e7b6f4a5c0d  

| Param | Type | Description |
| --- | --- | --- |
| handle | <code>number</code> | A pointer to a GEOS context handle. |
| g1 | <code>number</code> | A pointer to the first GEOS geometry object. |
| g2 | <code>number</code> | A pointer to the second GEOS geometry object. |
| distance | <code>number</code> | The distance threshold in units of the coordinate reference system. |


---
<a name="exp_module_geos--geos.GEOSDistance_r"></a>

## geos.GEOSDistance\_r ⇒ <code>number</code> ⏏
Computes the distance between the closest points of two geometries.

**Kind**: Exported member  
**Returns**: <code>number</code> - 1 on success, 0 on exception.  

| Param | Type | Description |
| --- | --- | --- |
| handle | <code>number</code> | A pointer to the GEOS context handle. |
| g1 | <code>number</code> | The first geometry to measure from. |
| g2 | <code>number</code> | The second geometry to measure to. |
| dist | <code>number</code> | A pointer to a double variable where the distance will be stored. |


---
