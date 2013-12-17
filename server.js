var express = require('express');
var http = require('http');
var cors = require('cors');
var jsdom = require('jsdom');
var Firebase = require('firebase');
var Users = new Firebase('https://leaena.firebaseio.com/users');
var Websites = new Firebase('https://leaena.firebaseio.com/websites');
var countRef = new Firebase('https://leaena.firebaseio.com/count');

var app = express();

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

var postWebsite = function(url, res){
  var title, text;
  jsdom.env(url, ["http://code.jquery.com/jquery.js"], function (errors, window) {
    console.log(errors);
    title = window.$("title").text();
    text = window.$('body').text();
    if(websiteUnique(url)){
      var count;
      countRef.once('value', function(ss) {
        count = ss.val() || 0;
        countRef.set(count+1);
        Websites.child(count).set({ID: count, URL: url, TITLE: title, TEXT: text});
        res.redirect('/');
      });
    }
    
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
  postWebsite(url, res);
});

app.post('/notes', function(req, res){
  var notes = req.body.notes;
  var ID = req.body.user_id;
  Websites.child(ID).child('notes').set(notes);
  res.redirect('/bookmarks');
});
  
  

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