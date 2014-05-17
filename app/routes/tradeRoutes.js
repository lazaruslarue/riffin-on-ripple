var tradeController = require('./controllers/tradeController.js');

module.exports = function(app) {
  app.get('/send/:source/:target', tradeController.send );
};
