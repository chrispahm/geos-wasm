<script setup>
import { shallowRef, onMounted, onUnmounted } from 'vue';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import initGeosJs from '../assets/geos.esm.js';
import { geojsonToGeosGeom, geosGeomToGeojson } from '../assets/geos.helpers.esm.js';
import bbox from '@turf/bbox';


const mapContainer = shallowRef(null);
const map = shallowRef(null);
const fc = {
  "type": "Polygon",
  "coordinates": [
    [
      [
        114.18466329574586,
        22.267890315905507
      ],
      [
        114.18499588966371,
        22.266271927897595
      ],
      [
        114.1876244544983,
        22.2654379046834
      ],
      [
        114.18651938438417,
        22.267284663689324
      ],
      [
        114.18656766414641,
        22.267314449925173
      ],
      [
        114.18652206659317,
        22.267331825226496
      ],
      [
        114.18655961751938,
        22.26734175396915
      ],
      [
        114.18659448623657,
        22.267364093637525
      ],
      [
        114.18840765953065,
        22.26926047026178
      ],
      [
        114.18466329574586,
        22.267890315905507
      ]
    ]
  ]
}

onMounted(async () => {
  const geos = await initGeosJs();

  map.value = new maplibregl.Map({
    container: mapContainer.value,
    style: 'https://demotiles.maplibre.org/style.json',
    center: [
      114.18908304876464,
      22.26524782726996
    ],
    zoom: 14,
    attributionControl: true
  });

  map.value.addControl(new maplibregl.LogoControl({ compact: false }));

  map.value.fitBounds(bbox(fc), { padding: 100, duration: 0 });

  const fcLayerPolygons = {
    "id": "fc-layer-polygons",
    "type": "fill",
    "source": {
      "type": "geojson",
      "data": fc
    },
    "paint": {
      "fill-color": "rgba(0, 0, 255, 0.2)",
      "fill-outline-color": "blue"
    },
    "filter": ["==", "$type", "Polygon"]
  };

  map.value.on('load', function () {
    map.value.addLayer(fcLayerPolygons);

    const toleranceInput = document.getElementById('tolerance-input');

    function updateMIC() {
      const tolerance = parseFloat(toleranceInput.value);
      // convert the Geojson feature to a GEOSGeom
      const geomPtr = geojsonToGeosGeom(fc, geos);
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
      const bufferPtr = geos.GEOSBuffer(centerPtr, radius, 8)
      // convert the mic to wkb
      const micFC = geosGeomToGeojson(bufferPtr, geos)
      // free the memory
      geos.GEOSGeom_destroy(micPtr)
      geos.GEOSGeom_destroy(geomPtr)
      geos.GEOSGeom_destroy(centerPtr)
      geos.GEOSGeom_destroy(bufferPtr)
      geos.GEOSFree(distancePtr)

      console.log('micFC', micFC);

      const micFCLayer = {
        "id": "mic-fc",
        "type": "fill",
        "source": {
          "type": "geojson",
          "data": micFC
        },
        "paint": {
          "fill-color": "rgba(0, 255, 255, 0.2)",
          "fill-outline-color": "lightblue"
        }
      };

      if (map.value.getSource('mic-fc')) {
        map.value.getSource('mic-fc').setData(micFC);
      } else {
        if (map.value.getLayer('mic-fc')) {
          map.value.removeLayer('mic-fc');
        }

        map.value.addLayer(micFCLayer);
      }
    }

    updateMIC();

    toleranceInput.addEventListener('input', updateMIC);
  });
  
});

onUnmounted(() => {
  map.value?.remove();
});
</script>

<template>
  <div id="panel">
    <div id="mic-options">
      <div>
        <label for="tolerance-input">Tolerance:</label>
        <input type="range" id="tolerance-input" value="0.0" min="0.0" max="0.002" step="0.0001">
      </div>
    </div>
  </div>
  <div id="map" ref="mapContainer"></div>
</template>


<style>
body {
  margin: 0;
  padding: 0;
}

#map {
  width: 100%;
  min-height: 500px;
}

#panel {
  padding: 10px;
  box-sizing: border-box;
}

#buffer-options {
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}

#buffer-options input {
  margin-left: 10px;
}
</style>