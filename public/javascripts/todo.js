/*
 * Dependency: 
 * 1. jQuery.js
 */

// Utility: from http://stackoverflow.com/questions/901115/how-can-i-get-query-string-values-in-javascript
function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}


var Todo = {}

Todo.create = function(content, session) {
	$.ajax({
		type: "POST",
		url: "/api/todo?session=" + session,
		data: {
			content: content
		},
		success: function(data) {
			window.location.replace("todo?session=" + session);
		},
		error: function(data) {
			alert("Failed to add a new todo item.");
			window.location.replace("todo?session=" + session);
		}
	});
}

Todo.modify = function(id, content, session) {
	$.ajax({
		type: "PUT",
		url: "/api/todo/" + id + "?session=" + session,
		data: {
			content: content
		},
		success: function(data) {
			window.location.replace("todo?session=" + session);
		},
		error: function(data) {
			alert("Failed to add a new todo item.");
			window.location.replace("todo?session=" + session);
		}
	});
}

Todo.delete = function(id, session) {
	$.ajax({
		type: "DELETE",
		url: "/api/todo/" + id + "?session=" + session,
		success: function(data) {
			window.location.replace("todo?session=" + session);
		},
		error: function(data) {
			alert("Failed to remove a new todo item.");
			window.location.replace("todo?session=" + session);
		}
	});
}


function createTodoItem() {
	var content = $("#todoContent").val();
	var session = getParameterByName("session");

	Todo.create(content, session);
}

function deleteTodoItem(id) {
	var session = getParameterByName("session");

	Todo.delete(id, session);
}

function modifyTodoItem() {
	var content = $("#modTodoContent").val();
	var id = $("#modTodoItemId").val();
	var session = getParameterByName("session");

	Todo.modify(id, content, session);
}

function logout() {
	var session = getParameterByName("session");
	$.ajax({
		type: "DELETE",
		url: "/api/user/auth?session=" + session,
		success: function(data) {
			window.location.replace("/login");
		},
		error: function(data) {
			window.location.replace("/login");
		}
	});
}
