var tradeController = require('../controllers/tradeController.js');

module.exports = function(app) {
  app.get('/send/:source/:target', tradeController.send );
  app.get('/request/:source/:target', tradeController.request );
};
