<script setup>
import MIC from '../components/mic.vue'
</script>

# Maximum-Inscribed-Circle

This is an example for how the GEOS maximum-inscribed-circle algorithm can be used in JS.

<MIC />

### Source code

```js
const fc = {
  {
  "type": "Polygon",
  "coordinates": [/* ... */]
  }
}
const tolerance = 0
// convert the feature to wkb
const wkb = Geometry.parseGeoJSON(fc).toWkb()
// convert the wkb to a GEOSGeom
const geomPtr = GEOSGeomFromWKB(wkb)
// set the SRID to 4326
geos.GEOSSetSRID(geomPtr, 4326)
// create the maximum inscribed circle (mic)
const micPtr = geos.GEOSMaximumInscribedCircle(geomPtr, tolerance)
// the mic is a GEOSGeom linestring with two points,
// the first point is the center of the mic, the second
// point is the distance (tolerance) of the mic
const centerPtr = geos.GEOSGeomGetPointN(micPtr, 0)
const distancePtr = geos.Module._malloc(8)
geos.GEOSDistance(centerPtr, geos.GEOSGeomGetPointN(micPtr, 1), distancePtr)
const radius = geos.Module.getValue(distancePtr, 'double')
// now that we have the center and radius, we can create a
// an actual circle using the center and radius
const bufferPtr = geos.GEOSBuffer(centerPtr, radius)
// convert the mic to wkb
const micWkb = GEOSGeomToWKB(bufferPtr)
// convert the wkb to a GeoJSON geometry
const micFC = Geometry.parse(micWkb).toGeoJSON()
// free all memory
geos.GEOSGeom_destroy(micPtr)
geos.GEOSGeom_destroy(geomPtr)
geos.GEOSGeom_destroy(centerPtr)
geos.GEOSGeom_destroy(bufferPtr)
geos.GEOSFree(distancePt)
// log the resulting mic
console.log('micFC', micFC);

// helper functions
function GEOSGeomFromWKB(wkb) {
  const wkbPtr = geos.Module._malloc(wkb.length)
  geos.Module.HEAPU8.set(wkb, wkbPtr)
  const geomPtr = geos.GEOSGeomFromWKB_buf(wkbPtr, wkb.length)
  geos.GEOSFree(wkbPtr)
  return geomPtr
}

function GEOSGeomToWKB(geomPtr) {
  // create a pointer that stores the GEOSGeomToWKB_buf length
  const wkbPtrLength = geos.Module._malloc(4)
  // set it to 0
  geos.Module.setValue(wkbPtrLength, 0, 'i32')
  // get the wkbPtr and store its length in wkbPtrLength
  const wkbPtr = geos.GEOSGeomToWKB_buf(geomPtr, wkbPtrLength)
  // get the actual length from wkbPtrLength
  const size = geos.Module.getValue(wkbPtrLength, 'i32')
  // create a Uint8Array from the wkbPtr and the size
  const wkbView = new Uint8Array(
    geos.Module.HEAPU8.buffer,
    wkbPtr,
    size
  )
  const wkb = new Uint8Array(wkbView)

  // free the memory
  geos.GEOSFree(wkbPtr)
  geos.GEOSFree(wkbPtrLength)
  const buffer = Buffer.from(wkb)
  return buffer
}
```