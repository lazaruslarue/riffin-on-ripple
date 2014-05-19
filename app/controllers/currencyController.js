var Q    = require('q'),
    db   = require('../config/db.js').db,
    http = require('http')
;

module.exports = {
  currencyList: function(req, res){
    db.readNodesWithLabel('CURRENCY', function(err, data) {
      if (err) res.send('there was an err', err);
      res.send(data);
    });
  },
  fetchOrders: function(req, res){
    db.

    res.send(defer.promise);
  },

};

// var getOrderBooks = function(source, target){

// };


