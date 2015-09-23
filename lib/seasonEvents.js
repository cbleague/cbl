var EventEmitter = require('events').EventEmitter;
var ee = new EventEmitter();
var handleError = require(__dirname + '/handleError');
var Team = require(__dirname + '/../models/team');
var Season = require(__dirname + '/../models/season');

//should receive teamId and seasonId
ee.on('addTeamToSeason', function(req, res) {
  //find division
  Team.findOne({_id: req.body.teamId}, function(err, team) {
    if (err) return handleError.standard(err);
    ee.emit('addTeamToExectDivision', team, req, res);
  });
});

ee.on('addTeamToExectDivision', function(team, req, res) {
  var newTeam = {
    team: team._id,
    name: team.name,
  };
  var push = {};
  if (team.division == 'A') {
    push.teamsA = newTeam;
  } else {
    push.teamsB = newTeam;
  }
  Season.findByIdAndUpdate(req.body.seasonId, {
    $push: push
  }, {
    safe: true, upsert: true
  }, function(err, model) {
    if (err) return handleError.standard(err);
    res.json({msg: 'Team added to season'});
  });
});

module.exports = exports = ee;