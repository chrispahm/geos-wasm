GEOS_VERSION = 3.9.4

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

# EMCC_CFLAGS = -g4 -O0 -fexceptions -DRENAME_INTERNAL_LIBTIFF_SYMBOLS
EMCC_CFLAGS = $(TYPE_FLAGS) -fexceptions -s ERROR_ON_UNDEFINED_SYMBOLS=0
EMMAKE ?= EMCC_CFLAGS="$(EMCC_CFLAGS)" emmake
EMCMAKE ?= emcmake
EMCC ?= CFLAGS="$(EMCC_CFLAGS)" emcc
EMCONFIGURE ?= CXXFLAGS="$(EMCC_CFLAGS)" CFLAGS="$(EMCC_CFLAGS)" emconfigure

include GEOS_EMCC_FLAGS.mk

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

$(ROOT_DIR)/lib/libgeos.a: $(GEOS_SRC)/Makefile
	cd $(GEOS_SRC); \
	$(EMMAKE) make install;

$(GEOS_SRC)/Makefile: $(GEOS_SRC)/configure
	cd $(GEOS_SRC); \
	$(EMCONFIGURE) ./configure $(PREFIX) --enable-shared=no --disable-inline;

$(GEOS_SRC)/configure:
	mkdir -p $(SRC_DIR); \
	cd $(SRC_DIR); \
	echo "{}" > package.json; \
	wget -nc $(GEOS_URL); \
	tar -xf geos-$(GEOS_VERSION).tar.bz2;

clean:
	rm -rf $(SRC_DIR_FULL) $(ROOT_DIR) $(DIST_DIR)
