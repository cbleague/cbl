var express = require('express');
var Season = require(__dirname + '/../models/season');
var jsonParser = require('body-parser').json();
var isAdmin = require(__dirname + '/../lib/eat_authorize');
var handleError = require(__dirname + '/../lib/handleError');

var seasonRouter = module.exports = exports = express.Router();

//should receive only season name
seasonRouter.post('/', jsonParser, isAdmin, function(req, res) {
  var season = new Season();
  season.name = req.body.name;
  season.seasonNumber = req.body.seasonNumber;
  season.save(function(err, data) {
    if (err) return handleError.standard(err, res);
    res.json({msg: 'New Season Created'});
  });
});