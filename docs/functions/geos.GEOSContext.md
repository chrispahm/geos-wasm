<a name="exp_module_geos--geos.GEOSContext_setErrorHandler_r"></a>

## geos.GEOSContext\_setErrorHandler\_r ⇒ <code>number</code> ⏏
Sets the error handler for a GEOS context.

**Kind**: Exported member  
**Returns**: <code>number</code> - The previous error handler function pointer.  

| Param | Type | Description |
| --- | --- | --- |
| context | <code>number</code> | A pointer to the GEOS context handle. |
| handler | <code>number</code> | The error handler function pointer. |


---
<a name="exp_module_geos--geos.GEOSContext_setErrorMessageHandler_r"></a>

## geos.GEOSContext\_setErrorMessageHandler\_r ⏏
Sets an error message handler for a given GEOS context. An error message handler is a function that takes a string argument and does something with it, such as printing it to stderr or logging it somewhere. Error messages indicate that something went wrong during a GEOS operation.

**Kind**: Exported member  

| Param | Type | Description |
| --- | --- | --- |
| handle | <code>number</code> | A pointer to the GEOS context handle. |
| ef | <code>function</code> | A pointer to an error message handler function. |
| userData | <code>any</code> | A pointer to user data that will be passed to the error message handler function. |


---
<a name="exp_module_geos--geos.GEOSContext_setNoticeHandler_r"></a>

## geos.GEOSContext\_setNoticeHandler\_r ⇒ <code>number</code> ⏏
Sets the notice handler for a GEOS context.

**Kind**: Exported member  
**Returns**: <code>number</code> - The previous notice handler function pointer.  

| Param | Type | Description |
| --- | --- | --- |
| context | <code>number</code> | A pointer to the GEOS context handle. |
| handler | <code>number</code> | The notice handler function pointer. |


---
<a name="exp_module_geos--geos.GEOSContext_setNoticeMessageHandler_r"></a>

## geos.GEOSContext\_setNoticeMessageHandler\_r ⏏
Sets a notice message handler for a given GEOS context. A notice message handler is a function that takes a string argument and does something with it, such as printing it to stdout or logging it somewhere. Notice messages are informative messages that do not indicate an error condition.

**Kind**: Exported member  

| Param | Type | Description |
| --- | --- | --- |
| handle | <code>number</code> | A pointer to the GEOS context handle. |
| nf | <code>function</code> | A pointer to a notice message handler function. |
| userData | <code>any</code> | A pointer to user data that will be passed to the notice message handler function. |


---
