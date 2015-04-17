
var http = require('http'),
    Q = require('q');

var options = {
    hostname: 'eloquentjavascript.net',
    port: 80,
    path: '/author',
    method: 'GET',
    headers: {
        'Accept': process.argv[2] || 'text/plain'
    }
};

function makeRequestPromise (requestOptions) {
    var deferred = Q.defer();
    
    // Resolve Promise on response, even if response status code indicates
    // an error.
    var req = http.request(requestOptions, function (response) {
        if (response.statusCode >= 200 && response.statusCode < 300) {
            // Successful response.
            
            response.setEncoding('utf8');
            
            response.on('data', function (chunk) {
                response.body = chunk;
                
                deferred.resolve(response);
            });
        } else {
            // Status code indicates an error, pass entire response to error
            // handler.
            deferred.reject(response);
        }
    });
    
    // Reject Promise on (network) error.
    req.on('error', function (error) {
        deferred.reject(error);
    });
    
    // Execute request.
    req.end();
    
    return deferred.promise;
}

function responseHandler (response) {
    console.log('Status:', response.statusCode);
    console.log('Response body:', response.body);
}

function responseErrorHandler (error) {
    console.error('Error:', error.toString());
}

var requestPromise = makeRequestPromise(options);
requestPromise
    .then(responseHandler)
    .catch(responseErrorHandler);
