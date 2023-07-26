<a name="exp_module_geos--geos.GEOSRelate"></a>

## geos.GEOSRelate ⇒ <code>string</code> ⏏
Computes a DE-9IM intersection matrix for two geometries.

**Kind**: Exported member  
**Returns**: <code>string</code> - A string representing the DE-9IM matrix, or NULL on exception  
**See**: https://libgeos.org/doxygen/geos__c_8h.html#a3a6f4e9a7f0b8c8d5b4a0c5f6c7e4d3f  

| Param | Type | Description |
| --- | --- | --- |
| g1 | <code>number</code> | A pointer to the first geometry |
| g2 | <code>number</code> | A pointer to the second geometry |


---
<a name="exp_module_geos--geos.GEOSRelateBoundaryNodeRule"></a>

## geos.GEOSRelateBoundaryNodeRule ⇒ <code>string</code> ⏏
Computes the DE-9IM intersection matrix for two geometries using a specified Boundary Node Rule.

**Kind**: Exported member  
**Returns**: <code>string</code> - The DE-9IM intersection matrix as a string, or null if an error occurred.  
**See**: https://docs.rs/geos-sys/2.0.1/geos_sys/fn.GEOSRelateBoundaryNodeRule.html  

| Param | Type | Description |
| --- | --- | --- |
| handle | <code>number</code> | A pointer to the GEOS context handle. |
| g1 | <code>number</code> | The first geometry. |
| g2 | <code>number</code> | The second geometry. |
| bnr | <code>number</code> | The Boundary Node Rule to use. One of: 1 (Mod2), 2 (EndPoint), 3 (MultiValentEndPoint), 4 (MonoValentEndPoint). |


---
<a name="exp_module_geos--geos.GEOSRelateBoundaryNodeRule_r"></a>

## geos.GEOSRelateBoundaryNodeRule\_r ⇒ <code>string</code> ⏏
Computes the DE-9IM intersection matrix for two geometries using a specified Boundary Node Rule.

**Kind**: Exported member  
**Returns**: <code>string</code> - The DE-9IM intersection matrix as a string, or null if an error occurred.  
**See**: https://docs.rs/geos-sys/2.0.1/geos_sys/fn.GEOSRelateBoundaryNodeRule_r.html  

| Param | Type | Description |
| --- | --- | --- |
| handle | <code>number</code> | A pointer to the GEOS context handle. |
| g1 | <code>number</code> | The first geometry. |
| g2 | <code>number</code> | The second geometry. |
| bnr | <code>number</code> | The Boundary Node Rule to use. One of: 1 (Mod2), 2 (EndPoint), 3 (MultiValentEndPoint), 4 (MonoValentEndPoint). |


---
<a name="exp_module_geos--geos.GEOSRelatePattern"></a>

## geos.GEOSRelatePattern ⇒ <code>number</code> ⏏
Tests whether two geometries are related according to a given DE-9IM intersection matrix pattern.

**Kind**: Exported member  
**Returns**: <code>number</code> - 1 if the geometries are related, 0 if not, 2 on exception  
**See**: https://libgeos.org/doxygen/geos__c_8h.html#a3a6f4e9a7f0b8c8d5b4a0c5f6c7e4d3f  

| Param | Type | Description |
| --- | --- | --- |
| g1 | <code>number</code> | A pointer to the first geometry |
| g2 | <code>number</code> | A pointer to the second geometry |
| pat | <code>string</code> | A string representing the DE-9IM pattern |


---
<a name="exp_module_geos--geos.GEOSRelatePatternMatch"></a>

## geos.GEOSRelatePatternMatch ⇒ <code>number</code> ⏏
Tests whether a DE-9IM intersection matrix matches a given pattern.

**Kind**: Exported member  
**Returns**: <code>number</code> - 1 if the matrix matches the pattern, 0 if not, 2 on exception  
**See**: https://libgeos.org/doxygen/geos__c_8h.html#a3a6f4e9a7f0b8c8d5b4a0c5f6c7e4d3f  

| Param | Type | Description |
| --- | --- | --- |
| mat | <code>string</code> | A string representing the DE-9IM matrix |
| pat | <code>string</code> | A string representing the DE-9IM pattern |


---
<a name="exp_module_geos--geos.GEOSRelatePatternMatch_r"></a>

## geos.GEOSRelatePatternMatch\_r ⇒ <code>number</code> ⏏
Tests whether a DE-9IM intersection matrix matches a given pattern in a thread-safe manner.

**Kind**: Exported member  
**Returns**: <code>number</code> - 1 if the matrix matches the pattern, 0 if not, 2 on exception  
**See**: https://libgeos.org/doxygen/geos__c_8h.html#a3a6f4e9a7f0b8c8d5b4a0c5f6c7e4d3f  

| Param | Type | Description |
| --- | --- | --- |
| handle | <code>number</code> | A GEOS context handle |
| mat | <code>string</code> | A string representing the DE-9IM matrix |
| pat | <code>string</code> | A string representing the DE-9IM pattern |


---
<a name="exp_module_geos--geos.GEOSRelatePattern_r"></a>

## geos.GEOSRelatePattern\_r ⇒ <code>number</code> ⏏
Tests whether two geometries are related according to a given DE-9IM intersection matrix pattern in a thread-safe manner.

**Kind**: Exported member  
**Returns**: <code>number</code> - 1 if the geometries are related, 0 if not, 2 on exception  
**See**: https://libgeos.org/doxygen/geos__c_8h.html#a3a6f4e9a7f0b8c8d5b4a0c5f6c7e4d3f  

| Param | Type | Description |
| --- | --- | --- |
| handle | <code>number</code> | A GEOS context handle |
| g1 | <code>number</code> | A pointer to the first geometry |
| g2 | <code>number</code> | A pointer to the second geometry |
| pat | <code>string</code> | A string representing the DE-9IM pattern |


---
<a name="exp_module_geos--geos.GEOSRelate_r"></a>

## geos.GEOSRelate\_r ⇒ <code>string</code> ⏏
Computes the DE-9IM intersection matrix for two geometries.

**Kind**: Exported member  
**Returns**: <code>string</code> - The DE-9IM intersection matrix as a string, or null if an error occurred.  
**See**: https://docs.rs/geos-sys/2.0.0/geos_sys/fn.GEOSRelate_r.html  

| Param | Type | Description |
| --- | --- | --- |
| handle | <code>number</code> | A pointer to the GEOS context handle. |
| g1 | <code>number</code> | The first geometry. |
| g2 | <code>number</code> | The second geometry. |


---
