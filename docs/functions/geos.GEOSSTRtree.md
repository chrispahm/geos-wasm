<a name="exp_module_geos--geos.GEOSSTRtree_build"></a>

## geos.GEOSSTRtree\_build ⇒ <code>number</code> ⏏
Construct an STRtree from items that have been inserted. Once constructed, no more items may be inserted into the tree. Functions that require a constructed tree will build it automatically, so there is no need to call GEOSSTRtree_build unless it is desired to explicitly construct the tree in a certain section of code or using a certain thread.

**Kind**: global property of [<code>geos</code>](/typedefs-enums/typedefs-enums.html#module_geos)  
**Returns**: <code>number</code> - 1 on success, 0 on error  

| Param | Type | Description |
| --- | --- | --- |
| tree | [<code>GEOSSTRtree</code>](/typedefs-enums/typedefs-enums.html#GEOSSTRtree) | the GEOSSTRtree to apply the build to |


---
<a name="exp_module_geos--geos.GEOSSTRtree_build_r"></a>

## geos.GEOSSTRtree\_build\_r ⇒ <code>number</code> ⏏
Construct an STRtree from items that have been inserted. Once constructed, no more items may be inserted into the tree. Functions that require a constructed tree will build it automatically, so there is no need to call GEOSSTRtree_build unless it is desired to explicitly construct the tree in a certain section of code or using a certain thread.

**Kind**: global property of [<code>geos</code>](/typedefs-enums/typedefs-enums.html#module_geos)  
**Returns**: <code>number</code> - 1 on success, 0 on error  

| Param | Type | Description |
| --- | --- | --- |
| handle | [<code>GEOSContextHandle\_t</code>](/typedefs-enums/typedefs-enums.html#GEOSContextHandle_t) | - |
| tree | [<code>GEOSSTRtree</code>](/typedefs-enums/typedefs-enums.html#GEOSSTRtree) | the GEOSSTRtree to apply the build to |


---
<a name="exp_module_geos--geos.GEOSSTRtree_create"></a>

## geos.GEOSSTRtree\_create ⇒ [<code>GEOSSTRtree</code>](/typedefs-enums/typedefs-enums.html#GEOSSTRtree) ⏏
Create a new GEOSSTRtree using the Sort-Tile-Recursive algorithm (STRtree) for two-dimensional spatial data.

**Kind**: global property of [<code>geos</code>](/typedefs-enums/typedefs-enums.html#module_geos)  
**Returns**: [<code>GEOSSTRtree</code>](/typedefs-enums/typedefs-enums.html#GEOSSTRtree) - a pointer to the created tree  

| Param | Type | Description |
| --- | --- | --- |
| nodeCapacity | <code>number</code> | The maximum number of child nodes that a node may have. The minimum recommended capacity value is 4. If unsure, use a default node capacity of 10. |


---
<a name="exp_module_geos--geos.GEOSSTRtree_create_r"></a>

## geos.GEOSSTRtree\_create\_r ⇒ [<code>GEOSSTRtree</code>](/typedefs-enums/typedefs-enums.html#GEOSSTRtree) ⏏
Create a new GEOSSTRtree using the Sort-Tile-Recursive algorithm (STRtree) for two-dimensional spatial data.

**Kind**: global property of [<code>geos</code>](/typedefs-enums/typedefs-enums.html#module_geos)  
**Returns**: [<code>GEOSSTRtree</code>](/typedefs-enums/typedefs-enums.html#GEOSSTRtree) - a pointer to the created tree  

| Param | Type | Description |
| --- | --- | --- |
| handle | [<code>GEOSContextHandle\_t</code>](/typedefs-enums/typedefs-enums.html#GEOSContextHandle_t) | - |
| nodeCapacity | <code>number</code> | The maximum number of child nodes that a node may have. The minimum recommended capacity value is 4. If unsure, use a default node capacity of 10. |


---
<a name="exp_module_geos--geos.GEOSSTRtree_destroy"></a>

## geos.GEOSSTRtree\_destroy ⇒ <code>null</code> ⏏
Frees all the memory associated with a GEOSSTRtree. Only the tree is freed. The geometries and items fed into GEOSSTRtree_insert() are not owned by the tree, and are still left to the caller to manage.

**Kind**: global property of [<code>geos</code>](/typedefs-enums/typedefs-enums.html#module_geos)  
**Returns**: <code>null</code> - void  

| Param | Type | Description |
| --- | --- | --- |
| tree | [<code>GEOSSTRtree</code>](/typedefs-enums/typedefs-enums.html#GEOSSTRtree) | the GEOSSTRtree to destroy |


---
<a name="exp_module_geos--geos.GEOSSTRtree_destroy_r"></a>

## geos.GEOSSTRtree\_destroy\_r ⇒ <code>null</code> ⏏
Frees all the memory associated with a GEOSSTRtree. Only the tree is freed. The geometries and items fed into GEOSSTRtree_insert() are not owned by the tree, and are still left to the caller to manage.

**Kind**: global property of [<code>geos</code>](/typedefs-enums/typedefs-enums.html#module_geos)  
**Returns**: <code>null</code> - void  

| Param | Type | Description |
| --- | --- | --- |
| handle | [<code>GEOSContextHandle\_t</code>](/typedefs-enums/typedefs-enums.html#GEOSContextHandle_t) | - |
| tree | [<code>GEOSSTRtree</code>](/typedefs-enums/typedefs-enums.html#GEOSSTRtree) | the GEOSSTRtree to destroy |


---
<a name="exp_module_geos--geos.GEOSSTRtree_insert"></a>

## geos.GEOSSTRtree\_insert ⇒ <code>null</code> ⏏
Insert an item into an GEOSSTRtree

**Kind**: global property of [<code>geos</code>](/typedefs-enums/typedefs-enums.html#module_geos)  
**Returns**: <code>null</code> - void  

| Param | Type | Description |
| --- | --- | --- |
| tree | [<code>GEOSSTRtree</code>](/typedefs-enums/typedefs-enums.html#GEOSSTRtree) | the GEOSSTRtree in which the item should be inserted |
| g | [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) | a GEOSGeometry whose envelope corresponds to the extent of 'item'. As of GEOS 3.9, this envelope will be copied into the tree and the caller may destroy g while the tree is still in use. Before GEOS 3.9, g must be retained until the tree is destroyed. |
| item | [<code>Pointer</code>](/typedefs-enums/typedefs-enums.html#Pointer) | the item to insert into the tree |


---
<a name="exp_module_geos--geos.GEOSSTRtree_insert_r"></a>

## geos.GEOSSTRtree\_insert\_r ⇒ <code>null</code> ⏏
Insert an item into an GEOSSTRtree

**Kind**: global property of [<code>geos</code>](/typedefs-enums/typedefs-enums.html#module_geos)  
**Returns**: <code>null</code> - void  

| Param | Type | Description |
| --- | --- | --- |
| handle | [<code>GEOSContextHandle\_t</code>](/typedefs-enums/typedefs-enums.html#GEOSContextHandle_t) | - |
| tree | [<code>GEOSSTRtree</code>](/typedefs-enums/typedefs-enums.html#GEOSSTRtree) | the GEOSSTRtree in which the item should be inserted |
| g | [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) | a GEOSGeometry whose envelope corresponds to the extent of 'item'. As of GEOS 3.9, this envelope will be copied into the tree and the caller may destroy g while the tree is still in use. Before GEOS 3.9, g must be retained until the tree is destroyed. |
| item | [<code>Pointer</code>](/typedefs-enums/typedefs-enums.html#Pointer) | the item to insert into the tree |


---
<a name="exp_module_geos--geos.GEOSSTRtree_iterate"></a>

## geos.GEOSSTRtree\_iterate ⇒ <code>null</code> ⏏
Iterate over all items in the GEOSSTRtree. This will not cause the tree to be constructed.

**Kind**: global property of [<code>geos</code>](/typedefs-enums/typedefs-enums.html#module_geos)  
**Returns**: <code>null</code> - void  

| Param | Type | Description |
| --- | --- | --- |
| tree | [<code>GEOSSTRtree</code>](/typedefs-enums/typedefs-enums.html#GEOSSTRtree) | the STRtree over which to iterate |
| callback | [<code>GEOSQueryCallback</code>](/typedefs-enums/typedefs-enums.html#GEOSQueryCallback) | a function to be executed for each item in the tree. |
| userdata | [<code>Pointer</code>](/typedefs-enums/typedefs-enums.html#Pointer) | payload to pass the callback function. |


---
<a name="exp_module_geos--geos.GEOSSTRtree_iterate_r"></a>

## geos.GEOSSTRtree\_iterate\_r ⇒ <code>null</code> ⏏
Iterate over all items in the GEOSSTRtree. This will not cause the tree to be constructed.

**Kind**: global property of [<code>geos</code>](/typedefs-enums/typedefs-enums.html#module_geos)  
**Returns**: <code>null</code> - void  

| Param | Type | Description |
| --- | --- | --- |
| handle | [<code>GEOSContextHandle\_t</code>](/typedefs-enums/typedefs-enums.html#GEOSContextHandle_t) | - |
| tree | [<code>GEOSSTRtree</code>](/typedefs-enums/typedefs-enums.html#GEOSSTRtree) | the STRtree over which to iterate |
| callback | [<code>GEOSQueryCallback</code>](/typedefs-enums/typedefs-enums.html#GEOSQueryCallback) | a function to be executed for each item in the tree. |
| userdata | [<code>Pointer</code>](/typedefs-enums/typedefs-enums.html#Pointer) | payload to pass the callback function. |


---
<a name="exp_module_geos--geos.GEOSSTRtree_nearest"></a>

## geos.GEOSSTRtree\_nearest ⇒ <code>number</code> ⏏
Returns the nearest item in the GEOSSTRtree to the supplied geometry. All items in the tree MUST be of type GEOSGeometry. If this is not the case, use GEOSSTRtree_nearest_generic() instead. The tree will automatically be constructed if necessary, after which no more items may be added.

**Kind**: global property of [<code>geos</code>](/typedefs-enums/typedefs-enums.html#module_geos)  
**Returns**: <code>number</code> - a const pointer to the nearest GEOSGeometry in the tree to 'geom', or NULL in case of exception  

| Param | Type | Description |
| --- | --- | --- |
| tree | [<code>GEOSSTRtree</code>](/typedefs-enums/typedefs-enums.html#GEOSSTRtree) | the GEOSSTRtree to search |
| geom | [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) | the geometry with which the tree should be queried |


---
<a name="exp_module_geos--geos.GEOSSTRtree_nearest_generic"></a>

## geos.GEOSSTRtree\_nearest\_generic ⇒ <code>number</code> ⏏
Returns the nearest item in the GEOSSTRtree to the supplied item The tree will automatically be constructed if necessary, after which no more items may be added.

**Kind**: global property of [<code>geos</code>](/typedefs-enums/typedefs-enums.html#module_geos)  
**Returns**: <code>number</code> - a const pointer to the nearest item in the tree to item, or NULL in case of exception  

| Param | Type | Description |
| --- | --- | --- |
| tree | [<code>GEOSSTRtree</code>](/typedefs-enums/typedefs-enums.html#GEOSSTRtree) | the STRtree to search |
| item | [<code>Pointer</code>](/typedefs-enums/typedefs-enums.html#Pointer) | the item with which the tree should be queried |
| itemEnvelope | [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) | a GEOSGeometry having the bounding box of 'item' |
| distancefn | [<code>GEOSDistanceCallback</code>](/typedefs-enums/typedefs-enums.html#GEOSDistanceCallback) | a function that can compute the distance between two items in the STRtree. The function should return zero in case of error, and should store the computed distance to the location pointed to by the distance argument. The computed distance between two items must not exceed the Cartesian distance between their envelopes. |
| userdata | [<code>Pointer</code>](/typedefs-enums/typedefs-enums.html#Pointer) | optional pointer to arbitrary data; will be passed to distancefn each time it is called. |


---
<a name="exp_module_geos--geos.GEOSSTRtree_nearest_generic_r"></a>

## geos.GEOSSTRtree\_nearest\_generic\_r ⇒ <code>number</code> ⏏
Returns the nearest item in the GEOSSTRtree to the supplied item The tree will automatically be constructed if necessary, after which no more items may be added.

**Kind**: global property of [<code>geos</code>](/typedefs-enums/typedefs-enums.html#module_geos)  
**Returns**: <code>number</code> - a const pointer to the nearest item in the tree to item, or NULL in case of exception  

| Param | Type | Description |
| --- | --- | --- |
| handle | [<code>GEOSContextHandle\_t</code>](/typedefs-enums/typedefs-enums.html#GEOSContextHandle_t) | - |
| tree | [<code>GEOSSTRtree</code>](/typedefs-enums/typedefs-enums.html#GEOSSTRtree) | the STRtree to search |
| item | [<code>Pointer</code>](/typedefs-enums/typedefs-enums.html#Pointer) | the item with which the tree should be queried |
| itemEnvelope | [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) | a GEOSGeometry having the bounding box of 'item' |
| distancefn | [<code>GEOSDistanceCallback</code>](/typedefs-enums/typedefs-enums.html#GEOSDistanceCallback) | a function that can compute the distance between two items in the STRtree. The function should return zero in case of error, and should store the computed distance to the location pointed to by the distance argument. The computed distance between two items must not exceed the Cartesian distance between their envelopes. |
| userdata | [<code>Pointer</code>](/typedefs-enums/typedefs-enums.html#Pointer) | optional pointer to arbitrary data; will be passed to distancefn each time it is called. |


---
<a name="exp_module_geos--geos.GEOSSTRtree_nearest_r"></a>

## geos.GEOSSTRtree\_nearest\_r ⇒ <code>number</code> ⏏
Returns the nearest item in the GEOSSTRtree to the supplied geometry. All items in the tree MUST be of type GEOSGeometry. If this is not the case, use GEOSSTRtree_nearest_generic() instead. The tree will automatically be constructed if necessary, after which no more items may be added.

**Kind**: global property of [<code>geos</code>](/typedefs-enums/typedefs-enums.html#module_geos)  
**Returns**: <code>number</code> - a const pointer to the nearest GEOSGeometry in the tree to 'geom', or NULL in case of exception  

| Param | Type | Description |
| --- | --- | --- |
| handle | [<code>GEOSContextHandle\_t</code>](/typedefs-enums/typedefs-enums.html#GEOSContextHandle_t) | - |
| tree | [<code>GEOSSTRtree</code>](/typedefs-enums/typedefs-enums.html#GEOSSTRtree) | the GEOSSTRtree to search |
| geom | [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) | the geometry with which the tree should be queried |


---
<a name="exp_module_geos--geos.GEOSSTRtree_query"></a>

## geos.GEOSSTRtree\_query ⇒ <code>null</code> ⏏
Query a GEOSSTRtree for items intersecting a specified envelope. The tree will automatically be constructed if necessary, after which no more items may be added.

**Kind**: global property of [<code>geos</code>](/typedefs-enums/typedefs-enums.html#module_geos)  
**Returns**: <code>null</code> - void  

| Param | Type | Description |
| --- | --- | --- |
| tree | [<code>GEOSSTRtree</code>](/typedefs-enums/typedefs-enums.html#GEOSSTRtree) | the GEOSSTRtree to search |
| g | [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) | a GEOSGeomety from which a query envelope will be extracted |
| callback | [<code>GEOSQueryCallback</code>](/typedefs-enums/typedefs-enums.html#GEOSQueryCallback) | a function to be executed for each item in the tree whose envelope intersects the envelope of 'g'. The callback function should take two parameters: a void pointer representing the located item in the tree, and a void userdata pointer. |
| userdata | [<code>Pointer</code>](/typedefs-enums/typedefs-enums.html#Pointer) | an optional pointer to pe passed to callback as an argument |


---
<a name="exp_module_geos--geos.GEOSSTRtree_query_r"></a>

## geos.GEOSSTRtree\_query\_r ⇒ <code>null</code> ⏏
Query a GEOSSTRtree for items intersecting a specified envelope. The tree will automatically be constructed if necessary, after which no more items may be added.

**Kind**: global property of [<code>geos</code>](/typedefs-enums/typedefs-enums.html#module_geos)  
**Returns**: <code>null</code> - void  

| Param | Type | Description |
| --- | --- | --- |
| handle | [<code>GEOSContextHandle\_t</code>](/typedefs-enums/typedefs-enums.html#GEOSContextHandle_t) | - |
| tree | [<code>GEOSSTRtree</code>](/typedefs-enums/typedefs-enums.html#GEOSSTRtree) | the GEOSSTRtree to search |
| g | [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) | a GEOSGeomety from which a query envelope will be extracted |
| callback | [<code>GEOSQueryCallback</code>](/typedefs-enums/typedefs-enums.html#GEOSQueryCallback) | a function to be executed for each item in the tree whose envelope intersects the envelope of 'g'. The callback function should take two parameters: a void pointer representing the located item in the tree, and a void userdata pointer. |
| userdata | [<code>Pointer</code>](/typedefs-enums/typedefs-enums.html#Pointer) | an optional pointer to pe passed to callback as an argument |


---
<a name="exp_module_geos--geos.GEOSSTRtree_remove"></a>

## geos.GEOSSTRtree\_remove ⇒ <code>number</code> ⏏
Removes an item from the GEOSSTRtree The tree will automatically be constructed if necessary, after which no more items may be added.

**Kind**: global property of [<code>geos</code>](/typedefs-enums/typedefs-enums.html#module_geos)  
**Returns**: <code>number</code> - 0 if the item was not removed; 1 if the item was removed; 2 if an exception occurred  

| Param | Type | Description |
| --- | --- | --- |
| tree | [<code>GEOSSTRtree</code>](/typedefs-enums/typedefs-enums.html#GEOSSTRtree) | the STRtree from which to remove an item |
| g | [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) | the envelope of the item to remove |
| item | [<code>Pointer</code>](/typedefs-enums/typedefs-enums.html#Pointer) | the item to remove |


---
<a name="exp_module_geos--geos.GEOSSTRtree_remove_r"></a>

## geos.GEOSSTRtree\_remove\_r ⇒ <code>number</code> ⏏
Removes an item from the GEOSSTRtree The tree will automatically be constructed if necessary, after which no more items may be added.

**Kind**: global property of [<code>geos</code>](/typedefs-enums/typedefs-enums.html#module_geos)  
**Returns**: <code>number</code> - 0 if the item was not removed; 1 if the item was removed; 2 if an exception occurred  

| Param | Type | Description |
| --- | --- | --- |
| handle | [<code>GEOSContextHandle\_t</code>](/typedefs-enums/typedefs-enums.html#GEOSContextHandle_t) | - |
| tree | [<code>GEOSSTRtree</code>](/typedefs-enums/typedefs-enums.html#GEOSSTRtree) | the STRtree from which to remove an item |
| g | [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) | the envelope of the item to remove |
| item | [<code>Pointer</code>](/typedefs-enums/typedefs-enums.html#Pointer) | the item to remove |


---
