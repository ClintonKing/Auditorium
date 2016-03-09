var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var db = require('./config/db');
var users = require('./controllers/users');


//connects to mongo port and specified mongo database (in this case 'test')
db.connect('mongodb://localhost:27017/test', function(){
	console.log("MongoDB connected...");
});

//set parser to parse different data types
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
//set desired viewengine
app.set('view engine', 'jade');

//get template for homepage
app.get('/', function(req, res){
	res.render('index');
});

//get 'list' function from users.js and run on /users url
app.get('/users', users.list);

//get user creation form template and function for pusing new users to collection
app.get('/users/form', users.form);
app.post('/users', users.create);

//functions for updating and displaying single documents
app.post('/users/:id', users.update);
app.get('/users/:id', users.single);

//function for deleting single documents
app.get('/users/delete/:id', users.remove);

//sets up path to automatically route static assett calls
app.use('/', express.static(__dirname + '/public'));
//sets up seperate directory route for calls to static  bower components
app.use('/bower_components', express.static(__dirname + '/bower_components'));


app.listen(8080, function(){
	console.log("listening on 8080");
});
