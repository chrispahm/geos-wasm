<a name="exp_module_geos--geos.GEOSHilbertCode"></a>

## geos.GEOSHilbertCode ⇒ <code>number</code> ⏏
Calculate the Hilbert code of the centroid of a geometry relative to an extent. This allows sorting geometries in a deterministic way, such that similar Hilbert codes are likely to be near each other in two-dimensional space. The caller must ensure that the geometry is contained within the extent.

**Kind**: global property of [<code>geos</code>](/typedefs-enums/typedefs-enums.html#module_geos)  
**Returns**: <code>number</code> - 1 on success, 0 on exception.  

| Param | Type | Description |
| --- | --- | --- |
| geom | [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) | Input geometry, must be non-empty |
| extent | [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) | Extent within which to calculate the Hilbert code for geom |
| level | <code>number</code> | The level of precision of the Hilbert curve, up to 16 |
| code | [<code>NumberPointer</code>](/typedefs-enums/typedefs-enums.html#NumberPointer) | Pointer to be filled in with Hilbert code result |


---
<a name="exp_module_geos--geos.GEOSHilbertCode_r"></a>

## geos.GEOSHilbertCode\_r ⇒ <code>number</code> ⏏
Calculate the Hilbert code of the centroid of a geometry relative to an extent. This allows sorting geometries in a deterministic way, such that similar Hilbert codes are likely to be near each other in two-dimensional space. The caller must ensure that the geometry is contained within the extent.

**Kind**: global property of [<code>geos</code>](/typedefs-enums/typedefs-enums.html#module_geos)  
**Returns**: <code>number</code> - 1 on success, 0 on exception.  

| Param | Type | Description |
| --- | --- | --- |
| handle | [<code>GEOSContextHandle\_t</code>](/typedefs-enums/typedefs-enums.html#GEOSContextHandle_t) | - |
| geom | [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) | Input geometry, must be non-empty |
| extent | [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) | Extent within which to calculate the Hilbert code for geom |
| level | <code>number</code> | The level of precision of the Hilbert curve, up to 16 |
| code | [<code>NumberPointer</code>](/typedefs-enums/typedefs-enums.html#NumberPointer) | Pointer to be filled in with Hilbert code result |


---
