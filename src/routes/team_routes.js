var express = require('express');
var Team = require(__dirname + '/../models/team');
var jsonParser = require('body-parser').json();
var httpBasic = require(__dirname + '/../lib/http_basic');
var handleError = require(__dirname + '/../lib/handleError');
var teamEvents = require(__dirname + '/../lib/teamEvents');
//teamEvents is an instance of an event emitter that can listen to events from this router
var isUser = require(__dirname + '/../lib/eat_authenticate');
var isAdmin = require(__dirname + '/../lib/eat_authorize');

var teamRouter = module.exports = exports = express.Router();

teamRouter.post('/registerteam', jsonParser, isUser, function(req, res){
  var newTeam = new Team();
  newTeam.name = req.body.name;
  newTeam.division = req.body.division;
  newTeam.season = req.body.season;
  newTeam.logo = req.body.logo;
  newTeam.administrator = req.body.admin;
  newTeam.captain = req.body.cap;
  newTeam.coach = req.body.coach;
  newTeam.photo = req.body.photo;
  newTeam.creator = req.body.creator;
  teamEvents.emit('saveTeam', newTeam, req, res);
});

teamRouter.delete('/deleteteam/:name', isUser, function(req, res){
  Team.remove({name: req.params.name}, function(err){
    if(err) handleError(err,res);
    res.json({msg: 'removed'});
  });
});

teamRouter.put('/updateteam/:id', jsonParser, isUser, function(req, res){
  Team.findOne({_id: req.params.id}, function(err, team){
    team.name = req.body.name;
    team.division = req.body.division;
    team.season = req.body.season;
    team.logo = req.body.logo;
    team.administrator = req.body.admin;
    team.captain = req.body.cap;
    team.coach = req.body.coach;
    team.photo = req.body.photo;
    team.creator = req.body.creator;
    team.save(function(err){
      if(err) return handleError.standard(err, res);
      res.json({"msg": "success"});
    });
  });
});

teamRouter.get('/getteam/:name', function(req,res){
  Team.find({creator: req.params.name}, function(err, team){
    if(err) return handleError.standard(err, res);
    res.json(team);
  });
});

teamRouter.post('/getteamsnotinseason/:season', jsonParser, function(req,res){
  Team.find({season: req.body.seasonNumber, inSeason: false}, function(err, teams){
    if(err) return handleError(err, res);
    res.json(teams);
  });
});

teamRouter.put('/addplayer', jsonParser, isUser, function(req, res){
  Team.update({_id: req.body.teamId}, {$push: {players: req.body.playerId}}, {upsert: true}, function(err){
    if(err) return handleError.standard(err, res);
    res.end();
  });
});

teamRouter.put('/removeplayer', jsonParser, isUser, function(req, res){
  Team.update({name: req.body.name}, {$pull: {players: req.body.playerId}}, function(err, data){
    if(err){
      return res.status(500).json({'error' : 'error in deleting player'});
    }
    res.end();
  });
});
