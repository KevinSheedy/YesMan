#!/usr/bin/env node

'use strict';

process.title = 'yesman';
console.log('YesMan Cli...');

var args = process.argv.slice(2);

console.log(args.length);


var yesman = require('./bin/www');