# stream-converter
[![Build Status](https://travis-ci.org/flore77/stream-converter.svg?branch=master)](https://travis-ci.org/flore77/stream-converter)
[![Coverage Status](https://coveralls.io/repos/flore77/stream-converter/badge.svg?branch=master&service=github)](https://coveralls.io/github/flore77/stream-converter?branch=master)

Converts anything to a Node.js ReadStream, i.e [Readable Stream](http://devdocs.io/node/stream#stream_class_stream_readable).

## Install
`npm install stream-converter`

## Usage

```js
var streamify = require('stream-converter');

/**
 * Converts source to a ReadStream
 *
 * @param {String|Buffer|Array|Object|Stream}
 * @param {Object} [options]
 */
var stream = streamify(source, options);
```
You can also check the `examples` folder in the repo.

## Converting Streams
Indeed, it doesn't convert anything, it is just `returning` the `stream` passed as `param`, it will recognize
[readable-streams](https://www.npmjs.com/package/readable-stream) as also Node.js Core
[streams](http://devdocs.io/node/stream).

## Converting Buffers or Strings

```js
//options is not required
var stream = streamify(bufferOrString, options);
```
We can pipe it (for example):
```js
stream.pipe(process.stdout);
```
or you can listen to the `data` event:
```js
stream.on('data', function() {
  //do something
});
```
or every possible operation on `streams`. Possible options are:

```js
var options = {
  highWaterMark: Number,
  encoding: String,
  objectMode: Boolean,
  path: Boolean
};
```

For the first three options you can read more in the documentation provided above. For the last one, i.e `path`,
it's an option for `Strings`, if it is set to `true` it will treat the string like a `path`, i.e. it will return
a `stream` using [fs.createReadStream](http://devdocs.io/node/fs#fs_fs_createreadstream_path_options).

## Converting Arrays and Objects

```js
var stream = streamify(objectOrArray);
```
There are `no` options available, they are converted by `default` to a stream using `objectMode: true`. Because
of this, they `cannot be piped` to a writeable stream, that accepts only `Buffers` or `Strings`. But you can `listen`
to `events` and other stream stuff.

You can pipe arrays, but **only** if they contain `Strings` and `Buffers`.
