<a name="exp_module_geos--geos.GEOSHausdorffDistance"></a>

## geos.GEOSHausdorffDistance ⇒ <code>number</code> ⏏
Computes the Hausdorff distance between two geometries.
The Hausdorff distance is a measure of how similar or dissimilar two geometries are.
It is the greatest distance between any point in one geometry and the closest point in the other geometry.
The smaller the Hausdorff distance, the more similar the geometries are.

**Kind**: Exported member  
**Returns**: <code>number</code> - 1 on success, 0 on exception.  

| Param | Type | Description |
| --- | --- | --- |
| g1 | <code>number</code> | Input geometry pointer. |
| g2 | <code>number</code> | Input geometry pointer. |
| dist | <code>number</code> | Pointer to be filled in with distance result. |


---
<a name="exp_module_geos--geos.GEOSHausdorffDistanceDensify"></a>

## geos.GEOSHausdorffDistanceDensify ⇒ <code>number</code> ⏏
Computes an approximation to the Hausdorff distance between two geometries by densifying them before computing their discrete Hausdorff distance.
The densification fraction parameter controls how much densification occurs.
A fraction of 0.0 results in no densification, while a fraction of 1.0 results in effectively computing the exact Hausdorff distance.
The fraction is relative to the size of the input geometries: a fraction of 1.0 means that each input segment will be divided into a number of equal-length segments such that the minimum segment length in either input is equal to that length.
Increasing values of fraction reduce performance but increase accuracy of the calculated distance.
A reasonable fraction value is 0.25 (which corresponds to segmenting each input segment into quarters).

**Kind**: Exported member  
**Returns**: <code>number</code> - 1 on success, 0 on exception.  

| Param | Type | Description |
| --- | --- | --- |
| g1 | <code>number</code> | Input geometry pointer. |
| g2 | <code>number</code> | Input geometry pointer. |
| densifyFrac | <code>number</code> | A fraction between 0 and 1 denoting the degree to which edges should be subdivided (smaller value means more subdivisions). |
| dist | <code>number</code> | Pointer to be filled in with distance result. |


---
<a name="exp_module_geos--geos.GEOSHausdorffDistanceDensify_r"></a>

## geos.GEOSHausdorffDistanceDensify\_r ⇒ <code>number</code> ⏏
Computes the Hausdorff distance between two geometries, densifying them by a given fraction.
The Hausdorff distance is a measure of how similar or dissimilar two geometries are.
It is the greatest distance between any point in one geometry and the closest point in the other geometry.
Densifying the geometries involves inserting extra vertices along every line segment so that
the total length of the segments is increased by a given fraction.

**Kind**: Exported member  
**Returns**: <code>number</code> - 1 on success, 0 on exception.  
**See**

- https://libgeos.org/doxygen/classgeos_1_1algorithm_1_1distance_1_1DiscreteHausdorffDistance.html
- https://gis.stackexchange.com/questions/253067/directed-hausdorff-distance-in-postgis


| Param | Type | Description |
| --- | --- | --- |
| handle | <code>number</code> | A pointer to the GEOS context handle. |
| g1 | <code>number</code> | The first geometry. |
| g2 | <code>number</code> | The second geometry. |
| densifyFrac | <code>number</code> | The fraction by which to densify each segment. Must be between 0 and 1. |
| distance | <code>number</code> | A pointer to a double to store the computed distance. |


---
<a name="exp_module_geos--geos.GEOSHausdorffDistance_r"></a>

## geos.GEOSHausdorffDistance\_r ⇒ <code>number</code> ⏏
Computes the Hausdorff distance between two geometries.
The Hausdorff distance is a measure of how similar or dissimilar two geometries are.
It is the greatest distance between any point in one geometry and the closest point in the other geometry.
The smaller the Hausdorff distance, the more similar the geometries are.
This is a thread-safe version of GEOSHausdorffDistance.

**Kind**: Exported member  
**Returns**: <code>number</code> - 1 on success, 0 on exception.  

| Param | Type | Description |
| --- | --- | --- |
| handle | <code>number</code> | The context handle.pointer |
| g1 | <code>number</code> | Input geometry pointer. |
| g2 | <code>number</code> | Input geometry pointer. |
| dist | <code>number</code> | Pointer to be filled in with distance result. |


---
