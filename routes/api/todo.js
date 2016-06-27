var mongoose = require('mongoose');
var express = require('express');
var router = express.Router();

var Todo = mongoose.model('Todo');

// Create
router.post('/api/todo', function(req, res) {
	new Todo({
		user_id: req.cookies.user_id,
		content: req.body.content,
		updated_at: Date.now()
	}).save(function(err, todo, count) {
		var msg = "Success";
		if (err !== undefined) {
			msg = JSON.stringify(err);
		}

		var result = {
				success: err !== undefined,
				message: msg
			}
		res.send(JSON.stringify(result));

	});
});

// READ
router.get('/api/todo', function(req, res) {
	var user_id = req.cookies ? req.cookies.user_id : undefined;

	Todo.find({ user_id: user_id } ).
		 sort('-updated_at').
		 exec(function(err, todos, count) {
			 var items = [];
			 todos.forEach(function(todo) {
				 var item = {
					 id: todo._id,
					 content: todo.content,
					 update: todo.updated_at
				 };
				 items.push(item);
			 });

			 var result = {
				 count: items.length,
				 todos: items
		     };
			 res.send(JSON.stringify(result));
	});
});

router.get('/api/todo/:id', function(req, res) {
	var user_id = req.cookies ? req.cookies.user_id : undefined;

	Todo.find({ user_id: user_id, _id: req.params.id.toString() })
		.sort('-updated_at')
		.exec()
		.then(function(todos) {
			 var items = [];
			 if(todos !== undefined) {
			 	todos.forEach(function(todo) {
					 var item = {
						 id: todo._id,
						 content: todo.content,
						 update: todo.updated_at
					 };
					 items.push(item);
			 	});
			 }

			 var result = {
				 count: items.length,
				 message: "Success",
				 todos: items
		     };
			 res.send(JSON.stringify(result));
		})
       .catch(function(err) {
			 var result = {
				 count: 0,
				 message: err,
				 todos: []
		     };
			 res.send(JSON.stringify(result));
		});
});

// Update
router.put('/api/todo/:id', function(req, res) {
	var user_id = req.cookies ? req.cookies.user_id : undefined;

	Todo.findById(req.params.id, function(err, todo) {
		var user_id = req.cookies ? req.cookies.user_id : undefined;

		if( todo.user_id !== req.cookies.user_id) {
			var result = {
					success: false,
					message: "Forbidden"
				}
			res.send(JSON.stringify(result));
			return;
		}

		todo.content = req.body.content;
		todo.updated_at = Date.now();
		todo.save(function(err, todo, count) {
			var msg = "Success";
			if (err !== undefined) {
				msg = JSON.stringify(err);
			}

			var result = {
					success: err !== undefined,
					message: msg
				}
			res.send(JSON.stringify(result));

		});
	});
});

// Delete
router.delete('/api/todo/:id', function(req, res) {
	Todo.findById( req.params.id, function(err, todo) {
		var user_id = req.cookies ? req.cookies.user_id : undefined;

		if( todo.user_id !== req.cookies.user_id) {
			var result = {
					success: false,
					message: "Forbidden"
				}
			res.send(JSON.stringify(result));
			return;
		}

		todo.remove(function(err, todo) {
			var msg = "Success";
			if (err !== undefined) {
				msg = JSON.stringify(err);
			}

			var result = {
					success: err !== undefined,
					message: msg
				}
			res.send(JSON.stringify(result));

		});
	});
});

module.exports = router;

