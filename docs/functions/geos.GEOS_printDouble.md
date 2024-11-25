<a name="exp_module_geos--geos.GEOS_printDouble"></a>

## geos.GEOS\_printDouble ⇒ <code>number</code> ⏏
Print the shortest representation of a double. Non-zero absolute values that are <1e-4 and >=1e+17 are formatted using scientific notation, and other values are formatted with positional notation with precision used for the max digits after decimal point.

**Kind**: global property of [<code>geos</code>](/typedefs-enums/typedefs-enums.html#module_geos)  
**Returns**: <code>number</code> - the length of the written string.  

| Param | Type | Description |
| --- | --- | --- |
| d | <code>number</code> | The number to format. |
| precision | <code>number</code> | The desired precision. |
| result | [<code>StringPointer</code>](/typedefs-enums/typedefs-enums.html#StringPointer) | The buffer to write the result to, with a suggested size 28. |


---
