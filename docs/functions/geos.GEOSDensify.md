<a name="exp_module_geos--geos.GEOSDensify"></a>

## geos.GEOSDensify ⇒ <code>number</code> ⏏
Returns a geometry with vertices added to make the lines no longer than a given distance.

**Kind**: Exported member  
**Returns**: <code>number</code> - A pointer to a new GEOS geometry object, or NULL on error.  
**See**: https://libgeos.org/doxygen/geos__c_8h.html#a6f0b2f9f1a0c7e4b8a5f2d3c1a7e5c9b  

| Param | Type | Description |
| --- | --- | --- |
| g | <code>number</code> | A pointer to a GEOS geometry object. |
| tolerance | <code>number</code> | The maximum distance between vertices in the output geometry. |


---
<a name="exp_module_geos--geos.GEOSDensify_r"></a>

## geos.GEOSDensify\_r ⇒ <code>number</code> ⏏
Densifies a geometry by adding points along the segments so that the distance between any two consecutive points is less than or equal to a given tolerance.

**Kind**: Exported member  
**Returns**: <code>number</code> - A pointer to a new GEOS geometry object representing the densified geometry, or NULL on error.  
**See**: https://libgeos.org/doxygen/geos__c_8h.html#a6a9f4b9a8d1f2c0f0b3e5f6b7a0c5a2c  

| Param | Type | Description |
| --- | --- | --- |
| ctx | <code>number</code> | A GEOS context handle. |
| geom | <code>number</code> | A pointer to a GEOS geometry object. |
| tolerance | <code>number</code> | A positive distance value. |


---
