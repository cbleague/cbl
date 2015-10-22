module.exports = function(app){
  app.controller('AddScoreController', ['$scope', '$http', '$cookies', function($scope, $http, $cookies){

    $scope.scoreArray = [];
    var season = {};
    $http.defaults.headers.common.token = $cookies.get('token');

    // filter list of games in current season with no scores
    $scope.filterScoreArray = function(){
      // grab current season object
      $http({
        method: 'GET',
        url: 'api/season/getwholeseason'
      }).then(function(res){
        season = res.data;
        console.log(season);

        // create newGameNoScoreArray
        for (i = 0; i < season.games.length; i++){
          if (season.games[i].teams[0].score === 0 && season.games[i].teams[1].score === 0){
            $scope.scoreArray.push(season.games[i]);
          }
        }
      }, function(res){
        console.log('AddScoreController filter error ' + res);
      });
    };

    $scope.addScore = function(game){
      $http({
          method: 'POST',
          url: 'api/score/addscore',
          data: {
            id1: game.teams[0].id,
            id1Score: game.teams[0].score,
            id2: game.teams[1].id,
            id2Score: game.teams[1].score,
            seasonNumber: $scope.currentSeason.seasonNumber
          }
        }).then(function(res){
           console.log(res);
           $scope.data = {};
        }, function(res){
          console.log('AddScoreController addScore error ' + res);
      });
    };

    $scope.updateScore = function(){
      $http({
        method: 'PUT',
        url: 'api/score/updatescore', // need to add this route
        data: {
        // grab by game and/or teams and date
        }
      });
    };

  }]);
};
