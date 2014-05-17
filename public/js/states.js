angular.module('states',[
  'state.send',
  'state.receive'
])
.config(function ($stateProvider, $urlRouterProvider) {
  $stateProvider.state("/home",{
    url: "/home",
    template: "home"
  });

  $urlRouterProvider.otherwise('/home');
});

// receive.js
angular.module('state.receive',[]).config( function ($stateProvider) {
  $stateProvider.state("receive", {
    url: "/receive",
    controller: "RecvCtrl",
    templateUrl: "../templates/receive.html",
  });
});

// send.js
angular.module('state.send',[]).config( function ($stateProvider) {
  $stateProvider.state("send", {
    url: "/send",
    controller: "SendCtrl",
    templateUrl: "../templates/send.html",
  });
});
