var express = require('express');
var router = express.Router();
var crypto = require('crypto');
var connection = require('../config/db');

router.get('/', function(req, res, next) {
	var lusers = [];
	connection.query("SELECT * FROM user", function(err, rows, fields) {
		if(err) throw err;
		for (var i = 0; i < rows.length; i++) {
			lusers.push(rows[i]);
		}
	});

	if (req.cookies.authId && req.cookies.login) {
		var sql = "SELECT * FROM user WHERE user.login = '" + req.cookies.login + "';"
		connection.query( sql , function(err, rows, fields) {
			if((err) || (rows.length != 1)) throw err;
			
			if (req.cookies.authId == crypto.createHash('md5').update(rows[0].login).update(rows[0].password).digest('hex')) {
				res.render('chat', { title: 'expressChat', subTitle: 'Добро пожаловать в чат', login: req.body.login, logged: true, lusers: lusers });
			} else {
				res.render('chat', { title: 'expressChat', subTitle: 'Ошибка авторизации', logged: false });
			}

		});
	} else {
		res.render('chat', { title: 'expressChat', subTitle: 'Немедленно авторизуйтесь в чате!', logged: false });
	}
});

router.post('/', function(req, res, next) {

	var sql = "SELECT * FROM user WHERE user.login = '" + req.body.login + "';"
	connection.query( sql , function(err, rows, fields) {
		if((err) || (rows.length != 1)) throw err;

			var hash = crypto.createHash('md5')
							.update(rows[0].login)
							.update(rows[0].password)
							.digest('hex');
			var hashRemote = crypto.createHash('md5')
							.update(req.body.login)
							.update(req.body.password)
							.digest('hex');

		if (hash == hashRemote) {

			var lusers = [];
			connection.query("SELECT * FROM user", function(err, rows, fields) {
				if(err) throw err;
				for (var i = 0; i < rows.length; i++) {
					lusers.push(rows[i]);
				}
			});

			res.cookie('authId', hash, { maxAge: 900000, httpOnly: true });
			res.cookie('login', req.body.login, { maxAge: 900000, httpOnly: true });
			res.render('chat', { title: 'expressChat', subTitle: 'Добро пожаловать в чат', login: req.body.login, logged: true, lusers: lusers });
		} else {
			// res.cookie('authId', false);
			res.render('index', { title: 'expressChat', subTitle: 'Ошибка авторизации', logged: false });
		}
	});
});

module.exports = router;
