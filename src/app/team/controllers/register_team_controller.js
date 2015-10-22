module.exports = function(app) {
  
  app.controller('RegisterTeamController', ['$scope', '$http', '$cookies', 'alertService', 'busy', function($scope, $http, $cookies, alertService, busy) {
    
    $scope.team = {};
    $scope.team.creator = $scope.loggedUser;
    $scope.teams = {};
    $scope.player = {};
    $scope.teamFormatting = false;
    $scope.playerFormatting = false;

    $http.defaults.headers.common.token = $cookies.get('token');

    $scope.clearTeamForm = function() {
      $scope.team = {};
      $scope.team.creator = $scope.loggedUser;
    };

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
        $scope.clearTeamForm();
        alertService.add('success', 'You Just Added The Team');
      }, function(res) {
        console.log(res);
      });
    };

    $scope.deleteTeam = function(team) {
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

    $scope.editTeam = function(team) {
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
          $scope.clearTeamForm();
        }, function(res) {
          console.log(res);
        });
    };

    $scope.editPlayer = function(player) {
      $scope.player = player;
      console.log(player);
      $scope.playerFormatting = true;
    };

    $scope.updatePlayer = function() {
      $http({
          method: 'PUT',
          url:'api/player/updateplayer/' + $scope.player._id,
          data: $scope.player
        }).then(function(res) {
          $scope.playerFormatting = false;
          $scope.player = {};
        }, function(res) {
          console.log(res);
        });
    };

    $scope.cancelTeamEditing = function() {
      $scope.teamFormatting = false;
      $scope.clearTeamForm();
    };

    $scope.cancelPlayerEditing = function() {
      $scope.playerFormatting = false;
      $scope.player = {};
    };

  }]);
};
