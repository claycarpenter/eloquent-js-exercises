
var http = require('http');

var request = http.request({
    hostname: 'localhost',
    port: process.env.PORT,
    method: 'POST'
}, function (response) {
    // Listen for incoming response data.
    response.on('data', function (chunk) {
        // Write using stdout instead of console.log to avoid (artificial) 
        // line breaks.
        process.stdout.write(chunk.toString()); 
    });
});

// Execute request with command line input, or default string.
var message = process.argv[2] || 'Hello server';

request.end(message);
