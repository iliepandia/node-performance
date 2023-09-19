const http = require("http");

const port = 8080;

console.log("Starting Simple HTTP server");

const server = http.createServer( ( req, res) => {
    res.statusCode = 200
    res.setHeader('Content-Type', 'text/plain')
    res.end('Hello World\n');
    console.log("replied to request...");
});

server.listen( port );