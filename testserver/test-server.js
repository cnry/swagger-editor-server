// Port to listen to
var PORT = process.env.port || 3005

// Include the package. outside test it will be "swagger-editor-server"
var editor = require("../lib/index.js")

// Start server
editor.edit('./swagger.yaml', PORT)
