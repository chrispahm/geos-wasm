<a name="exp_module_geos--geos.GEOSSTRtree_build"></a>

## geos.GEOSSTRtree\_build ⇒ <code>number</code> ⏏
Construct an STRtree from items that have been inserted. Once constructed,
no more items may be inserted into the tree. Functions that require a
constructed tree will build it automatically, so there is no need to call
`GEOSSTRtree_build` unless it is desired to explicity construct the tree
in a certain section of code or using a certain thread.

**Kind**: Exported member  
**Returns**: <code>number</code> - 1 on success, 0 on error  

---
<a name="exp_module_geos--geos.GEOSSTRtree_build_r"></a>

## geos.GEOSSTRtree\_build\_r ⇒ <code>number</code> ⏏
Construct an STRtree from items that have been inserted. Once constructed,
no more items may be inserted into the tree. Functions that require a
constructed tree will build it automatically, so there is no need to call
`GEOSSTRtree_build` unless it is desired to explicity construct the tree
in a certain section of code or using a certain thread.

**Kind**: Exported member  
**Returns**: <code>number</code> - 1 on success, 0 on error  

| Param | Type | Description |
| --- | --- | --- |
| handle | <code>number</code> | The context handle to use for error reporting and memory management. |


---
<a name="exp_module_geos--geos.GEOSSTRtree_create"></a>

## geos.GEOSSTRtree\_create ⇒ <code>number</code> ⏏
Creates a GEOS STRTree, a spatial index for quickly querying geometries by their bounding boxes.

**Kind**: Exported member  
**Returns**: <code>number</code> - A pointer to the GEOS STRTree object.  

| Param | Type | Description |
| --- | --- | --- |
| nodeCapacity | <code>number</code> | The maximum number of child nodes that a node may have. The minimum recommended capacity value is 4. If unsure, use a default node capacity of 10. |


---
<a name="exp_module_geos--geos.GEOSSTRtree_create_r"></a>

## geos.GEOSSTRtree\_create\_r ⇒ <code>number</code> ⏏
Creates a GEOS STRTree with a context handle, a spatial index for quickly querying geometries by their bounding boxes.

**Kind**: Exported member  
**Returns**: <code>number</code> - A pointer to the GEOS STRTree object.  

| Param | Type | Description |
| --- | --- | --- |
| handle | <code>number</code> | The context handle to use for error reporting and memory management. |
| nodeCapacity | <code>number</code> | The maximum number of child nodes that a node may have. The minimum recommended capacity value is 4. If unsure, use a default node capacity of 10. |


---
<a name="exp_module_geos--geos.GEOSSTRtree_destroy"></a>

## geos.GEOSSTRtree\_destroy ⏏
Destroys an STRtree and frees its memory.

**Kind**: Exported member  

| Param | Type | Description |
| --- | --- | --- |
| tree | <code>number</code> | A pointer to a GEOSSTRtree object. |


---
<a name="exp_module_geos--geos.GEOSSTRtree_destroy_r"></a>

## geos.GEOSSTRtree\_destroy\_r ⏏
Destroys a GEOSSTRtree spatial index.

**Kind**: Exported member  
**See**: https://libgeos.org/doxygen/geos__c_8h.html#a1323e  

| Param | Type | Description |
| --- | --- | --- |
| handle | <code>number</code> | A pointer to the GEOS context handle. |
| tree | <code>number</code> | The GEOSSTRtree pointer to destroy. |


---
<a name="exp_module_geos--geos.GEOSSTRtree_insert"></a>

## geos.GEOSSTRtree\_insert ⏏
Inserts a geometry into a GEOS STRTree, along with an associated item that can be retrieved later.

**Kind**: Exported member  

| Param | Type | Description |
| --- | --- | --- |
| tree | <code>number</code> | A pointer to the GEOS STRTree object. |
| g | <code>number</code> | A pointer to the GEOS geometry object to insert. |
| item | <code>number</code> | A pointer to the item associated with the geometry. This can be any arbitrary data that can be cast to a void pointer. |


---
<a name="exp_module_geos--geos.GEOSSTRtree_insert_r"></a>

## geos.GEOSSTRtree\_insert\_r ⏏
Inserts a geometry into a GEOS STRTree with a context handle, along with an associated item that can be retrieved later.

**Kind**: Exported member  

| Param | Type | Description |
| --- | --- | --- |
| handle | <code>number</code> | The context handle to use for error reporting and memory management. |
| tree | <code>number</code> | A pointer to the GEOS STRTree object. |
| g | <code>number</code> | A pointer to the GEOS geometry object to insert. |
| item | <code>number</code> | A pointer to the item associated with the geometry. This can be any arbitrary data that can be cast to a void pointer. |


---
<a name="exp_module_geos--geos.GEOSSTRtree_iterate"></a>

## geos.GEOSSTRtree\_iterate ⏏
Iterates over every item in an STRtree.

**Kind**: Exported member  

| Param | Type | Description |
| --- | --- | --- |
| tree | <code>number</code> | A pointer to a GEOSSTRtree object. |
| callback | <code>function</code> | A function to be called for each item in the tree. |
| userdata | <code>any</code> | An optional user data to be passed to the callback function. |


---
<a name="exp_module_geos--geos.GEOSSTRtree_iterate_r"></a>

## geos.GEOSSTRtree\_iterate\_r ⏏
Iterates over every item in an STRtree using a reentrant context handle.

**Kind**: Exported member  

| Param | Type | Description |
| --- | --- | --- |
| handle | <code>number</code> | A pointer to a GEOSpointer  context handle. |
| tree | <code>number</code> | A pointer to a GEOSSTRtree object. |
| callback | <code>function</code> | A function to be called for each item in the tree. |
| userdata | <code>any</code> | An optional user data to be passed to the callback function. |


---
<a name="exp_module_geos--geos.GEOSSTRtree_nearest"></a>

## geos.GEOSSTRtree\_nearest ⇒ <code>number</code> ⏏
Returns the item whose extent is nearest to the given geometry's envelope.

**Kind**: Exported member  
**Returns**: <code>number</code> - A pointer to the nearest item, or NULL if the tree is empty.  

| Param | Type | Description |
| --- | --- | --- |
| tree | <code>number</code> | The GEOSSTRtree to query. |
| geom | <code>number</code> | The GEOSGeometry whose envelope is used for querying. |


---
<a name="exp_module_geos--geos.GEOSSTRtree_nearest_generic"></a>

## geos.GEOSSTRtree\_nearest\_generic ⇒ <code>any</code> ⏏
Returns the item whose extent is nearest to the given item's envelope, using a custom distance function.

**Kind**: Exported member  
**Returns**: <code>any</code> - A pointer to the nearest item, or NULL if the tree is empty or an error occurred.  

| Param | Type | Description |
| --- | --- | --- |
| tree | <code>number</code> | The GEOSSTRtree to query. |
| item | <code>any</code> | The item whose envelope is used for querying. |
| itemEnvelope | <code>number</code> | The GEOSGeometry representing the envelope of the item. |
| distancefn | <code>function</code> | The GEOSDistanceCallback function to compute the distance between two items. |
| userdata | <code>any</code> | An optional pointer to user data that is passed to the distance function. |


---
<a name="exp_module_geos--geos.GEOSSTRtree_nearest_generic_r"></a>

## geos.GEOSSTRtree\_nearest\_generic\_r ⇒ <code>any</code> ⏏
Returns the item whose extent is nearest to the given item's envelope, using a custom distance function.

**Kind**: Exported member  
**Returns**: <code>any</code> - A pointer to the nearest item, or NULL if the tree is empty or an error occurred.  

| Param | Type | Description |
| --- | --- | --- |
| handle | <code>number</code> | A pointer to the GEOS context handle. |
| tree | <code>number</code> | The GEOSSTRtree to query. |
| item | <code>any</code> | The item whose envelope is used for querying. |
| itemEnvelope | <code>number</code> | The GEOSGeometry representing the envelope of the item. |
| distancefn | <code>function</code> | The GEOSDistanceCallback function to compute the distance between two items. |
| userdata | <code>any</code> | An optional pointer to user data that is passed to the distance function and the callback function. |


---
<a name="exp_module_geos--geos.GEOSSTRtree_nearest_r"></a>

## geos.GEOSSTRtree\_nearest\_r ⇒ <code>number</code> ⏏
Returns the item whose extent is nearest to the given geometry's envelope, using a custom distance function.

**Kind**: Exported member  
**Returns**: <code>number</code> - A pointer to the nearest item, or NULL if the tree is empty or an error occurred.  

| Param | Type | Description |
| --- | --- | --- |
| handle | <code>number</code> | A pointer to the GEOS context handle. |
| tree | <code>number</code> | The GEOSSTRtree to query. |
| geom | <code>number</code> | The GEOSGeometry whose envelope is used for querying. |


---
<a name="exp_module_geos--geos.GEOSSTRtree_query"></a>

## geos.GEOSSTRtree\_query ⏏
Queries a GEOS STRTree for all geometries whose bounding boxes intersect with the given geometry's bounding box, and calls a callback function for each matching pair.

**Kind**: Exported member  

| Param | Type | Description |
| --- | --- | --- |
| tree | <code>number</code> | A pointer to the GEOS STRTree object. |
| g | <code>number</code> | A pointer to the GEOS geometry object to query with. |
| callback | <code>function</code> | A function that takes two void pointers as arguments: one for the item associated with the tree geometry, and one for the user data passed to this function. The callback function is called for each matching pair of geometries in the tree and the query geometry. The callback function should return 1 to continue the query or 0 to stop it. |
| userdata | <code>any</code> | A pointer to any user data that needs to be passed to the callback function. This can be any arbitrary data that can be cast to a void pointer. |


---
<a name="exp_module_geos--geos.GEOSSTRtree_query_r"></a>

## geos.GEOSSTRtree\_query\_r ⏏
Queries the tree for all items whose extents intersect the given geometry's envelope and applies an
item visitor function to them.

**Kind**: Exported member  

| Param | Type | Description |
| --- | --- | --- |
| handle | <code>number</code> | A pointer to the GEOS context handle. |
| tree | <code>number</code> | The GEOSSTRtree to query. |
| g | <code>number</code> | The GEOSGeometry whose envelope is used for querying. |
| callback | <code>number</code> | The GEOSQueryCallback function to apply to the items found. |
| userdata | <code>number</code> | An optional pointer to user data that is passed to the callback function. |


---
<a name="exp_module_geos--geos.GEOSSTRtree_remove"></a>

## geos.GEOSSTRtree\_remove ⇒ <code>number</code> ⏏
Removes an item from an STRtree that has a matching geometry and user data.

**Kind**: Exported member  
**Returns**: <code>number</code> - 1 if the item was found and removed, 0 otherwise.  

| Param | Type | Description |
| --- | --- | --- |
| tree | <code>number</code> | A pointer to a GEOSSTRtree object. |
| g | <code>number</code> | A pointer to a GEOSGeometry object representing the envelope of the item to be removed. |
| item | <code>any</code> | The user data of the item to be removed. |


---
<a name="exp_module_geos--geos.GEOSSTRtree_remove_r"></a>

## geos.GEOSSTRtree\_remove\_r ⇒ <code>number</code> ⏏
Removes an item from an STRtree that has a matching geometry and user data using a reentrant context handle.

**Kind**: Exported member  
**Returns**: <code>number</code> - 1 if the item was found and removed, 0 otherwise.  

| Param | Type | Description |
| --- | --- | --- |
| handle | <code>number</code> | A pointer to a GEOSpointer  context handle. |
| tree | <code>number</code> | A pointer to a GEOSSTRtree object. |
| g | <code>number</code> | A pointer to a GEOSGeometry object representing the envelope of the item to be removed. |
| item | <code>any</code> | The user data of the item to be removed. |


---
