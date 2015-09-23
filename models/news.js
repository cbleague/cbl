'use strict';

var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;

var newsSchema = new mongoose.Schema({
  title: {type: String, require: true},

  timestamp: {type: Date, default: Date.now},

  postedBy: {type: String, require: true},

  contents: {type: String, require: true}

},{collection: 'news'});

module.exports = exports = mongoose.model('News', newsSchema);