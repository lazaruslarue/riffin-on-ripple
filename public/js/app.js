angular.module('app', [
  'ui.router',
  'ui.bootstrap',
  'states',
  'app.services',
  'app.controllers',
  'app.directives',
]);

var services    = angular.module('app.services',[]);
var controllers = angular.module('app.controllers',[]);
var directives  = angular.module('app.directives',[]);
