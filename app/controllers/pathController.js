var Q        = require('q');
var graphURL = require('../config/db.js').graphURL;
var db       = require('../config/db.js').db;
var agent    = require('superagent');

module.exports = {
  sendPath: function(req, res){
    var source    = req.params.source;
    var target    = req.params.target;

    getPathBetween(source, target, 'send')
    .then(function(data, err) {
      res.send(data);
    });
  },

  requestPath: function(req, res){
    var source    = req.params.source;
    var target    = req.params.target;

    getPathBetween(source, target, 'request')
    .then(function(data, err) {
      res.send(data);
    });
  },
};

var getPathBetween = function(source, target, pathway) {
  var defer = Q.defer();
  var postUri   = graphURL + '/db/data/node/' + source + '/path';
  var targetUri = graphURL + '/db/data/node/' + target;

  var builder = {
    send: {
      costProperty: 'ask_price',
      tradeType:    'WTS',
      forType:      'ASK_FOR'
    },
    request: {
      costProperty: 'bid_price',
      tradeType:    'WTB',
      forType:      'BID_WITH'
    }
  };

  var dataObj = {
    to: targetUri,
    cost_property: builder[pathway].costProperty,
    relationships: [
      {
        type: builder[pathway].tradeType,
        direction: "in"
      }, {
        type: builder[pathway].forType,
        direction: "out"
      }
    ],
    algorithm: "dijkstra"
  };

  agent
    .post(postUri)
    .send(dataObj)
    .set('Accept', 'application/json')
    .end(function (err, resp) {
      defer.resolve(resp.body);
    });

  return defer.promise;
};
