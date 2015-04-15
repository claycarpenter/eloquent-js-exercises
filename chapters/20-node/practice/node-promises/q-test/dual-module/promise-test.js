
var dualModule = require('./dual-module'),
    firstName = process.argv[2],
    lastName = process.argv[3];

dualModule.getFullName(firstName, lastName)
    .then(function (result) {
        console.log(result);
    })
    .fail(function (error) {
        console.error(error); 
    });