var express = require('express');
var app = express();
var mongoose = require('mongoose');
var port = process.env.PORT || 3000;
mongoose.connect(process.env.MONGO_URL || 'mongodb://localhost/user_dev');
process.env.APP_SECRET = process.env.APP_SECRET || 'gabaswillgetajob';
var userRouter = require(__dirname + '/routes/user_routes');
var seasonRouter = require(__dirname + '/routes/season_routes');
var teamRouter = require(__dirname + '/routes/team_routes');

app.use('/api/auth', userRouter);
app.use('/api/season', seasonRouter);
app.use('/api/team', teamRouter);

app.listen(port, function() {
  console.log('Server up on port:' + port);
});
