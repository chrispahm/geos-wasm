<a name="exp_module_geos--geos.GEOSPrecisionRules"></a>

## geos.GEOSPrecisionRules ⏏
Controls the behavior of GEOSGeom_setPrecision()
when altering the precision of a geometry.

| Name             | Value     | Description |
| :--------------- | :----------  | :----------  |
| GEOS_PREC_VALID_OUTPUT   | 0         | The output is always valid. Collapsed geometry elements (including both polygons and lines) are removed.|
| GEOS_PREC_NO_TOPO   | 1         | Precision reduction is performed pointwise. Output geometry may be invalid due to collapse or self-intersection. (This might be better called "GEOS_PREC_POINTWISE" - the current name is historical.) |
| GEOS_PREC_KEEP_COLLAPSED   | 2         | Like the default mode, except that collapsed linear geometry elements are preserved. Collapsed polygonal input elements are removed. |

**Kind**: Exported member  

---
