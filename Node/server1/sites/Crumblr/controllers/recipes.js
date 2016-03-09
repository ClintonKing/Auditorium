var db = require('../config/db');

exports.list = function(req, res){
	//get collection from mongo database
	var collection = db.get().collection('recipes');
	//output collection as an array and render that array on user list page
	collection.find({}).sort({name: 1}).toArray(function(err, results){
		res.render('recipes/list', {recipes: results});
	});
};

exports.form = function(req, res){
	res.render('recipes/form');
};

exports.create = function(req, res){
	var collection = db.get().collection('recipes');

	//push new document with info pulled from parts of form
	collection.insert({
			name: req.body.name,
			prepTime: req.body.prepTime,
			servingSize: req.body.servingSize
	});

	//redirect to user list after form submission
	res.redirect('/recipes');
};

exports.remove = function(req, res){
	var collection = db.get().collection('recipes');

	//remove first document from collection that matches requested name
	collection.removeOne({
		name: req.params.id
	});

	//redirect to user list after query
	return res.redirect('/recipes');
};

exports.update = function(req, res){
	var collection = db.get().collection('recipes');

	//update only one document with info provided in form
	collection.updateOne(
		{name: req.params.id},
		{$set: {
			name: req.body.name,
			prepTime: req.body.prepTime,
			servingSize: req.body.servingSize
		}}
	);

	//redirect to user list after form submission
	res.redirect('/recipes');
};

exports.single = function(req, res){
	var collection = db.get().collection('recipes');

	//find document with requested name in collection, transform into array, then take first result in array and render it on 'single' template as var 'user'
	collection.find({"name": req.params.id}).limit(1).toArray(function(err, results){
		res.render('recipes/single', {recipe: results[0]});
	});
};
