<a name="exp_module_geos--geos.GEOSDisjoint"></a>

## geos.GEOSDisjoint ⇒ <code>number</code> ⏏
Tests if two geometries are disjoint.

**Kind**: Exported member  
**Returns**: <code>number</code> - = 1 if true, 0 if false, -1 on error.  

| Param | Type | Description |
| --- | --- | --- |
| g1 | <code>number</code> | The first geometry pointer. |
| g2 | <code>number</code> | The second geometry pointer. |


---
<a name="exp_module_geos--geos.GEOSDisjointSubsetUnion"></a>

## geos.GEOSDisjointSubsetUnion ⇒ <code>number</code> ⏏
Optimized union algorithm for inputs that can be divided into subsets
that do not intersect. If there is only one such subset, performance
can be expected to be worse than GEOSUnionaryUnion.

**Kind**: Exported member  
**Returns**: <code>number</code> - A newly allocated geometry of the union, or NULL on exception.
Caller is responsible for freeing with GEOSGeom_destroy().  

| Param | Type | Description |
| --- | --- | --- |
| g | <code>number</code> | The input geometry |


---
<a name="exp_module_geos--geos.GEOSDisjointSubsetUnion_r"></a>

## geos.GEOSDisjointSubsetUnion\_r ⇒ <code>number</code> ⏏
Optimized union algorithm for inputs that can be divided into subsets
that do not intersect. If there is only one such subset, performance
can be expected to be worse than GEOSUnionaryUnion.

**Kind**: Exported member  
**Returns**: <code>number</code> - A newly allocated geometry of the union, or NULL on exception.
Caller is responsible for freeing with GEOSGeom_destroy().  

| Param | Type | Description |
| --- | --- | --- |
| handle | <code>number</code> | A pointer to a GEOS context handle. |
| g | <code>number</code> | The input geometry |


---
<a name="exp_module_geos--geos.GEOSDisjoint_r"></a>

## geos.GEOSDisjoint\_r ⇒ <code>number</code> ⏏
Tests if two geometries are disjoint in a given context.

**Kind**: Exported member  
**Returns**: <code>number</code> - = 1 if true, 0 if false, -1 on error.  

| Param | Type | Description |
| --- | --- | --- |
| context | <code>number</code> | A pointer to the GEOS context handle. |
| g1 | <code>number</code> | The first geometry pointer. |
| g2 | <code>number</code> | The second geometry pointer. |


---
