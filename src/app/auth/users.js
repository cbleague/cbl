module.exports = function(app) {
  require('./controllers/sign_in_controller')(app);
  require('./controllers/sign_up_controller')(app);
};