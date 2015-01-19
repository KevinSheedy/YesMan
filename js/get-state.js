var fs = require('fs');
var globals = require('./globals');

function getState(url) {
	var globalState = JSON.parse(fs.readFileSync(globals.appPath + '/' + "current-state.json", {encoding : "utf8"}));
	var state = globalState[url] || "default";
	return state;
};

module.exports = getState;