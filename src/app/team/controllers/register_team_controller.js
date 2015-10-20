module.exports = function(app) {
  app.controller('RegisterTeamController', ['$scope', '$http', '$cookies',function($scope, $http, $cookies) {
    $scope.team = {};
    $scope.team.admin = {};
    $scope.team.cap = {};
    $scope.team.coach = {};
    $scope.team.creator = $scope.loggedUser;

    $scope.teams = [];

    $scope.player = {};

    $http.defaults.headers.common.token = $cookies.get('token');

    $scope.getTeamsByCreator = function() {
      console.log("---<>>>");
      $http({
        method: 'GET',
        url:'api/team/getteam/' + $scope.loggedUser
      }).then(function(res) {
        if (res.data.length > 0) {
          res.data.forEach(function(team) {
            $scope.teams.push(team);
          });
        }
      }, function(res) {
        console.log(res);
      });
    }();

    $scope.createTeam = function() {
      $http({
        method: 'POST',
        url:'api/team/registerteam',
        data: $scope.team
      }).then(function(res) {
        $scope.teams.push(res.data);
        $scope.team = {};
      }, function(res) {
        console.log(res);
      });
    };

    $scope.delete = function(team) {
      $http({
        method: 'DELETE',
        url:'api/team/deleteteam/' + team.name
      }).then(function(res) {
        $scope.teams.splice($scope.teams.indexOf(team), 1);
      }, function(res) {
        console.log(res);
      });
    };

    $scope.createPlayer = function() {
      $http({
        method: 'POST',
        url:'api/player/register',
        data: $scope.player
      }).then(function(res) {
        console.log(res.data._id);
        console.log($scope.player.team);

        $scope.addPlayerToTeam($scope.player.team, res.data._id);
      }, function(res) {
        console.log(res);
      });
    };

    $scope.addPlayerToTeam = function(teamId, playerId) {
       $http({
          method: 'PUT',
          url:'api/team/addplayer',
          data: {"playerId": playerId, "teamId": teamId}
        }).then(function(res) {
          console.log(res);
        }, function(res) {
          console.log(res);
        });
    };


  }]);
};
