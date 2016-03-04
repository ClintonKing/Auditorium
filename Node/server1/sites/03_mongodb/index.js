var express = require('express');
var app = express();

app.set('view engine', 'jade');

//sets up path to automatically route static assett calls
app.use(express.static('public'));
//sets up seperate directory route for calls to static  bower components
app.use('/bower_components', express.static(__dirname + '/bower_components'));

app.get('/', function(req, res){
	res.render('index');
});




app.listen(8080, function(){
	console.log("listening on 8080");
});
