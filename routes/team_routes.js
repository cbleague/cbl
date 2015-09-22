var express = require('express');
var Team = require(__dirname + '/../models/team');
var jsonParser = require('body-parser').json();
var httpBasic = require(__dirname + '/../lib/http_basic');
var handleError = require(__dirname + '/../lib/handleError');
var teamEvents = require(__dirname + '/../lib/teamEvents');
//events is an instance of an event emitter that can listen to events from this router

require(__dirname + '/../lib/teamEvents');

var teamRouter = module.exports = exports = express.Router();

teamRouter.post('/registerteam', jsonParser, function(req, res){
  var newTeam = new Team();
  newTeam.name = req.body.name; 
  newTeam.division = req.body.division;
  newTeam.season = req.body.season;
  newTeam.players = req.body.players;
  newTeam.logo = req.body.logo;
  newTeam.administrator = req.body.administrator;
  newTeam.captain = req.body.captain;
  newTeam.coach = req.body.coach;
  newTeam.photo = req.body.photo;
  console.log(newTeam);
  teamEvents.emit('saveTeam', newTeam, req, res);
});


