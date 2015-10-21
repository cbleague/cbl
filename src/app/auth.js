module.exports = function(app) {
  app.run(['$rootScope', '$cookies', '$state', '$http', function($scope, $cookies, $state, $http) {

    $scope.isLoggedIn = false;
    $scope.isAdmin = false;
    $scope.loggedUser = '';
    $scope.currentSeason = {};

    $scope.loggedIn = function() {
      var token = $cookies.get('token');
      var role = $cookies.get('role');
      $scope.loggedUser = $cookies.get('email');
      $scope.isLoggedIn = (!!token && !!token.length)? true: false;
      $scope.isAdmin = (role === 'admin')? true: false;
    };

    $scope.logOut = function() {
      $cookies.remove('token');
      $cookies.remove('email');
      $cookies.remove('role');
      $scope.loggedIn();
      $state.go('home');
    };

    $scope.getCurrenSeason = function() {
      $http({
          method: 'GET',
          url:'api/season/getcurrentseason/',
        }).then(function(res) {
          $scope.currentSeason._id = res.data.seasonId;
          $scope.currentSeason.seasonNumber = res.data.seasonNumber;
        }, function(res) {
          console.log(res);
        });
    };

    $scope.loggedIn();
    $scope.getCurrenSeason();

  }]);
};