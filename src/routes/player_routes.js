var express = require('express');
var Player = require(__dirname + '/../models/player');
var jsonParser = require('body-parser').json();
var handleError = require(__dirname + '/../lib/handleError');
var isUser = require(__dirname + '/../lib/eat_authenticate');

var playerRouter = module.exports = exports = express.Router();

playerRouter.post('/register', jsonParser, isUser, function(req, res) {
  var newPlayer = new Player();
  newPlayer.firstname = req.body.firstname;
  newPlayer.middlename = req.body.middlename;
  newPlayer.secondname = req.body.secondname;
  newPlayer.email = req.body.email;
  newPlayer.phone = req.body.phone;
  newPlayer.dateOfBirth = req.body.dob;
  newPlayer.age = req.body.age;
  newPlayer.height = req.body.height;
  newPlayer.weight = req.body.weight;
  newPlayer.number = req.body.number;
  newPlayer.position = req.body.position;
  newPlayer.photo = req.body.photo;

  newPlayer.save(function(err, data) {
    if(err) return handleError.standard(err, res);
    res.json(data);
  });
});

playerRouter.get('/find/:email', isUser, function(req, res) {
  Player.findOne({'email': req.params.email}, function(err, player) {
    if (err) return handleError.standard(err, res);
    console.log(player);
  });
});

playerRouter.post('/findbyid', jsonParser, isUser, function(req, res) {
  Player.find({'_id': { $in: req.body.array}}, function(err, players) {
    if (err) return handleError.standard(err, res);
    res.json(players);
  });
});


playerRouter.delete('/delete/:email', isUser, function(req,res) {
  Player.remove({email: req.params.email}, function(err){
    if(err) handleError(err,res);
    console.log('removed' + req.params.email + 'player');
  });
});

playerRouter.put('/updateplayer/:id', jsonParser, isUser, function(req,res) {
  Player.findOne({'_id': req.params.id}, function(err, player) {
    if (err) return handleError.standard(err, res);
    player.firstname = req.body.firstname;
    player.middlename = req.body.middlename;
    player.secondname = req.body.secondname;
    player.email = req.body.email;
    player.phone = req.body.phone;
    player.dateOfBirth = req.body.dob;
    player.age = req.body.age;
    player.height = req.body.height;
    player.weight = req.body.weight;
    player.number = req.body.number;
    player.position = req.body.position;
    player.photo = req.body.photo;
    player.save(function(err, data) {
      if(err) return handleError.standard(err,res);
      res.json(data);
    });
  });
});

