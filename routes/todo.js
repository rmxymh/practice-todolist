var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Todo = mongoose.model('Todo');

router.get('/todo', function(req, res) {
	if(req.user_id === undefined) {
		res.redirect("/login");
		res.end();
		return;
	}

	Todo.find({user_id: req.user_id })
		.sort('-updated_at')
		.exec(function(err, todos, count) {
			console.log("GET /");
			res.render('todo', {
					title: 'Express Todo Example',
					todos: todos,
					session: req.query.session
			});
		});
	console.log(req.query.session);
});

module.exports = router;

