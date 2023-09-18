const maxWords = 100;
const maxLines = 1000000;
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
		"character",
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


function randomInt(max){
	return Math.floor(Math.random() * max);
}

function numberFormat(n){
	return n.toLocaleString();
}

function generateRandomTextToFile(fd){
	console.time("processing");

	for(let i=0; i <maxLines; i++){

		let wordCount = randomInt(maxWords);
		let buffer = "";

		while(wordCount>0){
			buffer += words[randomInt(words.length)] + (wordCount==1 ? "." : " ");
			wordCount--;
		}
		buffer += "\n";
		fs.writeSync( fd, buffer )

		if( i % 10000 === 0 ){
			console.log( "Wrote " + numberFormat(i)  + " lines." );
		}
		if( i % 100000 === 0 ){
			console.timeLog("processing");
		}

	}

	console.log( "Wrote " + numberFormat(maxLines)  + " lines." );
	console.timeEnd("processing");
}

let fd;
try{
	fd = fs.openSync( "./big.txt", "w" );

	generateRandomTextToFile(fd);
		
	console.log("Done");
	
}catch(err){
	console.error(err);
}finally{
	if(fd){
		fs.closeSync(fd);
	}
}



