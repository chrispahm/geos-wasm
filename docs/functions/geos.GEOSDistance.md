<a name="exp_module_geos--geos.GEOSDistance"></a>

## geos.GEOSDistance ⇒ <code>number</code> ⏏
Calculate the distance between two geometries.

**Kind**: global property of [<code>geos</code>](/typedefs-enums/typedefs-enums.html#module_geos)  
**Returns**: <code>number</code> - 1 on success, 0 on exception.  

| Param | Type | Description |
| --- | --- | --- |
| g1 | [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) | Input geometry |
| g2 | [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) | Input geometry |
| dist | [<code>NumberPointer</code>](/typedefs-enums/typedefs-enums.html#NumberPointer) | Pointer to be filled in with distance result |


---
<a name="exp_module_geos--geos.GEOSDistanceIndexed"></a>

## geos.GEOSDistanceIndexed ⇒ <code>number</code> ⏏
Calculate the distance between two geometries, using the indexed facet distance, which first indexes the geometries internally, then calculates the distance. Useful when one or both geometries is very large.

**Kind**: global property of [<code>geos</code>](/typedefs-enums/typedefs-enums.html#module_geos)  
**Returns**: <code>number</code> - 1 on success, 0 on exception.  

| Param | Type | Description |
| --- | --- | --- |
| g1 | [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) | Input geometry |
| g2 | [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) | Input geometry |
| dist | [<code>NumberPointer</code>](/typedefs-enums/typedefs-enums.html#NumberPointer) | Pointer to be filled in with distance result |


---
<a name="exp_module_geos--geos.GEOSDistanceIndexed_r"></a>

## geos.GEOSDistanceIndexed\_r ⇒ <code>number</code> ⏏
Calculate the distance between two geometries, using the indexed facet distance, which first indexes the geometries internally, then calculates the distance. Useful when one or both geometries is very large.

**Kind**: global property of [<code>geos</code>](/typedefs-enums/typedefs-enums.html#module_geos)  
**Returns**: <code>number</code> - 1 on success, 0 on exception.  

| Param | Type | Description |
| --- | --- | --- |
| handle | [<code>GEOSContextHandle\_t</code>](/typedefs-enums/typedefs-enums.html#GEOSContextHandle_t) | - |
| g1 | [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) | Input geometry |
| g2 | [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) | Input geometry |
| dist | [<code>NumberPointer</code>](/typedefs-enums/typedefs-enums.html#NumberPointer) | Pointer to be filled in with distance result |


---
<a name="exp_module_geos--geos.GEOSDistanceWithin"></a>

## geos.GEOSDistanceWithin ⇒ <code>number</code> ⏏
Test whether the distance between two geometries is within the given dist.

**Kind**: global property of [<code>geos</code>](/typedefs-enums/typedefs-enums.html#module_geos)  
**Returns**: <code>number</code> - 1 on true, 0 on false, 2 on exception  

| Param | Type | Description |
| --- | --- | --- |
| g1 | [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) | Input geometry |
| g2 | [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) | Input geometry |
| dist | <code>number</code> | The max distance |


---
<a name="exp_module_geos--geos.GEOSDistanceWithin_r"></a>

## geos.GEOSDistanceWithin\_r ⇒ <code>number</code> ⏏
Test whether the distance between two geometries is within the given dist.

**Kind**: global property of [<code>geos</code>](/typedefs-enums/typedefs-enums.html#module_geos)  
**Returns**: <code>number</code> - 1 on true, 0 on false, 2 on exception  

| Param | Type | Description |
| --- | --- | --- |
| handle | [<code>GEOSContextHandle\_t</code>](/typedefs-enums/typedefs-enums.html#GEOSContextHandle_t) | - |
| g1 | [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) | Input geometry |
| g2 | [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) | Input geometry |
| dist | <code>number</code> | The max distance |


---
<a name="exp_module_geos--geos.GEOSDistance_r"></a>

## geos.GEOSDistance\_r ⇒ <code>number</code> ⏏
Calculate the distance between two geometries.

**Kind**: global property of [<code>geos</code>](/typedefs-enums/typedefs-enums.html#module_geos)  
**Returns**: <code>number</code> - 1 on success, 0 on exception.  

| Param | Type | Description |
| --- | --- | --- |
| handle | [<code>GEOSContextHandle\_t</code>](/typedefs-enums/typedefs-enums.html#GEOSContextHandle_t) | - |
| g1 | [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) | Input geometry |
| g2 | [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) | Input geometry |
| dist | [<code>NumberPointer</code>](/typedefs-enums/typedefs-enums.html#NumberPointer) | Pointer to be filled in with distance result |


---
