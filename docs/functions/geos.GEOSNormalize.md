<a name="exp_module_geos--geos.GEOSNormalize"></a>

## geos.GEOSNormalize ⇒ <code>number</code> ⏏
Normalizes a GEOS geometry object in place, so that it has a canonical form.
A normalized geometry has points in a LineString deduplicated, members of a collection sorted by type,
points in a polygon's rings or a single LinearRing start at the top-left-most point and go clockwise, etc.
This can be useful for unit testing or geometry deduplication.

**Kind**: Exported member  
**Returns**: <code>number</code> - 0 on success, or -1 on exception.  
**See**: https://libgeos.org/doxygen/geos__c_8h.html#a5a7f0c9b3f9a1d0f4e5c2a7b5b3e6a8d  

| Param | Type | Description |
| --- | --- | --- |
| g | <code>number</code> | The GEOS geometry object to normalize. |


---
<a name="exp_module_geos--geos.GEOSNormalize_r"></a>

## geos.GEOSNormalize\_r ⇒ <code>number</code> ⏏
Normalizes a GEOS geometry object in place, so that it has a canonical form (thread-safe version).
A normalized geometry has points in a LineString deduplicated, members of a collection sorted by type,
points in a polygon's rings or a single LinearRing start at the top-left-most point and go clockwise, etc.
This can be useful for unit testing or geometry deduplication.

**Kind**: Exported member  
**Returns**: <code>number</code> - 0 on success, or -1 on exception.  
**See**: https://libgeos.org/doxygen/geos__c_8h.html#a5a7f0c9b3f9a1d0f4e5c2a7b5b3e6a8d  

| Param | Type | Description |
| --- | --- | --- |
| handle | <code>number</code> | A pointer to the GEOS context handle. |
| g | <code>number</code> | The GEOS geometry object to normalize. |


---
