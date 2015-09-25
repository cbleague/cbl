var express = require('express');
var app = express();
var mongoose = require('mongoose');
var port = process.env.PORT || 3000;
mongoose.connect(process.env.MONGO_URL || 'mongodb://localhost/user_dev')
process.env.APP_SECRET = process.env.APP_SECRET || 'gabaswillgetajob';
var userRouter = require(__dirname + '/routes/user_routes');
var playerRouter = require(__dirname + '/routes/player_routes');
var newsRouter = require(__dirname + '/routes/news_routes');
var seasonRouter = require(__dirname + '/routes/season_routes');
var teamRouter = require(__dirname + '/routes/team_routes');
var scoreRouter = require(__dirname + '/routes/score_routes');
var tableRouter = require(__dirname + '/routes/table_routes');
var gameRouter = require(__dirname + '/routes/game_routes');

app.use('/api/season', seasonRouter);
app.use('/api/team', teamRouter);
app.use('/api/auth', userRouter);
app.use('/api/player', playerRouter);
app.use('/api/news', newsRouter);
app.use('/api/score', scoreRouter);
app.use('/api/table', tableRouter);
app.use('/api/game', gameRouter);

app.listen(port, function() {
  console.log('Server up on port:' + port);
});
