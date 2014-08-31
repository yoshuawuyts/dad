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

  it('should return a record from the store', function () {
    books._store = [{tuna: true}];
    books.get().should.eql([{tuna: true}]);
  });
});
