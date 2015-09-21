'use strict';
var mongoose = require('mongoose');

var playerSchema = new mongoose.Schema({

	name: {first: String, middle: String, second: String, required: true},

	email: {type: String, required: true},

	phone: {type: Number, required: true},

	dateOfBirth: {type: Date, required: true},

	age: {type: Number, required: true},

	height: {type: Number, required: true},

	weight: {type: Number, required: true},

	number: Number,

	position: {type: String, required: true},

	photo: String

});

module.exports = exports = mongoose.model('Player', playerSchema);