const lo = require('lodash');
let calls = require('./calls.json');
let puts = require('./puts.json');

let combined = lo.merge({}, calls, puts);

console.log(JSON.stringify(combined));
