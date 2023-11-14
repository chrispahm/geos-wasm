<a name="exp_module_geos--geos.GEOSVoronoiFlags"></a>

## geos.GEOSVoronoiFlags ⏏
Change behaviour of @ref GEOSVoronoiDiagram

| Name             | Value     | Description |
| :--------------- | :----------  | :----------  |
| GEOS_VORONOI_ONLY_EDGES   | 1         | Return only edges of the Voronoi cells, as a MultiLineString |
| GEOS_VORONOI_PRESERVE_ORDER   | 2         | Preserve order of inputs, such that the nth cell in the result corresponds to the nth vertex in the input. If this cannot be done, such as for inputs that contain repeated points, @ref GEOSVoronoiDiagram will return NULL. |

**Kind**: Exported member  

---
