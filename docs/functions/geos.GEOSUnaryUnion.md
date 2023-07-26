<a name="exp_module_geos--geos.GEOSUnaryUnion"></a>

## geos.GEOSUnaryUnion ⇒ <code>number</code> ⏏
Computes the union of all the input geometries.

**Kind**: Exported member  
**Returns**: <code>number</code> - A pointer to a new GEOS geometry representing the union, or NULL on exception.  
**See**: https://postgis.net/docs/ST_UnaryUnion.html  

| Param | Type | Description |
| --- | --- | --- |
| geom | <code>number</code> | A pointer to a GEOS geometry. |


---
<a name="exp_module_geos--geos.GEOSUnaryUnionPrec"></a>

## geos.GEOSUnaryUnionPrec ⇒ <code>number</code> ⏏
Computes the union of all the input geometries with a specified precision grid size.

**Kind**: Exported member  
**Returns**: <code>number</code> - A pointer to a new GEOS geometry representing the union, or NULL on exception.  
**See**: https://postgis.net/docs/ST_UnaryUnion.html  

| Param | Type | Description |
| --- | --- | --- |
| geom | <code>number</code> | A pointer to a GEOS geometry. |
| gridSize | <code>number</code> | The size of the precision grid to use for snapping. |


---
<a name="exp_module_geos--geos.GEOSUnaryUnionPrec_r"></a>

## geos.GEOSUnaryUnionPrec\_r ⇒ <code>number</code> ⏏
Computes the union of all the input geometries with a specified precision grid size using a GEOS context handle.

**Kind**: Exported member  
**Returns**: <code>number</code> - A pointer to a new GEOS geometry representing the union, or NULL on exception.  
**See**: https://docs.rs/geos-sys/2.0.3/geos_sys/fn.GEOSUnaryUnionPrec_r.html  

| Param | Type | Description |
| --- | --- | --- |
| handle | <code>number</code> | A pointer to a GEOS context handle. |
| geom | <code>number</code> | A pointer to a GEOS geometry. |
| gridSize | <code>number</code> | The size of the precision grid to use for snapping. |


---
<a name="exp_module_geos--geos.GEOSUnaryUnion_r"></a>

## geos.GEOSUnaryUnion\_r ⇒ <code>number</code> ⏏
Computes the union of all the input geometries using a GEOS context handle.

**Kind**: Exported member  
**Returns**: <code>number</code> - A pointer to a new GEOS geometry representing the union, or NULL on exception.  
**See**: https://docs.rs/geos-sys/2.0.3/geos_sys/fn.GEOSUnaryUnion_r.html  

| Param | Type | Description |
| --- | --- | --- |
| handle | <code>number</code> | A pointer to a GEOS context handle. |
| geom | <code>number</code> | A pointer to a GEOS geometry. |


---
