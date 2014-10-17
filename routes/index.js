var express = require('express');
var router = express.Router();
var request = require('request');
var fs = require('fs');

var simpleMock = function(url) {
	var arr = url.split('.');

	router.get(url, function(req, res) {
		res.render('.' + url, {});
	});
}


var simpleStatefulMock = function(url) {
	router.get(url, function(req, res) {

		var currentState = getState(url);
		res.render('.' + url + '/' + currentState, {});
	});
}


var getState = function(service) {
	var globalState = JSON.parse(fs.readFileSync("current-state.json", {encoding : "utf8"}));
	console.log(globalState);
	var state = globalState[service];
	console.log(state);
	return state;
};

//////////////////////////////////////////////////////////////////////////////////////////
// ROUTES
//////////////////////////////////////////////////////////////////////////////////////////

simpleMock('/products/books/freakonomics');
simpleStatefulMock('/shop/opening-hours');

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
	res.render('./foo', {});
});


router.get('/forward', function(req, res) {
	
	var newurl = 'https://gist.githubusercontent.com/Keeguon/2310008/raw/865a58f59b9db2157413e7d3d949914dbf5a237d/countries.json';
	request(newurl).pipe(res);
});



module.exports = router;
