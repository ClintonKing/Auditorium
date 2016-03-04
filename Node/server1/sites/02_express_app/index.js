// var http = require('http');
var express = require('express');
var users = require('./controllers/users.js');
var app = express();

//chooses which view engine to use for parsing html template views
app.set('view engine', 'jade');

//sets up path to static file directories like /img, /css, etc.
app.use(express.static('public'));
app.use('/bower_components', express.static(__dirname + '/bower_components'));
//function to create a response when the user requests root
app.get('/', users.list);

app.get('/second', function(req, res){
	res.render('second');
});

// requests function or  pages that run at root urls
app.get('/list', users.list);
app.get('/create', users.create);
app.get('/remove', users.remove);
app.get('/update', users.update);
// app.get('/adele', function(req, res){
//   res.send("HELLO.<br>IT'S ME.");
// });


//THIS STARTS THE SERVER!
app.listen(8080, function(){
  console.log("listening on 8080");
});
