module.exports = function(app) {
  
  app.controller('RegisterTeamController', ['$scope', '$http', '$cookies',function($scope, $http, $cookies) {
    
    $scope.team = {};
    $scope.team.admin = {};
    $scope.team.cap = {};
    $scope.team.coach = {};
    $scope.team.creator = $scope.loggedUser;
    $scope.teams = {};
    $scope.player = {};
    $scope.teamFormatting = false;

    $http.defaults.headers.common.token = $cookies.get('token');

    $scope.getTeamsByCreator = function() {
      console.log("---<>>>");
      $http({
        method: 'GET',
        url:'api/team/getteam/' + $scope.loggedUser
      }).then(function(res) {
        if (res.data.length > 0) {
          res.data.forEach(function(team) {
            $scope.teams[team._id] = team;
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
        $scope.teams[res.data._id] = res.data;
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
        delete $scope.teams[team._id];
      }.bind(this), function(res) {
        console.log(res);
      });
    };

    $scope.createPlayer = function() {
      $http({
        method: 'POST',
        url:'api/player/register',
        data: $scope.player
      }).then(function(res) {
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
          $scope.teams[$scope.player.team].playersArray.push($scope.player);
          $scope.player = {};
        }, function(res) {
          console.log(res);
        });
    };

    $scope.getPlayers = function(team) {
      $http({
        method: 'POST',
        url:'api/player/findbyid',
        data: {"array": team.players}
      }).then(function(res) {
        console.log(res.data);
        $scope.teams[team._id].playersArray = res.data;

      }.bind(this), function(res) {
        console.log(res);
      });
    };

    $scope.edit = function(team) {
      $scope.team = team;
      $scope.teamFormatting = true;
    };

    $scope.updateTeam = function() {
      $http({
          method: 'PUT',
          url:'api/team/updateteam/' + $scope.team._id,
          data: $scope.team
        }).then(function(res) {
          $scope.teamFormatting = false;
          $scope.team = {};
        }, function(res) {
          console.log(res);
        });
    };

  }]);
};
