var pathController = require('../controllers/pathController.js');

module.exports = function(app) {

  app.get('/send/:source/to/:target',      pathController.sendPath );
  app.get('/request/:source/from/:target', pathController.requestPath );

};
