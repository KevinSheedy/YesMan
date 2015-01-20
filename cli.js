#!/usr/bin/env node

'use strict';

process.title = 'yesman';
var debug = require('debug');
var wrench = require('wrench');

debug('YesMan Cli...');

var commands = {
	help : function() {
		console.log("usage: yesman <command> [<args>]")
		console.log("")
		console.log("   help");
		console.log("   init    Create an empty YesMan project");
		console.log("   start   Start the YesMan server");

	},
	init : function(appName) {
		debug('init handler');
		appName = appName || 'yesman';

		console.log('Creating yesman instance [' + appName + ']');

		var appDir = __dirname + '/app';
		var outDir = process.cwd() + '/' + appName;

		wrench.copyDirSyncRecursive(appDir, outDir, {});

	},
	start : function(appPath) {

		appPath = appPath || process.cwd();

		var yesman = require('./exports');
		console.log(appPath);
		yesman.start(appPath);
	}
}

function main() {
	var command = process.argv[2] || 'help';
	var args = process.argv.slice(3) || [];

	debug('Command: ' + command);	

	var handler = commands[command];

	if(!handler)
		process.exit(1); 

	handler.apply(null, args);

}

main();