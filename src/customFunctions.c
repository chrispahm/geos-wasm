#include <stdio.h>
#include <geos_c.h>
#include <stdint.h>
#include <stdlib.h>

uint32_t *GEOSWKBReader_readBatch_r(GEOSContextHandle_t ctx, uint8_t *wkb_data, int32_t *offsets, int32_t num_geoms)
{
  uint32_t *geoms = (uint32_t *)malloc(num_geoms * sizeof(uint32_t));
  GEOSWKBReader *reader = GEOSWKBReader_create_r(ctx);
  for (int32_t i = 0; i < num_geoms; i++)
  {
    uint8_t *feature_ptr = wkb_data + offsets[i];
    int32_t feature_size = offsets[i + 1] - offsets[i];
    // print pointer and size
    GEOSGeometry *geom = GEOSWKBReader_read_r(ctx, reader, feature_ptr, feature_size);
    geoms[i] = (uint32_t)geom;
  }
  GEOSWKBReader_destroy_r(ctx, reader);
  return geoms;
}