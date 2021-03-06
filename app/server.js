// external modules
var express  = require('express');
var neo4     = require('node-neo4j');

// internal modules
var db       = require('./config/db.js'); // get the connected server
//
var app = express();

app.use(express.static(__dirname + '/../public'));

require('./routes/appRoutes.js')(app);
require('./routes/tradeRoutes.js')(app);
require('./routes/currencyRoutes.js')(app);
require('./routes/pathRoutes.js')(app);

module.exports = app;
