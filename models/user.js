var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
	user_id:	String,
	secret:     String
});

var User = mongoose.model('User', userSchema);
console.log("Initialize Schema User");

