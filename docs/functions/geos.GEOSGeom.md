<a name="exp_module_geos--geos.GEOSGeomFromHEX_buf"></a>

## geos.GEOSGeomFromHEX\_buf ⇒ <code>number</code> ⏏
Converts a hexadecimal representation of WKB to a geometry.

**Kind**: Exported member  
**Returns**: <code>number</code> - A geometry, or NULL on exception. The caller is responsible for destroying it.  

| Param | Type | Description |
| --- | --- | --- |
| hex | <code>string</code> | The hexadecimal string to convert. |
| size | <code>number</code> | The size of the hexadecimal string. |


---
<a name="exp_module_geos--geos.GEOSGeomFromHEX_buf_r"></a>

## geos.GEOSGeomFromHEX\_buf\_r ⇒ <code>number</code> ⏏
Converts a hexadecimal representation of WKB to a geometry with a GEOS context handle.

**Kind**: Exported member  
**Returns**: <code>number</code> - A geometry, or NULL on exception. The caller is responsible for destroying it.  

| Param | Type | Description |
| --- | --- | --- |
| handle | <code>number</code> | A pointer to the GEOS context handle. |
| hex | <code>string</code> | The hexadecimal string to convert. |
| size | <code>number</code> | The size of the hexadecimal string. |


---
<a name="exp_module_geos--geos.GEOSGeomFromWKB_buf"></a>

## geos.GEOSGeomFromWKB\_buf ⇒ <code>number</code> ⏏
Converts a WKB representation to a GEOSGeometry.

**Kind**: Exported member  
**Returns**: <code>number</code> - A pointer to a newly allocated GEOSGeometry, or NULL on exception. The caller is responsible for destroying it with GEOSGeom_destroy().  

| Param | Type | Description |
| --- | --- | --- |
| wkb | <code>number</code> | A pointer to a buffer containing the WKB representation of the geometry. |
| size | <code>number</code> | The size of the buffer. |


---
<a name="exp_module_geos--geos.GEOSGeomFromWKB_buf_r"></a>

## geos.GEOSGeomFromWKB\_buf\_r ⇒ <code>number</code> ⏏
Converts a WKB representation to a GEOSGeometry using a context handle.

**Kind**: Exported member  
**Returns**: <code>number</code> - A pointer to a newly allocated GEOSGeometry, or NULL on exception. The caller is responsible for destroying it with GEOSGeom_destroy_r().  

| Param | Type | Description |
| --- | --- | --- |
| handle | <code>number</code> | The context handle.pointer |
| wkb | <code>number</code> | A pointer to a buffer containing the WKB representation of the geometry. |
| size | <code>number</code> | The size of the buffer. |


---
<a name="exp_module_geos--geos.GEOSGeomFromWKT"></a>

## geos.GEOSGeomFromWKT ⇒ <code>number</code> ⏏
Returns a GEOSGeometry from a Well-Known Text (WKT) representation.

**Kind**: Exported member  
**Returns**: <code>number</code> - A pointer to the GEOSGeometry object.  

| Param | Type | Description |
| --- | --- | --- |
| wkt | <code>number</code> | The WKT representation of the geometry. |


---
<a name="exp_module_geos--geos.GEOSGeomFromWKT_r"></a>

## geos.GEOSGeomFromWKT\_r ⇒ <code>number</code> ⏏
Returns a GEOSGeometry from a Well-Known Text (WKT) representation.

**Kind**: Exported member  
**Returns**: <code>number</code> - A pointer to the GEOSGeometry object.  

| Param | Type | Description |
| --- | --- | --- |
| handle | <code>number</code> | A pointer to the GEOS context handle. |
| wkt | <code>number</code> | The WKT representation of the geometry. |


---
<a name="exp_module_geos--geos.GEOSGeomGetEndPoint"></a>

## geos.GEOSGeomGetEndPoint ⇒ <code>number</code> ⏏
Returns the endpoint of a LineString geometry.

**Kind**: Exported member  
**Returns**: <code>number</code> - A pointer to a newly allocated GEOSGeometry object representing the endpoint, or NULL on exception.  
**See**: https://libgeos.org/doxygen/geos__c_8h.html#a9c6f7f5d3b9a0f1a0d4c1a4e2a0b6e8b  

| Param | Type | Description |
| --- | --- | --- |
| geom | <code>number</code> | A pointer to a GEOSGeometry object. |


---
<a name="exp_module_geos--geos.GEOSGeomGetEndPoint_r"></a>

## geos.GEOSGeomGetEndPoint\_r ⇒ <code>number</code> ⏏
Returns the endpoint of a LineString geometry.

**Kind**: Exported member  
**Returns**: <code>number</code> - A pointer to a newly allocated GEOSGeometry object representing the endpoint, or NULL on exception.  
**See**: https://libgeos.org/doxygen/geos__c_8h.html#a9c6f7f5d3b9a0f1a0d4c1a4e2a0b6e8b  

| Param | Type | Description |
| --- | --- | --- |
| handle | <code>number</code> | A GEOS context handle. |
| geom | <code>number</code> | A pointer to a GEOSGeometry object. |


---
<a name="exp_module_geos--geos.GEOSGeomGetLength"></a>

## geos.GEOSGeomGetLength ⇒ <code>number</code> ⏏
Computes the length of a geometry.

**Kind**: Exported member  
**Returns**: <code>number</code> - 1 on success, 0 on exception.  
**See**: https://libgeos.org/doxygen/geos__c_8h.html#a4e9f6a5bbec6edea7adba6ffac72fe48  

| Param | Type | Description |
| --- | --- | --- |
| geom | <code>number</code> | A pointer to a GEOSGeometry object. |
| length | <code>number</code> | A pointer to a double value that will store the result. |


---
<a name="exp_module_geos--geos.GEOSGeomGetLength_r"></a>

## geos.GEOSGeomGetLength\_r ⇒ <code>number</code> ⏏
Computes the length of a geometry.

**Kind**: Exported member  
**Returns**: <code>number</code> - 1 on success, 0 on exception.  

| Param | Type | Description |
| --- | --- | --- |
| handle | <code>number</code> | A pointer to the GEOS context handle. |
| g | <code>number</code> | The GEOS geometry pointer. |
| length | <code>number</code> | The output parameter for the length value. |


---
<a name="exp_module_geos--geos.GEOSGeomGetNumPoints"></a>

## geos.GEOSGeomGetNumPoints ⇒ <code>number</code> ⏏
Returns the number of points in a geometry.

**Kind**: Exported member  
**Returns**: <code>number</code> - The number of points, or -1 on exception.  

| Param | Type | Description |
| --- | --- | --- |
| g | <code>number</code> | The GEOS geometry pointer. |


---
<a name="exp_module_geos--geos.GEOSGeomGetNumPoints_r"></a>

## geos.GEOSGeomGetNumPoints\_r ⇒ <code>number</code> ⏏
Returns the number of points in a geometry.

**Kind**: Exported member  
**Returns**: <code>number</code> - The number of points, or -1 on exception.  

| Param | Type | Description |
| --- | --- | --- |
| handle | <code>number</code> | A pointer to the GEOS context handle. |
| g | <code>number</code> | The GEOS geometry pointer. |


---
<a name="exp_module_geos--geos.GEOSGeomGetPointN"></a>

## geos.GEOSGeomGetPointN ⇒ <code>number</code> ⏏
Return the Nth point of a LineString.

**Kind**: Exported member  
**Returns**: <code>number</code> - A Point geometry. Caller must free with GEOSGeom_destroy().
NULL on exception or if n is out of range.  

| Param | Type | Description |
| --- | --- | --- |
| g | <code>number</code> | The input geometry, must be a LineString. |
| n | <code>number</code> | The index of the point to return, starting from 0. |


---
<a name="exp_module_geos--geos.GEOSGeomGetPointN_r"></a>

## geos.GEOSGeomGetPointN\_r ⇒ <code>number</code> ⏏
Return the Nth point of a LineString (thread-safe version).

**Kind**: Exported member  
**Returns**: <code>number</code> - A Point geometry. Caller must free with GEOSGeom_destroy().
NULL on exception or if n is out of range.  

| Param | Type | Description |
| --- | --- | --- |
| handle | <code>number</code> | A pointer to the GEOS context handle. |
| g | <code>number</code> | The input geometry, must be a LineString. |
| n | <code>number</code> | The index of the point to return, starting from 0. |


---
<a name="exp_module_geos--geos.GEOSGeomGetStartPoint"></a>

## geos.GEOSGeomGetStartPoint ⇒ <code>number</code> ⏏
Return the first point of a LineString.

**Kind**: Exported member  
**Returns**: <code>number</code> - A Point geometry. Caller must free with GEOSGeom_destroy().
NULL on exception.  

| Param | Type | Description |
| --- | --- | --- |
| g | <code>number</code> | The input geometry, must be a LineString. |


---
<a name="exp_module_geos--geos.GEOSGeomGetStartPoint_r"></a>

## geos.GEOSGeomGetStartPoint\_r ⇒ <code>number</code> ⏏
Returns the first point of a geometry.

**Kind**: Exported member  
**Returns**: <code>number</code> - The GEOS geometry pointer of the start point, or null if the input is not a lineal geometry.  
**See**: [GEOSGeomGetStartPoint_r](https://libgeos.org/doxygen/geos__c_8h.html#a9b7a6c0f5f8a2f2d0e3a4b9e1c3f8d6c)  

| Param | Type | Description |
| --- | --- | --- |
| handle | <code>number</code> | A pointer to the GEOS context handle. |
| g | <code>number</code> | The GEOS geometry pointer. |


---
<a name="exp_module_geos--geos.GEOSGeomGetX"></a>

## geos.GEOSGeomGetX ⇒ <code>number</code> ⏏
Returns the X coordinate of a point geometry.

**Kind**: Exported member  
**Returns**: <code>number</code> - 1 on success, 0 on exception.  

| Param | Type | Description |
| --- | --- | --- |
| g | <code>number</code> | The GEOS geometry pointer. Must be a point geometry. |
| x | <code>number</code> | The output parameter for the X coordinate value. |


---
<a name="exp_module_geos--geos.GEOSGeomGetX_r"></a>

## geos.GEOSGeomGetX\_r ⇒ <code>number</code> ⏏
Returns the X coordinate of a point geometry.

**Kind**: Exported member  
**Returns**: <code>number</code> - 1 on success, 0 on exception.  

| Param | Type | Description |
| --- | --- | --- |
| handle | <code>number</code> | A pointer to the GEOS context handle. |
| g | <code>number</code> | The GEOS geometry pointer. Must be a point geometry. |
| x | <code>number</code> | The output parameter for the X coordinate value. |


---
<a name="exp_module_geos--geos.GEOSGeomGetY"></a>

## geos.GEOSGeomGetY ⇒ <code>number</code> ⏏
Returns the Y coordinate of a point geometry.

**Kind**: Exported member  
**Returns**: <code>number</code> - 1 on success, 0 on exception.  

| Param | Type | Description |
| --- | --- | --- |
| g | <code>number</code> | A pointer to a GEOSGeometry object of type Point. |
| value | <code>number</code> | A pointer to a double where the result will be stored. |


---
<a name="exp_module_geos--geos.GEOSGeomGetY_r"></a>

## geos.GEOSGeomGetY\_r ⇒ <code>number</code> ⏏
Returns the Y coordinate of a point geometry in a thread-safe manner.

**Kind**: Exported member  
**Returns**: <code>number</code> - 1 on success, 0 on exception.  

| Param | Type | Description |
| --- | --- | --- |
| handle | <code>number</code> | A GEOS context handle created by GEOS_init_r(). |
| g | <code>number</code> | A pointer to a GEOSGeometry object of type Point. |
| value | <code>number</code> | A pointer to a double where the result will be stored. |


---
<a name="exp_module_geos--geos.GEOSGeomGetZ"></a>

## geos.GEOSGeomGetZ ⇒ <code>number</code> ⏏
Returns the Z coordinate of a point geometry.

**Kind**: Exported member  
**Returns**: <code>number</code> - 1 on success, 0 on exception.  

| Param | Type | Description |
| --- | --- | --- |
| g | <code>number</code> | A pointer to a GEOSGeometry object of type Point. |
| value | <code>number</code> | A pointer to a double where the result will be stored. |


---
<a name="exp_module_geos--geos.GEOSGeomGetZ_r"></a>

## geos.GEOSGeomGetZ\_r ⇒ <code>number</code> ⏏
Returns the Z coordinate of a point geometry in a thread-safe manner.

**Kind**: Exported member  
**Returns**: <code>number</code> - 1 on success, 0 on exception.  

| Param | Type | Description |
| --- | --- | --- |
| handle | <code>number</code> | A GEOS context handle created by GEOS_init_r(). |
| g | <code>number</code> | A pointer to a GEOSGeometry object of type Point. |
| value | <code>number</code> | A pointer to a double where the result will be stored. |


---
<a name="exp_module_geos--geos.GEOSGeomToHEX_buf"></a>

## geos.GEOSGeomToHEX\_buf ⇒ <code>string</code> ⏏
Converts a GEOSGeometry to a HEX-encoded WKB representation.

**Kind**: Exported member  
**Returns**: <code>string</code> - A null-terminated string containing the HEX-encoded WKB representation of the geometry, or NULL on exception. The caller is responsible for freeing the string with GEOSFree().  

| Param | Type | Description |
| --- | --- | --- |
| g | <code>number</code> | The geometry pointer to convert. |
| size | <code>number</code> | A pointer to a size_t where the length of the returned string will be stored. |


---
<a name="exp_module_geos--geos.GEOSGeomToHEX_buf_r"></a>

## geos.GEOSGeomToHEX\_buf\_r ⇒ <code>string</code> ⏏
Converts a geometry to a hexadecimal representation of its WKB.

**Kind**: Exported member  
**Returns**: <code>string</code> - A null-terminated hexadecimal string, or NULL on exception. The caller is responsible for freeing it.  

| Param | Type | Description |
| --- | --- | --- |
| handle | <code>number</code> | A pointer to the GEOS context handle. |
| g | <code>number</code> | The geometry to convert. |
| size | <code>number</code> | A pointer to a size_t where the size of the returned buffer will be stored. |


---
<a name="exp_module_geos--geos.GEOSGeomToWKB_buf"></a>

## geos.GEOSGeomToWKB\_buf ⇒ <code>number</code> ⏏
Converts a GEOSGeometry to a WKB representation.

**Kind**: Exported member  
**Returns**: <code>number</code> - A pointer to a buffer containing the WKB representation of the geometry, or NULL on exception. The caller is responsible for freeing the buffer with GEOSFree().  

| Param | Type | Description |
| --- | --- | --- |
| g | <code>number</code> | The geometry pointer to convert. |
| size | <code>number</code> | A pointer to a size_t where the size of the returned buffer will be stored. |


---
<a name="exp_module_geos--geos.GEOSGeomToWKB_buf_r"></a>

## geos.GEOSGeomToWKB\_buf\_r ⇒ <code>number</code> ⏏
Converts a GEOSGeometry to a WKB representation using a context handle.

**Kind**: Exported member  
**Returns**: <code>number</code> - A pointer to a buffer containing the WKB representation of the geometry, or NULL on exception. The caller is responsible for freeing the buffer with GEOSFree_r().  

| Param | Type | Description |
| --- | --- | --- |
| handle | <code>number</code> | The context handle.pointer |
| g | <code>number</code> | The geometry pointer to convert. |
| size | <code>number</code> | A pointer to a size_t where the size of the returned buffer will be stored. |


---
<a name="exp_module_geos--geos.GEOSGeomToWKT"></a>

## geos.GEOSGeomToWKT ⇒ <code>number</code> ⏏
Returns a Well-Known Text (WKT) representation of a GEOSGeometry.

**Kind**: Exported member  
**Returns**: <code>number</code> - A WKT representation of the geometry.  

| Param | Type | Description |
| --- | --- | --- |
| geom | <code>number</code> | A pointer to the GEOSGeometry object. |


---
<a name="exp_module_geos--geos.GEOSGeomToWKT_r"></a>

## geos.GEOSGeomToWKT\_r ⇒ <code>number</code> ⏏
Returns a Well-Known Text (WKT) representation of a GEOSGeometry.

**Kind**: Exported member  
**Returns**: <code>number</code> - A WKT representation of the geometry.  

| Param | Type | Description |
| --- | --- | --- |
| handle | <code>number</code> | A pointer to the GEOS context handle. |
| geom | <code>number</code> | A pointer to the GEOSGeometry object. |


---
<a name="exp_module_geos--geos.GEOSGeomType"></a>

## geos.GEOSGeomType ⇒ <code>string</code> ⏏
Returns the type name of a geometry as a string.
The possible values are: "Point", "LineString", "LinearRing", "Polygon", "MultiPoint", "MultiLineString", "MultiPolygon", "GeometryCollection".

**Kind**: Exported member  
**Returns**: <code>string</code> - the type name of the geometry, or NULL on error  

| Param | Type | Description |
| --- | --- | --- |
| g | <code>number</code> | a pointer to a GEOSGeometry object |


---
<a name="exp_module_geos--geos.GEOSGeomTypeId"></a>

## geos.GEOSGeomTypeId ⇒ <code>number</code> ⏏
Returns the type ID of a geometry.

**Kind**: Exported member  
**Returns**: <code>number</code> - The type ID of the geometry, or -1 on exception.  
**See**: https://libgeos.org/doxygen/geos__c_8h.html#a6e4b5f2c7d0b6a9a3e7b2d5f8d7f9e4c  

| Param | Type | Description |
| --- | --- | --- |
| g | <code>number</code> | The geometry pointer to get the type ID of. |


---
<a name="exp_module_geos--geos.GEOSGeomTypeId_r"></a>

## geos.GEOSGeomTypeId\_r ⇒ <code>number</code> ⏏
Returns the type ID of a geometry.

**Kind**: Exported member  
**Returns**: <code>number</code> - The type ID of the geometry, or -1 on exception.  
**See**: https://libgeos.org/doxygen/geos__c_8h.html#a3b9d5a4f2e9b4a0c2e8a6f3b1c1d2e0b  

| Param | Type | Description |
| --- | --- | --- |
| handle | <code>number</code> | A pointer to the GEOS context handle. |
| g | <code>number</code> | The geometry pointer to get the type ID of. |


---
<a name="exp_module_geos--geos.GEOSGeomType_r"></a>

## geos.GEOSGeomType\_r ⇒ <code>string</code> ⏏
Returns the name of a geometry's type.

**Kind**: Exported member  
**Returns**: <code>string</code> - The name of the geometry's type, or NULL on exception.  
**See**: https://libgeos.org/doxygen/geos__c_8h.html#a9f3a3f0d6a8c7e9a0b4f2b7c6d0e5f1a  

| Param | Type | Description |
| --- | --- | --- |
| handle | <code>number</code> | A pointer to the GEOS context handle. |
| g | <code>number</code> | The geometry pointer to get the type name of. |


---
<a name="exp_module_geos--geos.GEOSGeom_clone"></a>

## geos.GEOSGeom\_clone ⇒ <code>number</code> ⏏
Clone a geometry object with a different context handle.

**Kind**: Exported member  
**Returns**: <code>number</code> - The pointer to the cloned geometry object, or null on exception.  

| Param | Type | Description |
| --- | --- | --- |
| g | <code>number</code> | The pointer to the geometry object to clone. |


---
<a name="exp_module_geos--geos.GEOSGeom_clone_r"></a>

## geos.GEOSGeom\_clone\_r ⇒ <code>number</code> ⏏
Clone a geometry object.

**Kind**: Exported member  
**Returns**: <code>number</code> - The pointer to the cloned geometry object, or null on exception.  

| Param | Type | Description |
| --- | --- | --- |
| handle | <code>number</code> | A pointer to the GEOS context handle. |
| g | <code>number</code> | The pointer to the geometry object to clone. |


---
<a name="exp_module_geos--geos.GEOSGeom_createCollection"></a>

## geos.GEOSGeom\_createCollection ⇒ <code>number</code> ⏏
Creates a geometry collection of a specified type from an array of geometries.

**Kind**: Exported member  
**Returns**: <code>number</code> - A pointer to a GEOS geometry object representing the collection, or NULL on error.  
**See**: https://libgeos.org/doxygen/geos__c_8h.html#a871ccb7efc6dd63162b3547fcd76c638  

| Param | Type | Description |
| --- | --- | --- |
| type | <code>number</code> | An integer representing the geometry type, such as 1 for POINT, 4 for MULTIPOINT, etc. |
| geoms | <code>number</code> | A pointer to a list of GEOS geometry pointers. |
| ngeoms | <code>number</code> | The number of geometries in the array. |


---
<a name="exp_module_geos--geos.GEOSGeom_createCollection_r"></a>

## geos.GEOSGeom\_createCollection\_r ⇒ <code>number</code> ⏏
Creates a geometry collection of a specified type from an array of geometries using a thread-safe context handle.

**Kind**: Exported member  
**Returns**: <code>number</code> - A pointer to a GEOS geometry object representing the collection, or NULL on error.  
**See**: https://geos.osgeo.org/doxygen/classgeos_1_1geom_1_1GeometryFactory.html#a0c8f6a2a9f5b7a3d7e5c7b0f8b6f9c0e  

| Param | Type | Description |
| --- | --- | --- |
| handle | <code>number</code> | A pointer to a GEOS context handle. |
| type | <code>number</code> | An integer representing the geometry type, such as 1 for POINT, 4 for MULTIPOINT, etc. |
| geoms | <code>number</code> | A pointer to an array of pointers to GEOS geometry objects. |
| ngeoms | <code>number</code> | The number of geometries in the array. |


---
<a name="exp_module_geos--geos.GEOSGeom_createEmptyCollection"></a>

## geos.GEOSGeom\_createEmptyCollection ⇒ <code>number</code> ⏏
Creates an empty geometry collection of a given type.

**Kind**: Exported member  
**Returns**: <code>number</code> - An empty geometry collection, or null on exception.  

| Param | Type | Description |
| --- | --- | --- |
| type | <code>number</code> | The geometry type, one of GEOS_GEOMETRYCOLLECTION, GEOS_MULTIPOINT, GEOS_MULTILINESTRING, GEOS_MULTIPOLYGON. |


---
<a name="exp_module_geos--geos.GEOSGeom_createEmptyCollection_r"></a>

## geos.GEOSGeom\_createEmptyCollection\_r ⇒ <code>number</code> ⏏
Creates an empty geometry collection of a given type with a context handle.

**Kind**: Exported member  
**Returns**: <code>number</code> - An empty geometry collection, or null on exception.  

| Param | Type | Description |
| --- | --- | --- |
| handle | <code>number</code> | A pointer to the GEOS context handle. |
| type | <code>number</code> | The geometry type, one of GEOS_GEOMETRYCOLLECTION, GEOS_MULTIPOINT, GEOS_MULTILINESTRING, GEOS_MULTIPOLYGON. |


---
<a name="exp_module_geos--geos.GEOSGeom_createEmptyLineString"></a>

## geos.GEOSGeom\_createEmptyLineString ⇒ <code>number</code> ⏏
Creates an empty line string geometry.

**Kind**: Exported member  
**Returns**: <code>number</code> - A pointer to a newly allocated empty line string geometry. NULL on exception.
Caller is responsible for freeing with GEOSGeom_destroy().  
**See**: https://libgeos.org/usage/c_api/#geosgeom_createemptylinestring  

---
<a name="exp_module_geos--geos.GEOSGeom_createEmptyLineString_r"></a>

## geos.GEOSGeom\_createEmptyLineString\_r ⇒ <code>number</code> ⏏
Creates an empty line string geometry using a reentrant context handle.

**Kind**: Exported member  
**Returns**: <code>number</code> - A pointer to a newly allocated empty line string geometry. NULL on exception.
Caller is responsible for freeing with GEOSGeom_destroy_r().  
**See**: https://libgeos.org/usage/c_api/#geosgeom_createemptylinestring_r  

| Param | Type | Description |
| --- | --- | --- |
| handle | <code>number</code> | A GEOSContextHandle_t created by GEOS_init_r(). |


---
<a name="exp_module_geos--geos.GEOSGeom_createEmptyPoint"></a>

## geos.GEOSGeom\_createEmptyPoint ⇒ <code>number</code> ⏏
Creates an empty point geometry.

**Kind**: Exported member  
**Returns**: <code>number</code> - An empty point geometry, or null on exception.  

---
<a name="exp_module_geos--geos.GEOSGeom_createEmptyPoint_r"></a>

## geos.GEOSGeom\_createEmptyPoint\_r ⇒ <code>number</code> ⏏
Creates an empty point geometry with a context handle.

**Kind**: Exported member  
**Returns**: <code>number</code> - An empty point geometry, or null on exception.  

| Param | Type | Description |
| --- | --- | --- |
| handle | <code>number</code> | A pointer to the GEOS context handle. |


---
<a name="exp_module_geos--geos.GEOSGeom_createEmptyPolygon"></a>

## geos.GEOSGeom\_createEmptyPolygon ⇒ <code>number</code> ⏏
Creates an empty polygon geometry.

**Kind**: Exported member  
**Returns**: <code>number</code> - A pointer to a newly allocated empty polygon geometry. NULL on exception.
Caller is responsible for freeing with GEOSGeom_destroy().  
**See**: https://libgeos.org/usage/c_api/#geosgeom_createemptypolygon  

---
<a name="exp_module_geos--geos.GEOSGeom_createEmptyPolygon_r"></a>

## geos.GEOSGeom\_createEmptyPolygon\_r ⇒ <code>number</code> ⏏
Creates an empty polygon geometry using a reentrant context handle.

**Kind**: Exported member  
**Returns**: <code>number</code> - A pointer to a newly allocated empty polygon geometry. NULL on exception.
Caller is responsible for freeing with GEOSGeom_destroy_r().  
**See**: https://libgeos.org/usage/c_api/#geosgeom_createemptypolygon_r  

| Param | Type | Description |
| --- | --- | --- |
| handle | <code>number</code> | A GEOSContextHandle_t created by GEOS_init_r(). |


---
<a name="exp_module_geos--geos.GEOSGeom_createLineString"></a>

## geos.GEOSGeom\_createLineString ⇒ <code>number</code> ⏏
Creates a line string geometry from a coordinate sequence.

**Kind**: Exported member  
**Returns**: <code>number</code> - The pointer to the created geometry or NULL on exception.  

| Param | Type | Description |
| --- | --- | --- |
| coordSeq | <code>number</code> | The pointer to the coordinate sequence. |


---
<a name="exp_module_geos--geos.GEOSGeom_createLineString_r"></a>

## geos.GEOSGeom\_createLineString\_r ⇒ <code>number</code> ⏏
Creates a line string geometry from a coordinate sequence.

**Kind**: Exported member  
**Returns**: <code>number</code> - The pointer to the created geometry or NULL on exception.  

| Param | Type | Description |
| --- | --- | --- |
| handle | <code>number</code> | The handle to the GEOS context. |
| coordSeq | <code>number</code> | The pointer to the coordinate sequence. |


---
<a name="exp_module_geos--geos.GEOSGeom_createLinearRing"></a>

## geos.GEOSGeom\_createLinearRing ⇒ <code>number</code> ⏏
Creates a linear ring geometry from a coordinate sequence.
A linear ring is a line string that is both closed and simple.

**Kind**: Exported member  
**Returns**: <code>number</code> - A pointer to a newly allocated linear ring geometry. NULL on exception.
Caller is responsible for freeing with GEOSGeom_destroy().  

| Param | Type | Description |
| --- | --- | --- |
| s | <code>number</code> | A pointer to the coordinate sequence to use. Must have at least four elements and be closed. |


---
<a name="exp_module_geos--geos.GEOSGeom_createLinearRing_r"></a>

## geos.GEOSGeom\_createLinearRing\_r ⇒ <code>number</code> ⏏
Creates a linear ring geometry from a coordinate sequence.

**Kind**: Exported member  
**Returns**: <code>number</code> - The pointer to the created geometry or NULL on exception.  

| Param | Type | Description |
| --- | --- | --- |
| handle | <code>number</code> | The handle to the GEOS context. |
| coordSeq | <code>number</code> | The pointer to the coordinate sequence. |


---
<a name="exp_module_geos--geos.GEOSGeom_createPoint"></a>

## geos.GEOSGeom\_createPoint ⇒ <code>number</code> ⏏
Creates a point geometry from a coordinate sequence.

**Kind**: Exported member  
**Returns**: <code>number</code> - A pointer to a newly allocated point geometry. NULL on exception.
Caller is responsible for freeing with GEOSGeom_destroy().  

| Param | Type | Description |
| --- | --- | --- |
| s | <code>number</code> | The pointer to a coordinate sequence to use. Must have exactly one element. |


---
<a name="exp_module_geos--geos.GEOSGeom_createPointFromXY"></a>

## geos.GEOSGeom\_createPointFromXY ⇒ <code>number</code> ⏏
Creates a point geometry from a pair of coordinates.

**Kind**: Exported member  
**Returns**: <code>number</code> - A pointer to a newly allocated point geometry. NULL on exception.
Caller is responsible for freeing with GEOSGeom_destroy().  
**Since**: 3.8  

| Param | Type | Description |
| --- | --- | --- |
| x | <code>number</code> | The X coordinate |
| y | <code>number</code> | The Y coordinate |


---
<a name="exp_module_geos--geos.GEOSGeom_createPointFromXY_r"></a>

## geos.GEOSGeom\_createPointFromXY\_r ⇒ <code>number</code> ⏏
Creates a point geometry from a pair of coordinates (reentrant).

**Kind**: Exported member  
**Returns**: <code>number</code> - A pointer to a newly allocated point geometry. NULL on exception.
Caller is responsible for freeing with GEOSGeom_destroy_r().  
**Since**: 3.8  

| Param | Type | Description |
| --- | --- | --- |
| handle | <code>number</code> | The context handle topointer  use. |
| x | <code>number</code> | The X coordinate |
| y | <code>number</code> | The Y coordinate |


---
<a name="exp_module_geos--geos.GEOSGeom_createPoint_r"></a>

## geos.GEOSGeom\_createPoint\_r ⇒ <code>number</code> ⏏
Creates a point geometry from a coordinate sequence (reentrant).

**Kind**: Exported member  
**Returns**: <code>number</code> - A pointer to a newly allocated point geometry. NULL on exception.
Caller is responsible for freeing with GEOSGeom_destroy_r().  

| Param | Type | Description |
| --- | --- | --- |
| handle | <code>number</code> | The context handle topointer  use. |
| s | <code>number</code> | The pointer to a coordinate sequence to use. Must have exactly one element. |


---
<a name="exp_module_geos--geos.GEOSGeom_createPolygon"></a>

## geos.GEOSGeom\_createPolygon ⇒ <code>number</code> ⏏
Creates a polygon geometry from an outer ring and an optional array of inner rings.

**Kind**: Exported member  
**Returns**: <code>number</code> - The pointer to the created geometry or NULL on exception.  

| Param | Type | Description |
| --- | --- | --- |
| outerRing | <code>number</code> | The pointer to the outer ring geometry. |
| innerRings | <code>number</code> | The pointer to an array of inner ring geometries. |
| numInnerRings | <code>number</code> | The number of inner rings in the array. |


---
<a name="exp_module_geos--geos.GEOSGeom_createPolygon_r"></a>

## geos.GEOSGeom\_createPolygon\_r ⇒ <code>number</code> ⏏
Creates a polygon geometry from an outer ring and an optional array of inner rings.

**Kind**: Exported member  
**Returns**: <code>number</code> - The pointer to the created geometry or NULL on exception.  

| Param | Type | Description |
| --- | --- | --- |
| handle | <code>number</code> | The handle to the GEOS context. |
| outerRing | <code>number</code> | The pointer to the outer ring geometry. |
| innerRings | <code>number</code> | The pointer to an array of inner ring geometries. |
| numInnerRings | <code>number</code> | The number of inner rings in the array. |


---
<a name="exp_module_geos--geos.GEOSGeom_destroy"></a>

## geos.GEOSGeom\_destroy ⏏
Destroys a geometry object and frees its memory.

**Kind**: Exported member  

| Param | Type | Description |
| --- | --- | --- |
| g | <code>number</code> | A pointer to a GEOSGeometry object. |


---
<a name="exp_module_geos--geos.GEOSGeom_destroy_r"></a>

## geos.GEOSGeom\_destroy\_r ⏏
Destroys a GEOS geometry object.

**Kind**: Exported member  
**See**: https://libgeos.org/doxygen/geos__c_8h.html#a6a7f0c9b3f9a1d0f4e5c2a7b5b3e6a8d  

| Param | Type | Description |
| --- | --- | --- |
| handle | <code>number</code> | A pointer to the GEOS context handle. |
| g | <code>number</code> | The GEOS geometry object to destroy. |


---
<a name="exp_module_geos--geos.GEOSGeom_extractUniquePoints"></a>

## geos.GEOSGeom\_extractUniquePoints ⇒ <code>number</code> ⏏
Returns a multipoint containing all distinct vertices of input geometry g,
which can be any kind of geometry.

**Kind**: Exported member  
**Returns**: <code>number</code> - A pointer to a new GEOSGeometry object representing a multipoint, or NULL on error.  

| Param | Type | Description |
| --- | --- | --- |
| g | <code>number</code> | A pointer to a GEOSGeometry object representing any kind of geometry. |


---
<a name="exp_module_geos--geos.GEOSGeom_extractUniquePoints_r"></a>

## geos.GEOSGeom\_extractUniquePoints\_r ⇒ <code>number</code> ⏏
Extracts every unique point from a geometry.

**Kind**: Exported member  
**Returns**: <code>number</code> - A geometry containing the unique points, or null on exception.  

| Param | Type | Description |
| --- | --- | --- |
| handle | <code>number</code> | A pointer to the GEOS context handle. |
| g | <code>number</code> | The geometry to extract points from. |


---
<a name="exp_module_geos--geos.GEOSGeom_getCoordSeq"></a>

## geos.GEOSGeom\_getCoordSeq ⇒ <code>number</code> ⏏
Returns the coordinate sequence of a geometry.

**Kind**: Exported member  
**Returns**: <code>number</code> - A pointer to the coordinate sequence, or NULL on exception.  

| Param | Type | Description |
| --- | --- | --- |
| g | <code>number</code> | The geometry to get the coordinate sequence from. |


---
<a name="exp_module_geos--geos.GEOSGeom_getCoordSeq_r"></a>

## geos.GEOSGeom\_getCoordSeq\_r ⇒ <code>number</code> ⏏
Returns the coordinate sequence of a geometry with a context handle.

**Kind**: Exported member  
**Returns**: <code>number</code> - A pointer to the coordinate sequence, or NULL on exception.  

| Param | Type | Description |
| --- | --- | --- |
| handle | <code>number</code> | A pointer to the GEOS context handle. |
| g | <code>number</code> | The geometry to get the coordinate sequence from. |


---
<a name="exp_module_geos--geos.GEOSGeom_getCoordinateDimension"></a>

## geos.GEOSGeom\_getCoordinateDimension ⇒ <code>number</code> ⏏
Get the coordinate dimension of a geometry object.

**Kind**: Exported member  
**Returns**: <code>number</code> - The coordinate dimension of the geometry, or 0 on exception.  
**See**: [https://libgeos.org/doxygen/geos__c_8h.html#a3f7a6b7f8b6a3e5d2e9e4a4f5d8a0b1c](https://libgeos.org/doxygen/geos__c_8h.html#a3f7a6b7f8b6a3e5d2e9e4a4f5d8a0b1c)  

| Param | Type | Description |
| --- | --- | --- |
| g | <code>number</code> | The GEOS geometry pointer. |


---
<a name="exp_module_geos--geos.GEOSGeom_getCoordinateDimension_r"></a>

## geos.GEOSGeom\_getCoordinateDimension\_r ⇒ <code>number</code> ⏏
Get the coordinate dimension of a geometry object.

**Kind**: Exported member  
**Returns**: <code>number</code> - The coordinate dimension of the geometry, or 0 on exception.  
**See**: [https://github.com/libgeos/geos/blob/main/capi/geos_c.h.in#L2251](https://github.com/libgeos/geos/blob/main/capi/geos_c.h.in#L2251)  

| Param | Type | Description |
| --- | --- | --- |
| handle | <code>number</code> | A pointer to the GEOS context handle. |
| g | <code>number</code> | The GEOS geometry pointer. |


---
<a name="exp_module_geos--geos.GEOSGeom_getDimensions"></a>

## geos.GEOSGeom\_getDimensions ⇒ <code>number</code> ⏏
Get the inherent dimension of a geometry object, which must be less than or equal to the coordinate dimension.

**Kind**: Exported member  
**Returns**: <code>number</code> - The inherent dimension of the geometry, or -1 on exception.  
**See**: [https://libgeos.org/doxygen/geos__c_8h.html#a4a2a3f2b9c7d6f9f0c8e5b4a0d6c1e7d](https://libgeos.org/doxygen/geos__c_8h.html#a4a2a3f2b9c7d6f9f0c8e5b4a0d6c1e7d)  

| Param | Type | Description |
| --- | --- | --- |
| g | <code>number</code> | The GEOS geometry pointer. |


---
<a name="exp_module_geos--geos.GEOSGeom_getDimensions_r"></a>

## geos.GEOSGeom\_getDimensions\_r ⇒ <code>number</code> ⏏
Get the inherent dimension of a geometry object, which must be less than or equal to the coordinate dimension.

**Kind**: Exported member  
**Returns**: <code>number</code> - The inherent dimension of the geometry, or -1 on exception.  
**See**: [https://github.com/libgeos/geos/blob/main/capi/geos_c.h.in#L2245](https://github.com/libgeos/geos/blob/main/capi/geos_c.h.in#L2245)  

| Param | Type | Description |
| --- | --- | --- |
| handle | <code>number</code> | A pointer to the GEOS context handle. |
| g | <code>number</code> | The GEOS geometry pointer. |


---
<a name="exp_module_geos--geos.GEOSGeom_getPrecision"></a>

## geos.GEOSGeom\_getPrecision ⇒ <code>number</code> ⏏
Get the precision of a geometry object.

**Kind**: Exported member  
**Returns**: <code>number</code> - The precision value of the geometry object, or NaN on exception.  

| Param | Type | Description |
| --- | --- | --- |
| g | <code>number</code> | The pointer to the geometry object to query. |


---
<a name="exp_module_geos--geos.GEOSGeom_getPrecision_r"></a>

## geos.GEOSGeom\_getPrecision\_r ⇒ <code>number</code> ⏏
Get the precision model of a geometry.

**Kind**: Exported member  
**Returns**: <code>number</code> - The precision model value, or 0 on exception.  
**See**: [https://github.com/libgeos/geos/blob/main/capi/geos_c.h.in#L2239](https://github.com/libgeos/geos/blob/main/capi/geos_c.h.in#L2239)  

| Param | Type | Description |
| --- | --- | --- |
| handle | <code>number</code> | A pointer to the GEOS context handle. |
| g | <code>number</code> | The GEOS geometry pointer. |


---
<a name="exp_module_geos--geos.GEOSGeom_getUserData"></a>

## geos.GEOSGeom\_getUserData ⇒ <code>string</code> ⏏
Returns the user data associated with a geometry as a string.

**Kind**: Exported member  
**Returns**: <code>string</code> - The user data of the geometry, or null if not set or not a string.  

| Param | Type | Description |
| --- | --- | --- |
| g | <code>string</code> | A pointer to a GEOSGeometry object. |


---
<a name="exp_module_geos--geos.GEOSGeom_getUserData_r"></a>

## geos.GEOSGeom\_getUserData\_r ⇒ <code>string</code> ⏏
Get the user data pointer associated with a geometry.

**Kind**: Exported member  
**Returns**: <code>string</code> - The user data pointer, or null if none is set.  

| Param | Type | Description |
| --- | --- | --- |
| handle | <code>number</code> | A pointer to the GEOS context handle. |
| g | <code>string</code> | The GEOS geometry object. |


---
<a name="exp_module_geos--geos.GEOSGeom_getXMax"></a>

## geos.GEOSGeom\_getXMax ⇒ <code>number</code> ⏏
Finds the maximum X value in the geometry.

**Kind**: Exported member  
**Returns**: <code>number</code> - 0 on exception  
**Since**: 3.7  

| Param | Type | Description |
| --- | --- | --- |
| g | <code>number</code> | The pointer to the input geometry |
| value | <code>number</code> | The pointer to place the result |


---
<a name="exp_module_geos--geos.GEOSGeom_getXMax_r"></a>

## geos.GEOSGeom\_getXMax\_r ⇒ <code>number</code> ⏏
Returns the maximum X coordinate of the geometry.

**Kind**: Exported member  
**Returns**: <code>number</code> - 1 on success, 0 on exception.  
**See**: https://github.com/libgeos/geos/blob/main/capi/geos_c.h.in#L1652  

| Param | Type | Description |
| --- | --- | --- |
| handle | <code>number</code> | The GEOS context pointer handle. |
| g | <code>number</code> | The input geometry pointer. |
| value | <code>number</code> | The output value. |


---
<a name="exp_module_geos--geos.GEOSGeom_getXMin"></a>

## geos.GEOSGeom\_getXMin ⇒ <code>number</code> ⏏
Finds the minimum X value in the geometry.

**Kind**: Exported member  
**Returns**: <code>number</code> - 0 on exception  
**Since**: 3.7  

| Param | Type | Description |
| --- | --- | --- |
| g | <code>number</code> | The pointer to the input geometry |
| value | <code>number</code> | The pointer to place the result |


---
<a name="exp_module_geos--geos.GEOSGeom_getXMin_r"></a>

## geos.GEOSGeom\_getXMin\_r ⇒ <code>number</code> ⏏
Finds the minimum X value in the geometry (thread-safe version).

**Kind**: Exported member  
**Returns**: <code>number</code> - 0 on exception  
**Since**: 3.7  

| Param | Type | Description |
| --- | --- | --- |
| handle | <code>number</code> | The pointer to the GEOS context |
| g | <code>number</code> | The pointer to the input geometry |
| value | <code>number</code> | The pointer to place the result |


---
<a name="exp_module_geos--geos.GEOSGeom_getYMax"></a>

## geos.GEOSGeom\_getYMax ⇒ <code>number</code> ⏏
Returns the maximum Y coordinate of the geometry.

**Kind**: Exported member  
**Returns**: <code>number</code> - 1 on success, 0 on exception.  
**See**: https://libgeos.org/doxygen/geos__c_8h.html#a9c6f3a7b7d4a5f3a9e8f1c6b0b4e2d9f  

| Param | Type | Description |
| --- | --- | --- |
| g | <code>number</code> | The input geometry pointer. |
| value | <code>number</code> | The output value. |


---
<a name="exp_module_geos--geos.GEOSGeom_getYMax_r"></a>

## geos.GEOSGeom\_getYMax\_r ⇒ <code>number</code> ⏏
Returns the maximum Y coordinate of the geometry.

**Kind**: Exported member  
**Returns**: <code>number</code> - 1 on success, 0 on exception.  
**See**: https://github.com/libgeos/geos/blob/main/capi/geos_c.h.in#L1655  

| Param | Type | Description |
| --- | --- | --- |
| handle | <code>number</code> | The GEOS context pointer handle. |
| g | <code>number</code> | The input geometry pointer. |
| value | <code>number</code> | The output value. |


---
<a name="exp_module_geos--geos.GEOSGeom_getYMin"></a>

## geos.GEOSGeom\_getYMin ⇒ <code>number</code> ⏏
Finds the minimum Y value in the geometry.

**Kind**: Exported member  
**Returns**: <code>number</code> - 0 on exception  
**Since**: 3.7  

| Param | Type | Description |
| --- | --- | --- |
| g | <code>number</code> | The pointer to the input geometry |
| value | <code>number</code> | The pointer to place the result |


---
<a name="exp_module_geos--geos.GEOSGeom_getYMin_r"></a>

## geos.GEOSGeom\_getYMin\_r ⇒ <code>number</code> ⏏
Finds the minimum Y value in the geometry (thread-safe version).

**Kind**: Exported member  
**Returns**: <code>number</code> - 0 on exception  
**Since**: 3.7  

| Param | Type | Description |
| --- | --- | --- |
| handle | <code>number</code> | The pointer to the GEOS context |
| g | <code>number</code> | The pointer to the input geometry |
| value | <code>number</code> | The pointer to place the result |


---
<a name="exp_module_geos--geos.GEOSGeom_setPrecision"></a>

## geos.GEOSGeom\_setPrecision ⇒ <code>number</code> ⏏
Set the precision of a geometry object with a different context handle.

**Kind**: Exported member  
**Returns**: <code>number</code> - 1 on success, 0 on exception.  

| Param | Type | Description |
| --- | --- | --- |
| g | <code>number</code> | The pointer to the geometry object to modify. |
| precision | <code>number</code> | The precision value to set, or 0.0 for full precision. |
| flags | <code>number</code> | The flags to control the behavior of the function. See https://libgeos.org/doxygen/geos__c_8h.html for details. |


---
<a name="exp_module_geos--geos.GEOSGeom_setPrecision_r"></a>

## geos.GEOSGeom\_setPrecision\_r ⇒ <code>number</code> ⏏
Set the precision of a geometry object.

**Kind**: Exported member  
**Returns**: <code>number</code> - 1 on success, 0 on exception.  

| Param | Type | Description |
| --- | --- | --- |
| handle | <code>number</code> | A pointer to the GEOS context handle. |
| g | <code>number</code> | The pointer to the geometry object to modify. |
| precision | <code>number</code> | The precision value to set, or 0.0 for full precision. |
| flags | <code>number</code> | The flags to control the behavior of the function. See https://libgeos.org/doxygen/geos__c_8h.html for details. |


---
<a name="exp_module_geos--geos.GEOSGeom_setUserData"></a>

## geos.GEOSGeom\_setUserData ⏏
Set the user data pointer associated with a geometry.
The user is responsible for freeing the memory of the user data pointer.

**Kind**: Exported member  

| Param | Type | Description |
| --- | --- | --- |
| handle | <code>number</code> | A pointer to the GEOS context handle. |
| g | <code>number</code> | The GEOS geometry object. |
| userData | <code>string</code> | The user data pointer to be set. |


---
<a name="exp_module_geos--geos.GEOSGeom_setUserData_r"></a>

## geos.GEOSGeom\_setUserData\_r ⏏
Set the user data pointer associated with a geometry.
The user is responsible for freeing the memory of the user data pointer.

**Kind**: Exported member  

| Param | Type | Description |
| --- | --- | --- |
| handle | <code>number</code> | A pointer to the GEOS context handle. |
| g | <code>number</code> | The GEOS geometry object. |
| userData | <code>string</code> | The user data pointer to be set. |


---
