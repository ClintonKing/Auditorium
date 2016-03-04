'use strict'

var data = {
	periods: [
		{
			name: "Spring 2016",
			users: [
				'andyroberson',
				'lindsaycarbonell',
				'brmayes'
				]
		}
	]
};

//exports function LIST then renders index.extension with data variable
exports.list = function(req, res) {
	res.render('index', data);
};

exports.create = function(req, res){
	res.send("Create working.");
};

exports.remove = function(req, res){
	res.send("Remove working.");
};

exports.update = function(req, res){
	res.send("Update working.");
};
