/*eslint no-unused-expressions: 0*/

/**
 * Module dependencies
 */

var should = require('should');
var store = require ('../..');

/**
 * Test
 */

describe('.get()', function () {
  it('should catch errors', function (done) {
    var books = store('books');
    books.store = {1: {tuna: true}};

    books.get.bind(books, 'something').should.throw('Provide a number as an argument');
    books.get.bind(books, undefined).should.throw('Provide a number as an argument');
    books.get.bind(books, null).should.throw('Provide a number as an argument');

    books.get.bind(books, 0).should.throw('Could not find object with cid: 0');
    done();
  });

  it('should return a record from the store', function (done) {
    var books = store('books');
    books.store = {1: {tuna: true}};
    books.get(1).should.eql({tuna: true});
    done();
  });
});