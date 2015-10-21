module.exports = function(app){
  app.controller('AddTeamController', ['$scope', '$http', '$cookies', function($scope, $http, $cookies){

  $http.defaults.headers.common.token = $cookies.get('token');

  $scope.getSome = function(){
    $http({
      method: 'POST',
      url: 'api/team/getteamsnotinseason/:season',
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

  $scope.addTeamToSeason = function(team){
    $http({
      method: 'POST',
      url: 'api/season/addteam',
      data: {
        teamId: team._id,
        seasonId: $scope.currentSeason._id
      }
    }).then(function(res){
      $scope.changeInSeason(team);
      console.log('response is: ' + res.data);
    }, function(res){
      console.log('AddTeamController add2season error ' + res);
    });
  };

  $scope.changeInSeason = function(team){
    $http({
      method: 'PUT',
      url: 'api/team/changeinseason/' + team._id
    }).then(function(res){
      $scope.teamArray.splice($scope.teamArray.indexOf(team), 1);
      console.log('In Season is now true ' + res.data);
    }, function(res){
      console.log('AddTeamController change error ' + res);
    });
  };

  $scope.updateTeam = function(){
    $http({
      method: 'PUT',
      url: 'api/team/updateteam/:id'
    }).then(function(res){
      $scope.teamArray._id = res.data;
      console.log('we got data ' + res.data);
    }, function(res){
      console.log('AddTeamController updateTeam error ' + res);
    });
  };

  // add this functionality
  $scope.removeTeamFromSeason = function(){

  };

  }]);
};
