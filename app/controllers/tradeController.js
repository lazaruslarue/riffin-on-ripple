var neo4j    = require('node-neo4j');
var Q        = require('q');
var agent    = require('superagent');
var graphURL = require('../config/db.js').graphURL;
var db       = require('../config/db.js').db;

module.exports = {
  send: function(req, res){
    // req.params === { requester: 'requestingGuy', sender: 'sendingGal', source: 'foo', target: 'bar' } // true // TODO: remove
    // TODO: path to execute transactions on path
    res.send(201);
  },

  request: function(req, res){
    // req.params === { requester: 'requestingGuy', sender: 'sendingGal', source: 'foo', target: 'bar' } // true // TODO: remove
    // TODO: path to execute transactions on path

    res.send(201);
  },

};
