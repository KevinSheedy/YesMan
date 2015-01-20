var fs = require('fs');
var globals = require('./globals');
var extend = require('node.extend');
var _ = require('underscore');

var cache = {
	diffs : {},
	templates : {},
	models : {},
	views : {},
	forwards : null,
	scenarios : null
};


var util = {

	getDiff : function(path) {

		if(cache.diffs[path]) {
			return cache.diffs[path];
		}

		var model = {};
		var path = globals.appPath + '/' + 'diffs'  + path;
		
		if(fs.existsSync(path)) {
			model = JSON.parse(fs.readFileSync(path, {encoding : "utf8"}));
		}

		cache.diffs[path] = model;
		return model;
	},

	getTemplate : function (path) {

		if(cache.templates[path]) {
			return cache.templates[path];
		}

		var model = {};
		var path = globals.appPath + '/' + 'templates'  + path;
		
		if(fs.existsSync(path)) {
			model = JSON.parse(fs.readFileSync(path, {encoding : "utf8"}));
		}

		cache.templates[path] = model;
		return model;
	},

	getModel : function(path) {

		if(cache.models[path]) {
			return cache.models[path];
		}

		var model = {};
		var path = globals.appPath + '/' + 'models'  + path;
		
		if(fs.existsSync(path)) {
			model = JSON.parse(fs.readFileSync(path, {encoding : "utf8"}));
		}

		cache.models[path] = model;
		return model;
	},

	getState : function(scenarioName, url) {

		if(!cache.scenarios) {
			var path = globals.appPath + '/' + 'scenarios.json';
			cache.scenarios = JSON.parse(fs.readFileSync(path, {encoding : "utf8"}));
			
		}

		return cache.scenarios[scenarioName][url];
	},

	getForwards : function() {
		if(!cache.forwards) {
			var path = globals.appPath + '/' + 'services.json';
			cache.forwards = JSON.parse(fs.readFileSync(path, {encoding : "utf8"})).forwards;
		}

		return cache.forwards;
	}
}

module.exports = util;

