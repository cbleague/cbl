require('angular/angular');
require('angular-cookies');
require('angular-base64');
require('angular-route');

var cblApp = angular.module('cblApp', ['ngCookies', 'base64', 'ngRoute']);

require('./users/users')(cblApp);
require('./auth')(cblApp);
require('./router')(cblApp);