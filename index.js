var Stream = require('readable-stream').Stream;
var NodeStream = require('stream').Stream;
var Readable = require('readable-stream').Readable;
var util = require('util');
var fs = require('fs');

util.inherits(ArrayStream, Readable);
util.inherits(StringOrBufferStream, Readable);
util.inherits(ObjectStream, Readable);

/**
 * Transforms an Array into a ReadStream
 *
 * @param {Array} array - The input Array to transform
 */
function ArrayStream(array) {
  Readable.call(this, {objectMode: true});

  this._iter = 0;
  this._array = array;
}

ArrayStream.prototype._read = function() {
  if (this._iter < this._array.length) {
    this.push(this._array[this._iter++]);
    return;
  }

  this.push(null);
}

/**
 * Transforms a String or a Buffer into a ReadStream
 *
 * @param {String|Buffer} - The input String or Buffer to transform
 */
function StringOrBufferStream(stringOrBuffer, options) {
  Readable.call(this, options);

  this._stringOrBuffer = stringOrBuffer;
}

StringOrBufferStream.prototype._read = function() {
  this.push(this._stringOrBuffer);
  this._stringOrBuffer = null;
}

/**
 * Transforms an object into a ReadStream
 *
 * @param {Object} - The input Object to transform
 */
function ObjectStream(object) {
  Readable.call(this, {objectMode: true});

  this._object = object;
}

ObjectStream.prototype._read = function() {
  this.push(this._object);
  this._object = null;
}

/**
 * Transforms everything into a ReadStream
 *
 * @param {String||Buffer|Object|Array|Stream} source
 * @param {Object} [options]
 */
module.exports = function(source, options) {
  if (source instanceof Stream || source instanceof NodeStream) {
    return source;
  } else if (source instanceof Array) {
    return new ArrayStream(source);
  } else if (source instanceof Buffer) {
    return new StringOrBufferStream(source, options);
  } else if (typeof source === 'string') {
    // if options.path is set to true, then the String must be treat like a path
    if (options !== undefined && options.path === true) {
      return fs.createReadStream(source, options);
    }

    return new StringOrBufferStream(source, options);
  } else if (typeof source === 'object') {
    return new ObjectStream(source);
  } else {
    throw new Error('Your argument doesn\'t match any of this ' +
        '{String|Buffer|Object|Array|Stream}');
  }
};
