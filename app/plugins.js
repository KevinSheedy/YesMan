module.exports = function(app){
	console.log('Load plugins...:');

	var express = require('express');
	var router = express.Router();

	/* GET users listing. */
	router.get('/', function(req, res) {
		res.send('respond with a userapp');
	});

	app.use('/userapp', router);
}