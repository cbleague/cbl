var chai = require('chai');
var chaiHttp = require('chai-http');
chai.use(chaiHttp);
var expect = chai.expect;
process.env.MONGO_URL = 'mongodb://localhost/auth_test';
require(__dirname + '/../server');
var mongoose = require('mongoose');
var User = require(__dirname + '/../models/user');

describe('auth routes', function() {
  after(function(done) {
    mongoose.connection.db.dropDatabase(function() {
      done();
    });
  });

  it('should be able to create a user', function(done) {
    chai.request('localhost:3000/api/auth')
    .post('/signup')
    .send({email:'test1', password: 'foobar123'})
    .end(function(err, res) {
      expect(err).to.eql(null);
      expect(res.body.token).to.have.length.above(0);
      done();
    });
  });

  it('should not be able to create user with same email', function(done) {
    chai.request('localhost:3000/api/auth')
    .post('/signup')
    .send({email:'test1', password: 'foobar123'})
    .end(function(err, res) {
      expect(err).to.eql(null);
      console.log(res.status);
      expect(res.status).to.eql(401);
      done();
    });
  });

  describe('User already in database', function() {
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

    it('should be able to signin', function(done) {
      chai.request('localhost:3000/api/auth')
      .get('/signin')
      .auth('test2', 'foobar123')
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res.body.token).to.have.length.above(0);
        done();
      });
    });
  });

  describe('Update email, update password, or both', function() {
    before(function(done) {
      var user = new User();
      user.email = 'test3';
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
    it('should be able to update email and password', function(done) {
      var token = this.token;
      chai.request('localhost:3000/api/auth/update')
      .put('/')
      .set('token', token)
      .send({email:'test5', password: 'cm9tYW4='})
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res.status).to.eql(200);
        User.findOne({email: 'test5'}, function(err, user) {
          if (err) throw err;
          expect(user._id).to.exist;
          user.compareHash('roman', function(err, resHash) {
            if (err) throw err;
            expect(resHash).to.eql(true);
            done();
          });
        });
      });
    });
  });
});