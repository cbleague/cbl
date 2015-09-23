var express = require('express');
var Team = require(__dirname + '/../models/team');
var jsonParser = require('body-parser').json();
var httpBasic = require(__dirname + '/../lib/http_basic');
var handleError = require(__dirname + '/../lib/handleError');
var teamEvents = require(__dirname + '/../lib/teamEvents');
var Team = require(__dirname + '/../models/team');
//events is an instance of an event emitter that can listen to events from this router
var isUser = require(__dirname + '/../lib/eat_authenticate');
var isAdmin = require(__dirname + '/../lib/eat_authorize');

require(__dirname + '/../lib/teamEvents');

var teamRouter = module.exports = exports = express.Router();

teamRouter.post('/registerteam', jsonParser, isUser, function(req, res){
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

teamRouter.delete('/deleteteam/:name', isUser, function(req, res){
  Team.remove({name: req.params.name}, function(err){
    if(err) handleError(err,res);
    res.json({msg: 'removed'});
  });
});

teamRouter.put('/updateteam/:name/:field/:newvalue', isUser, function(req, res){
  var field = req.params.field;
  var newVal = req.params.newvalue
  Team.findOne({name: req.params.name}, function(err, team){
    team[field] = newVal;
    team.save(function(err){
      if(err) handleError(err, res);
    });
    res.json(team);
  });
});


teamRouter.get('/seeteam/:name', function(req,res){
  Team.findOne({name: req.params.name}, function(err, team){
    if(err) handleError(err, res);
    res.json(team);
  });
});

