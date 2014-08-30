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

describe('.adapter()', function () {
  it('should catch errors', function () {
    books.adapter.bind(books, 123).should.throw('Adapter should be a function');
  });

  it('should store an adapter', function() {
    function x() {return 3};
    function y() {return 5};
    books
      .adapter(x)
      .adapter(y);

    books._adapters[0]().should.eql(3);
    books._adapters[1]().should.eql(5);
  });
});