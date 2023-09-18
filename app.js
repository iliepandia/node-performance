const EventEmitter = require('events').EventEmitter;
const eventEmitter = new EventEmitter();

eventEmitter.on( 'timeout', () => {
	console.log('Timeout is finally FIRING log!');
} );

console.log( "Starting this stuff");

setTimeout( () => {
	console.log("This is 4 seconds later");
	eventEmitter.emit('timeout');
}, 4000 );


const promise = new Promise( 
	( resolve, reject ) => {
		setTimeout( ()=> {
			resolve( "this promise is RESOLVED!");
		}, 3000 );
	} 
);


const displayMyValue = async () => {
	console.log( await promise );
}; 

const finishOff = async () => {
	await displayMyValue();
	console.log('This is the last statement. Now I am exiting.');
}

finishOff();

console.log( "This IS not the last one, lol!!");