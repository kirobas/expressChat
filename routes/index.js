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
	res.render('index', {title: 'expressChat'});
});

module.exports = router;
