/*eslint no-unused-expressions: 0*/

/**
 * Module dependencies
 */

var should = require('should');
var store = require ('../');
var books = store('books');

/**
 * Before each.
 */

beforeEach(function() {
  books = store('books');
});

/**
 * Test
 */

describe('.settings()', function () {
  it('should catch errors', function() {
    books.settings.bind(books, 123)
      .should.throw('Opts should be an object');
  });
  it('should save settings', function() {
    books.settings({foo: 'bar'});
    books._opts.should.eql({foo: 'bar'});
    books.settings({foo: 'baz'});
    books._opts.should.eql({foo: 'baz'});
    books.settings({baz: 'baz'});
    books._opts.should.eql({foo: 'baz', baz: 'baz'});
  });
});