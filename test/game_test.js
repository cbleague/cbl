var chai = require('chai');
var chaiHttp = require('chai-http');
var expect = chai.expect;
chai.use(chaiHttp);
process.env.MONGO_URL = 'mongodb://localhost/game_test';
require(__dirname + '/../server');
var mongoose = require('mongoose');
var Game = require(__dirname + '/../models/game');
var Season = require(__dirname + '/../models/season');
var User = require(__dirname + '/../models/user');

describe('Game routes', function(){
  after(function(done){
    mongoose.connection.db.dropDatabase(function()  {
      done();
    });
  });

  describe('Create ')


