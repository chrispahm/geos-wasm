<a name="exp_module_geos--geos.initGEOS"></a>

## geos.initGEOS() ⇒ <code>void</code> ⏏
Initializes GEOS and allocates any required resources.

**Kind**: Exported function  
**Throws**:

- <code>Error</code> If GEOS has already been initialized.

**See**: https://libgeos.org/doxygen/geos__c_8h.html#a9a6f9f0b3a4c1a2e7c1d0e4e1b3a2c5d  
**Example**  
```js
import initGeosJs from 'geos-wasm'
const geos = require('geos')
geos.finishGEOS()
// GEOS is now cleaned up and cannot be used until initialized again
geos.initGEOS()
```

---
