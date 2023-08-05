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
