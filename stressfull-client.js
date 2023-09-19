console.log( "Starting the stressful client" );


const concurrentRuns = 5;

let jobs = [];

let makePromise = ( i ) => {
    return new Promise( (resolve, reject ) => {
        setTimeout( () => {
            //install a new promise where one has been resolved
            jobs[i] = makePromise( i );
            resolve("P:" + i + " is done");
        }, (Math.random() * 3 + 2) * 100 );
    } );
};

for(let i = 0; i < concurrentRuns; i++ ){

    let p = makePromise( i );
    jobs.push( p );
}

let reRun = ( result ) => {
    console.log( "One of the promises returned ", result );
    Promise.race(jobs).then(reRun);
};

Promise.race(jobs).then( reRun );    
    

