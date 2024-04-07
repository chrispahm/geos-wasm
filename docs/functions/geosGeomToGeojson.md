<a name="geosGeomToGeojson"></a>

## geosGeomToGeojson(geomPtr, geos) ⇒ <code>GeoJSON</code>
Convert GEOS geometry pointer to GeoJSON object.

**Kind**: global function  
**Returns**: <code>GeoJSON</code> - A GeoJSON object.  

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
const size = wkt.length + 1
const wktPtr = geos.Module._malloc(size)
geos.Module.stringToUTF8(wkt, wktPtr, size)
const geomPtr = geos.GEOSWKTReader_read(reader, wktPtr)
geos.Module._free(wktPtr)
const json = geosGeomToGeojson(geomPtr, geos)
console.log(JSON.stringify(json))
// => {"type":"Polygon","coordinates":[[[0,0],[1,0],[1,1],[0,1],[0,0]]]}
```

---
