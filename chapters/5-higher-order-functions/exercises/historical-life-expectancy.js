var ancestry = require('../practice/ancestry'),
    average = require('../practice/average');

/*
    1. Compute the century of birth for each person.
    
    2. Group all people by their century of death.
*/
var centurySortMap = {};

var calculateCenturyOfDeath = function(deathYear) {
    return Math.ceil(deathYear / 100);  
};

ancestry.forEach(
    function(person) {
        // Compute the century of death.
        var centuryOfDeath = calculateCenturyOfDeath(person.died);
        
        // If there isn't an existing collection for this century,
        // create one.
        if (!centurySortMap[centuryOfDeath]) {
            centurySortMap[centuryOfDeath] = [];
        }
        
        // Add person to the (determined) century of death collection.
        centurySortMap[centuryOfDeath].push(person);
    }
);

/*
    3. Calculate the average for each century.
*/
var centuryResultsMap = {};

for (var propName in centurySortMap) {
    if (centurySortMap.hasOwnProperty(propName)) {
        // propName should be a century identifier, and point to an array 
        // of person objects that belong to that century.
        var personsSet = centurySortMap[propName];
        
        // Create a collection of people's ages.
        var personsAgesSet = personsSet.map(
            function(person, index, array) {
                return person.died - person.born;        
            }
        );
        
        var averageAge = average(personsAgesSet);
        centuryResultsMap[propName] = averageAge.toFixed(2);
    }
}

console.log(JSON.stringify(centuryResultsMap));
