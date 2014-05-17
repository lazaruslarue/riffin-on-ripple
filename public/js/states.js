angular.module('states',[
  'state.send',
  'state.receive'
])
.config(function ($urlRouterProvider) {
  $urlRouterProvider.otherwise('/home');
});

// send.js
angular.module('state.send',[]).config( function ($stateProvider) {
  $stateProvider.state("send", {
    url: "/send",
    controller: "SendCtrl"
  });
});


// receive.js
angular.module('state.receive',[]).config( function ($stateProvider) {
  $stateProvider.state("receive", {
    url: "/receive",
    controller: "RecvCtrl"
  });
});

