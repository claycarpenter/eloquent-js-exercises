
var Q = require('q');

module.exports = {
    getFullName: function (firstName, lastName, callback) {
        var deferred = Q.defer();
        
        if (firstName && lastName) {
            var fullName = firstName + ' ' + lastName;
            
            deferred.resolve(fullName);
        } else {
            deferred.reject('First and last name must be provided.');
        }
        
        // The callback will be called as soon as .resolve or .reject is 
        // called. Arguments will either be (error) or (null, result).
        deferred.promise.nodeify(callback);
        
        return deferred.promise;
    }
};
