<a name="exp_module_geos--geos.GEOSMinimumClearance"></a>

## geos.GEOSMinimumClearance ⇒ <code>number</code> ⏏
Computes the minimum clearance distance of a geometry.
The minimum clearance distance is the smallest distance between any pair of points in the geometry.

**Kind**: Exported member  
**Returns**: <code>number</code> - 1 on success, 0 on exception or if no such distance exists (e.g. for an empty or point geometry).  

| Param | Type | Description |
| --- | --- | --- |
| g | <code>number</code> | The input geometry pointer. |
| dist | <code>number</code> | A pointer to store the result distance, or NULL if not needed. |


---
<a name="exp_module_geos--geos.GEOSMinimumClearanceLine"></a>

## geos.GEOSMinimumClearanceLine ⇒ <code>number</code> ⏏
Computes the minimum clearance line of a geometry.
The minimum clearance line is a line connecting two points in the geometry that have the minimum clearance distance between them.

**Kind**: Exported member  
**Returns**: <code>number</code> - A pointer to a LineString containing two points defining the minimum clearance line segment, or NULL on exception or if no such line exists (e.g. for an empty or point geometry).  

| Param | Type | Description |
| --- | --- | --- |
| g | <code>number</code> | The input geometry pointer. |


---
<a name="exp_module_geos--geos.GEOSMinimumClearanceLine_r"></a>

## geos.GEOSMinimumClearanceLine\_r ⇒ <code>number</code> ⏏
Computes the minimum clearance line of a geometry in a reentrant way.
The minimum clearance line is a line connecting two points in the geometry that have the minimum clearance distance between them.

**Kind**: Exported member  
**Returns**: <code>number</code> - A pointer to a LineString containing two points defining the minimum clearance line segment, or NULL on exception or if no such line exists (e.g. for an empty or point geometry).  

| Param | Type | Description |
| --- | --- | --- |
| handle | <code>number</code> | The context handle pointer to use for error reporting. |
| g | <code>number</code> | The input geometry pointer. |


---
<a name="exp_module_geos--geos.GEOSMinimumClearance_r"></a>

## geos.GEOSMinimumClearance\_r ⇒ <code>number</code> ⏏
Computes the minimum clearance of a geometry.
The minimum clearance is the smallest amount by which
a vertex of a geometry can be moved to produce an invalid geometry.

**Kind**: Exported member  
**Returns**: <code>number</code> - 1 on success, 0 on exception.  
**See**: https://github.com/libgeos/geos/blob/main/capi/geos_c.h.in  

| Param | Type | Description |
| --- | --- | --- |
| handle | <code>number</code> | A pointer to the GEOS context handle. |
| g | <code>number</code> | The GEOS geometry to compute the clearance for. |
| d | <code>number</code> | The output parameter for the clearance value. |


---
