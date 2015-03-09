

// Works, because function doesn't declare strict mode.
function seeNoEvil() {
    for (counterA = 0; counterA < 3; counterA++) {
        console.log('Happy happy');
    }
}

seeNoEvil();

// Fails. Function runs in strict mode, and throws an error when 
// trying to reference undefined global variables.
function canYouSpotTheProblem() {
    'use strict';
    
    for (counterB = 0; counterB < 3; counterB++) {
        console.log('Happy happy');
    }
}

canYouSpotTheProblem();
