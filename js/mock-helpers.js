var Handlebars = require('handlebars');

Handlebars.registerHelper('mockId', function(str) {
	return Math.floor(Math.random() * 100000) + 1000000;
});

Handlebars.registerHelper('intFallbackMinusOne', function(num) {
	return (num % 1 === 0) ? num : -1;
});

var mockHelpers = {

};

module.exports = mockHelpers;