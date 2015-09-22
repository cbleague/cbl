var express = require('express');
var Player = require(__dirname + '/../models/player');
var handleError = require(__dirname + '/../lib/handleError');

var playerRouter = module.exports = exports = express.Router();

playerRouter.post('/registerPlayer', function(req, res) {
  var newPlayer = new Players();
  newPlayer.name.first = req.body.name.first;
  newPlayer.name.middle = req.body.name.middle;
  newPlayer.name.second = req.body.name.second;
  newPlayer.email = req.body.email;
  newPlayer.phone = req.body.phone;
  newPlayer.dateOfBirth = req.body.dateOfBirth;
  newPlayer.age = req.body.age;
  newPlayer.height = req.body.height;
  newPlayer.weight = req.body.weight;
  newPlayer.number = req.body.number;
  newPlayer.position = req.body.position;
  newPlayer.photo = req.body.photo;
  newPlayer.save(function(err, data) {
    if(err) handleError(err,res);
    res.json(data);
  });
});

playerRouter.get('/api/player/:email', function(req, res) {
  Player.findOne({'email': req.params.email}, function(err, player) {
    if (err) handleError(err, res);
    console.log(player);
  });
});