<a name="exp_module_geos--geos.GEOSProject"></a>

## geos.GEOSProject ⇒ <code>number</code> ⏏
Distance of point projected onto line from the start of the line.

**Kind**: global property of [<code>geos</code>](/typedefs-enums/typedefs-enums.html#module_geos)  
**Returns**: <code>number</code> - distance along line that point projects to, -1 on exception  

| Param | Type | Description |
| --- | --- | --- |
| line | [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) | linear target of projection |
| point | [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) | point to be projected onto 'g' |


---
<a name="exp_module_geos--geos.GEOSProjectNormalized"></a>

## geos.GEOSProjectNormalized ⇒ <code>number</code> ⏏
Project point to line and calculate the proportion of the line the point is from the start. For example, a point that projects to the middle of a line would be return 0.5.

**Kind**: global property of [<code>geos</code>](/typedefs-enums/typedefs-enums.html#module_geos)  
**Returns**: <code>number</code> - The proportion of the overall line length that the projected point falls at.  

| Param | Type | Description |
| --- | --- | --- |
| line | [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) | linear target of projection |
| point | [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) | the point to project |


---
<a name="exp_module_geos--geos.GEOSProjectNormalized_r"></a>

## geos.GEOSProjectNormalized\_r ⇒ <code>number</code> ⏏
Project point to line and calculate the proportion of the line the point is from the start. For example, a point that projects to the middle of a line would be return 0.5.

**Kind**: global property of [<code>geos</code>](/typedefs-enums/typedefs-enums.html#module_geos)  
**Returns**: <code>number</code> - The proportion of the overall line length that the projected point falls at.  

| Param | Type | Description |
| --- | --- | --- |
| handle | [<code>GEOSContextHandle\_t</code>](/typedefs-enums/typedefs-enums.html#GEOSContextHandle_t) | - |
| g | [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) | linear target of projection |
| p | [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) | the point to project |


---
<a name="exp_module_geos--geos.GEOSProject_r"></a>

## geos.GEOSProject\_r ⇒ <code>number</code> ⏏
Distance of point projected onto line from the start of the line.

**Kind**: global property of [<code>geos</code>](/typedefs-enums/typedefs-enums.html#module_geos)  
**Returns**: <code>number</code> - distance along line that point projects to, -1 on exception  

| Param | Type | Description |
| --- | --- | --- |
| handle | [<code>GEOSContextHandle\_t</code>](/typedefs-enums/typedefs-enums.html#GEOSContextHandle_t) | - |
| line | [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) | linear target of projection |
| point | [<code>GEOSGeometry</code>](/typedefs-enums/typedefs-enums.html#GEOSGeometry) | point to be projected onto 'g' |


---
