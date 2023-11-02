<a name="exp_module_geos--geos.GEOSRemoveRepeatedPoints"></a>

## geos.GEOSRemoveRepeatedPoints ⇒ <code>number</code> ⏏
Works from start of each coordinate sequence in the
geometry, retaining points that are further away from the
previous retained point than the tolerance value.

Removing repeated points with a non-zero tolerance may
result in an invalid geometry being returned. Be sure
to check and repair validity.

**Kind**: Exported member  
**Returns**: <code>number</code> - A geometry with all points within the tolerance of each other removed.  
**See**: GEOSMakeValidWithParams*  

| Param | Type | Description |
| --- | --- | --- |
| g | <code>number</code> | The geometry to filter |
| tolerance | <code>number</code> | Remove all points within this distance of each other. Use 0.0 to remove only exactly repeated points. |


---
<a name="exp_module_geos--geos.GEOSRemoveRepeatedPoints_r"></a>

## geos.GEOSRemoveRepeatedPoints\_r ⇒ <code>number</code> ⏏
Works from start of each coordinate sequence in the
geometry, retaining points that are further away from the
previous retained point than the tolerance value.

Removing repeated points with a non-zero tolerance may
result in an invalid geometry being returned. Be sure
to check and repair validity.

**Kind**: Exported member  
**Returns**: <code>number</code> - A geometry with all points within the tolerance of each other removed.  
**See**: GEOSMakeValidWithParams*  

| Param | Type | Description |
| --- | --- | --- |
| handle | <code>number</code> | The context handle pointer to use for error reporting. |
| g | <code>number</code> | The geometry to filter |
| tolerance | <code>number</code> | Remove all points within this distance of each other. Use 0.0 to remove only exactly repeated points. |


---
