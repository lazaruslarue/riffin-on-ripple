var Q   = require('q');
var db  = require('../config/db.js').db;

module.exports = {
  send: function(req, res){
    // create promise
    // get POST request assembler from requests/findSendRoute
    // get correct db Endpoint from db
    // post Data to Correct Endpoint
      // resolve promise


    // res.send(q.defer);
  },
  request: function(req, res){
    // create promise
    // get POST request assembler from requests/findReceiveRoute
    // get correct db Endpoint from db
    // post Data to correct Endpoint
      // resolve promise
    // res.send(q.defer);
  },
};

var getOrderBooks = function(source, target){

};
