console.log("Starting the stressful client");

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
    return new Promise((resolve) => {
        jobStatus[i] = "1";
        setTimeout(() => {
            jobStatus[i] = "0";
            resolve("P:" + i + " is done");
        }, (Math.random() * 3 + 2) * 100);
    }).then((result) => {
        // Log and restart the promise
        printStatus();
        return makePromise(i);
    }).catch((error) => {
        jobStatus[i] = "x";
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
