module.exports = function(app) {
  app.controller('AuthController', ['$scope', '$http', '$location', '$cookies', '$base64', 'alertService', function($scope, $http, $location, $cookies, $base64, alertService) {
    $scope.user = {};
    $scope.registerView = false;
    $scope.forms = {};
    $scope.error = '';

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
        $cookies.put('role', res.data.role);
        $cookies.put('email', $scope.user.email);
        $scope.loggedUser = $scope.user.email;
        $scope.loggedIn();
      }, function(res) {
        $scope.error = res.data.msg;
        
        setTimeout(function() {
          console.log(res);
          $scope.error = '';
        }, 2000);

        

        // setTimeout(function() {
        //   $scope.error = '';
        // }, 1000);
      });
    };

    $scope.logOut = function() {
      $cookies.remove('token');
      $cookies.remove('email');
      $cookies.remove('role');
      $scope.user = {};
      $scope.loggedIn();
    };

    $scope.passwordMatch = function() {
      return $scope.user.password === $scope.user.confirmPassword;
    };
    
    $scope.disableRegisterButton = function() {
      return ($scope.forms.loginForm.email.$invalid || !$scope.passwordMatch() || $scope.forms.loginForm.password.$pristine);
    };

    alertService.add("error", "This is an error!"); 


  }]);
};
