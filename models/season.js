'use strict';
var mongoose = require('mongoose');
var Team = require(__dirname + '/team');

var seasonSchema = new mongoose.Schema({
  seasonNumber: {type: Number, unique: true, require:true},
  
  name: {type: String, unique: true, require: true},
  
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
    date: {type: Date, require: true},
    location: {type: String, require: true}
  }],

  gamesB: [{
    teams: [{
      id: {type: mongoose.Schema.Types.ObjectId, ref: 'Team'},
      score: {type: Number, default: 0}  
    }],
    date: {type: Date, require: true},
    location: {type: String, require: true}
  }],
});

module.exports = exports = mongoose.model('Season', seasonSchema);