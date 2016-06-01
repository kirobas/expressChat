var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/:controller/:action', function(req, res, next) {
	// console.log(req);
	res.render('user', { title: 'Module User', controller: req.params.controller, action: req.params.action });
 	// res.send('key = ' + req.key + ', value = ' + req.value);
});

module.exports = router;
