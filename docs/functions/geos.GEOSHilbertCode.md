<a name="exp_module_geos--geos.GEOSHilbertCode"></a>

## geos.GEOSHilbertCode ⇒ ⏏
Calculate the
[Hilbert code](https://en.wikipedia.org/wiki/Hilbert_curve)
of the centroid of a geometry relative to an extent.
This allows sorting geometries in a deterministic way, such that similar Hilbert codes are
likely to be near each other in two-dimensional space.
The caller must ensure that the geometry is contained within the extent.

**Kind**: Exported member  
**Returns**: 1 on success, 0 on exception.  

| Param | Type | Description |
| --- | --- | --- |
| handle | <code>number</code> | A pointer to the GEOS context handle. |
| geom | <code>number</code> | [in] Input geometry, must be non-empty |
| extent | <code>number</code> | [in] Extent within which to calculate the Hilbert code for geom |
| level | <code>number</code> | [in] The level of precision of the Hilbert curve, up to 16 |
| code | <code>number</code> | [out] Pointer to be filled in with Hilbert code result |


---
<a name="exp_module_geos--geos.GEOSHilbertCode_r"></a>

## geos.GEOSHilbertCode\_r ⇒ ⏏
Calculate the
[Hilbert code](https://en.wikipedia.org/wiki/Hilbert_curve)
of the centroid of a geometry relative to an extent.
This allows sorting geometries in a deterministic way, such that similar Hilbert codes are
likely to be near each other in two-dimensional space.
The caller must ensure that the geometry is contained within the extent.

**Kind**: Exported member  
**Returns**: 1 on success, 0 on exception.  

| Param | Type | Description |
| --- | --- | --- |
| handle | <code>number</code> | A pointer to the GEOS context handle. |
| geom | <code>number</code> | [in] Input geometry, must be non-empty |
| extent | <code>number</code> | [in] Extent within which to calculate the Hilbert code for geom |
| level | <code>number</code> | [in] The level of precision of the Hilbert curve, up to 16 |
| code | <code>number</code> | [out] Pointer to be filled in with Hilbert code result |


---
