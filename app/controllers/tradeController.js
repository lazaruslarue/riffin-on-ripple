var Q   = require('q');
var db  = require('../api/db.js').db;

module.exports = {
  send: function(req, res){
    res.sendfile('index.html', {root: __dirname + '/../../public/'});
  },
  receive: function(req, res){
    res.sendfile('index.html', {root: __dirname + '/../../public/'});
  },
};
