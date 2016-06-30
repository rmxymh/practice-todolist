// TODO: We need other DB to save session data
var mongoose = require('mongoose');

var sessionSchema = mongoose.Schema({
	user_id:	String,
	key:    	String
});

var Session = mongoose.model('Session', sessionSchema);
console.log("Initialize Schema Session");

