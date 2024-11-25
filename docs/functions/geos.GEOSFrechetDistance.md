<a name="exp_module_geos--geos.GEOSFrechetDistance"></a>

## geos.GEOSFrechetDistance ⇒ <code>number</code> ⏏
Calculate the Frechet distance between two geometries, a similarity measure for linear features.

**Kind**: global property of [<code>geos</code>](/typedefs-enums/typedefs-enums.html#module_geos)  
**Returns**: <code>number</code> - 1 on success, 0 on exception.  

| Param | Type | Description |
| --- | --- | --- |
| g1 | [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) | Input geometry |
| g2 | [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) | Input geometry |
| dist | [<code>NumberPointer</code>](/typedefs-enums/typedefs-enums.html#NumberPointer) | Pointer to be filled in with distance result |


---
<a name="exp_module_geos--geos.GEOSFrechetDistanceDensify"></a>

## geos.GEOSFrechetDistanceDensify ⇒ <code>number</code> ⏏
Calculate the Frechet distance between two geometries, a similarity measure for linear features. The inputs can be densified to provide a more accurate result.

**Kind**: global property of [<code>geos</code>](/typedefs-enums/typedefs-enums.html#module_geos)  
**Returns**: <code>number</code> - 1 on success, 0 on exception.  

| Param | Type | Description |
| --- | --- | --- |
| g1 | [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) | Input geometry |
| g2 | [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) | Input geometry |
| densifyFrac | <code>number</code> | The largest % of the overall line length that any given two-point segment should be |
| dist | [<code>NumberPointer</code>](/typedefs-enums/typedefs-enums.html#NumberPointer) | Pointer to be filled in with distance result |


---
<a name="exp_module_geos--geos.GEOSFrechetDistanceDensify_r"></a>

## geos.GEOSFrechetDistanceDensify\_r ⇒ <code>number</code> ⏏
Calculate the Frechet distance between two geometries, a similarity measure for linear features. The inputs can be densified to provide a more accurate result.

**Kind**: global property of [<code>geos</code>](/typedefs-enums/typedefs-enums.html#module_geos)  
**Returns**: <code>number</code> - 1 on success, 0 on exception.  

| Param | Type | Description |
| --- | --- | --- |
| handle | [<code>GEOSContextHandle\_t</code>](/typedefs-enums/typedefs-enums.html#GEOSContextHandle_t) | - |
| g1 | [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) | Input geometry |
| g2 | [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) | Input geometry |
| densifyFrac | <code>number</code> | The largest % of the overall line length that any given two-point segment should be |
| dist | [<code>NumberPointer</code>](/typedefs-enums/typedefs-enums.html#NumberPointer) | Pointer to be filled in with distance result |


---
<a name="exp_module_geos--geos.GEOSFrechetDistance_r"></a>

## geos.GEOSFrechetDistance\_r ⇒ <code>number</code> ⏏
Calculate the Frechet distance between two geometries, a similarity measure for linear features.

**Kind**: global property of [<code>geos</code>](/typedefs-enums/typedefs-enums.html#module_geos)  
**Returns**: <code>number</code> - 1 on success, 0 on exception.  

| Param | Type | Description |
| --- | --- | --- |
| handle | [<code>GEOSContextHandle\_t</code>](/typedefs-enums/typedefs-enums.html#GEOSContextHandle_t) | - |
| g1 | [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) | Input geometry |
| g2 | [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) | Input geometry |
| dist | [<code>NumberPointer</code>](/typedefs-enums/typedefs-enums.html#NumberPointer) | Pointer to be filled in with distance result |


---
