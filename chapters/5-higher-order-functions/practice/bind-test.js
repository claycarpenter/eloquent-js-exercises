var ancestry = require('./ancestry'),
    filter = require('./filter'),
    theSet = ["Carel Haverbeke", "Maria van Brussel", "Donald Duck"];

var isInSet = function(array, person) {
    return array.indexOf(person.name) > -1;
};

console.log('Via anon function: \n' + JSON.stringify(filter(ancestry, function(person) {
    return isInSet(theSet, person);
})));

console.log('Via Bind: \n' + JSON.stringify(filter(ancestry, isInSet.bind(null, theSet))));
