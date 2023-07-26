<a name="exp_module_geos--geos.GEOSFrechetDistance"></a>

## geos.GEOSFrechetDistance ⇒ <code>number</code> ⏏
Computes the Fréchet distance between two geometries.
The Fréchet distance is a measure of similarity between curves that takes into account
the location and ordering of the points along the curves.
It is defined as the minimum length of a leash that connects a dog and its owner who walk along their respective curves,
without backtracking, from one end to the other end.

**Kind**: Exported member  
**Returns**: <code>number</code> - 1 on success, 0 on exception.  
**See**

- https://en.wikipedia.org/wiki/Fr%C3%A9chet_distance
- https://libgeos.org/doxygen/classgeos_1_1algorithm_1_1distance_1_1DiscreteFrechetDistance.html


| Param | Type | Description |
| --- | --- | --- |
| g1 | <code>number</code> | The first geometry. |
| g2 | <code>number</code> | The second geometry. |
| distance | <code>number</code> | A pointer to a double to store the computed distance. |


---
<a name="exp_module_geos--geos.GEOSFrechetDistanceDensify"></a>

## geos.GEOSFrechetDistanceDensify ⇒ <code>number</code> ⏏
Computes the Fréchet distance between two geometries, densifying them by a given fraction.
The Fréchet distance is a measure of similarity between curves that takes into account
the location and ordering of the points along the curves.
It is defined as the minimum length of a leash that connects a dog and its owner who walk along their respective curves,
without backtracking, from one end to the other end.
Densifying the geometries involves inserting extra vertices along every line segment so that
the total length of the segments is increased by a given fraction.

**Kind**: Exported member  
**Returns**: <code>number</code> - 1 on success, 0 on exception.  
**See**

- https://en.wikipedia.org/wiki/Fr%C3%A9chet_distance
- https://libgeos.org/doxygen/classgeos_1_1algorithm_1_1distance_1_1DiscreteFrechetDistance.html
- https://r-spatial.github.io/sf/reference/geos_measures.html


| Param | Type | Description |
| --- | --- | --- |
| g1 | <code>number</code> | The first geometry. |
| g2 | <code>number</code> | The second geometry. |
| densifyFrac | <code>number</code> | The fraction by which to densify each segment. Must be between 0 and 1. |
| distance | <code>number</code> | A pointer to a double to store the computed distance. |


---
<a name="exp_module_geos--geos.GEOSFrechetDistanceDensify_r"></a>

## geos.GEOSFrechetDistanceDensify\_r ⇒ <code>number</code> ⏏
Computes the Fréchet distance between two geometries using a GEOS context handle, densifying them by a given fraction.
The Fréchet distance is a measure of similarity between curves that takes into account
the location and ordering of the points along the curves.
It is defined as the minimum length of a leash that connects a dog and its owner who walk along their respective curves,
without backtracking, from one end to the other end.
Densifying the geometries involves inserting extra vertices along every line segment so that
the total length of the segments is increased by a given fraction.

**Kind**: Exported member  
**Returns**: <code>number</code> - 1 on success, 0 on exception.  
**See**

- https://en.wikipedia.org/wiki/Fr%C3%A9chet_distance
- https://libgeos.org/doxygen/classgeos_1_1algorithm_1_1distance_1_1DiscreteFrechetDistance.html
- https://r-spatial.github.io/sf/reference/geos_measures.html


| Param | Type | Description |
| --- | --- | --- |
| handle | <code>number</code> | A pointer to the GEOS context handle. |
| g1 | <code>number</code> | The first geometry. |
| g2 | <code>number</code> | The second geometry. |
| densifyFrac | <code>number</code> | The fraction by which to densify each segment. Must be between 0 and 1. |
| distance | <code>number</code> | A pointer to a double to store the computed distance. |


---
<a name="exp_module_geos--geos.GEOSFrechetDistance_r"></a>

## geos.GEOSFrechetDistance\_r ⇒ <code>number</code> ⏏
Computes the Fréchet distance between two geometries using a GEOS context handle.
The Fréchet distance is a measure of similarity between curves that takes into account
the location and ordering of the points along the curves.
It is defined as the minimum length of a leash that connects a dog and its owner who walk along their respective curves,
without backtracking, from one end to the other end.

**Kind**: Exported member  
**Returns**: <code>number</code> - 1 on success, 0 on exception.  
**See**

- https://en.wikipedia.org/wiki/Fr%C3%A9chet_distance
- https://libgeos.org/doxygen/classgeos_1_1algorithm_1_1distance_1_1DiscreteFrechetDistance.html


| Param | Type | Description |
| --- | --- | --- |
| handle | <code>number</code> | A pointer to the GEOS context handle. |
| g1 | <code>number</code> | The first geometry. |
| g2 | <code>number</code> | The second geometry. |
| distance | <code>number</code> | A pointer to a double to store the computed distance. |


---
