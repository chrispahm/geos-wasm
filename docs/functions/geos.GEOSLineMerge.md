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
<a name="exp_module_geos--geos.GEOSLineMergeDirected"></a>

## geos.GEOSLineMergeDirected ⇒ <code>number</code> ⏏
Sews together a set of fully noded LineStrings
removing any cardinality 2 nodes in the linework
only if possible without changing order of points.

**Kind**: Exported member  
**Returns**: <code>number</code> - The merged linework
Caller is responsible for freeing with GEOSGeom_destroy().  
**See**: geos::operation::linemerge::LineMerger  

| Param | Type | Description |
| --- | --- | --- |
| g | <code>number</code> | The input linework |


---
<a name="exp_module_geos--geos.GEOSLineMergeDirected_r"></a>

## geos.GEOSLineMergeDirected\_r ⇒ <code>number</code> ⏏
Sews together a set of fully noded LineStrings
removing any cardinality 2 nodes in the linework
only if possible without changing order of points.

**Kind**: Exported member  
**Returns**: <code>number</code> - The merged linework
Caller is responsible for freeing with GEOSGeom_destroy().  
**See**: geos::operation::linemerge::LineMerger  

| Param | Type | Description |
| --- | --- | --- |
| handle | <code>number</code> | The GEOS context pointer handle. |
| g | <code>number</code> | The input linework |


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
