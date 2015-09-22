'use strict';
var mongoose = require('mongoose');
var Team = require(__dirname + '/team');

var seasonSchema = new mongoose.Schema({
  name: {type: String, unique: true, required: true},
  
  teamsA: [{
    team: {type: mongoose.Schema.Types.ObjectId, ref: 'Team'},
    name: String,
    played: {type: Number, default: 0},
    win: {type: Number, default: 0},
    lost: {type: Number, default: 0},
    baskets: {
      scored: {type: Number, default: 0},
      missed: {type: Number, default: 0}
    },
    points: {type: Number, default: 0}
  }],
  
  teamsB: [{
    team: {type: mongoose.Schema.Types.ObjectId, ref: 'Team'},
    name: String,
    played: {type: Number, default: 0},
    win: {type: Number, default: 0},
    lost: {type: Number, default: 0},
    baskets: {
      scored: {type: Number, default: 0},
      missed: {type: Number, default: 0}
    },
    points: {type: Number, default: 0}
  }],

  gamesA: [{
    teams: [{
      id: {type: mongoose.Schema.Types.ObjectId, ref: 'Team'},
      score: {type: Number, default: 0}  
    }],
    date: Date,
    location: String
  }],

  gamesB: [{
    teams: [{
      id: {type: mongoose.Schema.Types.ObjectId, ref: 'Team'},
      score: {type: Number, default: 0}  
    }],
    date: Date,
    location: String
  }],
});

module.exports = exports = mongoose.model('Season', seasonSchema);