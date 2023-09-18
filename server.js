const http = require( "http" );

const server = http.createServer( (req, res) => {
	res.statusCode = 200;
	res.setHeader('Content-type', 'text/plain');
	res.end("Hello World!");
})

server.listen( 8080, ()=> {
	console.log('Server is running http://${hostname}:${port}/')
});