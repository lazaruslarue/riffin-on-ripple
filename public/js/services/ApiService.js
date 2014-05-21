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
        url: '/send/'+sourceCurrency+'/to/'+targetCurrency
      })
      .success(function(data, status) {
        console.log(data);
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
        url: '/request/'+sourceCurrency+'/from/'+targetCurrency
      })
      .success(function(data, status) {
        defer.resolve(data);
      })
      .error(function(data, status){
        alert('there was an error in ApiService.requestMoney with these args: ', arguments);
        console.log(arguments);
        defer.reject(data);
      });
      return defer.promise;
    },

    fetchNode: function(node){
      var defer = $q.defer();
      $http({
        method: 'GET',
        url: '/node/' + node
      })
      .success(function(data, status) {
        defer.resolve(data);
      })
      .error(function(data, status){
        alert('there was an error in ApiService.fetchNode with these args: ', arguments);
        console.log(arguments);
        defer.reject(data);
      });
      return defer.promise;
    },

    fetchRelationship: function(node){
      var defer = $q.defer();
      $http({
        method: 'GET',
        url: '/relation/' + node
      })
      .success(function(data, status) {
        defer.resolve(data);
      })
      .error(function(data, status){
        alert('there was an error in ApiService.fetchRelationship with these args: ', arguments);
        console.log(arguments);
        defer.reject(data);
      });
      return defer.promise;
    },
  };
});
