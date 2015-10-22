module.exports = function(app){
  app.controller('AddGameController', ['$scope', '$http', '$cookies', function($scope, $http, $cookies){

  $scope.divATeams = [];
  $scope.divBTeams = [];
  $scope.currentTeams = $scope.divATeams;
  $scope.data = {};
  $scope.division = { name: 'A' };
  $http.defaults.headers.common.token = $cookies.get('token');

  $scope.swapDivisions = function() {
    ($scope.currentTeams == $scope.divATeams)? $scope.currentTeams = $scope.divBTeams: $scope.currentTeams = $scope.divATeams;
  };

  $scope.getWholeSeason = function() {
    $http({
        method: 'GET',
        url: 'api/season/getwholeseason'
      }).then(function(res){
         $scope.season = res.data;
         $scope.data.seasonId = res.data._id;
         $scope.populateTeams();
      }, function(res){
        console.log('AddGameController getSeason error ' + res);
    });
  }();

  $scope.populateTeams = function() {
    $scope.season.teams.forEach(function(team) {
      if (team.division == 'A') {
        $scope.divATeams.push({name:team.name, _id: team.team});
      } else {
        $scope.divBTeams.push({name:team.name, _id: team.team});
      }
    });
  };

  $scope.addGame = function(){
    $http({
        method: 'POST',
        url: 'api/game/addgame',
        data: $scope.data
      }).then(function(res){
        $scope.data = {};
      }, function(res){
        console.log('AddGameController addGame error ' + res);
    });
  };

  $scope.findGame = function(){
    $http({
        method: 'POST',
        url: 'api/game/findgame'
        /* data: {
          'seasonNumber': 10,
          'inSeason': false
        }*/
      }).then(function(res){
        $scope.gameArray = res.data;
        console.log('we got data ' + res.data);
      }, function(res){
        console.log('AddGameController findGame error ' + res);
    });
  };

  $scope.updateGame = function(){
    $http({
      method: 'PUT',
      url: 'api/game/updategame', // need to add this route
      data: {
        // grab by teams and date
      }
    });
  };

  $scope.removeGame = function(){
    $http({
      method: 'DELETE',
      url: 'api/game/removegame', // add js logic to this route
      data: {
        // delete game by teams and date
      }
    });
  };

  }]);
};
