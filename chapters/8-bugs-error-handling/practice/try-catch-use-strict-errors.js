var useStrictFunction = function() {
    'use strict';
    
    for (counter = 0; counter < 3; counter++) {
        console.log('I has a sad.');
    }
};

try {
    console.log('Trying useStrictFunction');
    
    useStrictFunction();
} catch (error) {
    console.log('Caught error: ' + error.message);
} finally {
    console.log('Not much else to do here...');
}