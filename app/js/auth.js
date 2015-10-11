module.exports = function(app) {
  app.run(['$rootScope', '$cookies', function($scope, $cookies) {
    $scope.isLoggedIn = false;
    $scope.loggedUser = '';

    $scope.loggedIn = function() {
      var token = $cookies.get('token');
      $scope.loggedUser = $cookies.get('email');
      $scope.isLoggedIn = (!!token && !!token.length)? true: false;
    };

    $scope.loggedIn();
  }]);
};