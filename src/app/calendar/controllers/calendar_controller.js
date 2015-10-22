module.exports = function(app) {
  app.controller('calendarController', ['$scope', '$http', 'alertService', 'busy', function($scope, $http, alertService, busy) {
    $scope.games = {};

    $scope.getWholeSeason = function() {
      $http({
          method: 'GET',
          url: 'api/season/getwholeseason'
        }).then(function(res){
           $scope.games = res.data.games;
        }, function(res){
          console.log('AddGameController getSeason error ' + res);
      });
    }();

  }]);
};
