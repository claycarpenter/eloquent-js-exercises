var ancestry = require('./ancestry'),
    map = require('./map'),
    average = require('./average'),
    filter = require('./filter');

var ageMapper = function(person) {
    return person.died - person.born;  
};

var maleFilter = function(person) {
    return person.sex === 'm';
};

var femaleFilter = function(person) {
    return person.sex === 'f';
};

var averageAgeMale = average(map(filter(ancestry, maleFilter), ageMapper));
console.log(
    'Male average age: ' + averageAgeMale.toFixed(2)
);

var averageAgeFemale = average(map(filter(ancestry, femaleFilter), ageMapper));
console.log(
    'Female average age: ' + averageAgeFemale.toFixed(2)
);
