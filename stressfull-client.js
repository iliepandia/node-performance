const https = require("https")

const options = {
    hostname: 'localhost',
    port: '443',
    path: '/',
    method: 'GET'
}

const concurrentPromises = parseInt(process.argv[2], 10) || 5;

if (isNaN(concurrentPromises) || concurrentPromises <= 0) {
    console.error("Invalid number of concurrent promises. Exiting.");
    process.exit(1);
}

console.log("Starting the stressful client with ", concurrentPromises, " jobs.");


const jobStatus = [];

//print the jobs status in a pretty way
//I want to see that everyone is "busy"
const printStatus = () => {
    console.log(jobStatus.join(''));
}

const makePromise = (i) => {
    return new Promise((resolve, reject) => {
        jobStatus[i] = "1";

        const req = https.request( options, (res) => {
            res.on('end', (d) => {
                jobStatus[i] = "0";
                resolve(`P${i}: finished execution.` );
            });
            res.on('error', (error) => {
                jobStatus[i] = "x";
                reject(`P${i}: failed execution.` );
            });
        } );

        req.on('error', (error) => {
            reject('https request failed ', error )
        });

        req.end();

    }).then((result) => {
        // Log and restart the promise
        printStatus();
        return makePromise(i);
    }).catch((error) => {
        jobStatus[i] = "x";
        console.log(error);
        printStatus();
        return makePromise(i);
    });
};

// Initialize the job promises
for (let i = 0; i < concurrentPromises; i++) {
    makePromise(i);
}

// You don't need to run anything after initialization because 
// each promise will keep re-creating itself after it resolves.
