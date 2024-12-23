import geopandas
import time
import numpy as np
import shapely
geopandas.options.io_engine = "pyogrio"

start = time.time()
df = geopandas.read_parquet("test/data/Utah.parquet") 
print("Geopandas time to read parquet file: ", time.time()-start)
# get shapely geometries
geoms = df.geometry.values
# convert to numpy array
geoms = np.array(geoms)
# convert to wkb
wkb = shapely.to_wkb(geoms)
start = time.time()
shapely.from_wkb(wkb)
print("Parsing WKB: ", time.time()-start)