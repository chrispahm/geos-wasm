<a name="exp_module_geos--UTF8ToString"></a>

## UTF8ToString ⇒ <code>string</code> ⏏
Reads a null-terminated string from the Emscripten heap.

**Kind**: Exported member  
**Returns**: <code>string</code> - The string.  
**See**: https://emscripten.org/docs/api_reference/preamble.js.html#UTF8ToString  

| Param | Type | Description |
| --- | --- | --- |
| ptr | <code>number</code> | The pointer to the string. |

**Example**  
```js
const wkt = geos.Module.UTF8ToString(wktPtr)
```

---
<a name="exp_module_geos--_malloc"></a>

## \_malloc ⇒ <code>number</code> ⏏
Allocates memory on the Emscripten heap.

**Kind**: Exported member  
**Returns**: <code>number</code> - The pointer to the allocated memory.  
**See**: https://emscripten.org/docs/api_reference/preamble.js.html#_malloc  

| Param | Type | Description |
| --- | --- | --- |
| size | <code>number</code> | The size of the memory to allocate. |

**Example**  
```js
const wktPtr = geos.Module._malloc(wkt.length + 1)
```

---
<a name="exp_module_geos--getValue"></a>

## getValue ⇒ <code>number</code> ⏏
Reads a value from the Emscripten heap.

**Kind**: Exported member  
**Returns**: <code>number</code> - The value.  
**See**: https://emscripten.org/docs/api_reference/preamble.js.html#getValue  

| Param | Type | Description |
| --- | --- | --- |
| ptr | <code>number</code> | The pointer to the value. |
| type | <code>string</code> | The type of the value. |

**Example**  
```js
const area = geos.Module.getValue(areaPtr, 'double')
console.log(area) // area = 1
```

---
<a name="exp_module_geos--setValue"></a>

## setValue ⏏
Writes a value to the Emscripten heap.

**Kind**: Exported member  
**See**: https://emscripten.org/docs/api_reference/preamble.js.html#setValue  

| Param | Type | Description |
| --- | --- | --- |
| ptr | <code>number</code> | The pointer to the value. |
| type | <code>string</code> | The type of the value. |
| value | <code>number</code> | The value. |

**Example**  
```js
geos.Module.setValue(areaPtr, 'double', 0)
```

---
<a name="exp_module_geos--stringToUTF8"></a>

## stringToUTF8 ⏏
Writes a string to the Emscripten heap.

**Kind**: Exported member  
**See**: https://emscripten.org/docs/api_reference/preamble.js.html#stringToUTF8  

| Param | Type | Description |
| --- | --- | --- |
| str | <code>string</code> | The string. |
| ptr | <code>number</code> | The pointer to the string. |
| [maxLength] | <code>number</code> | The maximum length of the string. |

**Example**  
```js
geos.Module.stringToUTF8(wkt, wktPtr)
```

---
