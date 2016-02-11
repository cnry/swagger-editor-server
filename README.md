# README #

**Install**

    npm install oanylund/swagger-editor-server --save

<a name="module_swagger-editor-server"></a>
## swagger-editor-server
swagger editor server that serves local file to the editor and update the file on every change

**Example**  
```javascript
    var editor = require("swagger-editor-server")
```
<a name="module_swagger-editor-server.edit"></a>
### swagger-editor-server.edit(swaggerFile, [swaggerPort], [openInBrowser])
gives path for you to insert in browser to live edit of the swagger api file
 and optionally opens it in a browser automatically.

**Kind**: static method of <code>[swagger-editor-server](#swagger-editor-server)</code>  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| swaggerFile | <code>string</code> |  | the path to the swagger api file |
| [swaggerPort] | <code>number</code> | <code>3000</code> | the port the server will listen on |
| [openInBrowser] | <code>boolean</code> | <code>false</code> | whether to open in a browser |

**Example**  
```javascript
     editor.edit(swaggerFile, 3000)
 ```

**Output**

    Swagger editor started.
    Open browser, paste this URL and start working: http://192.168.0.109:3000/#/edit
