var fs = require('fs');
var globals = require('./globals');
var APP_PATH = globals.appPath;
var glob = require('glob');
var extend = require('node.extend');
var _ = require('underscore');
var defaultServiceConfig = require(APP_PATH + 'default-service-config.json');
var jsonCascade = require('json-cascade');

var cache = {
	  diffs : {}
	, templates : {}
	, models : {}
	, views : {}
	, rawServiceConfigs : {}
	, serviceTemplates : {}
	, serviceConfigs : {}
	, services : null
	, forwards : null
	, scenarios : null
};


var util = {

	getDiff : function(path) {

		if(cache.diffs[path]) {
			return cache.diffs[path];
		}

		var model = {};
		var path = APP_PATH + 'diffs'  + path;
		
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
		var path = APP_PATH + 'templates'  + path;
		
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
		var path = APP_PATH + 'models'  + path;
		
		if(fs.existsSync(path)) {
			model = JSON.parse(fs.readFileSync(path, {encoding : "utf8"}));
		}

		cache.models[path] = model;
		return model;
	},

	getState : function(scenarioName, url) {

		if(!cache.scenarios) {
			var path = APP_PATH + 'scenarios.json';
			cache.scenarios = JSON.parse(fs.readFileSync(path, {encoding : "utf8"}));
			
		}

		return cache.scenarios[scenarioName][url];
	},

	getForwards : function() {
		if(!cache.forwards) {
			var path = APP_PATH + 'services.json';
			cache.forwards = JSON.parse(fs.readFileSync(path, {encoding : "utf8"})).forwards;
		}

		return cache.forwards;
	},

	getServices : function() {
		if(!cache.services) {
			var path = APP_PATH + 'services.json';
			cache.services = JSON.parse(fs.readFileSync(path, {encoding : "utf8"})).services;
		}

		return cache.services;
	},

	getServiceDir : function(url) {
		return util.getServices()[url];
	},

	getRawServiceConfig : function(serviceDir) {

		if(!cache.rawServiceConfigs[serviceDir]) {
			var searchPath = APP_PATH + 'services/' + serviceDir + '/*-config.json';
			var filePath = glob.sync(searchPath)[0];
			cache.rawServiceConfigs[serviceDir] = loadJson(filePath);
		}

		return cache.rawServiceConfigs[serviceDir];
	},

	getServiceTemplate : function(serviceDir, templateName) {

		if(!cache.serviceTemplates[serviceDir]) {

			if(templateName) {
				var templatePath = APP_PATH + 'services/' + serviceDir + '/' + templateName;
				cache.serviceTemplates[serviceDir] = require(templatePath);
			} else {
				var searchPath = APP_PATH + 'services/' + serviceDir + '/*-template.json';
				var filePath = glob.sync(searchPath)[0];
				cache.serviceTemplates[serviceDir] = loadJson(filePath);
			}

		}
		return cache.serviceTemplates[serviceDir];
	},

	getServiceConfig : function(serviceDir) {

		if(!cache.serviceConfigs[serviceDir]) {
			var rawConfig = util.getRawServiceConfig(serviceDir);
			var out = generateConfig(rawConfig, defaultServiceConfig);

			cache.serviceConfigs[serviceDir] = out;
		}

		return cache.serviceConfigs[serviceDir];
	},

	getServiceDiff : function(serviceDir, diffFileName) {
		if(!diffFileName)
			return null;

		var diffPath = APP_PATH + 'services' + '/' + serviceDir + '/' + diffFileName;
		return require(diffPath);
	}
}

function loadJson(path) {
	return JSON.parse(fs.readFileSync(path, {encoding : "utf8"}));
}

function generateConfig(rawConfig, defaults) {

	var allStates = _.union(_.keys(rawConfig.states), _.keys(defaults.defaultStates));
	var out = {
		verbs: null,
		states : {}
	};

	rawConfig.states = rawConfig.states || {};


	_.each(allStates, function(state) {

		var a = defaults.defaultState,
		    b = defaults.defaultStates[state] || {},
		    c = rawConfig,
		    d = rawConfig.states[state] || {};

		out.states[state] = {};

		_.each(a, function(val, key) {
			out.states[state][key] = d[key] || c[key] || b[key] || a[key];
		});

	});

	out.verbs = rawConfig.verbs || defaults.verbs;

	return out;
}

module.exports = util;

