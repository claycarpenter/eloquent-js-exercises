

function seeNoEvil() {
    for (counterA = 0; counterA < 3; counterA++) {
        console.log('Happy happy');
    }
}

seeNoEvil();

function canYouSpotTheProblem() {
    'use strict';
    
    for (counterB = 0; counterB < 3; counterB++) {
        console.log('Happy happy');
    }
}

canYouSpotTheProblem();
