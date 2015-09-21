var eat = require('eat');
var User = require(__dirname + '/../models/user');
var handleError = require(__dirname + '/handleError');

module.exports = exports = function(req, res, next) {
  var encryptedToken = req.headers.token || (req.body? req.body.token : undefined);
  if (!encryptedToken) return handleError.noAuthenticate(err, res);
  eat.decode(encryptedToken, process.env.APP_SECRET, function(err, token) {
    if (err) return handleError.standartError(err, res);
    User.findOne({_id: token.id}, function(err, user) {
      if (err) return handleError.standartError(err, res);
      if (!user) return handleError.userDoesNotExistsError(err, res);
      req.user = user;
      next();
    });
  });
};