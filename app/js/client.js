require('angular/angular');
require('angular-cookies');
require('angular-base64');
require('angular-route');
require('angular-ui-bootstrap');
require('angular-animate');

var cblApp = angular.module('cblApp', ['ngCookies', 'base64', 'ngRoute', 'ui.bootstrap', 'ngAnimate']);

require('./auth/users')(cblApp);
require('./auth')(cblApp);
require('./router')(cblApp);
require('./services/services')(cblApp);
require('./home/controllers/home_controller')(cblApp);
require('./team/controllers/register_team_controller')(cblApp);
require('./admin/controllers/admin_controller')(cblApp);