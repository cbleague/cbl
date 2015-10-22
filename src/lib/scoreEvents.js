var EventEmitter = require('events').EventEmitter;
var scoreEventEmitter = new EventEmitter();
var handleError = require(__dirname + '/handleError');
var Season = require(__dirname + '/../models/season');

//should receive {id1: _id, id2: _id, id1Score: score, id2Score:score, seasonNumber: number}
scoreEventEmitter.on('addScoreToGames', function(req, res) {
  Season.findOne({seasonNumber: req.body.seasonNumber}, function(err, data) {
    var array = data.games;
    for (var i = 0; i < array.length; i++) {
      if( (array[i].teams[0].id == req.body.id1 || array[i].teams[0].id == req.body.id2) && (array[i].teams[1].id == req.body.id1 || array[i].teams[1].id == req.body.id2)) {
        if(array[i].teams[0].id == req.body.id1) {
          array[i].teams[0].score = req.body.id1Score;
          array[i].teams[1].score = req.body.id2Score;
        } else {
          array[i].teams[0].score = req.body.id2Score;
          array[i].teams[1].score = req.body.id1Score;
        }
      }
    }
    Season.update({seasonNumber: req.body.seasonNumber}, {$set: {games: array}}, function(err) {
      if (err) return handleError.standard(err);
      scoreEventEmitter.emit('addScoreToTeam', req, res);
    });
  });
});

scoreEventEmitter.on('addScoreToTeam', function(req, res) {
  var winner = {};
  var loser = {};
  if (req.body.id1Score > req.body.id2Score) {
    winner.id = req.body.id1;
    winner.scored = req.body.id1Score;
    winner.allowed = req.body.id2Score;
    loser.id = req.body.id2;
    loser.scored = req.body.id2Score;
    loser.allowed = req.body.id1Score;
  } else {
    winner.id = req.body.id2;
    winner.scored = req.body.id2Score;
    winner.allowed = req.body.id1Score;
    loser.id = req.body.id1;
    loser.scored = req.body.id1Score;
    loser.allowed = req.body.id2Score;
  }
  scoreEventEmitter.emit('updateWinner', winner, loser, req, res);
});

scoreEventEmitter.on('updateWinner', function(winner, loser, req, res) {
  Season.update({seasonNumber: req.body.seasonNumber, 'teams.team': winner.id}, {$inc: {'teams.$.win': 1, 'teams.$.played': 1,
  'teams.$.baskets.scored': winner.scored, 'teams.$.baskets.missed': winner.missed, 'teams.$.points': 2}}, function(err) {
    if (err) return handleError.standard(err, res);
    scoreEventEmitter.emit('updateLoser', loser, req, res);
  });
});

scoreEventEmitter.on('updateLoser', function(loser, req, res) {
  Season.update({seasonNumber: req.body.seasonNumber, 'teams.team': loser.id}, {$inc: {'teams.$.lost': 1, 'teams.$.played': 1,
  'teams.$.baskets.scored': loser.scored, 'teams.$.baskets.missed': loser.missed, 'teams.$.points': 1}}, function(err) {
    if (err) return handleError.standard(err, res);
    scoreEventEmitter.emit('magicPositionAlgorithm', req, res);
  });
});

scoreEventEmitter.on('magicPositionAlgorithm', function(req, res) {
// Season.findOne({seasonNumber: req.body.seasonNumber}, function(err, season) {
//   var teamsArray = season.teams;
//   var dictionary = [];

//   teamsArray.forEach(function(name) {
//     var obj = {};
//     obj.points = name.points;
//     obj.name = name.name;
//     dictionary.push(obj);
//   });
  //dictionary = array of points and names
  // [ { points: 2, name: 'Timberwolves' },
  //   { points: 3, name: 'Lakers' },
  //   { points: 1, name: 'ChicagoBulls' }
  //   { points: 7, name: 'ChicagoBulls' }
  //   { points: 5, name: 'ChicagoBulls' } ]

  //bubble sorting dictionary object
  // var swapped = true;
  // while(swapped)
  //   swapped = false;
  //   for (var i = 1; i < dictionary.length; i++) {
  //     if(dictionary[i].points > dictionary[i-1].points) {
  //       var temp = dictionary[i-1];
  //       dictionary[i-1] = dictionary[i];
  //       dictionary[i] = temp;
  //       swapped = true;
  //     }
  // }

  // so we have sorted array
  // [ { points: 5, name: 'Timberwolves' },
  //   { points: 5, name: 'Lakers' },
  //   { points: 5, name: 'ChicagoBulls' },
  //   { points: 3, name: 'Cats' } ]

  //DID NOT FINISHED MY MAGIC ALGORITHM YET!!!!!!!!!
  //DID NOT FINISHED MY MAGIC ALGORITHM YET!!!!!!!!!
  //DID NOT FINISHED MY MAGIC ALGORITHM YET!!!!!!!!!
  //DID NOT FINISHED MY MAGIC ALGORITHM YET!!!!!!!!!
  //DID NOT FINISHED MY MAGIC ALGORITHM YET!!!!!!!!!

  res.json({msg:'Updated'});
  // });
});

module.exports = exports = scoreEventEmitter;
