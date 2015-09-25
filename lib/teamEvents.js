var EventEmitter = require('events').EventEmitter;
var ee = new EventEmitter();
var handleError = require(__dirname + '/handleError'); //same directory

ee.on('saveTeam', function(newTeam, req, res){
  newTeam.save(function(err){
    if(err) console.log(err);
  });
  res.json(newTeam);
});


module.exports = exports = ee;
