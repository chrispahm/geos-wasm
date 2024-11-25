<a name="exp_module_geos--geos.GEOSEquals"></a>

## geos.GEOSEquals ⇒ <code>number</code> ⏏
Tests if two geometries contain the same set of points in the plane.

**Kind**: global property of [<code>geos</code>](/typedefs-enums/typedefs-enums.html#module_geos)  
**Returns**: <code>number</code> - 1 on true, 0 on false, 2 on exception  

| Param | Type | Description |
| --- | --- | --- |
| g1 | [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) | Input geometry |
| g2 | [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) | Input geometry |


---
<a name="exp_module_geos--geos.GEOSEqualsExact"></a>

## geos.GEOSEqualsExact ⇒ <code>number</code> ⏏
Determine pointwise equality of two geometries, by checking that they have identical structure and that each vertex of g2 is within the distance tolerance of the corresponding vertex in g1. Z and M values are ignored by GEOSEqualsExact, and this function may return true for inputs with different dimensionality. Unlike GEOSEquals(), geometries that are topologically equivalent but have different representations (e.g., LINESTRING (0 0, 1 1) and MULTILINESTRING ((0 0, 1 1)) ) are not considered equal by GEOSEqualsExact().

**Kind**: global property of [<code>geos</code>](/typedefs-enums/typedefs-enums.html#module_geos)  
**Returns**: <code>number</code> - 1 on true, 0 on false, 2 on exception  

| Param | Type | Description |
| --- | --- | --- |
| g1 | [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) | Input geometry |
| g2 | [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) | Input geometry |
| tolerance | <code>number</code> | Tolerance to determine vertex equality |


---
<a name="exp_module_geos--geos.GEOSEqualsExact_r"></a>

## geos.GEOSEqualsExact\_r ⇒ <code>number</code> ⏏
Determine pointwise equality of two geometries, by checking that they have identical structure and that each vertex of g2 is within the distance tolerance of the corresponding vertex in g1. Z and M values are ignored by GEOSEqualsExact, and this function may return true for inputs with different dimensionality. Unlike GEOSEquals(), geometries that are topologically equivalent but have different representations (e.g., LINESTRING (0 0, 1 1) and MULTILINESTRING ((0 0, 1 1)) ) are not considered equal by GEOSEqualsExact().

**Kind**: global property of [<code>geos</code>](/typedefs-enums/typedefs-enums.html#module_geos)  
**Returns**: <code>number</code> - 1 on true, 0 on false, 2 on exception  

| Param | Type | Description |
| --- | --- | --- |
| handle | [<code>GEOSContextHandle\_t</code>](/typedefs-enums/typedefs-enums.html#GEOSContextHandle_t) | - |
| g1 | [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) | Input geometry |
| g2 | [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) | Input geometry |
| tolerance | <code>number</code> | Tolerance to determine vertex equality |


---
<a name="exp_module_geos--geos.GEOSEqualsIdentical"></a>

## geos.GEOSEqualsIdentical ⇒ <code>number</code> ⏏
Determine pointwise equality of two geometries by checking that the structure, ordering, and values of all vertices are identical in all dimensions. NaN values are considered to be equal to other NaN values.

**Kind**: global property of [<code>geos</code>](/typedefs-enums/typedefs-enums.html#module_geos)  
**Returns**: <code>number</code> - 1 on true, 0 on false, 2 on exception  

| Param | Type | Description |
| --- | --- | --- |
| g1 | [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) | Input geometry |
| g2 | [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) | Input geometry |


---
<a name="exp_module_geos--geos.GEOSEqualsIdentical_r"></a>

## geos.GEOSEqualsIdentical\_r ⇒ <code>number</code> ⏏
Determine pointwise equality of two geometries by checking that the structure, ordering, and values of all vertices are identical in all dimensions. NaN values are considered to be equal to other NaN values.

**Kind**: global property of [<code>geos</code>](/typedefs-enums/typedefs-enums.html#module_geos)  
**Returns**: <code>number</code> - 1 on true, 0 on false, 2 on exception  

| Param | Type | Description |
| --- | --- | --- |
| handle | [<code>GEOSContextHandle\_t</code>](/typedefs-enums/typedefs-enums.html#GEOSContextHandle_t) | - |
| g1 | [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) | Input geometry |
| g2 | [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) | Input geometry |


---
<a name="exp_module_geos--geos.GEOSEquals_r"></a>

## geos.GEOSEquals\_r ⇒ <code>number</code> ⏏
Tests if two geometries contain the same set of points in the plane.

**Kind**: global property of [<code>geos</code>](/typedefs-enums/typedefs-enums.html#module_geos)  
**Returns**: <code>number</code> - 1 on true, 0 on false, 2 on exception  

| Param | Type | Description |
| --- | --- | --- |
| handle | [<code>GEOSContextHandle\_t</code>](/typedefs-enums/typedefs-enums.html#GEOSContextHandle_t) | - |
| g1 | [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) | Input geometry |
| g2 | [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) | Input geometry |


---
