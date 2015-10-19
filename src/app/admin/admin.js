module.exports = function(app){
   require('./controllers/admin_controller')(app);
   require('./controllers/addSeason_controller')(app);
};
