var currencyController = require('../controllers/currencyController.js');

module.exports = function(app) {

  app.get('/currencies', currencyController.currencyList );

};
