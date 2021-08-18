var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var mysql = require('mysql');
var formidable = require('formidable');
var fs = require('fs');

var app = express();
app.set('port', process.env.PORT || 1004);

app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());
app.use(bodyParser.json({
  type: 'application/vnd.api+json'
}));

app.use(express.static(path.join(__dirname, 'public')));

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use(function(req, res, next) {
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.get('/', function(req, res) {
  res.render(__dirname + '/pages/transactionlist1.html');
})

app.post('/fetchVideos', function(req, res) {
  var fetchVideos = require('./fetch_videos.js');
  fetchVideos.fetchVideos(req, res);
})

app.post('/fetch3d', function(req, res) {
  var fetch3d = require('./fetch_3d.js');
  fetch3d.fetch3d(req, res);
})


var http = require('http');

var server = http.createServer(app);

server.listen(app.get('port'), '0.0.0.0', function() {
  console.log('Express server listening on port ' + app.get('port'));
});