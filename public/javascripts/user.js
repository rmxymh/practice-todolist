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
			console.log(data);
			resp = JSON.parse(data);
			User.login(username, password);
		},
		error: function(data) {
			console.log(data);
			resp = JSON.parse(data.responseText);
			console.log(resp.error);
			$("#errorMsg").html(resp["error"]);
			$("#errorMsg").show();
		}
	});
};

function login() {
	var name = $("#username").val();
	var pass = $("#password").val();

	User.login(name, pass);
	return false;
}

function useradd() {
	var name = $("#username").val();
	var pass = $("#password").val();

	User.create(name, pass);
	return false;
}

