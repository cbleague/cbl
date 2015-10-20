module.exports = function(app){
   require('./controllers/admin_controller')(app);
   require('./controllers/addSeason_controller')(app);
   require('./controllers/addTeam_controller')(app);
   require('./controllers/addGame_controller')(app);
   require('./controllers/addScore_controller')(app);
};
