var streamify = require('../index.js');

var object = {
  prop1: 'I am an object',
  prop2: 7
};

// this will throw error, try it
//streamify(object).pipe(process.stdout);

var stream = streamify(object);

stream.on('data', function(data) {
  console.log(data);
});

