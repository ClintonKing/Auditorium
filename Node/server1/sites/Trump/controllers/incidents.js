var db = require('../config/db');

exports.list = function(req, res){
	//get collection from mongo database
	var collection = db.get().collection('incidents');
	//output collection as an array and render that array on user list page
	collection.find({}).sort({name: 1}).toArray(function(err, results){
		res.render('incidents/list', {incidents: results});
	});
};

exports.form = function(req, res){
	res.render('incidents/form');
};

exports.create = function(req, res){
	var collection = db.get().collection('incidents');

	//push new document with info pulled from parts of form
	collection.insert({
			name: req.body.name,
			location: req.body.location,
			date: req.body.date,
			type: req.body.type,
			video: "https://youtu.be/" + req.body.video,
			img: "http://img.youtube.com/vi/" + req.body.video + "/hqdefault.jpg",
			description: req.body.description
	});

	//redirect to user list after form submission
	res.redirect('/incidents');
};

exports.remove = function(req, res){
	var collection = db.get().collection('incidents');

	//remove first document from collection that matches requested name
	collection.removeOne({
		name: req.params.id
	});

	//redirect to user list after query
	return res.redirect('/incidents');
};

exports.update = function(req, res){
	var collection = db.get().collection('incidents');

	//update only one document with info provided in form
	collection.updateOne(
		{name: req.params.id},
		{$set: {
			name: req.body.name,
			location: req.body.location,
			date: req.body.date,
			type: req.body.type,
			video: req.body.video,
			description: req.body.description
		}}
	);

	//redirect to user list after form submission
	res.redirect('/incidents');
};

exports.single = function(req, res){
	var collection = db.get().collection('incidents');

	//find document with requested name in collection, transform into array, then take first result in array and render it on 'single' template as var 'user'
	collection.find({"name": req.params.id}).limit(1).toArray(function(err, results){
		res.render('incidents/single', {incident: results[0]});
	});
};
