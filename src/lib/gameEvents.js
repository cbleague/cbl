var EventEmitter = require('events').EventEmitter;
var ee = new EventEmitter();
var Team = require(__dirname + '/../models/team');
var Season = require(__dirname + '/../models/season');
var handleError = require(__dirname + '/handleError');

ee.on('verifyTeam', function(req, res, err){
  Team.findOne({_id:req.team1obj._id}, function(err, team1){
    Team.findOne({_id:req.team2obj._id}, function(err, team2){
      if(team1 && team2) ee.emit('updateSeason', team1, team2, req, res, err); 
    });
  });
});

ee.on('updateSeason', function(team1, team2, req, res, err){
  var t1 = {id:team1._id, score:0, name: req.team1obj.name};
  var t2 = {id:team2._id, score:0, name: req.team2obj.name};
  var teamArray = new Array();
  teamArray.push(t1, t2);
  var newGame = {
    date: req.body.date,
    location: req.body.location,
    division: team1.division,
    teams: teamArray
  };
  Season.update({_id: req.body.seasonId},
  {$push:{games: newGame}},{upsert: true}, function(err){
    if(err) return handleError.standard(err, res);
    res.json({msg: 'yo it works'});
  });
});

ee.on('findGame', function(req,res,err){
  var game = [];
  if(req.body.division === 'A'){
    Season.find({seasonNumber: req.body.seasonNumber}, function(err, season){
      for(var i = 0; i < gamesA.length; i++){
        if(gamesA.date === req.body.date)
          game.push(gamesA[i]);
      };
    });
    return game;
  }
  else if(req.body.division === 'B'){
    Season.find({seasonNumber: req.body.seasonNumber}, function(err, season){
      for(var i = 0; i < gamesB.length; i++){
        if(gamesB.date === req.body.date)
          game.push(gamesA[i]);
      };
    });
    return game;    
  }
})

module.exports = exports = ee;
