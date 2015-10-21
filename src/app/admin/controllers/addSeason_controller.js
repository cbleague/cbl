module.exports = function(app){
  app.controller('AddSeasonController', ['$scope', '$http', '$cookies', function($scope, $http, $cookies){

    $scope.createSeasonForm = {
      'seasonNumber': '',
      'seasonName': ''
    };
    $scope.season = {};
    $scope.season.admin = {};
    $scope.season.creator = $scope.loggedUser;
    $scope.seasons = [];

    $scope.createSeason = function(){
      $http({
        method: 'POST',
        url: 'api/season/createseason',
        headers: {
          'token': $cookies.get('token')
        },
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
        headers: {
          'token': $cookies.get('token')
        },
        data: $scope.season
      }).then(function(res){
        // overwrite what is already in MongoDB
      }, function(res){
        console.log('AddSeasonController update error ' + res);
      });
    };

    // need to add server routes for future functionality
    $scope.removeSeason = function(){
      $http({
        method: 'DELETE',
        url: 'api/season/deleteseason',
        headers: {
          'token': $cookies.get('token')
        }
      }).then(function(res){
        // remove what is already in MongoDB
      }, function(res){
        console.log('AddSeasonController remove error ' + res);
      });
    };
  }]);
};
