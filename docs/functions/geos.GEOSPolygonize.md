<a name="exp_module_geos--geos.GEOSPolygonize"></a>

## geos.GEOSPolygonize ⇒ <code>number</code> ⏏
Polygonizes a set of Geometries which contain linework that represents the edges of a planar graph.

All types of Geometry are accepted as input; the constituent linework is extracted as the edges to be polygonized.

The edges must be correctly noded; that is, they must only meet at their endpoints and not overlap anywhere. If your edges are not already noded, run them through GEOSUnaryUnion() first. Polygonization will accept incorrectly noded input but will not form polygons from non-noded edges, and reports them as errors.

The Polygonizer reports the following kinds of errors:

- Dangles - edges which have one or both ends which are not incident on another edge endpoint
- Cut Edges - edges which are connected at both ends but which do not form part of a polygon
- Invalid Ring Lines - edges which form rings which are invalid (e.g. the component lines contain a self-intersection)
Errors are reported to output parameters "cuts", "dangles" and "invalid" (if not-null). Formed polygons are returned as a collection. NULL is returned on exception. All returned geometries must be destroyed by caller.

The GEOSPolygonize_valid() variant allows extracting only polygons which form a valid polygonal result. The set of extracted polygons is guaranteed to be edge-disjoint. This is useful when it is known that the input lines form a valid polygonal geometry (which may include holes or nested polygons).

**Kind**: Exported member  
**Returns**: <code>number</code> - A pointer to a GEOS geometry object representing the polygonized geometry, or NULL on error.  
**See**: https://libgeos.org/doxygen/geos__c_8h.html#a9d98e448d3b846d591c726d1c0000d25  

| Param | Type | Description |
| --- | --- | --- |
| geoms | <code>number</code> | A pointer to an array of pointers to GEOS geometry objects representing line segments. |
| ngeoms | <code>number</code> | The number of geometries in the array. |


---
<a name="exp_module_geos--geos.GEOSPolygonize_full"></a>

## geos.GEOSPolygonize\_full ⇒ <code>number</code> ⏏
Polygonizes a set of Geometrys which contain linework that
represents the edges of a planar graph.
All types of Geometry are accepted as input; the constituent
linework is extracted as the edges to be polygonized.
The processed edges must be correctly noded; that is, they must only meet
at their endpoints. The Polygonizer will run on incorrectly noded input
but will not form polygons from non-noded edges, and will report them as errors.

The Polygonizer reports the follow kinds of errors:

- Dangles - edges which have one or both ends which are not incident on another edge endpoint
- Cut Edges - edges which are connected at both ends but which do not form part of a polygon
- Invalid Ring Lines - edges which form rings which are invalid
  (e.g. the component lines contain a self-intersection)

The returned geometry is a collection containing valid polygonal geometry.

**Kind**: Exported member  
**Returns**: <code>number</code> - a pointer to a collection containing the polygons formed by the polygonization  
**See**: https://libgeos.org/doxygen/geos__c_8h.html#a0f0a7f5c9a3b6d7f9b4d1c8e2a0d4f5a  

| Param | Type | Description |
| --- | --- | --- |
| input | <code>number</code> | a pointer to an array of Geometrys |
| cuts | <code>number</code> | if non-null, will be set to a pointer to a collection containing the cut edges found during polygonization |
| dangles | <code>number</code> | if non-null, will be set to a pointer to a collection containing the dangle edges found during polygonization |
| invalidRings | <code>number</code> | if non-null, will be set to a pointer to a collection containing the invalid ring lines found during polygonization |


---
<a name="exp_module_geos--geos.GEOSPolygonize_full_r"></a>

## geos.GEOSPolygonize\_full\_r ⇒ <code>number</code> ⏏
Polygonizes a set of Geometrys which contain linework that
represents the edges of a planar graph.
All types of Geometry are accepted as input; the constituent
linework is extracted as the edges to be polygonized.
The processed edges must be correctly noded; that is, they must only meet
at their endpoints. The Polygonizer will run on incorrectly noded input
but will not form polygons from non-noded edges, and will report them as errors.

The Polygonizer reports the follow kinds of errors:

- Dangles - edges which have one or both ends which are not incident on another edge endpoint
- Cut Edges - edges which are connected at both ends but which do not form part of a polygon
- Invalid Ring Lines - edges which form rings which are invalid
  (e.g. the component lines contain a self-intersection)

The returned geometry is a collection containing valid polygonal geometry.

**Kind**: Exported member  
**Returns**: <code>number</code> - a pointer to a collection containing the polygons formed by the polygonization  
**See**: https://libgeos.org/doxygen/geos__c_8h.html#a1b2a8f7c3b2b6d9a3a0b4c6e1d0f9e1f  

| Param | Type | Description |
| --- | --- | --- |
| handle | <code>number</code> | a pointer to an opaque GEOS context handle object |
| input | <code>number</code> | a pointer to an array of Geometrys |
| cuts | <code>number</code> | if non-null, will be set to a pointer to a collection containing the cut edges found during polygonization |
| dangles | <code>number</code> | if non-null, will be set to a pointer to a collection containing the dangle edges found during polygonization |
| invalidRings | <code>number</code> | if non-null, will be set to a pointer to a collection containing the invalid ring lines found during polygonization |


---
<a name="exp_module_geos--geos.GEOSPolygonize_r"></a>

## geos.GEOSPolygonize\_r ⇒ <code>number</code> ⏏
Polygonizes a set of Geometries which contain linework that represents the edges of a planar graph.

All types of Geometry are accepted as input; the constituent linework is extracted as the edges to be polygonized.

The edges must be correctly noded; that is, they must only meet at their endpoints and not overlap anywhere. If your edges are not already noded, run them through GEOSUnaryUnion() first. Polygonization will accept incorrectly noded input but will not form polygons from non-noded edges, and reports them as errors.

The Polygonizer reports the following kinds of errors:

- Dangles - edges which have one or both ends which are not incident on another edge endpoint
- Cut Edges - edges which are connected at both ends but which do not form part of a polygon
- Invalid Ring Lines - edges which form rings which are invalid (e.g. the component lines contain a self-intersection)
Errors are reported to output parameters "cuts", "dangles" and "invalid" (if not-null). Formed polygons are returned as a collection. NULL is returned on exception. All returned geometries must be destroyed by caller.

The GEOSPolygonize_valid() variant allows extracting only polygons which form a valid polygonal result. The set of extracted polygons is guaranteed to be edge-disjoint. This is useful when it is known that the input lines form a valid polygonal geometry (which may include holes or nested polygons).

**Kind**: Exported member  
**Returns**: <code>number</code> - A GeometryCollection containing the polygons formed by the polygonization.  

| Param | Type | Description |
| --- | --- | --- |
| handle | <code>number</code> | A pointer to the GEOS context handle. |
| geoms | <code>number</code> | A pointer to an array of Geometrys containing the linework to polygonize. |
| ngeoms | <code>number</code> | The number of Geometrys in the array. |


---
<a name="exp_module_geos--geos.GEOSPolygonize_valid"></a>

## geos.GEOSPolygonize\_valid ⇒ <code>number</code> ⏏
Polygonizes a set of valid Geometrys which contain linework that
represents the edges of a planar graph.
All types of Geometry are accepted as input; the constituent
linework is extracted as the edges to be polygonized.
The processed edges must be correctly noded; that is, they must only meet
at their endpoints. The Polygonizer will run on incorrectly noded input
but will not form polygons from non-noded edges,
and will report them as errors.

**Kind**: Exported member  
**Returns**: <code>number</code> - A GeometryCollection containing the polygons formed by the polygonization.  

| Param | Type | Description |
| --- | --- | --- |
| geoms | <code>number</code> | A pointer to an array of valid Geometrys containing the linework to polygonize. |
| ngeoms | <code>number</code> | The number of valid Geometrys in the array. |


---
<a name="exp_module_geos--geos.GEOSPolygonize_valid_r"></a>

## geos.GEOSPolygonize\_valid\_r ⇒ <code>string</code> ⏏
Polygonizes a set of valid Geometrys which contain linework that
represents the edges of a planar graph, using a GEOS context handle.
All types of Geometry are accepted as input; the constituent
linework is extracted as the edges to be polygonized.
The processed edges must be correctly noded; that is, they must only meet
at their endpoints. The Polygonizer will run on incorrectly noded input
but will not form polygons from non-noded edges,
and will report them as errors.

**Kind**: Exported member  
**Returns**: <code>string</code> - A GeometryCollection containing the polygons formed by the polygonization.  

| Param | Type | Description |
| --- | --- | --- |
| handle | <code>number</code> | A pointer to the GEOS context handle. |
| geoms | <code>string</code> | An array of valid Geometrys containing the linework to polygonize. |
| ngeoms | <code>number</code> | The number of valid Geometrys in the array. |


---
<a name="exp_module_geos--geos.GEOSPolygonizer_getCutEdges"></a>

## geos.GEOSPolygonizer\_getCutEdges ⇒ <code>string</code> ⏏
Gets the list of line segments forming the boundary between
inside and outside portions of a set of Geometrys which contain linework that
represents the edges of a planar graph.

**Kind**: Exported member  
**Returns**: <code>string</code> - A MultiLineString containing the boundary segments.  

| Param | Type | Description |
| --- | --- | --- |
| geoms | <code>string</code> | An array of Geometrys containing the linework to process. |
| ngeoms | <code>number</code> | The number of Geometrys in the array. |


---
<a name="exp_module_geos--geos.GEOSPolygonizer_getCutEdges_r"></a>

## geos.GEOSPolygonizer\_getCutEdges\_r ⇒ <code>string</code> ⏏
Gets the list of line segments forming the boundary between
inside and outside portions of a set of Geometrys which contain linework that
represents the edges of a planar graph, using a GEOS context handle.

**Kind**: Exported member  
**Returns**: <code>string</code> - A MultiLineString containing the boundary segments.  

| Param | Type | Description |
| --- | --- | --- |
| handle | <code>number</code> | A pointer to the GEOS context handle. |
| geoms | <code>string</code> | An array of Geometrys containing the linework to process. |
| ngeoms | <code>number</code> | The number of Geometrys in the array. |


---
