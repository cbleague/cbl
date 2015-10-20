module.exports = function(app){
  app.controller('AddTeamController', ['$scope', 'Resource', '$http', '$location', function($scope, Resource, $http, $location){

  $scope.team = {};
  $scope.newTeam = {};
  var teamResource = Resource('team');


  }]);
};
