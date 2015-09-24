var chai = require('chai');
var chaiHttp = require('chai-http');
var expect = chai.expect;
chai.use(chaiHttp);
process.env.MONGO_URL = 'mongodb://localhost/game_test';
require(__dirname + '/../server');
var mongoose = require('mongoose');
var Team = require(__dirname + '/../models/team');
var User = require(__dirname + '/../models/user');
var Season = require(__dirname + '/../models/season');

describe('Game routes', function(){
  after(function(done){
    mongoose.connection.db.dropDatabase(function()  {
    done();
    });
  });

  before(function(done){
    var user = new User();
    user.email = "test";
    user.role = "admin";
    user.generateHash('qwe123', function(err, res){
      if(err) throw err;
      user.save(function(err, data){
        if(err) throw err;
        user.generateToken(function(err, token){
          this.token = token;
          done();
        }.bind(this));
      }.bind(this));
    }.bind(this));

    var team1 = new Team();
    team1.name = 'team1';
    team1.division = 'A';
    team1.save(function(err) {
      if(err) return handleError.standard(err,res);
    });

    var team2 = new Team();
    team2.name = 'team2';
    team2.division = 'A';
    team2.save(function(err) {
      if(err) return handleError.standard(err,res);
    });

    var season = new Season();
    season.seasonNumber = 1;
    season.name= 'test';
    season.save(function(err) {
      if(err) return handleError.standard(err,res);    
    });
  });

  it('should be able to create a game', function(done){
    var token = this.token;
    chai.request('localhost:3000/api/game')
    .post('/create')
    .set('token', token)
    .send({seasonNumber:1, team1_name:'team1', team1_division:'A', team2_name:'team2', team2_diviion:'A', date:1234, location:'test'})
    Season.findOne({seasonNumber:1}, function(err, season){
      expect(season).to.exist;
      console.log(season);
      expect(season.gamesA).to.have.deep.property('teams.name', 'team1');
      expect(err).to.eql(null);
      done();
    });
  });
});


