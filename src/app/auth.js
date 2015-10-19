module.exports = function(app) {
  app.run(['$rootScope', '$cookies', function($scope, $cookies) {
    console.log('--->>>');

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

    $scope.loggedIn();
  }]);
};