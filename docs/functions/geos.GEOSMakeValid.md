<a name="exp_module_geos--geos.GEOSMakeValid"></a>

## geos.GEOSMakeValid ⇒ <code>number</code> ⏏
Returns a geometry which is valid according to the GEOS
validity rules, and preserves as much as possible of the input geometry's extent,
dimension, and structure.

The returned geometry may be a copy of the input, or a new geometry with different structure.

The returned geometry will be valid, or null if an exception occurs.

**Kind**: Exported member  
**Returns**: <code>number</code> - a pointer to a valid Geometry, or null on exception  
**See**: https://libgeos.org/doxygen/geos__c_8h.html#a0f0a7f5c9a3b6d7f9b4d1c8e2a0d4f5a  

| Param | Type | Description |
| --- | --- | --- |
| g | <code>number</code> | a pointer to an input Geometry |


---
<a name="exp_module_geos--geos.GEOSMakeValidParams_create"></a>

## geos.GEOSMakeValidParams\_create ⇒ <code>number</code> ⏏
Creates a GEOSMakeValidParams object, which can be used to control the behavior of the GEOSMakeValid function.

**Kind**: Exported member  
**Returns**: <code>number</code> - A pointer to a GEOSMakeValidParams object, or NULL on error.  
**See**: https://libgeos.org/doxygen/geos__c_8h.html#a9a1f0e0b8a3f7d2b9c6f3f4d5a0b1c8e  

---
<a name="exp_module_geos--geos.GEOSMakeValidParams_create_r"></a>

## geos.GEOSMakeValidParams\_create\_r ⇒ <code>number</code> ⏏
Creates a GEOSMakeValidParams object, which can be used to control the behaviour of the GEOSMakeValid function.

**Kind**: Exported member  
**Returns**: <code>number</code> - A pointer to a GEOSMakeValidParams object, or NULL on error.  
**See**: https://libgeos.org/doxygen/geos__c_8h.html#a5f0c2a4a7b6f9a1e9b3f0a0c8d9d0f1d  

| Param | Type | Description |
| --- | --- | --- |
| ctx | <code>number</code> | A pointer to a GEOS context handle. |


---
<a name="exp_module_geos--geos.GEOSMakeValidParams_destroy"></a>

## geos.GEOSMakeValidParams\_destroy ⇒ <code>void</code> ⏏
Destroys a GEOSMakeValidParams object.

**Kind**: Exported member  
**See**: [12](https://github.com/libgeos/geos)  

| Param | Type | Description |
| --- | --- | --- |
| params | <code>number</code> | A pointer to a GEOSMakeValidParams object. |


---
<a name="exp_module_geos--geos.GEOSMakeValidParams_destroy_r"></a>

## geos.GEOSMakeValidParams\_destroy\_r ⇒ <code>void</code> ⏏
Destroys a GEOSMakeValidParams object.

**Kind**: Exported member  
**See**: https://libgeos.org/doxygen/geos__c_8h.html#a0c9f9a6f5c5e3b1f4b4a0d7f8b7c2a3c  

| Param | Type | Description |
| --- | --- | --- |
| ctx | <code>number</code> | A pointer to a GEOS context handle. |
| params | <code>number</code> | A pointer to a GEOSMakeValidParams object. |


---
<a name="exp_module_geos--geos.GEOSMakeValidParams_setKeepCollapsed_r"></a>

## geos.GEOSMakeValidParams\_setKeepCollapsed\_r ⇒ <code>number</code> ⏏
Attempts to make an invalid geometry valid without losing any of the input vertices.

**Kind**: Exported member  
**Returns**: <code>number</code> - A pointer to a new GEOS geometry object representing the valid geometry, or NULL on error.  
**See**: https://libgeos.org/doxygen/geos__c_8h.html#a4f1a0c3f6f0a7b9b9e2d9c2a6f7b0e8e  

| Param | Type | Description |
| --- | --- | --- |
| ctx | <code>number</code> | A GEOS context handle. |
| params | <code>number</code> | A pointer to a GEOSMakeValidParams object. |
| g | <code>number</code> | A pointer to a GEOS geometry object. |


---
<a name="exp_module_geos--geos.GEOSMakeValidParams_setMethod"></a>

## geos.GEOSMakeValidParams\_setMethod ⇒ <code>number</code> ⏏
Sets the method used to make a geometry valid.

**Kind**: Exported member  
**Returns**: <code>number</code> - A boolean value indicating success or failure.  
**See**: https://libgeos.org/doxygen/geos__c_8h.html#a7a0f4e0c3b6a9f9e1d5c7b9a1d6f0c4e  

| Param | Type | Description |
| --- | --- | --- |
| params | <code>number</code> | A pointer to a GEOSMakeValidParams object. |
| method | <code>number</code> | An integer representing the method, such as 1 for MAKE_VALID_STRUCTURE_PRESERVING, 2 for MAKE_VALID_BUFFERED, etc. |


---
<a name="exp_module_geos--geos.GEOSMakeValidParams_setMethod_r"></a>

## geos.GEOSMakeValidParams\_setMethod\_r ⇒ <code>number</code> ⏏
Sets the method to use for making a geometry valid.

**Kind**: Exported member  
**Returns**: <code>number</code> - A boolean value indicating success or failure.  
**See**: https://libgeos.org/doxygen/geos__c_8h.html#a9b0f7a7a3c5f0f8e1d4b6a9c3c3f1e9b  

| Param | Type | Description |
| --- | --- | --- |
| ctx | <code>number</code> | A pointer to a GEOS context handle. |
| params | <code>number</code> | A pointer to a GEOSMakeValidParams object. |
| method | <code>number</code> | An integer representing the method, such as 1 for MAKE_VALID_STRUCTURE_PRESERVING, 2 for MAKE_VALID_BUFFERED, etc. |


---
<a name="exp_module_geos--geos.GEOSMakeValidWithParams"></a>

## geos.GEOSMakeValidWithParams ⇒ <code>number</code> ⏏
Attempts to make an invalid geometry valid without losing any of the input vertices.

**Kind**: Exported member  
**Returns**: <code>number</code> - A pointer to a new GEOS geometry object representing the valid geometry, or NULL on error.  
**See**: https://libgeos.org/doxygen/geos__c_8h.html#a3a1c0b9f6a5f7a4e0b7c9e9b1f3d8f7c  

| Param | Type | Description |
| --- | --- | --- |
| g | <code>number</code> | A pointer to a GEOS geometry object. |
| params | <code>number</code> | A pointer to a GEOSMakeValidParams object that specifies the options for the operation. |


---
<a name="exp_module_geos--geos.GEOSMakeValidWithParams_r"></a>

## geos.GEOSMakeValidWithParams\_r ⇒ <code>number</code> ⏏
Attempts to make an invalid geometry valid without losing any of the input vertices.

**Kind**: Exported member  
**Returns**: <code>number</code> - A pointer to a new GEOS geometry object representing the valid geometry, or NULL on error.  
**See**: https://libgeos.org/doxygen/geos__c_8h.html#a6f0e9a3b8f2c5b1b4a0d3c7a7f6f5a9d  

| Param | Type | Description |
| --- | --- | --- |
| ctx | <code>number</code> | A GEOS context handle. |
| params | <code>number</code> | A pointer to a GEOSMakeValidParams object. |
| g | <code>number</code> | A pointer to a GEOS geometry object. |


---
<a name="exp_module_geos--geos.GEOSMakeValid_r"></a>

## geos.GEOSMakeValid\_r ⇒ <code>number</code> ⏏
Returns a geometry that is valid according to the GEOS library.

**Kind**: Exported member  
**Returns**: <code>number</code> - A pointer to a valid geometry, or NULL on exception.  
**See**: https://libgeos.org/doxygen/classgeos_1_1operation_1_1valid_1_1MakeValidOp.html  

| Param | Type | Description |
| --- | --- | --- |
| handle | <code>number</code> | The GEOS context pointer handle. |
| g | <code>number</code> | The input geometry pointer. |


---
