module.exports = function(app) {
  app.config(['$routeProvider', function($route) {
    $route
      .when('/', {
        templateUrl: '/views/home/home_view.html',
        controller: 'HomeController'
      })
      .when('/team', {
        templateUrl: '/views/team/register_team_view.html',
        controller: 'RegisterTeamController'
      })
      .when('/admin', {
        templateUrl: '/views/admin/admin_view.html',
        controller: 'AdminController'
      })
      .when('/signin', {
        templateUrl: '/views/auth/signin_view.html',
        controller: 'AuthController'
      })
      .when('/signup', {
        templateUrl: '/views/auth/signup_view.html',
        controller: 'AuthController'
      })
      .otherwise({
        redirectTo: '/'
      });
  }]);
};