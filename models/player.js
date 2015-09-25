'use strict';
var mongoose = require('mongoose');
// var Team = require(__dirname + '/team');
var uniqueValidator = require('mongoose-unique-validator');

var playerSchema = new mongoose.Schema({

	firstname: {type: String, required: true},

	middlename: {type: String, required: true},

	secondname: {type: String, required: true},

  email: {type: String, required: true, unique: true, dropDups: true},

  phone: {type: Number, required: true},

  dateOfBirth: {type: Date, required: true},

  age: {type: Number, required: true},

  height: {type: Number, required: true},

  weight: {type: Number, required: true},

  number: Number,

  position: {type: String, required: true},

	photo: String,

	teamID: {type: mongoose.Schema.Types.ObjectId, ref: 'Team'}

},{collection: 'players'});

playerSchema.plugin(uniqueValidator);

module.exports = exports = mongoose.model('Player', playerSchema);
