module.exports = function(app) {
  app.run(['$rootScope', '$cookies', function($scope, $cookies) {

    $scope.isLoggedIn = false;
    $scope.isAdmin = false;
    $scope.loggedUser = '';

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
    };

    $scope.loggedIn();
  }]);
};