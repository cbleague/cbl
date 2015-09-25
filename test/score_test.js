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

  describe('Creating a user with admin role', function() {
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

    it('Creating a season', function(done) {
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

    it('Creating team1 on A division', function(done) {
      var token = this.token;
      chai.request('localhost:3000/api/team')
      .post('/registerteam')
      .set('token', token)
      .send({name: 'Timberwolves', division: 'A', season: seasonId})
      .end(function(err, res){
        expect(err).to.eql(null);
        expect(res.body.name).to.eql('Timberwolves');
        teamId1 = res.body._id;
        done();
      });
    });

    it('Creating team2 on A division', function(done) {
      var token = this.token;
      chai.request('localhost:3000/api/team')
      .post('/registerteam')
      .set('token', token)
      .send({name: 'Lakers', division: 'A', season: seasonId})
      .end(function(err, res){
        expect(err).to.eql(null);
        expect(res.body.name).to.eql('Lakers');
        teamId2 = res.body._id;
        done();
      });
    });

    it('Adding team1 to Season', function(done) {
      var token = this.token;
      chai.request('localhost:3000/api/season')
      .post('/addteam')
      .set('token', token)
      .send({seasonId: seasonId, teamId: teamId1})
      .end(function(err, res){
        expect(err).to.eql(null);
        expect(res.body.msg).to.eql('Team added to season');
        Season.findById(seasonId, function(err, season) {
          expect(season.teams.length).to.eql(1);
          done();
        });
      });
    });

    it('Adding team2 to Season', function(done) {
      var token = this.token;
      chai.request('localhost:3000/api/season')
      .post('/addteam')
      .set('token', token)
      .send({seasonId: seasonId, teamId: teamId2})
      .end(function(err, res){
        expect(err).to.eql(null);
        expect(res.body.msg).to.eql('Team added to season');
        Season.findById(seasonId, function(err, season) {
          expect(season.teams.length).to.eql(2);
          expect(season.teams[0].division).to.eql('A');
          done();
        });
      });
    });

    it('Should be able to update scores', function(done) {
      var token = this.token;
      chai.request('localhost:3000/api/score')
      .post('/')
      .set('token', token)
      .send({id1: teamId1, id2: teamId2, id1Score: 55, id2Score: 44, seasonNumber: 9})
      .end(function(err, res){
        expect(err).to.eql(null);
        expect(res.body.msg).to.eql('Updated');
        Season.findById(seasonId, function(err, season) {
          console.log(season.teams);
          expect(season.teams.length).to.eql(2);
          expect(season.teams[1].division).to.eql('A');
          done();
        });
      });
    });

    // it('Should be able to update scores one more time', function(done) {
    //   var token = this.token;
    //   chai.request('localhost:3000/api/score')
    //   .post('/')
    //   .set('token', token)
    //   .send({id1: teamId1, id2: teamId2, id1Score: 10, id2Score: 20, seasonNumber: 9})
    //   .end(function(err, res){
    //     expect(err).to.eql(null);
    //     expect(res.body.msg).to.eql('Updated');
    //     Season.findById(seasonId, function(err, season) {
    //       console.log(season.teams);
    //       expect(season.teams.length).to.eql(2);
    //       expect(season.teams[1].division).to.eql('A');
    //       done();
    //     });
    //   });
    // });





  });
});
