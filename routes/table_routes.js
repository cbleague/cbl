var express = require('express');
var Season = require(__dirname + '/../models/season');
var jsoonParser = require('body-parser').json();
var handleError = require(__dirname + '/../lib/handleError');

var tableRouter = module.exports = exports = express.Router();

tableRouter.get('/stats', function(req, res){
  Season.find({}, function(err, season){
    res.json(season);
  });
});


//route for getting all teams and stats

//route for getting scores and dates

//route for getting all scores and dates