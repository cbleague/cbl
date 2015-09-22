var express = require('express');
var Player = require(__dirname + '/../models/player');
var handleError = require(__dirname + '/../lib/handleError');

var playerRouter = module.exports = exports = express.Router();

playerRouter.post('/api/registerPlayer', function(req, res) {
  var newPlayer = new Players();
  newPlayer.name.first = req.body.first;
  newPlayer.name.middle = req.body.middle;
  newPlayer.name.second = req.body.second;
  newPlayer.email = req.body.email;
  newPlayer.phone = req.body.phone;
  newPlayer.dateOfBirth = req.body.dateOfBirth;
  newPlayer.age = req.body.age;
  newPlayer.height = req.body.height;
  newPlayer.weight = req.body.weight;
  newPlayer.number = req.body.number;
  newPlayer.position = req.body.position;
  newPlayer.photo = req.body.photo;
});

playerRouter.get('/api/player/:email', function(req, res) {
  Player.findOne({'email': req.params.email}, function(err, player) {
    if (err) return handleError(err, res);
    console.log(player);
  });
});