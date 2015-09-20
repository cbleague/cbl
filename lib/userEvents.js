var EventEmitter = require('events').EventEmitter;
var ee = new EventEmitter();
var User = require(__dirname + '/../models/user');
var handleError = require(__dirname + '/../lib/handleError');

ee.on('saveUser', function(newUser, req, res) {
  ee.emit('generateHash', newUser, req, res);
});

ee.on('generateHash', function(newUser, req, res) {
  newUser.generateHash(req.body.password, function(err, hash) {
    if (err) return handleError.standartError(err, res);
    ee.emit('saveUserToDb', newUser, req, res);
  });
});

ee.on('saveUserToDb', function(newUser, req, res) {
  //Check if email already in db
  User.findOne({email: req.body.email}, function(err, user) {
    if (err) return handleError.standartError(err, res);
    if (user) return handleError.userExistsError('User Already Exists in db', res);
    //save new User
    newUser.save(function(err, data) {
      if (err) return handleError.standartError(err, res);
      ee.emit('generateToken', newUser, req, res);
    });
  });
});

ee.on('generateToken', function(user, req, res) {
  user.generateToken(function(err, token) {
    if (err) return handleError.standartError(err, res);
    res.json({token: token});
  });
});

module.exports = exports = ee;

