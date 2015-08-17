var streamify = require('../index.js');

var array = ['1', 'anything', new Buffer('Hello, World!\n')];

// this will work because it is an array only of strings and Buffers
streamify(array).pipe(process.stdout);

var array1 = [1, 3, 'anything'];

//this will throw an error, try it
//streamify(array1).pipe(process.stdout);

//but we can listen to the data event and collect the data
var stream = streamify(array1);
var result = [];

stream.on('data', function(data) {
  result.push(data);
});

stream.on('end', function() {
  //the output will be equal to array1
  console.log(result);
});
