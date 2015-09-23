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
    chai.request('localhost:3000/api/register')
    .post('/registerteam')
    .set('token', token)
    .send({name: 'Timberwolves', division: 'minor', season: 'winter'})
    .end(function(err, res){
      expect(err).to.eql(null);
      debugger;
      expect(res.body.name).to.eql('Timberwolves');
      done();
    });
  });
});
});