require('angular/angular');
require('angular-cookies');
require('angular-base64');

var cblApp = angular.module('cblApp', ['ngCookies', 'base64']);

require('./users/users')(cblApp);
require('./auth')(cblApp);