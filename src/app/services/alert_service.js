module.exports = function(app) {
  app.factory('alertService', ['$rootScope', function($rootScope) {
    
    var alertService = {};

    $rootScope.alerts = [];

    alertService.add = function(type, msg) {
      $rootScope.alerts.push({'type': type, 'msg': msg});
    };

    alertService.closeAlert = function(index) {
      $rootScope.alerts.splice(index, 1);
    };

    return alertService;
  }]);
};