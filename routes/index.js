var express = require('express');
var router = express.Router();

var lusers=[
	{ name: 'Linus Torvalds', so: 'Linux' },
	{ name: 'Bill Gates', so: 'Windows XP' }
];

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Ajax', lusers: lusers });
});

router.post('/ajaxservice/get', function(req, res, next) {
	// console.log(req);
	var data = [{ name: 'Peter', data: 'bla-bla'} , { name: 'Vasiliy', data: 'ps...'}];

	res.send(JSON.stringify(data));
	// res.send(req.body);
});

module.exports = router;
