var EventEmitter = require('events').EventEmitter;
var ee = new EventEmitter();
var handleError = require(__dirname + '/handleError');

ee.on('saveTeam', function(newTeam, req, res){
  newTeam.save(function(err){
    if(err) return handleError.standard(err, res);
    res.json(newTeam);
  });

});


module.exports = exports = ee;
