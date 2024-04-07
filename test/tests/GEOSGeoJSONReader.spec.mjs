// Import tape for testing
import test from 'tape'

// Import the geos module
import initGeosJs from '../../build/package/geos.esm.js'
const geos = await initGeosJs()

test('GEOSGeoJSONReader', async (t) => {
  const geometry = {
    type: 'Polygon',
    coordinates: [
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

  const reader = geos.GEOSGeoJSONReader_create()
  const geom = geos.GEOSGeoJSONReader_readGeometry(reader, JSON.stringify(geometry))

  const writer = geos.GEOSWKTWriter_create()
  const wktPtr = geos.GEOSWKTWriter_write(writer, geom)
  const wkt = geos.Module.UTF8ToString(wktPtr)
  geos.GEOSFree(wktPtr)

  const exptectedWkt = 'POLYGON ((114.18466329574586 22.267890315905507, 114.18499588966371 22.266271927897595, 114.1876244544983 22.2654379046834, 114.18651938438417 22.267284663689324, 114.18656766414641 22.267314449925173, 114.18652206659317 22.267331825226496, 114.18655961751938 22.26734175396915, 114.18659448623657 22.267364093637525, 114.18840765953065 22.26926047026178, 114.18466329574586 22.267890315905507))'

  t.equal(wkt, exptectedWkt, 'should read geometry from GeoJSON')
  t.end()

  geos.GEOSWKTReader_destroy(reader)
  geos.GEOSWKTWriter_destroy(writer)
  geos.GEOSGeom_destroy(geom)
})
