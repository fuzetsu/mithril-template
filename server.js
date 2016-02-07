var express = require('express');
var app = express();

var ENV = process.env.NODE_ENV || 'development';
var clientDir = __dirname + '/client';

// setup reload server
if(ENV === 'development') {
  console.log('DEV: starting livereload');
  var livereload = require('livereload');
  var reloadServer = livereload.createServer();
  reloadServer.watch(clientDir);
}

app.use(express.static(clientDir));

app.get('/*', function(req, res) {
    res.sendFile(clientDir + '/index.html');
});

app.listen(8080);
