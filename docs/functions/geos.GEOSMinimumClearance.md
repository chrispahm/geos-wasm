<a name="exp_module_geos--geos.GEOSMinimumClearance"></a>

## geos.GEOSMinimumClearance ⇒ <code>number</code> ⏏
Computes the minimum clearance of a geometry. The minimum clearance is the smallest amount by which a vertex could be move to produce an invalid polygon, a non-simple linestring, or a multipoint with repeated points. If a geometry has a minimum clearance of 'eps', it can be said that:

**Kind**: global property of [<code>geos</code>](/typedefs-enums/typedefs-enums.html#module_geos)  
**Returns**: <code>number</code> - 0 if no exception occurred. 2 if an exception occurred.  

| Param | Type | Description |
| --- | --- | --- |
| g | [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) | the input geometry |
| d | [<code>NumberPointer</code>](/typedefs-enums/typedefs-enums.html#NumberPointer) | a double to which the result can be stored |


---
<a name="exp_module_geos--geos.GEOSMinimumClearanceLine"></a>

## geos.GEOSMinimumClearanceLine ⇒ [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) ⏏
Returns a LineString whose endpoints define the minimum clearance of a geometry. If the geometry has no minimum clearance, an empty LineString will be returned.

**Kind**: global property of [<code>geos</code>](/typedefs-enums/typedefs-enums.html#module_geos)  
**Returns**: [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) - a linestring geometry, or NULL if an exception occurred. Caller is responsible for freeing with GEOSGeom_destroy().  

| Param | Type | Description |
| --- | --- | --- |
| g | [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) | the input geometry |


---
<a name="exp_module_geos--geos.GEOSMinimumClearanceLine_r"></a>

## geos.GEOSMinimumClearanceLine\_r ⇒ [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) ⏏
Returns a LineString whose endpoints define the minimum clearance of a geometry. If the geometry has no minimum clearance, an empty LineString will be returned.

**Kind**: global property of [<code>geos</code>](/typedefs-enums/typedefs-enums.html#module_geos)  
**Returns**: [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) - a linestring geometry, or NULL if an exception occurred. Caller is responsible for freeing with GEOSGeom_destroy().  

| Param | Type | Description |
| --- | --- | --- |
| handle | [<code>GEOSContextHandle\_t</code>](/typedefs-enums/typedefs-enums.html#GEOSContextHandle_t) | - |
| g | [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) | the input geometry |


---
<a name="exp_module_geos--geos.GEOSMinimumClearance_r"></a>

## geos.GEOSMinimumClearance\_r ⇒ <code>number</code> ⏏
Computes the minimum clearance of a geometry. The minimum clearance is the smallest amount by which a vertex could be move to produce an invalid polygon, a non-simple linestring, or a multipoint with repeated points. If a geometry has a minimum clearance of 'eps', it can be said that:

**Kind**: global property of [<code>geos</code>](/typedefs-enums/typedefs-enums.html#module_geos)  
**Returns**: <code>number</code> - 0 if no exception occurred. 2 if an exception occurred.  

| Param | Type | Description |
| --- | --- | --- |
| handle | [<code>GEOSContextHandle\_t</code>](/typedefs-enums/typedefs-enums.html#GEOSContextHandle_t) | - |
| g | [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) | the input geometry |
| distance | [<code>NumberPointer</code>](/typedefs-enums/typedefs-enums.html#NumberPointer) | a double to which the result can be stored |


---
