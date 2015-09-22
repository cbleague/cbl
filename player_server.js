var express = require('express');
var app = express();
var mongoose = require('mongoose');
var port = process.env.PORT || 3000;

mongoose.connect(process.env.MONGO_URL || 'mongodb://localhost/player_dev');

var playerRouter = require(__dirname + '/routes/player_routes');

app.use('/api/registerPlayer', playerRouter);
app.listen(port, function() {
  console.log('Server up on port:' + port);
});




