module.exports = function(app){
  app.controller('AddSeasonController', ['$scope', '$http', '$cookies', function($scope, $http, $cookies){

    $scope.createSeasonForm = {
      'seasonNumber': '',
      'seasonName': ''
    };
    $scope.season = {};
    $scope.seasons = [];
    $http.defaults.headers.common.token = $cookies.get('token');

    // need to change the old seaon current to false
    $scope.createSeason = function(){
      // call another function() -> current season set to false
      $http({
        method: 'POST',
        url: 'api/season/createseason',
        data: $scope.season
      }).then(function(res){
         console.log(res);
         $scope.season = {};
      }, function(res){
        console.log('AddSeasonController create error ' + res);
      });
    };

    // need to add server routes for future functionality
    $scope.updateSeason = function(){
     $http({
        method: 'PUT',
        url: 'api/season/updateseason',
        data: $scope.season
      }).then(function(res){
        $scope.season._id = res.data;
      }, function(res){
        console.log('AddSeasonController update error ' + res);
      });
    };

    // need to add server routes for future functionality
    $scope.removeSeason = function(){
      $http({
        method: 'DELETE',
        url: 'api/season/deleteseason',
        data: $scope.season
      }).then(function(res){
        // remove what is already in MongoDB
      }, function(res){
        console.log('AddSeasonController remove error ' + res);
      });
    };
  }]);
};
