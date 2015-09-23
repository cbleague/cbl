var chai = require('chai');
var chaiHttp = require('chai-http');
var expect = chai.expect;
chai.use(chaiHttp);
process.env.MONGO_URL = 'mongodb://localhost/season_test';
require(__dirname + '/../server');
var mongoose = require('mongoose');
var Season = require(__dirname + '/../models/season');
var User = require(__dirname + '/../models/user');

describe('Season Routes Testing', function(){
  after(function(done){
    mongoose.connection.db.dropDatabase(function()  {
      done();
    });
  });

  describe('Create user with admin rights', function() {
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

    describe('Test create season route', function() {
      it('should be able to create season', function(done) {
        var token = this.token;
        chai.request('localhost:3000/api/season')
        .post('/')
        .set('token', token)
        .send({seasonNumber: 9, name: '2014-2015'})
        .end(function(err, res) {
          Season.findOne({seasonNumber: 9}, function(err, season) {
            expect(err).to.eql(null);
            expect(season).to.exist;
            expect(season.name).to.eql('2014-2015');
            done();
          });
        });
      });
    });
  });
});
