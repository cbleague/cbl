module.exports = function(app) {
  app.factory('busy', ['$rootScope', function($rootScope) {
    
    var busy = {};
    $rootScope.busy = false;

    busy.start = function() {
      $rootScope.busy = true;
    };

    busy.stop = function() {
      $rootScope.busy = false;
    };

    return busy;
  }]);
};