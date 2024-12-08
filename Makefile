# Read GEOS_VERSION from package.json
PACKAGE_JSON = package.json
GEOS_VERSION = $(shell node -e "console.log(require('./package.json').GEOS_VERSION)")

GEOS_URL = "http://download.osgeo.org/geos/geos-$(GEOS_VERSION).tar.bz2"

PWD = $(shell pwd)
SRC_DIR = build/native/src
SRC_DIR_FULL = $(PWD)/$(SRC_DIR)
ROOT_DIR = $(PWD)/build/native/usr
DIST_DIR = $(PWD)/build/package
PREFIX = --prefix=$(ROOT_DIR)
PREFIX_CMAKE = "-DCMAKE_INSTALL_PREFIX=$(ROOT_DIR)"

ifeq ($(type), debug)
TYPE_FLAGS = -g4 -O0
else
TYPE_FLAGS = -O3
endif

# EMCC_CFLAGS = $(TYPE_FLAGS) -fexceptions -s ERROR_ON_UNDEFINED_SYMBOLS=0
EMCC_CFLAGS = $(TYPE_FLAGS) -fexceptions
EMMAKE ?= EMCC_CFLAGS="$(EMCC_CFLAGS)" emmake
EMCMAKE ?= emcmake
EMCC ?= CFLAGS="$(EMCC_CFLAGS)" emcc
EMCONFIGURE ?= CXXFLAGS="$(EMCC_CFLAGS)" CFLAGS="$(EMCC_CFLAGS)" emconfigure

GEOS_EMCC_FLAGS :=

ifeq ($(type), debug)
GEOS_EMCC_FLAGS += -gsource-map -fsanitize=address
else
GEOS_EMCC_FLAGS += -O3 --closure 1
endif

# GEOS_EMCC_FLAGS += -gsource-map -fsanitize=leak
# output a single js file instead of a .js and .wasm file
# this is ~33% larger than the two file output, but it's easier to use
# in different environments...
GEOS_EMCC_FLAGS += -s SINGLE_FILE=1 -s ALLOW_TABLE_GROWTH=1
GEOS_EMCC_FLAGS += -s ERROR_ON_UNDEFINED_SYMBOLS=1 -s FORCE_FILESYSTEM=0
GEOS_EMCC_FLAGS += -s ALLOW_MEMORY_GROWTH=1 -s DISABLE_EXCEPTION_CATCHING=0
GEOS_EMCC_FLAGS += -s NODEJS_CATCH_EXIT=0 -s NODEJS_CATCH_REJECTION=0
GEOS_EMCC_FLAGS += -s WASM=1 -s EXPORT_ES6=1 -s MODULARIZE=1 -s 'EXPORT_NAME="CModule"'

include GEOS_EMCC_FLAGS.mk

GEOS_EMCC_FLAGS += -s EXPORTED_RUNTIME_METHODS="[\
  'addFunction',\
  'removeFunction',\
  'setValue',\
  'getValue',\
  'ccall',\
  'cwrap',\
  'UTF8ToString',\
  'stringToUTF8'\
]"
########
# GEOS #
########

GEOS_SRC = $(SRC_DIR)/geos-$(GEOS_VERSION)

geos.js: $(DIST_DIR)/geos.js
geos: $(ROOT_DIR)/lib/libgeos.a

$(DIST_DIR)/geos.js: $(ROOT_DIR)/lib/libgeos.a
	mkdir -p $(DIST_DIR); \
	cd $(DIST_DIR); \
	EMCC_CORES=4 $(EMCC) $(ROOT_DIR)/lib/libgeos.a $(ROOT_DIR)/lib/libgeos_c.a \
		-o $@ $(GEOS_EMCC_FLAGS);

$(ROOT_DIR)/lib/libgeos.a: $(GEOS_SRC)/build/Makefile
	cd $(GEOS_SRC); \
	cmake -DBUILD_DOCUMENTATION=YES; \
	cmake --build . --target docs; \
	cd ./build; \
	$(EMMAKE) make -j4 install;

$(GEOS_SRC)/build/Makefile: $(GEOS_SRC)/CMakeLists.txt
	cd $(GEOS_SRC); \
	rm -rf $(ROOT_DIR)/lib/cmake; \
	mkdir build; \
	cd build; \
	$(EMCMAKE) cmake .. $(PREFIX_CMAKE) -DBUILD_SHARED_LIBS=OFF -DCMAKE_BUILD_TYPE=Release -DBUILD_TESTING=OFF \
        -DCMAKE_PREFIX_PATH=$(ROOT_DIR) -DCMAKE_FIND_ROOT_PATH=$(ROOT_DIR) \

$(GEOS_SRC)/CMakeLists.txt:
	mkdir -p $(SRC_DIR); \
	cd $(SRC_DIR); \
	echo "{}" > package.json; \
	wget -nc $(GEOS_URL); \
	tar -xf geos-$(GEOS_VERSION).tar.bz2;
