var streamify = require('../index.js');

var string = 'I will be coverted into a stream!\n';

// piping
streamify(string).pipe(process.stdout);

var stream = streamify(string);
var str = '';

stream.setEncoding('utf8');

// listen to events
stream.on('data', function(data) {
  str += data;
});

stream.on('end', function() {
  console.log(str);
});
