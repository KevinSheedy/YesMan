module.exports = {
	start : function(appPath){
		console.log('YesMan!!!!!!!');
		var debug = require('debug')('myapp');
		var app = require('./express-app');
		var userApp = require(appPath + '/' + 'plugins');
		userApp(app);

		app.set('port', process.env.PORT || 3000);

		var server = app.listen(app.get('port'), function() {
			debug('Express server listening on port ' + server.address().port);
		});
	}
}