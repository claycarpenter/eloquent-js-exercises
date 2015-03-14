var simpleRequire = require('./simple-require');

var weekday = simpleRequire('./weekday.js');

console.log('weekday defined:', typeof weekday);
console.log('weekday.number:', typeof weekday.number);
console.log('weekday.name:', typeof weekday.name);
console.log('weekday.names:', typeof weekday.names);

console.log('Saturday number:', weekday.number('Saturday'));
console.log('Saturday number->name:', weekday.name(weekday.number('Saturday')));
