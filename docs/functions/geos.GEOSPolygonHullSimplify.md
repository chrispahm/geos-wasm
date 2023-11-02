<a name="exp_module_geos--geos.GEOSPolygonHullSimplify"></a>

## geos.GEOSPolygonHullSimplify ⇒ <code>number</code> ⏏
Computes a boundary-respecting hull of a polygonal geometry,
with hull shape determined by a target parameter
specifying the fraction of the input vertices retained in the result.
Larger values produce less concave results.
A value of 1 produces the convex hull; a value of 0 produces the original geometry.
An outer hull is computed if the parameter is positive,
an inner hull is computed if it is negative.

**Kind**: Exported member  
**Returns**: <code>number</code> - A newly allocated geometry of the concave hull. NULL on exception.

Caller is responsible for freeing with GEOSGeom_destroy().  
**See**: geos::simplify::PolygonHullSimplifier  

| Param | Type | Description |
| --- | --- | --- |
| g | <code>number</code> | the polygonal geometry to process |
| isOuter | <code>number</code> | indicates whether to compute an outer or inner hull (1 for outer hull, 0 for inner) |
| vertexNumFraction | <code>number</code> | the target fraction of the count of input vertices to retain in result |


---
<a name="exp_module_geos--geos.GEOSPolygonHullSimplifyMode"></a>

## geos.GEOSPolygonHullSimplifyMode ⇒ <code>number</code> ⏏
Computes a topology-preserving simplified hull of a polygonal geometry,
with hull shape determined by the parameter, controlled by a parameter
mode, which is one defined in GEOSPolygonHullParameterModes.
Larger values compute less concave results and a value of 0
produces the original geometry.
Either outer or inner hulls can be computed.

**Kind**: Exported member  
**Returns**: <code>number</code> - A newly allocated geometry of the concave hull. NULL on exception.

Caller is responsible for freeing with GEOSGeom_destroy().  
**See**

- geos::simplify::PolygonHullSimplifier
- GEOSPolygonHullParameterModes
- GEOSPolygonHullSimplify


| Param | Type | Description |
| --- | --- | --- |
| g | <code>number</code> | the polygonal geometry to process |
| isOuter | <code>number</code> | indicates whether to compute an outer or inner hull (1 for outer hull, 0 for inner) |
| parameterMode | <code>number</code> | the interpretation to apply to the parameter argument; see GEOSPolygonHullParameterModes |
| parameter | <code>number</code> | the target ratio of area difference to original area |


---
<a name="exp_module_geos--geos.GEOSPolygonHullSimplifyMode_r"></a>

## geos.GEOSPolygonHullSimplifyMode\_r ⇒ <code>number</code> ⏏
Computes a topology-preserving simplified hull of a polygonal geometry,
with hull shape determined by the parameter, controlled by a parameter
mode, which is one defined in GEOSPolygonHullParameterModes.
Larger values compute less concave results and a value of 0
produces the original geometry.
Either outer or inner hulls can be computed.

**Kind**: Exported member  
**Returns**: <code>number</code> - A newly allocated geometry of the concave hull. NULL on exception.

Caller is responsible for freeing with GEOSGeom_destroy().  
**See**

- geos::simplify::PolygonHullSimplifier
- GEOSPolygonHullParameterModes
- GEOSPolygonHullSimplify


| Param | Type | Description |
| --- | --- | --- |
| handle | <code>number</code> | a pointer to an opaque GEOS context handle object |
| g | <code>number</code> | the polygonal geometry to process |
| isOuter | <code>number</code> | indicates whether to compute an outer or inner hull (1 for outer hull, 0 for inner) |
| parameterMode | <code>number</code> | the interpretation to apply to the parameter argument; see GEOSPolygonHullParameterModes |
| parameter | <code>number</code> | the target ratio of area difference to original area |


---
<a name="exp_module_geos--geos.GEOSPolygonHullSimplify_r"></a>

## geos.GEOSPolygonHullSimplify\_r ⇒ <code>number</code> ⏏
Computes a boundary-respecting hull of a polygonal geometry,
with hull shape determined by a target parameter
specifying the fraction of the input vertices retained in the result.
Larger values produce less concave results.
A value of 1 produces the convex hull; a value of 0 produces the original geometry.
An outer hull is computed if the parameter is positive,
an inner hull is computed if it is negative.

**Kind**: Exported member  
**Returns**: <code>number</code> - A newly allocated geometry of the concave hull. NULL on exception.

Caller is responsible for freeing with GEOSGeom_destroy().  
**See**: geos::simplify::PolygonHullSimplifier  

| Param | Type | Description |
| --- | --- | --- |
| handle | <code>number</code> | a pointer to an opaque GEOS context handle object |
| g | <code>number</code> | the polygonal geometry to process |
| isOuter | <code>number</code> | indicates whether to compute an outer or inner hull (1 for outer hull, 0 for inner) |
| vertexNumFraction | <code>number</code> | the target fraction of the count of input vertices to retain in result |


---
