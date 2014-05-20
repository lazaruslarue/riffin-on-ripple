angular.module('app', [
  'ui.router',
  'ui.bootstrap',
  'states',
  'app.services',
  'app.controllers',
]);

var services    = angular.module('app.services',[]);
var controllers = angular.module('app.controllers',[]);
