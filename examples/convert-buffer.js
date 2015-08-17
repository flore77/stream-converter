var streamify = require('../index.js');

var buffer = new Buffer('I will be converted into a stream!\n');

// piping
streamify(buffer).pipe(process.stdout);

var stream = streamify(buffer);
var chunks = [];

// listen to events
stream.on('data', function(data) {
  chunks.push(data);
});

stream.on('end', function() {
  var result = Buffer.concat(chunks);
  console.log(result.toString());
});


