var express = require('express');
var cors = require('cors');
var Firebase = require('firebase');
var Users = new Firebase('https://leaena.firebaseio.com/users');
var Websites = new Firebase('https://leaena.firebaseio.com/websites');
var countRef = new Firebase('https://leaena.firebaseio.com/total_messages');

var app = express();
var id = 0;

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
    id = current_value + 1;
    console.log(id);
    return id;
  });
};

app.use(express.static(__dirname + '/app'));
app.use(express.bodyParser());

app.use(cors());
app.use(app.router);

app.get('/websites', function(req, res){
  Websites.on('value', function(snapshot) {
    var JSON = snapshot.val();
    var result = [];
    for (var i = 0; i < id; i++){
      obj = JSON[i];
      obj['ID'] = i;
      result.push(obj);
    }
    res.json(JSON);
  });
});

app.post('/websites', function(req, res){
    var url = req.body.url;
    if(websiteUnique(url)){
      Websites.child(id).set({URL: url});
      updateCount();
    }
    res.redirect('/');
});

app.use(function(req, res) {
    res.sendfile(__dirname + '/app/index.html');
});

var port = process.env.PORT || 3000;
app.listen(port, function(){
  console.log("listening on " + port);
});