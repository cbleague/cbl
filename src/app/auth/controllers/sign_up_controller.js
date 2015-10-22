module.exports = function(app) {
  app.controller('SignUpController', ['$scope', '$http', '$location', '$cookies', '$base64', 'alertService', '$state', function($scope, $http, $location, $cookies, $base64, alertService, $state) {
    $scope.user = {};
    $scope.forms = {};
    $scope.error = '';

    $scope.register = function() {
      $http.post('/api/auth/signup', $scope.user)
        .then(function(res) {
          $cookies.put('token', res.data.token);
          $cookies.put('role', res.data.role);
          $cookies.put('email', $scope.user.email);
          $scope.loggedIn();
          $state.go('home');
        }, function(res) {
          console.log(res);
        });
    };

    $scope.passwordMatch = function() {
      return $scope.user.password === $scope.user.confirmPassword;
    };

  }]);
};
