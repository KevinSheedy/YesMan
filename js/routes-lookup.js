///////////////////////////////////////////////////////////////////////////////////////////////
// The routes.json file is a human-readable config file
// Any values ommitted by the user will be defaulted.
// This class combines the user's config with the defaults and generates _generated-routes.json
// _generated-routes.json is a more full representation of how the app is configured
// and is very useful in understanding how YesMan works
///////////////////////////////////////////////////////////////////////////////////////////////

var _ = require('underscore');
var extend = require('node.extend');
var fs = require('fs');

var globals = require('./globals');
var routes = require(globals.appPath + '/routes');
var defaults = require('../defaults');

///////////////////////////////////////////////////////////////////////////////////////////////
// Template for how a route is configured
var routeTemplate = defaults.routeTemplate;

///////////////////////////////////////////////////////////////////////////////////////////////
// Loop through each route in the user's config rile
_.each(routes, initRouteConfig);


function initRouteConfig(route, url) {


	// In the user config, 'template' can be at route level or at state level.
	// However, in the generated config, 'template' is moved to be at state level only
	var defaultTemplate = route.template || url + ".json";
	delete route.template;

	var defaultMockGenerator = route.mockGenerator || null;
	delete route.mockGenerator;

	var defaultReqParser = route.reqParser || "mirror";
	delete route.reqParser;

	var defaultDiff = route.diff || null;
	delete route.diff;

	// If no states exist, create a default one
	if(_.isEmpty(route.states)) {
		route.states = {
			"default" : {}
		}
	}

	// Copy the 'template' name to each state
	_.each(route.states, function(state, id){
		var state = route.states[id];
		state.template = state.template || defaultTemplate;
		state.mockGenerator = state.mockGenerator || defaultMockGenerator;
		state.reqParser = state.reqParser || defaultReqParser;
		state.diff = state.diff || defaultDiff;
	});

	// Extend the default route config with the user route config
	var route = extend(true, {}, routeTemplate, route);

	_.each(route.states, function(state, id){
		route.states[id] = extend({}, defaults.state, state);
	});

	routes[url] = route;

}

var outputFilename = globals.appPath + '/_generated-routes.json';

fs.writeFile(outputFilename, JSON.stringify(routes, null, '\t'), function(err) {
	if(err) {
		console.log(err);
	} else {
		console.log("JSON saved to " + outputFilename);
	}
});


var routesLookup = {
	all : function(){
		return routes;
	},
	get : function(url) {
		return routes[url] || {};
	},
	state : function(url, state) {
		var route = routesLookup.get(url);
		return route.states[state] || {}
	}
}

module.exports = routesLookup;