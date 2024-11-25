<a name="exp_module_geos--geos.GEOSContext_setErrorHandler_r"></a>

## geos.GEOSContext\_setErrorHandler\_r ⇒ [<code>GEOSMessageHandler</code>](/typedefs-enums/typedefs-enums.html#GEOSMessageHandler) ⏏
Set the notice handler callback function for run-time error messages.

**Kind**: global property of [<code>geos</code>](/typedefs-enums/typedefs-enums.html#module_geos)  
**Returns**: [<code>GEOSMessageHandler</code>](/typedefs-enums/typedefs-enums.html#GEOSMessageHandler) - the previously configured message handler or NULL if no message handler was configured  

| Param | Type | Description |
| --- | --- | --- |
| extHandle | [<code>GEOSContextHandle\_t</code>](/typedefs-enums/typedefs-enums.html#GEOSContextHandle_t) | the GEOS context from GEOS_init_r |
| ef | [<code>GEOSMessageHandler</code>](/typedefs-enums/typedefs-enums.html#GEOSMessageHandler) | the handler callback |


---
<a name="exp_module_geos--geos.GEOSContext_setErrorMessageHandler_r"></a>

## geos.GEOSContext\_setErrorMessageHandler\_r ⇒ [<code>GEOSMessageHandler\_r</code>](/typedefs-enums/typedefs-enums.html#GEOSMessageHandler_r) ⏏
Sets an error message handler on the given GEOS context.

**Kind**: global property of [<code>geos</code>](/typedefs-enums/typedefs-enums.html#module_geos)  
**Returns**: [<code>GEOSMessageHandler\_r</code>](/typedefs-enums/typedefs-enums.html#GEOSMessageHandler_r) - the previously configured message handler or NULL if no message handler was configured  

| Param | Type | Description |
| --- | --- | --- |
| extHandle | [<code>GEOSContextHandle\_t</code>](/typedefs-enums/typedefs-enums.html#GEOSContextHandle_t) | the GEOS context |
| ef | [<code>GEOSMessageHandler\_r</code>](/typedefs-enums/typedefs-enums.html#GEOSMessageHandler_r) | the message handler |
| userData | [<code>Pointer</code>](/typedefs-enums/typedefs-enums.html#Pointer) | optional user data pointer that will be passed to the message handler |


---
<a name="exp_module_geos--geos.GEOSContext_setNoticeHandler_r"></a>

## geos.GEOSContext\_setNoticeHandler\_r ⇒ [<code>GEOSMessageHandler</code>](/typedefs-enums/typedefs-enums.html#GEOSMessageHandler) ⏏
Set the notice handler callback function for run-time notice messages.

**Kind**: global property of [<code>geos</code>](/typedefs-enums/typedefs-enums.html#module_geos)  
**Returns**: [<code>GEOSMessageHandler</code>](/typedefs-enums/typedefs-enums.html#GEOSMessageHandler) - the previously configured message handler or NULL if no message handler was configured  

| Param | Type | Description |
| --- | --- | --- |
| extHandle | [<code>GEOSContextHandle\_t</code>](/typedefs-enums/typedefs-enums.html#GEOSContextHandle_t) | the context returned by GEOS_init_r. |
| nf | [<code>GEOSMessageHandler</code>](/typedefs-enums/typedefs-enums.html#GEOSMessageHandler) | the handler callback |


---
<a name="exp_module_geos--geos.GEOSContext_setNoticeMessageHandler_r"></a>

## geos.GEOSContext\_setNoticeMessageHandler\_r ⇒ [<code>GEOSMessageHandler\_r</code>](/typedefs-enums/typedefs-enums.html#GEOSMessageHandler_r) ⏏
Sets a notice message handler on the given GEOS context.

**Kind**: global property of [<code>geos</code>](/typedefs-enums/typedefs-enums.html#module_geos)  
**Returns**: [<code>GEOSMessageHandler\_r</code>](/typedefs-enums/typedefs-enums.html#GEOSMessageHandler_r) - the previously configured message handler or NULL if no message handler was configured  

| Param | Type | Description |
| --- | --- | --- |
| extHandle | [<code>GEOSContextHandle\_t</code>](/typedefs-enums/typedefs-enums.html#GEOSContextHandle_t) | the GEOS context from GEOS_init_r |
| nf | [<code>GEOSMessageHandler\_r</code>](/typedefs-enums/typedefs-enums.html#GEOSMessageHandler_r) | the message handler |
| userData | [<code>Pointer</code>](/typedefs-enums/typedefs-enums.html#Pointer) | optional user data pointer that will be passed to the message handler |


---
