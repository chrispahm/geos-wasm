<a name="geojsonToGeosGeom"></a>

## geojsonToGeosGeom(geojson, geos) ⇒ <code>number</code>
Convert GeoJSON object to GEOS geometry pointer.

**Kind**: global function  
**Returns**: <code>number</code> - A pointer to GEOS geometry.  

| Param | Type | Description |
| --- | --- | --- |
| geojson | <code>GeoJSON</code> | The GeoJSON object. |
| geos | <code>geos</code> | The GEOS module object. |

**Example**  
```js
import initGeosJs from 'geos-wasm'
import { geojsonToGeosGeom } from 'geos-wasm/helpers'
const geos = await initGeosJs()
const json = JSON.parse('{"type":"Polygon","coordinates":[[[0,0],[1,0],[1,1],[0,1],[0,0]]]}')
const geomPtr = geojsonToGeosGeom(json, geos)
const writer = geos.GEOSWKTWriter_create()
const wkt = geos.GEOSWKTWriter_write(writer, geomPtr)
console.log(wkt)
// => POLYGON ((0 0, 1 0, 1 1, 0 1, 0 0))
```

---
