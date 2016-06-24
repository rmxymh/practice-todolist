var mongoose = require('mongoose');
var express = require('express');
var router = express.Router();

var Todo = mongoose.model('Todo');

/* GET home page. */
router.get('/', function(req, res) {
	Todo.find(function(err, todos, count) {
		console.log("GET /");
		res.render('index', {
			title: 'Express Todo Example',
			todos: todos
		});
	});
});

router.post('/create', function(req, res) {
	new Todo({
		content: req.body.content,
		updated_at: Date.now()
	}).save(function(err, todo, count) {
		res.redirect('/');
	});
});

module.exports = router;

