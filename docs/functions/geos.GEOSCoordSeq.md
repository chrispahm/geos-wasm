<a name="exp_module_geos--geos.GEOSCoordSeq_clone"></a>

## geos.GEOSCoordSeq\_clone ⇒ [<code>GEOSCoordSequence</code>](/typedefs-enums/typedefs-enums.html#GEOSCoordSequence) ⏏
Clone a coordinate sequence.

**Kind**: global property of [<code>geos</code>](/typedefs-enums/typedefs-enums.html#module_geos)  
**Returns**: [<code>GEOSCoordSequence</code>](/typedefs-enums/typedefs-enums.html#GEOSCoordSequence) - a copy of the coordinate sequence or NULL on exception  

| Param | Type | Description |
| --- | --- | --- |
| s | [<code>GEOSCoordSequence</code>](/typedefs-enums/typedefs-enums.html#GEOSCoordSequence) | the coordinate sequence to clone |


---
<a name="exp_module_geos--geos.GEOSCoordSeq_clone_r"></a>

## geos.GEOSCoordSeq\_clone\_r ⇒ [<code>GEOSCoordSequence</code>](/typedefs-enums/typedefs-enums.html#GEOSCoordSequence) ⏏
Clone a coordinate sequence.

**Kind**: global property of [<code>geos</code>](/typedefs-enums/typedefs-enums.html#module_geos)  
**Returns**: [<code>GEOSCoordSequence</code>](/typedefs-enums/typedefs-enums.html#GEOSCoordSequence) - a copy of the coordinate sequence or NULL on exception  

| Param | Type | Description |
| --- | --- | --- |
| handle | [<code>GEOSContextHandle\_t</code>](/typedefs-enums/typedefs-enums.html#GEOSContextHandle_t) | - |
| s | [<code>GEOSCoordSequence</code>](/typedefs-enums/typedefs-enums.html#GEOSCoordSequence) | the coordinate sequence to clone |


---
<a name="exp_module_geos--geos.GEOSCoordSeq_copyFromArrays"></a>

## geos.GEOSCoordSeq\_copyFromArrays ⇒ [<code>GEOSCoordSequence</code>](/typedefs-enums/typedefs-enums.html#GEOSCoordSequence) ⏏
Create a coordinate sequence by copying from arrays of doubles

**Kind**: global property of [<code>geos</code>](/typedefs-enums/typedefs-enums.html#module_geos)  
**Returns**: [<code>GEOSCoordSequence</code>](/typedefs-enums/typedefs-enums.html#GEOSCoordSequence) - the sequence or NULL on exception  

| Param | Type | Description |
| --- | --- | --- |
| x | [<code>ArrayPointer</code>](/typedefs-enums/typedefs-enums.html#ArrayPointer) | array of x coordinates |
| y | [<code>ArrayPointer</code>](/typedefs-enums/typedefs-enums.html#ArrayPointer) | array of y coordinates |
| z | [<code>ArrayPointer</code>](/typedefs-enums/typedefs-enums.html#ArrayPointer) | array of z coordinates, or NULL |
| m | [<code>ArrayPointer</code>](/typedefs-enums/typedefs-enums.html#ArrayPointer) | array of m coordinates, or NULL |
| size | <code>number</code> | length of each array |


---
<a name="exp_module_geos--geos.GEOSCoordSeq_copyFromArrays_r"></a>

## geos.GEOSCoordSeq\_copyFromArrays\_r ⇒ [<code>GEOSCoordSequence</code>](/typedefs-enums/typedefs-enums.html#GEOSCoordSequence) ⏏
Create a coordinate sequence by copying from arrays of doubles

**Kind**: global property of [<code>geos</code>](/typedefs-enums/typedefs-enums.html#module_geos)  
**Returns**: [<code>GEOSCoordSequence</code>](/typedefs-enums/typedefs-enums.html#GEOSCoordSequence) - the sequence or NULL on exception  

| Param | Type | Description |
| --- | --- | --- |
| handle | [<code>GEOSContextHandle\_t</code>](/typedefs-enums/typedefs-enums.html#GEOSContextHandle_t) | - |
| x | [<code>ArrayPointer</code>](/typedefs-enums/typedefs-enums.html#ArrayPointer) | array of x coordinates |
| y | [<code>ArrayPointer</code>](/typedefs-enums/typedefs-enums.html#ArrayPointer) | array of y coordinates |
| z | [<code>ArrayPointer</code>](/typedefs-enums/typedefs-enums.html#ArrayPointer) | array of z coordinates, or NULL |
| m | [<code>ArrayPointer</code>](/typedefs-enums/typedefs-enums.html#ArrayPointer) | array of m coordinates, or NULL |
| size | <code>number</code> | length of each array |


---
<a name="exp_module_geos--geos.GEOSCoordSeq_copyFromBuffer"></a>

## geos.GEOSCoordSeq\_copyFromBuffer ⇒ [<code>GEOSCoordSequence</code>](/typedefs-enums/typedefs-enums.html#GEOSCoordSequence) ⏏
Create a coordinate sequence by copying from an interleaved buffer of doubles (e.g., XYXY or XYZXYZ)

**Kind**: global property of [<code>geos</code>](/typedefs-enums/typedefs-enums.html#module_geos)  
**Returns**: [<code>GEOSCoordSequence</code>](/typedefs-enums/typedefs-enums.html#GEOSCoordSequence) - the sequence or NULL on exception  

| Param | Type | Description |
| --- | --- | --- |
| buf | [<code>NumberPointer</code>](/typedefs-enums/typedefs-enums.html#NumberPointer) | pointer to buffer |
| size | <code>number</code> | number of coordinates in the sequence |
| hasZ | <code>number</code> | does buffer have Z values? |
| hasM | <code>number</code> | does buffer have M values? |


---
<a name="exp_module_geos--geos.GEOSCoordSeq_copyFromBuffer_r"></a>

## geos.GEOSCoordSeq\_copyFromBuffer\_r ⇒ [<code>GEOSCoordSequence</code>](/typedefs-enums/typedefs-enums.html#GEOSCoordSequence) ⏏
Create a coordinate sequence by copying from an interleaved buffer of doubles (e.g., XYXY or XYZXYZ)

**Kind**: global property of [<code>geos</code>](/typedefs-enums/typedefs-enums.html#module_geos)  
**Returns**: [<code>GEOSCoordSequence</code>](/typedefs-enums/typedefs-enums.html#GEOSCoordSequence) - the sequence or NULL on exception  

| Param | Type | Description |
| --- | --- | --- |
| handle | [<code>GEOSContextHandle\_t</code>](/typedefs-enums/typedefs-enums.html#GEOSContextHandle_t) | - |
| buf | [<code>NumberPointer</code>](/typedefs-enums/typedefs-enums.html#NumberPointer) | pointer to buffer |
| size | <code>number</code> | number of coordinates in the sequence |
| hasZ | <code>number</code> | does buffer have Z values? |
| hasM | <code>number</code> | does buffer have M values? |


---
<a name="exp_module_geos--geos.GEOSCoordSeq_copyToArrays"></a>

## geos.GEOSCoordSeq\_copyToArrays ⇒ <code>number</code> ⏏
Copy the contents of a coordinate sequence to arrays of doubles

**Kind**: global property of [<code>geos</code>](/typedefs-enums/typedefs-enums.html#module_geos)  
**Returns**: <code>number</code> - 1 on success, 0 on error  

| Param | Type | Description |
| --- | --- | --- |
| s | [<code>GEOSCoordSequence</code>](/typedefs-enums/typedefs-enums.html#GEOSCoordSequence) | sequence to copy |
| x | [<code>ArrayPointer</code>](/typedefs-enums/typedefs-enums.html#ArrayPointer) | array to which x values should be copied |
| y | [<code>ArrayPointer</code>](/typedefs-enums/typedefs-enums.html#ArrayPointer) | array to which y values should be copied |
| z | [<code>ArrayPointer</code>](/typedefs-enums/typedefs-enums.html#ArrayPointer) | array to which z values should be copied, or NULL |
| m | [<code>ArrayPointer</code>](/typedefs-enums/typedefs-enums.html#ArrayPointer) | array to which m values should be copied, or NULL |


---
<a name="exp_module_geos--geos.GEOSCoordSeq_copyToArrays_r"></a>

## geos.GEOSCoordSeq\_copyToArrays\_r ⇒ <code>number</code> ⏏
Copy the contents of a coordinate sequence to arrays of doubles

**Kind**: global property of [<code>geos</code>](/typedefs-enums/typedefs-enums.html#module_geos)  
**Returns**: <code>number</code> - 1 on success, 0 on error  

| Param | Type | Description |
| --- | --- | --- |
| handle | [<code>GEOSContextHandle\_t</code>](/typedefs-enums/typedefs-enums.html#GEOSContextHandle_t) | - |
| s | [<code>GEOSCoordSequence</code>](/typedefs-enums/typedefs-enums.html#GEOSCoordSequence) | sequence to copy |
| x | [<code>ArrayPointer</code>](/typedefs-enums/typedefs-enums.html#ArrayPointer) | array to which x values should be copied |
| y | [<code>ArrayPointer</code>](/typedefs-enums/typedefs-enums.html#ArrayPointer) | array to which y values should be copied |
| z | [<code>ArrayPointer</code>](/typedefs-enums/typedefs-enums.html#ArrayPointer) | array to which z values should be copied, or NULL |
| m | [<code>ArrayPointer</code>](/typedefs-enums/typedefs-enums.html#ArrayPointer) | array to which m values should be copied, or NULL |


---
<a name="exp_module_geos--geos.GEOSCoordSeq_copyToBuffer"></a>

## geos.GEOSCoordSeq\_copyToBuffer ⇒ <code>number</code> ⏏
Copy the contents of a coordinate sequence to an interleaved buffer of doubles (e.g., XYXY or XYZXYZ)

**Kind**: global property of [<code>geos</code>](/typedefs-enums/typedefs-enums.html#module_geos)  
**Returns**: <code>number</code> - 1 on success, 0 on error  

| Param | Type | Description |
| --- | --- | --- |
| s | [<code>GEOSCoordSequence</code>](/typedefs-enums/typedefs-enums.html#GEOSCoordSequence) | sequence to copy |
| buf | [<code>NumberPointer</code>](/typedefs-enums/typedefs-enums.html#NumberPointer) | buffer to which coordinates should be copied |
| hasZ | <code>number</code> | copy Z values to buffer? |
| hasM | <code>number</code> | copy M values to buffer? |


---
<a name="exp_module_geos--geos.GEOSCoordSeq_copyToBuffer_r"></a>

## geos.GEOSCoordSeq\_copyToBuffer\_r ⇒ <code>number</code> ⏏
Copy the contents of a coordinate sequence to an interleaved buffer of doubles (e.g., XYXY or XYZXYZ)

**Kind**: global property of [<code>geos</code>](/typedefs-enums/typedefs-enums.html#module_geos)  
**Returns**: <code>number</code> - 1 on success, 0 on error  

| Param | Type | Description |
| --- | --- | --- |
| handle | [<code>GEOSContextHandle\_t</code>](/typedefs-enums/typedefs-enums.html#GEOSContextHandle_t) | - |
| s | [<code>GEOSCoordSequence</code>](/typedefs-enums/typedefs-enums.html#GEOSCoordSequence) | sequence to copy |
| buf | [<code>NumberPointer</code>](/typedefs-enums/typedefs-enums.html#NumberPointer) | buffer to which coordinates should be copied |
| hasZ | <code>number</code> | copy Z values to buffer? |
| hasM | <code>number</code> | copy M values to buffer? |


---
<a name="exp_module_geos--geos.GEOSCoordSeq_create"></a>

## geos.GEOSCoordSeq\_create ⇒ [<code>GEOSCoordSequence</code>](/typedefs-enums/typedefs-enums.html#GEOSCoordSequence) ⏏
Create a coordinate sequence.

**Kind**: global property of [<code>geos</code>](/typedefs-enums/typedefs-enums.html#module_geos)  
**Returns**: [<code>GEOSCoordSequence</code>](/typedefs-enums/typedefs-enums.html#GEOSCoordSequence) - the sequence or NULL on exception  

| Param | Type | Description |
| --- | --- | --- |
| size | <code>number</code> | number of coordinates in the sequence |
| dims | <code>number</code> | dimensionality of the coordinates (2, 3 or 4) |


---
<a name="exp_module_geos--geos.GEOSCoordSeq_create_r"></a>

## geos.GEOSCoordSeq\_create\_r ⇒ [<code>GEOSCoordSequence</code>](/typedefs-enums/typedefs-enums.html#GEOSCoordSequence) ⏏
Create a coordinate sequence.

**Kind**: global property of [<code>geos</code>](/typedefs-enums/typedefs-enums.html#module_geos)  
**Returns**: [<code>GEOSCoordSequence</code>](/typedefs-enums/typedefs-enums.html#GEOSCoordSequence) - the sequence or NULL on exception  

| Param | Type | Description |
| --- | --- | --- |
| handle | [<code>GEOSContextHandle\_t</code>](/typedefs-enums/typedefs-enums.html#GEOSContextHandle_t) | - |
| size | <code>number</code> | number of coordinates in the sequence |
| dims | <code>number</code> | dimensionality of the coordinates (2, 3 or 4) |


---
<a name="exp_module_geos--geos.GEOSCoordSeq_destroy"></a>

## geos.GEOSCoordSeq\_destroy ⇒ <code>null</code> ⏏
Destroy a coordinate sequence, freeing all memory.

**Kind**: global property of [<code>geos</code>](/typedefs-enums/typedefs-enums.html#module_geos)  
**Returns**: <code>null</code> - void  

| Param | Type | Description |
| --- | --- | --- |
| s | [<code>GEOSCoordSequence</code>](/typedefs-enums/typedefs-enums.html#GEOSCoordSequence) | the coordinate sequence to destroy |


---
<a name="exp_module_geos--geos.GEOSCoordSeq_destroy_r"></a>

## geos.GEOSCoordSeq\_destroy\_r ⇒ <code>null</code> ⏏
Destroy a coordinate sequence, freeing all memory.

**Kind**: global property of [<code>geos</code>](/typedefs-enums/typedefs-enums.html#module_geos)  
**Returns**: <code>null</code> - void  

| Param | Type | Description |
| --- | --- | --- |
| handle | [<code>GEOSContextHandle\_t</code>](/typedefs-enums/typedefs-enums.html#GEOSContextHandle_t) | - |
| s | [<code>GEOSCoordSequence</code>](/typedefs-enums/typedefs-enums.html#GEOSCoordSequence) | the coordinate sequence to destroy |


---
<a name="exp_module_geos--geos.GEOSCoordSeq_getDimensions"></a>

## geos.GEOSCoordSeq\_getDimensions ⇒ <code>number</code> ⏏
Get dimension info from a coordinate sequence.

**Kind**: global property of [<code>geos</code>](/typedefs-enums/typedefs-enums.html#module_geos)  
**Returns**: <code>number</code> - 0 on exception  

| Param | Type | Description |
| --- | --- | --- |
| s | [<code>GEOSCoordSequence</code>](/typedefs-enums/typedefs-enums.html#GEOSCoordSequence) | the coordinate sequence |
| dims | [<code>NumberPointer</code>](/typedefs-enums/typedefs-enums.html#NumberPointer) | pointer where dimension value will be placed |


---
<a name="exp_module_geos--geos.GEOSCoordSeq_getDimensions_r"></a>

## geos.GEOSCoordSeq\_getDimensions\_r ⇒ <code>number</code> ⏏
Get dimension info from a coordinate sequence.

**Kind**: global property of [<code>geos</code>](/typedefs-enums/typedefs-enums.html#module_geos)  
**Returns**: <code>number</code> - 0 on exception  

| Param | Type | Description |
| --- | --- | --- |
| handle | [<code>GEOSContextHandle\_t</code>](/typedefs-enums/typedefs-enums.html#GEOSContextHandle_t) | - |
| s | [<code>GEOSCoordSequence</code>](/typedefs-enums/typedefs-enums.html#GEOSCoordSequence) | the coordinate sequence |
| dims | [<code>NumberPointer</code>](/typedefs-enums/typedefs-enums.html#NumberPointer) | pointer where dimension value will be placed |


---
<a name="exp_module_geos--geos.GEOSCoordSeq_getOrdinate"></a>

## geos.GEOSCoordSeq\_getOrdinate ⇒ <code>number</code> ⏏
Read Nth ordinate value from a coordinate sequence.

**Kind**: global property of [<code>geos</code>](/typedefs-enums/typedefs-enums.html#module_geos)  
**Returns**: <code>number</code> - 0 on exception  

| Param | Type | Description |
| --- | --- | --- |
| s | [<code>GEOSCoordSequence</code>](/typedefs-enums/typedefs-enums.html#GEOSCoordSequence) | the coordinate sequence |
| idx | <code>number</code> | the index of the coordinate to alter, zero based |
| dim | <code>number</code> | the dimension number of the ordinate to read, zero based |
| val | [<code>NumberPointer</code>](/typedefs-enums/typedefs-enums.html#NumberPointer) | pointer where ordinate value will be placed |


---
<a name="exp_module_geos--geos.GEOSCoordSeq_getOrdinate_r"></a>

## geos.GEOSCoordSeq\_getOrdinate\_r ⇒ <code>number</code> ⏏
Read Nth ordinate value from a coordinate sequence.

**Kind**: global property of [<code>geos</code>](/typedefs-enums/typedefs-enums.html#module_geos)  
**Returns**: <code>number</code> - 0 on exception  

| Param | Type | Description |
| --- | --- | --- |
| handle | [<code>GEOSContextHandle\_t</code>](/typedefs-enums/typedefs-enums.html#GEOSContextHandle_t) | - |
| s | [<code>GEOSCoordSequence</code>](/typedefs-enums/typedefs-enums.html#GEOSCoordSequence) | the coordinate sequence |
| idx | <code>number</code> | the index of the coordinate to alter, zero based |
| dim | <code>number</code> | the dimension number of the ordinate to read, zero based |
| val | [<code>NumberPointer</code>](/typedefs-enums/typedefs-enums.html#NumberPointer) | pointer where ordinate value will be placed |


---
<a name="exp_module_geos--geos.GEOSCoordSeq_getSize"></a>

## geos.GEOSCoordSeq\_getSize ⇒ <code>number</code> ⏏
Get size info from a coordinate sequence.

**Kind**: global property of [<code>geos</code>](/typedefs-enums/typedefs-enums.html#module_geos)  
**Returns**: <code>number</code> - 0 on exception  

| Param | Type | Description |
| --- | --- | --- |
| s | [<code>GEOSCoordSequence</code>](/typedefs-enums/typedefs-enums.html#GEOSCoordSequence) | the coordinate sequence |
| size | [<code>NumberPointer</code>](/typedefs-enums/typedefs-enums.html#NumberPointer) | pointer where size value will be placed |


---
<a name="exp_module_geos--geos.GEOSCoordSeq_getSize_r"></a>

## geos.GEOSCoordSeq\_getSize\_r ⇒ <code>number</code> ⏏
Get size info from a coordinate sequence.

**Kind**: global property of [<code>geos</code>](/typedefs-enums/typedefs-enums.html#module_geos)  
**Returns**: <code>number</code> - 0 on exception  

| Param | Type | Description |
| --- | --- | --- |
| handle | [<code>GEOSContextHandle\_t</code>](/typedefs-enums/typedefs-enums.html#GEOSContextHandle_t) | - |
| s | [<code>GEOSCoordSequence</code>](/typedefs-enums/typedefs-enums.html#GEOSCoordSequence) | the coordinate sequence |
| size | [<code>NumberPointer</code>](/typedefs-enums/typedefs-enums.html#NumberPointer) | pointer where size value will be placed |


---
<a name="exp_module_geos--geos.GEOSCoordSeq_getX"></a>

## geos.GEOSCoordSeq\_getX ⇒ <code>number</code> ⏏
Read X ordinate values from a coordinate sequence.

**Kind**: global property of [<code>geos</code>](/typedefs-enums/typedefs-enums.html#module_geos)  
**Returns**: <code>number</code> - 0 on exception  

| Param | Type | Description |
| --- | --- | --- |
| s | [<code>GEOSCoordSequence</code>](/typedefs-enums/typedefs-enums.html#GEOSCoordSequence) | the coordinate sequence |
| idx | <code>number</code> | the index of the coordinate to alter, zero based |
| val | [<code>NumberPointer</code>](/typedefs-enums/typedefs-enums.html#NumberPointer) | pointer where ordinate value will be placed |


---
<a name="exp_module_geos--geos.GEOSCoordSeq_getXY"></a>

## geos.GEOSCoordSeq\_getXY ⇒ <code>number</code> ⏏
Read X and Y ordinate values from a coordinate sequence.

**Kind**: global property of [<code>geos</code>](/typedefs-enums/typedefs-enums.html#module_geos)  
**Returns**: <code>number</code> - 0 on exception  

| Param | Type | Description |
| --- | --- | --- |
| s | [<code>GEOSCoordSequence</code>](/typedefs-enums/typedefs-enums.html#GEOSCoordSequence) | the coordinate sequence |
| idx | <code>number</code> | the index of the coordinate to alter, zero based |
| x | [<code>NumberPointer</code>](/typedefs-enums/typedefs-enums.html#NumberPointer) | pointer where ordinate X value will be placed |
| y | [<code>NumberPointer</code>](/typedefs-enums/typedefs-enums.html#NumberPointer) | pointer where ordinate Y value will be placed |


---
<a name="exp_module_geos--geos.GEOSCoordSeq_getXYZ"></a>

## geos.GEOSCoordSeq\_getXYZ ⇒ <code>number</code> ⏏
Read X and Y ordinate values from a coordinate sequence.

**Kind**: global property of [<code>geos</code>](/typedefs-enums/typedefs-enums.html#module_geos)  
**Returns**: <code>number</code> - 0 on exception  

| Param | Type | Description |
| --- | --- | --- |
| s | [<code>GEOSCoordSequence</code>](/typedefs-enums/typedefs-enums.html#GEOSCoordSequence) | the coordinate sequence |
| idx | <code>number</code> | the index of the coordinate to alter, zero based |
| x | [<code>NumberPointer</code>](/typedefs-enums/typedefs-enums.html#NumberPointer) | pointer where ordinate X value will be placed |
| y | [<code>NumberPointer</code>](/typedefs-enums/typedefs-enums.html#NumberPointer) | pointer where ordinate Y value will be placed |
| z | [<code>NumberPointer</code>](/typedefs-enums/typedefs-enums.html#NumberPointer) | pointer where ordinate Z value will be placed |


---
<a name="exp_module_geos--geos.GEOSCoordSeq_getXYZ_r"></a>

## geos.GEOSCoordSeq\_getXYZ\_r ⇒ <code>number</code> ⏏
Read X and Y ordinate values from a coordinate sequence.

**Kind**: global property of [<code>geos</code>](/typedefs-enums/typedefs-enums.html#module_geos)  
**Returns**: <code>number</code> - 0 on exception  

| Param | Type | Description |
| --- | --- | --- |
| handle | [<code>GEOSContextHandle\_t</code>](/typedefs-enums/typedefs-enums.html#GEOSContextHandle_t) | - |
| s | [<code>GEOSCoordSequence</code>](/typedefs-enums/typedefs-enums.html#GEOSCoordSequence) | the coordinate sequence |
| idx | <code>number</code> | the index of the coordinate to alter, zero based |
| x | [<code>NumberPointer</code>](/typedefs-enums/typedefs-enums.html#NumberPointer) | pointer where ordinate X value will be placed |
| y | [<code>NumberPointer</code>](/typedefs-enums/typedefs-enums.html#NumberPointer) | pointer where ordinate Y value will be placed |
| z | [<code>NumberPointer</code>](/typedefs-enums/typedefs-enums.html#NumberPointer) | pointer where ordinate Z value will be placed |


---
<a name="exp_module_geos--geos.GEOSCoordSeq_getXY_r"></a>

## geos.GEOSCoordSeq\_getXY\_r ⇒ <code>number</code> ⏏
Read X and Y ordinate values from a coordinate sequence.

**Kind**: global property of [<code>geos</code>](/typedefs-enums/typedefs-enums.html#module_geos)  
**Returns**: <code>number</code> - 0 on exception  

| Param | Type | Description |
| --- | --- | --- |
| handle | [<code>GEOSContextHandle\_t</code>](/typedefs-enums/typedefs-enums.html#GEOSContextHandle_t) | - |
| s | [<code>GEOSCoordSequence</code>](/typedefs-enums/typedefs-enums.html#GEOSCoordSequence) | the coordinate sequence |
| idx | <code>number</code> | the index of the coordinate to alter, zero based |
| x | [<code>NumberPointer</code>](/typedefs-enums/typedefs-enums.html#NumberPointer) | pointer where ordinate X value will be placed |
| y | [<code>NumberPointer</code>](/typedefs-enums/typedefs-enums.html#NumberPointer) | pointer where ordinate Y value will be placed |


---
<a name="exp_module_geos--geos.GEOSCoordSeq_getX_r"></a>

## geos.GEOSCoordSeq\_getX\_r ⇒ <code>number</code> ⏏
Read X ordinate values from a coordinate sequence.

**Kind**: global property of [<code>geos</code>](/typedefs-enums/typedefs-enums.html#module_geos)  
**Returns**: <code>number</code> - 0 on exception  

| Param | Type | Description |
| --- | --- | --- |
| handle | [<code>GEOSContextHandle\_t</code>](/typedefs-enums/typedefs-enums.html#GEOSContextHandle_t) | - |
| s | [<code>GEOSCoordSequence</code>](/typedefs-enums/typedefs-enums.html#GEOSCoordSequence) | the coordinate sequence |
| idx | <code>number</code> | the index of the coordinate to alter, zero based |
| val | [<code>NumberPointer</code>](/typedefs-enums/typedefs-enums.html#NumberPointer) | pointer where ordinate value will be placed |


---
<a name="exp_module_geos--geos.GEOSCoordSeq_getY"></a>

## geos.GEOSCoordSeq\_getY ⇒ <code>number</code> ⏏
Read Y ordinate values from a coordinate sequence.

**Kind**: global property of [<code>geos</code>](/typedefs-enums/typedefs-enums.html#module_geos)  
**Returns**: <code>number</code> - 0 on exception  

| Param | Type | Description |
| --- | --- | --- |
| s | [<code>GEOSCoordSequence</code>](/typedefs-enums/typedefs-enums.html#GEOSCoordSequence) | the coordinate sequence |
| idx | <code>number</code> | the index of the coordinate to alter, zero based |
| val | [<code>NumberPointer</code>](/typedefs-enums/typedefs-enums.html#NumberPointer) | pointer where ordinate value will be placed |


---
<a name="exp_module_geos--geos.GEOSCoordSeq_getY_r"></a>

## geos.GEOSCoordSeq\_getY\_r ⇒ <code>number</code> ⏏
Read Y ordinate values from a coordinate sequence.

**Kind**: global property of [<code>geos</code>](/typedefs-enums/typedefs-enums.html#module_geos)  
**Returns**: <code>number</code> - 0 on exception  

| Param | Type | Description |
| --- | --- | --- |
| handle | [<code>GEOSContextHandle\_t</code>](/typedefs-enums/typedefs-enums.html#GEOSContextHandle_t) | - |
| s | [<code>GEOSCoordSequence</code>](/typedefs-enums/typedefs-enums.html#GEOSCoordSequence) | the coordinate sequence |
| idx | <code>number</code> | the index of the coordinate to alter, zero based |
| val | [<code>NumberPointer</code>](/typedefs-enums/typedefs-enums.html#NumberPointer) | pointer where ordinate value will be placed |


---
<a name="exp_module_geos--geos.GEOSCoordSeq_getZ"></a>

## geos.GEOSCoordSeq\_getZ ⇒ <code>number</code> ⏏
Read Z ordinate values from a coordinate sequence.

**Kind**: global property of [<code>geos</code>](/typedefs-enums/typedefs-enums.html#module_geos)  
**Returns**: <code>number</code> - 0 on exception  

| Param | Type | Description |
| --- | --- | --- |
| s | [<code>GEOSCoordSequence</code>](/typedefs-enums/typedefs-enums.html#GEOSCoordSequence) | the coordinate sequence |
| idx | <code>number</code> | the index of the coordinate to alter, zero based |
| val | [<code>NumberPointer</code>](/typedefs-enums/typedefs-enums.html#NumberPointer) | pointer where ordinate value will be placed |


---
<a name="exp_module_geos--geos.GEOSCoordSeq_getZ_r"></a>

## geos.GEOSCoordSeq\_getZ\_r ⇒ <code>number</code> ⏏
Read Z ordinate values from a coordinate sequence.

**Kind**: global property of [<code>geos</code>](/typedefs-enums/typedefs-enums.html#module_geos)  
**Returns**: <code>number</code> - 0 on exception  

| Param | Type | Description |
| --- | --- | --- |
| handle | [<code>GEOSContextHandle\_t</code>](/typedefs-enums/typedefs-enums.html#GEOSContextHandle_t) | - |
| s | [<code>GEOSCoordSequence</code>](/typedefs-enums/typedefs-enums.html#GEOSCoordSequence) | the coordinate sequence |
| idx | <code>number</code> | the index of the coordinate to alter, zero based |
| val | [<code>NumberPointer</code>](/typedefs-enums/typedefs-enums.html#NumberPointer) | pointer where ordinate value will be placed |


---
<a name="exp_module_geos--geos.GEOSCoordSeq_isCCW"></a>

## geos.GEOSCoordSeq\_isCCW ⇒ <code>number</code> ⏏
Check orientation of a coordinate sequence. Closure of the sequence is assumed. Invalid (collapsed) or short (fewer than 4 points) sequences return false.

**Kind**: global property of [<code>geos</code>](/typedefs-enums/typedefs-enums.html#module_geos)  
**Returns**: <code>number</code> - 0 on exception, 1 on success  

| Param | Type | Description |
| --- | --- | --- |
| s | [<code>GEOSCoordSequence</code>](/typedefs-enums/typedefs-enums.html#GEOSCoordSequence) | the coordinate sequence |
| is_ccw | [<code>StringPointer</code>](/typedefs-enums/typedefs-enums.html#StringPointer) | pointer for ccw value, 1 if counter-clockwise orientation, 0 otherwise |


---
<a name="exp_module_geos--geos.GEOSCoordSeq_isCCW_r"></a>

## geos.GEOSCoordSeq\_isCCW\_r ⇒ <code>number</code> ⏏
Check orientation of a coordinate sequence. Closure of the sequence is assumed. Invalid (collapsed) or short (fewer than 4 points) sequences return false.

**Kind**: global property of [<code>geos</code>](/typedefs-enums/typedefs-enums.html#module_geos)  
**Returns**: <code>number</code> - 0 on exception, 1 on success  

| Param | Type | Description |
| --- | --- | --- |
| handle | [<code>GEOSContextHandle\_t</code>](/typedefs-enums/typedefs-enums.html#GEOSContextHandle_t) | - |
| s | [<code>GEOSCoordSequence</code>](/typedefs-enums/typedefs-enums.html#GEOSCoordSequence) | the coordinate sequence |
| is_ccw | [<code>StringPointer</code>](/typedefs-enums/typedefs-enums.html#StringPointer) | pointer for ccw value, 1 if counter-clockwise orientation, 0 otherwise |


---
<a name="exp_module_geos--geos.GEOSCoordSeq_setOrdinate"></a>

## geos.GEOSCoordSeq\_setOrdinate ⇒ <code>number</code> ⏏
Set Nth ordinate value in a coordinate sequence.

**Kind**: global property of [<code>geos</code>](/typedefs-enums/typedefs-enums.html#module_geos)  
**Returns**: <code>number</code> - 0 on exception  

| Param | Type | Description |
| --- | --- | --- |
| s | [<code>GEOSCoordSequence</code>](/typedefs-enums/typedefs-enums.html#GEOSCoordSequence) | the coordinate sequence |
| idx | <code>number</code> | the index of the coordinate to alter, zero based |
| dim | <code>number</code> | the dimension number of the ordinate to alter, zero based |
| val | <code>number</code> | the value to set the ordinate to |


---
<a name="exp_module_geos--geos.GEOSCoordSeq_setOrdinate_r"></a>

## geos.GEOSCoordSeq\_setOrdinate\_r ⇒ <code>number</code> ⏏
Set Nth ordinate value in a coordinate sequence.

**Kind**: global property of [<code>geos</code>](/typedefs-enums/typedefs-enums.html#module_geos)  
**Returns**: <code>number</code> - 0 on exception  

| Param | Type | Description |
| --- | --- | --- |
| handle | [<code>GEOSContextHandle\_t</code>](/typedefs-enums/typedefs-enums.html#GEOSContextHandle_t) | - |
| s | [<code>GEOSCoordSequence</code>](/typedefs-enums/typedefs-enums.html#GEOSCoordSequence) | the coordinate sequence |
| idx | <code>number</code> | the index of the coordinate to alter, zero based |
| dim | <code>number</code> | the dimension number of the ordinate to alter, zero based |
| val | <code>number</code> | the value to set the ordinate to |


---
<a name="exp_module_geos--geos.GEOSCoordSeq_setX"></a>

## geos.GEOSCoordSeq\_setX ⇒ <code>number</code> ⏏
Set X ordinate values in a coordinate sequence.

**Kind**: global property of [<code>geos</code>](/typedefs-enums/typedefs-enums.html#module_geos)  
**Returns**: <code>number</code> - 0 on exception  

| Param | Type | Description |
| --- | --- | --- |
| s | [<code>GEOSCoordSequence</code>](/typedefs-enums/typedefs-enums.html#GEOSCoordSequence) | the coordinate sequence |
| idx | <code>number</code> | the index of the coordinate to alter, zero based |
| val | <code>number</code> | the value to set the ordinate to |


---
<a name="exp_module_geos--geos.GEOSCoordSeq_setXY"></a>

## geos.GEOSCoordSeq\_setXY ⇒ <code>number</code> ⏏
Set X and Y ordinate values in a coordinate sequence simultaneously.

**Kind**: global property of [<code>geos</code>](/typedefs-enums/typedefs-enums.html#module_geos)  
**Returns**: <code>number</code> - 0 on exception  

| Param | Type | Description |
| --- | --- | --- |
| s | [<code>GEOSCoordSequence</code>](/typedefs-enums/typedefs-enums.html#GEOSCoordSequence) | the coordinate sequence |
| idx | <code>number</code> | the index of the coordinate to alter, zero based |
| x | <code>number</code> | the value to set the X ordinate to |
| y | <code>number</code> | the value to set the Y ordinate to |


---
<a name="exp_module_geos--geos.GEOSCoordSeq_setXYZ"></a>

## geos.GEOSCoordSeq\_setXYZ ⇒ <code>number</code> ⏏
Set X, Y and Z ordinate values in a coordinate sequence simultaneously.

**Kind**: global property of [<code>geos</code>](/typedefs-enums/typedefs-enums.html#module_geos)  
**Returns**: <code>number</code> - 0 on exception  

| Param | Type | Description |
| --- | --- | --- |
| s | [<code>GEOSCoordSequence</code>](/typedefs-enums/typedefs-enums.html#GEOSCoordSequence) | the coordinate sequence |
| idx | <code>number</code> | the index of the coordinate to alter, zero based |
| x | <code>number</code> | the value to set the X ordinate to |
| y | <code>number</code> | the value to set the Y ordinate to |
| z | <code>number</code> | the value to set the Z ordinate to |


---
<a name="exp_module_geos--geos.GEOSCoordSeq_setXYZ_r"></a>

## geos.GEOSCoordSeq\_setXYZ\_r ⇒ <code>number</code> ⏏
Set X, Y and Z ordinate values in a coordinate sequence simultaneously.

**Kind**: global property of [<code>geos</code>](/typedefs-enums/typedefs-enums.html#module_geos)  
**Returns**: <code>number</code> - 0 on exception  

| Param | Type | Description |
| --- | --- | --- |
| handle | [<code>GEOSContextHandle\_t</code>](/typedefs-enums/typedefs-enums.html#GEOSContextHandle_t) | - |
| s | [<code>GEOSCoordSequence</code>](/typedefs-enums/typedefs-enums.html#GEOSCoordSequence) | the coordinate sequence |
| idx | <code>number</code> | the index of the coordinate to alter, zero based |
| x | <code>number</code> | the value to set the X ordinate to |
| y | <code>number</code> | the value to set the Y ordinate to |
| z | <code>number</code> | the value to set the Z ordinate to |


---
<a name="exp_module_geos--geos.GEOSCoordSeq_setXY_r"></a>

## geos.GEOSCoordSeq\_setXY\_r ⇒ <code>number</code> ⏏
Set X and Y ordinate values in a coordinate sequence simultaneously.

**Kind**: global property of [<code>geos</code>](/typedefs-enums/typedefs-enums.html#module_geos)  
**Returns**: <code>number</code> - 0 on exception  

| Param | Type | Description |
| --- | --- | --- |
| handle | [<code>GEOSContextHandle\_t</code>](/typedefs-enums/typedefs-enums.html#GEOSContextHandle_t) | - |
| s | [<code>GEOSCoordSequence</code>](/typedefs-enums/typedefs-enums.html#GEOSCoordSequence) | the coordinate sequence |
| idx | <code>number</code> | the index of the coordinate to alter, zero based |
| x | <code>number</code> | the value to set the X ordinate to |
| y | <code>number</code> | the value to set the Y ordinate to |


---
<a name="exp_module_geos--geos.GEOSCoordSeq_setX_r"></a>

## geos.GEOSCoordSeq\_setX\_r ⇒ <code>number</code> ⏏
Set X ordinate values in a coordinate sequence.

**Kind**: global property of [<code>geos</code>](/typedefs-enums/typedefs-enums.html#module_geos)  
**Returns**: <code>number</code> - 0 on exception  

| Param | Type | Description |
| --- | --- | --- |
| handle | [<code>GEOSContextHandle\_t</code>](/typedefs-enums/typedefs-enums.html#GEOSContextHandle_t) | - |
| s | [<code>GEOSCoordSequence</code>](/typedefs-enums/typedefs-enums.html#GEOSCoordSequence) | the coordinate sequence |
| idx | <code>number</code> | the index of the coordinate to alter, zero based |
| val | <code>number</code> | the value to set the ordinate to |


---
<a name="exp_module_geos--geos.GEOSCoordSeq_setY"></a>

## geos.GEOSCoordSeq\_setY ⇒ <code>number</code> ⏏
Set Y ordinate values in a coordinate sequence.

**Kind**: global property of [<code>geos</code>](/typedefs-enums/typedefs-enums.html#module_geos)  
**Returns**: <code>number</code> - 0 on exception  

| Param | Type | Description |
| --- | --- | --- |
| s | [<code>GEOSCoordSequence</code>](/typedefs-enums/typedefs-enums.html#GEOSCoordSequence) | the coordinate sequence |
| idx | <code>number</code> | the index of the coordinate to alter, zero based |
| val | <code>number</code> | the value to set the ordinate to |


---
<a name="exp_module_geos--geos.GEOSCoordSeq_setY_r"></a>

## geos.GEOSCoordSeq\_setY\_r ⇒ <code>number</code> ⏏
Set Y ordinate values in a coordinate sequence.

**Kind**: global property of [<code>geos</code>](/typedefs-enums/typedefs-enums.html#module_geos)  
**Returns**: <code>number</code> - 0 on exception  

| Param | Type | Description |
| --- | --- | --- |
| handle | [<code>GEOSContextHandle\_t</code>](/typedefs-enums/typedefs-enums.html#GEOSContextHandle_t) | - |
| s | [<code>GEOSCoordSequence</code>](/typedefs-enums/typedefs-enums.html#GEOSCoordSequence) | the coordinate sequence |
| idx | <code>number</code> | the index of the coordinate to alter, zero based |
| val | <code>number</code> | the value to set the ordinate to |


---
<a name="exp_module_geos--geos.GEOSCoordSeq_setZ"></a>

## geos.GEOSCoordSeq\_setZ ⇒ <code>number</code> ⏏
Set Z ordinate values in a coordinate sequence.

**Kind**: global property of [<code>geos</code>](/typedefs-enums/typedefs-enums.html#module_geos)  
**Returns**: <code>number</code> - 0 on exception  

| Param | Type | Description |
| --- | --- | --- |
| s | [<code>GEOSCoordSequence</code>](/typedefs-enums/typedefs-enums.html#GEOSCoordSequence) | the coordinate sequence |
| idx | <code>number</code> | the index of the coordinate to alter, zero based |
| val | <code>number</code> | the value to set the ordinate to |


---
<a name="exp_module_geos--geos.GEOSCoordSeq_setZ_r"></a>

## geos.GEOSCoordSeq\_setZ\_r ⇒ <code>number</code> ⏏
Set Z ordinate values in a coordinate sequence.

**Kind**: global property of [<code>geos</code>](/typedefs-enums/typedefs-enums.html#module_geos)  
**Returns**: <code>number</code> - 0 on exception  

| Param | Type | Description |
| --- | --- | --- |
| handle | [<code>GEOSContextHandle\_t</code>](/typedefs-enums/typedefs-enums.html#GEOSContextHandle_t) | - |
| s | [<code>GEOSCoordSequence</code>](/typedefs-enums/typedefs-enums.html#GEOSCoordSequence) | the coordinate sequence |
| idx | <code>number</code> | the index of the coordinate to alter, zero based |
| val | <code>number</code> | the value to set the ordinate to |


---
