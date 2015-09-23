'use strict';
var mongoose = require('mongoose');
//var Player = require(__dirname + '/player');
var ObjectId = mongoose.Schema.Types.ObjectId;
var uniqueValidator = require('mongoose-unique-validator');
var User = require(__dirname + '/user');

var teamSchema = new mongoose.Schema({
  name: {type: String, unique: true, required: true},
  division: {type: String, required: true},
  season: {type: String, required: true},
  players: [{type: ObjectId, ref: 'Player'}],
  logo: String, // img url 
  administrator: {
    firstName: String,
    secondName: String,
    middleName: String
  },
  captain: {
    firstName: String,
    secondName: String,
    middleName: String
  },
  coach: {
    firstName: String,
    secondName: String,
    middleName: String
  },
  teamPhoto: String,
  creator: [{type: ObjectId, ref: 'User'}]
});

teamSchema.plugin(uniqueValidator);

module.exports = exports = mongoose.model('Team', teamSchema);