var chai = require('chai');
var chaiHttp = require('chai-http');
var expect = chai.expect;
chai.use(chaiHttp);
process.env.MONGO_URL = 'mongodb://localhost/season_test';
require(__dirname + '/../server');
var mongoose = require('mongoose');
var Season = require(__dirname + '/../models/season');
var User = require(__dirname + '/../models/user');

describe('Season Routes Testing', function() {
  after(function(done){
    mongoose.connection.db.dropDatabase(function() {
      done();
    });
  });

  describe('Creates a user and a team in order to manipulate with season', function() {
    var seasonId, teamIdA, teamIdB;
    before(function(done) {
      var user = new User();
      user.email = 'test';
      user.role = 'admin';
      user.generateHash('foobar123', function(err, res) {
        if (err) throw err;
        user.save(function(err, data) {
          if (err) throw err;
          user.generateToken(function(err, token) {
            if (err) throw err;
            this.token = token;
            done();
          }.bind(this));
        }.bind(this));
      }.bind(this));
    });

    it('should be able to create season', function(done) {
      var token = this.token;
      chai.request('localhost:3000/api/season')
      .post('/')
      .set('token', token)
      .send({seasonNumber: 9, name: '2014-2015'})
      .end(function(err, res) {
        Season.findOne({seasonNumber: 9}, function(err, season) {
          seasonId = season._id;
          expect(err).to.eql(null);
          expect(season).to.exist;
          expect(season.name).to.eql('2014-2015');
          done();
        });
      });
    });

    it('Creating team on A division', function(done) {
      var token = this.token;
      chai.request('localhost:3000/api/team')
      .post('/registerteam')
      .set('token', token)
      .send({name: 'Timberwolves', division: 'A', season: seasonId})
      .end(function(err, res){
        expect(err).to.eql(null);
        expect(res.body.name).to.eql('Timberwolves');
        teamIdA = res.body._id;
        done();
      });
    });

    it('Creating team on B division', function(done) {
      var token = this.token;
      chai.request('localhost:3000/api/team')
      .post('/registerteam')
      .set('token', token)
      .send({name: 'Lakers', division: 'B', season: seasonId})
      .end(function(err, res){
        expect(err).to.eql(null);
        expect(res.body.name).to.eql('Lakers');
        teamIdB = res.body._id;
        done();
      });
    });

    it('should be able to add team from division A to Season', function(done) {
      var token = this.token;
      chai.request('localhost:3000/api/season')
      .post('/addteam')
      .set('token', token)
      .send({seasonId: seasonId, teamId: teamIdA})
      .end(function(err, res){
        expect(err).to.eql(null);
        expect(res.body.msg).to.eql('Team added to season');
        Season.findById(seasonId, function(err, season) {
          expect(season.teamsA.length).to.eql(1);
        });
        done();
      });
    });

    it('should be able to add team from division B to Season', function(done) {
      var token = this.token;
      chai.request('localhost:3000/api/season')
      .post('/addteam')
      .set('token', token)
      .send({seasonId: seasonId, teamId: teamIdB})
      .end(function(err, res){
        expect(err).to.eql(null);
        expect(res.body.msg).to.eql('Team added to season');
        Season.findById(seasonId, function(err, season) {
          expect(season.teamsB.length).to.eql(1);
          console.log(season);
        });
        done();
      });
    });

  
  });
});
