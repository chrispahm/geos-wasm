# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [3.0.0](https://https://github.com/chrispahm/geos-wasm/compare/v2.0.0...v3.0.0) - 2024-11-25

### Breaking Changes

- Removed all `string` types from function signatures. All functions now return `number` or `void` and take `number` as arguments. -> Strings must be passed using `geos.Module.UTF8ToString` and read using `geos.Module.stringToUTF8` functions.

### Added

- Function finishGEOS_r
- Function GEOSCoverageIsValid_r
- Function GEOSCoverageSimplifyVW_r
- Function GEOSDisjointSubsetUnion_r
- Function GEOSEqualsIdentical_r
- Function GEOSGeom_createCircularString_r
- Function GEOSGeom_createCompoundCurve_r
- Function GEOSGeom_createCurvePolygon_r
- Function GEOSGeom_createEmptyCircularString_r
- Function GEOSGeom_createEmptyCompoundCurve_r
- Function GEOSGeom_createEmptyCurvePolygon_r
- Function GEOSGeom_createRectangle_r
- Function GEOSGeom_getExtent_r
- Function GEOSGeom_transformXY_r
- Function GEOSGeomGetM_r
- Function GEOSHasM_r
- Function GEOSHilbertCode_r
- Function GEOSLineMergeDirected_r
- Function GEOSLineSubstring_r
- Function GEOSOrientPolygons_r
- Function GEOSPolygonHullSimplify_r
- Function GEOSPolygonHullSimplifyMode_r
- Function GEOSPreparedContainsXY_r
- Function GEOSPreparedIntersectsXY_r
- Function GEOSPreparedRelate_r
- Function GEOSPreparedRelatePattern_r
- Function GEOSRemoveRepeatedPoints_r
- Function GEOSSTRtree_build_r
- Function GEOSWKBReader_setFixStructure_r
- Function GEOSWKTReader_setFixStructure_r

### Fixed

- Performance bottleneck for GEOS relate operations (discussed in <https://github.com/libgeos/geos/issues/1024>, benchmarked in <https://github.com/chrispahm/contains-benchmark>) -> Fixed by <https://github.com/locationtech/jts/pull/1052> in GEOS >= v3.13.0
- #23: Missing C functions since 3.11 and 3.12 (and 3.13)
- #24: Some GEOSPolygonize variant methods' argument/return 'string' types are wrong -> fixed
- #25: GEOSPolygonize variant methods' argument/return 'string' types are wrong -> fixed

### Changed

- Switched to [GEOS 3.13.0](https://libgeos.org/posts/2024-09-06-geos-3-13-released/)
- Updated to emscripten 3.1.72
  