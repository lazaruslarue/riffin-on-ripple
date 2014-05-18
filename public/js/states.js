angular.module('states',[
  'state.send',
  'state.request'
])
.config(function ($stateProvider, $urlRouterProvider) {
  $stateProvider.state("/home",{
    url: "/home",
    template: "home"
  });

  $urlRouterProvider.otherwise('/home');
});

// request.js
angular.module('state.request',[]).config( function ($stateProvider) {
  $stateProvider.state("request", {
    url: "/request",
    controller: "RequestCtrl",
    templateUrl: "../templates/request.html",
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
