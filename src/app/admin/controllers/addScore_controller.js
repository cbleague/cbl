module.exports = function(app){
  app.controller('AddScoreController', ['$scope', '$http', '$cookies', function($scope, $http, $cookies){

  $scope.score = {};
  $http.defaults.headers.common.token = $cookies.get('token');

  $scope.addScore = function(){
    $http({
        method: 'POST',
        url: 'api/score/addscore',
        data: $scope.season
      }).then(function(res){
         console.log(res);
         $scope.season = {};
      }, function(res){
        console.log('AddScoreController create error ' + res);
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
