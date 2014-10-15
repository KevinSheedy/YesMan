var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
	res.render('index', { title: 'YesMan' });
});



router.get('/customer/:id', function(req, res) {
	
	//res.render('index', { title: 'Hot Reloaded grunt' });
	res.render('customer', {
		id: req.params.id,
		firstName: "Kevin",
		lastName: "Sheedy"
	});
});

router.get('/foo', function(req, res) {
	
	//res.render('index', { title: 'Hot Reloaded grunt' });
	res.render('foo', {});
});



module.exports = router;
