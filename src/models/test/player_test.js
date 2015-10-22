var chai = require('chai'),
    chaiHttp = require('chai-http'),
    expect = chai.expect;

chai.use(chaiHttp);
process.env.MONGO_URL = 'mongodb://localhost/player_test';
require(__dirname + '/../server');
var mongoose = require('mongoose');
var User = require(__dirname + '/../models/user');
var Player = require(__dirname + '/../models/player');


describe('player routes', function(){
  after(function(done){
    mongoose.connection.db.dropDatabase(function(){
      done();
    });
  });

  describe('only user is able to approach players', function(){
    before(function(done){
      var user = new User();
      user.email = "test";
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

    it('should be able to register a player', function(done){
      var token = this.token;
      chai.request('localhost:3000/api/player')
        .post('/register')
        .set('token', token)
        .send({firstname: 'test1', middlename: 'test', secondname: 'test', email: 'test1@test.com', 
              phone: 1234, dateOfBirth: 1234, age: 1234, height: 1234, weight: 1234, number: 1234, position: 'test'})
        .end(function(err, res){
          expect(err).to.eql(null);
          expect(res.body.email).to.eql('test1@test.com');
          done();
        });
    });
  

    it('should not be able to register a player with duplicate email', function(done){
      var token = this.token;
      chai.request('localhost:3000/api/player')
        .post('/register')
        .set('token', token)
        .send({firstname: 'test1', middlename: 'test', secondname: 'test', email: 'test1@test.com', 
              phone: 1234, dateOfBirth: 1234, age: 1234, height: 1234, weight: 1234, number: 1234, position: 'test'})
        .end(function(err, res){
          expect(err).to.eql(null);
          expect(res.status).to.eql(500);
          done();
        });
    });

    it('should be able to retrive a player by email', function(done){
      var token = this.token;
      chai.request('localhost:3000/api/player')
        .get('/find/test1@test.com')
        .set('token', token)
        Player.findOne({email: 'test1@test.com'}, function(err, player){
          expect(player.email).to.eql('test1@test.com');
          expect(player.firstname).to.eql('test1');
          done();
        });
    });

    it('should be able to update a player by email', function(done){
      var token = this.token;
      chai.request('localhost:3000/api/player')
        .get('/update/test1@test.com')
        .set('token', token)
        Player.findOne({email: 'test1@test.com'}, function(err, player){
          player.firstname = 'test123';
          expect(player.firstname).to.eql('test123');
          done();
        });
    });

    it('should be able to delete a player by email', function(done){
      var token = this.token;
      chai.request('localhost:3000/api/player')
        .get('/delete/test1@test.com')
        .set('token', token)
        Player.remove({email: 'test1@test.com'}, function(err){
          Player.findOne({email: 'test1@test.com'}, function(err, player){
            expect(player).to.not.exist;
            done();
          });
        });
    });
  });
});

