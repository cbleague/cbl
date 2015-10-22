require('angular/angular');
require('angular-cookies');
require('angular-base64');
require('angular-ui-router');
require('angular-animate');

var cblApp = angular.module('cblApp', ['ngCookies', 'base64', 'ui.router', 'ngAnimate']);

require('./auth/users')(cblApp);
require('./auth')(cblApp);
require('./router')(cblApp);
require('./admin/admin')(cblApp);
require('./services/services')(cblApp);
require('./home/controllers/home_controller')(cblApp);
require('./team/controllers/register_team_controller')(cblApp);
require('./contact/controllers/contact_controller')(cblApp);
require('./calendar/controllers/calendar_controller')(cblApp);
