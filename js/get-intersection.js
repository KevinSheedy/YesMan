var _ = require('underscore');

function getIntersection(template, inputObj) {

	var templateKeys = _.keys(template);
	var inputObjKeys = _.keys(inputObj);
	var intersectionKeys = _.intersection(templateKeys, inputObjKeys);

	var objKeys = _.filter(intersectionKeys, function(key) {
		return _.isObject(template[key]) && _.isObject(inputObj[key]);
	});

	var valueKeys = _.difference(intersectionKeys, objKeys);
	var valueIntersection = _.pick(inputObj, valueKeys);

	if(_.size(objKeys) <= 0)
		return valueIntersection;

	var objIntersection = {};

	_.each(objKeys, function(key) {
		objIntersection[key] = getIntersection(template[key], inputObj[key]);
	});

	return _.extend({}, valueIntersection, objIntersection);

};

module.exports = getIntersection;

