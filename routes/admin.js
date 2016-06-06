var express = require('express');
var router = express.Router();
var connection = require('../config/db');

router.get('/', function(req, res, next) {
	connection.query("SELECT * FROM user", function(err, rows, fields) {
		if(err) throw err;
		var lusers = [];
		for (var i = 0; i < rows.length; i++) {
			lusers.push(rows[i]);
		}
		res.render('admin', {title: 'expressChat', lusers: lusers});
	});
});

module.exports = router;
