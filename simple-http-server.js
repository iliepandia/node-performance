const { error } = require("console");
const http = require("http");

const port = 8080;

console.log("Starting Simple HTTP server");

const queue = [];

const itemLifeinSeconds = 15;

const purgeTheQueue = () => {
    const now = Date.now();
    while( queue.length && queue[0] <= now ){
        queue.shift();
    }
}

const server = http.createServer( ( req, res) => {
    res.statusCode = 200
    res.setHeader('Content-Type', 'text/plain')
    res.end('Hello World\n');

    const expireTime = Date.now() + 1000 * itemLifeinSeconds;

    queue.push(expireTime);
    purgeTheQueue();
    //console.log("Replied to request." );
});

setInterval( () => {
    purgeTheQueue();

    console.log( "Queue size is: ", queue.length );
}, 500 );

server.on('error', (error) => {
    console.log(error)
} )

server.listen( port );