var EventEmitter = require('events').EventEmitter;
var scoreEventEmitter = new EventEmitter();
var handleError = require(__dirname + '/handleError');
var Season = require(__dirname + '/../models/season');

//should receive {id1: _id, id2: _id, id1Score: score, id2Score:score, seasonNumber: number}
scoreEventEmitter.on('addScoreToTeam', function(req, res) {
  var winner = {};
  var loser = {};
  if (req.body.id1Score > req.body.id2Score) {
    winner.id = req.body.id1;
    winner.scored = req.body.id1Score;
    winner.missed = req.body.id2Score;
    loser.id = req.body.id2;
    loser.scored = req.body.id2Score;
    loser.missed = req.body.id1Score;
  } else {
    winner.id = req.body.id2;
    winner.scored = req.body.id2Score;
    winner.missed = req.body.id1Score;
    loser.id = req.body.id1;
    loser.scored = req.body.id1Score;
    loser.missed = req.body.id2Score;
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
    res.json({msg: 'Updated'});
  });
});



module.exports = exports = scoreEventEmitter;