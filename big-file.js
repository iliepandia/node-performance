const maxWords = 100;
const maxLines = 10000000;
const fs = require('fs');

const words = [
		"apple",
		"car",
		"skoda",
		"food",
		"cherry",
		"love",
		"unknown",
		"feature",
		"charachter",
		"mouse",
		"kids",
		"table",
		"chair",
		"veggies",
		"the",
		"cup",
		"plate",
		"UFO",
		"rapture"
	];

let i = maxLines;

function randomInt(max){
	return Math.floor(Math.random() * max);
}

function numberFormat(n){
	return n.toLocaleString( undefined, 0, 0 );
}

function generateRandomTextToFile(fd){

	let buf = "";
	while(i>0){

		let wordCount = randomInt(maxWords);
		buf = "";

		while(wordCount>0){
			buf += words[randomInt(words.length)] + (wordCount==1 ? "." : " ");
			wordCount--;
		}
		buf += "\n";
		fs.writeSync( fd, buf )
		//write this stuff into a file
		if( i % 10000 === 0 ){
			console.log( "Wrote " + numberFormat(maxLines - i)  + " lines." );
		}
		//console.log(buf);
		i--;
	}

	console.log( "Wrote " + numberFormat(maxLines - i)  + " lines." );
}

let fileD = null;

//how can I write this part using promisses instead of call back hell?!

fs.open("./big.txt", "w", (err, fd) => {

	if(err){
		console.error("There was an error so...");
		return;
	}

	generateRandomTextToFile(fd);

	fs.close(fd);

	console.log("Done");
} );



