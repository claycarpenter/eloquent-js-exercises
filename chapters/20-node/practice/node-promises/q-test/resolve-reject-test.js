
var Q = require('q');

function makeDeferred () {
    var deferred = Q.defer();
    
    deferred.promise
        .then(success)
        .catch(fail)
        .finally(fin);
    
    return deferred;
}

function success (result) {
    console.log('Console:', result);
    
    return result;
}

function fail (error) {
    console.error('Error:', error);
    
    // Should an error be returned here?
    return error;
}

function fin (result) {
    // Looks like result is not given a value.
    console.log('Fin!', result);
}

var yay = makeDeferred(),
    nay = makeDeferred(),
    adder = makeDeferred();

yay.resolve('OH HAI!');

nay.reject('Oh dear God no!');

adder.resolve(2+3);
