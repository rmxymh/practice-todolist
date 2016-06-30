var mongoose = require('mongoose');

mongoose.Promise = require('bluebird');

require('./models/todo');
require('./models/user');
require('./models/session');

module.exports.connect = function(callback) {
	mongoose.connect('mongodb://localhost/express-todo');
	return mongoose.connection
};
