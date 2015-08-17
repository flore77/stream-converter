var streamify = require('../index.js');

var path = './examples/text';

streamify(path, {path: true}).pipe(process.stdout);
