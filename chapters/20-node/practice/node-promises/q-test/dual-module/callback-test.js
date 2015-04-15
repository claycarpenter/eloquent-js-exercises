
var dualModule = require('./dual-module'),
    firstName = process.argv[2],
    lastName = process.argv[3];

dualModule.getFullName(firstName, lastName, callback);

function callback (error, result) {
    if (error) {
        console.error(error);
        return;
    }    
    
    console.log(result);
}
