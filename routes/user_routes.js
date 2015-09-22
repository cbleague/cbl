var express = require('express');
var User = require(__dirname + '/../models/user');
var jsonParser = require('body-parser').json();
var eventEmitter = require(__dirname + '/../lib/userEvents');
var httpBasic = require(__dirname + '/../lib/http_basic');
var handleError = require(__dirname + '/../lib/handleError');
var isUser = require(__dirname + '/../lib/eat_authenticate');
var isAdmin = require(__dirname + '/../lib/eat_authorize');


var userRouter = module.exports = exports = express.Router();
 
userRouter.post('/signup', jsonParser, function(req, res) {
  var newUser = new User();
  newUser.email = req.body.email;
  //if (req.body.id) newUser.playerId = req.body.id;
  //saveUser event starts chain of events, generate password hash, save new user, return token.
  eventEmitter.emit('saveUser', newUser, req, res);
});

userRouter.get('/signin', httpBasic, function(req, res) {
  User.findOne({email: req.auth.email}, function(err, user) {
    if (err) return handleError.standart(err, res);
    if (!user) return handleError.userDoesNotExists('User Does Not Exists', res);
    //check password and return token
    eventEmitter.emit('authenticate', user, req.auth.password, req, res);
  });
});

userRouter.put('/update', jsonParser, isUser, function(req, res) {
  //This route receives JSON which can have email or password fields(base64 encoded), or both
  //After isAuthenticated middleware we have req.user as authenticated user object from db
  eventEmitter.emit('updateUser', req, res);
});

userRouter.post('/addadmin', jsonParser, isAdmin, function(req, res) {
  //This route receives JSON with email field of user where we want to add admin role
  eventEmitter.emit('addAdminRole', req, res);
});

userRouter.put('/addadmin', jsonParser, isAdmin, function(req, res) {
  //This route receives JSON with email field of user where we want to remove admin role
  eventEmitter.emit('removeAdminRole', req, res);
});