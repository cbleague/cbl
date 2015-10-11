module.exports = function(app) {
  app.controller('AuthController', ['$scope', '$http', '$location', '$cookies', '$base64', function($scope, $http, $location, $cookies, $base64) {
    $scope.user = {};
    $scope.registerView = false;
    $scope.forms = {};

    $scope.changeRegisterView = function() {
      $scope.user.email = '';
      $scope.user.password = '';
      $scope.user.confirmPassword = '';
      $scope.forms.loginForm.$setPristine();
      $scope.registerView = ($scope.registerView) ? false : true;
    };

    $scope.register = function() {
      $http.post('/api/auth/signup', $scope.user)
        .then(function(res) {
          $cookies.put('token', res.data.token);
          $scope.loggedIn();
        }, function(res) {
          console.log(res);
        });
    };

    $scope.login = function() {
       $http({
        method: 'GET',
        url: '/api/auth/signin',
        headers: {
          'Authorization': 'Basic ' + $base64.encode($scope.user.email + ':' + $scope.user.password)
        }
      })
      .then(function(res) {
        $cookies.put('token', res.data.token);
        $cookies.put('email', $scope.user.email);
        $scope.loggedUser = $scope.user.email;
        $scope.loggedIn();
      }, function(res) {
        console.log(res);
      });
    };

    $scope.logOut = function() {
      $cookies.remove('token');
      $cookies.remove('email');
      $scope.user = {};
      $scope.loggedIn();
    };

    $scope.passwordMatch = function() {
      return $scope.user.password === $scope.user.confirmPassword;
    };
    
    $scope.disableRegisterButton = function() {
      return ($scope.forms.loginForm.email.$invalid || !$scope.passwordMatch() || $scope.forms.loginForm.password.$pristine);
    };

  }]);
};
