/*eslint no-unused-expressions: 0*/

/**
 * Module dependencies
 */

var should = require('should');
var store = require ('../..');

/**
 * Test
 */

describe('.remove()', function () {
  it('should catch errors', function () {
    var books = store('books');
    books.store = {1: {tuna: true}};

    books.remove.bind(books, 'hello').should.throw('Provide a cid as an argument');
    books.remove.bind(books, 2).should.throw('The cid \'2\' could not be found');
  });

  it('should remove a record', function () {
    var books = store('books');
    books.store = {
      1: {tuna: true},
      2: {name: 'Tobi'}
    };

    books.remove(2);
    books.store.should.eql({1: {tuna: true}});
  });

  it('should emit a \'remove\' event', function () {
    var books = store('books');
    books.store = {
      1: {tuna: true},
      2: {name: 'Tobi'}
    };

    books.remove(2)
  });
});