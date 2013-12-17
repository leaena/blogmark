var express = require('express');
var http = require('http');
var cors = require('cors');
var jsdom = require('jsdom');
var Firebase = require('firebase');
var Users = new Firebase('https://leaena.firebaseio.com/users');
var Websites = new Firebase('https://leaena.firebaseio.com/websites');
var countRef = new Firebase('https://leaena.firebaseio.com/total_messages');

var app = express();
var databaseID = 0;

var websiteUnique = function(url){
  var unique = true;
  Websites.once('value', function(ss) {
    ss.forEach(function(childSnapshot) {
       var userID = childSnapshot.val().URL;
       if(userID === url){
         unique = false;
       }
    });
  });
  return unique;
};

var updateCount = function(){
  countRef.transaction(function(current_value) {
    databaseID = current_value + 1;
    return databaseID;
  });
};

var postWebsite = function(url, req, res){
  var title, text;
  jsdom.env(url, ["http://code.jquery.com/jquery.js"], function (errors, window) {
    console.log(errors);
    title = window.$("title").text();
    text = window.$('body').text();
    if(websiteUnique(url)){
      updateCount();
      Websites.child(databaseID-1).set({ID: databaseID-1, URL: url, TITLE: title, TEXT: text});
    }
    res.redirect('/');
    });
};

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
  var url = req.body.url;
  postWebsite(url, req, res);
});

// app.post('notes', function(req, res){
//   Websites.child(ID).child('notes'.set(notes);
// })

// app.post('/login', function(req, res){
//   var data = '';
//   req.on('data', function(chunk){
//     data += chunk;
//   });
//   console.log("data: ", data);
// });

app.use(function(req, res) {
    res.sendfile(__dirname + '/app/index.html');
});

var port = process.env.PORT || 3000;
app.listen(port, function(){
  console.log("listening on " + port);
});