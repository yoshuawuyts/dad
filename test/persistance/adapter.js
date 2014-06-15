/*eslint no-unused-expressions: 0*/

/**
 * Module dependencies
 */

var should = require('should');
var store = require ('../..');

/**
 * Test
 */

describe('.adapter()', function () {
  it('should catch errors', function () {
    var books = store('books');

    books.adapter.bind(books, 123).should.throw('Adapter should be a function');
  });

  it('should store an adapter', function () {
    var books = store('books');
    function x() {};
    function y() {};
    books
      .adapter(x)
      .adapter(y);

    books.adapters.should.eql([x, y]);
  });
});