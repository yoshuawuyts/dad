/*eslint no-unused-expressions: 0*/

/**
 * Module dependencies
 */

var should = require('should');
var store = require ('../..');

/**
 * Test
 */

describe('.validate()', function () {
  it('should catch errors', function (done) {
    var books = store('books');

    books.validate.bind(books, 'not an object')
      .should.throw('record should be an object');

    done();
  });
  it('should reject undefined properties', function (done) {
    var books = store('books');
    books.model = {
      foo: {type: 'number'},
      bar: {type: 'string'}
    };

    books.validate({
      baz: 123
    }).should.eql(false);

    done();
  });
  it('should validate records', function (done) {
    var books = store('books');
    books.model = {
      foo: {type: 'number'},
      bar: {type: 'string'}
    };

    books.validate({foo: 'something', bar: 'something'})
      .should.eql(false);

    books.validate({foo: 123, bar: 'something'})
      .should.eql(true);

    done();
  });
  it('should check for required properties', function (done) {
    var books = store('books');
    books.model = {
      foo: {type: 'number', required: true},
      bar: {type: 'string'}
    };

    books.validate({foo: 123})
      .should.eql(true);

    books.validate({bar: 'something'})
      .should.eql(false);
    
    done();
  });
});