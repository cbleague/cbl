module.exports = function(app) {
  app.controller('RegisterTeamController', ['$scope', '$http', '$cookies',function($scope, $http, $cookies) {
    $scope.team = {};
    $scope.team.admin = {};
    $scope.team.cap = {};
    $scope.team.coach = {};
    $scope.team.creator = $scope.loggedUser;

    $scope.teams = [];

    $scope.player = {};

    $scope.getTeamsByCreator = function() {
      console.log("---<>>>");
      $http({
        method: 'GET',
        url:'api/team/getteam/' + $scope.loggedUser,
        headers: {
          'token': $cookies.get('token')
        },
      }).then(function(res) {
        if (res.data.length > 0) {
          console.log(res.data);
        }
      }, function(res) {
        console.log(res);
      });
    }();

    $scope.createTeam = function() {
      $http({
        method: 'POST',
        url:'api/team/registerteam',
        headers: {
          'token': $cookies.get('token')
        },
        data: $scope.team
      }).then(function(res) {
        $scope.teams.push(res.data);
      }, function(res) {
        console.log(res);
      });
    };

    $scope.delete = function(team) {
      $http({
        method: 'DELETE',
        url:'api/team/deleteteam/' + team.name,
        headers: {
          'token': $cookies.get('token')
        }
      }).then(function(res) {
        $scope.teams.splice($scope.teams.indexOf(team), 1);
      }, function(res) {
        console.log(res);
      });
    };


  }]);
};
