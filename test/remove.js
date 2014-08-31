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
    books._store = [{tuna: true}];

    books.remove.bind(books, 'hello')
      .should.throw('Record should be an object');
    books.remove.bind(books, {})
      .should.not.throw('Record should be an object');
  });

  it('should remove a record', function () {
    books._store = [
      {tuna: true},
      {name: 'Tobi'}
    ];

    books.remove(books._store[1]);
    books._store.should.eql([{tuna: true}]);
  });

  it('should emit a \'change\' event', function(done) {
    books._store = [
      {tuna: true},
      {name: 'Tobi'}
    ];
    books.on('change', function() {done()});

    books.remove(books._store[0]);
  });
});
