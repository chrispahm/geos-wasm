GEOS_EMCC_FLAGS :=

ifeq ($(type), debug)
GEOS_EMCC_FLAGS += -g4 --source-map-base http://localhost:8080/dist/ -fsanitize=address
else
GEOS_EMCC_FLAGS += -O3
endif

GEOS_EMCC_FLAGS += -s ERROR_ON_UNDEFINED_SYMBOLS=0 -s FORCE_FILESYSTEM=1
GEOS_EMCC_FLAGS += -lworkerfs.js
GEOS_EMCC_FLAGS += -lnodefs.js
GEOS_EMCC_FLAGS += -s TOTAL_MEMORY=512MB -s ALLOW_MEMORY_GROWTH=1 -s DISABLE_EXCEPTION_CATCHING=0
GEOS_EMCC_FLAGS += -s WASM=1 -s EXPORT_ES6=1 -s MODULARIZE=1 -s 'EXPORT_NAME="CModule"'
GEOS_EMCC_FLAGS += -s RESERVED_FUNCTION_POINTERS=200

# Enable the next line to export all functions,
# make sure to disable the EXPORTED_FUNCTIONS array below
# when doing so.
# GEOS_EMCC_FLAGS += -s LINKABLE=1 -s EXPORT_ALL=1 
GEOS_EMCC_FLAGS += -s EXPORTED_FUNCTIONS="[\
  '_malloc',\
	'_initGEOS',\
  '_GEOSFree', \
  '_GEOSGeomFromWKB_buf',\
  '_GEOSGeomToWKB_buf',\
	'_GEOSGeomFromWKT',\
  '_GEOSGeomToWKT',\
  '_GEOSBuffer', \
  '_GEOSBufferParams_create',\
  '_GEOSBufferParams_destroy',\
  '_GEOSBufferParams_setEndCapStyle',\
  '_GEOSBufferParams_setJoinStyle',\
  '_GEOSBufferParams_setMitreLimit',\
  '_GEOSBufferParams_setQuadrantSegments',\
  '_GEOSBufferParams_setSingleSided',\
  '_GEOSBufferWithParams',\
  '_GEOSGeom_destroy', \
  '_finishGEOS'\
]"

GEOS_EMCC_FLAGS += -s EXPORTED_RUNTIME_METHODS="[\
  'ccall',\
  'cwrap',\
  'UTF8ToString',\
  'stringToUTF8'\
]"