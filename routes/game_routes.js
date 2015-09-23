'use strict';
var express = require('express');
var gameEvents = require(__dirname+'/../lib/gameEvents');
var jsonParser = require('body-parser').json();
var handleError = require(__dirname + '/../lib/handleError');
var isAdmin = require(__dirname + '/../lib/eat_authorize');

var gameRouter = module.exports = exports = express.Router();


//create Game with req.seasonNumber, req.team1.name, req.team1.division, 
//req.team2.division, req.team2.name, req.date, req.location
gameRouter.post('/create', jsonParser, isAdmin, function(req, res){
  gameEvents.emit('verifyTeam', req,res,err);
});


//It will be an array of game in the day.
//get Game with req.seasonNumber, req.division, req.date
gameRouter.get('/find', jsonParser, isAdmin, function(req, res){
  gameEvents.emit('findGame', req, res, err);
});

// gameRoute.remove('/delete', jsonParser, isAdmin, function(req, res){

// })