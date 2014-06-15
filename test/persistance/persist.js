/*eslint no-unused-expressions: 0*/

/**
 * Module dependencies
 */

var should = require('should');
var store = require ('../..');

/**
 * Test
 */

describe('.persist()', function () {
  it('should catch errors', function (done) {
    var books = store('books');
    books.on('failure', function(){done()});
    books.adapters = [function(end) {end('nope')}];

    books.persist();
  });

  it('should call the adapters', function (done) {
    var books = store('books');
    books.on('success', function() {done()});
    books.adapters = [
      function(end) {setTimeout(function(){end()}, 300);}, 
      function(end) {end()}
    ];
    
    books.persist();
  });
});