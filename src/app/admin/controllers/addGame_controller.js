module.exports = function(app){
  app.controller('AddGameController', ['$scope', '$http', '$cookies', function($scope, $http, $cookies){

  $scope.game = {};

  $scope.addGame = function(){
    $http({
        method: 'POST',
        url: 'api/game/addgame',
        headers: {
          'token': $cookies.get('token')
        },
        data: $scope.season
      }).then(function(res){
         console.log(res);
         $scope.season = {};
      }, function(res){
        console.log('AddGameController create error ' + res);
    });
  };

  $scope.findGame = function(){
    $http({
        method: 'POST',
        url: 'api/game/findgame',
        headers: {
          'token': $cookies.get('token')
        },
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
      headers: {
        'token': $cookies.get('token')
      },
      data: {
        // grab by teams and date
      }
    });
  };

  $scope.removeGame = function(){
    $http({
      method: 'DELETE',
      url: 'api/game/removegame', // add js logic to this route
      headers: {
        'token': $cookies.get('token')
      },
      data: {
        // delete game by teams and date
      }
    });
  };

  }]);
};
