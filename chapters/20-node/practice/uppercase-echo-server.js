
var http = require('http');

function requestHandler (request, response) {
    console.log('Responding to request.');
    
    response.writeHead(200, {'Content-type': 'text/plain'});
    
    // Listen for incoming request data.
    request.on('data', function (chunk) {
        // Convert input to uppercase and write out to response stream.
        response.write(chunk.toString().toUpperCase());
    });
    
    // Listen for request data completion.
    request.on('end', function () {
        // Finalize response.
        response.end(); 
    });
}

var server = http.createServer(requestHandler);

// Start the server.
server.listen(process.env.PORT);

console.log('Server listening on port', process.env.PORT);