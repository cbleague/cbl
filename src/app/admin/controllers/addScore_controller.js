module.exports = function(app){
  app.controller('AddScoreController', ['$scope', '$http', '$cookies', function($scope, $http, $cookies){

  $scope.score = {};

  $scope.createScore = function(){
    $http({
        method: 'POST',
        url: 'api/score/create',
        headers: {
          'token': $cookies.get('token')
        },
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
      url: 'api/score/update', // need to add this route
      headers: {
        'token': $cookies.get('token')
      },
      data: {
        // grab by game and/or teams and date
      }
    });
  };

  }]);
};
