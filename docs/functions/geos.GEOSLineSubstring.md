<a name="exp_module_geos--geos.GEOSLineSubstring"></a>

## geos.GEOSLineSubstring ⇒ <code>number</code> ⏏
Computes the line which is the section of the input LineString starting and
 ending at the given length fractions.

**Kind**: Exported member  
**Returns**: <code>number</code> - selected substring.
 Caller is responsible for freeing with GEOSGeom_destroy()  

| Param | Type | Description |
| --- | --- | --- |
| g | <code>number</code> | The input LineString |
| start_fraction | <code>number</code> | start fraction (0-1) along the length of g |
| end_fraction | <code>number</code> | end fraction (0-1) along the length of g |


---
<a name="exp_module_geos--geos.GEOSLineSubstring_r"></a>

## geos.GEOSLineSubstring\_r ⇒ <code>number</code> ⏏
Computes the line which is the section of the input LineString starting and
 ending at the given length fractions.

**Kind**: Exported member  
**Returns**: <code>number</code> - selected substring.
 Caller is responsible for freeing with GEOSGeom_destroy()  

| Param | Type | Description |
| --- | --- | --- |
| handle | <code>number</code> | The GEOS context pointer handle. |
| g | <code>number</code> | The input LineString |
| start_fraction | <code>number</code> | start fraction (0-1) along the length of g |
| end_fraction | <code>number</code> | end fraction (0-1) along the length of g |


---
