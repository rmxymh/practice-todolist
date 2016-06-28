var mongoose = require('mongoose');

mongoose.Promise = require('bluebird');

require('./models/todo');
require('./models/user');

module.exports.connect = function(callback) {
	mongoose.connect('mongodb://localhost/express-todo');
	return mongoose.connection
};
