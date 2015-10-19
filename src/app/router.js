module.exports = function(app) {
  app.config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('home');

    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: '/html/views/home/home_view.html'
      })
      .state('admin', {
        url: '/admin',
        templateUrl: '/html/views/admin/admin_view.html'
      })
      .state('signin', {
        url: '/signin',
        templateUrl: '/html/views/auth/signin_view.html',
        controller: 'SignInController'
      })
      .state('signup', {
        url: '/signup',
        templateUrl: '/html/views/auth/signup_view.html',
        controller: 'SignUpController'
      });
  });
};