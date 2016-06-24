exports.forbidden = function(res) {
	res.status(403);
	res.render('error', {
		message: 'Forbidden',
		error: 'The requested resource is forbidden.'
	});
};
