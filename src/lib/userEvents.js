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
    res.json({token: token, role: user.role});
  });
});

ee.on('authenticate', function(user, password, req, res) {
  user.compareHash(password, function(err, hashRes) {
    if (err) return handleError.standard(err, res);
    if (!hashRes) return handleError.userPassMatch('password does not match', res);
    ee.emit('generateToken', user, req, res);
  });
});

ee.on('updateUser', function(req, res) {
  if (req.body.email) req.user.email = req.body.email;
  if (req.body.password) {
    var passBuf = new Buffer(req.body.password, 'base64');
    var newPass = passBuf.toString('utf8');
    ee.emit('generateHashForUpdate', newPass, req, res);
  } else {
    ee.emit('saveUserfor', req, res);
  }
});

ee.on('generateHashForUpdate', function(password, req, res) {
  req.user.generateHash(password, function(err, hash) {
    if (err) return handleError.standard(err);
    ee.emit('saveUserfor', req, res);
  });
});

ee.on('saveUserfor', function(req, res) {
  req.user.save(function(err) {
    if (err) return handleError.standard(err);
    ee.emit('generateToken', req.user, req, res);
  });
});

ee.on('addAdminRole', function(req, res) {
  if (!req.body.email) return handleError.standard('No email in request body');
  User.findOne({email: req.body.email}, function(err, user) {
    if (err) return handleError.standard(err);
    user.role = 'admin';
    user.save(function(err) {
      if (err) return handleError.standard(err);
      res.json({msg: 'Admin rights given to ' + req.user.email});
    });
  });
});

ee.on('removeAdminRole', function(req, res) {
  if (!req.body.email) return handleError.standard('No email in request body');
  User.findOne({email: req.body.email}, function(err, user) {
    if (err) return handleError.standard(err);
    user.role = 'user';
    user.save(function(err) {
      if (err) return handleError.standard(err);
      res.json({msg: 'User rights given to ' + req.user.email});
    });
  });
});

module.exports = exports = ee;

