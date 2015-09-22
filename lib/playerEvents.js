var EventEmitter = require('events').EventEmitter;
var ee = new EventEmitter();
var handleError = require(__dirname + '/handleError');

ee.on('savePlayer', function(newPlayer, req, res){
  console.log(newPlayer);
  newPlayer.save(function(err){
    if(err) console.log(err);
    res.json(newPlayer);
});


module.exports = exports = ee;