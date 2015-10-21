module.exports = function(app){
  app.controller('AddTeamController', ['$scope', '$http', '$cookies', function($scope, $http, $cookies){

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

  $scope.addTeamToSeason = function(id){
    $http({
      method: 'POST',
      url: 'api/season/addteam',
      headers: {
        'token': $cookies.get('token')
      },
      data: {
        teamId: id,
        seasonId: '5626d12643d81a6c6e311556'
      }
    }).then(function(res){
      $scope.changeInSeason();
      console.log('response is: ' + res.data);
    }, function(res){
      console.log('AddTeamController add2season error ' + res);
    });
  };

  $scope.changeInSeason = function(id){
    $http({
      method: 'PUT',
      url: 'api/team/updateteam/:id',
      headers: {
        'token': $cookies.get('token')
      },
      data: {
        teamId: id,
        inSeason: true
      }
    }).then(function(res){
      console.log('In Season is now true ' + res.data);
    }, function(res){
      console.log('AddTeamController change error ' + res);
    });
  };

  $scope.updateTeam = function(){
    $http({
      method: 'PUT',
      url: 'api/team/updateteam/:id',
      headers: {
        'token': $cookies.get('token')
      }
    }).then(function(res){
      $scope.teamArray._id = res.data;
      console.log('we got data ' + res.data);
    }, function(res){
      console.log('AddTeamController updateTeam error ' + res);
    });
  };

  $scope.removeTeamFromAngular = function(){

  };

  $scope.removeTeamFromSeason = function(){

  };

  }]);
};
