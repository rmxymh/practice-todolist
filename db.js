var mongoose = require('mongoose');

require('./models/todo');
console.log("connect: initialize schema Todo");

module.exports.connect = function(callback) {
	mongoose.connect('mongodb://localhost/express-todo');
	return mongoose.connection
};
