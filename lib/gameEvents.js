var EventEmitter = require('events').EventEmitter;
var ee = new EventEmitter();
var Team = require(__dirname + '/../models/team');
var Season = require(__dirname + '/../models/season');
var handleError = require(__dirname + '/handleError');

ee.on('verifyTeam', function(req, res, err){
  Team.findOne({name:req.body.team1_name, division:req.body.team1_division}, function(err, team1){
    Team.findOne({name:req.body.team2_name, division:req.body.team2_division}, function(err, team2){
      if(team1 && team2){
        console.log('two teams exist'); 
        console.log(team1);
        console.log(team2)};
       ee.emit('verifyDate', team1, team2, req, err); 
    });
  });
});

ee.on('verifyDate', function(team1, team2, req, res, err){
  Season.findOne({seasonNumber: req.body.seasonNumber}, function(err, season){
    console.log(season);
    if(team1.division && team2.division === 'A') {
        if(season.games.date === req.body.date) {
          if(season.games.teams.id === team1._id || season.games.teams.id === team2._id){
            console.log('duplicated date');
          }
        }
        else {
          console.log('this date is available');
          ee.emit('updateSeason', team1, team2, req, err);
        }
    };
  });
});


ee.on('updateSeason', function(team1, team2, req, err){
  var t1 = {id:team1._id, score:0};
  var t2 = {id:team2._id, score:0};
  var teamArray = new Array();
  teamArray.push(t1, t2);

  var newGame = {
    date: req.body.date,
    location: req.body.location,
    teams: teamArray
  };

  console.log("newGame!!!!!!");
  console.log(newGame);

  if(team1.division && team2.division === 'A'){
    console.log("A!!!!");
    Season.update({'seasonNumber': req.body.seasonNumber},
    {$push:{'games': newGame}},{safe: true, upsert: true}  );
    Season.findOne({'seasonNumber': req.body.seasonNumber}, function(err, season){
    console.log(season)});
 };

  



  // Season.update({'seasonNumber': req.body.seasonNumber},
  //    {$push: push},{safe: true, upsert: true});
  
  // Season.findOne({'seasonNumber': req.body.seasonNumber}, function(err, season){
  //   console.log(season)});

});



//   var game = new Array();
//   game.push({date: req.body.date});
//   game.push({location: req.body.location});
//   game.push({teams:teamArray});
//   console.log(typeof game);

//    if(team1.division && team2.division === 'A'){
//     Season.update({'seasonNumber': req.body.seasonNumber},
//       {$push: { gamesA: game}},
//       {safe: true, upsert: true}
//       );
//     };
//     Season.findOne({'seasonNumber': req.body.seasonNumber}, function(err, season){
//       console.log("season update!!!" + season);
//     });
// });


  // if(team1.division && team2.division === 'A'){
  //   Season.update(
  //     {'seasonNumber': req.body.seasonNumber},
  //     {$push: myObj},
  //     {safe: true, upsert: true}
  //   );
  // }
  // else if(team1.division === 'B' && team2.division === 'B'){
  //   Season.update(
  //     {'seasonNumber': req.body.seasonNumber},
  //     {$push: myObj},
  //     {safe: true, upsert: true}
  //   );
  // }
  
  // else {
  //   console.log('division should be matched each other');
  //   return handleError(err, res);
  // }

  // Season.findOne({seasonNumber:1}, function(err, season){
  //   console.log(season);
  // })


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




