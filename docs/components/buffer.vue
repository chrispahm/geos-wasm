<script setup>
import { shallowRef, onMounted, onUnmounted } from 'vue';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import initGeosJs from '../assets/geos.esm.js';
import buffer from '../assets/buffer_wkb.js';
// import buffer from '../assets/buffer_coordseq.js';
import bbox from '@turf/bbox';

const mapContainer = shallowRef(null);
const map = shallowRef(null);
const fc = {
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "properties": {},
      "geometry": {
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
    },
    {
      "type": "Feature",
      "properties": {},
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            114.18836474418642,
            22.270749753256833
          ],
          [
            114.19047832489015,
            22.26977675682864
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {},
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            114.18925523757935,
            22.267592454487456
          ],
          [
            114.19204473495483,
            22.26928032747266
          ],
          [
            114.19121861457826,
            22.26488188644578
          ],
          [
            114.19357895851137,
            22.266927228364477
          ],
          [
            114.1893517971039,
            22.26653007693269
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {},
      "geometry": {
        "type": "Point",
        "coordinates": [
          114.18949127197267,
          22.271802170346884
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {},
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              114.18646574020386,
              22.26391877819981
            ],
            [
              114.18558597564699,
              22.260503165629643
            ],
            [
              114.19245243072511,
              22.260046420421386
            ],
            [
              114.19225931167604,
              22.263759914347176
            ],
            [
              114.18646574020386,
              22.26391877819981
            ]
          ],
          [
            [
              114.18732404708864,
              22.26324360558074
            ],
            [
              114.19101476669312,
              22.26268757862524
            ],
            [
              114.19092893600465,
              22.260959909347545
            ],
            [
              114.187388420105,
              22.261218068181
            ],
            [
              114.18732404708864,
              22.26324360558074
            ]
          ]
        ]
      }
    }
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

  const fcLayerLines = {
    "id": "fc-layer-lines",
    "type": "line",
    "source": {
      "type": "geojson",
      "data": fc
    },
    "paint": {
      "line-color": "rgba(0, 0, 255, 0.2)",
      "line-width": 5
    },
    "filter": ["==", "$type", "LineString"]
  };

  const fcLayerPoints = {
    "id": "fc-layer-points",
    "type": "circle",
    "source": {
      "type": "geojson",
      "data": fc
    },
    "paint": {
      "circle-color": "rgba(0, 0, 255, 0.2)",
      "circle-radius": 5
    },
    "filter": ["==", "$type", "Point"]
  };

  map.value.on('load', function () {
    map.value.addLayer(fcLayerPolygons);
    map.value.addLayer(fcLayerLines);
    map.value.addLayer(fcLayerPoints);

    const radiusInput = document.getElementById('radius-input');
    const endCapStyleInput = document.getElementById('end-cap-style-input');
    const joinStyleInput = document.getElementById('join-style-input');
    const mitreLimitInput = document.getElementById('mitre-limit-input');
    const singleSidedInput = document.getElementById('single-sided-input');

    function updateBuffer() {
      const radius = parseFloat(radiusInput.value);
      const endCapStyle = parseInt(endCapStyleInput.value);
      const joinStyle = parseInt(joinStyleInput.value);
      const mitreLimit = parseFloat(mitreLimitInput.value);
      const singleSided = singleSidedInput.checked;

      const bufferedFC = buffer(fc, radius, {
        endCapStyle: endCapStyle,
        joinStyle: joinStyle,
        mitreLimit: mitreLimit,
        singleSided: singleSided,
        GEOS: geos
      });

      console.log('bufferedFC', bufferedFC);

      const bufferedFCLayer = {
        "id": "buffered-fc",
        "type": "fill",
        "source": {
          "type": "geojson",
          "data": bufferedFC
        },
        "paint": {
          "fill-color": "rgba(0, 255, 255, 0.2)",
          "fill-outline-color": "lightblue"
        }
      };

      if (map.value.getSource('buffered-fc')) {
        map.value.getSource('buffered-fc').setData(bufferedFC);
      } else {
        if (map.value.getLayer('buffered-fc')) {
          map.value.removeLayer('buffered-fc');
        }

        map.value.addLayer(bufferedFCLayer);
      }
    }

    radiusInput.addEventListener('input', updateBuffer);
    endCapStyleInput.addEventListener('change', updateBuffer);
    joinStyleInput.addEventListener('change', updateBuffer);
    mitreLimitInput.addEventListener('input', updateBuffer);
    singleSidedInput.addEventListener('change', updateBuffer);

    updateBuffer();
  });
});

onUnmounted(() => {
  map.value?.remove();
});
</script>

<template>
  <div id="panel">
    <div id="buffer-options">
      <div>
        <label for="radius-input">Radius (km):</label>
        <input type="range" id="radius-input" value="0.05" min="-0.05" max="1" step="0.01">
      </div>
      <div>
        <label for="end-cap-style-input">End Cap Style:</label>
        <select id="end-cap-style-input" style="-webkit-appearance: auto;">
          <option value="1" selected>Round</option>
          <option value="2">Square</option>
          <option value="3">Flat</option>
        </select>
      </div>
      <div>
        <label for="join-style-input">Join Style:</label>
        <select id="join-style-input" style="-webkit-appearance: auto;">
          <option value="1">Round</option>
          <option value="2" selected>Mitre</option>
          <option value="3">Bevel</option>
        </select>
      </div>
      <div>
        <label for="mitre-limit-input">Mitre Limit:</label>
        <input type="range" id="mitre-limit-input" value="5" min="0" max="10">
      </div>
      <div>
        <label for="single-sided-input">Single Sided:</label>
        <input type="checkbox" id="single-sided-input">
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