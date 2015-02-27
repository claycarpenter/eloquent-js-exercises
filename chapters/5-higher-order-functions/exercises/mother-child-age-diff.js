var ancestry = require('../practice/ancestry'),
    byName = require('./by-name')(ancestry),
    average = require('../practice/average');

/*
    1. Use map to annotate all people with the age of their mother at the 
    time of the person's birth (if mother is available).
*/
var annotatedAncestry = ancestry.map(
    function(person, index, array) {
        var mother = byName[person.mother];
        
        if (mother) {
            person.mothersAgeAtBirth = person.born - mother.born;
        } else {
            person.mothersAgeAtBirth = undefined;
        }
        
        return person;
    }
);

/*
    2. Create an array of only mothersAgeAtBirth values.
    
    Note: steps 1 and 2 really could be combined.
*/
var mothersAgeOnly = annotatedAncestry.map(
    function(person, index, array) {
        return person.mothersAgeAtBirth;        
    }
);

/*
    3. Filter out null values from the array.
*/

mothersAgeOnly = mothersAgeOnly.filter(
    function(age) {
        return age;
    }
);

var averageAge = average(mothersAgeOnly);

console.log('Average age of mothers are birth of a child: ' + averageAge.toFixed(2));
