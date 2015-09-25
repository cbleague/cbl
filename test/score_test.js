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
    var seasonId, teamId1, teamId2, teamId3, teamId4, teamId5;
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

    it('Creating team3 on A division', function(done) {
      var token = this.token;
      chai.request('localhost:3000/api/team')
      .post('/registerteam')
      .set('token', token)
      .send({name: 'ChicagoBulls', division: 'A', season: seasonId})
      .end(function(err, res){
        expect(err).to.eql(null);
        expect(res.body.name).to.eql('ChicagoBulls');
        teamId3 = res.body._id;
        done();
      });
    });

    it('Creating team4 on A division', function(done) {
      var token = this.token;
      chai.request('localhost:3000/api/team')
      .post('/registerteam')
      .set('token', token)
      .send({name: 'Cats', division: 'A', season: seasonId})
      .end(function(err, res){
        expect(err).to.eql(null);
        expect(res.body.name).to.eql('Cats');
        teamId4 = res.body._id;
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
          expect(season.teams[1].division).to.eql('A');
          done();
        });
      });
    });



    it('Adding team3 to Season', function(done) {
      var token = this.token;
      chai.request('localhost:3000/api/season')
      .post('/addteam')
      .set('token', token)
      .send({seasonId: seasonId, teamId: teamId3})
      .end(function(err, res){
        expect(err).to.eql(null);
        expect(res.body.msg).to.eql('Team added to season');
        Season.findById(seasonId, function(err, season) {
          expect(season.teams.length).to.eql(3);
          expect(season.teams[2].division).to.eql('A');
          done();
        });
      });
    });

    it('Adding team4 to Season', function(done) {
      var token = this.token;
      chai.request('localhost:3000/api/season')
      .post('/addteam')
      .set('token', token)
      .send({seasonId: seasonId, teamId: teamId4})
      .end(function(err, res){
        expect(err).to.eql(null);
        expect(res.body.msg).to.eql('Team added to season');
        Season.findById(seasonId, function(err, season) {
          expect(season.teams.length).to.eql(4);
          expect(season.teams[3].division).to.eql('A');
          done();
        });
      });
    });

    it('Creating game for teams 1 - 2', function(done){
      var token = this.token;
      chai.request('localhost:3000/api/game')
      .post('/create')
      .set('token', token)
      .send({seasonNumber: 9, team1_name:'Timberwolves', team1_division:'A', team2_name:'Lakers', team2_division:'A', date:124125, location:'testlocation'})
      .end(function(err, res){
        Season.findOne({seasonNumber:9}, function(err, season){
          expect(season.games).to.exist;
          expect(err).to.eql(null);
          expect(season.games[0].location).to.eql('testlocation');
          done();
        });
      });
    });

    it('Creating game for teams 1 - 3', function(done){
      var token = this.token;
      chai.request('localhost:3000/api/game')
      .post('/create')
      .set('token', token)
      .send({seasonNumber: 9, team1_name:'Timberwolves', team1_division:'A', team2_name:'ChicagoBulls', team2_division:'A', date:85127, location:'somewhere'})
      .end(function(err, res){
        Season.findOne({seasonNumber:9}, function(err, season){
          expect(season.games).to.exist;
          expect(err).to.eql(null);
          expect(season.games[1].location).to.eql('somewhere');
          done();
        });
      });
    });


    it('Creating game for teams 1 - 4', function(done){
      var token = this.token;
      chai.request('localhost:3000/api/game')
      .post('/create')
      .set('token', token)
      .send({seasonNumber: 9, team1_name:'Timberwolves', team1_division:'A', team2_name:'Cats', team2_division:'A', date:23, location:'testlocation'})
      .end(function(err, res){
        Season.findOne({seasonNumber:9}, function(err, season){
          expect(season.games).to.exist;
          expect(err).to.eql(null);
          expect(season.games[0].location).to.eql('testlocation');
          done();
        });
      });
    });


    it('Creating game for teams 2 - 3', function(done){
      var token = this.token;
      chai.request('localhost:3000/api/game')
      .post('/create')
      .set('token', token)
      .send({seasonNumber: 9, team1_name:'Lakers', team1_division:'A', team2_name:'ChicagoBulls', team2_division:'A', date:5745863, location:'testlocation'})
      .end(function(err, res){
        Season.findOne({seasonNumber:9}, function(err, season){
          expect(season.games).to.exist;
          expect(err).to.eql(null);
          expect(season.games[0].location).to.eql('testlocation');
          done();
        });
      });
    });

    it('Creating game for teams 2 - 4', function(done){
      var token = this.token;
      chai.request('localhost:3000/api/game')
      .post('/create')
      .set('token', token)
      .send({seasonNumber: 9, team1_name:'Lakers', team1_division:'A', team2_name:'Cats', team2_division:'A', date:11563, location:'testlocation'})
      .end(function(err, res){
        Season.findOne({seasonNumber:9}, function(err, season){
          expect(season.games).to.exist;
          expect(err).to.eql(null);
          expect(season.games[0].location).to.eql('testlocation');
          done();
        });
      });
    });

    it('Creating game for teams 3 - 4', function(done){
      var token = this.token;
      chai.request('localhost:3000/api/game')
      .post('/create')
      .set('token', token)
      .send({seasonNumber: 9, team1_name:'ChicagoBulls', team1_division:'A', team2_name:'Cats', team2_division:'A', date:63, location:'testlocation'})
      .end(function(err, res){
        Season.findOne({seasonNumber:9}, function(err, season){
          expect(season.games).to.exist;
          expect(err).to.eql(null);
          expect(season.games[0].location).to.eql('testlocation');
          done();
        });
      });
    });

    it('Adding game 1', function(done) {
      var token = this.token;
      chai.request('localhost:3000/api/score')
      .post('/')
      .set('token', token)
      .send({id1: teamId1, id2: teamId2, id1Score: 5, id2Score: 10, seasonNumber: 9})
      .end(function(err, res){
        expect(err).to.eql(null);
        expect(res.body.msg).to.eql('Updated');
        Season.findOne({seasonNumber: 9, 'teams.team': teamId2}, {'teams.$': 1}, function(err, data) {
          // expect(data.teams[0].baskets.scored).to.eql(44);
          // expect(data.teams[0].baskets.missed).to.eql(55);
          // expect(data.teams[0].played).to.eql(1);
          // expect(data.teams[0].win).to.eql(0);
          // expect(data.teams[0].lost).to.eql(1);
          // expect(data.teams[0].points).to.eql(1);
          done();
        });
      });
    });

    it('Adding game 2', function(done) {
      var token = this.token;
      chai.request('localhost:3000/api/score')
      .post('/')
      .set('token', token)
      .send({id1: teamId1, id2: teamId3, id1Score: 10, id2Score: 5, seasonNumber: 9})
      .end(function(err, res){
        expect(err).to.eql(null);
        expect(res.body.msg).to.eql('Updated');
        Season.findOne({seasonNumber: 9, 'teams.team': teamId2}, {'teams.$': 1}, function(err, data) {
          // expect(data.teams[0].baskets.scored).to.eql(100);
          // expect(data.teams[0].baskets.missed).to.eql(101);
          // expect(data.teams[0].played).to.eql(2);
          // expect(data.teams[0].win).to.eql(1);
          // expect(data.teams[0].lost).to.eql(1);
          // expect(data.teams[0].points).to.eql(3);
          done();
        });
      });
    });

    it('Adding game 3', function(done) {
      var token = this.token;
      chai.request('localhost:3000/api/score')
      .post('/')
      .set('token', token)
      .send({id1: teamId1, id2: teamId4, id1Score: 15, id2Score: 5, seasonNumber: 9})
      .end(function(err, res){
        expect(err).to.eql(null);
        expect(res.body.msg).to.eql('Updated');
        Season.findOne({seasonNumber: 9, 'teams.team': teamId2}, {'teams.$': 1}, function(err, data) {
          // expect(data.teams[0].baskets.scored).to.eql(100);
          // expect(data.teams[0].baskets.missed).to.eql(101);
          // expect(data.teams[0].played).to.eql(2);
          // expect(data.teams[0].win).to.eql(1);
          // expect(data.teams[0].lost).to.eql(1);
          // expect(data.teams[0].points).to.eql(3);
          done();
        });
      });
    });

    it('Adding game 4', function(done) {
      var token = this.token;
      chai.request('localhost:3000/api/score')
      .post('/')
      .set('token', token)
      .send({id1: teamId2, id2: teamId3, id1Score: 5, id2Score: 25, seasonNumber: 9})
      .end(function(err, res){
        expect(err).to.eql(null);
        expect(res.body.msg).to.eql('Updated');
        Season.findOne({seasonNumber: 9, 'teams.team': teamId2}, {'teams.$': 1}, function(err, data) {
          // expect(data.teams[0].baskets.scored).to.eql(100);
          // expect(data.teams[0].baskets.missed).to.eql(101);
          // expect(data.teams[0].played).to.eql(2);
          // expect(data.teams[0].win).to.eql(1);
          // expect(data.teams[0].lost).to.eql(1);
          // expect(data.teams[0].points).to.eql(3);
          done();
        });
      });
    });

    it('Adding game 5', function(done) {
      var token = this.token;
      chai.request('localhost:3000/api/score')
      .post('/')
      .set('token', token)
      .send({id1: teamId2, id2: teamId4, id1Score: 25, id2Score: 5, seasonNumber: 9})
      .end(function(err, res){
        expect(err).to.eql(null);
        expect(res.body.msg).to.eql('Updated');
        Season.findOne({seasonNumber: 9, 'teams.team': teamId2}, {'teams.$': 1}, function(err, data) {
          // expect(data.teams[0].baskets.scored).to.eql(100);
          // expect(data.teams[0].baskets.missed).to.eql(101);
          // expect(data.teams[0].played).to.eql(2);
          // expect(data.teams[0].win).to.eql(1);
          // expect(data.teams[0].lost).to.eql(1);
          // expect(data.teams[0].points).to.eql(3);
          done();
        });
      });
    });

    it('Adding game 6', function(done) {
      var token = this.token;
      chai.request('localhost:3000/api/score')
      .post('/')
      .set('token', token)
      .send({id1: teamId3, id2: teamId4, id1Score: 15, id2Score: 10, seasonNumber: 9})
      .end(function(err, res){
        expect(err).to.eql(null);
        expect(res.body.msg).to.eql('Updated');
        Season.findOne({seasonNumber: 9, 'teams.team': teamId1}, {'teams.$': 1}, function(err, data) {
          expect(data.teams[0].baskets.scored).to.eql(30);
          expect(data.teams[0].baskets.missed).to.eql(20);
          expect(data.teams[0].played).to.eql(3);
          expect(data.teams[0].win).to.eql(2);
          expect(data.teams[0].lost).to.eql(1);
          expect(data.teams[0].points).to.eql(5);
          done();
        });
      });
    });

    it('show me season', function(done) {
      Season.findOne({seasonNumber: 9}, function(err, data) {
          console.log('--------->>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');
          console.log(data.games);
          done();
        });

    });







  });
});
