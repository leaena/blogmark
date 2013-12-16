var express = require('express');
var cors = require('cors');
var Firebase = require('firebase');
var Users = new Firebase('https://leaena.firebaseio.com/users');
var Websites = new Firebase('https://leaena.firebaseio.com/websites');
Websites.set("hello world!");

var app = express();

app.use(express.static(__dirname + '/app'));
app.use(express.bodyParser());

app.use(cors());
app.use(app.router);

app.get('/websites', function(req, res){
  Websites.on('value', function(snapshot) {
    var JSON = snapshot.val();
    res.json(JSON);
  });
});

app.post('/websites', function(req, res){
    console.log(req.body.url);
    Websites.push({URL: req.body.url});
    res.redirect('/');
});

var port = process.env.PORT || 3000;
app.listen(port, function(){
  console.log("listening on " + port);
});