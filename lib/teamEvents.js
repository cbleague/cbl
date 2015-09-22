var EventEmitter = require('events').EventEmitter;
var ee = new EventEmitter();
//var Team = require(__dirname + '/../models/team');
var handleError = require(__dirname + '/handleError') //same directory

ee.on('saveTeam', function(newTeam, req, res){
  console.log(newTeam);
  newTeam.save(function(err){
    if(err) console.log(err);
    //console.log(data);
  });
  debugger;
  res.json(newTeam);
});


module.exports = exports = ee;
