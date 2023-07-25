<a name="exp_module_geos--geos.GEOSClipByRect"></a>

## geos.GEOSClipByRect ⇒ <code>string</code> ⏏
Clips a geometry by a rectangular extent.

**Kind**: Exported member  
**Returns**: <code>string</code> - A string representing the clipped geometry in Well-Known Text format, or null if an error occurs.  

| Param | Type | Description |
| --- | --- | --- |
| wkt | <code>string</code> | A string representing the geometry in Well-Known Text format. |
| xmin | <code>number</code> | The minimum x-coordinate of the clipping rectangle. |
| ymin | <code>number</code> | The minimum y-coordinate of the clipping rectangle. |
| xmax | <code>number</code> | The maximum x-coordinate of the clipping rectangle. |
| ymax | <code>number</code> | The maximum y-coordinate of the clipping rectangle. |


---
<a name="exp_module_geos--geos.GEOSClipByRect_r"></a>

## geos.GEOSClipByRect\_r ⇒ <code>string</code> ⏏
Clips a geometry by a rectangular extent, using a thread-safe context handle.

**Kind**: Exported member  
**Returns**: <code>string</code> - A string representing the clipped geometry in Well-Known Text format, or null if an error occurs.  

| Param | Type | Description |
| --- | --- | --- |
| handle | <code>string</code> | A pointer to a GEOSContextHandle_t object. |
| wkt | <code>string</code> | A string representing the geometry in Well-Known Text format. |
| xmin | <code>number</code> | The minimum x-coordinate of the clipping rectangle. |
| ymin | <code>number</code> | The minimum y-coordinate of the clipping rectangle. |
| xmax | <code>number</code> | The maximum x-coordinate of the clipping rectangle. |
| ymax | <code>number</code> | The maximum y-coordinate of the clipping rectangle. |


---
