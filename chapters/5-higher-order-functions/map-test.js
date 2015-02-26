var ancestry = require('./ancestry'),
    filter = require('./filter'),
    map = require('./map');

var overNinety = filter(ancestry, function(person) {
    return person.died - person.born > 90;
});

var overNinetyNames = map(overNinety, function(person) {
    return person.name;
});

console.log(overNinety);

console.log(overNinetyNames);

var ageMapped = map(ancestry, function(person) {
    return {
        name: person.name,
        age: person.died - person.born
    };
});

console.log(ageMapped);
