var express = require('express');
var User = require(__dirname + '/../models/user');
var jsonParser = require('body-parser').json();
// var handleError = require(__dirname + '/../lib/handleError');
var ee = require(__dirname + '/../lib/userEvents');

var userRouter = module.exports = exports = express.Router();

userRouter.post('/signup', jsonParser, function(req, res) {
  var newUser = new User();
  newUser.email = req.body.email;
  if (req.body.id) newUser.playerId = req.body.id;
  //saveUser event starts chain of events, generate password hash, save new user, return token.
  ee.emit('saveUser', newUser, req, res);
});

