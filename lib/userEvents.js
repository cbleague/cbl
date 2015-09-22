var EventEmitter = require('events').EventEmitter;
var ee = new EventEmitter();
var User = require(__dirname + '/../models/user');
var handleError = require(__dirname + '/../lib/handleError');

ee.on('saveUser', function(newUser, req, res) {
  ee.emit('generateHash', newUser, req, res);
});

ee.on('generateHash', function(newUser, req, res) {
  newUser.generateHash(req.body.password, function(err, hash) {
    if (err) return handleError.standard(err, res);
    ee.emit('saveUserToDb', newUser, req, res);
  });
});

ee.on('saveUserToDb', function(newUser, req, res) {
  //Check if email already in db
  User.findOne({email: req.body.email}, function(err, user) {
    if (err) return handleError.standard(err, res);
    if (user) return handleError.userExists('User Already Exists in db', res);
    //save new User
    newUser.save(function(err, data) {
      if (err) return handleError.standard(err, res);
      ee.emit('generateToken', newUser, req, res);
    });
  });
});

ee.on('generateToken', function(user, req, res) {
  user.generateToken(function(err, token) {
    if (err) return handleError.standard(err, res);
    res.json({token: token});
  });
});

ee.on('authenticate', function(user, password, req, res) {
  user.compareHash(password, function(err, hashRes) {
    if (err) return handleError.standard(err, res);
    if (!hashRes) return handleError.userPassMatchError('password does not match', res);
    ee.emit('generateToken', user, req, res);
  });
});

module.exports = exports = ee;
