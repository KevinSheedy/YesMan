module.exports = {
	start : function(appPath){
		console.log('YesMan!!!!!!!');
		var debug = require('debug')('myapp');
		require('./js/globals').appPath = appPath + '/';
		var app = initExpressApp(appPath);
		//var userApp = require(appPath + '/' + 'plugins');
		//userApp(app);

		app.set('port', process.env.PORT || 3000);

		var server = app.listen(app.get('port'), function() {
			debug('Express server listening on port ' + server.address().port);
		});
	}
}

function initExpressApp() {

	var express = require('express');
	var path = require('path');
	var favicon = require('serve-favicon');
	var logger = require('morgan');
	var cookieParser = require('cookie-parser');
	var bodyParser = require('body-parser');

	var routes = require('./routes/index');
	var users = require('./routes/users');

	var app = express();

	// view engine setup
	app.set('views', path.join(__dirname, 'views'));
	app.set('view engine', 'jade');

	// uncomment after placing your favicon in /public
	//app.use(favicon(__dirname + '/public/favicon.ico'));
	app.use(logger('dev'));
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({ extended: false }));
	app.use(cookieParser());
	app.use(express.static(path.join(__dirname, 'public')));

	app.use('/', routes);
	app.use('/users', users);




	// Routes setup has to be done here!!!
	var appPath = require('./js/globals').appPath;
	var plugins = require(appPath + '/plugins');
	plugins(app, module);

	// catch 404 and forward to error handler
	app.use(function(req, res, next) {
		var err = new Error('Not Found');
		err.status = 404;
		next(err);
	});
	// error handlers

	// development error handler
	// will print stacktrace
	if (app.get('env') === 'development') {
		app.use(function(err, req, res, next) {
			res.status(err.status || 500);
			res.render('error', {
				message: err.message,
				error: err
			});
		});
	}

	// production error handler
	// no stacktraces leaked to user
	app.use(function(err, req, res, next) {
		res.status(err.status || 500);
		res.render('error', {
			message: err.message,
			error: {}
		});
	});

	return app;

}