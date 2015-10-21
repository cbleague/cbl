module.exports = function(app){
  app.controller('AddTeamController', ['$scope', '$http', '$cookies', function($scope, $http, $cookies){

  $scope.team = {};
  $scope.newTeam = {};

  $scope.getSome = function(){
      $http({
        method: 'POST',
        url: 'api/team/getteamsnotinseason/:season',
        headers: {
          'token': $cookies.get('token')
        },
        data: {
          'seasonNumber': 10,
          'inSeason': false
        }
      }).then(function(res){
        $scope.teamArray = res.data;
        console.log('we got data ' + res.data);
      }, function(res){
        console.log('AddTeamController getSome error ' + res);
      });
    };

  $scope.addTeamToSeason = function(){

  };

  $scope.updateTeam = function(){

  };

  $scope.removeTeamFromSeason = function(){

  };

  }]);
};
