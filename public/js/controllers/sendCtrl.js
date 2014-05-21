controllers.controller('SendCtrl',function($scope, Api) {

  Api.queryCurrencies()   //TODO: check for cached answer (still needs cache)
  .then(function (data) {
    $scope.currencyOptions = data;
  });

  $scope.setTarget = function (currency) {
    $scope.target = currency;
  };

  $scope.setSource = function (currency) {
    $scope.source = currency;
  };

});
