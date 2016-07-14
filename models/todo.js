var mongoose = require('mongoose');

var todoSchema = mongoose.Schema({
	user_id:	String,
	content:	String,
	comment:	String,
	updated_at:	Date
});

var Todo = mongoose.model('Todo', todoSchema);
console.log("Initialize Schema Todo");
