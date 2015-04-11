
var http = require('http'),
    fs = require('fs'),
    url = require('url'),
    mime = require('mime');

// Create an entirely blank object.
// Removing the default object properties ensures that only the method handlers
// we define here will be available to requesting clients.
var methodHandlers = Object.create(null);

// GET method handler.
methodHandlers.GET = function (path, respond) {
    // Get information about the targeted resource on the local file system, 
    // including whether that file exists.
    fs.stat(path, function (error, stats) {
        if (error && error.code === 'ENOENT') {
            // File for resource could not be found, respond with 404.
            respond(404, 'File not found');
        } else if (error) {
            // Generic server error.
            respond(500, error.toString());
        } else if (stats.isDirectory()) {
            // Targerted resource is a directory, return file list.
            fs.readdir(path, function (error, files) {
                if (error) {
                    // TODO This is redundant with above generic server failure message.
                    // Consider consolidating into common error handler.
                    respond(500, error.toString());
                } else {
                    respond(200, files.join('\n'));   
                }
            });
        } else {
            // Targetred resource is a file, return file contents.
            var contentType = mime.lookup(path),
                readStream = fs.createReadStream(path);
            
            respond(200, readStream, contentType);
        }
    });
};

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
var server = http.createServer(serverEngine),
    host = process.env.IP || 'localhost',
    port = process.env.PORT || 8080;

server.listen(port, host);

console.log('Server listening on ', host + ':' + port);
