const maxWords = 100;
const maxLines = 10000000;
const fs = require('fs').promises;

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


function randomInt(max){
	return Math.floor(Math.random() * max);
}

function numberFormat(n){
	return n.toLocaleString();
}

async function generateRandomTextToFile(fd){
	let buf = "";
    console.time('processing');
	for( let i=0; i < maxLines; i++ ){

		let wordCount = randomInt(maxWords);
		buf = "";

		while(wordCount>0){
			buf += words[randomInt(words.length)] + (wordCount==1 ? "." : " ");
			wordCount--;
		}
		buf += "\n";
		
		await fs.writeFile(fd, buf);
		
		if( i % 10000 === 0 ){
			console.log( `Wrote ${numberFormat(i)} lines.` );
		}

		if( i % 100000 === 0 ){
			console.timeLog( `processing` );
		}
        

	}
	console.log( `Wrote ${numberFormat(i)} lines.` );
}

(async function main(){
	try{
		const fd = await fs.open( './big.txt', 'w');
		await generateRandomTextToFile(fd);
		await fs.close(fd);
		console.log( 'Done writing stuff to the file');
	}catch(err){
		console.error( "There was an error: ", err );
	}
})();
