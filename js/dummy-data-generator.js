var fs = require('fs');
var getIntersection = require('./get-intersection');

var parsers = {
	account : function(reqBody) {
		return {
			accountId : reqBody.accountId || genId()
		}
	}
}

function genId() {
	return (Math.floor(Math.random() * 100000) + 1000000);
}


module.exports = function(mockGeneratorName){
	return parsers[mockGeneratorName] || function(){return {}};
};