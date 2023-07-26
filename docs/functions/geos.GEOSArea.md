<a name="exp_module_geos--geos.GEOSArea"></a>

## geos.GEOSArea ⇒ <code>number</code> ⏏
Calculate the area of a geometry.

**Kind**: Exported member  
**Returns**: <code>number</code> - 1 on success, 0 on exception  
**See**: https://libgeos.org/doxygen/classgeos_1_1algorithm_1_1Area.html  

| Param | Type | Description |
| --- | --- | --- |
| g | <code>number</code> | A pointer to a GEOSGeometry object |
| area | <code>number</code> | A pointer to be filled in with area result |

**Example**  
```js
const reader = geos.GEOSWKTReader_create()
const wkt = 'POLYGON((0 0,0 10,10 10,10 0,0 0))'
const g = geos.GEOSWKTReader_read(reader, wkt)
const area = geos.Module._malloc(8)
geos.GEOSArea(g, area)
const areaValue = geos.Module.getValue(area, 'double')
console.log(areaValue) // 100
```

---
<a name="exp_module_geos--geos.GEOSArea_r"></a>

## geos.GEOSArea\_r ⇒ <code>number</code> ⏏
Calculate the area of a geometry using a custom context handle.

**Kind**: Exported member  
**Returns**: <code>number</code> - 1 on success, 0 on exception  

| Param | Type | Description |
| --- | --- | --- |
| handle | <code>number</code> | A GEOSContextHandle_t object |
| g | <code>number</code> | A pointer to a GEOSGeometry object |
| area | <code>number</code> | A pointer to be filled in with area result |


---
