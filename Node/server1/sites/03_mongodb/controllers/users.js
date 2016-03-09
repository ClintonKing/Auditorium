var db = require('../config/db');

exports.list = function(req, res){
	//get collection from mongo database
	var collection = db.get().collection('users');
	//output collection as an array and render that array on user list page
	collection.find({}).sort({name: 1}).toArray(function(err, results){
		res.render('users/list', {users: results});
	});
};

exports.form = function(req, res){
	res.render('users/form');
};

exports.create = function(req, res){
	var collection = db.get().collection('users');

	//push new document with info pulled from parts of form
	collection.insert({
			userName: req.body.userName,
			name: req.body.name,
			link: req.body.link
	});

	//redirect to user list after form submission
	res.redirect('/users');
};

exports.remove = function(req, res){
	var collection = db.get().collection('users');

	//remove first document from collection that matches requested name
	collection.removeOne({
		userName: req.params.id
	});

	//redirect to user list after query
	return res.redirect('/users');
};

exports.update = function(req, res){
	var collection = db.get().collection('users');

	//update only one document with info provided in form
	collection.updateOne(
		{userName: req.params.id},
		{$set: {
			userName: req.body.userName,
			name: req.body.name,
			link: req.body.link
		}}
	);

	//redirect to user list after form submission
	res.redirect('/users');
};

exports.single = function(req, res){
	var collection = db.get().collection('users');

	//find document with requested name in collection, transform into array, then take first result in array and render it on 'single' template as var 'user'
	collection.find({"userName": req.params.id}).limit(1).toArray(function(err, results){
		res.render('users/single', {user: results[0]});
	});
};
