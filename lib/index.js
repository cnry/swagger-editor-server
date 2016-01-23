'use strict';

/**
swagger editor server that serves local file to the editor and update the file on every change
@module swagger-editor-server
@alias editor
@example
```javascript
    var editor = require("swagger-editor-server");
```
*/
module.exports = {

    /** opens the browser and enables live edit of the swagger api file
     *  @param {string} swaggerFile - the path to the swagger api file
     *  @example
     *  ```javascript
     *      editor.edit(swaggerFile);
     *  ```
    */
    edit: function (swaggerFile) {

        var serveStatic = require('serve-static'),
            fs = require('fs'),
            path = require('path'),
            // swagger-editor must be served from root
            SWAGGER_EDITOR_SERVE_PATH = '/',
            // swagger-editor expects to GET the file here
            SWAGGER_EDITOR_LOAD_PATH = '/editor/spec',
            // swagger-editor PUTs the file back here
            SWAGGER_EDITOR_SAVE_PATH = '/editor/spec',
            // swagger-editor ask for defaults
            SWAGGER_EDITOR_DEFAULTS = '/config',
            SWAGGER_EDITOR_DEFAULTS_DIR = path.join(__dirname, './config'),
            SWAGGER_EDITOR_DIR = path.join(__dirname, '../node_modules/swagger-editor'),
            app = require('connect')();

        // save the file from swagger-editor
        app.use(SWAGGER_EDITOR_SAVE_PATH, function (req, res, next) {

            if (req.method !== 'PUT') {
                return next();
            }

            var stream = fs.createWriteStream(swaggerFile);
            req.pipe(stream);
            stream.on('finish', function () {
                res.end('ok');
            });

        });

        // serve defaults
        app.use(SWAGGER_EDITOR_DEFAULTS, serveStatic(SWAGGER_EDITOR_DEFAULTS_DIR));
        // retrieve the project swagger file for the swagger-editor
        app.use(SWAGGER_EDITOR_LOAD_PATH, serveStatic(swaggerFile));
        // serve swagger-editor
        app.use(SWAGGER_EDITOR_SERVE_PATH, serveStatic(SWAGGER_EDITOR_DIR));

        // start //
        var http = require('http'),
            server = http.createServer(app);
            port = 3006

        server.listen(port, function () {
            console.log('Starting Swagger editor.');
            console.log('Open browser. Paste: http://SERVER_IP:%d/#/edit', port);
        });

    }

};
