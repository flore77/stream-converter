var expect = require('chai').expect;
var Stream = require('readable-stream').Stream;
var NodeStream = require('stream').Stream;
var concat = require('concat-stream');
var tmp = require('tmp');
var fs = require('fs');
var streamify = require('../index.js');

describe('stream-converter', function() {
  var stream = new Stream(),
      nodeStream = new NodeStream(),
      array = [1, 'anything', '\n', function() {}],
      string = 'Come to the dark side, we have cookies',
      buffer = new Buffer(string),
      object = {
        prop1: 7,
        proop2: 'anything'
      },
      path;

  before(function(done) {
    tmp.file(function createFile(error, tmpPath, fd) {
      path = tmpPath;

      fs.write(fd, string, function() {
        done();
      });
    });
  });

  it('should return the same Stream received as input', function() {
    var result = streamify(stream);

    expect(result).to.be.deep.equal(stream);
  });

  it('should return the same Node Core Stream received as input', function() {
    var result = streamify(nodeStream);

    expect(result).to.be.deep.equal(nodeStream);
  });

  it('should transform an Array into a ReadStream', function(done) {
    var result = streamify(array);

    result.pipe(concat({encoding: 'object'}, function(resultArray) {
      expect(resultArray).to.be.deep.equal(array);
      done();
    }));
  });

  it('should transform a Buffer into a ReadStream', function(done) {
    var result = streamify(buffer);

    result.pipe(concat(function(resultBuffer) {
      expect(resultBuffer).to.be.deep.equal(buffer);
      done();
    }));
  });

  it('should transform a String into a ReadStream', function(done) {
    var result = streamify(string);

    result.pipe(concat({encoding: 'string'}, function(resultString) {
      expect(resultString).to.be.equal(string);
      done();
    }));
  });

  it('should create a ReadStream with fs', function(done) {
    var result = streamify(path, {path: true});

    result.pipe(concat({encoding: 'string'}, function(resultString) {
      expect(resultString).to.be.equal(string);
      done();
    }));
  });

  it('should transform an Object into a ReadStream', function(done) {
    var result = streamify(object);

    result.pipe(concat({encoding: 'object'}, function(resultObject) {
      expect(resultObject[0]).to.be.deep.equal(object);
      done();
    }));
  });

  it('should throw an error if the received param is unknown', function() {
    expect(streamify.bind(null, 5)).to.throw(Error);
  });
});
