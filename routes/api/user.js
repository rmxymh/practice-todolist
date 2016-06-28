var crypto = require('crypto');
var express = require('express');
var mongoose = require('mongoose');
var uuid = require('node-uuid');

var router = express.Router();

var User = mongoose.model('User');

router.post('/api/user', function(req, res) {
	var user = req.body.user;
	var secret = req.body.secret;

	if(user.length < 2) {
		res.status(403).send(JSON.stringify({
				error: "The length of username must be greater than 2 characters."
			}));
		return;
	}

	new User({
		user_id: user,
		secret: secret
	}).save(function(err, user, count) {
		var msg = "Success";
		if (err !== undefined) {
			var result = {
				success: err !== undefined,
				message: JSON.stringify(err),
			}
			res.send(JSON.stringify(result));
		} else {
			res.status(500).send(JSON.stringify({
				error: err
			}));
		}
	});
});

router.post('/api/user/auth', function(req, res) {
	var username = req.body.user;
	var challenge = req.body.challenge;
	
	User.find({ user_id: username } )
		.exec()
		.then(function(users) {
			var verify = null;

			if(users.length > 0) {
				var user = users[0];
				var data = user.secret + user.user_id + user.secret + user.user_id + user.secret;
				verify = crypto.createHash('sha256').update(data).digest('hex');

				console.log(verify);
				console.log(challenge);
			}

			var result = {
				status: "Success",
				token: "Token"
			};

			if(challenge !== undefined && verify !== undefined && verify === challenge) {
				// Generate a token
				result.token = uuid.v4();
				res.send(JSON.stringify(result));
			} else {
				result.status = "Forbidden";
				result.token = "";
				res.status(403).send(JSON.stringify(result));
			}


		})
});

module.exports = router;
