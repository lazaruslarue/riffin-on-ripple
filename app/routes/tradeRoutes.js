var tradeController = require('../controllers/tradeController.js');

module.exports = function(app) {

  app.get('/send/:source/to/:target',      tradeController.send );
  app.get('/request/:source/from/:target', tradeController.request );
};
