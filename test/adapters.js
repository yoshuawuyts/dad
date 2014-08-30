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

describe('adapters', function() {
  it('should add adapters', function() {
    books._adapters.length.should.eql(0);
    books.adapters = [function(){}, function(){}];
    books._adapters.length.should.eql(2);
  });
});
