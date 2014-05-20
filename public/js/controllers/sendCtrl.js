controllers.controller('SendCtrl',function($scope, $state, Api) {

  $scope.sendMoney = function(source, target) {
    Api.sendMoney(source, target)
    .then(function (data) {
      console.log("sendMoney", arguments);
      $scope.orders = data;
      $state.go('send.routeOptions({source:', source, ', target:', target, '})');
    });

  };

  Api.queryCurrencies()   //TODO: check for cached answer (still needs cache)
  .then(function (data) {
    $scope.currencyOptions = data;
  });

});
