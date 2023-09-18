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


const writeStream = fs.createWriteStream("./big.txt");

writeStream.on('finish', ()=>{
    console.log( "Done writing all the data. Interesting." );
});


(async function main(){
    console.time("streams");

    for(let i = 0; i<maxLines; i++){
        let wordCount = randomInt(maxWords);
        let buf = "";
    
        while(wordCount>0){
            buf += words[randomInt(words.length)] + (wordCount==1 ? "." : " ");
            wordCount--;
        }
        buf += "\n";
    
        if(!writeStream.write(buf)){
            await new Promise( resolve => writeStream.once('drain', resolve));
        }
    
        if( i % 10000 === 0 ){
            console.log( `Wrote ${numberFormat(i)} lines.` );
        }
    
        if( i % 100000 === 0 ){
            console.timeLog( "streams" );
        }
    }
    
	console.log( `Wrote ${numberFormat(maxLines)} lines.`);
    writeStream.end();
	console.timeEnd("streams");
})();


