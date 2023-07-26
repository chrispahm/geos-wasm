<a name="exp_module_geos--geos.GEOSClipByRect"></a>

## geos.GEOSClipByRect ⇒ <code>number</code> ⏏
Clips a geometry by a rectangular extent.

**Kind**: Exported member  
**Returns**: <code>number</code> - The clipped geometry or NULL on exception Caller is responsible for freeing with GEOSGeom_destroy().  

| Param | Type | Description |
| --- | --- | --- |
| g | <code>number</code> | A pointer to a GEOSGeometry object. |
| xmin | <code>number</code> | The minimum x-coordinate of the clipping rectangle. |
| ymin | <code>number</code> | The minimum y-coordinate of the clipping rectangle. |
| xmax | <code>number</code> | The maximum x-coordinate of the clipping rectangle. |
| ymax | <code>number</code> | The maximum y-coordinate of the clipping rectangle. |


---
<a name="exp_module_geos--geos.GEOSClipByRect_r"></a>

## geos.GEOSClipByRect\_r ⇒ <code>number</code> ⏏
Clips a geometry by a rectangular extent, using a thread-safe context handle.

**Kind**: Exported member  
**Returns**: <code>number</code> - The clipped geometry or NULL on exception Caller is responsible for freeing with GEOSGeom_destroy().  

| Param | Type | Description |
| --- | --- | --- |
| handle | <code>number</code> | A pointer to a GEOSContextHandle_t object. |
| g | <code>number</code> | A pointer to a GEOSGeometry object. |
| xmin | <code>number</code> | The minimum x-coordinate of the clipping rectangle. |
| ymin | <code>number</code> | The minimum y-coordinate of the clipping rectangle. |
| xmax | <code>number</code> | The maximum x-coordinate of the clipping rectangle. |
| ymax | <code>number</code> | The maximum y-coordinate of the clipping rectangle. |


---
