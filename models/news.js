'use strict';

var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;

var newsSchema = new mongoose.Schema({
  title: String,

  timestamp: {type: Date, default: Date.now},

  postedBy: String,

  contents: String,

  // comments: [{body: String, 
  //             postedBy: {type: ObjectId, ref: 'User'}, 
  //             date: Date}],

});

module.exports = exports = mongoose.model('News', newsSchema);