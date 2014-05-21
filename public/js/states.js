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
  })
  .state("request.route", {
    url: "/:source/from/:target",
    resolve: {
      route: function($stateParams, Api){
        var sourceCurrency = $stateParams.source;
        var targetCurrency = $stateParams.target;
        return Api.requestMoney(sourceCurrency, targetCurrency);
      },
    },
    controller: "RouteCtrl",
    templateUrl: "../templates/route.html",
  });
});

// send.js
angular.module('state.send',[]).config( function ($stateProvider) {
  $stateProvider.state("send", {
    url: "/send",
    controller: "SendCtrl",
    templateUrl: "../templates/send.html",
  })
  .state("send.route", {
    url: "/:source/to/:target",
    resolve: {
      route: function($stateParams, Api){
        var sourceCurrency = $stateParams.source;
        var targetCurrency = $stateParams.target;
        return Api.sendMoney(sourceCurrency, targetCurrency);
      },
    },
    controller: "RouteCtrl",
    templateUrl: "../templates/route.html",
  });
});
