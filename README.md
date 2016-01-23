# README #

**Install**

    npm install swagger-editor-server --save

<a name="module_swagger-editor-server"></a>
#swagger-editor-server
swagger editor server that serves local file to the editor and update the file on every change

**Example**  
```javascript
    var editor = require("swagger-editor-server")
```

<a name="module_swagger-editor-server.edit"></a>
##editor.edit(swaggerFile, [swaggerPort])
gives path for you to insert in browser to live edit of the swagger api file

**Params**

- swaggerFile `string` - the path to the swagger api file  
- \[swaggerPort=3000\] `number` - the port the server will listen on  

**Example**  
```javascript    editor.edit(swaggerFile, 3000)```


