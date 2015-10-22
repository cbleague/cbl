var express = require('express');
var News = require(__dirname + '/../models/news');
var jsonParser = require('body-parser').json();
var handleError = require(__dirname + '/../lib/handleError');
var isAdmin = require(__dirname + '/../lib/eat_authorize');

var newsRouter = module.exports = exports = express.Router();

newsRouter.post('/post', jsonParser, isAdmin, function(req, res) {
    var newNews = new News();
    newNews.postedBy = req.body.postedBy;
    newNews.title = req.body.title;
    newNews.timestamp = Date.now();
    newNews.contents = req.body.contents;
    newNews.save(function (err, data) {
    if(err) return handleError.standard(err, res);
    res.json(data);
  });
});


newsRouter.put('/modify/:title', jsonParser, isAdmin, function(req, res) {
  News.findOne({'title': req.params.title}, function(err, res){
    if (err) throw err;
    newNews.postedBy = req.body.postedBy;
    newNews.title = req.body.title;
    newNews.timestamp = Date.now();
    newNews.contents = req.body.contents;
    newNews.save(function (err, data) {
      if(err) return handleError.standard(err, res);
      res.json(data);
    });
  });
});


