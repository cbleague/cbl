var express = require('express');
var Season = require(__dirname + '/../models/season');
var jsonParser = require('body-parser').json();
var isAdmin = require(__dirname + '/../lib/eat_authorize');
var handleError = require(__dirname + '/../lib/handleError');
var ee = require(__dirname + '/../lib/seasonEvents');

var seasonRouter = module.exports = exports = express.Router();

//should receive seasonNumber and seasonName
seasonRouter.post('/createseason', jsonParser, isAdmin, function(req, res) {
  var newSeason = new Season();
  newSeason.name = req.body.name;
  newSeason.seasonNumber = req.body.seasonNumber;
  newSeason.administrator = req.body.admin;
  newSeason.creator = req.body.creator;
  newSeason.save(function(err, data) {
    if (err) return handleError.standard(err, res);
    res.json({msg: 'New Season Created'});
  });
});

//should receive teamId and seasonId
seasonRouter.post('/addteam', jsonParser, isAdmin, function(req, res) {
  ee.emit('addTeamToSeason', req, res);
});

//should receive teamId and seasonId
seasonRouter.delete('/removeteam', jsonParser, isAdmin, function(req, res) {
  ee.emit('removeTeamFromSeason', req, res);
});

seasonRouter.get('/getcurrentseason', function(req, res) {
  Season.findOne({current: true}, function(err, season) {
    if (err) return handleError.standard(err);
    res.json({seasonId: season._id, seasonNumber: season.seasonNumber});
  });
});

seasonRouter.get('/getwholeseason', jsonParser, function(req, res) {
  Season.findOne({current: true}, function(err, season) {
    if (err) return handleError.standard(err);
    res.json(season);
  });
});

seasonRouter.put('/changecurrentseason/:id', jsonParser, function(req, res){
  Season.findOne({_id: req.params.id}, function(err, season){
    season.current = false;
    season.save(function(err){
      if(err) return handleError.standard(err, res);
      res.json({"msg": "success prior season current is false"});
    });
  });
});
