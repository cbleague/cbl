var mongoose = require('mongoose');
//var Player = require(__dirname + '/player');
var ObjectId = mongoose.Schema.Types.ObjectId;
var uniqueValidator = require('mongoose-unique-validator');
var User = require(__dirname + '/user');

var teamSchema = new mongoose.Schema({
  name: {type: String, required: true},
  division: {type: String, required: true},
  season: {type: Number, required: true},
  inSeason: {type: Boolean, default: false},
  players: [{type: ObjectId, ref: 'Player'}],
  logo: String, // img url
  administrator: {
    firstName: String,
    lastName: String,
    middleName: String,
    email: String,
    phone: String
  },
  captain: {
    firstName: String,
    lastName: String,
    middleName: String,
    email: String,
    phone: String
  },
  coach: {
    firstName: String,
    lastName: String,
    middleName: String,
    email: String,
    phone: String
  },
  teamPhoto: String,
  creator: String
});

teamSchema.plugin(uniqueValidator);

module.exports = exports = mongoose.model('Team', teamSchema);
