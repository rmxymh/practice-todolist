/*
 * Dependency: 
 * 1. sha256.js
 * 2. jQuery.js
 */

var User = {}

User.login = function(username, password) {
	var secret = Sha256.hash(password);
	var data = secret + username + secret + username + secret;
	var challenge = Sha256.hash(data);

	$.ajax({
		type: "POST",
		url: "/api/user/auth",
		data: {
			user: username,
			challenge: challenge
		},
		success: function(data) {
			console.log("Success");
			resp = JSON.parse(data);
			console.log(resp["status"]);
			console.log(resp["token"]);

			window.location.replace("todo?session=" + resp["token"]);
		},
		error: function(data) {
			$("#errorMsg").html("Invalid username or password.");
			$("#errorMsg").show();
		}
	});
};

User.create = function(username, password) {
	var secret = Sha256.hash(password);
	console.log(secret);

	$.ajax({
		type: "POST",
		url: "/api/user",
		data: {
			user: username,
			secret: secret
		},
		success: function(data) {
			console.log("Success");
			console.log(data);
		}
	});
};

function login() {
	var name = $("#username").val();
	var pass = $("#password").val();

	User.login(name, pass);
}
