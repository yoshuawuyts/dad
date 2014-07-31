/*eslint no-unused-expressions: 0*/

/**
 * Module dependencies
 */

var should = require('should');
var store = require ('../..');
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

describe('.allAccountedFor()', function () {
  it('should catch errors', function() {
    books.allAccountedFor.bind(books, 123)
      .should.throw('Record should be an object');
  });
  it('should check if all required properties are present', function() {
    books.model = {
      foo: {required: true},
      baz: {required: true},
      bin: {}
    };

    books.allAccountedFor({
      foo: 'bar', 
      bin: 'baz'
    }).should.eql(false);

    books.allAccountedFor({
      foo: 'bar', 
      baz: 123, 
      bin: 'baz'
    }).should.eql(true);
  });
});