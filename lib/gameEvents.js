var EventEmitter = require('events').EventEmitter;
var ee = new EventEmitter();
var Team = require(__dirname + '/../models/team');
var Season = require(__dirname + '/../models/season');
var handleError = require(__dirname + '/handleError');

ee.on('verifyTeam', function(req, res, err){
  Team.findOne({name:req.team1.name, division: req.team1.division}, function(err, team1){
    Team.findOne({name:req.team2.name, division: req.team2.division}, function(err, team2){
    if(err) return handleError.standard(err, res); 
    if(team1 && team2) ee.emit('verifyDate', team1, team2, req, err);
    else return handleError(err,res); //team does not exists.  
    });
  });
});

ee.on('verifyDate', function(team1, team2, req, res, err){
  Season.findOne({seasonNumber: req.seasonNumber}, function(err, season){
    if(team1.division === 'A' && team2.division === 'A'){
      if(gamesA.date === req.date && gamesA.team1.id === team1_id) 
        return handleError(err,res); // team1 has game on the day.
      else if(gamesA.date === req.date && gamesA.team2.id === team2_id)
        return handleError(err,res); // team1 has game on the day.
      else ee.emit('updateSeason', team1, team2, req,res,err);
    }
    else if(team1.division === 'B' && team2.division === 'B'){
      if(gamesB.date === req.date && gamesB.team1.id === team1_id) 
        return handleError(err,res); // team1 has game on the day.
      else if(gamesB.date === req.date && gamesB.team2.id === team2_id)
        return handleError(err,res); // team1 has game on the day.
      else ee.emit('updateSeason', team1, team2, req, err);
    };
  });
});

ee.on('updateSeason', function(team1, team2, req, res, err){
  var team1 = {id:team1_id, score:0};
  var team2 = {id:team2_id, score:0};

  if(team1.division === 'A' && team2.division === 'A'){
    Season.update(
      {'seasonNumber': req.seasonNumber},
      {$push: {
        gamesA: [
            {date: req.date}, {location: req.location},
            {teams: [team1,team2]}]}},
      {safe: true, upsert: true}
    );
  }
  else if(team1.division === 'B' && team2.division === 'B'){
    Season.update(
      {'seasonNumber': req.seasonNumber},
      {$push: {
        gamesB: [
            {date: req.date}, {location: req.location},
            {teams: [team1,team2]}]}},
      {safe: true, upsert: true}
    );
  }
  
  else {
    console.log('division should be matched each other');
    return handleError(err, res);
  }

  console.log()
});


ee.on('findGame', function(req,res,err){
  var game = [];
  if(req.division === 'A'){
    Season.find({seasonNumber: req.seasonNumber}, function(err, season){
      for(var i = 0; i < gamesA.length; i++){
        if(gamesA.date === req.date)
          game.push(gamesA[i]);
      };
    });
    return game;
  }
  else if(req.division === 'B'){
    Season.find({seasonNumber: req.seasonNumber}, function(err, season){
      for(var i = 0; i < gamesB.length; i++){
        if(gamesB.date === req.date)
          game.push(gamesA[i]);
      };
    });
    return game;    
  }
})

module.exports = exports = ee;
// ee.on('addGameAintoSeason', function(season, team1, team2, req,res, err){
//   if(err) return handleError(err, res);
//   season.update(

//     {season.gamesA.$.date: req.date},
//     {season.gamesA.$.location: req.location},


//     )
//   season.gamesA.push[{teams.id:team1._id,teams.score:0}];
//   season.gamesA.teams.push[{teams.id:team2._id, teams.score:0}];
//   season.gamesA
// })




