var express = require('express');
var jsonParser = require('body-parser').json();
var handleError = require(__dirname + '/../lib/handleError');
var isAdmin = require(__dirname + '/../lib/eat_authorize');
var Season = require(__dirname + '/../models/season');
var scoreEventEmitter = require(__dirname + '/../lib/scoreEvents');

var scoreRouter = module.exports = exports = express.Router();

//should receive {id1: _id, id2: _id, id1Score: score, id2Score:score, seasonNumber: number}
scoreRouter.post('/', jsonParser, function(req, res) {
  scoreEventEmitter.emit('addScoreToGames', req, res);
});