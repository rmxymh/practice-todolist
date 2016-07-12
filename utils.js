var mongoose = require('mongoose');
var Session = mongoose.model('Session');

exports.apiUnauthorized = function(res) {
	if(res !== undefined) {
		res.status(401)
		   .json({ error: "You are not authorized for the claimed resource."})
		   .end();
	}
};

exports.forbidden = function(res) {
	res.status(403);
	res.render('error', {
		message: 'Forbidden',
		error: 'The requested resource is forbidden.'
	});
};

exports.sessionChecker = function(req, res, next) {
	var key = req.query.session;

	Session.findOne({key: key})
		   .exec()
		   .then(function(session) {
			   if(session.key == key) {
				   req.user_id = session.user_id;
			   }
			   if(next !== undefined) {
			       next();
			   }
		   })
		   .catch(function(err) {
			   if(next !== undefined) {
			       next();
			   }
		   });
};

