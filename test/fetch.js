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

describe('._sync()', function () {
  it('should call ._sync', function(done) {
    books._sync = function(method, fn) {
      method.should.eql('read');
      fn();
    };
    books.fetch(done);
  });
});
