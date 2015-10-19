module.exports = function(app) {
  require('./alert_service')(app);
  require('./rest_services')(app);
};
