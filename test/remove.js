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

describe('.remove()', function () {
  it('should catch errors', function () {
    books.store = {1: {tuna: true}};

    books.remove.bind(books, 'hello').should.throw('Provide a cid as an argument');
    books.remove.bind(books, 2).should.throw('The cid \'2\' could not be found');
  });

  it('should remove a record', function () {
    books.store = {
      1: {tuna: true},
      2: {name: 'Tobi'}
    };

    books.remove(2);
    books.store.should.eql({1: {tuna: true}});
  });

  it('should save transactions', function() {
    books.store = {
      1: {cid: 1, tuna: true}
    };
    books.remove(1);
    books.transactions.should.eql([{
      action: 'remove',
      data: {
        cid: 1,
        tuna: true
      }
    }]);
  });

  it('should emit a \'change\' event', function (done) {
    books.store = {
      1: {tuna: true},
      2: {name: 'Tobi'}
    };
    books.on('change', function() {done()});

    books.remove(2);
  });
});
