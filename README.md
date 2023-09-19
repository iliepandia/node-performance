# node-performance
Various tests of node's performance

## Large datasets tests
Looking at using node to generate or parse large data sets.

- turns out, with no surprise, that generating the file with sync calls is the fastest
- using promises with writableStreams is about 15% slower
- using promises with writing the lines one by one is very slow

So, if I don't care that I am blocking the event loop, sync calls will be the fastest. And that is fine for generating the data where I don't care if node.js is no longer responsive. 

Now, parsing the data and returing a result to a request is a different story! 

## What happens if instead I write the program in C++ ?!

- C++ generates the 10M lines at a speed of 23.5s / GB
- node.js with sync calls at a speed of 28.2s / GB
- node.js with file writing stream at a speed of 31.7s / GB


