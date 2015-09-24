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
  });

  var seasonId;

  it('should be able to create season', function(done) {
    var token = this.token;
    chai.request('localhost:3000/api/season')
    .post('/')
    .set('token', token)
    .send({seasonNumber: 1, name: '2014-2015'})
    .end(function(err, res) {
        Season.findOne({seasonNumber: 1}, function(err, season) {
          seasonId = season._id;
          expect(err).to.eql(null);
          expect(season).to.exist;
          expect(season.name).to.eql('2014-2015');
          done();
        });
      });
  });

  it('should be able to create team1', function(done){
    var token = this.token;
    chai.request('localhost:3000/api/team')
    .post('/registerteam')
    .set('token', token)
    .send({name:'test1', division:'A', season:seasonId})
    .end(function(err, res){
      Team.findOne({name:'test1'}, function(err, team){
        expect(err).to.eql(null);
        expect(team.name).to.eql('test1');
        done();
      });
    });
  });

  it('should be able to create team2', function(done){
    var token = this.token;
    chai.request('localhost:3000/api/team')
    .post('/registerteam')
    .set('token', token)
    .send({name:'test2', division:'A', season:seasonId})
    .end(function(err, res){
      Team.findOne({name:'test2'}, function(err, team){
        expect(err).to.eql(null);
        expect(team.name).to.eql('test2');
        done();
      });
    });
  });
  


  it('should be able to create a game', function(done){
    var token = this.token;
    chai.request('localhost:3000/api/game')
    .post('/create')
    .set('token', token)
    .send({seasonNumber:1, team1_name:'test1', team1_division:'A', team2_name:'test2', team2_diviion:'A', date:3456, location:'test'})
    Team.findOne({name:'test1'}, function(err, team1){
          console.log(team1);});
    Season.findOne({seasonNumber:1}, function(err, season){
      expect(season.games).to.exist;
      console.log(season);
      expect(err).to.eql(null);
      done();
    });
  });
});



