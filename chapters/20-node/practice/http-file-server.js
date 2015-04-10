
var http = require('http'),
    fs = require('fs'),
    url = require('url');

// Create an entirely blank object.
// Removing the default object properties ensures that only the method handlers
// we define here will be available to requesting clients.
var methodHandlers = Object.create(null);

function serverEngine (request, response) {
    // Generic response wrapper.
    function respond (statusCode, body, type) {
        // Set a default content-type of text/plain, if none is provided.
        type = typeof type !== 'undefined' ? type : 'text/plain';
        
        // Write the content-type header.
        response.writeHead(statusCode, {'Content-Type': type});
        
        // If the body is a stream, pipe it to the response.
        if (body && body.pipe) {
            body.pipe(response);
        } else {
            // Otherwise, just write the body as it is (expecting text?)
            response.end(body);
        }
    }
    
    console.log('Incoming request:', request.method, 'for resource', request.url);
    
    if (request.method in methodHandlers) {
        var path = urlToPath(request.url);
        
        methodHandlers[request.method](path, respond, request);
    } else {
        // Send back a request error message.
        respond(405, 'Method ' + request.method + ' not allowed.');
    }
}

function urlToPath (requestUrl) {
    var path = url.parse(requestUrl).pathname;
    
    return '.' + decodeURIComponent(path);
}

// Create and start the server.
var server = http.createServer(serverEngine);
server.listen(process.env.PORT, process.env.IP);

console.log('Server listening on ', process.env.IP + ':' + process.env.PORT);
