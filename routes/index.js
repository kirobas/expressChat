var express = require('express');
var router = express.Router();

var lusers=[
	{ name: 'Linus Torvalds', so: 'Linux' },
	{ name: 'Bill Gates', so: 'Windows XP' }
];

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Ajax', lusers: lusers });
// });

router.get('/', function(req, res, next) {
	var sess = req.session;
	if (sess.views) {
		sess.views++;
		console.log(sess);
		res.setHeader('Content-Type', 'text/html;charset=UTF-8');
		res.write('<p><strong>views:</strong> ' + sess.views + '</p>');
		res.write('<p><strong>expires in:</strong> ' + sess.cookie.originalMaxAge / 1000 + 's (' + sess.cookie._expires + ')</p>');
		res.end();
	} else {
		sess.views = 1;
		res.end('welcome to the session demo, refresh! id = ' + req.session.id)
	}
});

router.post('/ajaxservice/get', function(req, res, next) {
	// console.log(req);
	var data = [{ name: 'Peter', data: 'bla-bla'} , { name: 'Vasiliy', data: 'ps...'}];

	res.send(JSON.stringify(data));
	// res.send(req.body);
});

module.exports = router;
