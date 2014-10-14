var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
	res.render('index', { title: 'Express' });
});

router.get('/dbg', function(req, res) {
	res.render('index', { title: 'Dbg' });
});

router.get('/*', function(req, res) {
	console.log(req.path);
	res.render('index', { title: 'Hot Reloaded Star' });
});

module.exports = router;
