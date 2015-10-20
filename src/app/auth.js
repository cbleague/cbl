module.exports = function(app) {
  app.run(['$rootScope', '$cookies', '$state', function($scope, $cookies, $state) {

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
      $state.go('home');
    };

    $scope.loggedIn();
  }]);
};