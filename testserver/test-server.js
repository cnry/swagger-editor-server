// Port to listen to
var PORT = process.env.port || 3005

// Open in a browser
var OPEN = process.env.open || false

// Include the package. outside test it will be "swagger-editor-server"
var editor = require('../lib/index.js'),
    path = require('path'),
    doc = path.join(__dirname, 'swagger.yaml')

// Start server
editor.edit(doc, PORT, OPEN)
