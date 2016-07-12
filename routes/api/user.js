var crypto = require('crypto');
var express = require('express');
var mongoose = require('mongoose');
var uuid = require('node-uuid');
var utils = require('../../utils');

var router = express.Router();

var User = mongoose.model('User');
var Session = mongoose.model('Session');

router.post('/api/user', function(req, res) {
	var user = req.body.user;
	var secret = req.body.secret;

	if(user.length < 2) {
		res.status(403).send(JSON.stringify({
				error: "The length of username must be greater than 2 characters."
			}));
		return;
	}

	User.find({ user_id: user } )
		.exec()
		.then(function(users) {
			var verify = null;

			if(users.length > 0) {
				console.log(users);
				res.status(409).send(JSON.stringify({
					error: "User " + user + " has been created."
				}));
				res.end();
			} else {
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
						res.end();
					} else {
						res.status(500).send(JSON.stringify({
							error: err
						}));
						res.end();
					}
				});
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
			}

			var result = {
				status: "Success",
				token: "Token"
			};

			if(challenge !== undefined && verify !== undefined && verify === challenge) {
				// Generate a token
				result.token = uuid.v4();

				// Update the session
				Session.update({user_id: username},
							   {user_id: username, key: result.token},
							   {upsert: true},
							   function(err) {
								   if(err) {
									   console.log("Failed to setup a session: ", err);
									   result.status = "Failed to setup the session.";
									   result.token = "";
									   res.status(500).send(JSON.stringify(result));
									   res.end();
								   }
								   else {
										res.send(JSON.stringify(result));
										res.end();
								   }
							   });
			} else {
				result.status = "Forbidden";
				result.token = "";
				res.status(403).send(JSON.stringify(result));
				res.end();
			}
		})
});

router.delete('/api/user/auth', function(req, res) {
	var key = req.query.session;

	Session.findOne({key: key})
		   .exec()
		   .then(function(session) {
			   if(session.key == key) {
		           Session.remove({ user_id: session.user_id },
				   				  function(err, removed) {
			           					res.status(200).end();
		           				});
			   }
		   })
		   .catch(function(err) {
			    console.log(err);
				res.status(500).end();
		   });


});

module.exports = router;
