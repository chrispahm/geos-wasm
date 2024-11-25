<a name="exp_module_geos--geos.finishGEOS"></a>

## geos.finishGEOS() ⇒ <code>void</code> ⏏
Cleans up GEOS and releases any allocated resources.

**Kind**: Exported function  
**See**: https://libgeos.org/doxygen/geos__c_8h.html#a9a6f9f0b3a4c1a2e7c1d0e4e1b3a2c5d  
**Example**  
```js
import initGeosJs from 'geos-wasm'
const geos = await initGeosJs()
geos.finishGEOS()
// GEOS is now cleaned up and cannot be used until initialized again
```

---
<a name="exp_module_geos--geos.finishGEOS_r"></a>

## ~~geos.finishGEOS\_r ⇒ <code>null</code> ⏏~~
***Deprecated***

**Kind**: global property of [<code>geos</code>](/typedefs-enums/typedefs-enums.html#module_geos)  
**Returns**: <code>null</code> - void  

| Param | Type | Description |
| --- | --- | --- |
| handle | [<code>GEOSContextHandle\_t</code>](/typedefs-enums/typedefs-enums.html#GEOSContextHandle_t) | - |


---
