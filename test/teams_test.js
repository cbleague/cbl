var chai = require('chai');
var chaiHttp = require('chai-http');
chai.use(chaiHttp);
var expect = chai.expect;
process.env.MONGO_URL = 'mongodb://localhost/team_test';
require(__dirname + '/../server');
var mongoose = require('mongoose');
var Team = require(__dirname + '/../models/team');

describe('team routes', function(){
  after(function(done){
    mongoose.connection.db.dropDatabase(function(){
      done();
    });
  });

  it('should be able to save a team', function(done){
    chai.request('localhost:3000/api/register')
    .post('/registerteam')
    .send({name: 'Timberwolves', division: 'minor', season: 'winter'})
    .end(function(err, res){
      expect(err).to.eql(null);
      expect(res.body.name).to.eql('Timberwolves');
      done();
    });
  });

})