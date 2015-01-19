var fs = require('fs');
var getIntersection = require('./get-intersection');

var parsers = {
	mirror : function(template, inputObj) {
		return getIntersection(template, inputObj);
	}
}


module.exports = function(parserName){
	return parsers[parserName] || function(){return {}};
};