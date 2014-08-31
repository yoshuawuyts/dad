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
    books._store = [{tuna: true}];

    books.update.bind(books, 'hello')
      .should.throw('Record should be an object');
    books.update.bind(books, {})
      .should.not.throw('Record should be an object');
  });

  it('should update records', function () {
    var tuna = {tuna: true};
    books._store = [
      tuna,
      {ham: 'bacon'}
    ];

    books.update({tuna: false}, tuna);
    books._store.should.eql([
      {tuna: false},
      {ham: 'bacon'}
    ]);
  });

  it('should call the adapters');

  it('should emit a \'change\' event', function (done) {
    var tuna = {tuna: true};
    var falseTuna = {tuna: false};

    books.on('change', function() {
      if (books._store[0] == falseTuna) done();
    });

    books._store = [tuna];

    books.update(falseTuna, tuna);
  });
});
