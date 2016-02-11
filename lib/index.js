'use strict'

/**
swagger editor server that serves local file to the editor and update the file on every change
@module swagger-editor-server
@alias editor
@example
```javascript
    var editor = require("swagger-editor-server")
```
*/
module.exports = {

    /** gives path for you to insert in browser to live edit of the swagger api file
     *  and optionally opens it in a browser automatically.
     *  @param {string} swaggerFile - the path to the swagger api file
     *  @param {number} [swaggerPort=3000] - the port the server will listen on
     *  @param {boolean} [openInBrowser=false] - whether to open in a browser
     *  @example
     *  ```javascript
     *      editor.edit(swaggerFile, 3000)
     *  ```
    */
    edit: function (swaggerFile, swaggerPort, openInBrowser) {

        if (swaggerPort !== undefined && openInBrowser === undefined) {
            if (swaggerPort === true) {
                swaggerPort = undefined
                openInBrowser = true
            }
        }

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
            SWAGGER_EDITOR_DIR = path.dirname(require.resolve('swagger-editor')),
            app = require('connect')()

        // save the file from swagger-editor
        app.use(SWAGGER_EDITOR_SAVE_PATH, function (req, res, next) {

            if (req.method !== 'PUT') {
                return next()
            }

            var stream = fs.createWriteStream(swaggerFile)
            req.pipe(stream)
            stream.on('finish', function () {
                res.end('ok')
            })

        })

        // serve defaults
        app.use(SWAGGER_EDITOR_DEFAULTS, serveStatic(SWAGGER_EDITOR_DEFAULTS_DIR))
        // retrieve the project swagger file for the swagger-editor
        app.use(SWAGGER_EDITOR_LOAD_PATH, serveStatic(swaggerFile))
        // serve swagger-editor
        app.use(SWAGGER_EDITOR_SERVE_PATH, serveStatic(SWAGGER_EDITOR_DIR))

        // start //
        var http = require('http'),
            server = http.createServer(app),
            port = swaggerPort || 3000,
            localIp = require('quick-local-ip').getLocalIP4(),
            editorUrl = require('util').format('http://%s:%d/#/edit', localIp, port)

        server.listen(port, function () {
            console.log('Swagger editor started.')
            if (openInBrowser) {
                var open = require('open')
                open(editorUrl, function () {
                    console.log('Available at URL:', editorUrl)
                    console.log('Do not terminate this process or close this window until finished editing.')
                })
            } else {
                console.log('Open browser, paste this URL and start working:', editorUrl)
            }
        })

    }

}
