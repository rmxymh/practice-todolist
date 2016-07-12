var express = require('express');
var router = express.Router();

router.get('/login', function(req, res) {
	res.render('user', 
				{
					title: "Login",
					action: "Login",
					apiname: "login",
					useradd_link: true
			});
});

router.get('/useradd', function(req, res) {
	res.render('user', 
				{
					title: "Create a new user",
					action: "Create",
					apiname: "useradd",
					useradd_link: false
			});
});

module.exports = router;
