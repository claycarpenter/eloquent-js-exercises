
var http = require('http');

// Define request options.
var options = {
    hostname: 'eloquentjavascript.net',
    path: '/20_node.html',
    method: 'GET',
    headers: {
        Accept: 'text/html'
    }
};

// Define the callback that will handle the response.
function responseCallback (response) {
    console.log('Server responded with status code', response.statusCode);
    
    response.resume();
}

// Define request.
var request = http.request(options, responseCallback);

// Execute request.
request.end();
