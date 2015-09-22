'use strict';
var mongoose = require('mongoose');
//var Player = require(__dirname + '/player');
var ObjectId = mongoose.Schema.Types.ObjectId

var teamSchema = new mongoose.Schema({

	name: {type: String, unique: true, required: true},

  division: {type: String, required: true},

  season: {type: String, required: true},

  players: [{type: ObjectId, ref: 'Player'}],  // type: Schema.ObjectId

	logo: String, // img url 

	// administrator: {name: {first: String, middle: String, second: String},
	// 								 email: String, phone: String},

	// captain: {name: {first: String, middle: String, second: String},
	// 					 email: String, phone: String},

	// coach: {name: {first: String, middle: String, second: String},
	// 				 email: String, phone: String},

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

module.exports = exports = mongoose.model('Team', teamSchema);