angular.module('states',[
  // 'state.send',
  // 'state.recv'
])

.config(function ($urlRouterProvider) {
  console.log(arguments);
  return $urlRouterProvider.otherwise('/home');
})
