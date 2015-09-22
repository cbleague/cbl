var express = require('express');
var Player = require(__dirname + '/../models/player');
var jsonParser = require('body-parser').json();
var handleError = require(__dirname + '/../lib/handleError');

var playerRouter = module.exports = exports = express.Router();

playerRouter.post('/registerplayer', jsonParser, function(req, res) {
  var newPlayer = new Player();
  newPlayer.firstname = req.body.firstname;
  newPlayer.middlename = req.body.middlename;
  newPlayer.secondname = req.body.secondname;
  newPlayer.email = req.body.email;
  newPlayer.phone = req.body.phone;
  newPlayer.dateOfBirth = req.body.dateOfBirth;
  newPlayer.age = req.body.age;
  newPlayer.height = req.body.height;
  newPlayer.weight = req.body.weight;
  newPlayer.number = req.body.number;
  newPlayer.position = req.body.position;
  newPlayer.photo = req.body.photo;
  console.log(req.body);
  newPlayer.save(function(err, data) {
    if(err) return handleError.standard(err,res);
    res.json(data);
  });
});

playerRouter.get('/registerplayer/:email', function(req, res) {
  Player.findOne({'email': req.params.email}, function(err, player) {
    if (err) return handleError.standard(err, res);
    console.log(player);
  });
});