var chai = require('chai');
var chaiHttp = require('chai-http');
chai.use(chaiHttp);
var expect = chai.expect;
process.env.MONGO_URL = 'mongodb://localhost/team_test';
require(__dirname + '/../server');
var mongoose = require('mongoose');
var Team = require(__dirname + '/../models/team');
var User = require(__dirname + '/../models/user');
var Season = require(__dirname + '/../models/season')


describe('team routes', function(){
  after(function(done){
    mongoose.connection.db.dropDatabase(function(){
      done();
    });
  });
  
  before(function(done) {
      var user = new User();
      user.email = 'test2';
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

    
    var seasonId;
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

    it('should be able to save a team', function(done){
      var token = this.token;
      chai.request('localhost:3000/api/team')
      .post('/registerteam')
      .set('token', token)
      .send({name: 'Timberwolves', division: 'A', season: seasonId})
      .end(function(err, res){
        expect(err).to.eql(null);
        expect(res.body.name).to.eql('Timberwolves');
        done();
      });
    });

    it('should be able to modify a team', function(done){
      var token = this.token;
      chai.request('localhost:3000/api/team')
      .put('/updateteam/Timberwolves/')
      .set('token', token)
      .send({field: 'division', value: 'B'})
      .end(function(err, res){
        expect(err).to.eql(null);
        expect(res.body.division).to.eql('B');
        done();
      });
    });

    it('should be able to see a team', function(done){
      chai.request('localhost:3000/api/team')
      .get('/seeteam/Timberwolves')
      .end(function(err, res){
        expect(err).to.eql(null);
        expect(res.body.name).to.eql('Timberwolves');
        expect(res.body.season).to.eql(seasonId.toString());
        expect(res.body.division).to.eql('B');
        done();
      });
    });

    it('should be able to delete a team', function(done){
      var token = this.token;
      chai.request('localhost:3000/api/team')
      .del('/deleteteam/Timberwolves')
      .set('token', token)
      .end(function(err, res){
        expect(res.body.msg).to.eql('removed');
        done();
      });
    });

    it('should be able to add a player', function(done){
      chai.request('localhost:3000/api/team')
      .put('/addplayer')
      .send({playerId: '3fh3k3384302'})
      .end(function(err, res){
        expect(res.body.team).to.eql(['3fh3k3384302']);
      });
    });

});    //end of top level describe block