var ancestry = require('./ancestry'),
    filter = require('./filter');


console.log(filter(ancestry, 
    function(person) {
        return person.born > 1900 && person.born < 1925;
    })
);

