var utils = require('../utils');
var uuid = require('node-uuid');

var mongoose = require('mongoose');
var express = require('express');
var router = express.Router();

var Todo = mongoose.model('Todo');

/* GET home page. */
router.get('/', function(req, res) {
	res.redirect('/todo');
	res.end();
});

module.exports = router;
