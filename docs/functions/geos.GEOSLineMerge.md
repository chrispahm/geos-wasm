<a name="exp_module_geos--geos.GEOSLineMerge"></a>

## geos.GEOSLineMerge ⇒ <code>number</code> ⏏
Merges a collection of linear components into maximal-length linestrings.

**Kind**: Exported member  
**Returns**: <code>number</code> - A pointer to a multilinestring containing the merged linestrings, or NULL on exception.  
**See**: https://libgeos.org/doxygen/classgeos_1_1operation_1_1linemerge_1_1LineMerger.html  

| Param | Type | Description |
| --- | --- | --- |
| g | <code>number</code> | The input geometry pointer, which must be a collection of linestrings or multilinestrings. |


---
<a name="exp_module_geos--geos.GEOSLineMerge_r"></a>

## geos.GEOSLineMerge\_r ⇒ <code>number</code> ⏏
Merges a collection of linear components into maximal-length linestrings, using a GEOS context handle.

**Kind**: Exported member  
**Returns**: <code>number</code> - A pointer to a multilinestring containing the merged linestrings, or NULL on exception.  
**See**: https://libgeos.org/doxygen/geos__c_8h_source.html  

| Param | Type | Description |
| --- | --- | --- |
| handle | <code>number</code> | The GEOS context pointer handle. |
| g | <code>number</code> | The input geometry pointer, which must be a collection of linestrings or multilinestrings. |


---
