module.exports = function(app, yesmanModule){
	console.log('\nLoading plugins...');

	var express = yesmanModule.require('express');
	var router = express.Router();

	/* GET users listing. */
	router.get('/', function(req, res) {
		res.send('respond with a userapp');
	});

	app.use('/userapp', router);
}