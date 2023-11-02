<a name="geosGeomToGeojson"></a>

## geosGeomToGeojson(geomPtr, geos) ⇒ <code>Object</code>
Convert GEOS geometry pointer to GeoJSON object.

**Kind**: global function  
**Returns**: <code>Object</code> - A GeoJSON object.  

| Param | Type | Description |
| --- | --- | --- |
| geomPtr | <code>number</code> | The GEOS geometry pointer. |
| geos | <code>geos</code> | The GEOS module object. |

**Example**  
```js
import initGeosJs from 'geos-wasm'
import { geojsonToGeosGeom } from 'geos-wasm/helpers'
const geos = await initGeosJs()
const reader = geos.GEOSWKTReader_create()
const wkt = 'POLYGON ((0 0, 1 0, 1 1, 0 1, 0 0))'
const geomPtr = geos.GEOSWKTReader_read(reader, wkt)
const json = geosGeomToGeojson(geomPtr, geos)
console.log(JSON.stringify(json))
// => {"type":"Polygon","coordinates":[[[0,0],[1,0],[1,1],[0,1],[0,0]]]}
```

---
