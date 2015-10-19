module.exports = function(app){
  app.controller('AddSeasonController', ['$scope', 'Resource', '$http', '$location', '$cookies', function($scope, Resource, $http, $location, $cookies){

    var eat = $cookies.get('eat', {secure: true});
    if (!($cookies.get('eat').length))
      $location.path('/signup');

    $http.defaults.headers.common.token = eat;
    $scope.season = [];
    $scope.newSeason = {};
    var seasonResource = Resource('season'); // may need to change this

    $scope.getAll = function(){
      seasonResource.getAll(function(err, data){
        if (err) return console.log('AddSeasonController getAll err ' + err);
        $scope.season = data;
      });
    };

    $scope.createSeason = function(){
      seasonResource.create(season, function(err, data){
        if (err) return console.log('AddSeasonController create err ' + err);
        $scope.newSeason = {
          seasonNumber: Number,
          seasonName: String
        };
        $scope.season.push(data);
      });
    };

    $scope.updateSeason = function(){
      seasonResource.update(season, function(err){
        season.editing = false;
        if (err) return console.log('AddSeasonController update err ' + err);
      });
    };

    $scope.removeSeason = function(){
      seasonResource.remove(season, function(err){
        if (err) return console.log('AddSeasonController remove err ' + err);
        $scope.season.splice($scope.season.indexOf(season), 1);
      });
    };
  }]);
};
