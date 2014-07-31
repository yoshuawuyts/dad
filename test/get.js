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

describe('.get()', function () {
  it('should catch errors', function () {
    books.store = {1: {tuna: true}};

    books.get.bind(books, 'something').should.throw('Provide a number as an argument');
    books.get.bind(books, undefined).should.throw('Provide a number as an argument');
    books.get.bind(books, null).should.throw('Provide a number as an argument');
    books.get.bind(books, 0).should.throw('Could not find object with cid: 0');
  });

  it('should return a record from the store', function () {
    books.store = {1: {tuna: true}};
    books.get(1).should.eql({tuna: true});
  });
});