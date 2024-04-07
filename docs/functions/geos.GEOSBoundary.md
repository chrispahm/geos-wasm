<a name="exp_module_geos--geos.GEOSBoundary"></a>

## geos.GEOSBoundary ⇒ <code>number</code> ⏏
Computes the boundary of a geometry.

**Kind**: Exported member  
**Returns**: <code>number</code> - A pointer to a new GEOSGeometry object representing the boundary, or NULL on exception.  
**See**: https://libgeos.org/doxygen/geos__c_8h.html  

| Param | Type | Description |
| --- | --- | --- |
| g | <code>number</code> | A pointer to a GEOSGeometry object. |

**Example**  
```js
const reader = geos.GEOSWKTReader_create()
const writer = geos.GEOSWKTWriter_create()
const wkt = 'POLYGON((0 0, 0 1, 1 1, 1 0, 0 0))'
const size = wkt.length + 1
const wktPtr = geos.Module._malloc(size)
geos.Module.stringToUTF8(wkt, wktPtr, size)
const geom = geos.GEOSWKTReader_read(reader, wktPtr)
geos.Module._free(wktPtr)
const boundary = geos.GEOSBoundary(geom)
const wktPtr = geos.GEOSWKTWriter_write(writer, boundary)
const wkt = geos.Module.UTF8ToString(wktPtr)
geos.GEOSFree(wktPtr)
console.log(wkt) // 'LINESTRING (0 0, 0 1, 1 1, 1 0, 0 0)'
```

---
<a name="exp_module_geos--geos.GEOSBoundary_r"></a>

## geos.GEOSBoundary\_r ⇒ <code>number</code> ⏏
Computes the boundary of a geometry in a thread-safe manner.

**Kind**: Exported member  
**Returns**: <code>number</code> - A pointer to a new GEOSGeometry object representing the boundary, or NULL on exception.  

| Param | Type | Description |
| --- | --- | --- |
| handle | <code>number</code> | A GEOSContextHandle_t object. |
| g | <code>number</code> | A pointer to a GEOSGeometry object. |


---
