directives.directive('rippleRoute', function() {
  return {
    restrict: "E",
    scope: {
      route: "="
    },
    templateUrl: "../../templates/RippleRoute.html",
    controller: function () {

    }
  };
});

// directives.directive('rippleRelation', function() {
//   return {
//     restrict: "E",
//     scope: {
//       relationUrl: "="
//     },
//     templateUrl: "../../templates/RippleRoute.html",
//     controller: function (Api) {
//       var relationNumber = relationUrl.split('/');
//       console.log(relationNumber);
//       // Api.fetchRelationship(relationNumber);

//     }
//   };
// });

// directives.directive('rippleNode', function() {
//   return {
//     restrict: "E",
//     scope: {
//       nodeUrl: "="
//     },
//     templateUrl: "../../templates/RippleRoute.html",
//     controller: function (Api) {
//       // Api.fetchNode(nodeNumber);
//     }
//   };
// });
