angular.module('state.send',[]).config( function ($stateProvider) {
  $stateProvider.state("send", {
    url: "/send",
    controller: "HomeCtrl"
  });
});
