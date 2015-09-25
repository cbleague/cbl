var express = require('express');
var Season = require(__dirname + '/../models/season');
var jsonParser = require('body-parser').json();
var handleError = require(__dirname + '/../lib/handleError');

var tableRouter = module.exports = exports = express.Router();

tableRouter.get('/teams', jsonParser, function(req, res){
  Season.findOne({seasonNumber: req.body.number}, function(err, season){
    if(err) handleError(err);
    var tableData = season.teams;
    res.json(tableData);
  });
});

tableRouter.get('/scores', jsonParser, function(req,res){
  Season.findOne({seasonNumber: req.body.number}, function(err, season){
    var gameData = season.games;
    res.json(gameData);
  });
});

tableRouter.get('/allstats', jsonParser, function(req,res){
  Season.findOne({seasonNumber: req.body.number}, function(err, season){
    res.json(season);
  });
});

//requests are based on season number

