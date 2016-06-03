var express = require('express');
var router = express.Router();
var crypto = require('crypto');

/* Registered users listing. */
var login = 'admin';
	password = '12345';

/* GET users listing. */
router.get('/', function(req, res, next) {
	if (req.cookies.authId == crypto.createHash('md5').update(login).update(password).digest('hex')) {
		res.render('login', { title: 'Приветствие', login: login, logged: true });
	} else {
		res.render('login', { title: 'Регистрационная форма', logged: false });
	}
});

router.post('/', function(req, res, next) {
	var hash = crypto.createHash('md5')
					.update(req.body.login)
					.update(req.body.password)
					.digest('hex');

	var hash1 = crypto.createHash('md5')
					.update(req.body.password)
					.update(req.body.login)
					.digest('hex');

	console.log('hash: ' + hash);
	console.log('hash1: ' + hash1);

	if (hash == crypto.createHash('md5').update(login).update(password).digest('hex')) {
		res.cookie('authId', hash, { maxAge: 900000, httpOnly: true });
		res.render('login', { title: 'Приветствие', login: req.body.login, logged: true });
	} else {
		// res.cookie('authId', false);
		res.render('login', { title: 'Ошибка авторизации', logged: false });
	}
	
 	// res.send('key = ' + req.key + ', value = ' + req.value);
});

module.exports = router;
