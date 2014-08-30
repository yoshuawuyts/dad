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
 * Test.
 */

describe('rest-adapter', function () {
  it('should do stuff', function() {
    books._adapters = [books.rest];
    books.push();
  });
});