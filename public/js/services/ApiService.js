services.service('Api', function($http, $q) {

  return {
    queryCurrencies: function(){ //TODO: cache these results somewhere
      var defer = $q.defer();
      $http({
        method: 'GET',
        url: '/currencies/'
      })
      .success(function(data, status) {
        defer.resolve(data);
      })
      .error(function(data, status){
        alert('there was an error in ApiService.queryCurrencies with these args: ', arguments);
        console.log(arguments);
      });
      return defer.promise;
    },

    sendMoney: function(sourceCurrency, targetCurrency) {
      var defer = $q.defer();
      $http({
        method: 'GET',
        url: '/send/'+sourceCurrency._id+'/to/'+targetCurrency._id
      })
      .success(function(data, status) {
        defer.resolve(data);
      })
      .error(function(data, status){
        console.log('there was an error in ApiService.sendMoney with these args: ', arguments);
      });
      return defer.promise;
    },

    requestMoney: function(sourceCurrency, targetCurrency) {
      var defer = $q.defer();
      $http({
        method: 'GET',
        url: '/request/'+sourceCurrency._id+'/from/'+targetCurrency._id
      })
      .success(function(data, status) {
        defer.resolve(data);
      })
      .error(function(data, status){
        alert('there was an error in ApiService.requestMoney with these args: ', arguments);
        console.log(arguments);
      });
      return defer.promise;
    },
  };
});
