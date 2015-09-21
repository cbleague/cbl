module.exports.standartError = function(err, res) {
  console.log(err);
  res.status(500).json({msg: 'server error'});
};

module.exports.userExistsError = function(err, res) {
  console.log(err);
  res.status(401).json({msg: 'user exists'});
};

module.exports.userDoesNotExistsError = function(err, res) {
  console.log(err);
  res.status(401).json({msg: 'user does not exists'});
};

module.exports.userPassMatchError = function(err, res) {
  console.log(err);
  res.status(401).json({msg: 'password does not matchs'});
};

module.exports.noAuthenticate = function(err, res) {
  console.log(err);
  res.status(401).json({msg: 'Could not authenticate'});
};

