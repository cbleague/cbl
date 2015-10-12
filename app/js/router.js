module.exports = function(app) {
  app.config(['$routeProvider', function($route) {
    $route
      .when('/', {
        templateUrl: '/templates/home/views/home_view.html'
      })
      .when('/registerTeam', {
        templateUrl: '/templates/register_team/views/register_team_view.html',
      })
      .when('/admin', {
        templateUrl: '/templates/admin/views/admin_view.html',
      })
      .otherwise({
        redirectTo: '/'
      });
  }]);
};