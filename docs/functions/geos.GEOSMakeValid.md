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
