var chai = require('chai');
var chaiHttp = require('chai-http');
chai.use(chaiHttp);
var expect = chai.expect;
process.env.MONGO_URL = 'mongodb://localhost/team_test';
require(__dirname + '/../server');
var mongoose = require('mongoose');
var Team = require(__dirname + '/../models/team');
var User = require(__dirname + '/../models/user');


describe('team routes', function(){
  
  after(function(done){
    mongoose.connection.db.dropDatabase(function(){
      done();
    });
  });

  describe('user for team', function(){
    before(function(done) {
      var user = new User();
      user.email = 'test2';
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

    it('should be able to save a team', function(done){
      var token = this.token;
      chai.request('localhost:3000/api/team')
      .post('/registerteam')
      .set('token', token)
      .send({name: 'Timberwolves', division: 'A', season: 'winter'})
      .end(function(err, res){
        expect(err).to.eql(null);
        expect(res.body.name).to.eql('Timberwolves');
        done();
      });
    });

    it('should be able to modify a team', function(done){
      var token = this.token;
      chai.request('localhost:3000/api/team')
      .put('/updateteam/Timberwolves/season/fall')
      .set('token', token)
      .end(function(err, res){
        expect(err).to.eql(null);
        expect(res.body.season).to.eql('fall');
        done();
      });
    });

    it('should be able to see a team', function(done){
      chai.request('localhost:3000/api/team')
      .get('/seeteam/Timberwolves')
      .end(function(err, res){
        expect(err).to.eql(null);
        expect(res.body.name).to.eql('Timberwolves');
        expect(res.body.season).to.eql('fall');
        expect(res.body.division).to.eql('A');
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

  });
});