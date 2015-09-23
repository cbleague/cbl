'use strict';
var mongoose = require('mongoose');
//var Player = require(__dirname + '/player');
var ObjectId = mongoose.Schema.Types.ObjectId
var uniqueValidator = require('mongoose-unique-validator');

var teamSchema = new mongoose.Schema({
  name: {type: String, unique: true, required: true},
  division: {type: String, required: true},
  season: {type: String, required: true},
  players: [{type: mongoose.Schema.Types.ObjectId, ref: 'Player'}],  // type: Schema.ObjectId
  logo: String, // img url 
  administrator: String,
  captain: String,
  coach: String,
  photo: String,
  win: Number,
  loss: Number,
  pld: Number,
  basket: {score: Number, lost: Number},
  pts: Number,
  adminChecked: {type: Boolean, default: false}
});

teamSchema.plugin(uniqueValidator);

module.exports = exports = mongoose.model('Team', teamSchema);