'use strict';

var express = require('express');
var News = require(__dirname + '/../models/news');
var User = require(__dirname + '/../models/user');
var jsonParser = require('body-parser').json();
var handleError = require(__dirname + '/../lib/handleError');


var newsRouter = module.exports = exports = express.Router();

newsRouter.post('/news', jsonParser, function(req, res) {
  var newNews = new News();
  newNews.title = req.body.title;
  newNews.timestamp = Date.now();
  newNews.contents = req.body.contents;
  newNews.postedBy = req.body.postedBy;


  console.log(req.body);
  newNews.save(function (err, data) {
    if(err) return handleError.standard(err, res);
    res.json(data);   
  });
});

