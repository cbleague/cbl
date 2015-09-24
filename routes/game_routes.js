'use strict';
var express = require('express');
var gameEvents = require(__dirname+'/../lib/gameEvents');
var jsonParser = require('body-parser').json();
var handleError = require(__dirname + '/../lib/handleError');
var isAdmin = require(__dirname + '/../lib/eat_authorize');
var Team = require(__dirname + '/../models/team');

var gameRouter = module.exports = exports = express.Router();


//create Game with req.seasonNumber, req.team1.name, req.team1.division, 
//req.team2.division, req.team2.name, req.date, req.location
gameRouter.post('/create', jsonParser, /*isAdmin,*/ function(req, res, err){
  // Team.findOne({name:req.body.team1_name, division:req.body.team1_division}, function(err, team1){
  //   Team.findOne({name:req.body.team2_name, division:req.body.team2_division}, function(err, team2){
  //     if(team1 && team2) console.log('two teams exist');  
  //   });
  // });

  gameEvents.emit('verifyTeam', req,res,err);
});


//It will be an array of game in the day.
//get Game with req.seasonNumber, req.division, req.date
gameRouter.get('/find', jsonParser, /*isAdmin,*/ function(req, res){
  gameEvents.emit('findGame', req, res, err);
});

// gameRoute.remove('/delete', jsonParser, isAdmin, function(req, res){

// })