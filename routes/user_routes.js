var express = require('express');
var User = require(__dirname + '/../models/user');
var jsonParser = require('body-parser').json();
var ee = require(__dirname + '/../lib/userEvents');
var httpBasic = require(__dirname + '/../lib/http_basic');
var handleError = require(__dirname + '/../lib/handleError');
var eatAuth = require(__dirname + '/../lib/eat_auth');


var userRouter = module.exports = exports = express.Router();
 
userRouter.post('/signup', jsonParser, function(req, res) {
  var newUser = new User();
  newUser.email = req.body.email;
  if (req.body.id) newUser.playerId = req.body.id;
  //saveUser event starts chain of events, generate password hash, save new user, return token.
  ee.emit('saveUser', newUser, req, res);
});

userRouter.get('/signin', httpBasic, function(req, res) {
  User.findOne({email: req.auth.email}, function(err, user) {
    if (err) return handleError.standart(err, res);
    if (!user) return handleError.userDoesNotExistsError('User Does Not Exists', res);
    //check password and return token
    ee.emit('authenticate', user, req.auth.password, req, res);
  });
});

