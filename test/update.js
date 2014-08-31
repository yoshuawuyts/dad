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

describe('.update()', function () {
  it('should catch errors', function () {
    books._store = {1: {tuna: true}};

    books.update.bind(books, {hello: 'you'})
      .should.throw('Provide an object with a cid as an argument');
    books.update.bind(books, {cid: 0})
      .should.throw('The cid \'0\' could not be found');
  });

  it('should update records', function () {
    books._store = {
      1: {cid: 1, tuna: true},
      8: {cid: 8, ham: 'bacon'}
    };

    books.update({cid: 1, tuna: false});
    books._store.should.eql({
      1: {cid: 1, tuna: false},
      8: {cid: 8, ham: 'bacon'}
    })
  });

  it('should call the adapters');

  it('should emit a \'change\' event', function (done) {
    books.on('change', function() {done()});
    books._store = {1: {tuna: true}};

    books.update({cid: 1, tuna: false});
  });
});
