var express = require('express');
var router = express.Router();
var request = require('request');
var fs = require('fs');
var extend = require('node.extend');
var _ = require('underscore');
var appPath = require('../js/globals').appPath;
var config = require(appPath + '/config');
var routes = require('../js/routes-lookup').all();
var util = require('../js/util');
var getIntersection = require('../js/get-intersection');
var getState = require('../js/get-state');
var responseBuilder = require('../js/response-builder');

//var yesmanTest = require('../test/yesman-test');


var simpleGET = function(url) {

	router.get(url, function(req, res) {
		res.render('.' + url, req.params);
	});
}

var simplePOST = function(url) {


	router.post(url, function(req, res) {

		var model = extend(true, req.params, req.body);
		res.render("." + url, model);
	});
}


var simpleStatefulMock = function(url) {
	router.get(url, function(req, res) {

		var currentState = getState(url);
		res.render('.' + url + '/' + currentState, {});
	});
}




//////////////////////////////////////////////////////////////////////////////////////////
// ROUTES
//////////////////////////////////////////////////////////////////////////////////////////

simpleGET('/foo');
//simpleGET('/account');
//simplePOST('/customer');
simpleGET('/products/books/freakonomics');
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

router.get('/forward', function(req, res) {
	
	var newurl = 'https://gist.githubusercontent.com/Keeguon/2310008/raw/865a58f59b9db2157413e7d3d949914dbf5a237d/countries.json';
	request(newurl).pipe(res);
});


_.each(routes, initRouteHandler);

function initRouteHandler(service, url) {
	
	if(_.contains(service.verbs, "GET")) {
		initGETjson(service, url);
	}
	
	if(_.contains(service.verbs, "POST")) {
		initPOSTjson(service, url);
	}
}

function initGETjson(service, url) {

	router.get(url, function(req, res) {

		var state = getState(url);
		var stateConfig = service.states[state];

		res.set('Content-Type', 'application/json');
		res.status(stateConfig.httpStatus);

		var response = responseBuilder(url, req.body);

		res.send(response);
	});
}

function initPOSTjson(service, url) {

	router.post(url, function(req, res) {

		var state = getState(url);
		var stateConfig = service.states[state];

		res.set('Content-Type', 'application/json');
		res.status(stateConfig.httpStatus);

		var response = responseBuilder(url, req.body);

		res.send(response);
	});
}


module.exports = router;
