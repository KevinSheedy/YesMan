var fs = require('fs');
var extend = require('node.extend');
var jsonCascade = require('json-cascade');

var globals = require('./globals');
var config = require(globals.appPath + '/config.json');
var util = require('../js/util');
var getState = require('../js/get-state');

var routesLookup = require('../js/routes-lookup');
var getIntersection = require('../js/get-intersection');
var dummyDataGenerator = require('../js/dummy-data-generator');

var reqParsers = require('../js/req-parsers');


module.exports = function(url, reqBody) {

	//var state = getState(url);
	var state = util.getState(config.scenario, url);

	var stateConfig = routesLookup.state(url, state);

	var template  = util.getTemplate(stateConfig.template);
	var reqData   = reqParsers(stateConfig.reqParser)(template, reqBody);
	var genData   = dummyDataGenerator(stateConfig.mockGenerator)(reqBody);
	var stateData = util.getDiff(stateConfig.diff);

	// We build the response by combining the various sources of mock data in a cascading manner.
	// Order of precedence from High to Low:
	//
	// Highest: State data
	//          Generated data
	//          Request data
	// Lowest:  Template data
	//
	//var response = extend(true, {}, template, reqData, genData, stateData);
	var response = jsonCascade(template, reqData, genData, stateData);

	return response;
};
