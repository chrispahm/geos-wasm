<a name="exp_module_geos--geos.GEOSCoordSeq_clone"></a>

## geos.GEOSCoordSeq\_clone ⇒ <code>number</code> \| <code>null</code> ⏏
Clone a coordinate sequence.

**Kind**: Exported member  
**Returns**: <code>number</code> \| <code>null</code> - A pointer to a new coordinate sequence object or null on exception.  

| Param | Type | Description |
| --- | --- | --- |
| s | <code>number</code> | The coordinate sequence to clone pointer |


---
<a name="exp_module_geos--geos.GEOSCoordSeq_clone_r"></a>

## geos.GEOSCoordSeq\_clone\_r ⇒ <code>number</code> ⏏
Clone a coordinate sequence.

**Kind**: Exported member  
**Returns**: <code>number</code> - The pointer to the cloned coordinate sequence, or null on error.  
**See**: https://libgeos.org/doxygen/geos__c_8h.html#a4f2a6b1f8e9a1c0e3f9c6e7d5a3f6b5a  

| Param | Type | Description |
| --- | --- | --- |
| handle | <code>number</code> | A pointer to the GEOS context handle. |
| s | <code>number</code> | The pointer to the coordinate sequence to clone. |


---
<a name="exp_module_geos--geos.GEOSCoordSeq_copyFromArrays"></a>

## geos.GEOSCoordSeq\_copyFromArrays ⇒ <code>number</code> ⏏
Copies the coordinate values from the given arrays to a coordinate sequence.

**Kind**: Exported member  
**Returns**: <code>number</code> - A pointer to a GEOS coordinate sequence object, or NULL on error.  
**See**: https://libgeos.org/doxygen/geos__c_8h.html#a4f7a1f9d0c2b0c119e6f9e2f60b112a9  

| Param | Type | Description |
| --- | --- | --- |
| size | <code>number</code> | The number of coordinates in the arrays. |
| xs | <code>number</code> | A pointer to an array of x values. |
| ys | <code>number</code> | A pointer to an array of y values. |
| zs | <code>number</code> | A pointer to an array of z values, or NULL if not needed. |


---
<a name="exp_module_geos--geos.GEOSCoordSeq_copyFromArrays_r"></a>

## geos.GEOSCoordSeq\_copyFromArrays\_r ⇒ <code>number</code> ⏏
Copies the ordinates of a coordinate sequence from arrays of x, y and optionally z values.

**Kind**: Exported member  
**Returns**: <code>number</code> - 1 on success, 0 on failure.  
**See**: https://libgeos.org/doxygen/geos__c_8h.html#a9f4c6a5a7f2b9c0b1f6c0e1d0a1e4f5a  

| Param | Type | Description |
| --- | --- | --- |
| ctx | <code>number</code> | A GEOS context handle. |
| seq | <code>number</code> | A pointer to a GEOS coordinate sequence object. |
| x | <code>number</code> | A pointer to an array of x values. |
| y | <code>number</code> | A pointer to an array of y values. |
| z | <code>number</code> | A pointer to an array of z values, or NULL if not present. |


---
<a name="exp_module_geos--geos.GEOSCoordSeq_copyFromBuffer"></a>

## geos.GEOSCoordSeq\_copyFromBuffer ⇒ <code>number</code> ⏏
Copies a coordinate sequence from a buffer of x, y values.

**Kind**: Exported member  
**Returns**: <code>number</code> - A pointer to a GEOS coordinate sequence object, or NULL on error.  
**See**: https://libgeos.org/doxygen/geos__c_8h.html#a6f4b0a3f8e9c7a9b5f3b2c1f0c3a1d6f  

| Param | Type | Description |
| --- | --- | --- |
| size | <code>number</code> | The number of coordinates in the buffer. |
| buf | <code>number</code> | A pointer to a buffer of double values, in x, y order. |


---
<a name="exp_module_geos--geos.GEOSCoordSeq_copyFromBuffer_r"></a>

## geos.GEOSCoordSeq\_copyFromBuffer\_r ⇒ <code>number</code> ⏏
Copies a coordinate sequence from a buffer of x,y,z values.

**Kind**: Exported member  
**Returns**: <code>number</code> - 1 on success, 0 on failure.  
**See**: https://libgeos.org/doxygen/geos__c_8h.html#a7a9f0b9c5a4f3b8f1d6b2a0c6e8d7c7f  

| Param | Type | Description |
| --- | --- | --- |
| ctx | <code>number</code> | A GEOS context handle. |
| seq | <code>number</code> | A pointer to a GEOS coordinate sequence object. |
| buf | <code>number</code> | A pointer to a buffer of double values. |
| size | <code>number</code> | The number of coordinates in the buffer. |


---
<a name="exp_module_geos--geos.GEOSCoordSeq_copyToArrays"></a>

## geos.GEOSCoordSeq\_copyToArrays ⇒ <code>number</code> ⏏
Copies the coordinates of a coordinate sequence to two arrays.

**Kind**: Exported member  
**Returns**: <code>number</code> - 1 on success, 0 on failure.  
**See**: https://libgeos.org/doxygen/geos__c_8h.html#a3f7a4b9a6d0e2b7c8f6f9e5b1f6d0a5c  

| Param | Type | Description |
| --- | --- | --- |
| cs | <code>number</code> | A pointer to a GEOS coordinate sequence object. |
| x | <code>number</code> | A pointer to an array of doubles to store the x-coordinates. |
| y | <code>number</code> | A pointer to an array of doubles to store the y-coordinates. |


---
<a name="exp_module_geos--geos.GEOSCoordSeq_copyToArrays_r"></a>

## geos.GEOSCoordSeq\_copyToArrays\_r ⇒ <code>number</code> ⏏
Copies the coordinates of a coordinate sequence to two arrays of doubles.

**Kind**: Exported member  
**Returns**: <code>number</code> - 1 on success, 0 on failure.  
**See**: https://libgeos.org/doxygen/geos__c_8h.html#a5f7a6d4f3f9a9c5e2b7a0b8f6c4e3d0c  

| Param | Type | Description |
| --- | --- | --- |
| ctx | <code>number</code> | A GEOS context handle. |
| seq | <code>number</code> | A pointer to a GEOS coordinate sequence object. |
| x | <code>number</code> | A pointer to an array of doubles to store the x coordinates. |
| y | <code>number</code> | A pointer to an array of doubles to store the y coordinates. |


---
<a name="exp_module_geos--geos.GEOSCoordSeq_copyToBuffer"></a>

## geos.GEOSCoordSeq\_copyToBuffer ⇒ <code>number</code> ⏏
Copies the coordinates of a coordinate sequence to a user-supplied buffer.

**Kind**: Exported member  
**Returns**: <code>number</code> - 1 on success, 0 on error.  
**See**: https://libgeos.org/doxygen/geos__c_8h.html#a9a6f2c8b0a3f4e4f2c9a7b1d5c2e9b7a  

| Param | Type | Description |
| --- | --- | --- |
| cs | <code>number</code> | A pointer to a GEOS coordinate sequence object. |
| buf | <code>number</code> | A pointer to a buffer of double values, allocated by the caller. |
| stride | <code>number</code> | The number of doubles per coordinate in the buffer. |


---
<a name="exp_module_geos--geos.GEOSCoordSeq_copyToBuffer_r"></a>

## geos.GEOSCoordSeq\_copyToBuffer\_r ⇒ <code>number</code> ⏏
Copies the coordinates of a coordinate sequence to user-supplied buffers.

**Kind**: Exported member  
**Returns**: <code>number</code> - 1 on success, 0 on failure.  
**See**: https://libgeos.org/doxygen/geos__c_8h.html#a9f4a9f6b7a5d8a6c0f2b5e7e6a3f0c7d  

| Param | Type | Description |
| --- | --- | --- |
| ctx | <code>number</code> | A GEOS context handle. |
| seq | <code>number</code> | A pointer to a GEOS coordinate sequence object. |
| x | <code>number</code> | A pointer to a buffer for the x coordinates. |
| y | <code>number</code> | A pointer to a buffer for the y coordinates. |
| z | <code>number</code> | A pointer to a buffer for the z coordinates (optional). |


---
<a name="exp_module_geos--geos.GEOSCoordSeq_create"></a>

## geos.GEOSCoordSeq\_create ⇒ <code>number</code> ⏏
Create a coordinate sequence of a given size and dimension.

**Kind**: Exported member  
**Returns**: <code>number</code> - A pointer to the created coordinate sequence or NULL on error.  

| Param | Type | Description |
| --- | --- | --- |
| size | <code>number</code> | The number of coordinates in the sequence. |
| dims | <code>number</code> | The dimension of each coordinate (2 or 3). |


---
<a name="exp_module_geos--geos.GEOSCoordSeq_create_r"></a>

## geos.GEOSCoordSeq\_create\_r ⇒ <code>number</code> ⏏
Create a coordinate sequence of a given size and dimension in a given context.

**Kind**: Exported member  
**Returns**: <code>number</code> - A pointer to the created coordinate sequence or NULL on error.  

| Param | Type | Description |
| --- | --- | --- |
| handle | <code>number</code> | A pointer to the GEOS context handle. |
| size | <code>number</code> | The number of coordinates in the sequence. |
| dims | <code>number</code> | The dimension of each coordinate (2 or 3). |


---
<a name="exp_module_geos--geos.GEOSCoordSeq_destroy"></a>

## geos.GEOSCoordSeq\_destroy ⏏
Destroys a coordinate sequence.

**Kind**: Exported member  

| Param | Type | Description |
| --- | --- | --- |
| s | <code>number</code> | The coordinate sequence to destroy. |


---
<a name="exp_module_geos--geos.GEOSCoordSeq_destroy_r"></a>

## geos.GEOSCoordSeq\_destroy\_r ⏏
Destroys a coordinate sequence with a context handle.

**Kind**: Exported member  

| Param | Type | Description |
| --- | --- | --- |
| handle | <code>number</code> | A pointer to the GEOS context handle. |
| s | <code>number</code> | The coordinate sequence to destroy. |


---
<a name="exp_module_geos--geos.GEOSCoordSeq_getDimensions"></a>

## geos.GEOSCoordSeq\_getDimensions ⇒ <code>number</code> ⏏
Get the dimensions of a coordinate sequence.

**Kind**: Exported member  
**Returns**: <code>number</code> - 1 on success, 0 on exception.  

| Param | Type | Description |
| --- | --- | --- |
| s | <code>number</code> | A pointer to a GEOSCoordSequence object. |
| dims | <code>number</code> | A pointer to an unsigned int to store the dimensions. |


---
<a name="exp_module_geos--geos.GEOSCoordSeq_getDimensions_r"></a>

## geos.GEOSCoordSeq\_getDimensions\_r ⇒ <code>number</code> ⏏
Get the dimensions of a coordinate sequence (thread-safe).

**Kind**: Exported member  
**Returns**: <code>number</code> - 1 on success, 0 on exception.  

| Param | Type | Description |
| --- | --- | --- |
| handle | <code>number</code> | A GEOS context handle. |
| s | <code>number</code> | A pointer to a GEOSCoordSequence object. |
| dims | <code>number</code> | A pointer to an unsigned int to store the dimensions. |


---
<a name="exp_module_geos--geos.GEOSCoordSeq_getOrdinate"></a>

## geos.GEOSCoordSeq\_getOrdinate ⇒ <code>number</code> ⏏
Get an ordinate value from a coordinate sequence.

**Kind**: Exported member  
**Returns**: <code>number</code> - The ordinate value, or NaN on error.  
**See**: https://libgeos.org/doxygen/geos__c_8h.html#a9b7d0e4b5c8f2d7e4a9b0d6c3a9f1a7c  

| Param | Type | Description |
| --- | --- | --- |
| s | <code>number</code> | The pointer to the coordinate sequence. |
| idx | <code>number</code> | The index of the coordinate to get the ordinate from. |
| dim | <code>number</code> | The dimension of the ordinate to get (0 for X, 1 for Y, 2 for Z, 3 for M). |


---
<a name="exp_module_geos--geos.GEOSCoordSeq_getOrdinate_r"></a>

## geos.GEOSCoordSeq\_getOrdinate\_r ⇒ <code>number</code> ⏏
Get an ordinate value from a coordinate sequence in a thread-safe way.

**Kind**: Exported member  
**Returns**: <code>number</code> - 1 on success, 0 on error.  
**See**: https://libgeos.org/doxygen/geos__c_8h.html#a4f2a6b1f8e9a1c0e3f9c6e7d5a3f6b5a  

| Param | Type | Description |
| --- | --- | --- |
| handle | <code>number</code> | A pointer to the GEOS context handle. |
| s | <code>number</code> | The pointer to the coordinate sequence. |
| idx | <code>number</code> | The index of the coordinate to get the ordinate from. |
| dim | <code>number</code> | The dimension of the ordinate to get (0 for X, 1 for Y, 2 for Z, 3 for M). |
| val | <code>number</code> | The pointer to a double variable to store the ordinate value. |


---
<a name="exp_module_geos--geos.GEOSCoordSeq_getSize"></a>

## geos.GEOSCoordSeq\_getSize ⇒ <code>number</code> ⏏
Get the size of a coordinate sequence.

**Kind**: Exported member  
**Returns**: <code>number</code> - 1 on success, 0 on exception.  

| Param | Type | Description |
| --- | --- | --- |
| s | <code>number</code> | A pointer to a GEOSCoordSequence object. |
| size | <code>number</code> | A pointer to an unsigned int to store the size. |


---
<a name="exp_module_geos--geos.GEOSCoordSeq_getSize_r"></a>

## geos.GEOSCoordSeq\_getSize\_r ⇒ <code>number</code> ⏏
Get the size of a coordinate sequence (thread-safe).

**Kind**: Exported member  
**Returns**: <code>number</code> - 1 on success, 0 on exception.  

| Param | Type | Description |
| --- | --- | --- |
| handle | <code>number</code> | A GEOS context handle. |
| s | <code>number</code> | A pointer to a GEOSCoordSequence object. |
| size | <code>number</code> | A pointer to an unsigned int to store the size. |


---
<a name="exp_module_geos--geos.GEOSCoordSeq_getX"></a>

## geos.GEOSCoordSeq\_getX ⇒ <code>number</code> ⏏
Get the X ordinate value from a coordinate sequence.

**Kind**: Exported member  
**Returns**: <code>number</code> - 1 on success, 0 on error.  
**See**: https://libgeos.org/doxygen/geos__c_8h.html#a9b7d0e4b5c8f2d7e4a9b0d6c3a9f1a7c  

| Param | Type | Description |
| --- | --- | --- |
| s | <code>number</code> | The pointer to the coordinate sequence. |
| idx | <code>number</code> | The index of the coordinate to get the X ordinate from. |
| x | <code>number</code> | The pointer to a double variable to store the X ordinate value. |


---
<a name="exp_module_geos--geos.GEOSCoordSeq_getXY"></a>

## geos.GEOSCoordSeq\_getXY ⇒ <code>number</code> ⏏
Get the X and Y ordinate values of a coordinate in a sequence.

**Kind**: Exported member  
**Returns**: <code>number</code> - 1 on success, 0 on exception.  

| Param | Type | Description |
| --- | --- | --- |
| s | <code>number</code> | The coordinate sequence handle. |
| idx | <code>number</code> | The index of the coordinate to get, zero based. |
| x | <code>number</code> | A pointer to a double where the X ordinate value will be stored. |
| y | <code>number</code> | A pointer to a double where the Y ordinate value will be stored. |


---
<a name="exp_module_geos--geos.GEOSCoordSeq_getXYZ"></a>

## geos.GEOSCoordSeq\_getXYZ ⇒ <code>number</code> ⏏
Get the X, Y and Z ordinate values of a coordinate in a sequence.

**Kind**: Exported member  
**Returns**: <code>number</code> - 1 on success, 0 on exception.  

| Param | Type | Description |
| --- | --- | --- |
| s | <code>number</code> | The coordinate sequence handle. |
| idx | <code>number</code> | The index of the coordinate to get, zero based. |
| x | <code>number</code> | A pointer to a double where the X ordinate value will be stored. |
| y | <code>number</code> | A pointer to a double where the Y ordinate value will be stored. |
| z | <code>number</code> | A pointer to a double where the Z ordinate value will be stored. |


---
<a name="exp_module_geos--geos.GEOSCoordSeq_getXYZ_r"></a>

## geos.GEOSCoordSeq\_getXYZ\_r ⇒ <code>number</code> ⏏
Get the X, Y and Z ordinate values of a coordinate in a sequence using a context handle.

**Kind**: Exported member  
**Returns**: <code>number</code> - 1 on success, 0 on exception.  

| Param | Type | Description |
| --- | --- | --- |
| handle | <code>number</code> | The context handle. |
| s | <code>number</code> | The coordinate sequence handle. |
| idx | <code>number</code> | The index of the coordinate to get, zero based. |
| x | <code>number</code> | A pointer to a double where the X ordinate value will be stored. |
| y | <code>number</code> | A pointer to a double where the Y ordinate value will be stored. |
| z | <code>number</code> | A pointer to a double where the Z ordinate value will be stored. |


---
<a name="exp_module_geos--geos.GEOSCoordSeq_getXY_r"></a>

## geos.GEOSCoordSeq\_getXY\_r ⇒ <code>number</code> ⏏
Get the X and Y ordinate values of a coordinate in a sequence using a context handle.

**Kind**: Exported member  
**Returns**: <code>number</code> - 1 on success, 0 on exception.  

| Param | Type | Description |
| --- | --- | --- |
| handle | <code>number</code> | The context handle. |
| s | <code>number</code> | The coordinate sequence handle. |
| idx | <code>number</code> | The index of the coordinate to get, zero based. |
| x | <code>number</code> | A pointer to a double where the X ordinate value will be stored. |
| y | <code>number</code> | A pointer to a double where the Y ordinate value will be stored. |


---
<a name="exp_module_geos--geos.GEOSCoordSeq_getX_r"></a>

## geos.GEOSCoordSeq\_getX\_r ⇒ <code>number</code> ⏏
Gets the X ordinate value for a given coordinate in a GEOSCoordSequence.

**Kind**: Exported member  
**Returns**: <code>number</code> - 1 on success, 0 on exception.  

| Param | Type | Description |
| --- | --- | --- |
| handle | <code>number</code> | The GEOS context pointer handle. |
| s | <code>number</code> | A pointer to the GEOSCoordSequence to query. |
| idx | <code>number</code> | The coordinate index. |
| val | <code>number</code> | A pointer to a double to store the X ordinate value. |


---
<a name="exp_module_geos--geos.GEOSCoordSeq_getY"></a>

## geos.GEOSCoordSeq\_getY ⇒ <code>number</code> ⏏
Get the Y ordinate value from a coordinate sequence.

**Kind**: Exported member  
**Returns**: <code>number</code> - 1 on success, 0 on error.  
**See**: https://libgeos.org/doxygen/geos__c_8h.html#a9b7d0e4b5c8f2d7e4a9b0d6c3a9f1a7c  

| Param | Type | Description |
| --- | --- | --- |
| s | <code>number</code> | The pointer to the coordinate sequence. |
| idx | <code>number</code> | The index of the coordinate to get the Y ordinate from. |
| y | <code>number</code> | The pointer to a double variable to store the Y ordinate value. |


---
<a name="exp_module_geos--geos.GEOSCoordSeq_getY_r"></a>

## geos.GEOSCoordSeq\_getY\_r ⇒ <code>number</code> ⏏
Gets the Y ordinate value for a given coordinate in a GEOSCoordSequence.

**Kind**: Exported member  
**Returns**: <code>number</code> - 1 on success, 0 on exception.  

| Param | Type | Description |
| --- | --- | --- |
| handle | <code>number</code> | The GEOS context pointer handle. |
| s | <code>number</code> | A pointer to the GEOSCoordSequence to query. |
| idx | <code>number</code> | The coordinate index. |
| val | <code>number</code> | A pointer to a double to store the Y ordinate value. |


---
<a name="exp_module_geos--geos.GEOSCoordSeq_getZ"></a>

## geos.GEOSCoordSeq\_getZ ⇒ <code>number</code> ⏏
Get the Z ordinate value of a coordinate in a sequence.

**Kind**: Exported member  
**Returns**: <code>number</code> - 1 on success, 0 on exception.  

| Param | Type | Description |
| --- | --- | --- |
| s | <code>number</code> | The coordinate sequence handle. |
| idx | <code>number</code> | The index of the coordinate to get, zero based. |
| val | <code>number</code> | A pointer to a double where the ordinate value will be stored. |


---
<a name="exp_module_geos--geos.GEOSCoordSeq_getZ_r"></a>

## geos.GEOSCoordSeq\_getZ\_r ⇒ <code>number</code> ⏏
Gets the Z ordinate value for a given coordinate in a GEOSCoordSequence. This is equivalent to GEOSCoordSeq_getZ_ with an additional context handle parameter.

**Kind**: Exported member  
**Returns**: <code>number</code> - 1 on success, 0 on exception.  

| Param | Type | Description |
| --- | --- | --- |
| handle | <code>number</code> | The GEOS context pointer handle. |
| s | <code>number</code> | A pointer to the GEOSCoordSequence to query. |
| idx | <code>number</code> | The coordinate index. |
| val | <code>number</code> | A pointer to a double to store the Z ordinate value. |


---
<a name="exp_module_geos--geos.GEOSCoordSeq_isCCW"></a>

## geos.GEOSCoordSeq\_isCCW ⇒ <code>number</code> ⏏
Check the orientation of a coordinate sequence. Closure of the sequence is assumed. Invalid (collapsed) or short (fewer than 4 points) sequences return false.

**Kind**: Exported member  
**Returns**: <code>number</code> - 1 on success, 0 on exception.  

| Param | Type | Description |
| --- | --- | --- |
| s | <code>number</code> | A pointer to a GEOSCoordSequence object. |
| is_ccw | <code>number</code> | A pointer to a char to store the result (1 for counter-clockwise, 0 for clockwise). |


---
<a name="exp_module_geos--geos.GEOSCoordSeq_isCCW_r"></a>

## geos.GEOSCoordSeq\_isCCW\_r ⇒ <code>number</code> ⏏
Checks whether a coordinate sequence forms a counter-clockwise ring.

**Kind**: Exported member  
**Returns**: <code>number</code> - 1 on success, 0 on exception.  

| Param | Type | Description |
| --- | --- | --- |
| handle | <code>number</code> | A pointer to the GEOS context handle. |
| s | <code>number</code> | The coordinate sequence to check. |
| is_ccw | <code>number</code> | A pointer to a char variable to store the result (1 if CCW, 0 otherwise). |


---
<a name="exp_module_geos--geos.GEOSCoordSeq_setOrdinate"></a>

## geos.GEOSCoordSeq\_setOrdinate ⇒ <code>number</code> ⏏
Set an ordinate value in a coordinate sequence.

**Kind**: Exported member  
**Returns**: <code>number</code> - 1 on success, 0 on exception.  

| Param | Type | Description |
| --- | --- | --- |
| s | <code>number</code> | The coordinate sequence handle. |
| idx | <code>number</code> | The index of the coordinate to alter, zero based. |
| dim | <code>number</code> | The dimension to set (0=X, 1=Y, 2=Z, 3=M). |
| val | <code>number</code> | The value to set the ordinate to. |


---
<a name="exp_module_geos--geos.GEOSCoordSeq_setOrdinate_r"></a>

## geos.GEOSCoordSeq\_setOrdinate\_r ⇒ <code>number</code> ⏏
Set an ordinate value in a coordinate sequence (thread-safe version).

**Kind**: Exported member  
**Returns**: <code>number</code> - 1 on success, 0 on exception.  

| Param | Type | Description |
| --- | --- | --- |
| handle | <code>number</code> | A pointer to the GEOS context handle. |
| s | <code>number</code> | The coordinate sequence handle. |
| idx | <code>number</code> | The index of the coordinate to alter, zero based. |
| dim | <code>number</code> | The dimension to set (0=X, 1=Y, 2=Z, 3=M). |
| val | <code>number</code> | The value to set the ordinate to. |


---
<a name="exp_module_geos--geos.GEOSCoordSeq_setX"></a>

## geos.GEOSCoordSeq\_setX ⇒ <code>number</code> ⏏
Set X ordinate values in a coordinate sequence.

**Kind**: Exported member  
**Returns**: <code>number</code> - 1 on success, 0 on exception.  

| Param | Type | Description |
| --- | --- | --- |
| s | <code>number</code> | The coordinate sequence handle. |
| idx | <code>number</code> | The index of the coordinate to alter, zero based. |
| val | <code>number</code> | The value to set the ordinate to. |


---
<a name="exp_module_geos--geos.GEOSCoordSeq_setXY"></a>

## geos.GEOSCoordSeq\_setXY ⇒ <code>number</code> ⏏
Set X and Y ordinate values in a coordinate sequence.

**Kind**: Exported member  
**Returns**: <code>number</code> - 0 on exception, 1 otherwise  
**Since**: 2.2  

| Param | Type | Description |
| --- | --- | --- |
| s | <code>number</code> | The coordinate sequence pointer |
| idx | <code>number</code> | The index of the coordinate to alter, zero based |
| x | <code>number</code> | The value to set the X ordinate to |
| y | <code>number</code> | The value to set the Y ordinate to |


---
<a name="exp_module_geos--geos.GEOSCoordSeq_setXYZ"></a>

## geos.GEOSCoordSeq\_setXYZ ⇒ <code>number</code> ⏏
Set X, Y and Z ordinate values in a coordinate sequence.

**Kind**: Exported member  
**Returns**: <code>number</code> - 0 on exception, 1 otherwise  
**Since**: 2.2  

| Param | Type | Description |
| --- | --- | --- |
| s | <code>number</code> | The coordinate sequence pointer |
| idx | <code>number</code> | The index of the coordinate to alter, zero based |
| x | <code>number</code> | The value to set the X ordinate to |
| y | <code>number</code> | The value to set the Y ordinate to |
| z | <code>number</code> | The value to set the Z ordinate to |


---
<a name="exp_module_geos--geos.GEOSCoordSeq_setXYZ_r"></a>

## geos.GEOSCoordSeq\_setXYZ\_r ⇒ <code>number</code> ⏏
Set X, Y and Z ordinate values in a coordinate sequence (reentrant).

**Kind**: Exported member  
**Returns**: <code>number</code> - 0 on exception, 1 otherwise  
**Since**: 3.8.0  

| Param | Type | Description |
| --- | --- | --- |
| handle | <code>number</code> | The context handle pointer |
| s | <code>number</code> | The coordinate sequence pointer |
| idx | <code>number</code> | The index of the coordinate to alter, zero based |
| x | <code>number</code> | The value to set the X ordinate to |
| y | <code>number</code> | The value to set the Y ordinate to |
| z | <code>number</code> | The value to set the Z ordinate to |


---
<a name="exp_module_geos--geos.GEOSCoordSeq_setXY_r"></a>

## geos.GEOSCoordSeq\_setXY\_r ⇒ <code>number</code> ⏏
Set X and Y ordinate values in a coordinate sequence (reentrant).

**Kind**: Exported member  
**Returns**: <code>number</code> - 0 on exception, 1 otherwise  
**Since**: 3.8.0  

| Param | Type | Description |
| --- | --- | --- |
| handle | <code>number</code> | The context handle pointer  * @param {number} s - The coordinate sequence pointer |
| idx | <code>number</code> | The index of the coordinate to alter, zero based |
| x | <code>number</code> | The value to set the X ordinate to |
| y | <code>number</code> | The value to set the Y ordinate to |


---
<a name="exp_module_geos--geos.GEOSCoordSeq_setX_r"></a>

## geos.GEOSCoordSeq\_setX\_r ⇒ <code>number</code> ⏏
Set the X coordinate of a point in a CoordinateSequence

**Kind**: Exported member  
**Returns**: <code>number</code> - 1 on success, 0 on exception  

| Param | Type | Description |
| --- | --- | --- |
| handle | <code>number</code> | The context returned by GEOS_init_r |
| s | <code>number</code> | The CoordinateSequence object |
| idx | <code>number</code> | The index of the point to set |
| val | <code>number</code> | The X coordinate value to set |


---
<a name="exp_module_geos--geos.GEOSCoordSeq_setY"></a>

## geos.GEOSCoordSeq\_setY ⇒ <code>number</code> ⏏
Set Y ordinate values in a coordinate sequence.

**Kind**: Exported member  
**Returns**: <code>number</code> - 1 on success, 0 on exception.  

| Param | Type | Description |
| --- | --- | --- |
| s | <code>number</code> | The coordinate sequence handle. |
| idx | <code>number</code> | The index of the coordinate to alter, zero based. |
| val | <code>number</code> | The value to set the ordinate to. |


---
<a name="exp_module_geos--geos.GEOSCoordSeq_setY_r"></a>

## geos.GEOSCoordSeq\_setY\_r ⇒ <code>number</code> ⏏
Set the Y coordinate of a point in a CoordinateSequence

**Kind**: Exported member  
**Returns**: <code>number</code> - 1 on success, 0 on exception  

| Param | Type | Description |
| --- | --- | --- |
| handle | <code>number</code> | The context returned by GEOS_init_r |
| s | <code>number</code> | The CoordinateSequence object |
| idx | <code>number</code> | The index of the point to set |
| val | <code>number</code> | The Y coordinate value to set |


---
<a name="exp_module_geos--geos.GEOSCoordSeq_setZ"></a>

## geos.GEOSCoordSeq\_setZ ⇒ <code>number</code> ⏏
Set Z ordinate values in a coordinate sequence.

**Kind**: Exported member  
**Returns**: <code>number</code> - 1 on success, 0 on exception.  

| Param | Type | Description |
| --- | --- | --- |
| s | <code>number</code> | The coordinate sequence handle. |
| idx | <code>number</code> | The index of the coordinate to alter, zero based. |
| val | <code>number</code> | The value to set the ordinate to. |


---
<a name="exp_module_geos--geos.GEOSCoordSeq_setZ_r"></a>

## geos.GEOSCoordSeq\_setZ\_r ⇒ <code>number</code> ⏏
Sets the Z ordinate value for a given coordinate in a GEOSCoordSequence.

**Kind**: Exported member  
**Returns**: <code>number</code> - 1 on success, 0 on exception.  

| Param | Type | Description |
| --- | --- | --- |
| handle | <code>number</code> | The GEOS context pointer handle. |
| s | <code>number</code> | A pointer to the GEOSCoordSequence to modify. |
| idx | <code>number</code> | The coordinate index. |
| val | <code>number</code> | The Z ordinate value to set. |


---
