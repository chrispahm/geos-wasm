<a name="exp_module_geos--geos.GEOSHausdorffDistance"></a>

## geos.GEOSHausdorffDistance ⇒ <code>number</code> ⏏
Calculate the Hausdorff distance between two geometries. Hausdorff distance is the largest distance between two geometries.

**Kind**: global property of [<code>geos</code>](/typedefs-enums/typedefs-enums.html#module_geos)  
**Returns**: <code>number</code> - 1 on success, 0 on exception.  

| Param | Type | Description |
| --- | --- | --- |
| g1 | [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) | Input geometry |
| g2 | [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) | Input geometry |
| dist | [<code>NumberPointer</code>](/typedefs-enums/typedefs-enums.html#NumberPointer) | Pointer to be filled in with distance result |


---
<a name="exp_module_geos--geos.GEOSHausdorffDistanceDensify"></a>

## geos.GEOSHausdorffDistanceDensify ⇒ <code>number</code> ⏏
Calculate a more precise Hausdorff distance between two geometries, by densifying the inputs before computation. Hausdorff distance is the largest distance between two geometries.

**Kind**: global property of [<code>geos</code>](/typedefs-enums/typedefs-enums.html#module_geos)  
**Returns**: <code>number</code> - 1 on success, 0 on exception.  

| Param | Type | Description |
| --- | --- | --- |
| g1 | [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) | Input geometry |
| g2 | [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) | Input geometry |
| densifyFrac | <code>number</code> | The largest % of the overall line length that any given two-point segment should be |
| dist | [<code>NumberPointer</code>](/typedefs-enums/typedefs-enums.html#NumberPointer) | Pointer to be filled in with distance result |


---
<a name="exp_module_geos--geos.GEOSHausdorffDistanceDensify_r"></a>

## geos.GEOSHausdorffDistanceDensify\_r ⇒ <code>number</code> ⏏
Calculate a more precise Hausdorff distance between two geometries, by densifying the inputs before computation. Hausdorff distance is the largest distance between two geometries.

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
<a name="exp_module_geos--geos.GEOSHausdorffDistance_r"></a>

## geos.GEOSHausdorffDistance\_r ⇒ <code>number</code> ⏏
Calculate the Hausdorff distance between two geometries. Hausdorff distance is the largest distance between two geometries.

**Kind**: global property of [<code>geos</code>](/typedefs-enums/typedefs-enums.html#module_geos)  
**Returns**: <code>number</code> - 1 on success, 0 on exception.  

| Param | Type | Description |
| --- | --- | --- |
| handle | [<code>GEOSContextHandle\_t</code>](/typedefs-enums/typedefs-enums.html#GEOSContextHandle_t) | - |
| g1 | [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) | Input geometry |
| g2 | [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) | Input geometry |
| dist | [<code>NumberPointer</code>](/typedefs-enums/typedefs-enums.html#NumberPointer) | Pointer to be filled in with distance result |


---
