module.exports.standartError = function(err, res) {
  console.log(err);
  res.status(500).json({msg: 'server error'});
};

module.exports.userExistsError = function(err, res) {
  console.log(err);
  res.status(500).json({msg: 'user exists'});
};