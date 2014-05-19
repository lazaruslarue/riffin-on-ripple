var neo4j    = require('node-neo4j');
var Q        = require('Q');
var http     = require('http');
var graphURL = require('../config/db.js').graphURL;
var db       = require('../config/db.js').db;
var request  = http.request;

module.exports = {
  send: function(req, res){
    // console.log(req.params); { source: 'foo', target: 'bar' }

    getBidOrders(req.params)
    .then(function(data) {
      res.send(data);
    });

    // get correct db Endpoint from db
    // post Data to Correct Endpoint
      // defer.resolve(data);

  },
  request: function(req, res){
    var defer = Q.defer();
    // get POST request assembler from requests/findReceiveRoute
    // get correct db Endpoint from db
    // post Data to correct Endpoint
      // resolve promise
    res.send(defer.promise);
  },

};
//MATCH (n:ORDER:BID {bid_with:"USD", wtb: "BTC"}) RETURN n ORDER BY n.bid_price
var getBidOrders = function(params){
  var defer = Q.defer();

  var opts = {
    query : "MATCH (n:ORDER:BID {bid_with:{props}.bid_with, buy: {props}.buy})" +
      " RETURN n ORDER BY n.bid_price DESC LIMIT 25",
    params : {
      props : {
        bid_with : params.source,
        buy : params.target
      }
    }
  };

  db.cypherQuery(opts.query, opts.params, function(err, result){
    defer.resolve(result.data);
  });


  return defer.promise;
};

var getPathBetween = function(start, end) {
  var defer = Q.defer();


  return defer.promise;
};
