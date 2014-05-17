// external modules
var express  = require('express');
var neo4     = require('node-neo4j');

// internal modules
var db       = require('./db.js'); // get the connected server
//
var app = express();

app.use(express.static(__dirname + '/../public'));

require('./routes/appRoutes.js')(app);

module.exports = app;
