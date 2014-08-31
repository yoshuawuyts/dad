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

describe('._push()', function () {
  it('should catch errors', function (done) {
    books.on('failure', function(){done()});
    books._adapters = [function(end) {end('nope')}];

    books._push();
  });

  it('should call the adapters', function (done) {
    books.on('success', function() {done()});
    books._adapters = [
      function(end) {setTimeout(function(){end()}, 300);},
      function(end) {end()}
    ];

    books._push();
  });
});