var Q    = require('q');
var db   = require('../config/db.js').db;

module.exports = {
  currencyList: function(req, res){
    db.readNodesWithLabel('CURRENCY', function(err, data) {
      console.log(data); //TODO: remove me
      if (err) res.send('there was an err', err);
      res.send(data);
    });
  },

  fetchOrders: function(req, res){


    res.send(200);
  },

};
