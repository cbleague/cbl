'use strict';
var mongoose = require('mongoose');
// var Team = require(__dirname + '/team');

var playerSchema = new mongoose.Schema({

	firstname: {type: String, required: true},

	middlename: {type: String, required: true},

	secondname: {type: String, required: true},

  email: {type: String, required: true},

  phone: {type: Number, required: true},

  dateOfBirth: {type: Date, required: true},

  age: {type: Number, required: true},

  height: Number,

  weight: Number,

  number: Number,

  position: String,

	photo: String,

	teamID: {type: mongoose.Schema.Types.ObjectId, ref: 'Team'}

},{collection: 'player'});

module.exports = exports = mongoose.model('Player', playerSchema);
