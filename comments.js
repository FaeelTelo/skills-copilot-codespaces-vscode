// Create web server
var http = require('http');
// Create file system object
var fs = require('fs');
// Create url object
var url = require('url');
// Create querystring object
var querystring = require('querystring');
// Create comments array to store comments
var comments = [];

// Create server
http.createServer(function(request, response) {
    // Get the path from the request
    var path = url.parse(request.url).pathname;
    // Get the query string from the request
    var query = querystring.parse(url.parse(request.url).query);

    // If the path is /comment, then read the comments from the file and return them
    if(path === '/comment') {
        // Read the comments from the file
        fs.readFile('comments.txt', 'utf8', function(error, data) {
            // If there is an error reading the file, return an error
            if(error) {
                response.writeHead(500, {'Content-Type': 'text/plain'});
                response.end('An error occurred reading the file');
            }
            // Otherwise, return the comments
            else {
                // Split the comments by new line
                comments = data.split('\n');
                // Return the comments
                response.writeHead(200, {'Content-Type': 'application/json'});
                response.end(JSON.stringify(comments));
            }
        });
    }
    // If the path is /addcomment, then add a comment to the file
    else if(path === '/addcomment') {
        // Get the comment from the query string
        var comment = query['comment'];
        // Add the comment to the comments array
        comments.push(comment);
        // Write the comments to the file
        fs.writeFile('comments.txt', comments.join('\n'), function(error) {
            // If there is an error writing the file, return an error
            if(error) {
                response.writeHead(500, {'Content-Type': 'text/plain'});
                response.end('An error occurred writing the file');
            }
            // Otherwise, return success
            else {
                response.writeHead(200, {'Content-Type': 'text/plain'});
                response.end('Comment added successfully');
            }
        });
    }
    // If the path is not recognized, return a 404 error
    else {
        response.writeHead(404, {'Content-Type': 'text/plain'});
        response.end('Page not found');
    }
}).listen(3000);

console.log