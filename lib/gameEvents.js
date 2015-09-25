var EventEmitter = require('events').EventEmitter;
var ee = new EventEmitter();
var Team = require(__dirname + '/../models/team');
var Season = require(__dirname + '/../models/season');
var handleError = require(__dirname + '/handleError');

ee.on('verifyTeam', function(req, res, err){
  Team.findOne({name:req.body.team1_name, division:req.body.team1_division}, function(err, team1){
    Team.findOne({name:req.body.team2_name, division:req.body.team2_division}, function(err, team2){
      if(team1 && team2) ee.emit('verifyDate', team1, team2, req, res, err); 
    });
  });
});

ee.on('verifyDate', function(team1, team2, req, res, err){
  var duplicate = false;
  var reqDate = new Date(req.body.date);
  Season.findOne({seasonNumber: req.body.seasonNumber}, function(err, season){
    for(var i = 0; i < season.games.length; i++){
      if(season.games[i].date.valueOf() === req.body.date.valueOf()) {
        for(var j = 0; j < season.games[i].teams.length; j++){
          if(season.games[i].teams[j].id.equals(team1._id) || season.games[i].teams[j].id.equals(team2._id))
            duplicate = true;
        }
      }
    }
    if(!duplicate) {
      console.log('this date is available');
      ee.emit('updateSeason', team1, team2, req, res, err); 
    }
    else console.log("choose another date.");
  });
});


ee.on('updateSeason', function(team1, team2, req, res, err){
  var t1 = {id:team1._id, score:0};
  var t2 = {id:team2._id, score:0};
  var teamArray = new Array();
  teamArray.push(t1, t2);
  console.log('GOT TO UPDATE SEASON LINE 43');
  console.log('teamArray: ' + teamArray);
  var newGame = {
    date: req.body.date,
    location: req.body.location,
    teams: teamArray
  };
  console.log('newGame:' + newGame);
  if(team1.division && team2.division === 'A'){
    Season.update({'seasonNumber': req.body.seasonNumber},
    {$push:{games: newGame}},{upsert: true}, function(err){
      if(err) handleError(err, res);
      res.json({msg: 'yo it works'});
    });
 };
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
