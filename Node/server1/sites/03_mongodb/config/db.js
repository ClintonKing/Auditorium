var MongoClient = require('mongodb').MongoClient;

//create empty object
var state = {
	db: null
};

//function that will export to index.js where db.js is called
exports.connect = function(url, callback){
	if (state.db) return callback();
	//connect is built in function, will use url passed to it
	MongoClient.connect(url, function(err, db){
		if (err) return callback(err);
		//anytime state.db is called will use db object
		state.db = db;
		callback();
	});
};

exports.get = function(){
	return state.db;
};

exports.close = function(callback){
	state.db.close(function(err, result){
		state.db = null;
		callback();
	});
};
