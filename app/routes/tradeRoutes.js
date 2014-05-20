var tradeController = require('../controllers/tradeController.js');

module.exports = function(app) {

  app.get('/do/send/:source/to/:target',      tradeController.send );
  app.get('/do/request/:source/from/:target', tradeController.request );

};
